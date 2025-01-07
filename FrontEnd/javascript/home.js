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

  // add business page navigation
  const addBusinessLink = document.getElementById("addBusiness-link");
  addBusinessLink.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.href = "addBusiness.html";
  });

  // add business page navigation
  const loginLink = document.getElementById("logIn-link");
  loginLink.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.href = "login.html";
  });

  // Function to change page text to English
  function changeLanguageToEnglish() {
    // Update navigation bar links
    document.getElementById("language-link").textContent = "Language";
    document.getElementById("home-link").textContent = "Home";
    document.getElementById("about-link").textContent = "About";
    document.getElementById("contact-link").textContent = "Contact Us";

    // Update Hero Section
    const heroHeading = document.querySelector(".hero h1");
    const heroParagraph = document.querySelector(".hero p");
    if (heroHeading) heroHeading.textContent = "Welcome to NexTor";
    if (heroParagraph)
      heroParagraph.textContent =
        "Book appointments in advance, save time, and enjoy professional and fast service.";

    // Update Hot Appointments Section
    const hotAppointmentsHeading = document.querySelector(
      ".hot-appointments h2"
    );
    if (hotAppointmentsHeading)
      hotAppointmentsHeading.textContent = "Hot Appointments";

    // Update Footer
    const footer = document.querySelector("footer p");
    if (footer) {
      footer.innerHTML =
        "&copy; 2024 NexTor. All rights reserved. <a href='#'>Privacy Policy</a>";
    }
  }
});

function Fetch(url, data) {
  return new Promise((resolve, reject) => {
    console.log(`Fetching data from: ${url}`);
    setTimeout(() => {
      resolve(data);
    }, 500);
  });
}

document
  .getElementById("search-button")
  .addEventListener("click", async (e) => {
    e.preventDefault();
    const dataContainer = document.getElementById("businesses-container");
    dataContainer.innerHTML = "<p>Loading...</p>";

    try {
      const data1 = [
        { id: 1, name: "Product A" },
        { id: 2, name: "Product B" },
        { id: 3, name: "Product C" },
      ];
      const data = await Fetch("https://HananRawanSite.com/api/data", data1);
      dataContainer.innerHTML = ""; // Clear loading state
      const ul = document.createElement("ul");

      data.forEach((item) => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.textContent = `${item.name}`;
        a.href = "../pages/booking.html";
        li.appendChild(a);
        ul.appendChild(li);
      });
      dataContainer.appendChild(ul);
    } catch (error) {
      dataContainer.innerHTML = "<p>Error loading data.</p>";
      console.error(error);
    }
  });
