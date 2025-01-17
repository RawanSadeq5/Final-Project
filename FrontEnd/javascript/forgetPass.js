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
    const emailAddress = document.querySelector("#email").value.trim();
    const password = document.querySelector("#password").value.trim();

    if (!emailAddress || !password) {
      alert("אנא מלא את כל השדות הנדרשים");
      return;
    }

    try {
      // Send reset request to backend
      const response = await fetch("http://localhost:3000/api/forgotPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ emailAddress, password }),
      });

      if (!response.ok) {
        // For non-2xx responses
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();

      if (data.status === true) {
        // Password changed successfully: show success modal
        createSuccessModal();
      } else {
        // If server returned an error message
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
