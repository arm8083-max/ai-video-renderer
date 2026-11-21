import React from "react";
import type {LucideIcon} from "lucide-react";
import {interpolate} from "remotion";
import {C, clamp, enter, objectEase, radius, safe, uiSpring} from "./theme";

export const Canvas: React.FC<React.PropsWithChildren<{opacity?: number; background?: string}>> = ({
  children,
  opacity = 1,
  background = C.paper
}) => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      overflow: "hidden",
      opacity,
      background,
      color: C.ink,
      fontFamily: "Space Grotesk, sans-serif"
    }}
  >
    {children}
  </div>
);

export const EditorialIndex: React.FC<{section: string; accent?: string}> = ({section, accent = C.cobalt}) => (
  <div
    style={{
      position: "absolute",
      left: safe,
      top: 62,
      display: "flex",
      alignItems: "center",
      gap: 14,
      fontSize: 18,
      letterSpacing: 2.4,
      fontWeight: 650,
      textTransform: "uppercase",
      color: C.muted
    }}
  >
    <span style={{width: 12, height: 12, borderRadius: 4, background: accent}} />
    {section}
  </div>
);

export const Panel: React.FC<
  React.PropsWithChildren<{
    style?: React.CSSProperties;
    tone?: string;
    border?: string;
    radiusValue?: number;
  }>
> = ({children, style, tone = C.white, border = C.paper3, radiusValue = radius}) => (
  <div
    style={{
      background: tone,
      border: `2px solid ${border}`,
      borderRadius: radiusValue,
      overflow: "hidden",
      boxSizing: "border-box",
      ...style
    }}
  >
    {children}
  </div>
);

export const Reveal: React.FC<
  React.PropsWithChildren<{
    frame: number;
    at: number;
    duration?: number;
    dx?: number;
    dy?: number;
    scaleFrom?: number;
    style?: React.CSSProperties;
  }>
> = ({children, frame, at, duration = 18, dx = 0, dy = 28, scaleFrom = 0.985, style}) => {
  const p = enter(frame, at, duration);
  return (
    <div
      style={{
        opacity: p,
        transform: `translate3d(${(1 - p) * dx}px, ${(1 - p) * dy}px, 0) scale(${interpolate(
          p,
          [0, 1],
          [scaleFrom, 1],
          {...clamp, easing: objectEase}
        )})`,
        ...style
      }}
    >
      {children}
    </div>
  );
};

export const SpringReveal: React.FC<
  React.PropsWithChildren<{frame: number; at: number; dx?: number; dy?: number; style?: React.CSSProperties}>
> = ({children, frame, at, dx = 0, dy = 24, style}) => {
  const p = uiSpring(frame, at);
  return (
    <div
      style={{
        opacity: p,
        transform: `translate3d(${(1 - p) * dx}px, ${(1 - p) * dy}px, 0)`,
        ...style
      }}
    >
      {children}
    </div>
  );
};

export const IconTile: React.FC<{
  icon: LucideIcon;
  label: string;
  active?: boolean;
  compact?: boolean;
}> = ({icon: Icon, label, active = false, compact = false}) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: compact ? 10 : 16,
      padding: compact ? "12px 16px" : "18px 22px",
      borderRadius: compact ? 16 : 20,
      background: active ? C.cobalt : C.paper2,
      color: active ? C.white : C.ink,
      border: `2px solid ${active ? C.cobalt : C.paper3}`,
      fontSize: compact ? 18 : 23,
      fontWeight: 650,
      whiteSpace: "nowrap"
    }}
  >
    <Icon size={compact ? 22 : 28} strokeWidth={1.8} />
    {label}
  </div>
);

export const WordPill: React.FC<{children: React.ReactNode; active?: boolean; quiet?: boolean}> = ({
  children,
  active = false,
  quiet = false
}) => (
  <span
    style={{
      display: "inline-flex",
      alignItems: "center",
      padding: "11px 16px 12px",
      borderRadius: 16,
      background: active ? C.cobalt : quiet ? C.paper2 : C.white,
      color: active ? C.white : C.ink,
      border: `2px solid ${active ? C.cobalt : C.paper3}`,
      fontSize: 25,
      fontWeight: 600,
      lineHeight: 1
    }}
  >
    {children}
  </span>
);

export const BigSerif: React.FC<React.PropsWithChildren<{style?: React.CSSProperties}>> = ({children, style}) => (
  <div
    style={{
      fontFamily: "DM Serif Display, serif",
      fontSize: 132,
      letterSpacing: -4,
      lineHeight: 0.9,
      ...style
    }}
  >
    {children}
  </div>
);

export const FocusFrame: React.FC<{
  x: number;
  y: number;
  width: number;
  height: number;
  progress: number;
  label?: string;
}> = ({x, y, width, height, progress, label}) => (
  <div
    style={{
      position: "absolute",
      left: `${x * 100}%`,
      top: `${y * 100}%`,
      width: `${width * 100}%`,
      height: `${height * 100}%`,
      boxSizing: "border-box",
      border: `4px solid ${C.cobalt}`,
      borderRadius: 22,
      opacity: progress,
      clipPath: `inset(0 ${(1 - progress) * 100}% 0 0 round 22px)`
    }}
  >
    {label ? (
      <div
        style={{
          position: "absolute",
          left: -4,
          top: -52,
          background: C.cobalt,
          color: C.white,
          borderRadius: "14px 14px 14px 0",
          padding: "11px 16px",
          fontSize: 22,
          fontWeight: 700,
          letterSpacing: 1.3
        }}
      >
        {label}
      </div>
    ) : null}
  </div>
);

export const LowerCaption: React.FC<{children: React.ReactNode; accent?: string}> = ({
  children,
  accent = C.cobalt
}) => (
  <div
    style={{
      position: "absolute",
      left: safe,
      bottom: 62,
      display: "flex",
      alignItems: "center",
      gap: 18,
      fontSize: 23,
      fontWeight: 600,
      color: C.muted
    }}
  >
    <span style={{width: 34, height: 10, borderRadius: 5, background: accent}} />
    {children}
  </div>
);
