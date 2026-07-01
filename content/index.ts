// All static site copy lives here. Edit this file to update content
// across the site without touching component/page code.

export type NavLink = {
  label: string;
  href: string;
};

export const NAV_LINKS: NavLink[] = [
  { label: "The Vault", href: "/vault" },
  { label: "Open Session", href: "/open-session" },
  { label: "Release Radar", href: "/radar" },
  { label: "The Curriculum", href: "/curriculum" },
  { label: "About", href: "/about" },
];

export type LandingSection = {
  number: string;
  title: string;
  description: string;
  href: string;
};

export const LANDING_SECTIONS: LandingSection[] = [
  {
    number: "01",
    title: "The Vault",
    description: "Long-form interviews with industry professionals",
    href: "/vault",
  },
  {
    number: "02",
    title: "Open Session",
    description: "Live talks, panels, and educational discussions",
    href: "/open-session",
  },
  {
    number: "03",
    title: "Release Radar",
    description: "Upcoming album, EP, and single releases",
    href: "/radar",
  },
  {
    number: "04",
    title: "The Curriculum",
    description: "Books, podcasts, courses, and guides",
    href: "/curriculum",
  },
  {
    // No dedicated page spec'd yet — placeholder href until /jobs is built.
    number: "05",
    title: "Job Board",
    description: "Music and entertainment internships and roles",
    href: "#",
  },
  {
    number: "06",
    title: "About",
    description: "Who we are and what we're building",
    href: "/about",
  },
];

export const FOOTER = {
  linkedinHref:
    "https://www.linkedin.com/company/music-business-at-penn/posts/?feedView=all",
  instagramHref: "https://www.instagram.com/mbupenn/",
  joinClubText:
    "Penn student interested in music and entertainment? Join the club here →",
  joinClubHref: "https://pennclubs.com/club/wharton-music-business-club/",
};

export type PlaceholderVideo = {
  title: string;
  guest: string;
  description: string;
};

// Replace with YouTube Data API v3 results once YOUTUBE_VAULT_PLAYLIST_ID
// is set (see lib/youtube.ts).
export const VAULT_PAGE = {
  header: "The Vault",
  subtext: "Conversations from inside the industry",
  videos: [
    {
      title: "Episode 01 — Breaking Into A&R",
      guest: "Guest Name TBA",
      description: "A conversation on scouting talent in the streaming era.",
    },
    {
      title: "Episode 02 — Building an Independent Label",
      guest: "Guest Name TBA",
      description: "What it takes to run a label without major backing.",
    },
    {
      title: "Episode 03 — Touring in 2026",
      guest: "Guest Name TBA",
      description: "Tour economics, routing, and the modern live business.",
    },
    {
      title: "Episode 04 — Music Supervision 101",
      guest: "Guest Name TBA",
      description: "Getting songs placed in film, TV, and games.",
    },
    {
      title: "Episode 05 — The Business of Artist Management",
      guest: "Guest Name TBA",
      description: "Managing careers, not just calendars.",
    },
    {
      title: "Episode 06 — Publishing Deconstructed",
      guest: "Guest Name TBA",
      description: "Mechanicals, sync, and the money behind the song.",
    },
  ] as PlaceholderVideo[],
};

// Replace with YouTube Data API v3 results once
// YOUTUBE_OPENSESSION_PLAYLIST_ID is set (see lib/youtube.ts).
export const OPEN_SESSION_PAGE = {
  header: "Open Session",
  subtext: "Live talks. Real insights.",
  banner: "Next Session — Date TBD",
  talks: [
    {
      title: "Panel — Careers in Music Marketing",
      guest: "Panelists TBA",
      description: "A roundtable on breaking into label marketing teams.",
    },
    {
      title: "Talk — Sync Licensing Explained",
      guest: "Speaker TBA",
      description: "How songs end up in your favorite shows and ads.",
    },
    {
      title: "Panel — Life at a Major vs. Indie Label",
      guest: "Panelists TBA",
      description: "Comparing career paths across the label landscape.",
    },
    {
      title: "Talk — Artist Development in the Streaming Age",
      guest: "Speaker TBA",
      description: "How labels and managers build artists today.",
    },
  ] as PlaceholderVideo[],
};

