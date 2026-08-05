import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const header = document.querySelector<HTMLElement>("[data-site-header]");

const updateHeader = () => {
  if (!header) return;
  header.classList.toggle("is-compact", window.scrollY > 32);
};

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

const alignHashTarget = () => {
  const targetId = window.location.hash.slice(1);
  if (!targetId) return;

  const target = document.getElementById(targetId);
  if (!target) return;

  window.requestAnimationFrame(() => {
    document.documentElement.style.scrollBehavior = "auto";
    target.scrollIntoView({ block: "start" });
    document.documentElement.style.removeProperty("scroll-behavior");
  });
};

if (document.documentElement.classList.contains("is-ready")) {
  alignHashTarget();
} else {
  document.addEventListener("site:ready", alignHashTarget, { once: true });
}

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

const githubStarCacheTtl = 10 * 60 * 1000;

document.querySelectorAll<HTMLElement>("[data-github-repo]").forEach(async (label) => {
  const repository = label.dataset.githubRepo;
  const fallbackCount = Number(label.dataset.githubStars);
  if (!repository || !Number.isInteger(fallbackCount)) return;

  const cacheKey = `portfolio:github-stars:${repository}`;
  let displayedCount = fallbackCount;
  let checkedAt = 0;

  const saveCache = (count: number) => {
    try {
      localStorage.setItem(cacheKey, JSON.stringify({ count, checkedAt: Date.now() }));
    } catch {
      // Storage can be unavailable in restricted browsing modes.
    }
  };

  try {
    const cachedValue = localStorage.getItem(cacheKey);
    if (cachedValue) {
      const cached = JSON.parse(cachedValue);
      if (
        typeof cached.count === "number" &&
        Number.isInteger(cached.count) &&
        typeof cached.checkedAt === "number" &&
        Number.isFinite(cached.checkedAt)
      ) {
        displayedCount = cached.count;
        checkedAt = cached.checkedAt;
        label.textContent = `${cached.count.toLocaleString("en-US")} stars`;
      }
    }
  } catch {
    // The static count remains visible when storage is unavailable or invalid.
  }

  if (Date.now() - checkedAt < githubStarCacheTtl) return;

  try {
    const response = await fetch(`https://api.github.com/repos/${repository}`, {
      headers: { Accept: "application/vnd.github+json" },
    });
    if (!response.ok) throw new Error(`GitHub returned ${response.status}`);

    const data = await response.json();
    if (!Number.isInteger(data.stargazers_count)) throw new Error("Invalid GitHub response");

    displayedCount = data.stargazers_count;
    label.textContent = `${data.stargazers_count.toLocaleString("en-US")} stars`;
    saveCache(data.stargazers_count);
  } catch {
    // Keep the last value and avoid retrying until the next cache window.
    saveCache(displayedCount);
  }
});
