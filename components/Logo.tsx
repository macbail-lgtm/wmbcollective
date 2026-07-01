import Link from "next/link";

type LogoProps = {
  // "hero" = large stacked logo with speed lines, used on the landing page.
  // "nav" = small inline logo, used in the sticky nav on inner pages.
  variant: "hero" | "nav";
};

export default function Logo({ variant }: LogoProps) {
  if (variant === "nav") {
    return (
      <Link href="/" className="flex items-baseline gap-2">
        <span className="font-display italic font-black text-navy text-xl">
          WMB
        </span>
        <span className="font-body text-[10px] tracking-widest2 uppercase text-navy-outline">
          COLLECTIVE
        </span>
      </Link>
    );
  }

  return (
    <div className="relative flex flex-col items-center">
      <div
        className="pointer-events-none absolute -left-16 top-1/2 hidden -translate-y-1/2 flex-col gap-1.5 sm:flex md:-left-24"
        aria-hidden="true"
      >
        {[64, 48, 32, 16].map((width, i) => (
          <span
            key={width}
            className="speed-line h-[3px] rounded-full bg-red"
            style={{ width, animationDelay: `${i * 0.08}s` }}
          />
        ))}
      </div>
      <span className="font-display italic font-black text-navy text-6xl leading-none sm:text-7xl md:text-8xl">
        WMB
      </span>
      <span className="mt-3 font-body text-base tracking-widest2 uppercase text-navy-outline sm:text-lg">
        COLLECTIVE
      </span>
    </div>
  );
}
