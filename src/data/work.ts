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
    context: "CAp 2026 · Accepted paper · Poster",
    description:
      "Developed a wrapper for score-based black-box adversarial attacks that uses early class-confidence signals to select a target, reducing class drift without gradient access. Evaluated 4,500 ImageNet attack runs across five classifiers. On ResNet-50, improved attack success by up to 27 percentage points and reduced censored-mean attack iterations by 43%.",
    details: ["F. Tariolle · F. Yger", "Accepted paper; poster at CAp 2026"],
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
      "Selected as one of 100 participants from 650+ applicants for a Yann LeCun-sponsored, 24-hour hackathon on JEPAs and world models. Our team finished among the top five of 25 teams. Built a model that learns from unlabeled EEG recordings. Explored whether training that respects the curved geometry of covariance matrices leads to more structured representations.",
    details: ["650+ applicants · 100 participants", "Top 5 of 25 teams"],
    links: [
      { label: "Code", href: "https://github.com/Tariolle/hello-worlds" },
      { label: "Deck", href: "https://github.com/Tariolle/hello-worlds/blob/main/presentation/main.pdf" },
    ],
  },
  {
    title: "DashVMC",
    year: "09.2026",
    categories: ["research", "publications"],
    labels: ["Publication", "Research"],
    context: "PTA workshop · NeurIPS 2026 · Accepted paper · Poster",
    description:
      "Developed a world-model agent for live Geometry Dash control from pixels, refining a behaviour-cloned policy with PPO entirely in frozen-model rollouts. Trained offline on approximately two hours of gameplay; improved survival over cloning on three official levels and a held-out layout, with 60-FPS control on an RTX 2060.",
    details: ["F. Tariolle · F. Yger", "Accepted paper; poster at the PTA workshop, NeurIPS 2026", "Two hours of gameplay · 60 FPS on an RTX 2060"],
    links: [
      { label: "arXiv", href: "https://arxiv.org/abs/2609.40003" },
      { label: "Demo", href: "https://tariolle.github.io/dash-vmc/" },
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
      "Co-founded and co-developed an open-source customization tool; remain the project's top contributor. Built core application components spanning the Python backend, in-client JavaScript plugins, and their real-time WebSocket bridge. The project has since reached 30,000 daily active users and 90,000 monthly active users, with 700+ GitHub stars and 20+ contributors.",
    details: ["September–December 2025", "30K daily · 90K monthly active users", "20+ contributors"],
    repo: "Alban1911/Rose",
    stars: 700,
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
