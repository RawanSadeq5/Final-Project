/**
 * File: home.js
 * Description: This script manages various interactive elements on the NexTor home page, including:
 *              - Navigation between different pages (about, contact, add business, login)
 *              - "Bring a Friend" modal functionality with link copying
 *              - Handling search functionality for businesses, services, and areas
 *              - Fetching and displaying hot appointment deals dynamically
 *              - Managing appointment booking interactions, including payment redirection
 *              - Closing the appointment details container when dismissed
 * Dependencies: Requires a backend API at "http://localhost:3000/api" for fetching businesses and hot appointments.
 *               Works with home.html.
 **/

document.addEventListener("DOMContentLoaded", async () => {
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

  // log in page navigation
  const loginLink = document.getElementById("logIn-link");
  loginLink.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.href = "login.html";
  });

  const bringFriendButton = document.getElementById("bringFriend-link");
  const modal = document.getElementById("friend-modal");
  const closeModal = document.getElementById("close-modal");
  const copyButton = document.getElementById("copy-button");
  const copyInput = document.getElementById("copy-link");

  // Show the modal
  bringFriendButton.addEventListener("click", () => {
    modal.style.display = "block";
  });

  // Close the modal
  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Copy the link
  copyButton.addEventListener("click", () => {
    copyInput.select();
    copyInput.setSelectionRange(0, 99999); // For mobile devices
    document.execCommand("copy");
    alert("הקישור הועתק!");
  });

  // Close modal on outside click
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  const paymentButton = document.querySelector("#payment-button");
  paymentButton.addEventListener("click", (event) => {
    console.log(event.target);
    const fullName = document.querySelector("#full-name").value.trim();
    const phoneNumber = document.querySelector("#phone-number").value.trim();
    const notes = document.querySelector("#notes").value.trim();

    if (!fullName || !phoneNumber) {
      alert("אנא מלא את כל השדות הנדרשים");
      return;
    }

    event.preventDefault();
    // Get the businessId from the button's data attribute
    const businessId = event.target.dataset.businessId;

    // Navigate to payment.html with the businessId as a query parameter
    window.location.href = `payment.html?businessId=${businessId}`;
  });

  document
    .getElementById("search-button")
    .addEventListener("click", async (e) => {
      e.preventDefault();

      const name = document.getElementById("name-input").value.trim();
      const service = document.getElementById("service-input").value.trim();
      const area = document.getElementById("area-input").value.trim();

      // Ensure at least one field is filled
      if (!name && !service && !area) {
        alert("נא להזין לפחות אחד מהשדות לחיפוש");
        return;
      }

      const dataContainer = document.getElementById("businesses-container");
      dataContainer.style.display = "block";
      dataContainer.innerHTML = "<p>טוען...</p>";

      try {
        const queryParams = new URLSearchParams();
        if (name) queryParams.append("name", name);
        if (service) queryParams.append("service", service);
        if (area) queryParams.append("area", area);

        const response = await fetch(
          `http://localhost:3000/api/search?${queryParams.toString()}`
        );
        const result = await response.json();
        console.log(result.businesses);

        if (!result.success || result.businesses.length === 0) {
          dataContainer.innerHTML = "<p>לא נמצאו תוצאות</p>";
          return;
        }

        dataContainer.innerHTML = "";
        const ul = document.createElement("ul");

        result.businesses.forEach((business) => {
          const li = document.createElement("li");
          const a = document.createElement("a");
          a.textContent = `${business.BusinessName} - ${business.address}`;
          a.href = `booking.html?businessId=${business._id}`;
          li.appendChild(a);
          ul.appendChild(li);
        });

        dataContainer.appendChild(ul);
      } catch (error) {
        console.error("Error fetching data:", error);
        dataContainer.innerHTML = "<p>שגיאה בטעינת הנתונים</p>";
      }
    });

  try {
    const response = await fetch("http://localhost:3000/api/appointments/hot");
    const result = await response.json();

    if (!result.success || result.hotAppointments.length === 0) {
      console.log("No hot appointments found.");
      return;
    }

    const appointmentGridDiv = document.getElementById("appointment-grid");
    appointmentGridDiv.innerHTML = ""; // Clear loading state

    result.hotAppointments.forEach((item) => {
      const carddiv = document.createElement("div");
      carddiv.className = "appointment-card";

      const infodiv = document.createElement("div");
      infodiv.className = "appointment-info";

      const h2 = document.createElement("h2");
      h2.innerHTML = item.BusinessName;

      const labelAddress = document.createElement("label");
      labelAddress.innerHTML = `<strong>כתובת:</strong> ${item.Address}`;

      const labelServiceType = document.createElement("label");
      labelServiceType.innerHTML = `<strong>סוג שירות:</strong> ${item.ServiceType}`;

      const labelDate = document.createElement("label");
      labelDate.innerHTML = `<strong>תאריך:</strong> ${item.Date}`;

      const labelTime = document.createElement("label");
      labelTime.innerHTML = `<strong>שעה:</strong> ${item.Time}`;

      const labelDiscountPrice = document.createElement("p");
      labelDiscountPrice.innerHTML = `<strong>מחיר אחרי הנחה:</strong> ${item.discountPrice}₪`;
      labelDiscountPrice.className = "price-discounted";

      const labelOriginalPrice = document.createElement("p");
      labelOriginalPrice.innerHTML = `<strong>מחיר לפני הנחה:</strong> ${item.originalPrice}₪`;
      labelOriginalPrice.className = "price-original";

      const submitButtonElement = document.createElement("button");
      submitButtonElement.textContent = "הזמן עכשיו";

      const hiddenBusinessId = document.createElement("p");
      hiddenBusinessId.textContent = item.businessId;
      hiddenBusinessId.style.display = "none";
      hiddenBusinessId.className = "hiddenBusinessId";

      // Add click event for the button
      submitButtonElement.addEventListener("click", () => {
        const detailsContainer = document.getElementById("details-container");
        appointmentGridDiv.insertAdjacentElement("afterend", detailsContainer);
        detailsContainer.style.display = "block";
        detailsContainer.scrollIntoView({ behavior: "smooth", block: "start" });

        const paymentButton = document.querySelector("#payment-button");
        paymentButton.dataset.businessId = item.businessId;
      });

      infodiv.appendChild(h2);
      infodiv.appendChild(labelAddress);
      infodiv.appendChild(labelServiceType);
      infodiv.appendChild(labelDate);
      infodiv.appendChild(labelTime);
      infodiv.appendChild(labelDiscountPrice);
      infodiv.appendChild(labelOriginalPrice);
      infodiv.appendChild(submitButtonElement);
      infodiv.appendChild(hiddenBusinessId);
      console.log(infodiv);

      carddiv.appendChild(infodiv);
      appointmentGridDiv.appendChild(carddiv);
    });
  } catch (error) {
    console.error("Error fetching hot appointments:", error);
  }

  // Close details container when "X" is clicked
  const closeButton = document.getElementById("close-details");
  closeButton.addEventListener("click", () => {
    const detailsContainer = document.getElementById("details-container");
    detailsContainer.style.display = "none";
  });
});
