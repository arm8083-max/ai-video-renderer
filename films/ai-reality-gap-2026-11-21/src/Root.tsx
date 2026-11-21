import React from "react";
import {Composition} from "remotion";
import timing from "./timing.json";
import {CalibrationFilm, CalibrationMotionTest} from "./CalibrationFilm";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="CalibrationFilm"
        component={CalibrationFilm}
        durationInFrames={timing.frames}
        fps={timing.fps}
        width={1920}
        height={1080}
      />
      <Composition
        id="CalibrationMotionTest"
        component={CalibrationMotionTest}
        durationInFrames={54 * timing.fps}
        fps={timing.fps}
        width={1920}
        height={1080}
      />
    </>
  );
};
