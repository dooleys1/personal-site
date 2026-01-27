document.addEventListener("DOMContentLoaded", () => {
  // ===== Mobile menu + dropdown =====
  const menuToggle = document.querySelector(".mobile-menu-toggle");
  const nav = document.querySelector("nav");
  const body = document.body;
  const dropdown = document.querySelector(".dropdown");
  const dropdownLink = document.querySelector(".dropdown-link");

  // Mobile menu toggle
  if (menuToggle) {
    menuToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      menuToggle.classList.toggle("active");
      if (nav) nav.classList.toggle("active");
      body.classList.toggle("menu-open");
    });
  }

  // Close menu when clicking outside
  body.addEventListener("click", (e) => {
    if (
      nav &&
      menuToggle &&
      !nav.contains(e.target) &&
      !menuToggle.contains(e.target)
    ) {
      menuToggle.classList.remove("active");
      nav.classList.remove("active");
      body.classList.remove("menu-open");
      if (dropdown) dropdown.classList.remove("active");
    }
  });

  // Mobile dropdown toggle (only on mobile widths)
  if (dropdownLink) {
    dropdownLink.addEventListener("click", (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        e.stopPropagation();
        if (dropdown) dropdown.classList.toggle("active");
      }
    });
  }

  // Update dropdown behavior on resize
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768 && dropdown) {
      dropdown.classList.remove("active");
    }
  });

  // ===== Clickable project card (Handled) =====
  const handledCard = document.getElementById("handled-card");

  // Only run Handled card code if the card exists
  if (handledCard) {
    const navigateToHandled = (url) => {
      handledCard.classList.add("card-clicked");

      setTimeout(() => {
        window.location.href = url;
      }, 220);

      setTimeout(() => {
        handledCard.classList.remove("card-clicked");
      }, 600);
    };

    handledCard.addEventListener("click", (e) => {
      const url = handledCard.dataset.href;
      if (!url) return;

      const rect = handledCard.getBoundingClientRect();
      const ripple = document.createElement("span");
      ripple.classList.add("ripple");

      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${e.clientY - rect.top - size / 2}px`;

      handledCard.appendChild(ripple);

      setTimeout(() => ripple.remove(), 500);

      navigateToHandled(url);
    });

    handledCard.setAttribute("tabindex", "0");
    handledCard.setAttribute("role", "link");

    handledCard.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        const url = handledCard.dataset.href;
        if (url) navigateToHandled(url);
      }
    });
  }
});
