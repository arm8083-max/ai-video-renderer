import React from 'react';
import '@fontsource/fraunces/600.css';
import '@fontsource/fraunces/700.css';
import '@fontsource/ibm-plex-sans-condensed/400.css';
import '@fontsource/ibm-plex-sans-condensed/600.css';
import '@fontsource/ibm-plex-sans-condensed/700.css';
import {AbsoluteFill, Img, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {Archive, BadgeDollarSign, BookOpen, BrainCircuit, Building2, Database, Eye, Factory, FileWarning, Flame, Gavel, KeyRound, LockKeyhole, MessageSquareText, Microscope, Search, ShieldCheck, Siren, UserCheck, Users, Zap} from 'lucide-react';
import {BrandWord, C, CameraImage, Drawer, EditorialTitle, EvidenceSheet, InspectionKey, KineticPhrase, Metric, SceneFrame, SourceLabel, cue, localCue, ramp, scenes, sec} from './design';

const visible=(f:number,a:number,b:number,fade=18)=>ramp(f,a,a+fade,'reveal')*(1-ramp(f,b-fade,b,'reveal'));
const IconBadge:React.FC<{icon:React.FC<any>;start:number;x:number;y:number;label:string;color?:string}>=({icon:Icon,start,x,y,label,color=C.brass})=>{const f=useCurrentFrame();const p=ramp(f,start,start+18);return <div style={{position:'absolute',left:x,top:y,width:270,opacity:p,transform:`translateY(${(1-p)*36}px)`}}><Icon size={58} color={color} strokeWidth={1.5}/><div style={{marginTop:20,fontFamily:'IBM Plex Sans Condensed',fontSize:25,fontWeight:600,letterSpacing:1.5,color}}>{label}</div></div>};
const Quote:React.FC<{start:number;x:number;y:number;width:number;text:string;by?:string;dark?:boolean;size?:number}>=({start,x,y,width,text,by,dark=false,size=48})=>{const f=useCurrentFrame();const p=ramp(f,start,start+22);return <div style={{position:'absolute',left:x,top:y,width,borderLeft:`7px solid ${C.oxblood}`,paddingLeft:30,opacity:p,transform:`translateX(${(1-p)*45}px)`,color:dark?C.soot:C.ivory}}><div style={{fontFamily:'Fraunces',fontSize:size,lineHeight:1.08}}>{text}</div>{by&&<div style={{fontFamily:'IBM Plex Sans Condensed',fontSize:22,letterSpacing:2,color:C.muted,marginTop:24,textTransform:'uppercase'}}>{by}</div>}</div>};
const SplitCard:React.FC<{start:number;x:number;y:number;title:string;body:string;accent?:string;icon?:React.FC<any>}>=({start,x,y,title,body,accent=C.brass,icon:Icon})=>{const f=useCurrentFrame();const p=ramp(f,start,start+20);return <div style={{position:'absolute',left:x,top:y,width:520,height:300,borderTop:`5px solid ${accent}`,borderBottom:`1px solid ${C.lacquer}`,paddingTop:28,opacity:p,transform:`translateY(${(1-p)*50}px)`}}>{Icon&&<Icon size={46} color={accent} strokeWidth={1.5}/>}<div style={{fontFamily:'Fraunces',fontSize:54,lineHeight:.95,color:C.ivory,marginTop:Icon?24:0}}>{title}</div><div style={{fontFamily:'IBM Plex Sans Condensed',fontSize:25,lineHeight:1.32,color:C.muted,marginTop:22}}>{body}</div></div>};

const Act1:React.FC=()=>{
  const f=useCurrentFrame(),s=scenes[0].start,d=scenes[0].end-s;
  const inside=localCue('hidden inside that cabinet',s),master=localCue('human chess master',s),napoleon=localCue('Napoleon',s),wrong=localCue('they were wrong',s);
  return <SceneFrame duration={d} chapter="Vienna · 1770">
    <CameraImage src="assets/mechanical-turk-racknitz-public-domain.jpg" end={inside} fromScale={1.03} toScale={1.18} fromX={80} toX={-40} fromY={20} toY={-15} shade={.18}/>
    <div style={{position:'absolute',left:85,top:130,width:440,height:610,opacity:visible(f,sec(1.5),inside-8)}}><Img src={staticFile('assets/wolfgang-von-kempelen-public-domain.jpg')} style={{width:'100%',height:'100%',objectFit:'cover',filter:'sepia(.22)'}}/><div style={{position:'absolute',left:0,bottom:-58,fontFamily:'IBM Plex Sans Condensed',fontSize:25,color:C.ivory,letterSpacing:2}}>WOLFGANG VON KEMPELEN</div></div>
    <EditorialTitle lines={['THE MACHINE','THAT THOUGHT']} start={sec(.6)} x={900} y={180} width={850} size={104}/>
    <div style={{position:'absolute',right:100,top:600,width:420,height:320,opacity:visible(f,napoleon,wrong)}}><Img src={staticFile('assets/napoleon-public-domain.jpg')} style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'50% 18%'}}/><div style={{fontFamily:'IBM Plex Sans Condensed',fontSize:22,color:C.brass,marginTop:8}}>NAPOLEON BONAPARTE · REPORTED OPPONENT</div></div>
    <div style={{position:'absolute',inset:0,background:C.soot,opacity:ramp(f,inside-15,inside+12)}}/>
    <div style={{position:'absolute',left:0,top:0,width:1920,height:1080,opacity:ramp(f,inside,inside+20),clipPath:`inset(0 ${Math.max(0,100-ramp(f,inside,inside+28,'reveal')*100)}% 0 0)`}}><CameraImage src="assets/mechanical-turk-interior-public-domain.jpg" start={inside} end={d} fromScale={1.0} toScale={1.12} fromX={0} toX={20} shade={.28}/></div>
    <Metric value="NOT A MACHINE" label="A person working the levers" start={master} x={102} y={690} color={C.oxblood} size={88}/>
    <SourceLabel start={0}>Joseph Racknitz engraving · public domain archival source</SourceLabel>
  </SceneFrame>;
};

