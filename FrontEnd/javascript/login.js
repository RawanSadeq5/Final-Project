document.addEventListener("DOMContentLoaded", () => {
  //const form = document.querySelector("form");
  //const emailInput = document.getElementById("email");
  //const passwordInput = document.getElementById("password");

  // Handle form submission
  document
    .getElementById("loginForm")
    .addEventListener("submit", async function (event) {
      event.preventDefault();

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      try {
        const response = await fetch("http://localhost:3000/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

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
