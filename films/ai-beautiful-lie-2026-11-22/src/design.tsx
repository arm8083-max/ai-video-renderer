import React from 'react';
import {Easing, Img, interpolate, staticFile, useCurrentFrame} from 'remotion';

export const C = {
  carbon: '#101316',
  bone: '#EEECE6',
  steel: '#899198',
  red: '#D9483B',
  green: '#54A47B',
  paper: '#D8D4CB',
  dark2: '#191E22',
};

export const ease = Easing.bezier(0.22, 0.72, 0.18, 1);
export const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
export const sec = (s: number) => Math.round(s * 30);
export const ramp = (f: number, a: number, b: number) =>
  interpolate(f, [a, b], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: ease});
export const windowOpacity = (f: number, start: number, end: number, edge = 18) =>
  ramp(f, start, start + edge) * (1 - ramp(f, end - edge, end));

export const FilmImage: React.FC<{
  src: string;
  start: number;
  end: number;
  fromScale?: number;
  toScale?: number;
  fromX?: number;
  toX?: number;
  fromY?: number;
  toY?: number;
  fit?: 'cover' | 'contain';
  position?: string;
  shade?: number;
}> = ({src, start, end, fromScale = 1.03, toScale = 1.12, fromX = 0, toX = -18, fromY = 0, toY = -8, fit = 'cover', position = 'center', shade = 0.1}) => {
  const f = useCurrentFrame();
  const p = ramp(f, start, end);
  const o = windowOpacity(f, start, end, 16);
  return <div style={{position:'absolute', inset:0, overflow:'hidden', opacity:o}}>
    <Img src={staticFile(src)} style={{width:'100%', height:'100%', objectFit:fit, objectPosition:position, transform:`translate3d(${fromX+(toX-fromX)*p}px,${fromY+(toY-fromY)*p}px,0) scale(${fromScale+(toScale-fromScale)*p})`}} />
    {shade > 0 ? <div style={{position:'absolute', inset:0, background:C.carbon, opacity:shade}}/> : null}
  </div>;
};

export const Label: React.FC<{children: React.ReactNode; x?:number; y?:number; color?:string; size?:number; start?:number}> = ({children,x=92,y=80,color=C.bone,size=30,start=0}) => {
  const f=useCurrentFrame(); const p=ramp(f,start,start+18);
  return <div style={{position:'absolute',left:x,top:y,color,fontFamily:'Barlow Condensed',fontWeight:600,fontSize:size,letterSpacing:2.2,textTransform:'uppercase',opacity:p,transform:`translateY(${(1-p)*16}px)`}}>{children}</div>;
};

export const BigWords: React.FC<{lines:string[]; start:number; x?:number; y?:number; size?:number; accent?:number; align?:'left'|'center'}> = ({lines,start,x=92,y=175,size=104,accent=-1,align='left'}) => (
  <div style={{position:'absolute',left:align==='center'?0:x,right:align==='center'?0:undefined,top:y,textAlign:align,fontFamily:'Barlow Condensed',fontWeight:700,fontSize:size,lineHeight:.9,letterSpacing:-1,color:C.bone,textTransform:'uppercase'}}>
    {lines.map((line,i)=><WordLine key={line+i} text={line} start={start+i*5} color={i===accent?C.red:C.bone}/>) }
  </div>
);

const WordLine: React.FC<{text:string;start:number;color:string}> = ({text,start,color}) => {const f=useCurrentFrame();const p=ramp(f,start,start+20);return <div style={{opacity:p,transform:`translate3d(0,${(1-p)*34}px,0)`,color}}>{text}</div>};

export const Rule: React.FC<{x:number;y:number;w:number;start:number;color?:string}> = ({x,y,w,start,color=C.red}) => {const f=useCurrentFrame();const p=ramp(f,start,start+22);return <div style={{position:'absolute',left:x,top:y,width:w*p,height:4,background:color}}/>};

export const Count:React.FC<{from?:number;to:number;start:number;end:number;suffix?:string;size?:number;color?:string}> = ({from=0,to,start,end,suffix='',size=180,color=C.bone}) => {const f=useCurrentFrame();const p=ramp(f,start,end);return <span style={{fontFamily:'Barlow Condensed',fontWeight:700,fontSize:size,color,fontVariantNumeric:'tabular-nums'}}>{Math.round(from+(to-from)*p)}{suffix}</span>};
