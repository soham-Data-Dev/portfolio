document.addEventListener("DOMContentLoaded", () => {
  // 1. Theme Toggle with LocalStorage
  const htmlEl = document.documentElement;
  const themeToggleBtn = document.getElementById("theme-toggle");
  const savedTheme = localStorage.getItem("soham_portfolio_theme") || "dark";

  htmlEl.setAttribute("data-theme", savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const current = htmlEl.getAttribute("data-theme") || "dark";
      const next = current === "dark" ? "light" : "dark";
      htmlEl.setAttribute("data-theme", next);
      localStorage.setItem("soham_portfolio_theme", next);
    });
  }

  // 2. Mobile Menu Navigation
  const mobileToggle = document.getElementById("mobile-toggle");
  const mobileDrawer = document.getElementById("mobile-drawer");

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener("click", () => {
      const isHidden = mobileDrawer.hasAttribute("hidden");
      if (isHidden) {
        mobileDrawer.removeAttribute("hidden");
        mobileToggle.setAttribute("aria-expanded", "true");
      } else {
        mobileDrawer.setAttribute("hidden", "");
        mobileToggle.setAttribute("aria-expanded", "false");
      }
    });

    mobileDrawer.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileDrawer.setAttribute("hidden", "");
        mobileToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // 3. Highlight active nav link on scroll
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  const updateActiveNavLink = () => {
    const scrollPos = window.scrollY + 130;
    sections.forEach((sec) => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute("id");
      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
        });
      }
    });
  };

  window.addEventListener("scroll", updateActiveNavLink, { passive: true });
});
