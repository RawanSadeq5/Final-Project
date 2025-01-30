/**
 * File: signup.js
 * Description: This script handles navigation and user registration for the NexTor appointment booking system.
 *              It includes event listeners for page navigation, form validation, and sending user registration
 *              data to the server. If the signup process is successful, a popup notification appears, prompting
 *              the user to log in.
 * Dependencies: Works with signup.html and requires a backend API endpoint at "http://localhost:3000/api/signup".
 **/

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

  // Home page navigation
  const homeLink = document.getElementById("home-link");
  homeLink.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.href = "home.html";
  });

  // Login page navigation
  const loginLink = document.getElementById("login-link");
  loginLink.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.href = "login.html";
  });
});

const createAccountButton = document.getElementById("signup");
const popup = document.getElementById("popup");
const loginPopupButton = document.getElementById("loginPopupButton");

// Show the popup when "התחבר כאן" is clicked on the popup
loginPopupButton.addEventListener("click", function () {
  window.location.href = "../pages/login.html"; // Redirect to login.html
});

// Handle sign-up
createAccountButton.addEventListener("click", async function (event) {
  event.preventDefault();

  // Get input values
  const fullName = document.querySelector("#full-name").value.trim();
  const emailAddress = document.querySelector("#email").value.trim();
  const password = document.querySelector("#password").value.trim();

  // Validate inputs
  if (!fullName || !emailAddress || !password) {
    alert("אנא מלא את כל השדות הנדרשים"); // Show an alert if fields are empty
    return;
  }

  try {
    // Send signup request to the server
    const response = await fetch("http://localhost:3000/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName,
        emailAddress,
        password,
      }),
    });

    // Check if the response from the server was OK
    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);

    if (data.status === true) {
      // If the server confirms signup success
      document.body.classList.add("popup-active");
      popup.style.display = "block";
    } else {
      // If the server says something went wrong
      alert(data.message || "הנתונים שהזנת אינם נכונים, נסה שוב");
    }
  } catch (error) {
    console.error("Sign-up error:", error);
    alert("שגיאה בהתחברות לשרת. אנא נסה שוב מאוחר יותר");
  }
});
