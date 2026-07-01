import Image from "next/image";
import Link from "next/link";

// Intrinsic dimensions of public/images/logo.png — used by next/image for
// aspect-ratio calculation; actual display size is set via className.
const LOGO_WIDTH = 1705;
const LOGO_HEIGHT = 922;

type LogoProps = {
  // "hero" = large logo with speed lines, used on the landing page.
  // "nav" = smaller logo, used top-left in the sticky nav on inner pages.
  variant: "hero" | "nav";
};

export default function Logo({ variant }: LogoProps) {
  if (variant === "nav") {
    return (
      <Link href="/" className="flex items-center bg-white">
        <Image
          src="/images/logo.png"
          alt="WMB Collective"
          width={LOGO_WIDTH}
          height={LOGO_HEIGHT}
          priority
          className="h-16 w-auto sm:h-20 md:max-h-[120px]"
        />
      </Link>
    );
  }

  return (
    <div className="relative flex items-center justify-center bg-white">
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
      <Image
        src="/images/logo.png"
        alt="WMB Collective"
        width={LOGO_WIDTH}
        height={LOGO_HEIGHT}
        priority
        className="w-[280px] h-auto"
      />
    </div>
  );
}
