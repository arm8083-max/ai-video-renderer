import React from "react";
import {
  ArrowRight,
  CalendarClock,
  Cat,
  Check,
  Code2,
  FileText,
  Image as ImageIcon,
  ScanLine,
  Sparkles,
  Type,
  Video,
  Waves
} from "lucide-react";
import {Img, interpolate, staticFile, useCurrentFrame} from "remotion";
import {linearTiming, TransitionSeries} from "@remotion/transitions";
import {wipe} from "@remotion/transitions/wipe";
import {
  BigSerif,
  Canvas,
  EditorialIndex,
  FocusFrame,
  IconTile,
  LowerCaption,
  Panel,
  Reveal,
  SpringReveal,
  WordPill
} from "./primitives";
import {localCue, SCENE} from "./timing";
import {between, C, cameraEase, clamp, compressEase, enter, objectEase, radius, safe, uiSpring} from "./theme";

const fullImage: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover"
};

export const CatScene: React.FC = () => {
  const frame = useCurrentFrame();
  const neuralAt = localCue(2, SCENE.cat.start);
  const recognizeAt = localCue(5, SCENE.cat.start);
  const catAt = localCue(6, SCENE.cat.start);
  const photoAt = localCue(8, SCENE.cat.start);
  const cameraP = between(frame, 0, photoAt + 19, 0, 1, cameraEase);
  const scanP = between(frame, recognizeAt, catAt + 12);
  const lockP = between(frame, catAt, catAt + 18);
  const pullBack = between(frame, photoAt, photoAt + 24);

  return (
    <Canvas>
      <div
        style={{
          position: "absolute",
          left: 54,
          top: 86,
          width: 1812,
          height: 884,
          borderRadius: 34,
          overflow: "hidden",
          transform: `translate3d(${interpolate(cameraP, [0, 1], [-46, 0], clamp)}px, 0, 0) scale(${interpolate(
            cameraP,
            [0, 1],
            [1.06, 1],
            clamp
          )})`,
          transformOrigin: "42% 52%"
        }}
      >
        <Img src={staticFile("assets/cat-vision-atlas.png")} style={fullImage} />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: C.paper,
            opacity: interpolate(scanP, [0, 0.45, 1], [0, 0.22, 0.08], clamp),
            clipPath: `inset(0 ${interpolate(scanP, [0, 1], [100, 0], clamp)}% 0 0)`
          }}
        />
        <div
          style={{
            position: "absolute",
            left: `${interpolate(scanP, [0, 1], [2, 48], clamp)}%`,
            top: 0,
            width: 18,
            height: "100%",
            background: C.cobalt,
            opacity: scanP * (1 - lockP)
          }}
        />
        <FocusFrame x={0.235} y={0.125} width={0.245} height={0.65} progress={lockP} label="КОШКА" />
        <div
          style={{
            position: "absolute",
            inset: 0,
            border: `${interpolate(pullBack, [0, 1], [0, 14], clamp)}px solid ${C.paper}`,
            borderRadius: 34,
            pointerEvents: "none"
          }}
        />
      </div>

      <Reveal
        frame={frame}
        at={0}
        duration={24}
        style={{position: "absolute", left: safe, top: 34, zIndex: 4}}
      >
        <div style={{fontSize: 24, fontWeight: 650, letterSpacing: 1.5, color: C.ink}}>СОВСЕМ НЕДАВНО</div>
      </Reveal>

      <Reveal
        frame={frame}
        at={neuralAt}
        dx={28}
        dy={0}
        style={{position: "absolute", right: 104, top: 150, width: 410, zIndex: 5}}
      >
        <Panel tone={C.white} style={{padding: 28}}>
          <div style={{display: "flex", alignItems: "center", gap: 16, color: C.cobalt}}>
            <ScanLine size={30} strokeWidth={1.8} />
            <span style={{fontSize: 21, letterSpacing: 2, fontWeight: 700}}>НЕЙРОСЕТЬ</span>
          </div>
          <div style={{fontFamily: "DM Serif Display, serif", fontSize: 54, lineHeight: 1, marginTop: 20}}>
            узнаёт
            <br />
            изображение
          </div>
        </Panel>
      </Reveal>
      <LowerCaption>Узкая способность — один точный результат</LowerCaption>
    </Canvas>
  );
};

