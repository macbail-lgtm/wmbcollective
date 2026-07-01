"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

const DURATION_MS = 1500;
const FADE_MS = 350;
const SESSION_KEY = "visited";

// Heartbeat/ECG-style trace: flat baseline, sharp angular spike in the
// center, flat baseline. Straight segments only (no curves) for the
// jagged look. viewBox is 600x200, baseline at y=100.
const WAVEFORM_PATH =
  "M0,100 L220,100 L248,85 L270,100 L282,155 L294,15 L306,185 L318,100 L332,78 L346,100 L600,100";

export default function IntroAnimation({
  children,
}: {
  children: React.ReactNode;
}) {
  const [phase, setPhase] = useState<"checking" | "playing" | "leaving" | "done">(
    "checking"
  );
  const [skipped, setSkipped] = useState(false);
  const [progress, setProgress] = useState(0);
  const pathRef = useRef<SVGPathElement>(null);
  const startRef = useRef<number | null>(null);

  // Runs before paint so a returning visitor (same tab session) never sees
  // a flash of the intro before it's dismissed.
  useLayoutEffect(() => {
    const alreadyVisited = window.sessionStorage.getItem(SESSION_KEY) === "true";
    if (alreadyVisited) {
      setSkipped(true);
      setPhase("done");
    } else {
      setPhase("playing");
    }
  }, []);

  useEffect(() => {
    if (phase !== "playing") return;

    const path = pathRef.current;
    if (path) {
      const length = path.getTotalLength();
      path.style.strokeDasharray = `${length}`;
      path.style.strokeDashoffset = `${length}`;
      // Force a reflow so the browser registers the starting offset
      // before the transition to the animated value kicks in.
      path.getBoundingClientRect();
      path.style.transition = `stroke-dashoffset ${DURATION_MS}ms linear`;
      path.style.strokeDashoffset = "0";
    }

    let raf: number;
    const tick = (now: number) => {
      if (startRef.current === null) startRef.current = now;
      const elapsed = now - startRef.current;
      const pct = Math.min(100, Math.round((elapsed / DURATION_MS) * 100));
      setProgress(pct);

      if (elapsed < DURATION_MS) {
        raf = requestAnimationFrame(tick);
      } else {
        window.sessionStorage.setItem(SESSION_KEY, "true");
        setPhase("leaving");
        window.setTimeout(() => setPhase("done"), FADE_MS);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [phase]);

  const showOverlay = phase === "playing" || phase === "leaving";

  return (
    <>
      {showOverlay && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white"
          style={{
            opacity: phase === "leaving" ? 0 : 1,
            transition: `opacity ${FADE_MS}ms ease-out`,
          }}
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 600 200"
            width="600"
            height="200"
            className="w-[320px] h-auto sm:w-[420px]"
          >
            <path
              ref={pathRef}
              d={WAVEFORM_PATH}
              fill="none"
              stroke="#C0152A"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="miter"
            />
          </svg>
          <div className="mt-8 font-body text-sm tracking-widest2 text-navy">
            {progress}%
          </div>
        </div>
      )}
      <div
        style={
          skipped
            ? { opacity: 1 }
            : {
                opacity: phase === "done" ? 1 : 0,
                transition:
                  phase === "checking" ? "none" : `opacity ${FADE_MS}ms ease-in`,
              }
        }
      >
        {children}
      </div>
    </>
  );
}
