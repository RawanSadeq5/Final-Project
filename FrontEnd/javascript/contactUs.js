document.addEventListener("DOMContentLoaded", () => {
  // Home page navigation
  const homeLink = document.getElementById("home-link");
  homeLink.addEventListener("click", (event) => {
      event.preventDefault();
      window.location.href = "home.html"; // Replace with your actual home page URL
  });

  // About page navigation
  const contactLink = document.getElementById("about-link");
  contactLink.addEventListener("click", (event) => {
      event.preventDefault();
      window.location.href = "about.html"; // Replace with your actual about page URL
  });

  // Handle "שלח" button click
  const contactForm = document.getElementById("contact-form");
  contactForm.addEventListener("submit", (event) => {
      event.preventDefault(); // Prevent form submission

      // Create success modal
      const successModal = document.createElement("div");
      successModal.classList.add("modal");
      successModal.innerHTML = `
          <div class="modal-content">
              <p>תודה שפנית אילנו</p>
              <p>הפרטים נשלחו בהצלחה, אנו ניצור איתך קשר בהקדם האפשרי.</p>
              <button class="modal-btn close">סגור</button>
          </div>
      `;
      document.body.appendChild(successModal);

      // Add close button event listener
      const closeButton = successModal.querySelector(".close");
      closeButton.addEventListener("click", () => {
          successModal.remove(); // Remove the modal
          window.location.href = "home.html"; // Redirect to home page
      });
  });
});