export const PeakScene: React.FC = () => {
  const frame = useCurrentFrame();
  const peakAt = localCue(11, SCENE.peak.start);
  const possibleAt = localCue(12, SCENE.peak.start);
  const lift = between(frame, 0, 36, 0, 1, cameraEase);
  const ceiling = between(frame, possibleAt, possibleAt + 24, 0, 1, cameraEase);

  return (
    <Canvas>
      <EditorialIndex section="Предел — только на мгновение" accent={C.vermilion} />
      <div
        style={{
          position: "absolute",
          left: 126,
          top: interpolate(lift, [0, 1], [430, 180], clamp) - ceiling * 92,
          width: interpolate(lift, [0, 1], [1668, 680], clamp),
          height: interpolate(lift, [0, 1], [620, 390], clamp),
          borderRadius: 30,
          overflow: "hidden",
          transformOrigin: "left top"
        }}
      >
        <Img src={staticFile("assets/cat-vision-atlas.png")} style={{...fullImage, objectPosition: "29% 45%"}} />
        <div style={{position: "absolute", inset: 0, border: `3px solid ${C.vermilion}`, borderRadius: 30}} />
      </div>

      <Reveal
        frame={frame}
        at={peakAt}
        duration={24}
        dy={34}
        style={{position: "absolute", left: 900, top: 336, width: 860}}
      >
        <BigSerif>
          ВЕРШИНА
          <span style={{color: C.vermilion}}>?</span>
        </BigSerif>
      </Reveal>

      <div
        style={{
          position: "absolute",
          left: 882,
          top: interpolate(ceiling, [0, 1], [315, 198], clamp),
          width: 846,
          height: 20,
          borderRadius: 10,
          background: C.cobalt,
          transform: `scaleX(${interpolate(ceiling, [0, 1], [0.2, 1], clamp)})`,
          transformOrigin: "left center",
          opacity: 0.3 + 0.7 * ceiling
        }}
      />
      <Reveal frame={frame} at={possibleAt} style={{position: "absolute", left: 906, top: 508}}>
        <div style={{fontSize: 34, lineHeight: 1.2, maxWidth: 650, color: C.muted}}>
          Возможное оказалось
          <br />
          не потолком, а новой страницей.
        </div>
      </Reveal>
    </Canvas>
  );
};

const TextPage: React.FC<{
  x: number;
  y: number;
  active: boolean;
  lines: number[];
  shift?: number;
}> = ({x, y, active, lines, shift = 0}) => (
  <Panel
    tone={active ? C.white : C.paper2}
    border={active ? C.cobalt : C.paper3}
    style={{position: "absolute", left: x + shift, top: y, width: 440, height: 560, padding: "54px 46px"}}
  >
    <div style={{fontFamily: "DM Serif Display, serif", fontSize: 44, lineHeight: 1.05, marginBottom: 44}}>
      Мысль
    </div>
    <div style={{display: "flex", flexDirection: "column", gap: 20}}>
      {lines.map((w, i) => (
        <div
          key={`${w}-${i}`}
          style={{
            width: `${w}%`,
            height: i === 0 && active ? 15 : 11,
            borderRadius: 8,
            background: i === 0 && active ? C.cobalt : C.paper3,
            opacity: active ? 1 : 0.68
          }}
        />
      ))}
    </div>
  </Panel>
);

