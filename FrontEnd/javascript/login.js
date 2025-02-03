/**
 * File: login.js
 * Description: This script manages user authentication for the NexTor appointment booking system.
 *              It handles login form submission, token storage, and user redirection upon successful authentication.
 *              Additionally, it provides client-side navigation for key pages.
 *
 * Dependencies: Works with login.html and Requires a backend API endpoint at "https://final-project-mrap.onrender.com/api/login".
 **/

document.addEventListener("DOMContentLoaded", () => {
  // Handle form submission
  document
    .getElementById("loginForm")
    .addEventListener("submit", async function (event) {
      event.preventDefault();

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      try {
        const response = await fetch(
          "https://final-project-mrap.onrender.com/api/login",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          }
        );

        const data = await response.json();
        console.log(data);

        if (response.ok) {
          // Store token in localStorage
          localStorage.setItem("authToken", data.token);

          // Redirect to the user's page
          window.location.href = data.redirect;
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error("Error logging in:", error);
        alert("An error occurred while logging in. Please try again later.");
      }
    });

  // Function to check if user is logged in
  function isLoggedIn() {
    return localStorage.getItem("authToken") !== null;
  }

  // Navigation links
  document.getElementById("about-link").addEventListener("click", (event) => {
    event.preventDefault();
    window.location.href = "about.html";
  });

  document.getElementById("contact-link").addEventListener("click", (event) => {
    event.preventDefault();
    window.location.href = "contactUs.html";
  });

  document.getElementById("home-link").addEventListener("click", (event) => {
    event.preventDefault();
    window.location.href = "home.html";
  });

  document.getElementById("forget").addEventListener("click", (event) => {
    event.preventDefault();
    window.location.href = "forgetPass.html";
  });
});
