/* Chiya Ghar - shared behaviour (linked from every page) */
document.addEventListener("DOMContentLoaded", () => {
  // 1. Mobile menu toggle
  const btn = document.querySelector(".menu-btn");
  const links = document.querySelector(".nav-links");
  if (btn && links) {
    btn.addEventListener("click", () => {
      const open = links.classList.toggle("open");
      btn.setAttribute("aria-expanded", open);
    });
  }

  // 2. Highlight the current page in the navigation bar
  const here = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach(a => {
    if (a.getAttribute("href") === here) a.setAttribute("aria-current", "page");
  });

  // 3. Footer year
  const yr = document.getElementById("year");
  if (yr) yr.textContent = new Date().getFullYear();

  // 4. Contact form validation (no server needed)
  const form = document.getElementById("contact-form");
  if (form) {
    const status = document.getElementById("status");
    const rules = {
      name: v => v.trim().length >= 2 || "Enter your name (at least 2 letters).",
      email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || "Enter a valid email, like name@example.com.",
      message: v => v.trim().length >= 10 || "Write at least 10 characters."
    };
    form.addEventListener("submit", e => {
      e.preventDefault();
      let ok = true;
      Object.keys(rules).forEach(id => {
        const field = form.elements[id];
        const result = rules[id](field.value);
        form.querySelector(`[data-for="${id}"]`).textContent = result === true ? "" : result;
        if (result !== true) ok = false;
      });
      status.classList.toggle("show", ok);
      if (ok) { status.textContent = "Thank you! Your message is ready to send. We reply within two days."; form.reset(); }
    });
  }
});