const Act2:React.FC=()=>{
  const f=useCurrentFrame(),s=scenes[1].start,d=scenes[1].end-s;
  const angry=localCue('you should be angry',s),work=localCue('really doing the work',s),bill=localCue('paying the bill',s),test=localCue('fourquestion test',s);
  return <SceneFrame duration={d} chapter="The same trick · new century">
    <div style={{position:'absolute',left:90,top:160,width:1740,height:690,border:`2px solid ${C.brass}`,background:C.soot2}}>
      {Array.from({length:8},(_,i)=><Drawer key={i} start={sec(.7)+i*4} x={35+(i%4)*420} y={35+Math.floor(i/4)*310} w={380} h={270} label={`Secret ${i+1}`} active={i===Math.min(7,Math.floor(f/135))}><div style={{fontFamily:'Fraunces',fontSize:64,color:i===Math.min(7,Math.floor(f/135))?C.ivory:C.muted}}>0{i+1}</div></Drawer>)}
    </div>
    <KineticPhrase words={['WHO', 'DOES', 'THE', 'WORK?']} start={work} x={130} y={230} size={56} color={C.ivory}/>
    <KineticPhrase words={['WHO', 'PAYS', 'THE', 'BILL?']} start={bill} x={1070} y={545} size={56} color={C.ivory}/>
    <div style={{position:'absolute',inset:0,background:C.oxblood,opacity:ramp(f,angry-8,angry+12)*.9}}/>
    <EditorialTitle lines={['EIGHT DOORS.','ONE TEST.']} start={test} x={350} y={340} width={1220} size={128} align="center"/>
    <InspectionKey start={test+10} x={825} y={760}/>
  </SceneFrame>;
};

const Act3:React.FC=()=>{
  const f=useCurrentFrame(),s=scenes[2].start,d=scenes[2].end-s;
  const sama=localCue('called Sama',s),kenya=localCue('workers in Kenya',s),pay=localCue('one dollar thirty',s),haunted=localCue('haunted by what they read',s),amazon=localCue('Amazon runs a marketplace',s),turk=localCue('called Mechanical Turk',s);
  return <SceneFrame duration={d} chapter="Secret 01 · The ghosts in the machine">
    <div style={{opacity:visible(f,0,sama+95)}}><CameraImage src="assets/metaphor-hidden-labor.png" end={sama+95} fromScale={1.01} toScale={1.08} fromX={0} toX={-25} shade={.18}/><EditorialTitle lines={['THE POLITE','ANSWER HAS','HANDS']} start={sec(.4)} x={1040} y={160} width={760} size={84}/></div>
    <div style={{position:'absolute',inset:0,background:C.soot,opacity:ramp(f,sama-15,sama+12)}}/>
    <div style={{position:'absolute',left:80,top:115,width:980,height:690,background:C.ivory,border:`2px solid ${C.brass}`,opacity:ramp(f,sama,sama+20),transform:`translateY(${(1-ramp(f,sama,sama+20))*60}px)`}}>
      <div style={{height:88,background:'#B4080B',color:'#FFFFFF',fontFamily:'Fraunces',fontWeight:700,fontSize:54,padding:'12px 35px'}}>TIME</div>
      <div style={{padding:'42px 48px',color:C.soot}}><div style={{fontFamily:'IBM Plex Sans Condensed',fontSize:22,letterSpacing:2,color:C.oxblood}}>EXCLUSIVE · JANUARY 18, 2023</div><div style={{fontFamily:'Fraunces',fontWeight:600,fontSize:60,lineHeight:1.02,marginTop:28}}>OpenAI Used Kenyan Workers on Less Than $2 Per Hour to Make ChatGPT Less Toxic</div><div style={{fontFamily:'IBM Plex Sans Condensed',fontSize:24,color:C.muted,marginTop:42}}>Reporting by Billy Perrigo · verified source title</div></div>
    </div>
    <BrandWord name="OpenAI × Sama" start={sama+10} x={1150} y={150} accent={C.ivory} size={64}/>
    <Metric value="KENYA" label="Human content-labeling work" start={kenya} x={1150} y={300} size={100}/>
    <Metric value="$1.32–$2.00" label="Reported take-home pay per hour" start={pay} x={1120} y={510} color={C.oxblood} size={126}/>
    <Quote start={haunted} x={1120} y={760} width={670} text="Haunted by what they read" by="Workers described by TIME" size={40}/>
    <div style={{position:'absolute',inset:0,background:C.soot,opacity:ramp(f,amazon-18,amazon+12)}}/>
    <div style={{position:'absolute',left:110,top:145,width:1660,height:680,border:`2px solid ${C.brass}`,opacity:ramp(f,amazon,amazon+18)}}>
      <BrandWord name="Amazon Mechanical Turk" start={amazon} x={60} y={55} accent={C.ivory} size={76}/>
      {Array.from({length:28},(_,i)=>{const p=ramp(f,amazon+12+i*2,amazon+28+i*2);return <div key={i} style={{position:'absolute',left:70+(i%7)*220,top:190+Math.floor(i/7)*105,width:180,height:70,background:i%5===0?C.oxblood:C.paper,opacity:p,transform:`translateY(${(1-p)*28}px)`,fontFamily:'IBM Plex Sans Condensed',fontSize:17,color:C.soot,padding:12}}>HUMAN INTELLIGENCE TASK</div>})}
    </div>
    <Quote start={turk} x={1060} y={850} width={700} text="Named after the fake chess machine." size={43}/>
  </SceneFrame>;
};

