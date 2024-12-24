document.addEventListener("DOMContentLoaded", () => {

  // About page navigation
  const aboutLink = document.getElementById("about-link");
  aboutLink.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.href = "about.html"; 
  });

  // Contact us page navigation
  const contactLink = document.getElementById("contact-link");
  contactLink.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.href = "contactUs.html"; 
  });

  // Change language to English
  const languageLink = document.getElementById("language-link");
  languageLink.addEventListener("click", (event) => {
    event.preventDefault();
    changeLanguageToEnglish();
  });

  // Function to change page text to English
  function changeLanguageToEnglish() {
    // Update navigation bar links
    document.getElementById("language-link").textContent = "Language";
    document.getElementById("home-link").textContent = "Home";
    document.getElementById("about-link").textContent = "About";
    document.getElementById("contact-link").textContent = "Contact Us";

    // Update Hero Section
    const heroHeading = document.querySelector(".hero h1");
    const heroParagraph = document.querySelector(".hero p");
    if (heroHeading) heroHeading.textContent = "Welcome to NexTor";
    if (heroParagraph)
      heroParagraph.textContent =
        "Book appointments in advance, save time, and enjoy professional and fast service.";

    // Update Hot Appointments Section
    const hotAppointmentsHeading = document.querySelector(".hot-appointments h2");
    if (hotAppointmentsHeading)
      hotAppointmentsHeading.textContent = "Hot Appointments";

    // Update Footer
    const footer = document.querySelector("footer p");
    if (footer) {
      footer.innerHTML =
        "&copy; 2024 NexTor. All rights reserved. <a href='#'>Privacy Policy</a>";
    }
  }
});
