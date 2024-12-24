document.addEventListener("DOMContentLoaded", () => {
    // Home page navigation
    const homeLink = document.getElementById("home-link");
    homeLink.addEventListener("click", (event) => {
      event.preventDefault();
      window.location.href = "home.html"; // Replace with your actual home page URL
    });
  
    // Contact us page navigation
    const contactLink = document.getElementById("contact-link");
    contactLink.addEventListener("click", (event) => {
      event.preventDefault();
      window.location.href = "contactUs.html"; // Replace with your actual contact page URL
    });
  
    // Change language to English
    const languageLink = document.getElementById("language-link");
    languageLink.addEventListener("click", (event) => {
      event.preventDefault();
      changeLanguageToEnglish();
    });
  
    // Function to change page text to English
    function changeLanguageToEnglish() {
      // Update nav bar links
      document.getElementById("language-link").textContent = "Language";
      document.getElementById("home-link").textContent = "Home";
      document.getElementById("about-link").textContent = "About";
      document.getElementById("contact-link").textContent = "Contact Us";
  
      // Update section headings and paragraphs
      document.querySelector(".about-section h2").textContent = "Who Are We?";
      document.querySelector(".about-section p").textContent =
        "NexTor is an innovative platform for scheduling appointments easily and conveniently. We believe in fast, reliable, and professional service for every client. Our goal is to save you time and avoid unnecessary waiting. The system is available 24/7 on any internet-connected device, allowing you to manage your business anytime, anywhere.";
  
      document.querySelector(".mission-section h2").textContent = "Our Vision";
      document.querySelector(".mission-section p").innerHTML =
        "Our vision is to connect businesses and clients, creating an enhanced service experience for both sides. With NexTor, we provide a platform that upgrades how appointments are scheduled. Our goal is to enable efficient appointment management, reduce cancellations, and improve customer satisfaction. Additionally, our platform provides SMS reminders to minimize cancellations, increase business revenue, and eliminate misunderstandings with clients.";
  
      document.querySelector(".team-section h2").textContent = "Our Team";
      document.querySelector(".team-section p").innerHTML =
        "Our team consists of experts in technology, service, and marketing, working together to bring a real change in appointment management. We are proud of our diverse and talented team that combines knowledge, innovation, and a passion for quality service.";
  
      // Update footer
      document.querySelector("footer p").innerHTML =
        "&copy; 2024 NexTor. All rights reserved.";
    }
  });
  