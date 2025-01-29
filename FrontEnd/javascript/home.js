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
    const fullName = document.querySelector("#full-name").value.trim();
    const phoneNumber = document.querySelector("#phone-number").value.trim();
    const notes = document.querySelector("#notes").value.trim();

    if (!fullName || !phoneNumber) {
      alert("אנא מלא את כל השדות הנדרשים");
      return;
    }

    event.preventDefault();
    window.location.href = "payment.html";
  });

  /*const data1 = [
      { id: 1, name: "Product A" },
      { id: 2, name: "Product B" },
      { id: 3, name: "Product C" },
    ];

    const data2 = [
      {
        BusinessName: "Salam Nails",
        Address: "אנילביץ 9, עכו",
        ServiceType: "לק גל",
        originalPrice: 300,
        discountPrice: 150,
        Date: "12/01/2025",
        Time: "12:05",
        DurationInMinutes: 120,
      },
      {
        BusinessName: "Hanan Nails",
        Address: "אנילביץ 9, עכו",
        ServiceType: "לק גל",
        originalPrice: 200,
        discountPrice: 120,
        Date: "15/01/2025",
        Time: "12:30",
        DurationInMinutes: 60,
      },
    ];*/

  /*const hotAppointmentsdata = await Fetch(
      "https://HananRawanSite.com/api/data",
      data2
    );*/

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

        if (!result.success || result.businesses.length === 0) {
          dataContainer.innerHTML = "<p>לא נמצאו תוצאות</p>";
          return;
        }

        dataContainer.innerHTML = "";
        const ul = document.createElement("ul");

        result.businesses.forEach((business) => {
          const li = document.createElement("li");
          li.textContent = `${business.name} - ${business.address}`;
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

      // Add click event for the button
      submitButtonElement.addEventListener("click", () => {
        const detailsContainer = document.getElementById("details-container");
        appointmentGridDiv.insertAdjacentElement("afterend", detailsContainer);
        detailsContainer.style.display = "block";
        detailsContainer.scrollIntoView({ behavior: "smooth", block: "start" });
      });

      infodiv.appendChild(h2);
      infodiv.appendChild(labelAddress);
      infodiv.appendChild(labelServiceType);
      infodiv.appendChild(labelDate);
      infodiv.appendChild(labelTime);
      infodiv.appendChild(labelDiscountPrice);
      infodiv.appendChild(labelOriginalPrice);
      infodiv.appendChild(submitButtonElement);

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

/*function Fetch(url, data) {
  return new Promise((resolve, reject) => {
    console.log(`Fetching data from: ${url}`);
    setTimeout(() => {
      resolve(data);
    }, 500);
  });
}*/
