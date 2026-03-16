import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  token: process.env.SANITY_API_TOKEN,
  apiVersion: "2024-01-01",
  useCdn: false,
});

function block(text: string) {
  return {
    _type: "block",
    style: "normal",
    _key: crypto.randomUUID().slice(0, 8),
    children: [
      {
        _type: "span",
        _key: crypto.randomUUID().slice(0, 8),
        text,
        marks: [],
      },
    ],
    markDefs: [],
  };
}

async function seed() {
  console.log("Seeding Sanity CMS...\n");

  // --- Clean up old data ---
  console.log("Cleaning up old data...");

  // Delete all certifications
  const certifications = await client.fetch(`*[_type == "certification"]._id`);
  for (const id of certifications) {
    await client.delete(id);
  }

  // Delete old homelab services that no longer exist
  const oldHomelabIds = [
    "homelab-nginx-proxy-manager",
    "homelab-grafana",
    "homelab-portainer",
  ];
  for (const id of oldHomelabIds) {
    try { await client.delete(id); } catch { /* may not exist */ }
  }

  // Delete old skill that no longer exists
  try { await client.delete("skill-raspberry-pi"); } catch { /* may not exist */ }

  // --- Site Settings ---
  console.log("Creating site settings...");
  await client.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    siteName: "Ullrhome",
    siteDescription: "Personal portfolio and blog of Hrolgar",
  });

  // --- About ---
  console.log("Creating about...");
  await client.createOrReplace({
    _id: "about",
    _type: "about",
    heading: "Hrolgar",
    tagline: "Software developer and self-hosting enthusiast from Norway",
    roles: [
      ".NET Developer",
      "Infrastructure Tinkerer",
      "Self-Hosting Enthusiast",
    ],
    body: [
      block(
        "I build financial software at SpareBank 1 in Norway. Day job is .NET — C#, ASP.NET Core, SQL Server — the kind of stack where you test everything twice because the code handles real money. It's taught me to value systems that actually work over systems that look impressive in a slide deck."
      ),
      block(
        "After hours I run a homelab that's probably more infrastructure than one person needs. Proxmox cluster, a dozen Docker stacks, GitLab, Authentik for SSO, Cloudflare tunnels — the whole thing managed with OpenTofu. My current obsession is Hrolbot: an AI agent system running on a VM in the lab, where autonomous Claude Code agents coordinate through a message mesh to write and review code. It works better than it has any right to."
      ),
    ],
  });

  // --- Contact Info ---
  console.log("Creating contact info...");
  await client.createOrReplace({
    _id: "contactInfo",
    _type: "contactInfo",
    github: "https://github.com/Hrolgar",
    location: "Ålesund, Norway",
    availableForWork: false,
  });

  // --- Skills ---
  console.log("Creating skills...");
  const skills = [
    // Languages
    { name: "C#", category: "language", order: 1 },
    { name: "Python", category: "language", order: 2 },
    { name: "TypeScript", category: "language", order: 3 },
    { name: "JavaScript", category: "language", order: 4 },
    { name: "SQL", category: "language", order: 5 },
    { name: "Bash", category: "language", order: 6 },
    { name: "Go", category: "language", order: 7 },
    { name: "HCL", category: "language", order: 8 },
    // Frameworks
    { name: ".NET", category: "framework", order: 9 },
    { name: "ASP.NET Core", category: "framework", order: 10 },
    { name: "Entity Framework", category: "framework", order: 11 },
    { name: "React", category: "framework", order: 12 },
    { name: "Next.js", category: "framework", order: 13 },
    { name: "Blazor", category: "framework", order: 14 },
    // DevOps
    { name: "Docker", category: "devops", order: 15 },
    { name: "Proxmox", category: "devops", order: 16 },
    { name: "OpenTofu", category: "devops", order: 17 },
    { name: "GitHub Actions", category: "devops", order: 18 },
    { name: "GitLab CI", category: "devops", order: 19 },
    { name: "Cloudflare", category: "devops", order: 20 },
    // Tools
    { name: "Git", category: "tool", order: 21 },
    { name: "Linux", category: "tool", order: 22 },
    { name: "Traefik", category: "tool", order: 23 },
    { name: "Authentik", category: "tool", order: 24 },
    { name: "Infisical", category: "tool", order: 25 },
    { name: "VS Code", category: "tool", order: 26 },
    // Databases
    { name: "SQL Server", category: "database", order: 27 },
    { name: "PostgreSQL", category: "database", order: 28 },
    { name: "SQLite", category: "database", order: 29 },
    { name: "Redis", category: "database", order: 30 },
    // Platforms
    { name: "Azure", category: "platform", order: 31 },
    { name: "Vercel", category: "platform", order: 32 },
  ];

  const skillIds: Record<string, string> = {};
  for (const skill of skills) {
    const id = `skill-${skill.name.toLowerCase().replace(/[^a-z0-9]/g, "-")}`;
    skillIds[skill.name] = id;
    await client.createOrReplace({
      _id: id,
      _type: "skill",
      ...skill,
    });
  }

  // --- Experience ---
  console.log("Creating experience...");
  await client.createOrReplace({
    _id: "exp-sparebank1",
    _type: "experience",
    company: "SpareBank 1",
    role: "Software Developer",
    location: "Ålesund, Norway",
    startDate: "2023-01-01",
    description: [
      block(
        "Full-stack development on financial applications in the Norwegian banking sector. Primarily .NET — building APIs, integrating payment systems, and maintaining the kind of software where bugs have consequences."
      ),
    ],
    order: 1,
  });

  // --- Categories ---
  console.log("Creating categories...");
  const categories = [
    { title: "Homelab", slug: "homelab", description: "Home server setups, hardware, and infrastructure projects." },
    { title: "Self-Hosting", slug: "self-hosting", description: "Running your own services instead of relying on the cloud." },
    { title: "Development", slug: "development", description: "Software development, coding, and programming topics." },
    { title: "DevOps", slug: "devops", description: "CI/CD, infrastructure as code, and deployment automation." },
  ];

  const categoryIds: Record<string, string> = {};
  for (const cat of categories) {
    const id = `category-${cat.slug}`;
    categoryIds[cat.slug] = id;
    await client.createOrReplace({
      _id: id,
      _type: "category",
      title: cat.title,
      slug: { _type: "slug", current: cat.slug },
      description: cat.description,
    });
  }

  // --- Homelab Services ---
  console.log("Creating homelab services...");
  const homelabServices = [
    // Virtualization
    { name: "Proxmox VE", description: "Bare-metal hypervisor running all VMs and containers", category: "virtualization", order: 1 },
    { name: "Docker", description: "Container runtime on all application VMs", category: "virtualization", order: 2 },
    // Networking
    { name: "Cloudflare Tunnels", description: "Zero Trust access to internal services — no exposed ports", category: "networking", order: 3 },
    { name: "Traefik", description: "Reverse proxy with Authentik forward auth on every VM", category: "networking", order: 4 },
    // Identity
    { name: "Authentik", description: "Self-hosted SSO and identity provider for all services", category: "identity", order: 5 },
    // Security
    { name: "Infisical", description: "Self-hosted secrets management for credentials and API keys", category: "security", order: 6 },
    // Media
    { name: "Jellyfin", description: "Media server for movies, TV, and music", category: "media", order: 7 },
    { name: "Sonarr & Radarr", description: "Automated media management and downloads", category: "media", order: 8 },
    { name: "Audiobookshelf", description: "Audiobook and podcast server", category: "media", order: 9 },
    { name: "Tdarr", description: "Automated media transcoding", category: "media", order: 10 },
    // Storage
    { name: "Immich", description: "Self-hosted photo and video backup (Google Photos alternative)", category: "storage", order: 11 },
    { name: "ZFS", description: "Storage pools with 40TB NAS and SSD caching", category: "storage", order: 12 },
    // Development
    { name: "GitLab", description: "Self-hosted Git with CI/CD pipelines", category: "development", order: 13 },
    { name: "Hrolbot", description: "Multi-agent AI system for autonomous development", category: "development", order: 14 },
    // Automation
    { name: "OpenTofu", description: "Infrastructure as Code for the entire homelab", category: "automation", order: 15 },
  ];

  for (const svc of homelabServices) {
    const id = `homelab-${svc.name.toLowerCase().replace(/[^a-z0-9]/g, "-")}`;
    await client.createOrReplace({
      _id: id,
      _type: "homelabService",
      selfHosted: true,
      ...svc,
    });
  }

  // --- Blog Posts ---
  console.log("Creating blog posts...");
  await client.createOrReplace({
    _id: "post-ai-agent-mesh-rpi",
    _type: "post",
    title: "Building an AI Agent Mesh in My Homelab",
    slug: { _type: "slug", current: "building-ai-agent-mesh-homelab" },
    excerpt:
      "How I built Hrolbot — a multi-agent AI system running on a Proxmox VM, where Claude Code agents coordinate through an MCP mesh to write and review real code.",
    publishedAt: "2026-03-10T10:00:00Z",
    featured: true,
    categories: [
      { _type: "reference", _ref: categoryIds["homelab"], _key: "c1" },
      { _type: "reference", _ref: categoryIds["development"], _key: "c2" },
    ],
    tags: ["proxmox", "ai", "claude", "mcp", "hrolbot"],
    body: [
      block(
        "A few months ago I had one of those ideas that sounds reasonable at 2 AM: what if I ran a fleet of AI agents on a Proxmox VM in my homelab? Not as a proof of concept, but as something I actually use daily. That idea became Hrolbot."
      ),
      block(
        "Hrolbot is a multi-agent system where each agent — a frontend developer, a backend developer, a reviewer — runs as an autonomous Claude Code instance. They coordinate through an MCP (Model Context Protocol) mesh, passing messages, sharing state, and handing off tasks to each other. An orchestrator agent receives instructions from Discord and delegates work to the right specialist."
      ),
      block(
        "The Proxmox VM handles the coordination layer: the MCP server, the message bus, the state store. The actual AI inference happens in the cloud via the Anthropic API, so the VM doesn't need to do any heavy lifting on that front. It just needs to keep the mesh running and the agents talking."
      ),
      block(
        "One of the more interesting challenges was getting the agents to work together without stepping on each other. Each agent operates in its own workspace, commits to its own branch, and communicates through structured messages. The orchestrator handles merge coordination and conflict resolution. It's not perfect, but it works surprisingly well for a system running on a 4-core VM with 8GB of RAM."
      ),
      block(
        "The whole thing is open source. If you're curious about running your own agent mesh — or you just want to see what happens when you give a VM more responsibility than it probably deserves — check out the repo on GitHub."
      ),
    ],
  });

  await client.createOrReplace({
    _id: "post-why-self-host",
    _type: "post",
    title: "Why I Self-Host Everything",
    slug: { _type: "slug", current: "why-i-self-host-everything" },
    excerpt:
      "On the philosophy of running your own infrastructure, owning your data, and why I'd rather debug a Proxmox cluster at midnight than pay for another SaaS subscription.",
    publishedAt: "2026-02-20T10:00:00Z",
    featured: false,
    categories: [
      { _type: "reference", _ref: categoryIds["self-hosting"], _key: "c1" },
      { _type: "reference", _ref: categoryIds["homelab"], _key: "c2" },
    ],
    tags: ["self-hosting", "proxmox", "docker", "privacy", "homelab"],
    body: [
      block(
        "I self-host almost everything. Email filtering, media streaming, password management, identity, monitoring — if there's a self-hosted alternative, I'm probably running it. People sometimes ask why I bother when there are perfectly good cloud services for all of this. The honest answer is a mix of principle and stubbornness."
      ),
      block(
        "The principle part is straightforward: I want to own my data. Not in a tinfoil-hat way, but in the practical sense that I want to know where my data lives, who has access to it, and what happens if a provider decides to change their terms or shut down. When your photos are on your own Jellyfin server and your secrets are in your own Infisical instance, those questions have simple answers."
      ),
      block(
        "The stubbornness part is that I genuinely enjoy the process. Running Proxmox VE as my virtualization layer, spinning up containers in Docker, wiring everything together through Cloudflare Tunnels and Nginx Proxy Manager — it's the kind of infrastructure work that scratches the same itch as building software. You're designing systems, solving problems, and occasionally staring at logs at 1 AM wondering why Authentik decided to invalidate all sessions."
      ),
      block(
        "Is it more work than just paying for SaaS? Absolutely. But it's also more educational, more flexible, and more satisfying. Every service in my homelab is something I understand end-to-end. When something breaks, I learn something. When something works, I know exactly why. That's worth a few late nights."
      ),
    ],
  });

  // --- Projects ---
  console.log("Creating projects...");
  await client.createOrReplace({
    _id: "project-hrolbot",
    _type: "project",
    title: "Hrolbot",
    slug: { _type: "slug", current: "hrolbot" },
    summary:
      "Multi-agent AI system running on a Proxmox VM. Autonomous Claude Code agents coordinated through an MCP mesh — each specializing in frontend, backend, review, or DevOps.",
    description: [
      block(
        "Hrolbot started as a Discord bot that calls Claude Code. It evolved into a multi-agent system where specialized workers — frontend, backend, reviewer, testing, research — operate autonomously on separate Linux user accounts. They coordinate through a shared message mesh, write code on feature branches, review each other's work, and push to GitHub."
      ),
      block(
        "The orchestrator receives tasks from Discord, delegates to the right workers, and reports results. The whole system runs on a 4-core Proxmox VM with 8GB RAM. Workers use tmux sessions for long tasks and a SQLite database for task tracking."
      ),
    ],
    githubUrl: "https://github.com/Hrolgar/hrolbot",
    featured: true,
    technologies: [
      { _type: "reference", _ref: skillIds["Python"], _key: "t1" },
      { _type: "reference", _ref: skillIds["TypeScript"], _key: "t2" },
      { _type: "reference", _ref: skillIds["Docker"], _key: "t3" },
      { _type: "reference", _ref: skillIds["Linux"], _key: "t4" },
    ],
    order: 1,
  });

  await client.createOrReplace({
    _id: "project-codex",
    _type: "project",
    title: "Codex",
    slug: { _type: "slug", current: "codex" },
    summary:
      "Self-hosted book and audiobook library manager with duplicate detection, series tracking, and provider-based metadata fetching.",
    description: [
      block(
        "Codex is a library manager for ebooks and audiobooks. It scans directories, detects duplicates, tracks series, and fetches metadata from multiple providers (Google Books, Open Library, Audnexus). Built with FastAPI and React, designed to run self-hosted alongside Audiobookshelf."
      ),
    ],
    githubUrl: "https://github.com/Hrolgar/codex",
    featured: false,
    technologies: [
      { _type: "reference", _ref: skillIds["Python"], _key: "t1" },
      { _type: "reference", _ref: skillIds["TypeScript"], _key: "t2" },
      { _type: "reference", _ref: skillIds["React"], _key: "t3" },
      { _type: "reference", _ref: skillIds["SQLite"], _key: "t4" },
    ],
    order: 2,
  });

  await client.createOrReplace({
    _id: "project-ullrhome",
    _type: "project",
    title: "Ullrhome",
    slug: { _type: "slug", current: "ullrhome" },
    summary:
      "This site. Portfolio and blog built with Next.js and Sanity CMS.",
    description: [
      block(
        "A personal portfolio site built with Next.js 16 and Sanity v5. All content is CMS-managed, the design uses Fraunces and DM Sans typography with a dark editorial theme. Built almost entirely by Hrolbot's worker agents as a test of the multi-agent system."
      ),
    ],
    githubUrl: "https://github.com/Hrolgar/ullrhome",
    featured: false,
    technologies: [
      { _type: "reference", _ref: skillIds["TypeScript"], _key: "t1" },
      { _type: "reference", _ref: skillIds["Next.js"], _key: "t2" },
      { _type: "reference", _ref: skillIds["React"], _key: "t3" },
      { _type: "reference", _ref: skillIds["Vercel"], _key: "t4" },
    ],
    order: 3,
  });

  console.log("\nSeeding complete!");
}

seed().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