export const TextScene: React.FC = () => {
  const frame = useCurrentFrame();
  const readAt = localCue(16, SCENE.text.start);
  const textAt = localCue(17, SCENE.text.start);
  const continueAt = localCue(19, SCENE.text.start);
  const wordsAt = localCue(24, SCENE.text.start);
  const holdAt = localCue(26, SCENE.text.start);
  const thoughtAt = localCue(27, SCENE.text.start);
  const pagesAt = localCue(29, SCENE.text.start);
  const editorP = between(frame, readAt, textAt + 18);
  const continueP = between(frame, continueAt, continueAt + 36, 0, 1, cameraEase);
  const splitP = between(frame, wordsAt, wordsAt + 16);
  const threadP = between(frame, holdAt, thoughtAt + 24, 0, 1, cameraEase);
  const pageP = between(frame, pagesAt, pagesAt + 24, 0, 1, cameraEase);
  const drift = between(frame, 0, SCENE.text.end - SCENE.text.start, 0, 1, cameraEase);

  return (
    <Canvas>
      <EditorialIndex section="Текст становится протяжённой мыслью" />

      <div
        style={{
          position: "absolute",
          left: 96,
          top: 158,
          width: 1728,
          height: 790,
          transform: `translate3d(${interpolate(editorP, [0, 1], [70, 0], clamp) - drift * 14}px, ${
            -drift * 6
          }px, 0) scale(${1 + drift * 0.006})`,
          transformOrigin: "52% 52%",
          opacity: 0.2 + 0.8 * editorP
        }}
      >
        <TextPage x={0} y={56} active={pageP < 0.45} lines={[94, 82, 88, 70, 90, 60]} shift={continueP * -34} />
        <TextPage x={560} y={18} active={pageP >= 0.45 && pageP < 0.8} lines={[76, 93, 68, 86, 74, 90]} shift={continueP * -20} />
        <TextPage x={1120} y={74} active={pageP >= 0.8} lines={[88, 74, 96, 62, 84, 72]} />

        <div
          style={{
            position: "absolute",
            left: 178,
            top: 302,
            width: interpolate(threadP, [0, 1], [0, 1180], clamp),
            height: 26,
            background: C.cobalt,
            borderRadius: 13,
            opacity: threadP,
            transform: `translateY(${Math.sin(threadP * Math.PI) * -28}px)`
          }}
        />
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: 226 + i * 552,
              top: 282,
              width: 66,
              height: 66,
              borderRadius: 20,
              background: i <= pageP * 2.3 ? C.cobalt : C.paper3,
              color: C.white,
              display: "grid",
              placeItems: "center",
              transform: `scale(${0.8 + 0.2 * threadP})`
            }}
          >
            <FileText size={28} strokeWidth={1.8} />
          </div>
        ))}
      </div>

      <Reveal frame={frame} at={textAt} style={{position: "absolute", left: 146, top: 122}}>
        <div style={{fontSize: 30, fontWeight: 700}}>ЧИТАТЬ → ПРОДОЛЖАТЬ</div>
      </Reveal>

      <div
        style={{
          position: "absolute",
          left: 580,
          bottom: 92,
          display: "flex",
          gap: 10,
          transform: `translateY(${splitP * 6}px)`,
          opacity: splitP * (1 - 0.65 * threadP)
        }}
      >
        {['не', 'просто', 'слова'].map((word, i) => (
          <Reveal key={word} frame={frame} at={wordsAt + i * 5} dy={18}>
            <WordPill active={i === 2}>{word}</WordPill>
          </Reveal>
        ))}
      </div>

      <Reveal frame={frame} at={thoughtAt} duration={24} style={{position: "absolute", right: 126, bottom: 88}}>
        <div style={{fontFamily: "DM Serif Display, serif", fontSize: 57, color: C.cobalt}}>держать мысль</div>
      </Reveal>
    </Canvas>
  );
};

const CodeLine: React.FC<{
  width: number;
  color?: string;
  indent?: number;
  active?: boolean;
}> = ({width, color = C.muted, indent = 0, active = false}) => (
  <div style={{display: "flex", alignItems: "center", gap: 14, marginLeft: indent}}>
    <span style={{width: 8, height: 8, borderRadius: 3, background: active ? C.vermilion : C.paper3}} />
    <div style={{width, height: active ? 16 : 12, borderRadius: 8, background: active ? C.cobalt : color}} />
  </div>
);

