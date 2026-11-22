import React from 'react';
import {Composition} from 'remotion';
import {AIBeautifulLie} from './film';

export const Root: React.FC = () => (
  <Composition
    id="AIBeautifulLie"
    component={AIBeautifulLie}
    durationInFrames={7113}
    fps={30}
    width={1920}
    height={1080}
  />
);
