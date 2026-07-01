import Image from "next/image";
import type { ResourceCard as ResourceCardType } from "@/content";

// Book card used on The Curriculum page, below the Holy Grail.
export default function ResourceCard({
  resource,
}: {
  resource: ResourceCardType;
}) {
  return (
    <div className="flex gap-4 border border-border p-6">
      {resource.coverImage ? (
        <Image
          src={resource.coverImage}
          alt={`${resource.title} book cover`}
          width={120}
          height={180}
          className="h-28 w-[76px] flex-shrink-0 object-cover"
        />
      ) : (
        <div className="h-28 w-[76px] flex-shrink-0 bg-[#f0f0f0]" />
      )}

      <div className="flex flex-col">
        <h3 className="font-display italic font-black text-navy text-base">
          {resource.title}
        </h3>
        <p className="mt-1 font-body text-xs text-navy/70">
          {resource.author}
        </p>
        <p className="mt-2 font-body text-xs font-light leading-relaxed text-gray-400">
          {resource.blurb}
        </p>
        <a
          href={resource.buttonHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block w-fit bg-navy px-4 py-1.5 font-body text-[10px] uppercase tracking-widest2 text-white transition-colors hover:bg-red"
        >
          {resource.buttonText}
        </a>
      </div>
    </div>
  );
}
