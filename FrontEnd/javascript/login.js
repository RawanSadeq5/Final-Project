// Ensure DOM is fully loaded
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

    // Toggle dark mode functionality
    const darkModeToggle = document.createElement("button");
    darkModeToggle.textContent = "Toggle Dark Mode";
    darkModeToggle.style.position = "fixed";
    darkModeToggle.style.bottom = "10px";
    darkModeToggle.style.right = "10px";
    darkModeToggle.style.padding = "0.5rem 1rem";
    darkModeToggle.style.backgroundColor = "#921A40";
    darkModeToggle.style.color = "#fff";
    darkModeToggle.style.border = "none";
    darkModeToggle.style.borderRadius = "0.375rem";
    darkModeToggle.style.cursor = "pointer";

    document.body.appendChild(darkModeToggle);

    darkModeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark");
    });
});
