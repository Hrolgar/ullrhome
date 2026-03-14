# Ullrhome

Personal portfolio site built with Next.js, Sanity CMS, and Tailwind CSS.

All content — including the color scheme — is managed through Sanity Studio. No code changes needed to update your site.

## Tech Stack

- **Next.js 16** — App Router, TypeScript, React 19
- **Sanity v5** — Headless CMS with embedded Studio at `/studio`
- **Tailwind CSS v4** — Utility-first styling with CMS-driven theming
- **ISR** — Incremental Static Regeneration with on-demand revalidation

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18 or later
- A free [Sanity](https://www.sanity.io/) account

### 1. Clone the repo

```bash
git clone https://github.com/Hrolgar/ullrhome.git
cd ullrhome
npm install
```

### 2. Create a Sanity project

1. Go to [sanity.io/manage](https://www.sanity.io/manage) and create a new project
2. Name it whatever you like (e.g., "ullrhome")
3. Choose the **Production** dataset
4. Note your **Project ID** from the project settings

### 3. Configure environment variables

```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your values:

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Your Sanity project ID (from step 2) |
| `NEXT_PUBLIC_SANITY_DATASET` | Dataset name (default: `production`) |
| `SANITY_API_TOKEN` | API token with Viewer permissions (create at Sanity → API → Tokens) |
| `SANITY_REVALIDATE_SECRET` | Random secret for webhook revalidation (generate with `openssl rand -hex 32`) |

### 4. Add CORS origin in Sanity

1. Go to [sanity.io/manage](https://www.sanity.io/manage) → your project → API → CORS origins
2. Add `http://localhost:3000` (allow credentials)

### 5. Run the development server

```bash
npm run dev
```

- **Site**: [http://localhost:3000](http://localhost:3000)
- **Sanity Studio**: [http://localhost:3000/studio](http://localhost:3000/studio)

### 6. Add your content

Open the Studio at `/studio`, log in with your Sanity account, and start adding content:

1. **Site Settings** — Set your site name, description, and color scheme
2. **About** — Add your heading, tagline, bio, and profile image
3. **Skills** — Add your technologies with categories
4. **Experience** — Add your work history
5. **Projects** — Add your portfolio projects
6. **Contact Info** — Add your email, GitHub, LinkedIn, etc.

## Project Structure

```
ullrhome/
├── app/
│   ├── layout.tsx              # Root layout (fetches theme from CMS)
│   ├── page.tsx                # Homepage (all sections)
│   ├── globals.css             # Tailwind + CSS variable defaults
│   ├── studio/[[...tool]]/     # Embedded Sanity Studio
│   └── api/revalidate/         # ISR webhook endpoint
├── components/
│   ├── Navbar.tsx              # Navigation bar
│   ├── Hero.tsx                # Hero section with profile image
│   ├── About.tsx               # About me (rich text)
│   ├── Skills.tsx              # Skills grouped by category
│   ├── Experience.tsx          # Work history timeline
│   ├── Projects.tsx            # Portfolio grid
│   ├── Contact.tsx             # Contact links
│   └── Footer.tsx              # Site footer
├── sanity/
│   ├── schemas/                # Content type definitions
│   │   ├── siteSettings.ts     # Theme colors, site metadata
│   │   ├── about.ts            # About section
│   │   ├── skill.ts            # Individual skill/tech
│   │   ├── experience.ts       # Work experience entry
│   │   ├── project.ts          # Portfolio project
│   │   └── contactInfo.ts      # Contact details
│   └── lib/
│       ├── client.ts           # Sanity client
│       ├── image.ts            # Image URL builder
│       └── queries.ts          # GROQ queries
├── lib/
│   └── theme.ts                # Maps CMS colors to CSS variables
├── sanity.config.ts            # Sanity Studio configuration
└── .env.local.example          # Environment variable template
```

## CMS-Driven Theming

The color scheme is fully managed through Sanity Studio:

1. Open Studio → **Site Settings**
2. Edit any color field (primary, secondary, accent, background, surface, text colors)
3. Publish — the site rebuilds automatically with the new colors

**How it works:**
- Sanity stores hex color values in the `siteSettings` document
- `app/layout.tsx` fetches these values and injects them as CSS custom properties
- Tailwind is configured to use these CSS variables
- Components use standard Tailwind classes (`bg-primary`, `text-foreground`, etc.)

Default colors (used before CMS is connected):
- Primary: `#2563eb` (blue)
- Secondary: `#7c3aed` (purple)
- Accent: `#06b6d4` (cyan)
- Background: `#0f172a` (dark navy)
- Surface: `#1e293b` (dark slate)
- Text: `#f8fafc` (white)

## On-Demand Revalidation

When you publish changes in Sanity Studio, the site can automatically rebuild:

1. Go to [sanity.io/manage](https://www.sanity.io/manage) → your project → API → Webhooks
2. Create a new webhook:
   - **URL**: `https://your-domain.com/api/revalidate?secret=YOUR_REVALIDATE_SECRET`
   - **Trigger on**: Create, Update, Delete
   - **Filter**: Leave empty (triggers on all document changes)
3. Replace `YOUR_REVALIDATE_SECRET` with the value from your `.env.local`

Without the webhook, the site revalidates every hour automatically (ISR fallback).

## Deployment

### Vercel (recommended)

```bash
npm i -g vercel
vercel
```

Set the same environment variables in your Vercel project settings.

### Docker / Self-hosted

```bash
npm run build
npm start
```

The site runs on port 3000 by default. Set `PORT` environment variable to change it.

## Development

### Adding a new section

1. Create a schema in `sanity/schemas/`
2. Register it in `sanity/schemas/index.ts`
3. Add a GROQ query in `sanity/lib/queries.ts`
4. Create a component in `components/`
5. Add the component to `app/page.tsx`

### Modifying schemas

After changing Sanity schemas, restart the dev server. The Studio at `/studio` will reflect the new fields immediately.

## License

MIT
