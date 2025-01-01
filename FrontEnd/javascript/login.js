document.addEventListener("DOMContentLoaded", () => {
    // Reference to the form elements
    const form = document.querySelector("form");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    // Handle form submission
    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent default form submission

        // Get input values
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

        // Simulate login success
        alert(`Login successful for: ${email}`);
    });

    // Email validation function
    function validateEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

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

  // home page navigation
  const homeLink = document.getElementById("home-link");
  homeLink.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.href = "home.html"; 
  });

  // my appointments page navigation
  const appointmentLink = document.getElementById("submit");
  appointmentLink.addEventListener("click", (event) => {
    const emailAddress = document.querySelector("#email").value.trim();
    const password = document.querySelector("#password").value.trim();

    if (!emailAddress || !password) {
        alert("אנא מלא את כל השדות הנדרשים");
        return;
    }
    event.preventDefault();
    window.location.href = "myAppointments.html"; 
  });

  // my forgetpass page navigation
  const forgetLink = document.getElementById("forget");
  forgetLink.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.href = "forgetPass.html"; 
  });

});
