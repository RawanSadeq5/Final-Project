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
  
    // home page navigation
    const homeLink = document.getElementById("home-link");
    homeLink.addEventListener("click", (event) => {
      event.preventDefault();
      window.location.href = "home.html"; 
    });

    // login page navigation
    const loginLink = document.getElementById("login-link");
    loginLink.addEventListener("click", (event) => {
      event.preventDefault();
      window.location.href = "login.html"; 
    });
    

});

const createAccountButton = document.getElementById('signup');
const popup = document.getElementById('popup');

// Show the popup
createAccountButton.addEventListener('click', function (event) {
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
    document.body.classList.add('popup-active');
    popup.style.display = 'block';
});

// Redirect to login.html when "התחבר כאן" is clicked
const loginPopupButton = document.getElementById('loginPopupButton');

loginPopupButton.addEventListener('click', function() {
    window.location.href = '../pages/login.html'; // Redirect to login.html
});



    

