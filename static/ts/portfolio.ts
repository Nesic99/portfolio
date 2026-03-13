// portfolio.ts — compiled to static/js/portfolio.js

// ── Extend window with custom properties ─────────────────────────────────────
declare global {
  interface Window {
    __revealObserver: IntersectionObserver | undefined;
    __initSkillHover: (() => void) | undefined;
    __initCardTilt: (() => void) | undefined;
  }
}

// ── Smooth scroll navigation ──────────────────────────────────────────────────
function initNav(): void {
  const nav = document.querySelector<HTMLElement>(".nav");
  const links = document.querySelectorAll<HTMLAnchorElement>(".nav__link");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 60) {
      nav?.classList.add("nav--scrolled");
    } else {
      nav?.classList.remove("nav--scrolled");
    }
    updateActiveLink();
  });

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = link.getAttribute("href");
      if (target && target.startsWith("#")) {
        const section = document.querySelector<HTMLElement>(target);
        section?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}

function updateActiveLink(): void {
  const sections = document.querySelectorAll<HTMLElement>("section[id]");
  const links = document.querySelectorAll<HTMLAnchorElement>(".nav__link");
  let current = "";

  sections.forEach((section) => {
    const top = section.offsetTop - 120;
    if (window.scrollY >= top) current = section.id;
  });

  links.forEach((link) => {
    link.classList.toggle(
      "nav__link--active",
      link.getAttribute("href") === `#${current}`
    );
  });
}

// ── Intersection Observer reveal animations ──────────────────────────────────
function makeRevealObserver(): IntersectionObserver {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          const delay = el.dataset.delay ?? "0";
          setTimeout(() => {
            el.classList.add("revealed");
          }, parseInt(delay));
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.12 }
  );
  return observer;
}

function initReveal(): void {
  const observer = makeRevealObserver();
  window.__revealObserver = observer;

  document.querySelectorAll<HTMLElement>(".reveal").forEach((el, i) => {
    el.dataset.delay = String(i * 60);
    observer.observe(el);
  });
}

// ── Typewriter effect for hero title ─────────────────────────────────────────
function initTypewriter(): void {
  const el = document.querySelector<HTMLElement>(".hero__typewriter");
  if (!el) return;

  const words = ["DevOps Engineer."];
  let wordIdx = 0;
  let charIdx = 0;
  let deleting = false;

  function tick() {
    if (!el) return;
    const word = words[wordIdx];
    if (deleting) {
      charIdx--;
      el.textContent = word.slice(0, charIdx);
      if (charIdx === 0) {
        deleting = false;
        wordIdx = (wordIdx + 1) % words.length;
        setTimeout(tick, 400);
        return;
      }
      setTimeout(tick, 60);
    } else {
      charIdx++;
      el.textContent = word.slice(0, charIdx);
      if (charIdx === word.length) {
        deleting = true;
        setTimeout(tick, 2000);
        return;
      }
      setTimeout(tick, 100);
    }
  }

  setTimeout(tick, 800);
}

// ── Skill tag hover scatter ───────────────────────────────────────────────────
function initSkillHover(): void {
  window.__initSkillHover = initSkillHover;
  const tags = document.querySelectorAll<HTMLElement>(".skill-tag");
  tags.forEach((tag) => {
    tag.addEventListener("mouseenter", () => {
      const dx = (Math.random() - 0.5) * 8;
      const dy = (Math.random() - 0.5) * 8;
      tag.style.transform = `translate(${dx}px, ${dy}px) scale(1.08)`;
    });
    tag.addEventListener("mouseleave", () => {
      tag.style.transform = "translate(0,0) scale(1)";
    });
  });
}

// ── Project card tilt ─────────────────────────────────────────────────────────
function initCardTilt(): void {
  window.__initCardTilt = initCardTilt;
  const cards = document.querySelectorAll<HTMLElement>(".project-card");
  cards.forEach((card) => {
    card.addEventListener("mousemove", (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(600px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateZ(8px)`;
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(600px) rotateY(0) rotateX(0) translateZ(0)";
    });
  });
}

// ── Cursor dot ────────────────────────────────────────────────────────────────
function initCursor(): void {
  const dot = document.createElement("div");
  dot.className = "cursor-dot";
  document.body.appendChild(dot);

  document.addEventListener("mousemove", (e: MouseEvent) => {
    dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
  });

  document.querySelectorAll<HTMLElement>("a, button, .project-card, .exp-card").forEach((el) => {
    el.addEventListener("mouseenter", () => dot.classList.add("cursor-dot--large"));
    el.addEventListener("mouseleave", () => dot.classList.remove("cursor-dot--large"));
  });
}

// ── Boot ──────────────────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("js-loaded");
  initNav();
  initReveal();
  initTypewriter();
  initSkillHover();
  initCardTilt();
  initCursor();
  updateActiveLink();
});

export {};