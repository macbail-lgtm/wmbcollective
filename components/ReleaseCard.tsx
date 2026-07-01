import type { PlaceholderRelease } from "@/content";

// Placeholder release card used on the Release Radar page.
export default function ReleaseCard({
  release,
}: {
  release: PlaceholderRelease;
}) {
  return (
    <div className="flex flex-col">
      <div className="relative aspect-square w-full bg-[#f0f0f0]">
        <span className="absolute right-3 top-3 rounded-full bg-red px-3 py-1 font-body text-[10px] uppercase tracking-widest2 text-white">
          Coming Soon
        </span>
      </div>
      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <p className="font-body text-sm text-navy">{release.artist}</p>
          <p className="mt-1 font-display italic font-black text-navy text-base">
            {release.title}
          </p>
        </div>
        <span className="whitespace-nowrap rounded-full border border-border px-2 py-1 font-body text-[10px] uppercase tracking-widest2 text-navy/60">
          {release.format}
        </span>
      </div>
    </div>
  );
}
