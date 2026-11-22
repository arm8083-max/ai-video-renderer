import "@fontsource/instrument-serif/400.css";
import "@fontsource/space-grotesk/400.css";
import "@fontsource/space-grotesk/500.css";
import "@fontsource/space-grotesk/700.css";
import React from "react";
import {AbsoluteFill, Audio, Easing, Sequence, interpolate, staticFile, useCurrentFrame} from "remotion";
import rawTimings from "./timings.json";

type Word = {paragraph: number; word: string; start_frame: number; end_frame: number};
const words = rawTimings.words as Word[];
const FPS = 30;
const W = 1920;
const H = 1080;
const paper = "#E6E3DC";
const ink = "#17202A";
const blue = "#244D6E";
const orange = "#E75A32";
const mint = "#87A99B";
const paleBlue = "#C9D5DC";

const paragraphs = Array.from({length: 75}, (_, i) => {
  const id = i + 1;
  const group = words.filter((w) => w.paragraph === id);
  const start = group[0]?.start_frame ?? 0;
  const end = group.at(-1)?.end_frame ?? start + 60;
  return {id, words: group, start, end, duration: Math.max(1, end - start + 1)};
});

type Chapter = {from: number; to: number; asset: string; title: string; tag: string; mode: "ledger"|"process"|"exam"|"dialogue"|"desk"|"systems"|"agency"|"research"|"toolkit"|"authorship"};
const chapters: Chapter[] = [
  {from: 1,to: 9,asset:"01-paradox-ledger.png",title:"ОЖИДАНИЕ / РЕЗУЛЬТАТ",tag:"измерение",mode:"ledger"},
  {from: 10,to:14,asset:"02-factory-process.png",title:"ТЕХНОЛОГИЯ ≠ РЕЗУЛЬТАТ",tag:"процесс",mode:"process"},
  {from: 15,to:23,asset:"03-exam-work.png",title:"ТЕСТ И РАБОТА",tag:"проверка",mode:"exam"},
  {from: 24,to:31,asset:"04-eliza-room.png",title:"БЕГЛОСТЬ ≠ ПОНИМАНИЕ",tag:"диалог",mode:"dialogue"},
  {from: 32,to:41,asset:"06-productivity-room.png",title:"ГДЕ ЭКОНОМИТСЯ ВРЕМЯ",tag:"наблюдение",mode:"desk"},
  {from: 42,to:48,asset:"07-datacenter-flow.png",title:"СИСТЕМА, НЕ ФОКУС",tag:"масштаб",mode:"systems"},
  {from: 49,to:59,asset:"08-agent-chain.png",title:"ЦЕПОЧКА ДЕЙСТВИЙ",tag:"агентность",mode:"agency"},
  {from: 60,to:63,asset:"10-alphafold-research.png",title:"ГДЕ РЕЗУЛЬТАТ ВИДЕН",tag:"исследование",mode:"research"},
  {from: 64,to:69,asset:"11-five-tools.png",title:"ИНСТРУМЕНТЫ И ВЫБОР",tag:"практика",mode:"toolkit"},
  {from: 70,to:75,asset:"12-authorship-table.png",title:"КТО РЕШАЕТ",tag:"ответственность",mode:"authorship"}
];

const chapterFor = (p: number) => chapters.find((c) => p >= c.from && p <= c.to) ?? chapters[0];
const clamp = (v: number) => Math.max(0, Math.min(1, v));
const easeOut = (v: number) => Easing.bezier(0.22, 1, 0.36, 1)(clamp(v));
const easeInOut = (v: number) => Easing.bezier(0.65, 0, 0.35, 1)(clamp(v));
const enter = (frame: number, at = 0, length = 18) => easeOut((frame - at) / length);
const exit = (frame: number, total: number, length = 24) => 1 - easeInOut((frame - (total - length)) / length);

const CropImage: React.FC<{src: string; frame: number; duration: number; variant: number}> = ({src, frame, duration, variant}) => {
  const p = clamp(frame / Math.max(1, duration));
  const x = interpolate(p, [0, 1], variant % 2 ? [-2.5, 3.5] : [3.5, -2.5]);
  const y = interpolate(p, [0, 1], variant % 3 ? [2, -2] : [-1, 2]);
  const scale = interpolate(p, [0, 1], [1.055, 1.14]);
  return <div style={{position:"absolute",inset:0,overflow:"hidden",background:blue}}>
    <img src={staticFile(`assets/${src}`)} style={{width:"100%",height:"100%",objectFit:"cover",transform:`translate(${x}%, ${y}%) scale(${scale})`,opacity:0.88}}/>
    <div style={{position:"absolute",inset:0,background:paper,opacity:0.17}}/>
  </div>;
};

