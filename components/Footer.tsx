import { FOOTER } from "@/content";
import LinkedInIcon from "./icons/LinkedInIcon";
import InstagramIcon from "./icons/InstagramIcon";

// Shared footer for the landing page and all inner pages.
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-body text-xs tracking-wide text-navy/60">
          © {currentYear} WMB Collective
        </p>

        <div className="flex items-center gap-4">
          <a
            href={FOOTER.linkedinHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WMB Collective on LinkedIn"
            className="text-navy transition-colors hover:text-red"
          >
            <LinkedInIcon />
          </a>
          <a
            href={FOOTER.instagramHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WMB Collective on Instagram"
            className="text-navy transition-colors hover:text-red"
          >
            <InstagramIcon />
          </a>
        </div>

        <a
          href={FOOTER.joinClubHref}
          target="_blank"
          rel="noopener noreferrer"
          className="font-body text-xs tracking-wide text-red hover:underline"
        >
          {FOOTER.joinClubText}
        </a>
      </div>
    </footer>
  );
}
