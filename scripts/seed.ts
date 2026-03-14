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

  // --- Site Settings ---
  console.log("Creating site settings...");
  await client.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    siteName: "Ullrhome",
    siteDescription:
      "Personal portfolio and blog of Hrolgar — .NET developer, homelab enthusiast, and builder of things.",
  });

  // --- About ---
  console.log("Creating about...");
  await client.createOrReplace({
    _id: "about",
    _type: "about",
    heading: "Hrolgar",
    tagline: "Building software by day, infrastructure by night",
    roles: [
      ".NET Developer",
      "Homelab Enthusiast",
      "Self-Hosting Advocate",
      "AI Tinkerer",
    ],
    body: [
      block(
        "I'm Helgi — most people online know me as Hrolgar. By day I build financial applications at SpareBank 1, working across the .NET stack in the Norwegian banking sector. It's the kind of work where reliability isn't optional and you learn to appreciate well-tested code. Outside of office hours, I disappear into my homelab."
      ),
      block(
        "I run everything I can on my own hardware — media servers, identity providers, monitoring, the lot. My latest obsession is Hrolbot, an AI agent system running on a Raspberry Pi 5 that coordinates autonomous Claude Code agents through an MCP mesh. It's equal parts practical and ridiculous, which is exactly how I like my side projects."
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
    contactFormEnabled: false,
  });

  // --- Skills ---
  console.log("Creating skills...");
  const skills = [
    // Languages
    { name: "C#", category: "language", proficiency: 5, order: 1 },
    { name: "Python", category: "language", proficiency: 4, order: 2 },
    { name: "TypeScript", category: "language", proficiency: 4, order: 3 },
    { name: "JavaScript", category: "language", proficiency: 4, order: 4 },
    { name: "Go", category: "language", proficiency: 3, order: 5 },
    { name: "SQL", category: "language", proficiency: 4, order: 6 },
    { name: "Bash", category: "language", proficiency: 3, order: 7 },
    // Frameworks
    { name: ".NET/ASP.NET Core", category: "framework", proficiency: 5, order: 8 },
    { name: "React", category: "framework", proficiency: 3, order: 9 },
    { name: "Next.js", category: "framework", proficiency: 3, order: 10 },
    { name: "Blazor", category: "framework", proficiency: 3, order: 11 },
    { name: "Entity Framework", category: "framework", proficiency: 4, order: 12 },
    // DevOps
    { name: "Docker", category: "devops", proficiency: 4, order: 13 },
    { name: "Proxmox", category: "devops", proficiency: 4, order: 14 },
    { name: "Cloudflare", category: "devops", proficiency: 3, order: 15 },
    { name: "Nginx", category: "devops", proficiency: 3, order: 16 },
    { name: "GitHub Actions", category: "devops", proficiency: 4, order: 17 },
    { name: "OpenTofu/Terraform", category: "devops", proficiency: 3, order: 18 },
    // Databases
    { name: "PostgreSQL", category: "database", proficiency: 4, order: 19 },
    { name: "SQL Server", category: "database", proficiency: 4, order: 20 },
    { name: "SQLite", category: "database", proficiency: 3, order: 21 },
    { name: "Redis", category: "database", proficiency: 3, order: 22 },
    // Tools
    { name: "Git", category: "tool", proficiency: 4, order: 23 },
    { name: "VS Code", category: "tool", proficiency: 4, order: 24 },
    { name: "JetBrains Rider", category: "tool", proficiency: 4, order: 25 },
    { name: "Linux", category: "tool", proficiency: 4, order: 26 },
    { name: "Infisical", category: "tool", proficiency: 3, order: 27 },
    // Platforms
    { name: "Azure", category: "platform", proficiency: 3, order: 28 },
    { name: "Vercel", category: "platform", proficiency: 3, order: 29 },
    { name: "Raspberry Pi", category: "platform", proficiency: 4, order: 30 },
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
    role: ".NET Developer",
    location: "Norway",
    startDate: "2023-01-01",
    description: [
      block(
        "Building and maintaining financial applications in the Norwegian banking sector. Working primarily with the .NET stack, focusing on reliable, well-tested systems that handle real money."
      ),
    ],
    technologies: [
      { _type: "reference", _ref: skillIds["C#"], _key: "t1" },
      { _type: "reference", _ref: skillIds[".NET/ASP.NET Core"], _key: "t2" },
      { _type: "reference", _ref: skillIds["SQL Server"], _key: "t3" },
      { _type: "reference", _ref: skillIds["Azure"], _key: "t4" },
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
    { name: "Proxmox VE", description: "Virtualization platform running all VMs and containers in the homelab.", category: "virtualization", order: 1 },
    { name: "Docker", description: "Container runtime for running self-hosted applications.", category: "virtualization", order: 2 },
    { name: "Cloudflare Tunnels", description: "Secure external access to homelab services without exposing ports.", category: "networking", order: 3 },
    { name: "Authentik", description: "Identity and SSO provider for single sign-on across all services.", category: "identity", order: 4 },
    { name: "Jellyfin", description: "Self-hosted media server for movies, TV shows, and music.", category: "media", order: 5 },
    { name: "Hrolbot", description: "AI assistant platform running on a Raspberry Pi 5 with autonomous Claude Code agents.", category: "automation", order: 6 },
    { name: "Infisical", description: "Self-hosted secrets management for securely storing and distributing credentials.", category: "security", order: 7 },
    { name: "Nginx Proxy Manager", description: "Reverse proxy with a web UI for managing SSL certificates and routing.", category: "networking", order: 8 },
    { name: "Grafana", description: "Monitoring and observability dashboards for tracking homelab metrics.", category: "monitoring", order: 9 },
    { name: "Portainer", description: "Docker management UI for deploying and monitoring containers.", category: "development", order: 10 },
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
    title: "Building an AI Agent Mesh on a Raspberry Pi",
    slug: { _type: "slug", current: "building-ai-agent-mesh-raspberry-pi" },
    excerpt:
      "How I built Hrolbot — a multi-agent AI system running on a Raspberry Pi 5, powered by Claude Code and coordinated through an MCP mesh.",
    publishedAt: "2026-03-10T10:00:00Z",
    featured: true,
    categories: [
      { _type: "reference", _ref: categoryIds["homelab"], _key: "c1" },
    ],
    tags: ["raspberry-pi", "ai", "claude", "mcp", "hrolbot"],
    body: [
      block(
        "A few months ago I had one of those ideas that sounds reasonable at 2 AM: what if I ran a fleet of AI agents on a Raspberry Pi 5? Not as a proof of concept, but as something I actually use daily. That idea became Hrolbot."
      ),
      block(
        "Hrolbot is a multi-agent system where each agent — a frontend developer, a backend developer, a reviewer — runs as an autonomous Claude Code instance. They coordinate through an MCP (Model Context Protocol) mesh, passing messages, sharing state, and handing off tasks to each other. An orchestrator agent receives instructions from Discord and delegates work to the right specialist."
      ),
      block(
        "The Raspberry Pi 5 handles the coordination layer: the MCP server, the message bus, the state store. The actual AI inference happens in the cloud via the Anthropic API, so the Pi doesn't need to do any heavy lifting on that front. It just needs to keep the mesh running and the agents talking."
      ),
      block(
        "One of the more interesting challenges was getting the agents to work together without stepping on each other. Each agent operates in its own workspace, commits to its own branch, and communicates through structured messages. The orchestrator handles merge coordination and conflict resolution. It's not perfect, but it works surprisingly well for a system running on a £80 single-board computer."
      ),
      block(
        "The whole thing is open source. If you're curious about running your own agent mesh — or you just want to see what happens when you give a Pi more responsibility than it probably deserves — check out the repo on GitHub."
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
      "An AI assistant platform running on a Raspberry Pi 5. Multi-agent system with Claude Code agents coordinated through an MCP mesh.",
    description: [
      block(
        "Hrolbot is a multi-agent AI system that runs on a Raspberry Pi 5. It uses Claude Code to power autonomous agents — each specializing in a different role like frontend development, backend development, or code review. The agents communicate through an MCP (Model Context Protocol) mesh, sharing state and handing off tasks."
      ),
      block(
        "An orchestrator agent receives commands from Discord and delegates work to the appropriate specialist agents. Each agent works in its own isolated workspace, commits to feature branches, and reports results back through the mesh. The system handles everything from code generation to PR creation."
      ),
    ],
    githubUrl: "https://github.com/Hrolgar/hrolbot",
    featured: true,
    technologies: [
      { _type: "reference", _ref: skillIds["Python"], _key: "t1" },
      { _type: "reference", _ref: skillIds["TypeScript"], _key: "t2" },
      { _type: "reference", _ref: skillIds["Raspberry Pi"], _key: "t3" },
      { _type: "reference", _ref: skillIds["Docker"], _key: "t4" },
    ],
    order: 1,
  });

  await client.createOrReplace({
    _id: "project-ullrhome",
    _type: "project",
    title: "Ullrhome",
    slug: { _type: "slug", current: "ullrhome" },
    summary:
      "This portfolio site. A CMS-driven personal site built with Next.js and Sanity, designed to showcase projects, skills, and homelab infrastructure.",
    description: [
      block(
        "Ullrhome is a personal portfolio and blog built with Next.js and Sanity CMS. It features a dark Nordic-inspired design with sections for projects, skills, experience, homelab services, and blog posts. All content is managed through Sanity Studio, making it easy to update without touching code."
      ),
      block(
        "The site is fully server-rendered with on-demand revalidation via Sanity webhooks. It's deployed on Vercel and uses Tailwind CSS for styling."
      ),
    ],
    githubUrl: "https://github.com/Hrolgar/ullrhome",
    featured: true,
    technologies: [
      { _type: "reference", _ref: skillIds["TypeScript"], _key: "t1" },
      { _type: "reference", _ref: skillIds["Next.js"], _key: "t2" },
      { _type: "reference", _ref: skillIds["React"], _key: "t3" },
      { _type: "reference", _ref: skillIds["Vercel"], _key: "t4" },
    ],
    order: 2,
  });

  console.log("\nSeeding complete!");
}

seed().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