const WordCues: React.FC<{items: Word[]; frame: number; duration: number}> = ({items, frame, duration}) => {
  const chosen = items.length < 4 ? items : [items[0], items[Math.floor(items.length * .42)], items[Math.floor(items.length * .78)]];
  return <div style={{position:"absolute",left:96,bottom:88,display:"flex",gap:12,alignItems:"center"}}>
    {chosen.map((word, i) => {
      const local = frame - (word.start_frame - (items[0]?.start_frame ?? 0));
      const a = enter(local, 0, 15) * exit(frame, duration, 18);
      return <div key={`${word.word}-${i}`} style={{opacity:a,transform:`translateY(${(1-a)*16}px)`,fontFamily:"Space Grotesk",fontSize:22,fontWeight:500,letterSpacing:"0.06em",textTransform:"uppercase",color:ink,background:paper,padding:"12px 15px",border:`2px solid ${i === 1 ? orange : blue}`}}>{word.word.replace(/[.,!?—–:;]/g, "")}</div>;
    })}
  </div>;
};

const Header: React.FC<{chapter: Chapter; frame: number; duration: number; number: number}> = ({chapter, frame, duration, number}) => {
  const a = enter(frame, 5, 20) * exit(frame, duration, 20);
  return <>
    <div style={{position:"absolute",top:76,left:96,display:"flex",gap:17,alignItems:"center",opacity:a,transform:`translateY(${(1-a)*-20}px)`}}>
      <div style={{fontFamily:"Space Grotesk",fontSize:18,fontWeight:700,letterSpacing:".12em",color:paper,background:blue,padding:"9px 12px"}}>{String(number).padStart(2,"0")}</div>
      <div style={{fontFamily:"Space Grotesk",fontSize:18,fontWeight:500,letterSpacing:".13em",color:ink,textTransform:"uppercase"}}>{chapter.tag}</div>
    </div>
    <div style={{position:"absolute",top:132,left:96,width:Math.min(1060, 700 + chapter.title.length*7),height:3,background:orange,transformOrigin:"left",transform:`scaleX(${enter(frame, 12, 28) * exit(frame,duration,18)})`}}/>
  </>;
};

const LedgerCanvas: React.FC<{chapter: Chapter; frame: number; duration: number; paragraph: number}> = ({chapter, frame, duration, paragraph}) => {
  const p = clamp(frame / duration);
  const pulse = .72 + .28 * Math.sin(frame / 18);
  const side = paragraph % 2 ? "right" : "left";
  return <>
    <CropImage src={chapter.asset} frame={frame} duration={duration} variant={paragraph}/>
    <div style={{position:"absolute",inset:0,background:ink,opacity:0.33}}/>
    <div style={{position:"absolute",left:side === "left" ? 96 : "auto",right:side === "right" ? 96 : "auto",top:250,width:650,height:470,background:paper,opacity:0.96,border:`2px solid ${ink}`,transform:`translateY(${(1-enter(frame,10,22))*28}px)`,transformOrigin:"center"}}/>
    <div style={{position:"absolute",left:side === "left" ? 130 : "auto",right:side === "right" ? 130 : "auto",top:286,width:580,fontFamily:"Instrument Serif",fontSize:84,lineHeight:.9,color:ink,letterSpacing:"-0.04em",opacity:enter(frame,16,24)}}>{chapter.title}</div>
    <div style={{position:"absolute",left:side === "left" ? 130 : "auto",right:side === "right" ? 130 : "auto",top:504,width:520,height:2,background:blue,transformOrigin:"left",transform:`scaleX(${enter(frame,22,22)})`}}/>
    <div style={{position:"absolute",left:side === "left" ? 130 : "auto",right:side === "right" ? 130 : "auto",top:548,display:"flex",gap:15,opacity:enter(frame,30,20)}}>
      {["наблюдать","сверять","решать"].map((v,i) => <div key={v} style={{fontFamily:"Space Grotesk",fontSize:21,color:i===1?orange:ink,letterSpacing:".05em",padding:"10px 0",borderBottom:`3px solid ${i===1?orange:blue}`,transform:`translateY(${Math.sin((frame-i*5)/15)*1.5}px)`}}>{v}</div>)}
    </div>
    <div style={{position:"absolute",left:side === "left" ? 130 : "auto",right:side === "right" ? 130 : "auto",top:648,width:70+220*p,height:12,background:orange,opacity:pulse}}/>
  </>;
};

const DataCanvas: React.FC<{chapter: Chapter; frame: number; duration: number; paragraph: number}> = ({chapter, frame, duration, paragraph}) => {
  const stages = ["исходные данные", "действие", "проверка", "вывод"];
  const chosen = clamp((frame-14)/22);
  return <>
    <CropImage src={chapter.asset} frame={frame} duration={duration} variant={paragraph}/>
    <div style={{position:"absolute",inset:0,background:paper,opacity:.22}}/>
    <div style={{position:"absolute",left:96,right:96,bottom:176,height:260,display:"flex",alignItems:"stretch",gap:14}}>
      {stages.map((label,i) => { const a = enter(frame, 8+i*5, 18) * exit(frame,duration,22); const focus = Math.floor((frame/Math.max(1,duration))*stages.length) === i; return <React.Fragment key={label}>
        <div style={{flex:1,background:focus?blue:paper,border:`2px solid ${blue}`,padding:"25px 25px",opacity:a,transform:`translateY(${(1-a)*30}px)`,display:"flex",flexDirection:"column",justifyContent:"space-between"}}>
          <div style={{fontFamily:"Space Grotesk",fontSize:18,fontWeight:700,letterSpacing:".1em",color:focus?paper:blue}}>{String(i+1).padStart(2,"0")}</div>
          <div style={{fontFamily:"Instrument Serif",fontSize:47,lineHeight:.94,color:focus?paper:ink}}>{label}</div>
          <div style={{width:`${35+50*chosen}%`,height:4,background:focus?orange:mint}}/>
        </div>
        {i < stages.length-1 && <div style={{width:24,alignSelf:"center",height:2,background:orange,transform:`scaleX(${enter(frame,16+i*5,14)})`}}/>}
      </React.Fragment>})}
    </div>
  </>;
};

