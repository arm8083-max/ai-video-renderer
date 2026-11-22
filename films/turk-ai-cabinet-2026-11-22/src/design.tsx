import React from 'react';
import {AbsoluteFill, Easing, Img, interpolate, spring, staticFile, useCurrentFrame} from 'remotion';
import timingData from './timings.json';

export const C = {
  soot: '#141210',
  soot2: '#201D19',
  lacquer: '#2A2520',
  ivory: '#E8DECA',
  paper: '#D6C8AF',
  brass: '#B08A4A',
  oxblood: '#7E2D2D',
  green: '#5C7D68',
  muted: '#8E8578',
};

type TimedWord = {word:string; normalized:string; start_frame:number; end_frame:number; paragraph:number};
const words = (timingData as {words:TimedWord[]}).words;
const norm=(s:string)=>s.toLowerCase().replace(/[^a-z0-9]+/g,' ').trim().split(/\s+/).filter(Boolean);

export const cue=(phrase:string, occurrence=0):number=>{
  const needle=norm(phrase);
  let seen=0;
  for(let i=0;i<=words.length-needle.length;i++){
    let ok=true;
    for(let j=0;j<needle.length;j++) if(words[i+j].normalized!==needle[j]) {ok=false;break;}
    if(ok){if(seen===occurrence)return words[i].start_frame;seen++;}
  }
  throw new Error(`Cue not found: ${phrase}`);
};

export const paragraphStart=(p:number)=>words.find(w=>w.paragraph===p)?.start_frame ?? 0;
export const paragraphEnd=(p:number)=>[...words].reverse().find(w=>w.paragraph===p)?.end_frame ?? 24682;
export const scenes=Array.from({length:16},(_,i)=>({
  paragraph:i+1,
  start:paragraphStart(i+1),
  end:i===15?24682:paragraphStart(i+2),
}));

const camEase=Easing.bezier(.16,1,.3,1);
const placeEase=Easing.bezier(.22,.61,.36,1);
const revealEase=Easing.bezier(.65,0,.35,1);
const clamped={extrapolateLeft:'clamp' as const,extrapolateRight:'clamp' as const};

export const ramp=(f:number,a:number,b:number,kind:'camera'|'place'|'reveal'='place')=>interpolate(f,[a,b],[0,1],{...clamped,easing:kind==='camera'?camEase:kind==='reveal'?revealEase:placeEase});
export const localCue=(phrase:string,sceneStart:number,occurrence=0)=>cue(phrase,occurrence)-sceneStart;
export const sec=(s:number)=>Math.round(s*30);

export const SceneFrame:React.FC<{duration:number;children:React.ReactNode;light?:boolean;chapter?:string}>=({duration,children,light=false,chapter})=>{
  const f=useCurrentFrame();
  const fadeOut=1-ramp(f,duration-18,duration,'reveal');
  return <AbsoluteFill style={{background:light?C.ivory:C.soot,color:light?C.soot:C.ivory,overflow:'hidden',opacity:fadeOut}}>
    <div style={{position:'absolute',inset:28,border:`1px solid ${light?'#9B8D76':C.lacquer}`,pointerEvents:'none'}}/>
    <div style={{position:'absolute',left:80,right:80,top:54,height:2,background:light?'#B9AA91':C.lacquer}}/>
    {chapter&&<div style={{position:'absolute',left:82,top:72,fontFamily:'IBM Plex Sans Condensed',fontWeight:600,fontSize:24,letterSpacing:4,color:light?C.oxblood:C.brass,textTransform:'uppercase'}}>{chapter}</div>}
    {children}
  </AbsoluteFill>;
};

