import type { ResourceCard as ResourceCardType } from "@/content";

// Placeholder resource card used on The Curriculum page (below the Holy Grail).
export default function ResourceCard({
  resource,
}: {
  resource: ResourceCardType;
}) {
  return (
    <div className="flex flex-col border border-border p-6">
      <h3 className="font-display italic font-black text-navy text-lg">
        {resource.title}
      </h3>
      <p className="mt-1 font-body text-sm text-navy/70">{resource.author}</p>
      <p className="mt-3 font-body text-sm font-light text-gray-400">
        {resource.blurb}
      </p>
    </div>
  );
}
