import React from 'react';
import {Composition} from 'remotion';
import {TurkAICabinet} from './film';

export const Root: React.FC = () => (
  <Composition
    id="TurkAICabinet"
    component={TurkAICabinet}
    durationInFrames={24682}
    fps={30}
    width={1920}
    height={1080}
  />
);
