window.addEventListener("DOMContentLoaded", () => {
  const themeBtn = document.getElementById("theme-btn");
  const htmlTag = document.documentElement;

  themeBtn.innerHTML = htmlTag.classList.contains("dark")
    ? '<i class="fa-solid fa-sun"></i>'
    : '<i class="fa-solid fa-moon"></i>';

  // Toggle theme button
  themeBtn.addEventListener("click", () => {
    htmlTag.classList.toggle("dark");
    const currentTheme = htmlTag.classList.contains("dark") ? "dark" : "light";
    themeBtn.innerHTML =
      currentTheme === "dark"
        ? '<i class="fa-solid fa-sun"></i>'
        : '<i class="fa-solid fa-moon"></i>';
    localStorage.setItem("theme", currentTheme);
  });

  // Update footer
  const footerText = document.querySelector("footer p");
  footerText.textContent = `${
    footerText.textContent
  } ${new Date().getFullYear()}`;

  // Toggle mobile menu
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.querySelector(".mobile-menu nav");
  mobileMenuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("active");
    if (mobileMenu.classList.contains("active")) {
      mobileMenuBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
      document.body.style.overflow = "hidden";
    } else {
      mobileMenuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
      document.body.style.overflow = "auto";
    }
  });

  // Close mobile menu when a link is clicked
  mobileMenu.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      mobileMenu.classList.remove("active");
      mobileMenuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
      document.body.style.overflow = "auto";
    }
  });
});
