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
          window.location.href = data.redirect;
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error("Error logging in:", error);
        alert("An error occurred while logging in. Please try again later.");
      }
    });

  // Email validation function
  /*function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }*/

  // Fetch function for API requests
  /*async function Fetch(url, data) {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseBody = await response.json();

    // Return the response body, even if the response status is not OK
    return {
      ok: response.ok,
      status: response.status,
      data: responseBody,
    };
  }*/

  // Navigation links
  const aboutLink = document.getElementById("about-link");
  aboutLink.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.href = "about.html";
  });

  const contactLink = document.getElementById("contact-link");
  contactLink.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.href = "contactUs.html";
  });

  const homeLink = document.getElementById("home-link");
  homeLink.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.href = "home.html";
  });

  const forgetLink = document.getElementById("forget");
  forgetLink.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.href = "forgetPass.html";
  });
});
