"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

interface SpaceRainProps {
  count?: number;
  minDelay?: number;
  maxDelay?: number;
  minDuration?: number;
  maxDuration?: number;
  angle?: number;
  className?: string;
}

export const SpaceRain = ({
  count = 25,
  minDelay = 0.1,
  maxDelay = 1.5,
  minDuration = 3,
  maxDuration = 8,
  angle = 195,
  className,
}: SpaceRainProps) => {
  const [particleStyles, setParticleStyles] = useState<
    Array<React.CSSProperties>
  >([]);

  useEffect(() => {
    const styles = [...new Array(count)].map(() => ({
      "--fall-angle": -angle + "deg",
      top: "-2%",
      left: `calc(0% + ${Math.floor(Math.random() * window.innerWidth)}px)`,
      animationDelay: Math.random() * (maxDelay - minDelay) + minDelay + "s",
      animationDuration:
        Math.floor(Math.random() * (maxDuration - minDuration) + minDuration) +
        "s",
    }));
    setParticleStyles(styles);
  }, [count, minDelay, maxDelay, minDuration, maxDuration, angle]);

  return (
    <>
      {[...particleStyles].map((style, idx) => (
        <span
          key={idx}
          style={{ ...style }}
          className={cn(
            "pointer-events-none absolute size-1 rotate-[var(--fall-angle)] animate-space-rain rounded-full bg-primary/30 shadow-[0_0_2px_1px_rgba(var(--primary),.2)]",
            className
          )}
        >
          <div className="pointer-events-none absolute top-1/2 -z-10 h-[1px] w-[60px] -translate-y-1/2 bg-gradient-to-r from-primary/30 to-transparent" />
        </span>
      ))}
    </>
  );
};