export const CameraImage:React.FC<{src:string;start?:number;end?:number;fromScale?:number;toScale?:number;fromX?:number;toX?:number;fromY?:number;toY?:number;shade?:number;fit?:'cover'|'contain';style?:React.CSSProperties}>=({src,start=0,end=210,fromScale=1.02,toScale=1.09,fromX=0,toX=-20,fromY=0,toY=0,shade=0,fit='cover',style})=>{
  const f=useCurrentFrame();const p=ramp(f,start,end,'camera');
  return <div style={{position:'absolute',inset:0,overflow:'hidden',...style}}>
    <Img src={staticFile(src)} style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:fit,transform:`translate3d(${fromX+(toX-fromX)*p}px,${fromY+(toY-fromY)*p}px,0) scale(${fromScale+(toScale-fromScale)*p})`}}/>
    {shade>0&&<div style={{position:'absolute',inset:0,background:C.soot,opacity:shade}}/>}
  </div>;
};

export const EvidenceSheet:React.FC<{src:string;start:number;x:number;y:number;width:number;rotate?:number;caption?:string;active?:boolean;crop?:React.CSSProperties}>=({src,start,x,y,width,rotate=0,caption,active=true,crop})=>{
  const f=useCurrentFrame();
  const p=ramp(f,start,start+20,'place');
  const settle=ramp(f,start+20,start+95,'camera');
  return <div style={{position:'absolute',left:x,top:y,width,opacity:p*(active?1:.38),transform:`translate3d(0,${(1-p)*70-settle*7}px,0) rotate(${rotate+(1-p)*1.8}deg)`,transformOrigin:'50% 80%'}}>
    <div style={{background:C.paper,border:`1px solid ${C.brass}`,padding:10}}>
      <Img src={staticFile(src)} style={{display:'block',width:'100%',height:'auto',maxHeight:760,objectFit:'contain',objectPosition:'top',...crop}}/>
    </div>
    {caption&&<div style={{fontFamily:'IBM Plex Sans Condensed',fontWeight:600,fontSize:19,letterSpacing:1.4,color:C.muted,marginTop:10,textTransform:'uppercase'}}>{caption}</div>}
  </div>;
};

export const EditorialTitle:React.FC<{lines:string[];start:number;x?:number;y?:number;width?:number;size?:number;accent?:number;dark?:boolean;align?:'left'|'center'}>=({lines,start,x=90,y=190,width=1100,size=108,accent=-1,dark=false,align='left'})=>{
  const f=useCurrentFrame();
  return <div style={{position:'absolute',left:x,top:y,width,textAlign:align,fontFamily:'Fraunces',fontWeight:650,fontSize:size,lineHeight:.91,letterSpacing:-3,color:dark?C.soot:C.ivory}}>
    {lines.map((line,i)=>{const p=ramp(f,start+i*5,start+18+i*5,'place');return <div key={line} style={{opacity:p,transform:`translate3d(0,${(1-p)*45}px,0)`,color:i===accent?C.oxblood:undefined}}>{line}</div>})}
  </div>;
};

export const KineticPhrase:React.FC<{words:string[];start:number;x:number;y:number;size?:number;color?:string;gap?:number}>=({words:tokens,start,x,y,size=50,color=C.ivory,gap=5})=>{
  const f=useCurrentFrame();
  return <div style={{position:'absolute',left:x,top:y,display:'flex',gap:14,flexWrap:'wrap',maxWidth:1500}}>{tokens.map((t,i)=>{const p=ramp(f,start+i*gap,start+16+i*gap,'place');return <span key={`${t}-${i}`} style={{fontFamily:'IBM Plex Sans Condensed',fontWeight:600,fontSize:size,letterSpacing:1,color,opacity:p,transform:`translateY(${(1-p)*24}px)`}}>{t}</span>})}</div>;
};

export const SourceLabel:React.FC<{start:number;children:React.ReactNode;x?:number;y?:number;color?:string}>=({start,children,x=90,y=970,color=C.brass})=>{
  const f=useCurrentFrame();const p=ramp(f,start,start+14,'place');
  return <div style={{position:'absolute',left:x,top:y,fontFamily:'IBM Plex Sans Condensed',fontWeight:600,fontSize:19,letterSpacing:2.2,textTransform:'uppercase',color,opacity:p,transform:`translateX(${(1-p)*30}px)`,borderLeft:`4px solid ${color}`,paddingLeft:14}}>{children}</div>;
};