export const CodeScene: React.FC = () => {
  const frame = useCurrentFrame();
  const codeAt = localCue(33, SCENE.code.start);
  const programmersAt = localCue(34, SCENE.code.start);
  const assistantAt = localCue(37, SCENE.code.start);
  const tireAt = localCue(40, SCENE.code.start);
  const deadlinesAt = localCue(45, SCENE.code.start);
  const editorP = between(frame, codeAt, codeAt + 24, 0, 1, cameraEase);
  const assistantP = uiSpring(frame, assistantAt);
  const workP = between(frame, tireAt, tireAt + 36, 0, 1, objectEase);
  const deadlineP = between(frame, deadlinesAt, deadlinesAt + 24, 0, 1, cameraEase);
  const drift = between(frame, 0, SCENE.code.end - SCENE.code.start, 0, 1, cameraEase);

  return (
    <Canvas background={C.paper2}>
      <EditorialIndex section="Код — совместная работа" accent={C.vermilion} />
      <div
        style={{
          position: "absolute",
          left: 96,
          top: 154,
          width: 1728,
          height: 786,
          display: "grid",
          gridTemplateColumns: "1.65fr 0.85fr",
          gap: 28,
          transform: `translate3d(${-drift * 12}px, ${interpolate(editorP, [0, 1], [60, 0], clamp) - drift * 5}px, 0) scale(${1 + drift * 0.005})`,
          transformOrigin: "50% 52%",
          opacity: 0.1 + 0.9 * editorP
        }}
      >
        <Panel tone={C.ink} border={C.ink} style={{position: "relative", padding: 0}}>
          <div
            style={{
              height: 70,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 30px",
              background: "#242424",
              color: C.white
            }}
          >
            <div style={{display: "flex", alignItems: "center", gap: 14, fontSize: 21, fontWeight: 650}}>
              <Code2 size={26} strokeWidth={1.8} />
              project.ts
            </div>
            <div style={{fontSize: 16, color: C.sageSoft}}>в работе</div>
          </div>
          <div style={{padding: "52px 48px", display: "flex", flexDirection: "column", gap: 28}}>
            <CodeLine width={430} color={C.sage} />
            <CodeLine width={620} color={C.paper3} indent={32} />
            <CodeLine width={520} color={C.paper3} indent={32} />
            <CodeLine width={690} color={C.paper3} />
            <CodeLine width={480} color={C.cobaltSoft} indent={32} active />
            <div
              style={{
                marginLeft: 32,
                width: 610,
                height: 82,
                borderRadius: 18,
                background: C.cobalt,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 26px",
                color: C.white,
                opacity: assistantP,
                transform: `translateX(${(1 - assistantP) * 34}px)`
              }}
            >
              <div style={{display: "flex", gap: 15, alignItems: "center", fontSize: 20, fontWeight: 650}}>
                <Sparkles size={24} strokeWidth={1.8} />
                Продолжить функцию
              </div>
              <Check size={26} strokeWidth={2} />
            </div>
            <CodeLine width={565} color={C.paper3} indent={32} />
            <CodeLine width={280} color={C.vermilionSoft} />
          </div>
          <div
            style={{
              position: "absolute",
              left: 78,
              bottom: 46,
              width: 24,
              height: 38,
              background: C.vermilion,
              opacity: 0.5 + 0.5 * ((Math.floor(frame / 12) + 1) % 2)
            }}
          />
        </Panel>

        <div style={{display: "flex", flexDirection: "column", gap: 24}}>
          <Panel tone={C.white} style={{padding: 28, flex: 1}}>
            <div style={{display: "flex", alignItems: "center", gap: 14, fontSize: 22, fontWeight: 700}}>
              <Sparkles size={26} color={C.cobalt} strokeWidth={1.8} />
              ПОМОЩНИК
            </div>
            <div style={{marginTop: 28, display: "flex", flexDirection: "column", gap: 14}}>
              {["Прочитать контекст", "Предложить решение", "Проверить результат"].map((label, i) => {
                const p = between(workP, i * 0.22, i * 0.22 + 0.45, 0, 1, objectEase);
                return (
                  <div
                    key={label}
                    style={{
                      display: "flex",
                      gap: 14,
                      alignItems: "center",
                      padding: "17px 18px",
                      borderRadius: 16,
                      background: p > 0.82 ? C.sageSoft : C.paper,
                      color: p > 0.82 ? C.ink : C.muted,
                      transform: `translateX(${(1 - p) * 18}px)`,
                      opacity: 0.4 + 0.6 * p
                    }}
                  >
                    <span
                      style={{
                        width: 22,
                        height: 22,
                        borderRadius: 8,
                        display: "grid",
                        placeItems: "center",
                        background: p > 0.82 ? C.sage : C.paper3
                      }}
                    >
                      {p > 0.82 ? <Check size={14} strokeWidth={2.4} /> : null}
                    </span>
                    <span style={{fontSize: 18, fontWeight: 600}}>{label}</span>
                  </div>
                );
              })}
            </div>
          </Panel>

          <Panel
            tone={C.vermilionSoft}
            border={C.vermilion}
            style={{
              padding: 24,
              height: 150,
              transform: `translateX(${deadlineP * 42}px)`,
              opacity: 1 - deadlineP * 0.35
            }}
          >
            <div style={{display: "flex", alignItems: "center", gap: 16}}>
              <CalendarClock size={34} color={C.vermilion} strokeWidth={1.8} />
              <div>
                <div style={{fontSize: 18, fontWeight: 700, letterSpacing: 1.2}}>СРОКИ</div>
                <div style={{fontSize: 26, marginTop: 5}}>работа продолжается</div>
              </div>
            </div>
          </Panel>
        </div>
      </div>
      <Reveal frame={frame} at={programmersAt} style={{position: "absolute", left: 128, bottom: 44}}>
        <div style={{fontSize: 23, color: C.muted}}>Программист задаёт направление — помощник держит темп.</div>
      </Reveal>
    </Canvas>
  );
};

