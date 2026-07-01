// Placeholder video card used on The Vault and Open Session pages.
// Swap for real YouTube thumbnails once lib/youtube.ts is activated.
export default function VideoCard({
  title,
  guest,
  description,
}: {
  title: string;
  guest: string;
  description: string;
}) {
  return (
    <div className="flex flex-col">
      <div className="aspect-video w-full bg-[#f0f0f0]" />
      <h3 className="mt-4 font-display italic font-black text-navy text-base">
        {title}
      </h3>
      <p className="mt-1 font-body text-sm text-navy/70">{guest}</p>
      <p className="mt-1 font-body text-sm font-light text-gray-400">
        {description}
      </p>
    </div>
  );
}