export const Drawer:React.FC<{start:number;x:number;y:number;w:number;h:number;label:string;active?:boolean;children?:React.ReactNode}>=({start,x,y,w,h,label,active=true,children})=>{
  const f=useCurrentFrame();
  const p=ramp(f,start,start+28,'reveal');
  return <div style={{position:'absolute',left:x,top:y,width:w,height:h,background:C.soot2,border:`2px solid ${active?C.brass:C.lacquer}`,overflow:'hidden',opacity:active?1:.42}}>
    <div style={{position:'absolute',left:0,top:0,bottom:0,width:`${p*100}%`,background:C.lacquer}}/>
    <div style={{position:'absolute',inset:18,opacity:p,transform:`translateX(${(1-p)*50}px)`}}>{children}</div>
    <div style={{position:'absolute',left:18,bottom:12,fontFamily:'IBM Plex Sans Condensed',fontWeight:600,fontSize:18,letterSpacing:2,color:active?C.brass:C.muted,textTransform:'uppercase'}}>{label}</div>
    <div style={{position:'absolute',right:14,top:14,width:26,height:8,background:active?C.brass:C.muted}}/>
  </div>;
};

export const Metric:React.FC<{value:string;label:string;start:number;x:number;y:number;color?:string;size?:number}>=({value,label,start,x,y,color=C.brass,size=128})=>{
  const f=useCurrentFrame();const p=spring({frame:f-start,fps:30,config:{damping:200,stiffness:120,mass:.9,overshootClamping:true}});
  return <div style={{position:'absolute',left:x,top:y,opacity:p,transform:`translateY(${(1-p)*45}px)`}}>
    <div style={{fontFamily:'Fraunces',fontWeight:650,fontSize:size,lineHeight:.9,color,letterSpacing:-4}}>{value}</div>
    <div style={{fontFamily:'IBM Plex Sans Condensed',fontWeight:600,fontSize:24,letterSpacing:2,color:C.muted,marginTop:18,textTransform:'uppercase'}}>{label}</div>
  </div>;
};

export const BrandWord:React.FC<{name:string;start:number;x:number;y:number;accent?:string;size?:number}>=({name,start,x,y,accent=C.ivory,size=58})=>{
  const f=useCurrentFrame();const p=ramp(f,start,start+18,'place');
  return <div style={{position:'absolute',left:x,top:y,fontFamily:'IBM Plex Sans Condensed',fontWeight:700,fontSize:size,letterSpacing:-1,color:accent,opacity:p,transform:`translateY(${(1-p)*35}px)`,borderBottom:`5px solid ${C.brass}`,paddingBottom:8}}>{name}</div>;
};

export const InspectionKey:React.FC<{start:number;x:number;y:number;rotation?:number;scale?:number}>=({start,x,y,rotation=0,scale=1})=>{
  const f=useCurrentFrame();const p=ramp(f,start,start+28,'camera');
  return <div style={{position:'absolute',left:x,top:y,width:230,height:76,transform:`translateX(${(1-p)*-140}px) rotate(${rotation}deg) scale(${scale})`,opacity:p}}>
    <div style={{position:'absolute',left:0,top:8,width:60,height:60,border:`12px solid ${C.brass}`,borderRadius:'50%'}}/>
    <div style={{position:'absolute',left:56,top:32,width:150,height:18,background:C.brass}}/>
    <div style={{position:'absolute',right:10,top:32,width:18,height:44,background:C.brass}}/>
    <div style={{position:'absolute',right:46,top:32,width:18,height:34,background:C.brass}}/>
  </div>;
};

export const dim=(active:boolean)=>active?1:.28;