const Act4:React.FC=()=>{
  const f=useCurrentFrame(),s=scenes[3].start,d=scenes[3].end-s;
  const jwo=localCue('Just Walk Out stores',s),india=localCue('reviewers in India',s),middle=localCue('truth is somewhere in the middle',s),secCue=localCue('SEC charged two investment advisers',s),washing=localCue('AI washing',s),dnp=localCue('company called DoNotPay',s),settle=localCue('one hundred ninetythree thousand dollars',s);
  return <SceneFrame duration={d} chapter="Secret 02 · Sometimes the AI is not AI">
    <div style={{opacity:visible(f,0,secCue-10)}}><CameraImage src="assets/amazon-just-walk-out.png" end={secCue} fromScale={1.02} toScale={1.10} fromX={0} toX={-30} shade={.32}/><BrandWord name="Amazon Just Walk Out" start={jwo} x={100} y={150} accent={C.ivory}/><Metric value="≈1,000" label="Reviewers in India · reported by The Information" start={india} x={105} y={620} color={C.oxblood}/><Quote start={middle} x={1060} y={670} width={690} text="The truth is somewhere in the middle." size={40}/></div>
    <div style={{position:'absolute',inset:0,background:C.soot,opacity:ramp(f,secCue-15,secCue+10)}}/>
    <div style={{position:'absolute',left:90,top:145,width:1740,height:720,border:`2px solid ${C.brass}`,opacity:ramp(f,secCue,secCue+18)}}>
      <div style={{position:'absolute',left:45,top:35,fontFamily:'IBM Plex Sans Condensed',fontSize:28,letterSpacing:3,color:C.brass}}>U.S. SECURITIES AND EXCHANGE COMMISSION · MARCH 2024</div>
      <SplitCard start={secCue+8} x={60} y={130} title="DELPHIA" body="False and misleading statements about purported AI use." accent={C.oxblood} icon={FileWarning}/>
      <SplitCard start={secCue+15} x={650} y={130} title="GLOBAL PREDICTIONS" body="Claims including “expert AI-driven forecasts” were not substantiated." accent={C.oxblood} icon={FileWarning}/>
      <Metric value="$400,000" label="Combined civil penalties" start={secCue+24} x={1235} y={245} color={C.oxblood} size={112}/>
      <EditorialTitle lines={['AI','WASHING']} start={washing} x={1110} y={500} width={570} size={112} accent={1}/>
    </div>
    <div style={{position:'absolute',inset:0,background:C.ivory,opacity:ramp(f,dnp-16,dnp+10)}}/>
    <div style={{opacity:ramp(f,dnp,dnp+16)}}><BrandWord name="DoNotPay" start={dnp} x={110} y={150} accent={C.soot} size={86}/><div style={{position:'absolute',left:110,top:300,width:720,height:500,border:`2px solid ${C.oxblood}`,padding:48}}><Gavel size={90} color={C.oxblood} strokeWidth={1.3}/><div style={{fontFamily:'Fraunces',fontSize:82,color:C.soot,marginTop:40}}>“Robot lawyer”</div><div style={{fontFamily:'IBM Plex Sans Condensed',fontSize:28,color:C.muted,marginTop:35,lineHeight:1.35}}>FTC: not tested to perform like a human lawyer.</div></div><Metric value="$193,000" label="FTC settlement" start={settle} x={1010} y={390} color={C.oxblood} size={154}/></div>
  </SceneFrame>;
};

const Act5:React.FC=()=>{
  const f=useCurrentFrame(),s=scenes[4].start,d=scenes[4].end-s;
  const cais=localCue('Center for AI Safety',s),ext=localCue('risk of extinction',s),signers=localCue('Among the signers',s),work=localCue('went back to work',s),letter=localCue('open letter signed by Elon Musk',s),pause=localCue('sixmonth pause',s),xai=localCue('launched his own AI company',s),ad=localCue('warning can double as an advertisement',s);
  return <SceneFrame duration={d} chapter="Secret 03 · The warning and the race">
    <EvidenceSheet src="assets/cais-extinction-statement.png" start={cais} x={90} y={120} width={1150} caption="Center for AI Safety · official statement"/>
    <Quote start={ext} x={1240} y={230} width={590} text="Mitigating the risk of extinction from AI should be a global priority." size={41}/>
    <div style={{position:'absolute',left:120,top:785,display:'flex',gap:36,opacity:ramp(f,signers,signers+18)}}>{[['Sam Altman','OPENAI'],['Demis Hassabis','GOOGLE DEEPMIND'],['Dario Amodei','ANTHROPIC']].map(([n,c],i)=><div key={n} style={{width:510,borderTop:`4px solid ${i===2?C.oxblood:C.brass}`,paddingTop:20}}><div style={{fontFamily:'Fraunces',fontSize:42}}>{n}</div><div style={{fontFamily:'IBM Plex Sans Condensed',fontSize:22,color:C.muted,marginTop:10}}>{c}</div></div>)}</div>
    <div style={{position:'absolute',inset:0,background:C.oxblood,opacity:ramp(f,work-8,work+16)*.92}}/><EditorialTitle lines={['WARN.','RAISE.','BUILD FASTER.']} start={work} x={230} y={240} width={1450} size={142} accent={2} align="center"/>
    <div style={{position:'absolute',inset:0,background:C.soot,opacity:ramp(f,letter-18,letter+10)}}/>
    <EvidenceSheet src="assets/fli-pause-letter-page-01.jpg" start={letter} x={100} y={105} width={820} caption="Future of Life Institute · open letter"/>
    <div style={{position:'absolute',right:120,top:120,width:570,height:440,opacity:ramp(f,letter+8,letter+26)}}><Img src={staticFile('assets/elon-musk-cc-by-sa.jpg')} style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'50% 20%'}}/><div style={{fontFamily:'IBM Plex Sans Condensed',fontSize:21,color:C.brass,marginTop:8}}>ELON MUSK · REAL PHOTOGRAPH</div></div>
    <Metric value="6 MONTHS" label="Requested pause" start={pause} x={1040} y={690} color={C.brass} size={110}/>
    <div style={{position:'absolute',inset:0,background:C.soot,opacity:ramp(f,xai-12,xai+10)}}/><CameraImage src="assets/xai-official.png" start={xai} end={ad} fromScale={1.02} toScale={1.09} shade={.28}/><BrandWord name="xAI · July 2023" start={xai} x={120} y={180} accent={C.ivory} size={86}/><Quote start={ad} x={760} y={640} width={990} text="A warning can also become an advertisement." size={58}/>
  </SceneFrame>;
};

