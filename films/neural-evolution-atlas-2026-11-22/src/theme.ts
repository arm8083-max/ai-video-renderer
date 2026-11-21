import {Easing, interpolate, spring} from "remotion";

export const C = {
  paper: "#F1EEE6",
  paper2: "#E8E2D5",
  paper3: "#D9D3C6",
  ink: "#151515",
  muted: "#6E6A62",
  cobalt: "#2148C0",
  cobaltSoft: "#C9D4F5",
  vermilion: "#E45B37",
  vermilionSoft: "#F4C9BA",
  sage: "#91A28F",
  sageSoft: "#D5DDD3",
  white: "#FAF8F2"
} as const;

export const cameraEase = Easing.bezier(0.22, 1, 0.36, 1);
export const objectEase = Easing.bezier(0.16, 1, 0.3, 1);
export const compressEase = Easing.bezier(0.65, 0, 0.35, 1);

export const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const
};

export const between = (
  frame: number,
  start: number,
  end: number,
  from = 0,
  to = 1,
  easing = objectEase
) => interpolate(frame, [start, end], [from, to], {...clamp, easing});

export const enter = (frame: number, at: number, duration = 18) =>
  between(frame, at, at + duration);

export const sceneOpacity = (frame: number, start: number, end: number, fade = 18) => {
  const incoming = between(frame, start, start + fade);
  const outgoing = between(frame, end - fade, end, 1, 0);
  return Math.min(incoming, outgoing);
};

export const uiSpring = (frame: number, at: number, fps = 30) =>
  spring({
    frame: frame - at,
    fps,
    config: {damping: 26, stiffness: 180, mass: 0.9, overshootClamping: true},
    durationInFrames: 24
  });

export const safe = 96;
export const radius = 24;
export const line = 2;
