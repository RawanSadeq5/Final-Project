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
  
    // About page navigation
    const homeLink = document.getElementById("home-link");
    homeLink.addEventListener("click", (event) => {
      event.preventDefault();
      window.location.href = "home.html"; 
    });

    // login page navigation
    const loginLink = document.getElementById("login-link");
    loginLinkLink.addEventListener("click", (event) => {
      event.preventDefault();
      window.location.href = "login.html"; 
    });
  
});