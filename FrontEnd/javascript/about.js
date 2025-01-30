/**
 * File: about.js
 * Description: This script handles basic page navigation for the NexTor appointment booking system.
 *              It includes event listeners for navigating between the home page and the contact page
 *              by preventing default link behavior and redirecting users to the respective pages.
 * Dependencies: Works with multiple HTML files that contain navigation elements.
 **/

document.addEventListener("DOMContentLoaded", () => {
  // Home page navigation
  const homeLink = document.getElementById("home-link");
  homeLink.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.href = "home.html";
  });

  // Contact us page navigation
  const contactLink = document.getElementById("contact-link");
  contactLink.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.href = "contactUs.html";
  });
});
