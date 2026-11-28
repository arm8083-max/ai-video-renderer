import '@fontsource/archivo/400.css';
import '@fontsource/archivo/500.css';
import '@fontsource/archivo/700.css';
import '@fontsource/archivo/800.css';
import '@fontsource/literata/400.css';
import '@fontsource/literata/600.css';
import React from 'react';
import {Easing, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';

export const C = {
  bone: '#F1EEE6',
  bone2: '#D7D2C7',
  graphite: '#1D2428',
  graphite2: '#31393D',
  orange: '#F36A2E',
  cobalt: '#315EF5',
  ink: '#0E1214',
};

const clamp = (v: number) => Math.max(0, Math.min(1, v));
export const ease = (v: number) => Easing.bezier(0.22, 0.9, 0.25, 1)(clamp(v));
export const easeInOut = (v: number) => Easing.bezier(0.65, 0, 0.35, 1)(clamp(v));
export const easeInspect = (v: number) => Easing.bezier(0.16, 1, 0.3, 1)(clamp(v));

export const inOut = (frame: number, duration: number, enter = 18, exit = 18) => {
  const a = ease(frame / enter);
  const b = ease((duration - frame) / exit);
  return Math.min(a, b);
};

const cameraNodes = [
  [0, 0, 1.04], [48, -25, 1.11], [-38, 28, 1.16], [26, 36, 1.085],
  [-54, -18, 1.14], [18, -38, 1.19], [44, 21, 1.10], [-20, 15, 1.155],
];

export const MotionPlate: React.FC<{
  src: string;
  duration: number;
  seed?: number;
  dim?: number;
  position?: string;
  revealAt?: number;
}> = ({src, duration, seed = 0, dim = 0.16, position = 'center', revealAt = 0}) => {
  const frame = useCurrentFrame();
  const stepLength = 54;
  const step = Math.floor(Math.max(0, frame - revealAt) / stepLength);
  const t = easeInOut(((frame - revealAt) % stepLength) / stepLength);
  const a = cameraNodes[(step + seed) % cameraNodes.length];
  const b = cameraNodes[(step + seed + 1) % cameraNodes.length];
  const x = interpolate(t, [0, 1], [a[0], b[0]]);
  const y = interpolate(t, [0, 1], [a[1], b[1]]);
  const scale = interpolate(t, [0, 1], [a[2], b[2]]);
  const reveal = ease((frame - revealAt) / 22);
  return (
    <div style={{position: 'absolute', inset: 0, overflow: 'hidden', background: C.graphite}}>
      <Img
        src={staticFile(src)}
        style={{
          position: 'absolute', inset: -70, width: 2060, height: 1220,
          objectFit: 'cover', objectPosition: position,
          transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`,
          clipPath: `inset(0 ${100 - reveal * 100}% 0 0)`,
        }}
      />
      <div style={{position: 'absolute', inset: 0, backgroundColor: C.ink, opacity: dim}} />
      <div style={{position: 'absolute', left: 0, top: 0, bottom: 0, width: 10, background: C.orange, opacity: 0.8}} />
    </div>
  );
};

export const IntegratedEvidence: React.FC<{
  src: string;
  at: number;
  duration: number;
  side?: 'left' | 'right' | 'center';
  width?: number;
  label?: string;
  accent?: 'blue' | 'orange';
}> = ({src, at, duration, side = 'right', width = 840, label, accent = 'blue'}) => {
  const frame = useCurrentFrame();
  const p = spring({frame: frame - at, fps: 30, config: {damping: 200, stiffness: 95, mass: 1.1}, durationInFrames: 22});
  const out = ease((duration - frame) / 18);
  const xBase = side === 'right' ? 1920 - width - 92 : side === 'left' ? 92 : (1920 - width) / 2;
  const x = xBase + (1 - p) * (side === 'left' ? -100 : 100);
  const accentColor = accent === 'blue' ? C.cobalt : C.orange;
  return (
    <div style={{position: 'absolute', left: x, top: 118, width, opacity: p * out}}>
      <div style={{height: 8, background: accentColor, width: `${38 + p * 62}%`}} />
      <div style={{background: C.bone, padding: 14, border: `1px solid ${C.bone2}`}}>
        <Img src={staticFile(src)} style={{width: '100%', maxHeight: 690, display: 'block', objectFit: 'contain', objectPosition: 'top'}} />
      </div>
      {label ? (
        <div style={{marginTop: 12, color: C.bone, fontFamily: 'Archivo', fontSize: 23, letterSpacing: 0.4, textTransform: 'uppercase'}}>
          {label}
        </div>
      ) : null}
    </div>
  );
};

export const Statement: React.FC<{
  text: string;
  at: number;
  duration: number;
  x?: number;
  y?: number;
  size?: number;
  width?: number;
  accentWord?: string;
  serif?: boolean;
  align?: 'left' | 'center' | 'right';
}> = ({text, at, duration, x = 96, y = 96, size = 72, width = 900, accentWord, serif = false, align = 'left'}) => {
  const frame = useCurrentFrame();
  const p = spring({frame: frame - at, fps: 30, config: {damping: 180, stiffness: 105, mass: 0.9}, durationInFrames: 20});
  const exit = ease((duration - frame) / 16);
  const pieces = accentWord ? text.split(new RegExp(`(${accentWord})`, 'i')) : [text];
  return (
    <div style={{position: 'absolute', left: x, top: y, width, color: C.bone, opacity: p * exit, transform: `translateY(${(1 - p) * 28}px)`, fontFamily: serif ? 'Literata' : 'Archivo', fontSize: size, fontWeight: serif ? 600 : 700, lineHeight: 0.98, letterSpacing: serif ? -2 : -3, textAlign: align}}>
      {pieces.map((piece, i) => <React.Fragment key={`${piece}-${i}`}>{accentWord && piece.toLowerCase() === accentWord.toLowerCase() ? <span style={{color: C.orange}}>{piece}</span> : piece}</React.Fragment>)}
    </div>
  );
};

export const BigMetric: React.FC<{value: string; label: string; at: number; x: number; y: number; color?: string}> = ({value, label, at, x, y, color = C.orange}) => {
  const frame = useCurrentFrame();
  const p = spring({frame: frame - at, fps: 30, config: {damping: 180, stiffness: 90}, durationInFrames: 22});
  return (
    <div style={{position: 'absolute', left: x, top: y, opacity: p, transform: `translateY(${(1 - p) * 40}px)`}}>
      <div style={{fontFamily: 'Archivo', fontSize: 148, fontWeight: 800, lineHeight: 0.8, color, letterSpacing: -9}}>{value}</div>
      <div style={{marginTop: 22, fontFamily: 'Archivo', fontSize: 28, color: C.bone, textTransform: 'uppercase', letterSpacing: 2}}>{label}</div>
    </div>
  );
};

export const SceneTag: React.FC<{chapter: string; at?: number}> = ({chapter, at = 0}) => {
  const frame = useCurrentFrame();
  const p = ease((frame - at) / 18);
  return <div style={{position: 'absolute', left: 96, bottom: 66, fontFamily: 'Archivo', color: C.bone2, fontSize: 20, letterSpacing: 2.4, textTransform: 'uppercase', opacity: p * 0.75}}>{chapter}</div>;
};

export const MechanicalBars: React.FC<{at: number; count?: number; color?: string; vertical?: boolean}> = ({at, count = 5, color = C.orange, vertical = false}) => {
  const frame = useCurrentFrame();
  return (
    <div style={{position: 'absolute', left: 96, right: 96, top: 210, bottom: 180, display: 'flex', flexDirection: vertical ? 'row' : 'column', gap: 14, alignItems: 'stretch', justifyContent: 'center'}}>
      {Array.from({length: count}).map((_, i) => {
        const p = spring({frame: frame - at - i * 5, fps: 30, config: {damping: 220, stiffness: 110}, durationInFrames: 20});
        return <div key={i} style={{background: i === count - 1 ? color : C.graphite2, border: `1px solid ${i === count - 1 ? color : '#596166'}`, flex: 1, transform: vertical ? `scaleY(${p})` : `scaleX(${p})`, transformOrigin: i % 2 ? 'right' : 'left', opacity: 0.8 + 0.2 * p}} />;
      })}
    </div>
  );
};

export const TaskField: React.FC<{at: number; highlightAt: number}> = ({at, highlightAt}) => {
  const frame = useCurrentFrame();
  const base = ease((frame - at) / 28);
  const hot = ease((frame - highlightAt) / 28);
  return (
    <div style={{position: 'absolute', left: 106, top: 175, width: 930, height: 650, display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: 8, opacity: base}}>
      {Array.from({length: 80}).map((_, i) => {
        const active = i >= 62;
        const p = spring({frame: frame - at - (i % 10) * 2 - Math.floor(i / 10), fps: 30, config: {damping: 200}, durationInFrames: 18});
        return <div key={i} style={{background: active ? C.orange : C.bone2, border: `1px solid ${active ? C.orange : '#A9A59C'}`, opacity: p * (active ? 0.25 + hot * 0.75 : 0.38), transform: `scale(${0.8 + p * 0.2})`}} />;
      })}
    </div>
  );
};

export const RoomField: React.FC<{at: number; messageAt: number}> = ({at, messageAt}) => {
  const frame = useCurrentFrame();
  const message = ease((frame - messageAt) / 24);
  return (
    <div style={{position: 'absolute', left: 92, right: 92, top: 142, bottom: 150}}>
      {Array.from({length: 36}).map((_, i) => {
        const delayed = at + ((i * 17) % 43);
        const p = spring({frame: frame - delayed, fps: 30, config: {damping: 220, stiffness: 100}, durationInFrames: 18});
        const role = i % 4;
        const color = role === 0 ? C.orange : role === 1 ? C.cobalt : C.bone2;
        const left = 2 + ((i * 29) % 91);
        const top = 4 + ((i * 47) % 83);
        const width = 5 + (i % 5) * 1.1;
        const height = 7 + (i % 4) * 2.2;
        return <div key={i} style={{position: 'absolute', left: `${left}%`, top: `${top}%`, width: `${width}%`, height: `${height}%`, border: `2px solid ${color}`, opacity: p * (0.18 + message * 0.55), transform: `scale(${0.72 + p * 0.28})`}}><div style={{position: 'absolute', left: 6, right: 6, bottom: 5, height: 4, background: color, transform: `scaleX(${message})`, transformOrigin: 'left'}} /></div>;
      })}
    </div>
  );
};

export const Countdown: React.FC<{at: number}> = ({at}) => {
  const frame = useCurrentFrame();
  const elapsed = Math.max(0, frame - at);
  const seconds = Math.max(0, 360 - Math.floor(elapsed / 3));
  const min = Math.floor(seconds / 60);
  const sec = String(seconds % 60).padStart(2, '0');
  const p = spring({frame: frame - at, fps: 30, config: {damping: 200}, durationInFrames: 18});
  return (
    <div style={{position: 'absolute', right: 110, top: 96, width: 500, color: C.bone, opacity: p, background: C.graphite, borderTop: `12px solid ${C.orange}`, padding: '34px 42px'}}>
      <div style={{fontFamily: 'Archivo', fontSize: 27, letterSpacing: 3, textTransform: 'uppercase', color: C.bone2}}>hard deadline</div>
      <div style={{fontFamily: 'Archivo', fontSize: 156, fontWeight: 800, letterSpacing: -9, lineHeight: 0.95}}>{min}:{sec}</div>
    </div>
  );
};

export const TranscriptRows: React.FC<{at: number; fakeAt: number}> = ({at, fakeAt}) => {
  const frame = useCurrentFrame();
  return (
    <div style={{position: 'absolute', left: 170, right: 170, top: 190, bottom: 170, background: C.bone, padding: 36, borderTop: `10px solid ${C.cobalt}`}}>
      {Array.from({length: 9}).map((_, i) => {
        const p = spring({frame: frame - at - i * 5, fps: 30, config: {damping: 220}, durationInFrames: 18});
        const affected = i === 3 || i === 6;
        const rewrite = affected ? ease((frame - fakeAt - i * 3) / 24) : 0;
        return <div key={i} style={{height: 48, marginBottom: 13, background: affected ? (rewrite > 0.5 ? C.orange : C.graphite2) : '#C7C2B7', transform: `translateX(${(1 - p) * 90 + rewrite * 80}px) scaleX(${p})`, transformOrigin: 'left', opacity: p * (affected ? 0.92 : 0.55)}} />;
      })}
    </div>
  );
};

export const SafeguardLayers: React.FC<{at: number; monitorAt: number}> = ({at, monitorAt}) => {
  const frame = useCurrentFrame();
  const labels = ['SYSTEM POLICY', 'SAFETY CLASSIFIER', 'CHAIN-OF-THOUGHT MONITOR'];
  return (
    <div style={{position: 'absolute', left: 110, top: 170, width: 820}}>
      {labels.map((label, i) => {
        const start = i === 2 ? monitorAt : at + i * 12;
        const p = spring({frame: frame - start, fps: 30, config: {damping: 200, stiffness: 105}, durationInFrames: 22});
        return <div key={label} style={{marginBottom: 18, height: 148, background: i === 2 ? C.cobalt : C.graphite2, borderLeft: `12px solid ${i === 2 ? C.cobalt : C.bone2}`, color: C.bone, display: 'flex', alignItems: 'center', paddingLeft: 42, fontFamily: 'Archivo', fontSize: 31, letterSpacing: 2, transform: `translateX(${(1 - p) * -180}px)`, opacity: p * (i === 2 ? 1 : 0.82)}}>{label}</div>;
      })}
    </div>
  );
};

export const SceneWash: React.FC<{color?: string; at: number; duration?: number}> = ({color = C.orange, at, duration = 30}) => {
  const frame = useCurrentFrame();
  const p = Math.sin(clamp((frame - at) / duration) * Math.PI);
  return <div style={{position: 'absolute', inset: 0, background: color, opacity: p * 0.16}} />;
};