export type PlaceholderRelease = {
  artist: string;
  title: string;
  format: "Album" | "EP" | "Single";
};

export const RADAR_PAGE = {
  header: "Release Radar",
  subtext: "What's dropping",
  releases: [
    { artist: "Artist: TBA", title: "Title: TBA", format: "Album" },
    { artist: "Artist: TBA", title: "Title: TBA", format: "EP" },
    { artist: "Artist: TBA", title: "Title: TBA", format: "Single" },
    { artist: "Artist: TBA", title: "Title: TBA", format: "Album" },
    { artist: "Artist: TBA", title: "Title: TBA", format: "EP" },
    { artist: "Artist: TBA", title: "Title: TBA", format: "Single" },
  ] as PlaceholderRelease[],
};

export type ResourceCard = {
  title: string;
  author: string;
  blurb: string;
};

export const CURRICULUM_PAGE = {
  header: "The Curriculum",
  subtext: "Everything you need to know",
  holyGrail: {
    badge: "THE HOLY GRAIL",
    coverImage: "/images/passman-book.jpg",
    title: "All You Need to Know About the Music Business",
    author: "Donald S. Passman",
    blurb:
      "If you read one book before entering this industry, make it this one. Dubbed the industry bible by the Los Angeles Times, Passman's guide has been the definitive resource for everyone in the music business across thirty years and over half a million copies sold. Start here.",
    buttonText: "Buy on Amazon →",
    buttonHref:
      "https://www.amazon.com/Need-Know-About-Music-Business/dp/1668011069",
  },
  resources: [
    {
      title: "Resource Title TBA",
      author: "Author TBA",
      blurb: "Description of this resource goes here.",
    },
    {
      title: "Resource Title TBA",
      author: "Author TBA",
      blurb: "Description of this resource goes here.",
    },
    {
      title: "Resource Title TBA",
      author: "Author TBA",
      blurb: "Description of this resource goes here.",
    },
    {
      title: "Resource Title TBA",
      author: "Author TBA",
      blurb: "Description of this resource goes here.",
    },
    {
      title: "Resource Title TBA",
      author: "Author TBA",
      blurb: "Description of this resource goes here.",
    },
  ] as ResourceCard[],
};

export const ABOUT_PAGE = {
  header: "About",
  whoWeAre: {
    title: "Who We Are",
    body: "WMB Collective is a production of Music Business at Wharton x Mac Bailey. We cover the business behind the culture — music, sports, media, entertainment. Not the headlines. The mechanics underneath them.",
  },
  whatWeCover: {
    title: "What We Cover",
    items: [
      {
        title: "Music",
        description: "The shift from labels to direct-to-fan infrastructure",
      },
      {
        title: "Sports",
        description: "Media rights, athlete branding, league business",
      },
      {
        title: "Entertainment",
        description: "The new economics of content, attention, and IP",
      },
      {
        title: "Media",
        description:
          "The platforms redefining how stories get told and monetized",
      },
    ],
  },
  forStudents: {
    title: "For Students and Professionals",
    body: "WMB Collective is built for the next generation — college students, young professionals, and anyone with a passion for music and entertainment who's serious about turning that passion into a career. Breaking into this industry is hard. The doors aren't always visible and the path is rarely straightforward. We exist to change that. Through interviews with industry insiders, educational talks, curated resources, and real job opportunities, WMB Collective gives you the tools, the knowledge, and the connections to find your way in — and thrive once you get there.",
  },
  whereItsGoing: {
    title: "Where It's Going",
    body: "The old gatekeepers are losing their grip. Creators are building direct relationships with audiences. WMB Collective exists to track that shift in real time — through conversations with the people building what's next.",
  },
};
