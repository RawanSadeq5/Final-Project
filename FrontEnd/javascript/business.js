document.addEventListener("DOMContentLoaded", () => {
    // Home page navigation
    const homeLink = document.getElementById("home-link");
    homeLink.addEventListener("click", (event) => {
        event.preventDefault();
        window.location.href = "home.html"; // Replace with your actual home page URL
    });
  
    // About page navigation
    const aboutLink = document.getElementById("about-link");
    aboutLink.addEventListener("click", (event) => {
        event.preventDefault();
        window.location.href = "about.html"; // Replace with your actual about page URL
    });

    // contact us page navigation
    const contactLink = document.getElementById("contact-link");
    contactLink.addEventListener("click", (event) => {
        event.preventDefault();
        window.location.href = "contactUs.html"; // Replace with your actual about page URL
    });
});

// Toggle edit form visibility
const editDetailsButton = document.getElementById("editDetailsButton");
const editDetailsForm = document.getElementById("editDetailsForm");
const businessDetails = document.getElementById("businessDetails");
const saveDetailsButton = document.getElementById("saveDetailsButton");
const cancelEditButton = document.getElementById("cancelEditButton");

editDetailsButton.addEventListener("click", () => {
    editDetailsForm.style.display = "block";
    editDetailsButton.style.display = "none";
});

cancelEditButton.addEventListener("click", () => {
    editDetailsForm.style.display = "none";
    editDetailsButton.style.display = "block";
});

saveDetailsButton.addEventListener("click", () => {
    const name = document.getElementById("businessName").value;
    const address = document.getElementById("businessAddress").value;
    const phone = document.getElementById("businessPhone").value;
    const hours = document.getElementById("businessHours").value;

    businessDetails.innerHTML = `
        <p>שם העסק: ${name}</p>
        <p>כתובת: ${address}</p>
        <p>טלפון: ${phone}</p>
        <p>שעות פתיחה: ${hours}</p>
    `;

    editDetailsForm.style.display = "none";
    editDetailsButton.style.display = "block";
    alert("פרטי העסק עודכנו בהצלחה!");
});

// Add appointment functionality
document.getElementById("addButton").addEventListener("click", function() {
    const service = document.getElementById("service").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    const duration = document.getElementById("duration").value;
    const price = document.getElementById("price").value;
    const advance = document.getElementById("advance").value;

    if (!service || !date || !time || !duration || !price || !advance) {
        alert("נא למלא את כל השדות");
        return;
    }

    /*const table = document.getElementById("appointmentsTable");
    const row = table.insertRow();
    row.innerHTML = `
        <td>${service}</td>
        <td>${date}</td>
        <td>${time}</td>
        <td>${duration}</td>
        <td>${price} ₪</td>
        <td>לא צוין</td>
        <td>לא צוין</td>
    `;*/

    document.getElementById("addAppointmentForm").reset();
    alert("התור נוסף בהצלחה!");
});
