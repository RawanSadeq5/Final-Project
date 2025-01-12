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

  // Close modal on outside click (optional)
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

  try {
    const data1 = [
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
    ];

    const hotAppointmentsdata = await Fetch(
      "https://HananRawanSite.com/api/data",
      data2
    );

    document
      .getElementById("search-button")
      .addEventListener("click", async (e) => {
        e.preventDefault();
        const dataContainer = document.getElementById("businesses-container");

        // Show the container and reset any previous content
        dataContainer.style.display = "block";
        dataContainer.innerHTML = "<p>Loading...</p>";

        const data = await Fetch("https://HananRawanSite.com/api/data", data1);
        dataContainer.innerHTML = ""; // Clear loading state

        const ul = document.createElement("ul");

        data.forEach((item) => {
          const li = document.createElement("li");
          const a = document.createElement("a");
          a.className = "businesses-name";

          a.textContent = `${item.name}`;
          a.href = `../pages/booking.html?id=${item.id}`;
          li.appendChild(a);
          ul.appendChild(li);
        });
        dataContainer.appendChild(ul);
      });

    const appointmentGridDiv = document.getElementById("appointment-grid");
    appointmentGridDiv.innerHTML = ""; // Clear loading state

    hotAppointmentsdata.forEach((item) => {
      const carddiv = document.createElement("div");
      carddiv.className = "appointment-card";

      const infodiv = document.createElement("div");
      infodiv.className = "appointment-info";

      const h2 = document.createElement("h2");
      h2.innerHTML = `${item.BusinessName}`;

      const labelAddress = document.createElement("label");
      labelAddress.innerHTML = `<strong>כתובת:</strong> ${item.Address}`;

      const labelServiceType = document.createElement("label");
      labelServiceType.innerHTML = `<strong>סוג שירות:</strong> ${item.ServiceType}`;

      const labelDate = document.createElement("label");
      labelDate.innerHTML = `<strong>תאריך:</strong> ${item.Date}`;

      const labelTime = document.createElement("label");
      labelTime.innerHTML = `<strong>שעה:</strong> ${item.Time}`;

      const labelDuration = document.createElement("label");
      labelDuration.innerHTML = `<strong>משך:</strong> ${item.DurationInMinutes} דקות`;

      const labelDiscountPrice = document.createElement("p");
      labelDiscountPrice.innerHTML = `${item.discountPrice}`;
      labelDiscountPrice.className = "price-discounted";

      const labelOriginalPrice = document.createElement("p");
      labelOriginalPrice.innerHTML = `${item.originalPrice}`;
      labelOriginalPrice.className = "price-original";

      const submitButtonElement = document.createElement("button");
      submitButtonElement.textContent = "הזמן עכשיו";

      // Add click event for the button
      submitButtonElement.addEventListener("click", () => {
        const detailsContainer = document.getElementById("details-container");

        // Ensure the details container is below all cards
        appointmentGridDiv.insertAdjacentElement("afterend", detailsContainer);

        // Show the details container
        detailsContainer.style.display = "block";

        // Scroll to the details container for better UX
        detailsContainer.scrollIntoView({ behavior: "smooth", block: "start" });
      });

      infodiv.appendChild(h2);
      infodiv.appendChild(labelAddress);
      infodiv.appendChild(labelServiceType);
      infodiv.appendChild(labelDate);
      infodiv.appendChild(labelTime);
      infodiv.appendChild(labelDuration);
      infodiv.appendChild(labelDiscountPrice);
      infodiv.appendChild(labelOriginalPrice);
      infodiv.appendChild(submitButtonElement);

      carddiv.appendChild(infodiv);
      appointmentGridDiv.appendChild(carddiv);
    });

    // Close details container when "X" is clicked
    const closeButton = document.getElementById("close-details");
    closeButton.addEventListener("click", () => {
      const detailsContainer = document.getElementById("details-container");
      detailsContainer.style.display = "none";
    });
  } catch (error) {
    console.error(error);
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
