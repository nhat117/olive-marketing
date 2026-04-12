# Olive Marketing

Next.js site for **Olive Marketing** (beauty & wellness digital marketing): landing, **Insights** blog (`/blog`), **Supabase** content, and an **admin** dashboard. Deploy on **Vercel**.

## Local setup

```bash
cd olive-marketing
cp .env.example .env.local
```

Add your Supabase URL, anon key, and **`NEXT_PUBLIC_SITE_URL`** (canonical origin for SEO: `http://localhost:3000` locally, `https://your-domain.com` in production) to `.env.local`.

Install and run:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Supabase

1. Create a project at [supabase.com](https://supabase.com).
2. In **SQL Editor**, run migrations in order: [`001_init_blog.sql`](supabase/migrations/001_init_blog.sql), [`002_post_seo.sql`](supabase/migrations/002_post_seo.sql), [`003_leads.sql`](supabase/migrations/003_leads.sql) (contact form → `leads` table).
3. **Authentication → Providers**: enable **Email** (password). Create a user under **Users** (or sign up if you add a public signup flow later).
4. Promote that user to admin (replace the UUID with your user id from **Authentication → Users**):

   ```sql
   insert into public.profiles (id, role)
   values ('YOUR_USER_UUID', 'admin')
   on conflict (id) do update set role = 'admin';
   ```

5. **Authentication → URL configuration**: set **Site URL** to your production domain (and add `http://localhost:3000` for local dev). Add the same URLs under **Redirect URLs** if you use email confirmation links.

**Optional sample articles (covers + inline Unsplash images):** run [`supabase/seed_sample_posts.sql`](supabase/seed_sample_posts.sql) in the SQL Editor. It inserts three published posts if those slugs do not already exist (`on conflict do nothing`).

## Deploy to Vercel + Supabase (production)

### 1. Put the app on GitHub

This folder must be in a Git repository (init here or move `olive-marketing` to your own repo). Vercel’s recommended flow is **Import Git Repository**.

```bash
cd olive-marketing
git init
git add .
git commit -m "Initial commit"
# Create an empty repo on GitHub, then:
git remote add origin https://github.com/YOU/YOUR_REPO.git
git branch -M main
git push -u origin main
```

If the repo root is the parent folder (not `olive-marketing` alone), set **Root Directory** to `olive-marketing` in Vercel project settings.

### 2. Create a hosted Supabase project

1. [supabase.com](https://supabase.com) → **New project** (note region; keep URL + keys handy).
2. **SQL Editor** → run migrations **in order** (paste each file, run):
   - [`supabase/migrations/001_init_blog.sql`](supabase/migrations/001_init_blog.sql)
   - [`supabase/migrations/002_post_seo.sql`](supabase/migrations/002_post_seo.sql)
   - [`supabase/migrations/003_leads.sql`](supabase/migrations/003_leads.sql)
3. **Authentication → Providers**: enable **Email** (password). Create a user under **Users** (or sign up via your app later).
4. Promote that user to admin (SQL Editor — replace UUID):

   ```sql
   insert into public.profiles (id, role)
   values ('YOUR_USER_UUID', 'admin')
   on conflict (id) do update set role = 'admin';
   ```

5. **Authentication → URL configuration**
   - **Site URL**: your production site, e.g. `https://your-project.vercel.app` (update after first deploy, or use a custom domain).
   - **Redirect URLs**: add the same origin plus local dev, e.g.  
     `http://localhost:3000/**`  
     `https://your-project.vercel.app/**`  
     (and your custom domain if you add one).

### 3. Create the Vercel project

**Option A — Dashboard (recommended)**  
1. [vercel.com](https://vercel.com) → **Add New… → Project** → import the GitHub repo.  
2. **Root Directory**: `olive-marketing` if the repo is not only this app.  
3. Framework: **Next.js** (auto).  
4. **Environment Variables** (Production — and Preview if you want previews to hit Supabase):

   | Name | Value |
   |------|--------|
   | `NEXT_PUBLIC_SITE_URL` | `https://your-project.vercel.app` (no trailing slash; use your real domain when ready) |
   | `NEXT_PUBLIC_SUPABASE_URL` | Project **Settings → API → Project URL** |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | **anon public** key |

   Optional: `NEXT_PUBLIC_CAL_BOOKING_URL`, `NEXT_PUBLIC_HERO_VIDEO_URL`, `NEXT_PUBLIC_LINKEDIN_URL`, `NEXT_PUBLIC_FACEBOOK_URL`.

5. **Deploy**. After the first deployment, confirm **Site URL** and **Redirect URLs** in Supabase match the live URL, then redeploy if you changed env vars.

**Option B — Vercel CLI** (from `olive-marketing`)

```bash
npx vercel login
npx vercel link    # link to a new or existing project
npx vercel env pull .env.local   # optional: sync env to local
npx vercel deploy --prod
```

Set the same variables with `npx vercel env add` or in the dashboard.

### 4. Optional: Vercel ↔ Supabase integration

In Vercel, **Integrations → Supabase** can attach a project and sync `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY`. You still need **`NEXT_PUBLIC_SITE_URL`** set yourself for correct canonical URLs, sitemap, and OAuth redirects.

### 5. Smoke test

- Open `/`, `/blog`, `/grow`, `/admin/login` (sign in as admin).
- Submit the lead modal once and confirm a row in **Supabase → Table Editor → `leads`**.

## Routes

| Path | Purpose |
|------|---------|
| `/` | Marketing landing |
| `/blog` | Published insights / articles |
| `/blog/[slug]` | Article detail |
| `/grow` | Programmatic SEO hub (niche landing index) |
| `/grow/[slug]` | Niche landing pages (salon, spa, med-spa, local SEO, etc.) |
| `/admin/login` | Admin sign-in |
| `/admin` | Dashboard (protected) |
| `/admin/posts` | List / edit / delete |
| `/admin/posts/new` | New post (Markdown, publish toggle, SEO panel) |
| `/admin/leads` | Inbound leads from the site contact modal |
| `/sitemap.xml` | Dynamic sitemap (home, blog, published posts) |
| `/robots.txt` | Crawl rules + sitemap link |
| `/rss.xml` | RSS 2.0 feed of published posts |
| `/llms.txt` | Short machine-readable site hints for AI crawlers |

Admin access requires `profiles.role = 'admin'` for the signed-in user.

## Hero background video

- By default the hero plays a short **CC0 placeholder MP4** (muted, looping). Set **`NEXT_PUBLIC_HERO_VIDEO_URL`** to your own direct **MP4** URL (CDN, Supabase Storage, or a file under `public/` such as `/videos/hero.mp4`) for production. The hero is **full-viewport** with a left-side gradient so copy stays readable.
- To use **poster only** (no video), set **`NEXT_PUBLIC_HERO_VIDEO_URL`** to `poster`, `none`, `false`, or `0`.
- Optional **`NEXT_PUBLIC_HERO_POSTER_URL`** for the video `poster` and for users with **reduced motion** (video is hidden, poster shown).

## Lead capture

- Visitors use **Let’s talk** / **Book a strategy call** / **Request a call back** to open a modal; submissions are stored in Supabase **`leads`** (public insert, admin-only read).
- Optional: set **`NEXT_PUBLIC_CAL_BOOKING_URL`** in `.env.local` to your [Cal.com](https://cal.com) (or similar) link—after submit, the modal offers **Pick a time on the calendar**.

## SEO & discovery (WordPress-style)

- **Per-post fields** (admin → edit post): SEO title, meta description, social share image override, **Hide from search engines** (`noindex` + omitted from sitemap/RSS).
- **Metadata**: canonical URLs, Open Graph (`article` on posts), Twitter cards, `robots` / `noindex` when configured.
- **Structured data**: `Organization` JSON-LD on the home page; `Article` JSON-LD on posts (skipped when `noindex` is on).
- Set **`NEXT_PUBLIC_SITE_URL`** in production so links in the sitemap, RSS, and JSON-LD are absolute and correct.

## Build

```bash
NEXT_PUBLIC_SITE_URL=… NEXT_PUBLIC_SUPABASE_URL=… NEXT_PUBLIC_SUPABASE_ANON_KEY=… npm run build
```

Environment variables must be defined at build time because server code references them.
