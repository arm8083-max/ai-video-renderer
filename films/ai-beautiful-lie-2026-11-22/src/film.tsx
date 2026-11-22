import React from 'react';
import '@fontsource/barlow-condensed/500.css';
import '@fontsource/barlow-condensed/600.css';
import '@fontsource/barlow-condensed/700.css';
import '@fontsource/source-serif-4/500.css';
import './aliases.css';
import {AbsoluteFill, Audio, Img, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {AlertTriangle, ArrowRight, BadgeCheck, Banknote, FileCheck2, HeartPulse, Landmark, MessageSquareText, Scale, SearchCheck, ShieldCheck} from 'lucide-react';
import {BigWords, C, Count, FilmImage, Label, Rule, clamp, ease, ramp, sec, windowOpacity} from './design';

const actFade=(f:number,d:number)=>windowOpacity(f,0,d,14);
const panelSpring=(f:number,delay=0)=>spring({frame:f-delay,fps:30,config:{damping:200,stiffness:120,mass:.9,overshootClamping:true}});

const Hook:React.FC=()=>{
  const f=useCurrentFrame(); const d=sec(31.4);
  const risks=[['РАБОТА',sec(3.0)],['ДЕНЬГИ',sec(4.3)],['ЗДОРОВЬЕ',sec(5.5)]];
  return <AbsoluteFill style={{background:C.carbon,opacity:actFade(f,d),overflow:'hidden'}}>
    <FilmImage src="assets/generated-opening-confidence.png" start={0} end={sec(7.35)} fromScale={1.01} toScale={1.075} fromX={0} toX={-24} shade={.24}/>
    <div style={{position:'absolute',inset:0,background:C.carbon,opacity:ramp(f,sec(6.5),sec(8.0))}}/>
    <Label start={0}>НЕПРИЯТНАЯ ПРАВДА</Label>
    <BigWords lines={['ОНА МОЖЕТ','УВЕРЕННО','СОВРАТЬ']} start={sec(.45)} y={210} size={132} accent={2}/>
    <div style={{position:'absolute',left:1180,top:190,width:570,height:650,opacity:ramp(f,sec(2),sec(3))}}>
      {risks.map(([t,s],i)=>{const p=ramp(f,s as number,(s as number)+18);return <div key={t as string} style={{height:116,borderTop:`1px solid ${C.steel}`,display:'flex',alignItems:'center',justifyContent:'space-between',color:i===2?C.red:C.bone,opacity:p,transform:`translateX(${(1-p)*55}px)`}}><span style={{fontFamily:'Barlow Condensed',fontSize:42,fontWeight:600,letterSpacing:3}}>{t}</span><span style={{width:42,height:42,border:`2px solid ${i===2?C.red:C.steel}`,display:'grid',placeItems:'center',fontFamily:'Source Serif 4',fontSize:22}}>{i+1}</span></div>})}
    </div>
    <div style={{position:'absolute',inset:0,background:C.bone,clipPath:`inset(${(1-ramp(f,sec(7.1),sec(8.1)))*100}% 0 0 0)`}}>
      <div style={{position:'absolute',left:110,top:104,color:C.carbon,fontFamily:'Source Serif 4',fontSize:36}}>Красивый ответ ≠ проверенный факт</div>
      <div style={{position:'absolute',left:110,top:240,width:1310,fontFamily:'Barlow Condensed',fontWeight:700,fontSize:142,lineHeight:.86,color:C.carbon}}>НЕ БЕСПОЛЕЗЕН.<br/>ОПАСНО ПЕРЕОЦЕНЁН.</div>
      <div style={{position:'absolute',right:110,bottom:95,width:600,color:C.carbon,fontFamily:'Source Serif 4',fontSize:34,lineHeight:1.35}}>В финале — один вопрос, который отделяет безопасное применение от слепой веры.</div>
      <Rule x={110} y={720} w={1660} start={sec(9.2)} color={C.red}/>
    </div>
    <div style={{position:'absolute',inset:0,background:C.carbon,opacity:ramp(f,sec(15.1),sec(16.2))}}/>
    <div style={{position:'absolute',left:110,top:125,right:110,bottom:120,opacity:ramp(f,sec(15.4),sec(16.2))}}>
      <div style={{fontFamily:'Barlow Condensed',fontSize:34,letterSpacing:3,color:C.steel}}>К КОНЦУ ВИДЕО</div>
      <div style={{marginTop:52,fontFamily:'Barlow Condensed',fontWeight:700,fontSize:126,lineHeight:.88,color:C.bone}}>ГДЕ ИМЕННО<br/><span style={{color:C.red}}>НАС ОБМАНЫВАЮТ</span></div>
      <div style={{position:'absolute',right:0,bottom:0,width:520,borderLeft:`5px solid ${C.red}`,paddingLeft:36,fontFamily:'Source Serif 4',fontSize:40,lineHeight:1.2,color:C.bone}}>Одна привычка.<br/>Три зоны риска.<br/>Ноль слепой веры.</div>
    </div>
  </AbsoluteFill>;
};

const MataCase:React.FC=()=>{
  const f=useCurrentFrame(); const d=sec(27.2);
  const docIn=ramp(f,sec(6.0),sec(7.0));
  return <AbsoluteFill style={{background:C.carbon,opacity:actFade(f,d),overflow:'hidden'}}>
    <FilmImage src="assets/generated-lawyer-review.png" start={0} end={sec(7.45)} fromScale={1.02} toScale={1.11} fromX={15} toX={-22} shade={.15}/>
    <Label start={0}>НЬЮ-ЙОРК · 2023</Label>
    <BigWords lines={['КРАСИВЫЕ.','УБЕДИТЕЛЬНЫЕ.','НЕСУЩЕСТВУЮЩИЕ.']} start={sec(1.6)} y={650} size={68} accent={2}/>
    <div style={{position:'absolute',inset:0,background:C.paper,opacity:docIn}}>
      <Img src={staticFile('assets/mata-page-01.png')} style={{position:'absolute',width:1160,height:'auto',left:380,top:50,transform:`translateY(${(1-docIn)*90}px) scale(${1+.06*ramp(f,sec(7),sec(16))})`,transformOrigin:'52% 30%'}}/>
      <div style={{position:'absolute',left:92,top:105,width:360,color:C.carbon,fontFamily:'Barlow Condensed',fontSize:31,letterSpacing:2}}>РЕАЛЬНЫЙ ДОКУМЕНТ СУДА</div>
      <div style={{position:'absolute',left:92,top:180,width:350,fontFamily:'Source Serif 4',fontSize:26,lineHeight:1.35,color:C.carbon}}>Mata v. Avianca<br/>S.D.N.Y.<br/>22-cv-1461</div>
      <div style={{position:'absolute',left:380,top:50,width:9,height:940,background:C.red,opacity:ramp(f,sec(10),sec(11))}}/>
    </div>
    <div style={{position:'absolute',inset:0,background:C.carbon,clipPath:`inset(0 0 0 ${(1-ramp(f,sec(13.4),sec(14.3)))*100}%)`}}>
      <Img src={staticFile('assets/mata-sanctions-40.png')} style={{position:'absolute',height:900,width:'auto',right:130,top:90,objectFit:'contain'}}/>
      <div style={{position:'absolute',left:110,top:150,color:C.bone,fontFamily:'Barlow Condensed',fontWeight:700,fontSize:98,lineHeight:.9}}>СЛЕПАЯ<br/>ВЕРА</div>
      <div style={{position:'absolute',left:110,top:500,color:C.red}}><Count to={5000} start={sec(20.0)} end={sec(22.2)} suffix=" $" size={170} color={C.red}/></div>
      <div style={{position:'absolute',left:115,top:680,color:C.steel,fontFamily:'Source Serif 4',fontSize:30}}>штраф за непроверенные<br/>выдуманные прецеденты</div>
    </div>
  </AbsoluteFill>;
};

const Hallucination:React.FC=()=>{
  const f=useCurrentFrame();const d=sec(23.9);
  const tokens=['наиболее','правдоподобное','продолжение','текста'];
  return <AbsoluteFill style={{background:C.bone,opacity:actFade(f,d),overflow:'hidden'}}>
    <Label start={0} color={C.red}>ГАЛЛЮЦИНАЦИЯ</Label>
    <div style={{position:'absolute',left:100,top:210,right:100}}>
      <div style={{fontFamily:'Source Serif 4',fontSize:40,color:C.carbon}}>Модель выбирает не истину, а следующий вероятный фрагмент:</div>
      <div style={{marginTop:70,display:'flex',gap:18,alignItems:'flex-end'}}>{tokens.map((t,i)=>{const p=panelSpring(f,sec(2.2)+i*5);const widths=[.52,.91,.68,.74];return <div key={t} style={{width:300,opacity:p,transform:`translateY(${(1-p)*48}px)`}}><div style={{height:260*widths[i],background:i===1?C.red:C.dark2,marginBottom:24}}/><div style={{fontFamily:'Barlow Condensed',fontSize:36,color:C.carbon}}>{t}</div><div style={{fontFamily:'Barlow Condensed',fontSize:24,color:C.steel}}>{Math.round(widths[i]*100)}%</div></div>})}</div>
      <div style={{position:'absolute',right:0,top:640,fontFamily:'Barlow Condensed',fontWeight:700,fontSize:72,color:C.carbon}}>ПРАВДОПОДОБНО ≠ ВЕРНО</div>
    </div>
    <div style={{position:'absolute',inset:0,background:'#F6F4EE',clipPath:`inset(${(1-ramp(f,sec(11.0),sec(12.0)))*100}% 0 0 0)`}}>
      <Img src={staticFile('assets/google-pizza-glue.jpg')} style={{position:'absolute',left:200,top:140,width:1520,height:760,objectFit:'contain',transform:`scale(${1+.05*ramp(f,sec(12),sec(22))})`}}/>
      <div style={{position:'absolute',left:100,top:80,color:C.carbon,fontFamily:'Barlow Condensed',fontWeight:700,fontSize:68}}>GOOGLE · AI OVERVIEW · 2024</div>
      <div style={{position:'absolute',right:105,bottom:75,background:C.red,color:C.bone,padding:'18px 28px',fontFamily:'Barlow Condensed',fontSize:42,fontWeight:700}}>ДОБАВИТЬ КЛЕЙ В СОУС</div>
    </div>
    <div style={{position:'absolute',inset:0,background:C.red,clipPath:`inset(0 0 ${(1-ramp(f,sec(18.25),sec(19.0)))*100}% 0)`}}>
      <div style={{position:'absolute',left:110,top:105,fontFamily:'Barlow Condensed',fontSize:34,letterSpacing:3,color:C.carbon}}>РЕАЛЬНЫЙ AI-ОТВЕТ В ПОИСКЕ</div>
      <div style={{position:'absolute',left:110,top:245,fontFamily:'Barlow Condensed',fontWeight:700,fontSize:160,lineHeight:.82,color:C.bone}}>КЛЕЙ<br/>В СОУС<br/>ДЛЯ ПИЦЦЫ</div>
      <div style={{position:'absolute',right:120,bottom:110,width:610,fontFamily:'Source Serif 4',fontSize:36,lineHeight:1.35,color:C.carbon}}>Убедительная форма не превращает вероятное продолжение в достоверный совет.</div>
    </div>
  </AbsoluteFill>;
};

const AirCanada:React.FC=()=>{
  const f=useCurrentFrame();const d=sec(22.0);
  return <AbsoluteFill style={{background:C.carbon,opacity:actFade(f,d),overflow:'hidden'}}>
    <FilmImage src="assets/generated-airport-passenger.png" start={0} end={sec(7.35)} fromScale={1.01} toScale={1.09} fromX={-12} toX={18} shade={.24}/>
    <Img src={staticFile('assets/air-canada-logo.svg')} style={{position:'absolute',right:100,top:85,width:390,opacity:ramp(f,sec(.8),sec(1.5))}}/>
    <BigWords lines={['НЕВЕРНЫЕ','УСЛОВИЯ','ВОЗВРАТА']} start={sec(2.1)} y={650} size={82} accent={0}/>
    <div style={{position:'absolute',inset:0,background:C.bone,opacity:ramp(f,sec(7.0),sec(7.8))}}>
      <Img src={staticFile('assets/moffatt-page-1.png')} style={{position:'absolute',left:70,top:80,width:930,height:920,objectFit:'contain',transform:`translateX(${-80+80*ramp(f,sec(7.2),sec(8.2))}px)`}}/>
      <div style={{position:'absolute',left:1050,top:150,width:720,color:C.carbon}}>
        <div style={{fontFamily:'Barlow Condensed',fontSize:32,letterSpacing:3}}>РЕШЕНИЕ ТРИБУНАЛА</div>
        <div style={{fontFamily:'Barlow Condensed',fontWeight:700,fontSize:102,lineHeight:.88,marginTop:42}}>БОТ НЕ<br/>ОТВЕЧАЕТ<br/><span style={{color:C.red}}>ВЫ — ДА</span></div>
        <Rule x={0} y={490} w={650} start={sec(11)} color={C.red}/>
        <div style={{marginTop:110,fontFamily:'Source Serif 4',fontSize:30,lineHeight:1.4}}>Компания не смогла отделить ответственность чат-бота от собственной.</div>
      </div>
    </div>
    <div style={{position:'absolute',inset:0,background:C.carbon,opacity:ramp(f,sec(14.6),sec(15.4))}}>
      <Img src={staticFile('assets/moffatt-order-9.png')} style={{position:'absolute',right:70,top:70,width:960,height:940,objectFit:'contain'}}/>
      <div style={{position:'absolute',left:100,top:160,width:680,color:C.bone}}><div style={{fontFamily:'Barlow Condensed',fontSize:32,letterSpacing:3,color:C.steel}}>ИТОГ РЕШЕНИЯ</div><div style={{fontFamily:'Barlow Condensed',fontWeight:700,fontSize:112,lineHeight:.86,marginTop:45}}>ОТВЕЧАЕТ<br/><span style={{color:C.red}}>КОМПАНИЯ</span></div><div style={{fontFamily:'Barlow Condensed',fontWeight:700,fontSize:92,color:C.red,marginTop:85}}>$812.02</div></div>
    </div>
  </AbsoluteFill>;
};

const METR:React.FC=()=>{
  const f=useCurrentFrame();const d=sec(37.1);
  const bars=[['ОЖИДАНИЕ',.78,C.green],['РЕАЛЬНОСТЬ',1.0,C.red]] as const;
  return <AbsoluteFill style={{background:C.carbon,opacity:actFade(f,d),overflow:'hidden'}}>
    <FilmImage src="assets/generated-metr-developer.png" start={0} end={sec(7.35)} fromScale={1.02} toScale={1.10} fromX={16} toX={-20} shade={.24}/>
    <Label start={0}>METR · 2025</Label>
    <div style={{position:'absolute',left:100,top:720,display:'flex',gap:80,alignItems:'baseline'}}><div><Count to={16} start={sec(1.5)} end={sec(3)} size={120}/><div style={{fontFamily:'Barlow Condensed',fontSize:30,color:C.bone}}>ОПЫТНЫХ РАЗРАБОТЧИКОВ</div></div><div><Count to={246} start={sec(2.5)} end={sec(4)} size={120}/><div style={{fontFamily:'Barlow Condensed',fontSize:30,color:C.bone}}>РЕАЛЬНЫХ ЗАДАЧ</div></div></div>
    <div style={{position:'absolute',inset:0,background:C.paper,opacity:ramp(f,sec(7),sec(8))}}>
      <Img src={staticFile('assets/metr-cover-01.png')} style={{position:'absolute',left:100,top:70,width:750,height:940,objectFit:'contain',transform:`translateX(${(1-ramp(f,sec(7.2),sec(8.2)))*-90}px)`}}/>
      <div style={{position:'absolute',left:940,top:160,width:820,color:C.carbon}}>
        <div style={{fontFamily:'Source Serif 4',fontSize:31,lineHeight:1.4}}>Randomized controlled trial<br/>on experienced open-source developers</div>
        <div style={{marginTop:95,fontFamily:'Barlow Condensed',fontSize:34,letterSpacing:2}}>С ИИ-ИНСТРУМЕНТАМИ</div>
        <div style={{marginTop:10}}><Count to={19} start={sec(10.3)} end={sec(12.8)} suffix="%" size={210} color={C.red}/></div>
        <div style={{fontFamily:'Barlow Condensed',fontWeight:700,fontSize:70,color:C.carbon}}>МЕДЛЕННЕЕ</div>
      </div>
    </div>
    <div style={{position:'absolute',inset:0,background:C.carbon,opacity:ramp(f,sec(14.4),sec(15.2))}}>
      <div style={{position:'absolute',left:110,top:100,fontFamily:'Barlow Condensed',fontWeight:700,fontSize:78,color:C.bone}}>ОЩУЩЕНИЕ И РЕАЛЬНОСТЬ</div>
      <div style={{position:'absolute',left:210,top:315,width:1450}}>{bars.map(([name,val,color],i)=>{const p=ramp(f,sec(16+i*2),sec(17.2+i*2));return <div key={name} style={{display:'grid',gridTemplateColumns:'260px 1fr 160px',alignItems:'center',marginBottom:90}}><div style={{fontFamily:'Barlow Condensed',fontSize:38,color:C.bone}}>{name}</div><div style={{height:86,background:C.dark2}}><div style={{height:'100%',width:`${val*100*p}%`,background:color}}/></div><div style={{fontFamily:'Barlow Condensed',fontSize:52,color,marginLeft:24}}>{i===0?'БЫСТРЕЕ':'−19%'}</div></div>})}</div>
      <div style={{position:'absolute',left:110,bottom:85,right:110,borderTop:`1px solid ${C.steel}`,paddingTop:25,fontFamily:'Source Serif 4',fontSize:27,lineHeight:1.35,color:C.steel,opacity:ramp(f,sec(28),sec(29))}}>Честная оговорка: выборка небольшая, результат нельзя автоматически переносить на все задачи. Но разрыв между ощущением и измерением остаётся.</div>
    </div>
  </AbsoluteFill>;
};

const Business:React.FC=()=>{
  const f=useCurrentFrame();const d=sec(31.5);
  const dots=Array.from({length:100});
  return <AbsoluteFill style={{background:C.bone,opacity:actFade(f,d),overflow:'hidden'}}>
    <Img src={staticFile('assets/mit-nanda-cover.jpg')} style={{position:'absolute',left:80,top:70,width:730,height:940,objectFit:'contain',opacity:1-ramp(f,sec(7.0),sec(7.6)),transform:`scale(${1+.035*ramp(f,0,sec(7.5))})`}}/>
    <div style={{position:'absolute',left:900,top:90,right:90}}>
      <div style={{fontFamily:'Barlow Condensed',fontWeight:700,fontSize:72,color:C.carbon}}>GENAI DIVIDE</div>
      <div style={{fontFamily:'Source Serif 4',fontSize:29,color:C.steel,marginTop:12}}>MIT NANDA · 2025</div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(10, 34px)',gap:12,marginTop:78}}>{dots.map((_,i)=>{const p=ramp(f,sec(3)+i*.7,sec(3)+i*.7+10);return <div key={i} style={{width:30,height:30,background:i<95?C.red:C.green,opacity:p}}/>})}</div>
      <div style={{marginTop:38,fontFamily:'Barlow Condensed',fontWeight:700,fontSize:79,color:C.carbon}}><span style={{color:C.red}}>≈95%</span> БЕЗ ЭФФЕКТА<br/>НА ПРИБЫЛЬ</div>
      <div style={{fontFamily:'Source Serif 4',fontSize:25,color:C.steel,marginTop:20}}>Методику отчёта критиковали — это важно учитывать.</div>
    </div>
    <div style={{position:'absolute',inset:0,background:C.carbon,opacity:ramp(f,sec(11.4),sec(12.3))}}>
      <FilmImage src="assets/generated-support-floor.png" start={sec(11.4)} end={sec(18.7)} fromScale={1.01} toScale={1.08} fromX={0} toX={20} shade={.3}/>
      <Label start={sec(11.6)}>KLARNA · ПОДДЕРЖКА</Label>
      <BigWords lines={['ЭКОНОМИЯ','ВЫРОСЛА.','КАЧЕСТВО — НЕТ.']} start={sec(13.1)} y={690} size={74} accent={2}/>
    </div>
    <div style={{position:'absolute',inset:0,background:'#E8E4DB',clipPath:`inset(0 ${(1-ramp(f,sec(19),sec(20)))*100}% 0 0)`}}>
      <Img src={staticFile('assets/klarna-ceo-official.png')} style={{position:'absolute',left:0,top:0,width:1040,height:1080,objectFit:'cover',objectPosition:'center'}}/>
      <div style={{position:'absolute',left:1080,top:140,right:90,color:C.carbon}}>
        <div style={{fontFamily:'Barlow Condensed',fontSize:31,letterSpacing:3}}>РЕАЛЬНЫЙ РУКОВОДИТЕЛЬ KLARNA</div>
        <div style={{fontFamily:'Barlow Condensed',fontWeight:700,fontSize:94,lineHeight:.9,marginTop:55}}>ЛЮДЕЙ<br/>ПРИДЁТСЯ<br/><span style={{color:C.red}}>ВОЗВРАЩАТЬ</span></div>
        <Rule x={0} y={460} w={680} start={sec(23)} color={C.red}/>
        <div style={{fontFamily:'Source Serif 4',fontSize:34,lineHeight:1.35,marginTop:100}}>Когда экономия становится единственной метрикой, качество исчезает из поля зрения.</div>
      </div>
    </div>
    <div style={{position:'absolute',inset:0,background:C.carbon,opacity:ramp(f,sec(26.2),sec(27.0))}}>
      <FilmImage src="assets/generated-support-floor.png" start={sec(26.2)} end={d} fromScale={1.07} toScale={1.13} fromX={20} toX={-10} shade={.44}/>
      <div style={{position:'absolute',left:100,top:150,fontFamily:'Barlow Condensed',fontWeight:700,fontSize:112,lineHeight:.88,color:C.bone}}>ЭКОНОМИЯ<br/>БЕЗ КАЧЕСТВА —<br/><span style={{color:C.red}}>НЕ РЕВОЛЮЦИЯ</span></div>
    </div>
  </AbsoluteFill>;
};

const Reframe:React.FC=()=>{
  const f=useCurrentFrame();const d=sec(20.5);
  return <AbsoluteFill style={{background:C.carbon,opacity:actFade(f,d),overflow:'hidden'}}>
    <FilmImage src="assets/generated-stage-desk.png" start={0} end={sec(7.35)} fromScale={1.0} toScale={1.075} fromX={-15} toX={16} shade={.27}/>
    <BigWords lines={['НАМ ПРОДАЛИ','ВОЛШЕБНИКА']} start={sec(1.1)} y={710} size={90} accent={1}/>
    <div style={{position:'absolute',inset:0,background:C.bone,opacity:ramp(f,sec(7.0),sec(7.8))}}>
      <FilmImage src="assets/generated-trainee-review.png" start={sec(7)} end={sec(14.35)} fromScale={1.02} toScale={1.09} fromX={15} toX={-16} shade={.2}/>
      <div style={{position:'absolute',left:90,top:90,color:C.bone,fontFamily:'Barlow Condensed',fontWeight:700,fontSize:90,lineHeight:.9}}>ПОЛУЧИЛИ<br/><span style={{color:C.red}}>БЫСТРОГО СТАЖЁРА</span></div>
      <div style={{position:'absolute',right:90,bottom:85,width:560,color:C.bone,fontFamily:'Source Serif 4',fontSize:34,lineHeight:1.3}}>Он не устаёт. Но и не признаётся, когда не знает ответа.</div>
    </div>
    <div style={{position:'absolute',inset:0,background:C.carbon,opacity:ramp(f,sec(14.1),sec(14.9))}}>
      <div style={{position:'absolute',left:170,top:230,width:1580,height:600,borderTop:`1px solid ${C.steel}`,borderBottom:`1px solid ${C.steel}`}}>
        {[['ПРОВЕРЯЕТЕ',C.green,'БЕСЦЕНЕН'],['ВЕРИТЕ СЛЕПО',C.red,'ОПАСЕН']].map(([a,col,b],i)=>{const p=panelSpring(f,sec(15)+i*6);return <div key={a} style={{position:'absolute',left:i*790,top:0,width:790,height:600,borderRight:i===0?`1px solid ${C.steel}`:undefined,display:'grid',placeItems:'center',opacity:p,transform:`translateY(${(1-p)*60}px)`}}><div style={{textAlign:'center'}}><div style={{fontFamily:'Source Serif 4',fontSize:30,color:C.steel}}>{a}</div><div style={{fontFamily:'Barlow Condensed',fontWeight:700,fontSize:108,color:col,marginTop:35}}>{b}</div></div></div>})}
      </div>
    </div>
  </AbsoluteFill>;
};

const Habit:React.FC=()=>{
  const f=useCurrentFrame();const d=sec(23.1);
  const q=ramp(f,sec(1.0),sec(2.0));
  const routes=[{name:'ДЕНЬГИ',icon:Banknote},{name:'ЗДОРОВЬЕ',icon:HeartPulse},{name:'ЗАКОН',icon:Scale}];
  return <AbsoluteFill style={{background:C.bone,opacity:actFade(f,d),overflow:'hidden'}}>
    <FilmImage src="assets/generated-source-check.png" start={0} end={sec(7.35)} fromScale={1.01} toScale={1.07} fromX={-8} toX={14} shade={.3}/>
    <Label start={0}>ОБЕЩАННАЯ ПРИВЫЧКА</Label>
    <div style={{position:'absolute',left:100,top:660,right:100,color:C.bone,fontFamily:'Barlow Condensed',fontWeight:700,fontSize:82,lineHeight:.92,opacity:q,transform:`translateY(${(1-q)*50}px)`}}>ЧТО БУДЕТ, ЕСЛИ ЭТО<br/><span style={{color:C.red}}>ОКАЖЕТСЯ НЕПРАВДОЙ?</span></div>
    <div style={{position:'absolute',inset:0,background:C.carbon,opacity:ramp(f,sec(7),sec(7.8))}}>
      <div style={{position:'absolute',left:95,top:90,fontFamily:'Barlow Condensed',fontSize:34,letterSpacing:3,color:C.steel}}>ЕСЛИ СТАВКА ВЫСОКА</div>
      <div style={{position:'absolute',left:95,right:95,top:210,display:'flex',gap:34}}>{routes.map((r,i)=>{const p=panelSpring(f,sec(9)+i*6);const Icon=r.icon;return <div key={r.name} style={{flex:1,height:390,borderTop:`5px solid ${C.red}`,borderBottom:`1px solid ${C.steel}`,display:'flex',flexDirection:'column',justifyContent:'space-between',padding:'42px 0',opacity:p,transform:`translateY(${(1-p)*55}px)`}}><Icon size={66} strokeWidth={1.5} color={C.red}/><div style={{fontFamily:'Barlow Condensed',fontWeight:700,fontSize:64,color:C.bone}}>{r.name}</div></div>})}</div>
      <div style={{position:'absolute',left:95,top:730,right:95,display:'flex',alignItems:'center',gap:35,opacity:ramp(f,sec(14),sec(15))}}><SearchCheck size={84} strokeWidth={1.3} color={C.green}/><div style={{fontFamily:'Barlow Condensed',fontWeight:700,fontSize:80,color:C.bone}}>ПРОВЕРЬТЕ ПЕРВОИСТОЧНИК</div></div>
      <div style={{position:'absolute',left:95,bottom:70,right:95,height:5,background:C.dark2}}><div style={{height:'100%',width:`${ramp(f,sec(15),sec(21))*100}%`,background:C.green}}/></div>
    </div>
  </AbsoluteFill>;
};

const CTA:React.FC=()=>{
  const f=useCurrentFrame();const d=sec(21.65);
  return <AbsoluteFill style={{background:C.carbon,opacity:actFade(f,d),overflow:'hidden'}}>
    <FilmImage src="assets/generated-viewer-comment.png" start={0} end={sec(7.35)} fromScale={1.02} toScale={1.09} fromX={12} toX={-16} shade={.32}/>
    <BigWords lines={['ЛОВИЛИ ИИ','НА ЛЖИ?']} start={sec(.8)} y={150} size={115} accent={1}/>
    <div style={{position:'absolute',left:100,bottom:100,color:C.bone,fontFamily:'Source Serif 4',fontSize:34}}>Расскажите самый абсурдный случай в комментариях.</div>
    <div style={{position:'absolute',inset:0,background:C.bone,opacity:ramp(f,sec(7.0),sec(7.8))}}>
      <div style={{position:'absolute',left:95,top:80,fontFamily:'Barlow Condensed',fontWeight:700,fontSize:72,color:C.carbon}}>ТРИ ВОПРОСА К ВЫДУМКЕ</div>
      {[['01','ГДЕ ПЕРВОИСТОЧНИК?'],['02','МОЖНО ЛИ ПРОВЕРИТЬ?'],['03','КАКОВА ЦЕНА ОШИБКИ?']].map(([n,t],i)=>{const p=panelSpring(f,sec(8)+i*8);return <div key={n} style={{position:'absolute',left:100,top:225+i*190,right:100,height:150,borderTop:`1px solid ${C.steel}`,display:'grid',gridTemplateColumns:'150px 1fr 100px',alignItems:'center',opacity:p,transform:`translateX(${(1-p)*80}px)`}}><div style={{fontFamily:'Barlow Condensed',fontSize:40,color:C.red}}>{n}</div><div style={{fontFamily:'Barlow Condensed',fontWeight:700,fontSize:59,color:C.carbon}}>{t}</div><ArrowRight size={55} color={C.carbon}/></div>})}
    </div>
    <div style={{position:'absolute',inset:0,background:C.carbon,clipPath:`inset(0 0 0 ${(1-ramp(f,sec(14.1),sec(15.0)))*100}%)`}}>
      <Img src={staticFile('assets/mata-sanctions-40.png')} style={{position:'absolute',left:80,top:65,width:900,height:950,objectFit:'contain',opacity:.48,transform:`scale(${1+.04*ramp(f,sec(15),d)})`}}/>
      <div style={{position:'absolute',left:1080,top:180,right:80}}>
        <ShieldCheck size={92} strokeWidth={1.2} color={C.green}/>
        <div style={{fontFamily:'Barlow Condensed',fontWeight:700,fontSize:104,lineHeight:.88,color:C.bone,marginTop:45}}>НЕ СТАНЬТЕ<br/>ТЕМ САМЫМ<br/><span style={{color:C.green}}>АДВОКАТОМ</span></div>
        <div style={{fontFamily:'Source Serif 4',fontSize:30,color:C.steel,marginTop:50}}>Проверка — не недоверие к технологии.<br/>Это управление последствиями.</div>
      </div>
    </div>
  </AbsoluteFill>;
};

export const AIBeautifulLie:React.FC=()=>{
  return <AbsoluteFill style={{background:C.carbon}}>
    <Audio src={staticFile('narration.wav')}/>
    <Sequence from={0} durationInFrames={sec(31.4)}><Hook/></Sequence>
    <Sequence from={sec(31.4)} durationInFrames={sec(27.2)}><MataCase/></Sequence>
    <Sequence from={sec(58.6)} durationInFrames={sec(23.9)}><Hallucination/></Sequence>
    <Sequence from={sec(82.5)} durationInFrames={sec(22.0)}><AirCanada/></Sequence>
    <Sequence from={sec(104.5)} durationInFrames={sec(37.1)}><METR/></Sequence>
    <Sequence from={sec(141.6)} durationInFrames={sec(31.5)}><Business/></Sequence>
    <Sequence from={sec(173.1)} durationInFrames={sec(20.5)}><Reframe/></Sequence>
    <Sequence from={sec(193.6)} durationInFrames={sec(23.1)}><Habit/></Sequence>
    <Sequence from={sec(216.7)} durationInFrames={7113-sec(216.7)}><CTA/></Sequence>
  </AbsoluteFill>;
};
