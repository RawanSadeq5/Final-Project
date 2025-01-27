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
      `http://localhost:3000/api/business/${businessId}`
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
        `http://localhost:3000/api/business/${businessId}/profile-image`,
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
  //const addServiceButton = document.getElementById("addServiceButton");
  const editDetailsForm = document.getElementById("editDetailsForm");
  const businessNameInput = document.getElementById("editBusinessName");
  const addressInput = document.getElementById("editAddress");
  const phoneInput = document.getElementById("editPhoneNumber");
  const advanceInput = document.getElementById("editAdvancePayment");
  const cancellationInput = document.getElementById("editCancellationDays");
  const rewardInput = document.getElementById("editCustomerReward");
  //const srviceInput = document.getElementById("editableServicesContainer");

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
        `http://localhost:3000/api/business/${businessId}`,
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
});