const Act6:React.FC=()=>{
  const f=useCurrentFrame(),s=scenes[5].start,d=scenes[5].end-s;
  const founded=localCue('founded in twenty fifteen',s),profit=localCue('forprofit arm',s),fired=localCue('board suddenly fired Sam Altman',s),back=localCue('he was back',s),vox=localCue('Vox reported',s),leike=localCue('Jan Leike',s),shiny=localCue('shiny products',s),pbc=localCue('public benefit corporation',s),quiet=localCue('to stay quiet',s);
  return <SceneFrame duration={d} chapter="Secret 04 · Mission, money, silence">
    <div style={{position:'absolute',left:120,top:190,width:1680,height:560,borderTop:`2px solid ${C.brass}`,borderBottom:`2px solid ${C.brass}`}}>
      {[['2015','NONPROFIT',founded],['2019','CAPPED-PROFIT ARM',profit],['2023','BOARD CRISIS',fired],['2025','PUBLIC BENEFIT CORP.',pbc]].map(([year,label,t],i)=>{const p=ramp(f,t as number,(t as number)+18);return <div key={label as string} style={{position:'absolute',left:40+i*410,top:85,width:330,opacity:p,transform:`translateY(${(1-p)*50}px)`}}><div style={{fontFamily:'Fraunces',fontSize:72,color:i===2?C.oxblood:C.brass}}>{year}</div><div style={{fontFamily:'IBM Plex Sans Condensed',fontSize:27,color:C.ivory,marginTop:30,lineHeight:1.15}}>{label}</div><div style={{width:16,height:16,background:i===2?C.oxblood:C.brass,marginTop:90}}/></div>})}
    </div>
    <div style={{position:'absolute',right:110,top:540,width:510,height:400,opacity:visible(f,fired,vox+70)}}><Img src={staticFile('assets/sam-altman-cc-by.jpg')} style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'50% 25%'}}/><div style={{fontFamily:'IBM Plex Sans Condensed',fontSize:20,color:C.brass,marginTop:8}}>SAM ALTMAN · REAL PHOTOGRAPH</div></div>
    <Metric value="FIRED" label="Board: not consistently candid" start={fired} x={105} y={800} color={C.oxblood} size={118}/><Metric value="BACK" label="Days later" start={back} x={550} y={800} color={C.green} size={118}/>
    <div style={{position:'absolute',inset:0,background:C.soot,opacity:ramp(f,vox-14,vox+10)}}/><SplitCard start={vox} x={110} y={180} title="VESTED EQUITY" body="Departing employees faced strict non-disparagement paperwork, Vox reported." accent={C.oxblood} icon={LockKeyhole}/><SplitCard start={leike} x={700} y={180} title="JAN LEIKE" body="Former co-lead of safety work resigned and wrote publicly about the culture." accent={C.brass} icon={UserCheck}/><Quote start={shiny} x={1020} y={610} width={760} text="Safety culture and processes had taken a back seat to shiny products." by="Jan Leike · public statement" size={52}/>
    <div style={{position:'absolute',inset:0,background:C.soot,opacity:ramp(f,pbc-14,pbc+8)}}/><div style={{position:'absolute',left:115,top:160,width:1690,height:650,border:`2px solid ${C.brass}`}}><BrandWord name="OpenAI Group PBC" start={pbc} x={60} y={60} accent={C.ivory} size={76}/><div style={{position:'absolute',left:80,top:220,width:630,height:260,border:`1px solid ${C.brass}`,padding:34,fontFamily:'Fraunces',fontSize:48,color:C.ivory}}>Public benefit corporation<div style={{fontFamily:'IBM Plex Sans Condensed',fontSize:23,color:C.muted,marginTop:25}}>Overseen by a nonprofit foundation</div></div><Quote start={quiet} x={900} y={250} width={650} text="Trust on the surface. Silence underneath." size={54}/></div>
  </SceneFrame>;
};

const Act7:React.FC=()=>{
  const f=useCurrentFrame(),s=scenes[6].start,d=scenes[6].end-s;
  const ahead=localCue('already ahead of most people',s),coffee=localCue('grab a coffee',s),chair=localCue('push my chair back',s);
  return <SceneFrame duration={d} chapter="Inspection pause">
    <div style={{position:'absolute',left:120,top:150,width:1680,height:650,border:`2px solid ${C.brass}`,background:C.soot2}}>{Array.from({length:4},(_,i)=><Drawer key={i} start={sec(.2)+i*4} x={50+i*405} y={55} w={360} h={510} label={`Opened ${i+1}`} active><div style={{fontFamily:'Fraunces',fontSize:80,color:C.brass}}>0{i+1}</div><div style={{fontFamily:'IBM Plex Sans Condensed',fontSize:25,color:C.ivory,marginTop:50}}>{['HIDDEN LABOR','AI WASHING','THE RACE','MISSION vs MONEY'][i]}</div></Drawer>)}</div>
    <Quote start={ahead} x={230} y={870} width={650} text="Most people never ask these questions." size={36}/>
    <IconBadge icon={Archive} start={coffee} x={1030} y={820} label="Pause. Look closer."/>
    <div style={{position:'absolute',right:110,top:80,fontFamily:'Fraunces',fontSize:220,color:C.lacquer,opacity:ramp(f,chair,chair+16)}}>05</div>
  </SceneFrame>;
};

const Act8:React.FC=()=>{
  const f=useCurrentFrame(),s=scenes[7].start,d=scenes[7].end-s;
  const learned=localCue('They learned from us',s),nyt=localCue('New York Times sued',s),getty=localCue('Getty Images sued',s),anth=localCue('Anthropic',s,1),billion=localCue('one point five billion dollars',s),fair=localCue('fair use',s),asked=localCue('Nobody asked them',s),scarlett=localCue('Scarlett Johansson',s),voice=localCue('voice that sounded',s),clearview=localCue('Clearview AI',s),faces=localCue('billions of face photos',s);
  return <SceneFrame duration={d} chapter="Secret 05 · The all-you-can-eat buffet">
    <EditorialTitle lines={['THEY LEARNED','FROM US']} start={learned} x={410} y={250} width={1100} size={132} accent={1} align="center"/>
    <div style={{position:'absolute',left:180,top:650,display:'flex',gap:80}}>{[[BookOpen,'BOOKS'],[MessageSquareText,'ARTICLES'],[Eye,'PHOTOS'],[Database,'FORUMS']].map(([I,t],i)=>{const Icon=I as React.FC<any>;return <IconBadge key={t as string} icon={Icon} start={learned+8+i*5} x={i*410} y={0} label={t as string}/>})}</div>
    <div style={{position:'absolute',inset:0,background:C.soot,opacity:ramp(f,nyt-16,nyt+10)}}/><EvidenceSheet src="assets/nyt-openai-microsoft-complaint-page-01.jpg" start={nyt} x={80} y={105} width={720} caption="The New York Times v. Microsoft and OpenAI · complaint"/><BrandWord name="The New York Times × OpenAI × Microsoft" start={nyt+10} x={880} y={160} accent={C.ivory} size={49}/>
    <SplitCard start={getty} x={880} y={290} title="GETTY IMAGES" body="Lawsuit over training on its photographs." accent={C.brass} icon={Eye}/>
    <EvidenceSheet src="assets/anthropic-settlement-notice-page-01.jpg" start={anth} x={1390} y={350} width={350} caption="Anthropic settlement notice"/>
    <Metric value="$1.5B" label="Authors' class-action settlement" start={billion} x={865} y={625} color={C.oxblood} size={128}/><Quote start={fair} x={865} y={850} width={800} text="Legally obtained training may be fair use; pirated libraries were a separate issue." size={28}/>
    <div style={{position:'absolute',inset:0,background:C.oxblood,opacity:ramp(f,asked-8,asked+12)*.94}}/><EditorialTitle lines={['NOBODY ASKED.','NOBODY PAID.']} start={asked} x={260} y={300} width={1400} size={138} align="center"/>
    <div style={{position:'absolute',inset:0,background:C.soot,opacity:ramp(f,scarlett-16,scarlett+10)}}/><div style={{position:'absolute',left:100,top:115,width:700,height:760,opacity:ramp(f,scarlett,scarlett+18)}}><Img src={staticFile('assets/scarlett-johansson-cc-by-2.jpg')} style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'50% 15%'}}/><div style={{fontFamily:'IBM Plex Sans Condensed',fontSize:21,color:C.brass,marginTop:8}}>SCARLETT JOHANSSON · REAL PHOTOGRAPH</div></div><Quote start={voice} x={930} y={260} width={780} text="A voice that sounded strikingly like hers." by="Johansson said she had declined to license it" size={58}/>
    <div style={{position:'absolute',inset:0,background:C.soot,opacity:ramp(f,clearview-16,clearview+8)}}/><BrandWord name="Clearview AI" start={clearview} x={120} y={170} accent={C.ivory} size={90}/><Metric value="BILLIONS" label="Face photos scraped from the web" start={faces} x={120} y={360} color={C.oxblood} size={145}/><div style={{position:'absolute',right:120,top:160,width:690,height:620,border:`2px solid ${C.brass}`,padding:52,opacity:ramp(f,faces,faces+20)}}><Eye size={120} color={C.brass} strokeWidth={1}/><div style={{fontFamily:'Fraunces',fontSize:64,color:C.ivory,marginTop:45}}>Your face might be in there.</div><div style={{fontFamily:'IBM Plex Sans Condensed',fontSize:28,color:C.muted,marginTop:40}}>Regulators in several countries took action.</div></div>
  </SceneFrame>;
};

