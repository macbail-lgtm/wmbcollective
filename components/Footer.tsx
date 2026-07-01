import { FOOTER } from "@/content";

// Shared footer for the landing page and all inner pages.
export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-body text-xs tracking-wide text-navy/60">
          {FOOTER.copyright}
        </p>

        <div className="flex items-center gap-4">
          <a
            href={FOOTER.linkedinHref}
            aria-label="WMB Collective on LinkedIn"
            className="text-navy transition-colors hover:text-red"
          >
            <LinkedInIcon />
          </a>
          <a
            href={FOOTER.instagramHref}
            aria-label={`WMB Collective on Instagram, ${FOOTER.instagramHandle}`}
            className="flex items-center gap-1.5 text-navy transition-colors hover:text-red"
          >
            <InstagramIcon />
            <span className="font-body text-xs tracking-wide">
              {FOOTER.instagramHandle}
            </span>
          </a>
        </div>

        <a
          href={FOOTER.joinClubHref}
          className="font-body text-xs tracking-wide text-red hover:underline"
        >
          {FOOTER.joinClubText}
        </a>
      </div>
    </footer>
  );
}

function LinkedInIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.47zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
