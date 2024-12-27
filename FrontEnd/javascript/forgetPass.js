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
    resetButton.addEventListener("click", (event) => {
        event.preventDefault();

        // Create success modal
        const successModal = document.createElement("div");
        successModal.classList.add("modal");
        successModal.innerHTML = `
            <div class="modal-content">
                <p>הסיסמה שונתה בהצלחה</p>
                <button class="modal-btn close">סגור</button>
            </div>
        `;
        document.body.appendChild(successModal);

        // Add close button event listener
        const closeButton = successModal.querySelector(".close");
        closeButton.addEventListener("click", () => {
            successModal.remove();
            window.location.href = "login.html"; // Redirect to login page
        });
    });
});
