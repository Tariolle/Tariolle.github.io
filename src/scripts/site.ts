import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const header = document.querySelector<HTMLElement>("[data-site-header]");
let lastScroll = window.scrollY;

const updateHeader = () => {
  if (!header) return;
  const current = window.scrollY;
  header.classList.toggle("is-compact", current > 32);
  header.classList.toggle("is-hidden", current > lastScroll && current > 220);
  lastScroll = current;
};

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

const startAnimations = () => {
  const heroTitle = document.querySelector<HTMLElement>("[data-hero-title]");
  const heroDetails = document.querySelectorAll<HTMLElement>("[data-hero-detail]");
  const latentField = document.querySelector<HTMLElement>("[data-latent-field]");

  if (heroTitle && heroDetails.length && latentField) {
    const heroTimeline = gsap.timeline({ defaults: { ease: "power3.out" } });
    heroTimeline
      .from(heroTitle, { yPercent: 108, duration: 1.15 }, 0.08)
      .from(heroDetails, { opacity: 0, y: 24, duration: 0.75, stagger: 0.09 }, 0.48)
      .from(latentField, { opacity: 0, scale: 0.96, duration: 1.2 }, 0.25);
  }

  document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((element) => {
    gsap.from(element, {
      opacity: 0,
      y: 40,
      duration: 0.85,
      ease: "power3.out",
      scrollTrigger: {
        trigger: element,
        start: "top 88%",
        once: true,
      },
    });
  });

  document.querySelectorAll<HTMLElement>("[data-section-rule]").forEach((rule) => {
    gsap.from(rule, {
      scaleX: 0,
      transformOrigin: "left center",
      duration: 1.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: rule,
        start: "top 94%",
        once: true,
      },
    });
  });
};

if (!reducedMotion) {
  if (document.documentElement.classList.contains("is-ready")) {
    startAnimations();
  } else {
    document.addEventListener("site:ready", startAnimations, { once: true });
  }
}

document.querySelectorAll<HTMLElement>("[data-github-repo]").forEach(async (label) => {
  const repo = label.dataset.githubRepo;
  if (!repo) return;

  try {
    const response = await fetch(`https://api.github.com/repos/${repo}`, {
      headers: { Accept: "application/vnd.github+json" },
    });
    if (!response.ok) return;
    const repository = await response.json();
    if (Number.isFinite(repository.stargazers_count)) {
      label.textContent = `${repository.stargazers_count.toLocaleString("en-US")} stars`;
    }
  } catch {
    // The static project copy remains useful when GitHub rate-limits the request.
  }
});
