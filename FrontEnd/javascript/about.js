document.addEventListener("DOMContentLoaded", () => {
  // Home page navigation
  const homeLink = document.getElementById("home-link");
  homeLink.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.href = "home.html"; // Replace with your actual home page URL
  });

  // Contact us page navigation
  const contactLink = document.getElementById("contact-link");
  contactLink.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.href = "contactUs.html"; // Replace with your actual contact page URL
  });
});