const PromptSurface: React.FC<{frame: number}> = ({frame}) => {
  const imageAt = localCue(48, SCENE.image.start);
  const describeAt = localCue(50, SCENE.image.start);
  const sceneAt = localCue(51, SCENE.image.start);
  const wordsAt = localCue(52, SCENE.image.start);
  const secondsAt = localCue(55, SCENE.image.start);
  const timerP = between(frame, secondsAt, secondsAt + 28);
  const tokens = [
    {label: "светлая галерея", at: describeAt},
    {label: "бумажная форма", at: sceneAt + 5},
    {label: "стекло и свет", at: wordsAt + 5}
  ];

  return (
    <Canvas>
      <EditorialIndex section="Слова становятся изображением" accent={C.vermilion} />
      <Reveal frame={frame} at={imageAt} style={{position: "absolute", left: safe, top: 172}}>
        <div style={{fontFamily: "DM Serif Display, serif", fontSize: 90, lineHeight: 0.95}}>Картинка</div>
      </Reveal>

      <Panel
        tone={C.white}
        border={C.cobalt}
        style={{position: "absolute", left: 96, top: 326, width: 980, height: 470, padding: 42}}
      >
        <div style={{display: "flex", alignItems: "center", gap: 14, color: C.cobalt}}>
          <Type size={28} strokeWidth={1.8} />
          <span style={{fontSize: 19, fontWeight: 700, letterSpacing: 1.4}}>ОПИСАНИЕ СЦЕНЫ</span>
        </div>
        <div style={{display: "flex", flexWrap: "wrap", gap: 14, marginTop: 50}}>
          {tokens.map((token, i) => (
            <SpringReveal key={token.label} frame={frame} at={token.at} dy={20}>
              <WordPill active={i === 1}>{token.label}</WordPill>
            </SpringReveal>
          ))}
        </div>
        <div
          style={{
            position: "absolute",
            left: 42,
            right: 42,
            bottom: 40,
            height: 74,
            borderRadius: 20,
            background: C.ink,
            color: C.white,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 26px"
          }}
        >
          <div style={{display: "flex", alignItems: "center", gap: 14, fontSize: 21, fontWeight: 650}}>
            <Sparkles size={25} color={C.vermilion} strokeWidth={1.8} />
            Создать изображение
          </div>
          <ArrowRight size={28} strokeWidth={1.8} />
        </div>
      </Panel>

      <Panel
        tone={C.paper2}
        style={{position: "absolute", right: 96, top: 208, width: 620, height: 654, display: "grid", placeItems: "center"}}
      >
        <div style={{display: "flex", flexDirection: "column", alignItems: "center", gap: 24, color: C.muted}}>
          <ImageIcon size={74} strokeWidth={1.3} />
          <div style={{fontSize: 25}}>пустая рама ждёт описания</div>
        </div>
        <div
          style={{
            position: "absolute",
            left: 44,
            right: 44,
            bottom: 44,
            height: 16,
            borderRadius: 8,
            background: C.paper3,
            overflow: "hidden",
            opacity: timerP
          }}
        >
          <div
            style={{
              width: `${interpolate(timerP, [0, 1], [8, 100], clamp)}%`,
              height: "100%",
              background: C.vermilion,
              borderRadius: 8
            }}
          />
        </div>
      </Panel>
    </Canvas>
  );
};

const GeneratedStill: React.FC<{frame: number}> = ({frame}) => {
  const screenAt = localCue(60, SCENE.image.start);
  const settle = between(frame, screenAt - 18, screenAt + 18, 0, 1, cameraEase);
  return (
    <Canvas>
      <div style={{position: "absolute", inset: 0, overflow: "hidden"}}>
        <Img
          src={staticFile("assets/generated-scene-base.png")}
          style={{
            ...fullImage,
            transform: `scale(${interpolate(settle, [0, 1], [1.06, 1], clamp)})`,
            transformOrigin: "65% 55%"
          }}
        />
        <div style={{position: "absolute", inset: 0, border: `22px solid ${C.paper}`}} />
      </div>
      <Reveal frame={frame} at={screenAt - 12} duration={24} style={{position: "absolute", left: 118, top: 120}}>
        <Panel tone={C.white} style={{padding: "22px 26px", display: "flex", gap: 16, alignItems: "center"}}>
          <Check size={28} color={C.cobalt} strokeWidth={2} />
          <div style={{fontSize: 23, fontWeight: 700}}>СЦЕНА УЖЕ НА ЭКРАНЕ</div>
        </Panel>
      </Reveal>
    </Canvas>
  );
};

export const ImageScene: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={197}>
        <PromptSurface frame={frame} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={wipe({direction: "from-left"})}
        timing={linearTiming({durationInFrames: 24})}
      />
      <TransitionSeries.Sequence durationInFrames={72}>
        <GeneratedStill frame={frame} />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};

const waveform = [24, 52, 34, 76, 46, 92, 58, 36, 82, 48, 66, 96, 52, 72, 38, 62, 28, 50];