const DialogueCanvas: React.FC<{chapter: Chapter; frame: number; duration: number; paragraph: number}> = ({chapter, frame, duration, paragraph}) => {
  const left = enter(frame,9,20); const right=enter(frame,19,20); const third=enter(frame,31,20);
  return <>
    <CropImage src={chapter.asset} frame={frame} duration={duration} variant={paragraph}/><div style={{position:"absolute",inset:0,background:ink,opacity:.26}}/>
    <div style={{position:"absolute",left:128,top:286,width:620,background:paper,border:`2px solid ${blue}`,padding:"30px 34px",opacity:left,transform:`translate(${(1-left)*-40}px,${(1-left)*24}px)`}}><div style={{fontFamily:"Space Grotesk",fontSize:18,letterSpacing:".1em",color:blue}}>ВОПРОС</div><div style={{fontFamily:"Instrument Serif",fontSize:54,lineHeight:.96,color:ink,marginTop:14}}>Что именно<br/>мы проверяем?</div></div>
    <div style={{position:"absolute",right:128,top:442,width:590,background:blue,border:`2px solid ${paper}`,padding:"30px 34px",opacity:right,transform:`translate(${(1-right)*40}px,${(1-right)*24}px)`}}><div style={{fontFamily:"Space Grotesk",fontSize:18,letterSpacing:".1em",color:mint}}>ОТВЕТ</div><div style={{fontFamily:"Instrument Serif",fontSize:51,lineHeight:.96,color:paper,marginTop:14}}>Не речь.<br/>Работу.</div></div>
    <div style={{position:"absolute",left:W/2-190,top:730,width:380,fontFamily:"Space Grotesk",fontWeight:700,fontSize:21,letterSpacing:".11em",color:ink,background:orange,padding:"14px 20px",textAlign:"center",opacity:third,transform:`translateY(${(1-third)*20}px)`}}>СВЕРКА КОНТЕКСТА</div>
  </>;
};

const ResearchCanvas: React.FC<{chapter: Chapter; frame: number; duration: number; paragraph: number}> = ({chapter, frame, duration, paragraph}) => {
  const a = enter(frame,12,24); const count = Math.min(5, Math.floor(frame/18)+1);
  return <><CropImage src={chapter.asset} frame={frame} duration={duration} variant={paragraph}/><div style={{position:"absolute",inset:0,background:paper,opacity:.18}}/>
    <div style={{position:"absolute",left:100,top:220,width:640,background:paper,border:`2px solid ${blue}`,padding:"36px",opacity:a,transform:`translateY(${(1-a)*25}px)`}}><div style={{fontFamily:"Space Grotesk",fontSize:18,fontWeight:700,color:blue,letterSpacing:".1em"}}>ДОКАЗАТЕЛЬСТВО</div><div style={{fontFamily:"Instrument Serif",fontSize:74,lineHeight:.9,color:ink,marginTop:16}}>{chapter.title}</div><div style={{display:"flex",gap:10,marginTop:34}}>{Array.from({length:5},(_,i)=><div key={i} style={{width:88,height:10,background:i<count?orange:mint,opacity:i<count?1:.55}}/>)}</div></div>
  </>;
};

const ParagraphScene: React.FC<{p: typeof paragraphs[number]}> = ({p}) => {
  const frame = useCurrentFrame();
  const chapter = chapterFor(p.id);
  const common = {chapter, frame, duration:p.duration, paragraph:p.id};
  const visual = chapter.mode === "dialogue" ? <DialogueCanvas {...common}/> : chapter.mode === "research" ? <ResearchCanvas {...common}/> : (["process","exam","systems","agency","toolkit","authorship"].includes(chapter.mode) ? <DataCanvas {...common}/> : <LedgerCanvas {...common}/>);
  return <AbsoluteFill style={{opacity:exit(frame,p.duration,18)}}>{visual}<Header chapter={chapter} frame={frame} duration={p.duration} number={p.id}/><WordCues items={p.words} frame={frame} duration={p.duration}/></AbsoluteFill>;
};

export const EvidenceLedgerFilm: React.FC = () => <AbsoluteFill style={{background:paper,overflow:"hidden"}}>
  <Audio src={staticFile("narration.wav")}/>
  {paragraphs.map((p) => <Sequence key={p.id} from={p.start} durationInFrames={p.duration}><ParagraphScene p={p}/></Sequence>)}
</AbsoluteFill>;
