import timingData from './timings.json';

export type WordTiming = {
  index: number;
  paragraph: number;
  word: string;
  normalized: string;
  start_frame: number;
  end_frame: number;
};

const words = (timingData as {words: WordTiming[]}).words;

const normalize = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean);

export const frameOf = (phrase: string, occurrence = 0): number => {
  const parts = normalize(phrase);
  let found = 0;
  for (let i = 0; i <= words.length - parts.length; i++) {
    if (parts.every((part, offset) => words[i + offset].normalized === part)) {
      if (found === occurrence) return words[i].start_frame;
      found++;
    }
  }
  throw new Error(`Could not locate phrase: ${phrase}`);
};

export const paragraphStart = (paragraph: number): number => {
  const match = words.find((word) => word.paragraph === paragraph);
  if (!match) throw new Error(`Missing paragraph ${paragraph}`);
  return match.start_frame;
};

export const paragraphEnd = (paragraph: number): number => {
  const matches = words.filter((word) => word.paragraph === paragraph);
  if (!matches.length) throw new Error(`Missing paragraph ${paragraph}`);
  return matches[matches.length - 1].end_frame;
};

export const relativeFrame = (phrase: string, sceneStart: number, occurrence = 0) =>
  frameOf(phrase, occurrence) - sceneStart;

export const FPS = 30;
export const TOTAL_FRAMES = 27379;
