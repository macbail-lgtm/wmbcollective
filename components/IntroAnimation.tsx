"use client";

import { useEffect, useRef, useState } from "react";

const BAR_COUNT = 27;
const DURATION_MS = 1500;
const FADE_MS = 350;

// Symmetrical bar heights: tall in the center, tapering toward both ends.
function barHeightPercent(index: number, total: number) {
  const center = (total - 1) / 2;
  const distanceFromCenter = Math.abs(index - center) / center;
  return 14 + (1 - distanceFromCenter) * 86;
}

export default function IntroAnimation({
  children,
}: {
  children: React.ReactNode;
}) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"playing" | "leaving" | "done">(
    "playing"
  );
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    let raf: number;

    const tick = (now: number) => {
      if (startRef.current === null) startRef.current = now;
      const elapsed = now - startRef.current;
      const pct = Math.min(100, Math.round((elapsed / DURATION_MS) * 100));
      setProgress(pct);

      if (elapsed < DURATION_MS) {
        raf = requestAnimationFrame(tick);
      } else {
        setPhase("leaving");
        window.setTimeout(() => setPhase("done"), FADE_MS);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <>
      {phase !== "done" && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white"
          style={{
            opacity: phase === "leaving" ? 0 : 1,
            transition: `opacity ${FADE_MS}ms ease-out`,
          }}
          aria-hidden="true"
        >
          <div className="flex h-20 items-end gap-[3px] sm:h-24">
            {Array.from({ length: BAR_COUNT }).map((_, i) => {
              const revealed = progress >= (i / BAR_COUNT) * 100;
              return (
                <span
                  key={i}
                  className="w-[4px] origin-bottom rounded-full bg-red sm:w-[5px]"
                  style={{
                    height: `${barHeightPercent(i, BAR_COUNT)}%`,
                    transform: revealed ? "scaleY(1)" : "scaleY(0)",
                    transition: "transform 0.2s ease-out",
                  }}
                />
              );
            })}
          </div>
          <div className="mt-8 font-body text-sm tracking-widest2 text-navy">
            {progress}%
          </div>
        </div>
      )}
      <div
        style={{
          opacity: phase === "done" ? 1 : 0,
          transition: `opacity ${FADE_MS}ms ease-in`,
        }}
      >
        {children}
      </div>
    </>
  );
}
