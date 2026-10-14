/* Page-specific interactions. Shared navigation and footer are loaded explicitly. */

document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".reveal-mission");

  if (!("IntersectionObserver" in window)) {
    elements.forEach(element => element.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  elements.forEach(element => observer.observe(element));
});


/* =========================================================
   DIVINE MOONLIGHT — INTERACTION ENGINE
   Handles colored service icons and gentle scroll reveals.
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* Swap each monochrome service icon for its matching color icon on hover. */
  document.querySelectorAll(".service-grid .card").forEach(card => {
    const icon = card.querySelector(".icon img");
    if (!icon) return;

    const original = icon.getAttribute("src");
    if (!original || !original.includes("media/icons/")) return;

    const fileName = original.split("/").pop();

    /* The uploaded colored artwork uses its own filenames. */
    const coloredIcons = {
      "heart-care-icon.svg": "heart-care-colored.svg",
      "brain-line-icon.svg": "brain-colored.svg",
      "heartbeat-icon.svg": "heartbeat-colored.svg",
      "nurse-cap.svg": "nurse-cap-colored.svg",
      "housekeeping-icon.svg": "housekeeping-colored.svg",
      "pasta-icon.svg": "pasta-colored.svg",
      "diary-icon.svg": "diary-colored.svg",
      "car-icon.svg": "car-colored.svg"
    };

    const coloredFileName = coloredIcons[fileName];
    if (!coloredFileName) return;

    const colorSrc = "media/colors/" + coloredFileName;

    /* Preload so the hover feels instant. */
    const preload = new Image();
    preload.src = colorSrc;

    const restore = () => {
      if (!card.matches(":hover") && document.activeElement !== card) {
        icon.src = original;
      }
    };

    card.addEventListener("mouseenter", () => {
      icon.src = colorSrc;
    });

    card.addEventListener("mouseleave", restore);
    card.addEventListener("focusin", () => {
      icon.src = colorSrc;
    });
    card.addEventListener("focusout", restore);
  });

  /* Add a restrained reveal animation to common content blocks. */
  const revealSelectors = [
    ".service-grid .card",
    ".steps .step",
    ".two-col",
    ".split-dark",
    ".roles .role",
    ".areas li"
  ];

  const revealItems = [];
  revealSelectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(element => {
      if (
        element.classList.contains("reveal") ||
        element.classList.contains("reveal-mission") ||
        element.classList.contains("site-reveal") ||
        element.classList.contains("dm-reveal")
      ) return;
      element.classList.add("dm-reveal");
      revealItems.push(element);
    });
  });

  if (!("IntersectionObserver" in window)) {
    revealItems.forEach(element => element.classList.add("dm-visible"));
    return;
  }

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("dm-visible");
      observer.unobserve(entry.target);
    });
  }, {
    threshold: 0.12,
    rootMargin: "0px 0px -45px 0px"
  });

  revealItems.forEach((element, index) => {
    const group = element.closest(".service-grid, .steps, .home-mission-inner");
    if (group) {
      const siblings = Array.from(group.children).filter(child =>
        child.classList.contains("dm-reveal")
      );
      const position = siblings.indexOf(element);
      if (position >= 0 && position < 4) {
        element.classList.add("dm-delay-" + (position + 1));
      }
    }
    revealObserver.observe(element);
  });
});


/* =========================================================
   DIVINE MOONLIGHT — FLOATING WHATSAPP CONTACT
   Set whatsappNumber below to digits only,
   including country code, when the owner's number is ready.
   Example: "19195551234"
   ========================================================= */
(function initFloatingWhatsApp() {
  const whatsappNumber = "19843890943";

  function addWhatsAppButton() {
    if (document.getElementById("dm-whatsapp-float")) return;

    const button = document.createElement("a");
    button.id = "dm-whatsapp-float";
    button.className = "dm-whatsapp-float";
    button.href = whatsappNumber
      ? "https://wa.me/" + whatsappNumber + "?text=" +
        encodeURIComponent("Hello, I’m interested in talking with Divine Moonlight about your home care services. I found your website and would like to learn more about your services, availability, and how to get started. WhatsApp is the best way to reach me. Thank you!")
      : "#";
    button.target = whatsappNumber ? "_blank" : "_self";
    button.rel = "noopener noreferrer";
    button.setAttribute("aria-label", whatsappNumber ? "Contact Divine Moonlight on WhatsApp" : "WhatsApp contact number coming soon");
    button.innerHTML = `
      <span class="dm-whatsapp-label">Chat with us</span>
      <span class="dm-whatsapp-icon" aria-hidden="true">
        <svg viewBox="0 0 32 32" role="img">
          <path d="M16 3.5a12.4 12.4 0 0 0-10.7 18.7L4 28.7l6.7-1.2A12.4 12.4 0 1 0 16 3.5Zm0 22.3a9.9 9.9 0 0 1-5-1.35l-.36-.22-3.98.72.73-3.87-.24-.39A9.9 9.9 0 1 1 16 25.8Zm5.43-7.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.03 1.01-1.03 2.46s1.05 2.85 1.2 3.05c.15.2 2.06 3.15 4.99 4.42.7.3 1.25.48 1.68.61.7.22 1.33.19 1.83.11.56-.08 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z"/>
        </svg>
      </span>
    `;

    if (!whatsappNumber) {
      button.classList.add("dm-whatsapp-pending");
      button.addEventListener("click", event => {
        event.preventDefault();
      });
    }

    document.body.appendChild(button);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", addWhatsAppButton);
  } else {
    addWhatsAppButton();
  }
})();