const Act9:React.FC=()=>{
  const f=useCurrentFrame(),s=scenes[8].start,d=scenes[8].end-s;
  const schwartz=localCue('Steven Schwartz',s),fake=localCue('Completely fake',s),fine=localCue('five thousand dollars',s),air=localCue('Air Canada',s),entity=localCue('separate entity',s),google=localCue("Google's AI Overviews",s),glue=localCue('glue on pizza',s),chevy=localCue('Chevrolet dealership',s),dollar=localCue('for one dollar',s),amazon=localCue('Amazon reportedly scrapped',s),women=localCue('women s organizations',s),meta=localCue('internal Meta document',s),children=localCue('engage children',s),approved=localCue('Someone approved it',s),risk=localCue('The risk is yours',s);
  return <SceneFrame duration={d} chapter="Secret 06 · When the machine lies, you pay">
    <EvidenceSheet src="assets/mata-page-01.png" start={schwartz} x={70} y={105} width={850} caption="Mata v. Avianca · U.S. District Court"/><BrandWord name="Steven Schwartz" start={schwartz+6} x={990} y={150} accent={C.ivory}/><EditorialTitle lines={['COMPLETELY','FAKE']} start={fake} x={990} y={310} width={730} size={114} accent={1}/><Metric value="$5,000" label="Sanction" start={fine} x={1000} y={690} color={C.oxblood}/>
    <div style={{position:'absolute',inset:0,background:C.ivory,opacity:ramp(f,air-16,air+9)}}/><EvidenceSheet src="assets/moffatt-page-1.png" start={air} x={75} y={95} width={850} caption="Moffatt v. Air Canada · tribunal decision"/><div style={{position:'absolute',right:120,top:120,width:650,opacity:ramp(f,air,air+18)}}><Img src={staticFile('assets/air-canada-logo.svg')} style={{width:440,height:160,objectFit:'contain'}}/></div><Quote start={entity} x={1040} y={420} width={680} text="The chatbot was a separate entity responsible for its own actions." by="Argument rejected by the tribunal" dark size={45}/>
    <div style={{position:'absolute',inset:0,background:C.ivory,opacity:ramp(f,google-15,google+8)}}/><div style={{position:'absolute',left:90,top:120,width:1120,height:760,opacity:ramp(f,google,google+15),overflow:'hidden'}}><Img src={staticFile('assets/google-pizza-glue.jpg')} style={{width:'100%',height:'100%',objectFit:'contain'}}/></div><EditorialTitle lines={['GLUE','ON PIZZA']} start={glue} x={1260} y={300} width={560} size={114} accent={0} dark/>
    <div style={{position:'absolute',inset:0,background:C.soot,opacity:ramp(f,chevy-14,chevy+8)}}/><BrandWord name="CHEVROLET" start={chevy} x={115} y={150} accent={C.ivory} size={86}/><div style={{position:'absolute',left:110,top:310,width:810,height:420,border:`2px solid ${C.brass}`,padding:46,opacity:ramp(f,chevy,chevy+18)}}><MessageSquareText size={74} color={C.brass} strokeWidth={1.3}/><div style={{fontFamily:'Fraunces',fontSize:62,color:C.ivory,marginTop:32}}>“Agree? A new Tahoe for $1.”</div><div style={{fontFamily:'IBM Plex Sans Condensed',fontSize:25,color:C.muted,marginTop:32}}>Dealership: the offer was not binding.</div></div><Metric value="$1" label="The chatbot agreed" start={dollar} x={1150} y={420} color={C.oxblood} size={200}/>
    <div style={{position:'absolute',inset:0,background:C.soot,opacity:ramp(f,amazon-15,amazon+8)}}/><SplitCard start={amazon} x={120} y={170} title="AMAZON" body="Experimental hiring system reportedly penalized résumés mentioning women’s organizations." accent={C.oxblood} icon={Users}/><Metric value="BIAS" label="A system learned yesterday's pattern" start={women} x={880} y={300} color={C.oxblood} size={160}/>
    <div style={{position:'absolute',inset:0,background:C.soot,opacity:ramp(f,meta-15,meta+8)}}/><BrandWord name="META · INTERNAL DOCUMENT" start={meta} x={110} y={140} accent={C.ivory} size={65}/><div style={{position:'absolute',left:110,top:285,width:760,height:460,border:`2px solid ${C.oxblood}`,padding:48,opacity:ramp(f,children,children+18)}}><Siren size={84} color={C.oxblood} strokeWidth={1.3}/><div style={{fontFamily:'Fraunces',fontSize:58,color:C.ivory,marginTop:34}}>Romantic or sensual conversations with children</div></div><div style={{position:'absolute',left:1010,top:280,width:700}}>{['SOMEONE WROTE IT.','SOMEONE REVIEWED IT.','SOMEONE APPROVED IT.'].map((t,i)=>{const p=ramp(f,approved-20+i*7,approved-3+i*7);return <div key={t} style={{height:120,borderTop:`1px solid ${C.brass}`,display:'flex',alignItems:'center',fontFamily:'IBM Plex Sans Condensed',fontSize:41,color:i===2?C.oxblood:C.ivory,opacity:p,transform:`translateX(${(1-p)*55}px)`}}>{t}</div>})}</div>
    <div style={{position:'absolute',inset:0,background:C.oxblood,opacity:ramp(f,risk-10,risk+12)*.96}}/><EditorialTitle lines={['THE RISK IS YOURS.','THE PROFIT IS THEIRS.']} start={risk} x={180} y={340} width={1560} size={112} align="center"/>
  </SceneFrame>;
};

