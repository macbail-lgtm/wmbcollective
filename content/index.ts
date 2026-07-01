// All static site copy lives here. Edit this file to update content
// across the site without touching component/page code.

import type { RadarRelease } from "@/lib/radar";

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

export const RADAR_PAGE = {
  header: "Release Radar",
  subtext: "What's dropping",
};

// Shown when the live Metacritic fetch (see app/api/radar/route.ts) comes
// back empty or errors, so the page is never blank.
export const RADAR_FALLBACK_RELEASES: RadarRelease[] = [
  { artist: "Coming Soon", title: "TBA", date: "2026", format: "Album" as const },
  { artist: "Coming Soon", title: "TBA", date: "2026", format: "EP" as const },
  { artist: "Coming Soon", title: "TBA", date: "2026", format: "Single" as const },
].map((release) => ({
  ...release,
  coverImage: "",
  genre: "",
  metacriticUrl: "",
}));

export type ResourceCard = {
  // Empty string means no accessible cover image was found — the card
  // renders a gray placeholder instead. See the TODO next to each entry
  // below for where to source a real one.
  coverImage: string;
  title: string;
  author: string;
  blurb: string;
  buttonText: string;
  buttonHref: string;
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
      // TODO: Amazon blocks scraping and Open Library has no cover on file
      // for the English edition — replace with a real cover once available.
      coverImage: "",
      title: "The Spotify Play",
      author: "Sven Carlsson & Jonas Leijonhufvud",
      blurb:
        "The inside story of how Daniel Ek built Spotify into the world's dominant music streaming platform — beating Apple, Google, and Amazon in the process. Essential reading for anyone who wants to understand how the streaming era reshaped the music industry, what it took to get the major labels to sign on, and how one company rewrote the rules of how music is distributed and monetized. If streaming is the business model, this is how it was won.",
      buttonText: "Buy on Amazon →",
      buttonHref: "https://www.amazon.com/dp/163576744X",
    },
    {
      coverImage: "/images/powerhouse.jpg",
      title: "Powerhouse",
      author: "James Andrew Miller",
      blurb:
        "The definitive oral history of Creative Artists Agency — the talent agency that rewrote the rules of Hollywood and the entertainment business. Built by five agents who left William Morris in 1975, CAA went on to represent the biggest names in film, television, music, and sports while reshaping how deals get made across the entire industry. If you want to understand how power, relationships, and leverage actually work in entertainment, this is the book. Required reading for anyone headed into talent representation, management, or the business side of media.",
      buttonText: "Buy on Amazon →",
      buttonHref:
        "https://www.amazon.com/Powerhouse-Untold-Hollywoods-Creative-Artists/dp/0062441388",
    },
    {
      coverImage: "/images/hit-men.jpg",
      title: "Hit Men",
      author: "Fredric Dannen",
      blurb:
        "A raw, investigative deep-dive into the power brokers who ran the American music industry during its wildest decades — the payola, the backroom deals, the egos, and the organized crime connections. Dannen traces the rise of the major labels from Tin Pan Alley to the CD era, exposing how hits were made and who really controlled the charts. Ranked second on Billboard's list of the 100 Greatest Music Books of All Time. If you want to understand where the industry's power structures came from, start here.",
      buttonText: "Buy on Amazon →",
      buttonHref: "https://www.amazon.com/Hit-Men-Brokers-Inside-Business/dp/0679730613",
    },
    {
      coverImage: "/images/how-music-works.jpg",
      title: "How Music Works",
      author: "David Byrne",
      blurb:
        "Talking Heads founder David Byrne breaks down music from every angle — its history, its business, its technology, and its culture. From how recording technology changed the way we create and consume music, to how venues shape the sounds that get made in them, to the economics of the modern music industry, Byrne covers it all with the perspective of someone who has lived it. Part autobiography, part music theory, part industry manual — and one of the most illuminating books ever written about what music actually is and how it functions in the world.",
      buttonText: "Buy on Amazon →",
      buttonHref: "https://www.amazon.com/How-Music-Works-David-Byrne/dp/0804188939",
    },
    {
      coverImage: "/images/master-switch.jpg",
      title: "The Master Switch",
      author: "Tim Wu",
      blurb:
        "Columbia Law professor Tim Wu traces the history of every major information industry — telephone, radio, film, television, and the internet — and reveals a consistent pattern: every open, chaotic medium eventually gets captured by a monopoly. The question he asks is whether the internet will follow the same fate. For anyone in music or entertainment who wants to understand the structural forces shaping streaming, platform power, and the future of media distribution, this book is the framework. Wu coined the term 'net neutrality' — and this is where he explains why it matters.",
      buttonText: "Buy on Amazon →",
      buttonHref:
        "https://www.amazon.com/Master-Switch-Rise-Information-Empires/dp/0307390993",
    },
  ] as ResourceCard[],
};

export const ABOUT_PAGE = {
  header: "About",
  subtext: "A media platform by the Wharton Music Business Club",
  whoWeAre: {
    title: "Who We Are",
    body: "WMB Collective is the official media platform of the Wharton Music Business Club at the University of Pennsylvania. We exist to give students, young professionals, and anyone passionate about music and entertainment the access, knowledge, and resources they need to break into the industry — and build a career they actually want.\n\nThe music and entertainment industry is one of the hardest to crack. It runs on relationships, insider knowledge, and access that most people never get. WMB Collective is here to change that.",
  },
  whatWeDo: {
    title: "What We Do",
    items: [
      {
        title: "The Vault",
        description:
          "Long-form interviews with the executives, agents, managers, and founders building the industry.",
      },
      {
        title: "Open Session",
        description:
          "Live educational talks and panel discussions, streamed and archived for anyone to watch.",
      },
      {
        title: "Release Radar",
        description: "Stay current on what's dropping across music and entertainment.",
      },
      {
        title: "The Curriculum",
        description:
          "Vetted books, podcasts, courses, and guides to accelerate your path into the industry.",
      },
    ],
  },
  whoItsFor: {
    title: "Who It's For",
    body: "WMB Collective is built for the next generation — college students, young professionals, and anyone serious about turning their passion for music and entertainment into a career. Whether you're a freshman figuring out where to start or a recent grad ready to make your move, this platform was built for you.\n\nNo gatekeeping. No fluff. Just real access to the people, knowledge, and opportunities that matter.",
  },
  whereItsGoing: {
    title: "Where It's Going",
    body: "The old gatekeepers are losing their grip. Creators are building direct relationships with their audiences. New platforms, new IP, and new business models are reshaping music, sports, and entertainment from the ground up. WMB Collective exists to track that shift in real time — through conversations with the people building what's next.",
  },
  calloutText:
    "Penn student interested in music and entertainment? Join the Wharton Music Business Club here →",
  calloutHref: "https://pennclubs.com/club/wharton-music-business-club/",
};