export const VideoScene: React.FC = () => {
  const frame = useCurrentFrame();
  const collectAt = localCue(64, SCENE.video.start);
  const wordsAt = localCue(66, SCENE.video.start);
  const videoAt = localCue(68, SCENE.video.start);
  const movementAt = localCue(70, SCENE.video.start);
  const lightAt = localCue(71, SCENE.video.start);
  const soundAt = localCue(73, SCENE.video.start);
  const collectP = between(frame, collectAt, videoAt + 18, 0, 1, cameraEase);
  const movementP = between(frame, movementAt, movementAt + 24, 0, 1, cameraEase);
  const lightP = between(frame, lightAt, lightAt + 18, 0, 1, objectEase);
  const soundP = between(frame, soundAt, soundAt + 18, 0, 1, objectEase);
  const drift = between(frame, 0, SCENE.video.end - SCENE.video.start, 0, 1, cameraEase);

  return (
    <Canvas background={C.ink}>
      <div style={{position: "absolute", inset: 0, overflow: "hidden"}}>
        <Img
          src={staticFile("assets/generated-scene-base.png")}
          style={{
            ...fullImage,
            width: "112%",
            height: "112%",
            left: "-6%",
            top: "-6%",
            transform: `translate3d(${interpolate(movementP, [0, 1], [0, -44], clamp) - drift * 18}px, ${interpolate(
              movementP,
              [0, 1],
              [0, -18],
              clamp
            ) - drift * 7}px, 0) scale(${interpolate(movementP, [0, 1], [1.015, 1.075], clamp) + drift * 0.008})`,
            transformOrigin: "72% 52%"
          }}
        />
        <Img
          src={staticFile("assets/generated-scene-foreground.png")}
          style={{
            ...fullImage,
            objectFit: "contain",
            transform: `translate3d(${interpolate(movementP, [0, 1], [44, -34], clamp)}px, ${interpolate(
              movementP,
              [0, 1],
              [42, 0],
              clamp
            )}px, 0) scale(${interpolate(movementP, [0, 1], [1.12, 1.19], clamp)})`,
            transformOrigin: "78% 80%",
            opacity: 0.84
          }}
        />
        <div
          style={{
            position: "absolute",
            left: interpolate(lightP, [0, 1], [-520, 1850], clamp),
            top: -120,
            width: 420,
            height: 1340,
            background: C.white,
            opacity: lightP * 0.22,
            transform: "rotate(16deg)"
          }}
        />
      </div>

      <div
        style={{
          position: "absolute",
          left: 96,
          top: 72,
          display: "flex",
          gap: 12,
          opacity: collectP
        }}
      >
        {[
          {label: "СЛОВА", icon: Type, at: wordsAt},
          {label: "ВИДЕО", icon: Video, at: videoAt}
        ].map(({label, icon: Icon, at}) => (
          <SpringReveal key={label} frame={frame} at={at} dy={-20}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "15px 19px",
                borderRadius: 18,
                background: label === "ВИДЕО" ? C.vermilion : C.white,
                color: label === "ВИДЕО" ? C.white : C.ink,
                fontSize: 18,
                fontWeight: 750,
                letterSpacing: 1.4
              }}
            >
              <Icon size={23} strokeWidth={1.8} />
              {label}
            </div>
          </SpringReveal>
        ))}
      </div>

      <div
        style={{
          position: "absolute",
          left: 96,
          right: 96,
          bottom: 62,
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1.35fr",
          gap: 18
        }}
      >
        <Reveal frame={frame} at={movementAt} dy={24}>
          <Panel tone={C.cobalt} border={C.cobalt} style={{height: 118, color: C.white, padding: 24}}>
            <div style={{display: "flex", alignItems: "center", gap: 16}}>
              <Video size={30} strokeWidth={1.8} />
              <div>
                <div style={{fontSize: 17, letterSpacing: 1.3, fontWeight: 700}}>ДВИЖЕНИЕ</div>
                <div style={{fontSize: 24, marginTop: 5}}>камера меняет точку зрения</div>
              </div>
            </div>
          </Panel>
        </Reveal>
        <Reveal frame={frame} at={lightAt} dy={24}>
          <Panel tone={C.vermilion} border={C.vermilion} style={{height: 118, color: C.white, padding: 24}}>
            <div style={{display: "flex", alignItems: "center", gap: 16}}>
              <Sparkles size={30} strokeWidth={1.8} />
              <div>
                <div style={{fontSize: 17, letterSpacing: 1.3, fontWeight: 700}}>СВЕТ</div>
                <div style={{fontSize: 24, marginTop: 5}}>ведёт взгляд к детали</div>
              </div>
            </div>
          </Panel>
        </Reveal>
        <Reveal frame={frame} at={soundAt} dy={24}>
          <Panel tone={C.ink} border={C.ink} style={{height: 118, color: C.white, padding: 20}}>
            <div style={{display: "flex", alignItems: "center", gap: 18}}>
              <Waves size={30} color={C.vermilion} strokeWidth={1.8} />
              <div style={{display: "flex", alignItems: "center", gap: 6, height: 70, flex: 1}}>
                {waveform.map((h, i) => (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      height: h * soundP,
                      minHeight: 4,
                      borderRadius: 5,
                      background: i % 4 === 0 ? C.vermilion : C.white,
                      opacity: 0.55 + 0.45 * soundP
                    }}
                  />
                ))}
              </div>
            </div>
          </Panel>
        </Reveal>
      </div>
    </Canvas>
  );
};

