import React from "react";
import "@fontsource/manrope/500.css";
import "@fontsource/manrope/700.css";
import "@fontsource/ibm-plex-mono/500.css";
import {
  AbsoluteFill,
  Audio,
  Easing,
  Img,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import rawTiming from "./timing.json";

type Act = {
  id: string;
  title: string;
  start: number;
  end: number;
  duration: number;
  images: string[];
  labels: string[];
  metrics: string[];
  mode: string;
};

const timing = rawTiming as {duration: number; fps: number; frames: number; acts: Act[]};

const C = {
  paper: "#EEE4D1",
  paperBright: "#FFF8E9",
  graphite: "#171716",
  charcoal: "#292724",
  muted: "#A79D8D",
  cobalt: "#2859D8",
  vermilion: "#D64A31",
  green: "#5FAD68",
  brass: "#C29A55",
};

const clamp = (value: number) => Math.max(0, Math.min(1, value));
const ease = (value: number) => Easing.bezier(0.22, 1, 0.36, 1)(clamp(value));
const smooth = (value: number) => Easing.inOut(Easing.cubic)(clamp(value));
const phase = (value: number, start: number, end: number) => ease((value - start) / Math.max(0.0001, end - start));

const imageMotion = (mode: string, p: number, index: number): React.CSSProperties => {
  const alternate = index % 2 === 0 ? 1 : -1;
  if (mode === "timeline") return {transform: `scale(${1.08 - 0.025 * p}) translateX(${(1 - p) * 36 - 18}px)`};
  if (mode === "template") return {transform: `scale(${1.04 + 0.035 * p}) translateY(${12 - 22 * p}px)`};
  if (mode === "reflection") return {transform: `scale(${1.07 - 0.025 * p}) translateX(${alternate * (18 - 30 * p)}px)`};
  if (mode === "experiment") return {transform: `scale(${1.035 + 0.02 * p}) translateY(${-8 + 14 * p}px)`};
  if (mode === "flow") return {transform: `scale(${1.07 - 0.03 * p}) translateX(${26 - 40 * p}px)`};
  if (mode === "gates") return {transform: `scale(1.055) translateX(${44 - 88 * p}px)`};
  if (mode === "peel") return {transform: `scale(${1.04 + 0.025 * p}) rotate(${(p - 0.5) * 0.35}deg)`};
  if (mode === "verified") return {transform: `scale(${1.045 + 0.02 * p}) translateX(${alternate * (14 - 25 * p)}px)`};
  if (["kit", "clock", "risk", "lens", "trial", "stamp"].includes(mode)) return {transform: "scale(1.035)"};
  if (mode === "authorship") return {transform: `scale(${1.025 + 0.025 * p}) translateX(${alternate * (8 - 16 * p)}px)`};
  return {transform: `scale(${1.035 + 0.018 * p}) translateX(${alternate * (10 - 18 * p)}px)`};
};

const BackgroundImages: React.FC<{act: Act; p: number}> = ({act, p}) => {
  const count = act.images.length;
  return (
    <AbsoluteFill style={{backgroundColor: C.graphite, overflow: "hidden"}}>
      {act.images.map((image, index) => {
        const center = count === 1 ? 0.5 : index / (count - 1);
        const width = count === 1 ? 1 : Math.min(0.72, 1.25 / count + 0.16);
        const opacity = count === 1 ? 1 : 1 - smooth(Math.max(0, Math.abs(p - center) - width * 0.25) / (width * 0.55));
        const local = count === 1 ? p : clamp((p - (center - width / 2)) / width);
        return (
          <Img
            key={image}
            src={staticFile(`assets/${image}`)}
            style={{
              position: "absolute",
              inset: -4,
              width: "calc(100% + 8px)",
              height: "calc(100% + 8px)",
              objectFit: "cover",
              opacity,
              filter: `saturate(${0.92 + 0.08 * opacity}) contrast(1.04) brightness(${0.86 + 0.14 * opacity})`,
              ...imageMotion(act.mode, local, index),
            }}
          />
        );
      })}
      <AbsoluteFill style={{background: "linear-gradient(90deg, rgba(18,17,15,.66) 0%, rgba(18,17,15,.14) 48%, rgba(18,17,15,.28) 100%)"}} />
      <AbsoluteFill style={{background: "linear-gradient(180deg, rgba(12,11,10,.35), transparent 30%, transparent 72%, rgba(12,11,10,.64))"}} />
    </AbsoluteFill>
  );
};

const ActTitle: React.FC<{act: Act; seconds: number}> = ({act, seconds}) => {
  const hold = Math.min(5.4, Math.max(2.5, act.duration * 0.07));
  const enter = phase(seconds, 0.15, 1.0);
  const leave = 1 - phase(seconds, hold, hold + 0.8);
  const opacity = enter * leave;
  const alignRight = ["flow", "peel", "verified"].includes(act.mode);
  return (
    <div
      style={{
        position: "absolute",
        left: alignRight ? undefined : 96,
        right: alignRight ? 96 : undefined,
        top: 74,
        maxWidth: 1240,
        textAlign: alignRight ? "right" : "left",
        opacity,
        transform: `translateY(${(1 - enter) * 28}px)`,
      }}
    >
      <div style={{fontFamily: "IBM Plex Mono", color: C.brass, fontSize: 18, letterSpacing: 5, marginBottom: 20}}>
        ИЗМЕРЕНИЕ / {String(timing.acts.indexOf(act) + 1).padStart(2, "0")}
      </div>
      <div style={{fontFamily: "Manrope", fontWeight: 700, color: C.paperBright, fontSize: act.title.length > 28 ? 58 : 78, lineHeight: 0.98, letterSpacing: -2.5, textShadow: "0 10px 34px rgba(0,0,0,.35)"}}>
        {act.title}
      </div>
    </div>
  );
};

const SequentialLabels: React.FC<{act: Act; p: number}> = ({act, p}) => {
  const count = act.labels.length;
  return (
    <>
      {act.labels.map((label, index) => {
        const start = 0.08 + index * (0.78 / Math.max(1, count));
        const next = start + 0.23;
        const appear = phase(p, start, start + 0.035);
        const disappear = 1 - phase(p, next, next + 0.045);
        const x = index % 2 === 0 ? 104 : 1230;
        const y = 720 + (index % 2) * 92;
        return (
          <div
            key={label}
            style={{
              position: "absolute",
              left: x,
              top: y,
              opacity: appear * disappear,
              transform: `translateX(${(1 - appear) * (index % 2 === 0 ? -24 : 24)}px)`,
              borderLeft: `4px solid ${index % 2 === 0 ? C.cobalt : C.vermilion}`,
              padding: "12px 18px",
              background: "rgba(20,19,17,.72)",
              backdropFilter: "blur(7px)",
              color: C.paperBright,
              fontFamily: "Manrope",
              fontWeight: 500,
              fontSize: 28,
              letterSpacing: -0.5,
            }}
          >
            {label}
          </div>
        );
      })}
    </>
  );
};

const Metrics: React.FC<{act: Act; p: number}> = ({act, p}) => {
  const first = phase(p, 0.12, 0.2) * (1 - phase(p, 0.47, 0.55));
  const second = phase(p, 0.46, 0.55) * (1 - phase(p, 0.84, 0.92));
  return (
    <>
      {[first, second].map((opacity, index) => (
        <div
          key={act.metrics[index]}
          style={{
            position: "absolute",
            right: 90,
            bottom: 96,
            opacity,
            color: index === 0 ? C.vermilion : C.cobalt,
            fontFamily: "Manrope",
            fontSize: act.metrics[index].length > 10 ? 60 : 112,
            fontWeight: 700,
            letterSpacing: -4,
            textShadow: "0 8px 32px rgba(0,0,0,.45)",
            transform: `translateY(${(1 - opacity) * 18}px)`,
          }}
        >
          {act.metrics[index]}
        </div>
      ))}
    </>
  );
};

const BalanceGraphic: React.FC<{p: number}> = ({p}) => {
  const draw = phase(p, 0.02, 0.13);
  const split = phase(p, 0.18, 0.36);
  return (
    <svg width="1920" height="1080" style={{position: "absolute", inset: 0}}>
      <line x1="720" y1="575" x2="1200" y2="575" stroke={C.paperBright} strokeWidth="5" opacity={0.75 * draw} />
      <line x1="960" y1="575" x2="960" y2={575 + 168 * split} stroke={C.vermilion} strokeWidth="4" />
      <circle cx={790 - 40 * split} cy={520 + 54 * split} r="72" fill="none" stroke={C.vermilion} strokeWidth="8" opacity={draw} />
      <circle cx={1130 + 40 * split} cy={520 - 54 * split} r="72" fill="none" stroke={C.cobalt} strokeWidth="8" opacity={draw} />
    </svg>
  );
};

const TimelineGraphic: React.FC<{p: number}> = ({p}) => {
  const draw = phase(p, 0.05, 0.35);
  const points = [430, 780, 1110, 1490];
  return (
    <svg width="1920" height="1080" style={{position: "absolute", inset: 0}}>
      <path d="M 260 720 C 620 610, 980 820, 1640 590" fill="none" stroke={C.cobalt} strokeWidth="7" strokeDasharray="1600" strokeDashoffset={1600 * (1 - draw)} opacity="0.86" />
      {points.map((x, index) => <circle key={x} cx={x} cy={690 - index * 20 + Math.sin(index) * 60} r={10 + 9 * phase(p, 0.2 + index * 0.12, 0.27 + index * 0.12)} fill={index === 0 ? C.vermilion : C.cobalt} />)}
    </svg>
  );
};

const TemplateGraphic: React.FC<{p: number}> = ({p}) => {
  const mismatch = phase(p, 0.34, 0.55);
  return (
    <svg width="1920" height="1080" style={{position: "absolute", inset: 0}}>
      <rect x={180 + 320 * mismatch} y="615" width="150" height="150" rx="8" fill="none" stroke={C.cobalt} strokeWidth="8" />
      <path d="M 800 610 C 920 500, 980 820, 1140 640 S 1410 560, 1580 740" fill="none" stroke={C.vermilion} strokeWidth="9" strokeDasharray="18 16" opacity={mismatch} />
      <path d="M 840 820 L 1500 820" stroke={C.paperBright} strokeWidth="3" opacity={0.55} />
    </svg>
  );
};

const ReflectionGraphic: React.FC<{p: number}> = ({p}) => {
  const lines = [0.1, 0.18, 0.26, 0.34];
  return (
    <div style={{position: "absolute", left: 1010, top: 300, width: 650}}>
      {lines.map((start, index) => {
        const q = phase(p, start, start + 0.06);
        return <div key={start} style={{height: 18, width: `${72 - index * 9}%`, marginBottom: 24, background: index === 3 ? C.vermilion : C.paperBright, opacity: 0.72 * q, transform: `scaleX(${q})`, transformOrigin: "left"}} />;
      })}
    </div>
  );
};

const ExperimentGraphic: React.FC<{p: number}> = ({p}) => {
  const split = phase(p, 0.08, 0.24);
  const result = phase(p, 0.55, 0.7);
  return (
    <>
      <div style={{position: "absolute", left: 110, top: 640, width: 530, display: "grid", gridTemplateColumns: "repeat(8, 1fr)", gap: 18, opacity: split}}>
        {Array.from({length: 16}, (_, index) => <div key={index} style={{width: 24, height: 24, borderRadius: "50%", background: index % 2 ? C.cobalt : C.paperBright, transform: `translateY(${(1 - split) * (index % 2 ? -35 : 35)}px)`}} />)}
      </div>
      <div style={{position: "absolute", left: 115, bottom: 112, width: 650}}>
        <div style={{height: 15, background: C.vermilion, width: `${64 + 26 * result}%`, marginBottom: 22}} />
        <div style={{height: 15, background: C.cobalt, width: `${55 + 4 * result}%`}} />
      </div>
    </>
  );
};

const FlowGraphic: React.FC<{p: number}> = ({p}) => {
  const enter = phase(p, 0.03, 0.3);
  const exit = phase(p, 0.55, 0.82);
  return (
    <svg width="1920" height="1080" style={{position: "absolute", inset: 0}}>
      {[-60, 0, 60].map((offset) => <path key={offset} d={`M 80 ${650 + offset} C 420 ${610 + offset}, 530 520, 900 520`} fill="none" stroke={C.vermilion} strokeWidth="16" opacity={0.62 * enter} strokeDasharray="20 18" />)}
      <path d="M 1260 500 C 1460 500, 1580 570, 1810 570" fill="none" stroke={C.cobalt} strokeWidth="10" opacity={0.78 * exit} strokeDasharray="22 16" />
    </svg>
  );
};

const GatesGraphic: React.FC<{p: number}> = ({p}) => {
  return (
    <div style={{position: "absolute", left: 210, bottom: 95, width: 1500, display: "flex", alignItems: "flex-end", gap: 12}}>
      {Array.from({length: 20}, (_, index) => {
        const reached = phase(p, index / 24, index / 24 + 0.08);
        const survival = Math.pow(0.95, index + 1);
        return <div key={index} style={{width: 60, height: 24 + 120 * survival, border: `3px solid ${survival > 0.6 ? C.cobalt : C.vermilion}`, background: "rgba(17,17,16,.45)", opacity: reached, transform: `translateY(${(1 - reached) * 35}px)`}} />;
      })}
    </div>
  );
};

const PeelGraphic: React.FC<{p: number}> = ({p}) => {
  const peel = phase(p, 0.22, 0.58);
  return (
    <div style={{position: "absolute", right: 260, top: 310, width: 470, height: 250, background: C.vermilion, opacity: 0.85, transformOrigin: "top right", transform: `perspective(900px) rotateY(${-118 * peel}deg) rotateZ(${8 * peel}deg)`, boxShadow: "0 22px 54px rgba(0,0,0,.45)"}} />
  );
};

const VerifiedGraphic: React.FC<{p: number}> = ({p}) => {
  const verify = phase(p, 0.12, 0.42);
  return (
    <svg width="1920" height="1080" style={{position: "absolute", inset: 0}}>
      <circle cx="1110" cy="515" r={150 + 90 * verify} fill="none" stroke={C.green} strokeWidth="8" opacity={0.75 * verify} strokeDasharray="34 18" />
      <path d="M 1010 525 L 1080 590 L 1235 410" fill="none" stroke={C.green} strokeWidth="18" strokeLinecap="round" strokeLinejoin="round" opacity={verify} />
    </svg>
  );
};

const kitFocus: Record<string, {x: number; y: number; r: number}> = {
  kit: {x: 960, y: 560, r: 390},
  clock: {x: 250, y: 640, r: 170},
  risk: {x: 580, y: 430, r: 170},
  lens: {x: 940, y: 430, r: 180},
  trial: {x: 1240, y: 430, r: 185},
  stamp: {x: 1605, y: 560, r: 180},
};

const KitGraphic: React.FC<{mode: string; p: number}> = ({mode, p}) => {
  const focus = kitFocus[mode] ?? kitFocus.kit;
  const q = phase(p, 0.04, 0.22) * (1 - phase(p, 0.88, 0.97));
  return (
    <svg width="1920" height="1080" style={{position: "absolute", inset: 0}}>
      <circle cx={focus.x} cy={focus.y} r={focus.r + 20 * Math.sin(p * Math.PI * 2)} fill="none" stroke={mode === "risk" ? C.vermilion : C.cobalt} strokeWidth="9" opacity={0.76 * q} />
      <line x1={focus.x} y1={focus.y + focus.r} x2={focus.x} y2="955" stroke={C.paperBright} strokeWidth="3" opacity={0.55 * q} />
    </svg>
  );
};

const AuthorshipGraphic: React.FC<{p: number}> = ({p}) => {
  const draw = phase(p, 0.58, 0.9);
  return (
    <svg width="1920" height="1080" style={{position: "absolute", inset: 0}}>
      <path d="M 260 790 C 680 820, 930 720, 1580 735" fill="none" stroke={C.cobalt} strokeWidth="6" strokeDasharray="1450" strokeDashoffset={1450 * (1 - draw)} />
      <path d="M 1450 700 L 1520 765 L 1650 610" fill="none" stroke={C.paperBright} strokeWidth="14" strokeLinecap="round" opacity={draw} />
    </svg>
  );
};

const MeaningGraphic: React.FC<{act: Act; p: number}> = ({act, p}) => {
  if (act.mode === "balance") return <BalanceGraphic p={p} />;
  if (act.mode === "timeline") return <TimelineGraphic p={p} />;
  if (act.mode === "template") return <TemplateGraphic p={p} />;
  if (act.mode === "reflection") return <ReflectionGraphic p={p} />;
  if (act.mode === "experiment") return <ExperimentGraphic p={p} />;
  if (act.mode === "flow") return <FlowGraphic p={p} />;
  if (act.mode === "gates") return <GatesGraphic p={p} />;
  if (act.mode === "peel") return <PeelGraphic p={p} />;
  if (act.mode === "verified") return <VerifiedGraphic p={p} />;
  if (["kit", "clock", "risk", "lens", "trial", "stamp"].includes(act.mode)) return <KitGraphic mode={act.mode} p={p} />;
  if (act.mode === "authorship") return <AuthorshipGraphic p={p} />;
  return null;
};

const transitionStyle = (mode: string, enter: number): React.CSSProperties => {
  if (mode === "timeline") return {clipPath: `inset(0 ${100 * (1 - enter)}% 0 0)`};
  if (mode === "template") return {transform: `scale(${0.92 + 0.08 * enter})`, filter: `blur(${8 * (1 - enter)}px)`};
  if (mode === "reflection") return {opacity: enter, filter: `brightness(${0.55 + 0.45 * enter})`};
  if (mode === "experiment") return {transform: `translateY(${50 * (1 - enter)}px)`};
  if (mode === "flow") return {clipPath: `circle(${15 + 90 * enter}% at 62% 50%)`};
  if (mode === "gates") return {transform: `translateX(${90 * (1 - enter)}px)`};
  if (mode === "peel") return {transform: `perspective(1200px) rotateY(${14 * (1 - enter)}deg)`};
  if (mode === "verified") return {filter: `saturate(${0.25 + 0.75 * enter})`};
  return {transform: `scale(${0.97 + 0.03 * enter})`};
};

const ActScene: React.FC<{act: Act; lead: number}> = ({act, lead}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const seconds = frame / fps - lead;
  const p = clamp(seconds / act.duration);
  const enter = phase(seconds, -lead, 0.5);
  const exit = 1 - phase(seconds, act.duration - 0.85, act.duration + lead);
  return (
    <AbsoluteFill style={{opacity: enter * exit, ...transitionStyle(act.mode, enter)}}>
      <BackgroundImages act={act} p={p} />
      <MeaningGraphic act={act} p={p} />
      <ActTitle act={act} seconds={seconds} />
      <SequentialLabels act={act} p={p} />
      <Metrics act={act} p={p} />
    </AbsoluteFill>
  );
};

const Texture: React.FC = () => (
  <AbsoluteFill style={{pointerEvents: "none"}}>
    <AbsoluteFill style={{background: "radial-gradient(circle at 50% 45%, transparent 42%, rgba(5,5,4,.34) 100%)"}} />
    <AbsoluteFill style={{opacity: 0.075, mixBlendMode: "overlay", backgroundImage: "repeating-radial-gradient(circle at 17% 23%, rgba(255,255,255,.55) 0 0.7px, transparent 0.8px 3px)", backgroundSize: "5px 5px"}} />
  </AbsoluteFill>
);

export const CalibrationFilm: React.FC = () => {
  const lead = 1.0;
  return (
    <AbsoluteFill style={{backgroundColor: C.graphite}}>
      <Audio src={staticFile("narration.flac")} />
      {timing.acts.map((act) => {
        const from = Math.max(0, Math.round((act.start - lead) * timing.fps));
        const coreStart = Math.round(act.start * timing.fps);
        const actualLead = (coreStart - from) / timing.fps;
        const durationInFrames = Math.min(timing.frames - from, Math.round((act.duration + actualLead + lead) * timing.fps));
        return (
          <Sequence key={act.id} from={from} durationInFrames={durationInFrames} premountFor={timing.fps}>
            <ActScene act={act} lead={actualLead} />
          </Sequence>
        );
      })}
      <Texture />
    </AbsoluteFill>
  );
};

export const CalibrationMotionTest: React.FC = () => {
  const {fps} = useVideoConfig();
  const selected = [timing.acts[0], timing.acts[5], timing.acts[13]];
  const segmentSeconds = 18;
  return (
    <AbsoluteFill style={{backgroundColor: C.graphite}}>
      <Audio src={staticFile("motion-test.wav")} />
      {selected.map((sourceAct, index) => {
        const from = index * segmentSeconds * fps;
        const act = {...sourceAct, duration: segmentSeconds};
        return (
          <Sequence key={sourceAct.id} from={from} durationInFrames={segmentSeconds * fps}>
            <ActScene act={act} lead={0} />
          </Sequence>
        );
      })}
      <Texture />
    </AbsoluteFill>
  );
};
