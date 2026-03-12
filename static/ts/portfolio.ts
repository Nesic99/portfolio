"use strict";
// portfolio.ts — compiled to static/js/portfolio.js
// ── Smooth scroll navigation ──────────────────────────────────────────────────
function initNav() {
    const nav = document.querySelector(".nav");
    const links = document.querySelectorAll(".nav__link");
    // Scroll-shrink effect
    window.addEventListener("scroll", () => {
        if (window.scrollY > 60) {
            nav === null || nav === void 0 ? void 0 : nav.classList.add("nav--scrolled");
        }
        else {
            nav === null || nav === void 0 ? void 0 : nav.classList.remove("nav--scrolled");
        }
        updateActiveLink();
    });
    // Smooth scroll
    links.forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const target = link.getAttribute("href");
            if (target && target.startsWith("#")) {
                const section = document.querySelector(target);
                section === null || section === void 0 ? void 0 : section.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        });
    });
}
function updateActiveLink() {
    const sections = document.querySelectorAll("section[id]");
    const links = document.querySelectorAll(".nav__link");
    let current = "";
    sections.forEach((section) => {
        const top = section.offsetTop - 120;
        if (window.scrollY >= top)
            current = section.id;
    });
    links.forEach((link) => {
        link.classList.toggle("nav__link--active", link.getAttribute("href") === `#${current}`);
    });
}
// ── Intersection Observer reveal animations ──────────────────────────────────
function makeRevealObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            var _a;
            if (entry.isIntersecting) {
                const el = entry.target;
                const delay = (_a = el.dataset.delay) !== null && _a !== void 0 ? _a : "0";
                setTimeout(() => {
                    el.classList.add("revealed");
                }, parseInt(delay));
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.12 });
    return observer;
}
function initReveal() {
    const observer = makeRevealObserver();
    window.__revealObserver = observer;
    document.querySelectorAll(".reveal").forEach((el, i) => {
        el.dataset.delay = String(i * 60);
        observer.observe(el);
    });
}
// ── Typewriter effect for hero title ─────────────────────────────────────────
function initTypewriter() {
    const el = document.querySelector(".hero__typewriter");
    if (!el)
        return;
    const words = ["Engineer.", "Builder.", "Creator.", "Problem Solver."];
    let wordIdx = 0;
    let charIdx = 0;
    let deleting = false;
    function tick() {
        const word = words[wordIdx];
        if (!el)
            return;
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
        }
        else {
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
function initSkillHover() {
    window.__initSkillHover = initSkillHover;
    const tags = document.querySelectorAll(".skill-tag");
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
function initCardTilt() {
    window.__initCardTilt = initCardTilt;
    const cards = document.querySelectorAll(".project-card");
    cards.forEach((card) => {
        card.addEventListener("mousemove", (e) => {
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
function initCursor() {
    const dot = document.createElement("div");
    dot.className = "cursor-dot";
    document.body.appendChild(dot);
    document.addEventListener("mousemove", (e) => {
        dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });
    document.querySelectorAll("a, button, .project-card, .exp-card").forEach((el) => {
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