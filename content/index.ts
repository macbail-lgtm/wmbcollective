// All static site copy lives here. Edit this file to update content
// across the site without touching component/page code.

export type NavLink = {
  label: string;
  href: string;
};

export const NAV_LINKS: NavLink[] = [
  { label: "Vault", href: "/vault" },
  { label: "Session", href: "/open-session" },
  { label: "Radar", href: "/radar" },
  { label: "Curriculum", href: "/curriculum" },
  { label: "Jobs", href: "/jobs" },
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
    number: "05",
    title: "Job Board",
    description: "Music and entertainment internships and roles",
    href: "/jobs",
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
  subtext: "New music and what's coming.",
};

export const JOBS_PAGE = {
  header: "Job Board",
  subtext: "Music and entertainment opportunities — internships and full-time roles",
  emptyMessage: "No listings right now. Check back soon.",
  emptyCalloutText: "Know a role we should add? DM us on Instagram →",
  footerCalloutText: "Know of a role we should add? Send it to us → @mbupenn",
  instagramHref: "https://www.instagram.com/mbupenn/",
};

export type UpcomingRelease = {
  artist: string;
  title: string;
  date: string;
  format: "Album" | "EP" | "Single";
  coverUrl: string;
  spotifyLink: string;
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// RELEASE RADAR — UPCOMING RELEASES
// Edit this array to update the Dropping Soon section.
// Fields: artist, title, date, format, coverUrl, spotifyLink
// coverUrl: paste any image URL (album art, artist photo)
// spotifyLink: paste the Spotify pre-save or album link
// format: "Album" | "EP" | "Single"
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const UPCOMING_RELEASES: UpcomingRelease[] = [
  {
    artist: "Coming Soon",
    title: "TBA",
    date: "2026",
    format: "Album",
    coverUrl: "",
    spotifyLink: "",
  },
  {
    artist: "Coming Soon",
    title: "TBA",
    date: "2026",
    format: "EP",
    coverUrl: "",
    spotifyLink: "",
  },
  {
    artist: "Coming Soon",
    title: "TBA",
    date: "2026",
    format: "Single",
    coverUrl: "",
    spotifyLink: "",
  },
];

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
  subtext: "The media arm of the Wharton Music Business Club",
  whoWeAre: {
    title: "Who We Are",
    body: "WMB Collective is the media platform of the Wharton Music Business Club at the University of Pennsylvania. We produce interviews, educational content, and curated resources focused on the music industry and the broader entertainment business.\n\nThis is a student-run operation — built by people who are passionate about music and serious about the business behind it.",
  },
  whatWeBuiltItFor: {
    title: "What We Built It For",
    body: "Breaking into the music industry is hard. It runs on relationships and insider knowledge that most people never get access to. WMB Collective exists to close that gap.\n\nWhether you're a student trying to figure out where to start, a young professional looking to make a move, or just someone who loves music and wants to understand the business behind it — this platform was built for you. We compile the interviews, resources, job opportunities, and industry knowledge so you don't have to find it all yourself.",
  },
  whatWeCover: {
    title: "What We Cover",
    items: [
      {
        title: "The Business of Music",
        description:
          "Labels, publishing, streaming, deals, and how the money actually moves.",
      },
      {
        title: "Talent & Representation",
        description:
          "How artists, agents, managers and attorneys operate and build careers.",
      },
      {
        title: "Media & Entertainment",
        description:
          "The platforms, content models, and distribution systems reshaping the industry.",
      },
      {
        title: "Culture & Careers",
        description:
          "What's changing, who's building what's next, and how to position yourself in it.",
      },
    ],
  },
  theClub: {
    title: "The Club",
    body: "WMB Collective is produced by the Wharton Music Business Club — one of Penn's most active student organizations focused on the intersection of music, business, and culture. The club hosts industry speakers, facilitates networking, and gives students direct access to the people and companies shaping the music business.\n\nWMB Collective is our media platform — built to extend that access beyond our membership and share it with anyone who wants in.",
  },
  calloutText:
    "Penn student interested in music and entertainment? Join the Wharton Music Business Club here →",
  calloutHref: "https://pennclubs.com/club/wharton-music-business-club/",
};
