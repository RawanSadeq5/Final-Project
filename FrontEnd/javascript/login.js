document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  // Handle form submission
  form.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent default form submission

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    // Basic validation
    if (!email || !validateEmail(email)) {
      alert("Please enter a valid email address.");
      emailInput.focus();
      return;
    }

    if (!password) {
      alert("Please enter your password.");
      passwordInput.focus();
      return;
    }

    try {
      // Use the Fetch function to communicate with the server
      const response = await Fetch("http://localhost:3000/api/login", {
        email,
        password,
      });

      if (response.ok) {
        alert("הכניסה בוצעה בהצלחה!");

        // Navigate based on user type
        if (response.data.userType === "businessOwner") {
          window.location.href = "business.html";
        } else {
          window.location.href = "myAppointments.html";
        }
      } else {
        // Handle invalid login details or server error
        alert(
          response.data.message ||
            "Invalid email or password. Please try again."
        );
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("An error occurred while logging in. Please try again later.");
    }
  });

  // Email validation function
  function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  // Fetch function for API requests
  async function Fetch(url, data) {
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
  }

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
