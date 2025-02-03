/**
 * File: business.js
 * Description: This script manages business profile functionality in the NexTor appointment booking system, including:
 *              - Fetching and displaying business details and services
 *              - Handling profile image upload and update
 *              - Enabling and saving business details edits
 *              - Fetching available services and populating dropdown lists
 *              - Adding new regular and hot appointments
 * Dependencies: Requires a backend API at "https://final-project-mrap.onrender.com/api/business/{businessId}"
 *               and related appointment endpoints. Works with business.html.
 */

document.addEventListener("DOMContentLoaded", async () => {
  const businessId = new URLSearchParams(window.location.search).get(
    "businessId"
  );
  if (!businessId) {
    alert("No business ID provided!");
    return;
  }

  // Fetch business details
  try {
    const response = await fetch(
      `https://final-project-mrap.onrender.com/api/business/${businessId}`
    );

    const data = await response.json();
    console.log(data);

    if (response.ok) {
      const { business } = data;

      // Populate profile image
      const profileImage = document.getElementById("profileImage");
      if (business.profileImage) {
        profileImage.src = business.profileImage;
      }

      document.getElementById("businessName").textContent =
        business.BusinessName;
      document.getElementById("businessAddress").textContent = business.address;
      document.getElementById("businessPhone").textContent =
        business.phoneNumber;
      document.getElementById("advancePayment").textContent =
        business.agreements.advancePayment;
      document.getElementById("cancellationDays").textContent =
        business.agreements.cancellationDays;
      document.getElementById("customerReward").textContent =
        business.agreements.customerReward;

      // Populate services
      const servicesContainer = document.getElementById("servicesTable");
      business.services.forEach((service) => {
        const serviceRow = `
          <tr>
            <td>${service.name}</td>
            <td>${service.durationHours} שעות </td>
            <td>${service.durationMinutes} דקות</td>
            <td>₪${service.price}</td>
          </tr>
        `;
        servicesContainer.innerHTML += serviceRow;
      });
    } else {
      alert(data.message || "Failed to load business details.");
    }
  } catch (error) {
    console.error("Error fetching business details:", error);
    alert("An error occurred while loading the business details.");
  }

  // Profile Image Update
  const profileImageInput = document.getElementById("uploadProfileImage");

  // Trigger file selection when the image is clicked
  profileImage.addEventListener("click", () => {
    profileImageInput.click();
  });

  // Handle file selection
  profileImageInput.addEventListener("change", async (event) => {
    const file = event.target.files[0];
    if (!file) {
      alert("Please select an image to upload.");
      return;
    }

    // Preview the selected image
    const reader = new FileReader();
    reader.onload = (e) => {
      profileImage.src = e.target.result; // Update the image preview
    };
    reader.readAsDataURL(file);

    const formData = new FormData();
    formData.append("profileImage", file);

    try {
      const response = await fetch(
        `https://final-project-mrap.onrender.com/api/business/${businessId}/profile-image`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const result = await response.json();
        alert("Profile image updated successfully!");
      } else {
        alert(result.message || "Failed to update profile image.");
      }
    } catch (error) {
      console.error("Error updating profile image:", error);
      alert("An error occurred while updating the profile image.");
    }
  });

  // Enable Editing Business Details
  const editDetailsButton = document.getElementById("editDetailsButton");
  const saveDetailsButton = document.getElementById("saveDetailsButton");
  const cancelEditButton = document.getElementById("cancelEditButton");
  const editDetailsForm = document.getElementById("editDetailsForm");
  const businessNameInput = document.getElementById("editBusinessName");
  const addressInput = document.getElementById("editAddress");
  const phoneInput = document.getElementById("editPhoneNumber");
  const advanceInput = document.getElementById("editAdvancePayment");
  const cancellationInput = document.getElementById("editCancellationDays");
  const rewardInput = document.getElementById("editCustomerReward");

  editDetailsButton.addEventListener("click", () => {
    businessNameInput.value =
      document.getElementById("businessName").textContent;
    addressInput.value = document.getElementById("businessAddress").textContent;
    phoneInput.value = document.getElementById("businessPhone").textContent;
    advanceInput.value = document.getElementById("advancePayment").textContent;
    cancellationInput.value =
      document.getElementById("cancellationDays").textContent;
    rewardInput.value = document.getElementById("customerReward").textContent;
    editDetailsForm.style.display = "block";
  });

  saveDetailsButton.addEventListener("click", async () => {
    const updatedDetails = {
      name: businessNameInput.value.trim(),
      address: addressInput.value.trim(),
      phone: phoneInput.value.trim(),
      advancePayment: parseFloat(advanceInput.value.trim()),
      cancellationDays: parseInt(cancellationInput.value.trim(), 10),
      customerReward: rewardInput.value.trim(),
    };

    try {
      const response = await fetch(
        `https://final-project-mrap.onrender.com/api/business/${businessId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedDetails),
        }
      );

      if (response.ok) {
        const data = await response.json();
        alert("Business details updated successfully!");
        editDetailsForm.style.display = "none";
      } else {
        const result = await response.json();
        alert(result.message || "Failed to update business details.");
      }
    } catch (error) {
      console.error("Error updating business details:", error);
      alert("An error occurred while updating the business details.");
    }
  });

  // Cancel edit
  cancelEditButton.addEventListener("click", () => {
    editDetailsForm.style.display = "none";
  });

  // Fetch services from the server
  fetch(`https://final-project-mrap.onrender.com/api/business/${businessId}`)
    .then((response) => response.json())
    .then((services) => {
      const serviceDropdown = document.getElementById("service");
      const hotServiceDropdown = document.getElementById("hotService");
      serviceDropdown.innerHTML = '<option value="">בחר שירות</option>';
      hotServiceDropdown.innerHTML = '<option value="">בחר שירות</option>';

      console.log(services.business.services.length);

      if (services.business.services.length > 0) {
        services.business.services.forEach((service) => {
          console.log(service.name);
          const option = document.createElement("option");
          option.value = service.name;
          option.textContent = service.name;
          serviceDropdown.appendChild(option);
        });

        services.business.services.forEach((service) => {
          console.log(service.name);
          const option = document.createElement("option");
          option.value = service.name;
          option.textContent = service.name;
          hotServiceDropdown.appendChild(option);
        });
      }
    })
    .catch((error) => {
      console.error("Error fetching services:", error);
      const serviceDropdown = document.getElementById("service");
      const hotServiceDropdown = document.getElementById("hotService");
      serviceDropdown.innerHTML =
        '<option value="">שגיאה בטעינת השירותים</option>';
      hotServiceDropdown.innerHTML =
        '<option value="">שגיאה בטעינת השירותים</option>';
    });

  // Handle form submission
  const addButton = document.getElementById("addButton");
  addButton.addEventListener("click", (event) => {
    console.log("Regular appointment button clicked");
    event.preventDefault();

    const serviceType = document.getElementById("service").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;

    if (!serviceType) {
      alert("אנא בחר שירות");
      return;
    }

    // Prepare the data to send
    const data = {
      serviceType,
      date,
      time,
      isHot: false,
    };
    console.log(data);

    // Post the data to the server
    fetch(
      `https://final-project-mrap.onrender.com/api/business/${businessId}/appointments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((response) => {
        if (!response.ok) throw new Error("Failed to add appointment");
        return response.json();
      })
      .then((result) => {
        alert("התור נוסף בהצלחה");
        console.log("Appointment added:", result);
      })
      .catch((error) => {
        console.error("Error adding appointment:", error);
        alert("שגיאה בהוספת התור");
      });
  });

  // Handle form submission
  const addHotButton = document.getElementById("addHotButton");
  addHotButton.addEventListener("click", (event) => {
    console.log("Hot appointment button clicked"); // Debug log
    event.preventDefault(); // Prevent default form submission

    const serviceType = document.getElementById("hotService").value;
    const date = document.getElementById("dateHot").value;
    const time = document.getElementById("timeHot").value;
    const originalPrice = document.getElementById("priceBefore").value;
    const discountPrice = document.getElementById("priceAfter").value;

    if (!serviceType) {
      alert("אנא בחר שירות");
      return;
    }

    // Prepare the data to send
    const data = {
      serviceType,
      date,
      time,
      originalPrice,
      discountPrice,
      isHot: true,
    };

    console.log(data);

    // Post the data to the server
    fetch(
      `https://final-project-mrap.onrender.com/api/business/${businessId}/hot-appointments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((response) => {
        if (!response.ok) throw new Error("Failed to add appointment");
        return response.json();
      })
      .then((result) => {
        alert("התור נוסף בהצלחה");
        console.log("Appointment added:", result);
      })
      .catch((error) => {
        console.error("Error adding appointment:", error);
        alert("שגיאה בהוספת התור");
      });
  });

  //get the users appointments
  console.log("Fetching appointments for businessId:", businessId);

  try {
    const response = await fetch(
      `https://final-project-mrap.onrender.com/api/business/appointments/${businessId}`
    );
    const data = await response.json();
    console.log("API response:", data);

    if (data.success) {
      const appointmentsTable = document.getElementById("appointmentsTable");
      appointmentsTable.innerHTML = ""; // Clear existing rows

      data.appointments.forEach((appointment) => {
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${appointment.service}</td>
        <td>${appointment.date}</td>
        <td>${appointment.time}</td>
        <td>${appointment.price || "N/A"}</td>
        <td>${appointment.customerName || "Unknown"}</td>
        <td>${appointment.customerPhoneNumber || "N/A"}</td>
      `;
        appointmentsTable.appendChild(row);
      });
    } else {
      console.error("Failed to fetch appointments:", data.message);
    }
  } catch (error) {
    console.error("Error fetching appointments:", error);
  }

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
