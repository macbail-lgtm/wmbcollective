// Small formatting helpers shared by the Release Radar cards.

export function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join("");
}

export function formatReleaseDate(raw: string) {
  if (!raw) return "";
  // Bare years (e.g. a "2026" placeholder) aren't a real calendar date —
  // parsing them as UTC midnight and reformatting in the browser's local
  // timezone can roll them back a day, so show as-is.
  if (/^\d{4}$/.test(raw.trim())) return raw;
  const parsed = new Date(raw);
  if (Number.isNaN(parsed.getTime())) return raw;
  return parsed.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}