const capabilities = [
  {label: "КОШКА", icon: Cat, color: C.sage},
  {label: "ТЕКСТ", icon: FileText, color: C.cobalt},
  {label: "КОД", icon: Code2, color: C.vermilion},
  {label: "КАРТИНКА", icon: ImageIcon, color: C.cobalt},
  {label: "ВИДЕО", icon: Video, color: C.vermilion}
];

export const StepsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const everyAt = localCue(74, SCENE.steps.start);
  const limitAt = localCue(78, SCENE.steps.start);
  const nextAt = localCue(83, SCENE.steps.start);
  const gapsAt = localCue(85, SCENE.steps.start);
  const shorterAt = localCue(88, SCENE.steps.start);
  const enterP = between(frame, everyAt, nextAt + 18, 0, 1, cameraEase);
  const wallP = between(frame, limitAt, limitAt + 18, 0, 1, objectEase);
  const nextP = between(frame, nextAt, nextAt + 24, 0, 1, cameraEase);
  const overviewP = between(frame, gapsAt, gapsAt + 24, 0, 1, cameraEase);
  const compressP = between(frame, shorterAt, shorterAt + 45, 0, 1, compressEase);
  const drift = between(frame, 0, SCENE.steps.end - SCENE.steps.start, 0, 1, cameraEase);
  const wideGap = 292;
  const tightGap = 215;

  return (
    <Canvas>
      <EditorialIndex section="Ускорение становится видимым" accent={C.vermilion} />
      <Reveal frame={frame} at={everyAt} style={{position: "absolute", left: safe, top: 150}}>
        <BigSerif style={{fontSize: 94}}>КАЖДЫЙ ШАГ</BigSerif>
      </Reveal>
      <div
        style={{
          position: "absolute",
          left: 96,
          top: 370,
          width: 2500,
          height: 430,
          transform: `translate3d(${interpolate(overviewP, [0, 1], [120, -80], clamp) - drift * 18}px, ${interpolate(
            overviewP,
            [0, 1],
            [30, 0],
            clamp
          ) - drift * 4}px, 0) scale(${interpolate(overviewP, [0, 1], [1.02, 0.83], clamp) + drift * 0.006})`,
          transformOrigin: "left center"
        }}
      >
        {capabilities.map((item, i) => {
          const stagger = i * 5;
          const p = between(enterP, i * 0.12, i * 0.12 + 0.34, 0, 1, objectEase);
          const visible = i < 4 ? p : p * nextP;
          const x = i * interpolate(compressP, [0, 1], [wideGap, tightGap], clamp);
          const rise = i % 2 === 0 ? 0 : -34;
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              style={{
                position: "absolute",
                left: x,
                top: 112 + rise,
                width: 240,
                height: 236,
                borderRadius: 30,
                background: i === 4 ? C.ink : C.white,
                border: `3px solid ${item.color}`,
                color: i === 4 ? C.white : C.ink,
                padding: 28,
                boxSizing: "border-box",
                opacity: visible,
                transform: `translateY(${(1 - visible) * (48 + stagger)}px) scale(${0.94 + visible * 0.06})`
              }}
            >
              <div
                style={{
                  width: 66,
                  height: 66,
                  borderRadius: 20,
                  background: item.color,
                  color: C.white,
                  display: "grid",
                  placeItems: "center"
                }}
              >
                <Icon size={34} strokeWidth={1.8} />
              </div>
              <div style={{fontSize: 21, fontWeight: 750, letterSpacing: 1.2, marginTop: 44}}>{item.label}</div>
              <div style={{fontFamily: "DM Serif Display, serif", fontSize: 48, marginTop: 5}}>{i + 1}</div>
            </div>
          );
        })}
        <div
          style={{
            position: "absolute",
            left: interpolate(wallP, [0, 1], [866, 1095], clamp),
            top: 50,
            width: 22,
            height: 342,
            borderRadius: 11,
            background: C.vermilion,
            opacity: wallP * (1 - nextP)
          }}
        />
      </div>

      <Reveal frame={frame} at={limitAt} style={{position: "absolute", right: 118, top: 175}}>
        <Panel tone={C.vermilionSoft} border={C.vermilion} style={{padding: "20px 24px"}}>
          <div style={{fontSize: 22, fontWeight: 700}}>ПРЕДЕЛ?</div>
        </Panel>
      </Reveal>
      <Reveal frame={frame} at={gapsAt} style={{position: "absolute", left: 102, bottom: 72}}>
        <div style={{fontSize: 28, color: C.muted}}>
          Промежутки между этапами
          <span style={{color: C.cobalt, fontWeight: 750}}> становятся короче</span>
        </div>
      </Reveal>
    </Canvas>
  );
};

