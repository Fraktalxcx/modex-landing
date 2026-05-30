(() => {
  const topbar = document.querySelector(".topbar");
  const revealItems = document.querySelectorAll(".reveal");
  const form = document.getElementById("lead-form");
  const status = document.getElementById("form-status");
  const phoneInput = document.getElementById("phone-input");
  const processLine = document.querySelector(".process__line");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const syncTopbar = () => {
    if (!topbar) return;
    topbar.classList.toggle("is-scrolled", window.scrollY > 8);
  };
  syncTopbar();
  window.addEventListener("scroll", syncTopbar, { passive: true });

  if (revealItems.length) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -20px 0px" });

    revealItems.forEach((item) => revealObserver.observe(item));
  }

  if (phoneInput) {
    phoneInput.addEventListener("input", () => {
      const value = phoneInput.value.trim();
      const normalized = value.replace(/[^\d+]/g, "");
      if (normalized !== value) phoneInput.value = normalized;
    });
  }

  if (form && status) {
    form.addEventListener("submit", (event) => {
      const phoneValue = (phoneInput?.value || "").trim();
      const phoneClean = phoneValue.replace(/[^\d]/g, "");
      if (!phoneValue || phoneClean.length < 11 || !phoneValue.startsWith("+7")) {
        event.preventDefault();
        status.textContent = "Введите телефон в формате +7XXXXXXXXXX.";
        return;
      }
      status.textContent = "Отправляем заявку...";
    });
  }

  if (!prefersReducedMotion && window.gsap && window.ScrollTrigger) {
    const { gsap, ScrollTrigger } = window;
    gsap.registerPlugin(ScrollTrigger);

    const heroBackdrop = document.querySelector(".hero__backdrop");
    const heroImage = document.querySelector(".hero__media img");
    const heroTitle = document.querySelector(".hero__title");
    const heroLead = document.querySelector(".hero .lead");
    const heroButtons = document.querySelectorAll(".hero__actions .btn");

    if (heroTitle) {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      tl.from(heroTitle, { y: 42, opacity: 0, duration: 0.8 })
        .from(heroLead, { y: 20, opacity: 0, duration: 0.6 }, "-=0.4")
        .from(heroButtons, { y: 20, opacity: 0, duration: 0.5, stagger: 0.12 }, "-=0.35");
    }

    if (heroBackdrop) {
      gsap.to(heroBackdrop, {
        scale: 1,
        duration: 8,
        ease: "sine.out"
      });
    }

    if (heroImage) {
      gsap.to(heroImage, {
        scale: 1.12,
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
    }

    if (processLine) {
      gsap.fromTo(processLine, { scaleY: 0.1 }, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: ".process__wrap",
          start: "top 70%",
          end: "bottom 30%",
          scrub: true
        }
      });
    }

    gsap.to(".principles-wrap__image", {
      yPercent: 10,
      scrollTrigger: {
        trigger: ".principles-wrap",
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
  }
})();
