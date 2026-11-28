import React from 'react';
import {Composition} from 'remotion';
import {AgentBreakoutFilm} from './film';

export const Root: React.FC = () => (
  <Composition
    id="AgentBreakout"
    component={AgentBreakoutFilm}
    durationInFrames={27379}
    fps={30}
    width={1920}
    height={1080}
  />
);
