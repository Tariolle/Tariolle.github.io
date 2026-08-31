export type WorkFilter = "research" | "publications" | "projects";

export interface WorkLink {
  label: string;
  href: string;
}

export interface WorkItem {
  title: string;
  year: string;
  categories: WorkFilter[];
  labels: string[];
  context: string;
  description: string;
  details: string[];
  links: WorkLink[];
  repo?: string;
  stars?: number;
}

const workOrder = [
  "DashVMC",
  "Geometry-Aware Joint-Embedding EEG",
  "Opportunistic Target Selection",
  "VisualTorch",
  "Rose",
];

export const workItems = ([
  {
    title: "Opportunistic Target Selection",
    year: "05.2026",
    categories: ["research", "publications"],
    labels: ["Publication", "Research"],
    context: "CAp 2026 · Poster",
    description:
      "A lightweight wrapper for query-efficient black-box attacks that uses early class-confidence signals to reduce class drift and commit to promising adversarial targets.",
    details: ["F. Tariolle · F. Yger", "Accepted at CAp 2026"],
    links: [
      { label: "arXiv", href: "https://arxiv.org/abs/2605.25663" },
      { label: "Code", href: "https://github.com/Tariolle/opportunistic-target-selection" },
      {
        label: "Poster",
        href: "https://github.com/Tariolle/opportunistic-target-selection/blob/main/poster/poster_beamer.pdf",
      },
    ],
  },
  {
    title: "Geometry-Aware Joint-Embedding EEG",
    year: "06.2026",
    categories: ["research", "projects"],
    labels: ["Research", "Project"],
    context: "Hackathon finalist · Top 5/25 teams",
    description:
      "Selected as one of 100 participants from 650+ applicants for a Yann LeCun-sponsored 24-hour challenge bringing together students from France's leading engineering schools and universities; placed among the top 5 of 25 teams. Built a geometry-aware joint-embedding EEG SSL system with SIGReg frozen-transfer baselines and Riemannian analysis of SPD covariance representations.",
    details: ["650+ applicants · 100 participants", "Top 5 of 25 teams"],
    links: [
      { label: "Code", href: "https://github.com/Tariolle/hello-worlds" },
      { label: "Deck", href: "https://github.com/Tariolle/hello-worlds/blob/main/presentation/main.pdf" },
    ],
  },
  {
    title: "DashVMC",
    year: "08.2026",
    categories: ["research", "publications"],
    labels: ["Publication", "Research"],
    context: "NeurIPS 2026 Workshop PTA · Submitted",
    description:
      "Real-time Geometry Dash control from pixels using an 8x8 FSQ token grid, action-conditioned transformer dynamics, and an actor-critic refined with PPO entirely in frozen-model rollouts.",
    details: ["F. Tariolle · F. Yger", "60 FPS decoder-free deployment"],
    links: [
      { label: "Project page", href: "https://tariolle.github.io/dash-vmc/" },
      { label: "Code", href: "https://github.com/Tariolle/dash-vmc" },
    ],
  },
  {
    title: "Rose",
    year: "2025",
    categories: ["projects"],
    labels: ["Project", "Engineering"],
    context: "Co-founder · Lead developer",
    description:
      "Co-founded and lead a six-person team behind a real-time customization tool used by more than 30,000 people daily and earning 400+ GitHub stars.",
    details: ["30K+ daily active users", "400+ GitHub stars", "6-person team"],
    repo: "Alban1911/Rose",
    stars: 400,
    links: [{ label: "Code", href: "https://github.com/Alban1911/Rose" }],
  },
  {
    title: "VisualTorch",
    year: "2026",
    categories: ["projects"],
    labels: ["Project", "Open source"],
    context: "Maintainer · MCP integration",
    description:
      "An official PyTorch Ecosystem project for visualizing neural-network architectures. I maintain the project and designed and implemented its MCP integration for generating editable diagrams from model definitions.",
    details: ["PyTorch", "Official ecosystem project"],
    repo: "willyfh/visualtorch",
    stars: 316,
    links: [
      { label: "Documentation", href: "https://visualtorch.readthedocs.io/en/latest/" },
      { label: "Code", href: "https://github.com/willyfh/visualtorch" },
    ],
  },
] satisfies WorkItem[]).sort((a, b) => workOrder.indexOf(a.title) - workOrder.indexOf(b.title));
