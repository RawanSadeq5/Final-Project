/**
 * File: forgetPass.js
 * Description: This script handles the password reset functionality for the NexTor appointment booking system.
 *              It includes navigation between different pages, form validation, sending password reset requests
 *              to the backend, and displaying a success modal upon successful password change.
 * Dependencies: Requires a backend API at "http://localhost:3000/api/forgotPassword" for handling password reset requests.
 *               Works with forgetPass.html.
 **/

document.addEventListener("DOMContentLoaded", () => {
  // About page navigation
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

  // Handle "איפוס סיסמה" button
  const resetButton = document.querySelector("button[type='submit']");
  resetButton.addEventListener("click", async (event) => {
    event.preventDefault();

    const emailInput = document.querySelector("#email");
    const passwordInput = document.querySelector("#password");
    const confirmPasswordInput = document.querySelector("#confirmPassword");

    // Validate elements exist
    if (!emailInput || !passwordInput || !confirmPasswordInput) {
      alert("One or more required input fields are missing in the HTML!");
      return;
    }

    const emailAddress = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();

    // Validate inputs
    if (!emailAddress || !password || !confirmPassword) {
      alert("אנא מלא את כל השדות הנדרשים");
      return;
    }

    if (password !== confirmPassword) {
      alert("הסיסמאות אינן תואמות");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/forgotPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ emailAddress, password }),
      });

      const data = await response.json();

      if (response.ok && data.status) {
        createSuccessModal();
      } else {
        alert(data.message || "לא היה ניתן לאפס את הסיסמה, נסה שוב");
      }
    } catch (error) {
      console.error("Reset password error:", error);
      alert("שגיאה בהתחברות לשרת. אנא נסה שוב מאוחר יותר");
    }

    function createSuccessModal() {
      const successModal = document.createElement("div");
      successModal.classList.add("modal");
      successModal.innerHTML = `
        <div class="modal-content">
          <p>הסיסמה שונתה בהצלחה</p>
          <button class="modal-btn close">סגור</button>
        </div>
      `;
      document.body.appendChild(successModal);

      const closeButton = successModal.querySelector(".close");
      closeButton.addEventListener("click", () => {
        successModal.remove();
        window.location.href = "login.html";
      });
    }
  });
});