export const ChoiceScene: React.FC = () => {
  const frame = useCurrentFrame();
  const questionAt = localCue(91, SCENE.choice.start);
  const notAt = localCue(93, SCENE.choice.start);
  const canAt = localCue(98, SCENE.choice.start);
  const weAt = localCue(103, SCENE.choice.start);
  const wantAt = localCue(104, SCENE.choice.start);
  const doAt = localCue(107, SCENE.choice.start);
  const revealP = between(frame, questionAt, questionAt + 24, 0, 1, cameraEase);
  const dimP = between(frame, notAt, canAt + 18, 0, 1, objectEase);
  const handP = between(frame, weAt, weAt + 20, 0, 1, cameraEase);
  const answerP = between(frame, wantAt, doAt + 12, 0, 1, objectEase);
  const drift = between(frame, 0, SCENE.choice.end - SCENE.choice.start, 0, 1, cameraEase);

  return (
    <Canvas>
      <Img
        src={staticFile("assets/future-choice.png")}
        style={{
          ...fullImage,
          transform: `translate3d(${interpolate(revealP, [0, 1], [48, 0], clamp) - drift * 14}px, ${
            -drift * 5
          }px, 0) scale(${interpolate(
            revealP,
            [0, 1],
            [1.06, 1],
            clamp
          ) + drift * 0.008})`,
          transformOrigin: "55% 55%"
        }}
      />
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          width: `${interpolate(handP, [0, 1], [38, 0], clamp)}%`,
          height: "100%",
          background: C.paper
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: C.paper,
          opacity: dimP * 0.36,
          clipPath: "polygon(0 0, 36% 0, 36% 100%, 0 100%)"
        }}
      />

      <Reveal frame={frame} at={questionAt} style={{position: "absolute", left: 96, top: 92}}>
        <div style={{fontSize: 24, fontWeight: 750, letterSpacing: 2, color: C.vermilion}}>ВОПРОС ТЕПЕРЬ</div>
      </Reveal>

      <div style={{position: "absolute", left: 95, top: 206, width: 500}}>
        <Reveal frame={frame} at={notAt} duration={18}>
          <div style={{fontFamily: "DM Serif Display, serif", fontSize: 68, lineHeight: 0.98, color: C.muted}}>
            не в том,
            <br />
            что они умеют
          </div>
        </Reveal>
        <div
          style={{
            marginTop: 30,
            display: "flex",
            gap: 10,
            flexWrap: "wrap",
            opacity: 1 - dimP * 0.62
          }}
        >
          {[
            {label: "текст", icon: FileText},
            {label: "код", icon: Code2},
            {label: "изображение", icon: ImageIcon},
            {label: "видео", icon: Video}
          ].map((item) => (
            <IconTile key={item.label} icon={item.icon} label={item.label} compact />
          ))}
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: 698,
          top: 246,
          width: 520,
          height: 566,
          padding: "52px 46px",
          boxSizing: "border-box"
        }}
      >
        <Reveal frame={frame} at={weAt} duration={20} dy={22}>
          <div style={{fontSize: 25, fontWeight: 750, letterSpacing: 1.6, color: C.cobalt}}>А В ТОМ, ЧТО МЫ</div>
        </Reveal>
        <Reveal frame={frame} at={wantAt} duration={24} dy={28}>
          <div
            style={{
              fontFamily: "DM Serif Display, serif",
              fontSize: 74,
              lineHeight: 0.96,
              marginTop: 24,
              color: C.ink
            }}
          >
            захотим
            <br />с этим
            <br />
            <span style={{color: C.cobalt}}>сделать.</span>
          </div>
        </Reveal>
        <div
          style={{
            position: "absolute",
            left: 42,
            right: 42,
            bottom: 34,
            height: 12,
            borderRadius: 6,
            background: C.cobalt,
            transform: `scaleX(${answerP})`,
            transformOrigin: "left center"
          }}
        />
      </div>
    </Canvas>
  );
};
