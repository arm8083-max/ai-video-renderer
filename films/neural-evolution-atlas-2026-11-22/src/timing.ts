import timing from "./timings.json";

type WordTiming = {
  index: number;
  word: string;
  start: number;
  end: number;
  start_frame: number;
  end_frame: number;
};

export const words = timing.words as WordTiming[];
export const cue = (index: number) => words[index].start_frame;
export const localCue = (index: number, sceneStart: number) => cue(index) - sceneStart;

export const SCENE = {
  cat: {start: 0, end: 156},
  peak: {start: 156, end: 229},
  text: {start: 229, end: 490},
  code: {start: 490, end: 709},
  image: {start: 709, end: 936},
  video: {start: 936, end: 1143},
  steps: {start: 1143, end: 1373},
  choice: {start: 1373, end: 1539}
} as const;

export const overlap = 18;
