import "@fontsource/space-grotesk/400.css";
import "@fontsource/space-grotesk/600.css";
import "@fontsource/space-grotesk/700.css";
import "@fontsource/dm-serif-display/400.css";
import React from "react";
import {AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame} from "remotion";
import {CatScene, ChoiceScene, CodeScene, ImageScene, PeakScene, StepsScene, TextScene, VideoScene} from "./scenes";
import {overlap, SCENE} from "./timing";
import {between, C} from "./theme";

const SceneFader: React.FC<
  React.PropsWithChildren<{nominalDuration: number; first?: boolean; last?: boolean}>
> = ({children, nominalDuration, first = false, last = false}) => {
  const frame = useCurrentFrame();
  const incoming = first ? 1 : between(frame, 0, overlap);
  const outgoing = last ? 1 : between(frame, nominalDuration, nominalDuration + overlap, 1, 0);
  return <AbsoluteFill style={{opacity: Math.min(incoming, outgoing)}}>{children}</AbsoluteFill>;
};

type LayerProps = {
  start: number;
  end: number;
  first?: boolean;
  last?: boolean;
  children: React.ReactNode;
};

const Layer: React.FC<LayerProps> = ({start, end, first, last, children}) => {
  const nominalDuration = end - start;
  const durationInFrames = nominalDuration + (last ? 0 : overlap);
  return (
    <Sequence from={start} durationInFrames={durationInFrames} layout="none">
      <SceneFader nominalDuration={nominalDuration} first={first} last={last}>
        {children}
      </SceneFader>
    </Sequence>
  );
};

export const AtlasFilm: React.FC = () => (
  <AbsoluteFill style={{background: C.paper, fontFamily: "Space Grotesk, sans-serif"}}>
    <Audio src={staticFile("narration.wav")} />
    <Layer start={SCENE.cat.start} end={SCENE.cat.end} first>
      <CatScene />
    </Layer>
    <Layer start={SCENE.peak.start} end={SCENE.peak.end}>
      <PeakScene />
    </Layer>
    <Layer start={SCENE.text.start} end={SCENE.text.end}>
      <TextScene />
    </Layer>
    <Layer start={SCENE.code.start} end={SCENE.code.end}>
      <CodeScene />
    </Layer>
    <Layer start={SCENE.image.start} end={SCENE.image.end}>
      <ImageScene />
    </Layer>
    <Layer start={SCENE.video.start} end={SCENE.video.end}>
      <VideoScene />
    </Layer>
    <Layer start={SCENE.steps.start} end={SCENE.steps.end}>
      <StepsScene />
    </Layer>
    <Layer start={SCENE.choice.start} end={SCENE.choice.end} last>
      <ChoiceScene />
    </Layer>
  </AbsoluteFill>
);
