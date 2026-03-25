const navbar = document.getElementById("navbar");
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");
const year = document.getElementById("year");
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

if (year) year.textContent = new Date().getFullYear();

window.addEventListener("scroll", () => {
  if (navbar) navbar.classList.toggle("visible", window.scrollY > 100);
});

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.toggle("open");
    menuToggle.classList.toggle("active", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  mobileMenu.querySelectorAll("a[href^='#']").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("open");
      menuToggle.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

document.querySelectorAll("a[href^='#']").forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    const href = anchor.getAttribute("href");
    if (!href || href === "#") return;
    const target = document.querySelector(href);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

function setupGsapAnimations() {
  if (!window.gsap || !window.ScrollTrigger) {
    setupFallbackReveal();
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  gsap.set(".hero-logo", { opacity: 0, scale: 0.9, y: 16 });
  gsap.set(".hero h1", { opacity: 0, y: 30 });
  gsap.set(".hero h2", { opacity: 0, y: 30 });
  gsap.set(".hero p", { opacity: 0, y: 20 });
  gsap.set(".hero-actions", { opacity: 0, y: 20 });
  gsap.set(".hero-phone", { opacity: 0, y: 18 });
  gsap.set(".scroll-indicator", { opacity: 0 });

  gsap.timeline({ defaults: { ease: "power3.out" } })
    .to(".hero-logo", { opacity: 1, scale: 1, y: 0, duration: 0.8 })
    .to(".hero h1", { opacity: 1, y: 0, duration: 0.6 }, "-=0.35")
    .to(".hero h2", { opacity: 1, y: 0, duration: 0.6 }, "-=0.35")
    .to(".hero p", { opacity: 1, y: 0, duration: 0.5 }, "-=0.25")
    .to(".hero-actions", { opacity: 1, y: 0, duration: 0.5 }, "-=0.2")
    .to(".hero-phone", { opacity: 1, y: 0, duration: 0.4 }, "-=0.2")
    .to(".scroll-indicator", { opacity: 1, duration: 0.4 }, "-=0.1");

  document.querySelectorAll(".reveal-up").forEach((element) => {
    gsap.set(element, { opacity: 0, y: 40 });
    ScrollTrigger.create({
      trigger: element,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(element, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" });
      }
    });
  });

  document.querySelectorAll(".stagger-group").forEach((group) => {
    const cards = group.querySelectorAll(".reveal-card");
    if (!cards.length) return;

    gsap.set(cards, { opacity: 0, y: 40 });
    ScrollTrigger.batch(cards, {
      start: "top 85%",
      once: true,
      onEnter: (batch) => {
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out"
        });
      }
    });
  });
}

function setupFallbackReveal() {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18 });

  document.querySelectorAll(".reveal-up, .reveal-card, .hero-animate").forEach((element) => {
    element.style.transition = "opacity 0.7s ease, transform 0.7s ease";
    revealObserver.observe(element);
  });
}

document.querySelectorAll(".flip-card").forEach((card) => {
  card.addEventListener("click", () => {
    if (window.innerWidth <= 899) card.classList.toggle("is-flipped");
  });
});

if (contactForm && formMessage) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    formMessage.textContent = "Thanks for your interest. We will contact you soon.";
    contactForm.reset();
  });
}

setupGsapAnimations();