# WMB Collective

WMB Collective is a production of Music Business at Wharton x Mac Bailey. The
site covers the business behind the culture — music, sports, media, and
entertainment — through long-form interviews, live talks, release tracking,
curated learning resources, and job listings for students and young
professionals breaking into the industry.

- **Live site:** https://wmbcollective.com
- **Vercel:** https://wmbcollective.vercel.app
- **Repo:** https://github.com/macbail-lgtm/wmbcollective

## Tech stack

- [Next.js 14](https://nextjs.org) (App Router)
- TypeScript
- Tailwind CSS
- YouTube Data API v3 (for video embeds, once activated — see below)
- Deployed on Vercel, auto-deploying from `main`

## Running locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

```
/app          — pages, using the App Router (route group `(site)` wraps
                 all inner pages with the shared nav + footer; the landing
                 page at app/page.tsx is intentionally outside that group)
/components   — one component per file
/content      — content/index.ts: every piece of static copy on the site
/lib          — lib/youtube.ts: YouTube Data API v3 helper (inactive
                 until env vars are set); lib/notionJobs.ts and
                 lib/greenhouseJobs.ts: Job Board data sources (see below)
```

## Updating content

Almost everything on the site — section descriptions, placeholder cards,
footer links, the About page copy, the Curriculum page's Holy Grail book,
etc. — lives in [`content/index.ts`](content/index.ts) as exported
constants. Edit that file and the change will show up everywhere it's used;
you shouldn't need to touch page or component files for a copy update.

To point a placeholder link (LinkedIn, Instagram, "Join the club") at a real
URL, update the `FOOTER` object in that same file.

## Activating the YouTube API

The Vault and Open Session pages currently render hardcoded placeholder
cards. To pull real videos from YouTube playlists instead:

1. Get a YouTube Data API v3 key from the
   [Google Cloud Console](https://console.cloud.google.com/apis/library/youtube.googleapis.com).
2. Find the playlist IDs for your Vault and Open Session content on YouTube.
3. Add the values to `.env.local` (for local dev) and to your Vercel
   project's Environment Variables (for production):

   ```
   YOUTUBE_API_KEY=your_api_key
   YOUTUBE_VAULT_PLAYLIST_ID=your_vault_playlist_id
   YOUTUBE_OPENSESSION_PLAYLIST_ID=your_open_session_playlist_id
   ```

4. In `app/(site)/vault/page.tsx` and `app/(site)/open-session/page.tsx`,
   call `getPlaylistVideos()` from [`lib/youtube.ts`](lib/youtube.ts) with
   the corresponding env var and render its results instead of the
   placeholder arrays from `content/index.ts`. `getPlaylistVideos` already
   handles the fetch, and returns an empty array if the key/playlist ID
   isn't set, so you can wire it up without breaking the page.

## Job Board

The Job Board at `/jobs` combines two sources: jobs added manually in Notion,
and jobs pulled automatically from public Greenhouse job boards at music and
entertainment companies. See `app/api/jobs`, `app/api/greenhouse`, and
`app/api/all-jobs` for the fetch/merge logic.

### Adding a job manually (Notion)

1. Go to notion.so and open the WMB Collective Job Board database.
2. Click **New** to add a row.
3. Fill in: Role, Company, Location, Type, Link.
4. Check the **Active** checkbox to make it live.
5. It appears on the site within 1 hour automatically.

Requires `NOTION_API_KEY` and `NOTION_JOBS_DATABASE_ID` to be set in
`.env.local` (and in Vercel's Environment Variables for production).

### Greenhouse jobs

Jobs from Spotify, Live Nation, Warner, Universal, and other companies on the
list in `lib/greenhouseJobs.ts` are pulled automatically every 3 hours — no
manual action needed, and no API key required. Not every company on that
list actually has a public Greenhouse board under the token listed; boards
that 404 or error are skipped silently, so it's safe to add more companies
to the list without breaking the page if a token turns out to be wrong. To
add a company, add its Greenhouse board token to the `COMPANIES` array.

## Deploying to Vercel

The project auto-deploys to Vercel on every push to `main`:

```bash
git add .
git commit -m "your message"
git push origin main
```

Vercel picks up the push, builds, and deploys automatically — no manual
steps needed. Preview deployments are created automatically for any other
branch or pull request.

If you ever need to (re)connect the repo to Vercel from scratch:

1. Go to [vercel.com/new](https://vercel.com/new) and import
   `macbail-lgtm/wmbcollective` from GitHub.
2. Framework preset: Next.js (auto-detected). Leave build settings as
   default.
3. Add the YouTube env vars (see above) under **Settings → Environment
   Variables** if/when you activate the API.
4. Deploy. The project will be live at `wmbcollective.vercel.app`.

## Connecting wmbcollective.com

1. In the Vercel dashboard, open the project → **Settings → Domains**.
2. Add `wmbcollective.com` (and `www.wmbcollective.com` if you want the
   `www` subdomain too).
3. Vercel will show you DNS records to add at your domain registrar:
   - Usually an `A` record for the apex domain (`wmbcollective.com`)
     pointing at Vercel's IP, and/or
   - A `CNAME` record for `www` pointing at `cname.vercel-dns.com`.
4. Add those records in your registrar's DNS settings. Propagation can take
   anywhere from a few minutes to a few hours.
5. Vercel automatically issues and renews an SSL certificate once DNS
   verifies.

## Adding a contributor

**GitHub:**

1. Go to the repo → **Settings → Collaborators**.
2. Click **Add people** and invite them by GitHub username or email.
3. They'll get an invite to accept before they can push.

**Vercel:**

1. Go to the Vercel team/project → **Settings → Members** (or **Team →
   Invite Member** if using a team account).
2. Invite by email and assign a role (Member is enough to view deployments
   and env vars; Admin can change project settings).
3. Anyone with GitHub push access to `main` will trigger deployments
   automatically once they're pushing to the connected repo — Vercel
   membership is only needed if they also need dashboard access.
