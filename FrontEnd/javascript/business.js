document.addEventListener("DOMContentLoaded", async () => {
  // Navigation
  document.getElementById("home-link").addEventListener("click", (event) => {
    event.preventDefault();
    window.location.href = "home.html"; // Home page URL
  });

  document.getElementById("about-link").addEventListener("click", (event) => {
    event.preventDefault();
    window.location.href = "about.html"; // About page URL
  });

  document.getElementById("contact-link").addEventListener("click", (event) => {
    event.preventDefault();
    window.location.href = "contactUs.html"; // Contact page URL
  });

  // Fetch and display business details
  const businessId = localStorage.getItem("businessId");
  console.log(businessId);
  if (!businessId) {
    alert("No business ID provided!");
    return;
  }

  try {
    const response = await Fetch(
      `http://localhost:3000/api/business/${businessId}`
    );
    if (response.ok) {
      const { business } = response.data;

      // Display business details
      const businessDetailsContainer =
        document.getElementById("businessDetails");
      businessDetailsContainer.innerHTML = `
        <p><strong>שם העסק:</strong> ${business.BusinessName}</p>
        <p><strong>כתובת:</strong> ${business.address}</p>
        <p><strong>טלפון:</strong> ${business.phoneNumber}</p>
        <p><strong>שעות פתיחה:</strong> ${JSON.stringify(
          business.openingHours
        )}</p>
      `;

      // Display services
      const servicesContainer = document.getElementById("servicesContainer");
      business.services.forEach((service) => {
        const serviceElement = document.createElement("p");
        serviceElement.textContent = `${service.name} - ${service.durationHours}h ${service.durationMinutes}min - ₪${service.price}`;
        servicesContainer.appendChild(serviceElement);
      });

      // Display agreements
      const agreementsContainer = document.getElementById(
        "agreementsContainer"
      );
      agreementsContainer.innerHTML = `
        <p><strong>תשלום מראש:</strong> ₪${business.agreements.advancePayment}</p>
        <p><strong>ימי ביטול:</strong> ${business.agreements.cancellationDays} ימים</p>
        <p><strong>פרס ללקוח:</strong> ${business.agreements.customerReward}</p>
      `;

      // Display profile image
      const profileImageElement = document.getElementById("profileImage");
      if (business.profileImage) {
        profileImageElement.src = business.profileImage;
      }
    } else {
      alert(response.data.message || "Failed to load business details.");
    }
  } catch (error) {
    console.error("Error fetching business details:", error);
    alert("Failed to load business details.");
  }

  // Profile Image Upload
  const profileImage = document.getElementById("profileImage");
  const uploadProfileImage = document.getElementById("uploadProfileImage");

  profileImage.addEventListener("click", () => {
    uploadProfileImage.click();
  });

  uploadProfileImage.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        profileImage.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  });

  // Edit Business Details
  const editDetailsButton = document.getElementById("editDetailsButton");
  const editDetailsForm = document.getElementById("editDetailsForm");
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

  saveDetailsButton.addEventListener("click", async () => {
    const name = document.getElementById("businessName").value;
    const address = document.getElementById("businessAddress").value;
    const phone = document.getElementById("businessPhone").value;
    const hours = document.getElementById("businessHours").value;

    try {
      const response = await Fetch(
        `http://localhost:3000/api/business/${businessId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, address, phone, openingHours: hours }),
        }
      );

      if (response.ok) {
        alert("פרטי העסק עודכנו בהצלחה!");
        editDetailsForm.style.display = "none";
        editDetailsButton.style.display = "block";

        // Update details on the page
        const businessDetails = document.getElementById("businessDetails");
        businessDetails.innerHTML = `
          <p><strong>שם העסק:</strong> ${name}</p>
          <p><strong>כתובת:</strong> ${address}</p>
          <p><strong>טלפון:</strong> ${phone}</p>
          <p><strong>שעות פתיחה:</strong> ${hours}</p>
        `;
      } else {
        alert(response.data.message || "Failed to update business details.");
      }
    } catch (error) {
      console.error("Error updating business details:", error);
      alert("Failed to update business details.");
    }
  });
});

const Fetch = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return {
      ok: response.ok,
      status: response.status,
      data,
    };
  } catch (error) {
    console.error("Error during fetch:", error);
    return {
      ok: false,
      status: 500,
      data: { message: "Network error occurred." },
    };
  }
};