const Act10:React.FC=()=>{
  const f=useCurrentFrame(),s=scenes[9].start,d=scenes[9].end-s;
  const hong=localCue('Hong Kong police',s),sent=localCue('sending about twentyfive million dollars',s),call=localCue('video call',s),victim=localCue('only real person',s),clone=localCue('clone a voice',s),hurt=localCue('person who gets hurt',s);
  return <SceneFrame duration={d} chapter="Secret 07 · The fakes">
    <CameraImage src="assets/metaphor-deepfake-meeting.png" end={victim+70} fromScale={1.02} toScale={1.10} fromX={15} toX={-20} shade={.23}/><BrandWord name="HONG KONG · 2024" start={hong} x={105} y={140} accent={C.ivory}/><Metric value="$25,000,000" label="Transferred after a deepfake video call" start={sent} x={100} y={680} color={C.oxblood} size={142}/><div style={{position:'absolute',right:110,top:180,width:600,height:440,border:`2px solid ${C.brass}`,opacity:ramp(f,call,call+18)}}>{Array.from({length:6},(_,i)=><div key={i} style={{position:'absolute',left:30+(i%3)*185,top:35+Math.floor(i/3)*180,width:150,height:140,border:`1px solid ${i===5?C.oxblood:C.brass}`,display:'grid',placeItems:'center'}}><Users size={58} color={i===5?C.oxblood:C.muted} strokeWidth={1.2}/></div>)}</div><Quote start={victim} x={1100} y={700} width={640} text="Only one person on the call was real: the victim." size={43}/>
    <div style={{position:'absolute',inset:0,background:C.soot,opacity:ramp(f,clone-12,clone+10)}}/><div style={{position:'absolute',left:115,top:180,width:1690,height:550,borderTop:`2px solid ${C.brass}`,borderBottom:`2px solid ${C.brass}`,opacity:ramp(f,clone,clone+18)}}>{Array.from({length:74},(_,i)=>{const h=18+Math.abs(Math.sin(i*.83))*210;return <div key={i} style={{position:'absolute',left:24+i*22,top:275-h/2,width:8,height:h,background:i>48?C.oxblood:C.brass}}/>})}<div style={{position:'absolute',left:50,top:40,fontFamily:'Fraunces',fontSize:72}}>A few seconds of audio.</div><div style={{position:'absolute',right:50,bottom:45,fontFamily:'Fraunces',fontSize:72,color:C.oxblood}}>A copied voice.</div></div><Quote start={hurt} x={470} y={805} width={980} text="The person who gets hurt is never the person who built it." size={46}/>
  </SceneFrame>;
};

const Act11:React.FC=()=>{
  const f=useCurrentFrame(),s=scenes[10].start,d=scenes[10].end-s;
  const samsung=localCue('Samsung',s),code=localCue('sensitive internal code',s),personal=localCue('something personal',s),settings=localCue('open the settings',s),answer=localCue('should be able to answer',s);
  return <SceneFrame duration={d} chapter="Secret 08 · Your prompts">
    <CameraImage src="assets/metaphor-prompt-archive.png" end={d} fromScale={1.01} toScale={1.08} fromX={0} toX={-18} shade={.30}/><BrandWord name="SAMSUNG · 2023" start={samsung} x={105} y={145} accent={C.ivory} size={74}/><KineticPhrase words={['SENSITIVE','INTERNAL','CODE']} start={code} x={110} y={310} size={72} color={C.oxblood}/><div style={{position:'absolute',right:110,top:180,width:700,height:470,border:`2px solid ${C.brass}`,background:C.soot2,opacity:ramp(f,personal,personal+18)}}><div style={{position:'absolute',left:42,top:35,fontFamily:'IBM Plex Sans Condensed',fontSize:22,color:C.muted}}>VISIBLE TEXT BOX</div><div style={{position:'absolute',left:42,right:42,top:95,height:110,border:`1px solid ${C.brass}`,padding:28,fontFamily:'IBM Plex Sans Condensed',fontSize:31,color:C.ivory}}>Something personal…</div><div style={{position:'absolute',left:42,right:42,top:255,height:150,border:`1px solid ${C.oxblood}`,padding:28,fontFamily:'IBM Plex Sans Condensed',fontSize:27,color:C.oxblood}}>RETENTION · REVIEW · TRAINING?</div></div><IconBadge icon={LockKeyhole} start={settings} x={1080} y={730} label="Open the settings." color={C.brass}/><Quote start={answer} x={125} y={760} width={780} text="What happens to what you type?" size={56}/>
  </SceneFrame>;
};

const Act12:React.FC=()=>{
  const f=useCurrentFrame(),s=scenes[11].start,d=scenes[11].end-s;
  const data=localCue('Data centers eat electricity',s),iea=localCue('International Energy Agency',s),double=localCue('roughly double by twenty thirty',s),water=localCue('water use',s),glacier=localCue('melting a glacier',s),bill=localCue('utility bill',s);
  return <SceneFrame duration={d} chapter="The bill · Energy and water">
    <div style={{position:'absolute',left:110,top:160,width:790,height:650,border:`2px solid ${C.brass}`,opacity:ramp(f,data,data+18)}}><Factory size={100} color={C.brass} strokeWidth={1.2} style={{margin:55}}/><EditorialTitle lines={['DATA CENTERS','EAT ELECTRICITY']} start={data} x={55} y={260} width={660} size={76}/></div>
    <EvidenceSheet src="assets/iea-energy-and-ai-page-001.jpg" start={iea} x={1030} y={110} width={700} caption="International Energy Agency · Energy and AI, 2025"/>
    <div style={{position:'absolute',left:130,top:830,width:1570,height:110,opacity:ramp(f,double,double+20)}}><div style={{height:34,background:C.lacquer}}><div style={{height:'100%',width:`${44+56*ramp(f,double,double+60)}%`,background:C.oxblood}}/></div><div style={{display:'flex',justifyContent:'space-between',fontFamily:'IBM Plex Sans Condensed',fontSize:24,color:C.muted,marginTop:15}}><span>2024 · 415 TWh</span><span>2030 · 945 TWh projected</span></div></div>
    <div style={{position:'absolute',inset:0,background:C.soot,opacity:ramp(f,water-14,water+8)}}/><div style={{position:'absolute',left:110,top:180,right:110,height:500,borderTop:`2px solid ${C.brass}`,borderBottom:`2px solid ${C.brass}`}}>{Array.from({length:16},(_,i)=>{const p=ramp(f,water+i*3,water+18+i*3);return <div key={i} style={{position:'absolute',left:30+i*101,top:130,width:68,height:240*p,background:i%4===0?C.green:C.brass,transform:'translateY(120px)'}}/>})}<div style={{position:'absolute',left:45,top:50,fontFamily:'Fraunces',fontSize:68}}>Power. Cooling. Water. Infrastructure.</div></div><Quote start={glacier} x={130} y={760} width={760} text="One prompt is not melting a glacier." size={40}/><Metric value="YOU PAY" label="Bills · subscriptions · incentives" start={bill} x={1090} y={730} color={C.oxblood} size={118}/>
  </SceneFrame>;
};

