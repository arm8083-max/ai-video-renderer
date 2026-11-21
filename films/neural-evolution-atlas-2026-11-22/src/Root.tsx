import React from "react";
import {AbsoluteFill, Composition} from "remotion";
import {AtlasFilm} from "./AtlasFilm";

const AtlasAnimatic: React.FC = () => (
  <AbsoluteFill style={{overflow: "hidden"}}>
    <div
      style={{
        position: "relative",
        width: 1920,
        height: 1080,
        transform: "scale(0.5)",
        transformOrigin: "left top"
      }}
    >
      <AtlasFilm />
    </div>
  </AbsoluteFill>
);

export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="NeuralEvolutionAtlas"
      component={AtlasFilm}
      width={1920}
      height={1080}
      fps={30}
      durationInFrames={1539}
    />
    <Composition
      id="NeuralEvolutionAnimatic"
      component={AtlasAnimatic}
      width={960}
      height={540}
      fps={30}
      durationInFrames={1539}
    />
  </>
);
