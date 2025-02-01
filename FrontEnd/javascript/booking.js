/**
 * File: Booking.js
 * Description: This script manages the appointment booking process for the NexTor platform.
 *              It enables users to select a business service, choose an available date and time,
 *              and proceed with booking and payment. Additionally, it provides a waiting list feature
 *              for unavailable slots.
 *
 * Dependencies:
 * - Works with the appointment booking UI in the HTML frontend.
 * - Requires backend API endpoints for fetching business details, available dates, times, and appointment booking.
 * - Uses Fetch API to interact with the backend at "http://localhost:3000/api/business".
 **/

document.addEventListener("DOMContentLoaded", async function () {
  /** ---------------------------
   *   Grab DOM Elements
   *  ----------------------------*/
  const timesContainer = document.querySelector(".times-container");
  const availableTimesList = document.querySelector("#available-times");
  const detailsContainer = document.querySelector(".details-container");
  const continueButton = document.querySelector("#continue-button");
  const calendarContainer = document.querySelector(".wrapper");
  const newProceedButton = document.querySelector("#proceed-button");
  const daysTag = document.querySelector(".days");
  const currentDate = document.querySelector(".current-date");
  const prevNextIcon = document.querySelectorAll(".icons span");

  // Hide elements initially
  continueButton.style.display = "none";
  calendarContainer.style.display = "none";
  newProceedButton.style.display = "none";
  timesContainer.style.display = "none";
  detailsContainer.style.display = "none";

  // Business info elements
  const profileImage = document.getElementById("profileImage");
  const businessName = document.getElementById("businessName");
  const businessAddress = document.getElementById("businessAddress");
  const businessPhone = document.getElementById("businessPhone");
  const serviceList = document.getElementById("serviceList");

  // Clear their contents
  profileImage.innerHTML = "";
  businessName.innerHTML = "";
  businessAddress.innerHTML = "";
  serviceList.innerHTML = "";
  availableTimesList.innerHTML = "";

  /** ---------------------------
   *   Fetch Business Details
   *  ----------------------------*/
  let businessId = new URLSearchParams(window.location.search).get(
    "businessId"
  );
  if (!businessId) {
    alert("No business ID provided!");
    // Optional fallback
    businessId = "1234";
  }

  let selectedAppointmentId = null;
  let selectedFormatesDateGlobal = null;

  try {
    const response = await fetch(
      `http://localhost:3000/api/business/${businessId}/details`
    );
    const data = await response.json();

    if (response.ok) {
      const { business } = data;

      // Populate business info
      if (business.profileImage) {
        // profileImage should be an <img> for this to work
        profileImage.src = business.profileImage;
      }
      businessName.textContent = business.BusinessName;
      businessAddress.textContent = business.address;
      businessPhone.textContent = business.phoneNumber;

      // Populate service list
      serviceList.innerHTML = "";
      business.services.forEach((service) => {
        const listItem = document.createElement("li");
        const serviceLink = document.createElement("a");
        const serviceNameNode = document.createTextNode(service.name);
        const servicePrice = document.createElement("span");

        serviceLink.href = "#";
        serviceLink.classList.add("service-link");
        // Store the service name in a data attribute
        serviceLink.dataset.serviceName = service.name;

        servicePrice.classList.add("price");
        servicePrice.textContent = service.price;

        // Build DOM
        serviceLink.appendChild(serviceNameNode);
        serviceLink.appendChild(servicePrice);
        listItem.appendChild(serviceLink);
        serviceList.appendChild(listItem);
      });
    } else {
      alert(data.message || "Failed to load business details.");
    }
  } catch (error) {
    console.error("Error fetching business details:", error);
    alert("An error occurred while loading the business details.");
  }

  /** ---------------------------
   *   Select Service & Show Calendar
   *  ----------------------------*/
  let selectedServiceName = "";

  // Add click events to service links
  const serviceLinks = document.querySelectorAll(".service-link");
  serviceLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();

      // Clear existing selections
      serviceLinks.forEach((l) => l.classList.remove("selected"));
      link.classList.add("selected");

      // Save the selected service name
      selectedServiceName = link.dataset.serviceName;
      console.log("Selected service:", selectedServiceName);

      // Show the "continue" button now that a service is chosen
      continueButton.style.display = "inline-block";
    });
  });

  // When user clicks "Continue," show the calendar
  continueButton.addEventListener("click", async function () {
    if (!selectedServiceName) {
      alert("אנא בחר שירות לפני המעבר לתאריך.");
      return;
    }
    calendarContainer.style.display = "block";
    calendarContainer.scrollIntoView({ behavior: "smooth", block: "start" });

    // Render the calendar after service is selected
    await renderCalendar();
  });

  /** ---------------------------
   *   Calendar Logic
   *  ----------------------------*/
  let date = new Date();
  let currYear = date.getFullYear();
  let currMonth = date.getMonth();

  const months = [
    "ינואר",
    "פברואר",
    "מרץ",
    "אפריל",
    "מאי",
    "יוני",
    "יולי",
    "אוגוסט",
    "ספטמבר",
    "אוקטובר",
    "נובמבר",
    "דצמבר",
  ];

  // Fetch available dates from server
  async function fetchAvailableDates(year, month) {
    try {
      console.log(`Fetching available dates for ${year}-${month + 1}`);
      const response = await fetch(
        `http://localhost:3000/api/business/serviceDates/${businessId}/${selectedServiceName}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      // Convert each returned date string to day number
      return {
        availableDates: data.availableDates.map((dateStr) => {
          return new Date(dateStr).getDate();
        }),
      };
    } catch (error) {
      console.error("Error fetching available dates:", error);
      return { availableDates: [] };
    }
  }

  async function renderCalendar() {
    const { availableDates } = await fetchAvailableDates(
      currYear,
      currMonth,
      businessId,
      selectedServiceName
    );

    let firstDayOfMonth = new Date(currYear, currMonth, 1).getDay(),
      lastDateOfMonth = new Date(currYear, currMonth + 1, 0).getDate(),
      lastDayOfMonth = new Date(currYear, currMonth, lastDateOfMonth).getDay(),
      lastDateOfLastMonth = new Date(currYear, currMonth, 0).getDate();

    let liTag = "";

    // Previous month’s days
    for (let i = firstDayOfMonth; i > 0; i--) {
      liTag += `<li class="inactive">${lastDateOfLastMonth - i + 1}</li>`;
    }

    // Current month’s days
    for (let i = 1; i <= lastDateOfMonth; i++) {
      let isToday =
        i === date.getDate() &&
        currMonth === new Date().getMonth() &&
        currYear === new Date().getFullYear()
          ? "active"
          : "";
      let isAvailable = availableDates.includes(i)
        ? "available"
        : "unavailable";

      liTag += `<li class="${isToday} ${isAvailable}" data-date="${i}">${i}</li>`;
    }

    // Next month’s days
    for (let i = lastDayOfMonth; i < 6; i++) {
      liTag += `<li class="inactive">${i - lastDayOfMonth + 1}</li>`;
    }

    currentDate.innerText = `${months[currMonth]} ${currYear}`;
    daysTag.innerHTML = liTag;
  }

  // Prev / Next Month navigation
  prevNextIcon.forEach((icon) => {
    icon.addEventListener("click", async () => {
      // Adjust month based on clicked icon
      if (icon.id === "prev") {
        currMonth--;
      } else {
        currMonth++;
      }

      // Check boundaries
      if (currMonth < 0 || currMonth > 11) {
        date = new Date(currYear, currMonth, date.getDate());
        currYear = date.getFullYear();
        currMonth = date.getMonth();
      } else {
        date = new Date(); // Keep today's date if within range
      }

      await renderCalendar();
    });
  });

  /** ---------------------------
   *   Day Click (Available or Unavailable)
   *  ----------------------------*/
  const waitingListModal = document.getElementById("waiting-list-modal");
  const closeButton = document.querySelector(".close-button");
  const addToWaitlistButton = document.getElementById("add-to-waitlist-button");

  daysTag.addEventListener("click", function (event) {
    const clickedDay = event.target;
    if (clickedDay.tagName !== "LI") return; // Only act on <li> clicks

    // 1) Clear previously active day & hide 'Proceed' by default
    daysTag
      .querySelectorAll("li")
      .forEach((day) => day.classList.remove("active"));
    newProceedButton.style.display = "none";

    // 2) Compute the selected date
    const selectedDay = clickedDay.dataset.date; // The numeric day from the <li>
    selectedFormatesDateGlobal = `${currYear}-${String(currMonth + 1).padStart(
      2,
      "0"
    )}-${String(selectedDay).padStart(2, "0")}`;

    // 3) Check if day is available or unavailable
    if (clickedDay.classList.contains("available")) {
      // Mark as active & show proceed button
      clickedDay.classList.add("active");
      newProceedButton.style.display = "inline-block";
    } else if (clickedDay.classList.contains("unavailable")) {
      // Immediately show the waiting-list modal
      waitingListModal.style.display = "block";
    }
  });

  // Close waiting list modal
  closeButton.addEventListener("click", () => {
    waitingListModal.style.display = "none";
  });
  window.addEventListener("click", (event) => {
    if (event.target === waitingListModal) {
      waitingListModal.style.display = "none";
    }
  });

  // Handle adding to the waiting list
  addToWaitlistButton.addEventListener("click", async () => {
    const fullName = document.getElementById("waitlist-full-name").value.trim();
    const phoneNumber = document
      .getElementById("waitlist-phone-number")
      .value.trim();
    const email = document.getElementById("email-address-waiting").value.trim();
    const notes = document.getElementById("waitlist-notes").value.trim();

    const serviceType = selectedServiceName;
    const date = selectedFormatesDateGlobal;
    console.log(email, serviceType, date);

    if (!email || !serviceType || !date) {
      alert("Please fill required fields (email, service, date).");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/api/business/${businessId}/waiting-list`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            serviceType,
            date,
          }),
        }
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to join waiting list");
      }

      // success
      alert("נרשמת בהצלחה לרשימת ההמתנה!");
      // Hide modal, clear form, etc.
      // waitingListModal.style.display = "none";
    } catch (error) {
      console.error("Error adding to waitlist:", error);
      alert("Error adding to waitlist: " + error.message);
    }
  });

  /** ---------------------------
   *   Step 5: Select Date & Show Times
   *  ----------------------------*/
  newProceedButton.addEventListener("click", async function () {
    const selectedDateElement = document.querySelector(".days li.active");
    if (!selectedDateElement) {
      alert("Please select a date first.");
      return;
    }

    const selectedDay = selectedDateElement.dataset.date;
    // Format or use directly, e.g. "YYYY-MM-DD"
    const formattedDate = `${currYear}-${String(currMonth + 1).padStart(
      2,
      "0"
    )}-${String(selectedDay).padStart(2, "0")}`;

    selectedFormatesDateGlobal = formattedDate;
    //console.log("We added the global thing");
    //console.log(selectedFormatesDateGlobal);

    const { availableAppointments } = await fetchAvailableTimes(formattedDate);
    console.log(availableAppointments);

    // Populate the times in your UI
    availableTimesList.innerHTML = "";
    availableAppointments.forEach((appt) => {
      const li = document.createElement("li");
      li.textContent = appt.time;
      // Use a data attribute to store the appointmentId
      li.dataset.appointmentId = appt._id;

      availableTimesList.appendChild(li);
    });

    timesContainer.style.display = "block";
    timesContainer.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  // Mock fetch for available times
  // Replace with your real endpoint if needed
  async function fetchAvailableTimes(date) {
    if (!businessId || !selectedServiceName || !date) {
      return { availableTimes: [] };
    }

    try {
      const response = await fetch(
        `http://localhost:3000/api/business/serviceTimes/${businessId}/${selectedServiceName}/${date}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const res = await response.json();
      console.log(res);
      return res; // { availableTimes: [...] }
    } catch (error) {
      console.error("Error fetching times:", error);
      return { availableTimes: [] };
    }
  }

  /** ---------------------------
   *   Step 6: Select Time
   *  ----------------------------*/
  availableTimesList.addEventListener("click", function (event) {
    if (event.target.tagName === "LI") {
      // Clear old "selected"
      availableTimesList
        .querySelectorAll("li")
        .forEach((time) => time.classList.remove("selected"));

      event.target.classList.add("selected");
      selectedAppointmentId = event.target.dataset.appointmentId;
      detailsContainer.style.display = "block";
      detailsContainer.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });

  /** ---------------------------
   *   Step 7: Proceed to Payment
   *  ----------------------------*/
  const paymentButton = document.querySelector("#payment-button");
  paymentButton.addEventListener("click", async (event) => {
    event.preventDefault();
    // Basic validation
    const fullName = document.querySelector("#full-name").value.trim();
    const emailAdress = document
      .querySelector("#email-address-input")
      .value.trim();
    const phoneNumber = document.querySelector("#phone-number").value.trim();
    const notes = document.querySelector("#notes").value.trim();

    if (!fullName || !phoneNumber || !emailAdress) {
      alert("אנא מלא את כל השדות הנדרשים");
      return;
    }
    if (!selectedAppointmentId) {
      alert("No appointment selected! Please pick a time slot first.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/api/business/book/${selectedAppointmentId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fullName,
            email: emailAdress,
            phoneNumber,
            notes,
          }),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Booking failed");
      }
      console.log("Booking success:", data);
      window.location.href = `payment.html?businessId=${businessId}`;
      //window.location.href = "payment.html";
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("Error booking appointment: " + error.message);
    }
  });

  /** ---------------------------
   *   Navigation Links
   *  ----------------------------*/
  const aboutLink = document.getElementById("about-link");
  if (aboutLink) {
    aboutLink.addEventListener("click", (event) => {
      event.preventDefault();
      window.location.href = "about.html";
    });
  }

  const contactLink = document.getElementById("contact-link");
  if (contactLink) {
    contactLink.addEventListener("click", (event) => {
      event.preventDefault();
      window.location.href = "contactUs.html";
    });
  }

  const homeLink = document.getElementById("home-link");
  if (homeLink) {
    homeLink.addEventListener("click", (event) => {
      event.preventDefault();
      window.location.href = "home.html";
    });
  }
});