const Act13:React.FC=()=>{
  const f=useCurrentFrame(),s=scenes[12].start,d=scenes[12].end-s;
  const twist=localCue('twist I promised',s),monster=localCue('not a monster',s),nobel=localCue('Nobel Prize in Chemistry',s),demis=localCue('Demis Hassabis',s,1),john=localCue('John Jumper',s),alpha=localCue('AlphaFold',s),real=localCue('That is real',s),story=localCue('story told about the tool',s),fomo=localCue('fear of missing out',s),hidden=localCue('because of what it hid',s);
  return <SceneFrame duration={d} chapter="The twist · The tool is real">
    <CameraImage src="assets/metaphor-tool-vs-story.png" end={nobel-10} fromScale={1.01} toScale={1.07} fromX={0} toX={18} shade={.12}/><EditorialTitle lines={['THE TOOL','IS NOT','THE MONSTER']} start={monster} x={980} y={170} width={780} size={93} accent={2}/>
    <div style={{position:'absolute',inset:0,background:C.ivory,opacity:ramp(f,nobel-16,nobel+10)}}/><EvidenceSheet src="assets/nobel-chemistry-2024-page-1.jpg" start={nobel} x={70} y={100} width={720} caption="The Royal Swedish Academy of Sciences · official press release"/>
    <div style={{position:'absolute',left:860,top:120,width:390,height:520,opacity:ramp(f,demis,demis+18)}}><Img src={staticFile('assets/demis-hassabis-cc-by-sa.jpg')} style={{width:'100%',height:'100%',objectFit:'cover'}}/><div style={{fontFamily:'IBM Plex Sans Condensed',fontSize:21,color:C.soot,marginTop:8}}>DEMIS HASSABIS</div></div>
    <div style={{position:'absolute',left:1320,top:120,width:390,height:520,opacity:ramp(f,john,john+18)}}><Img src={staticFile('assets/john-jumper-cc-by-sa.jpg')} style={{width:'100%',height:'100%',objectFit:'cover'}}/><div style={{fontFamily:'IBM Plex Sans Condensed',fontSize:21,color:C.soot,marginTop:8}}>JOHN JUMPER</div></div>
    <BrandWord name="ALPHAFOLD" start={alpha} x={960} y={760} accent={C.soot} size={84}/><Metric value="REAL" label="Protein-structure prediction" start={real} x={1450} y={710} color={C.green} size={104}/>
    <div style={{position:'absolute',inset:0,background:C.soot,opacity:ramp(f,story-10,story+2)}}/><div style={{position:'absolute',left:110,top:180,width:1680,height:520,border:`2px solid ${C.brass}`,opacity:ramp(f,story+7,story+22)}}><div style={{position:'absolute',left:60,top:60,fontFamily:'Fraunces',fontSize:88,color:C.ivory}}>THE TOOL</div><div style={{position:'absolute',left:60,top:230,fontFamily:'IBM Plex Sans Condensed',fontSize:32,color:C.green}}>can be useful, measurable, transformative</div><div style={{position:'absolute',left:930,top:60,fontFamily:'Fraunces',fontSize:88,color:C.oxblood}}>THE STORY</div><div style={{position:'absolute',left:930,top:230,fontFamily:'IBM Plex Sans Condensed',fontSize:32,color:C.oxblood}}>magic · autonomous · inevitable · too late to question</div><div style={{position:'absolute',left:815,top:50,bottom:50,width:2,background:C.brass}}/></div><Quote start={fomo} x={270} y={790} width={1380} text="Fear of missing out is the oldest sales trick in the world." size={50}/>
    <div style={{position:'absolute',inset:0,background:C.soot,opacity:ramp(f,hidden-10,hidden+10)*.96}}/><EditorialTitle lines={['THE TURK WAS A FRAUD','BECAUSE OF WHAT IT HID.']} start={hidden} x={170} y={350} width={1580} size={95} accent={1} align="center"/><InspectionKey start={hidden+12} x={850} y={760}/>
  </SceneFrame>;
};

const Act14:React.FC=()=>{
  const f=useCurrentFrame(),s=scenes[13].start,d=scenes[13].end-s;
  const one=localCue('One who did the work',s),two=localCue('Two who checks',s),three=localCue('Three when it s wrong',s),four=localCue('And four what happens',s),plain=localCue('plain English',s),cabinet=localCue('cabinet with a door',s);
  const items=[{n:'01',q:'WHO DID THE WORK?',sub:'Where did the training data come from?',t:one,Icon:Users},{n:'02',q:'WHO CHECKS THE ANSWERS?',sub:'Is a real human present when it matters?',t:two,Icon:Search},{n:'03',q:'WHO PAYS WHEN IT IS WRONG?',sub:'You—or the company?',t:three,Icon:BadgeDollarSign},{n:'04',q:'WHAT HAPPENS TO MY INPUT?',sub:'Can I turn that off?',t:four,Icon:LockKeyhole}];
  return <SceneFrame duration={d} chapter="The four-question inspection">
    <div style={{position:'absolute',left:95,top:150,width:1730,height:720,border:`2px solid ${C.brass}`}}>{items.map((it,i)=>{const p=ramp(f,it.t,it.t+20);return <div key={it.n} style={{position:'absolute',left:35+(i%2)*840,top:35+Math.floor(i/2)*335,width:790,height:300,borderTop:`5px solid ${i===3?C.green:C.brass}`,background:C.soot2,opacity:p,transform:`translateY(${(1-p)*55}px)`,padding:30}}><it.Icon size={50} color={i===3?C.green:C.brass} strokeWidth={1.4}/><div style={{fontFamily:'Fraunces',fontSize:50,color:C.ivory,marginTop:18}}>{it.n} · {it.q}</div><div style={{fontFamily:'IBM Plex Sans Condensed',fontSize:25,color:C.muted,marginTop:18}}>{it.sub}</div></div>})}</div>
    <Quote start={plain} x={320} y={900} width={1280} text="If the answer is not plain English, the door is still closed." size={40}/><div style={{position:'absolute',inset:0,background:C.soot,opacity:ramp(f,cabinet-8,cabinet+10)*.95}}/><Drawer start={cabinet} x={520} y={220} w={880} h={580} label="Door stays closed" active><div style={{fontFamily:'Fraunces',fontSize:95,color:C.ivory,marginTop:100,textAlign:'center'}}>NOT INTELLIGENCE.<br/><span style={{color:C.oxblood}}>A CLOSED CABINET.</span></div></Drawer>
  </SceneFrame>;
};

const Act15:React.FC=()=>{
  const f=useCurrentFrame(),s=scenes[14].start,d=scenes[14].end-s;
  const ended=localCue('story of the Turk ended',s),fire=localCue('museum fire',s),secrets=localCue('Secrets in cabinets',s),knock=localCue('start knocking',s);
  return <SceneFrame duration={d} chapter="Philadelphia · 1854">
    <CameraImage src="assets/mechanical-turk-racknitz-public-domain.jpg" end={fire} fromScale={1.1} toScale={1.22} fromX={0} toX={-25} shade={.25}/><EditorialTitle lines={['THE SECRET','CAME OUT']} start={ended} x={1050} y={190} width={720} size={100}/>
    <div style={{position:'absolute',inset:0,opacity:ramp(f,fire-12,fire+12)}}><CameraImage src="assets/metaphor-fire-aftermath.png" start={fire} end={d} fromScale={1.01} toScale={1.08} shade={.18}/></div><Metric value="1854" label="The cabinet was destroyed in a museum fire" start={fire} x={110} y={650} color={C.oxblood}/><Quote start={secrets} x={930} y={260} width={760} text="Secrets in cabinets do not last forever." size={58}/><div style={{position:'absolute',left:800,top:760,width:320,height:180,border:`3px solid ${C.brass}`,opacity:ramp(f,knock,knock+10),transform:`scale(${1+.025*Math.sin((f-knock)/3)})`}}/><div style={{position:'absolute',left:850,top:820,fontFamily:'IBM Plex Sans Condensed',fontSize:36,color:C.brass,opacity:ramp(f,knock,knock+8)}}>KNOCK.</div>
  </SceneFrame>;
};

const Act16:React.FC=()=>{
  const f=useCurrentFrame(),s=scenes[15].start,d=scenes[15].end-s;
  const knock=localCue('asking you to knock',s),comments=localCue('Tell me in the comments',s),story=localCue('Give me your best story',s),subscribe=localCue('subscribe',s),text=localCue('little text box',s),friend=localCue('one friend',s),magic=localCue('all magic',s),thanks=localCue('Thanks for watching',s);
  return <SceneFrame duration={d} chapter="Your turn">
    <div style={{position:'absolute',left:105,top:155,width:1710,height:660,border:`2px solid ${C.brass}`,background:C.soot2,overflow:'hidden'}}><Drawer start={knock} x={50} y={45} w={1610} h={560} label="Open the box" active><MessageSquareText size={70} color={C.brass} strokeWidth={1.4}/><div style={{fontFamily:'Fraunces',fontSize:70,color:C.ivory,marginTop:40}}>Have you caught an AI lying with total confidence?</div><div style={{marginTop:55,height:95,border:`1px solid ${C.brass}`,padding:'25px 28px',fontFamily:'IBM Plex Sans Condensed',fontSize:31,color:C.muted,opacity:ramp(f,comments,comments+16)}}>Tell your best story…</div></Drawer></div>
    <KineticPhrase words={['COMMENT.', 'QUESTION.', 'KNOCK.']} start={story} x={460} y={870} size={54} color={C.brass}/>
    <div style={{position:'absolute',inset:0,background:C.ivory,opacity:ramp(f,subscribe-14,subscribe+10)}}/><div style={{position:'absolute',left:95,top:135,width:1730,height:720,border:`2px solid ${C.soot}`}}><EditorialTitle lines={['LOOK INSIDE','THE TEXT BOX']} start={text} x={110} y={110} width={900} size={110} accent={1} dark/><div style={{position:'absolute',right:100,top:120,width:610,height:440,border:`2px solid ${C.oxblood}`,background:C.paper,opacity:ramp(f,text,text+18)}}><div style={{fontFamily:'IBM Plex Sans Condensed',fontSize:24,color:C.muted,padding:30}}>WHAT REALLY HAPPENS TO YOUR PROMPTS?</div><div style={{position:'absolute',left:30,right:30,bottom:35,height:120,border:`1px solid ${C.soot}`,padding:30,fontFamily:'IBM Plex Sans Condensed',fontSize:29}}>Your next question…</div></div><InspectionKey start={friend} x={1170} y={650} rotation={-8}/></div>
    <div style={{position:'absolute',inset:0,background:C.soot,opacity:ramp(f,magic-10,magic+10)*.97}}/><EditorialTitle lines={['IT IS NOT','ALL MAGIC.']} start={magic} x={430} y={320} width={1060} size={142} accent={1} align="center"/><div style={{position:'absolute',left:690,top:690,width:540,height:2,background:C.brass,opacity:ramp(f,thanks,thanks+14)}}/><div style={{position:'absolute',left:0,right:0,top:760,textAlign:'center',fontFamily:'IBM Plex Sans Condensed',fontSize:34,letterSpacing:4,color:C.muted,opacity:ramp(f,thanks,thanks+14)}}>THANKS FOR WATCHING</div>
  </SceneFrame>;
};

const acts=[Act1,Act2,Act3,Act4,Act5,Act6,Act7,Act8,Act9,Act10,Act11,Act12,Act13,Act14,Act15,Act16];

export const TurkAICabinet:React.FC=()=> <AbsoluteFill style={{background:C.soot}}>
  {acts.map((Act,i)=><Sequence key={i} from={scenes[i].start} durationInFrames={scenes[i].end-scenes[i].start}><Act/></Sequence>)}
</AbsoluteFill>;

