/**
 * File: addBusiness.js
 * Description: This script manages the multi-step business registration process in the NexTor appointment booking system, including:
 *              - Step-by-step navigation for filling out business details
 *              - Image upload and preview functionality for the business profile
 *              - Adding and removing service offerings dynamically
 *              - Collecting and validating user inputs before form submission
 *              - Sending business registration data to the backend API
 *              - Redirecting users to their business management page upon successful registration
 * Dependencies: Requires an API at "https://final-project-mrap.onrender.com/api/add-business" for business registration.
 *               Works with addBusiness.html.
 **/

const steps = document.querySelectorAll(".step");
const formSteps = document.querySelectorAll(".form-step");
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");

const imagePreview = document.getElementById("imagePreview");
const errorMessage = document.getElementById("errorMessage");

const profileImageUpload = document.getElementById("profileImageUpload");
const profileImagePreview = document.getElementById("profileImagePreview");

const addServiceButton = document.getElementById("plus-button");
const removeServiceButton = document.getElementById("mi-button");
const servicesContainer = document.getElementById("services-container");

const maxImages = 6;
let uploadedImages = [];

// Navbar navigation
document.getElementById("home-link").addEventListener("click", (event) => {
  event.preventDefault();
  window.location.href = "home.html";
});

document.getElementById("about-link").addEventListener("click", (event) => {
  event.preventDefault();
  window.location.href = "about.html";
});

document.getElementById("contact-link").addEventListener("click", (event) => {
  event.preventDefault();
  window.location.href = "contactUs.html";
});

// Reusable fetch function
const Fetch = async (url, formData) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    const responseBody = await response.json();

    // Return the response body, even if the response status is not OK
    return {
      ok: response.ok,
      status: response.status,
      data: responseBody,
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

// Image upload functionality
profileImageUpload.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      profileImagePreview.innerHTML = "";
      const img = document.createElement("img");
      img.src = e.target.result;
      img.alt = "תמונת פרופיל";

      const removeBtn = document.createElement("button");
      removeBtn.textContent = "×";
      removeBtn.className = "remove-btn";
      removeBtn.addEventListener("click", () => {
        profileImagePreview.innerHTML = "";
        profileImageUpload.value = "";
      });

      profileImagePreview.appendChild(img);
      profileImagePreview.appendChild(removeBtn);
    };
    reader.readAsDataURL(file);
  }
});

const addServiceLine = (event) => {
  event.preventDefault();

  const serviceLine = document.createElement("div");
  serviceLine.className = "form-group";
  serviceLine.style.display = "flex";
  serviceLine.style.alignItems = "center";
  serviceLine.style.gap = "20px";
  serviceLine.style.marginBottom = "15px";

  serviceLine.innerHTML = `
    <label style="font-size: 17px;">
      סוג שירות:
      <input type="text" placeholder="הכנס סוג שירות" class="form-input" style="font-size: 17px; padding: 10px; width: 150px;">
    </label>
    <label style="font-size: 17px;">
      משך:
      <input type="number" placeholder="0" style="font-size: 17px; padding: 10px; width: 60px;">
      <span>שעות</span>
      <input type="number" placeholder="0" style="font-size: 17px; padding: 10px; width: 60px;">
      <span>דקות</span>
    </label>
    <label style="font-size: 17px;">
      מחיר:
      <input type="number" placeholder="0.00" step="0.01" min="0" style="font-size: 17px; padding: 10px; width: 100px;">
      <span>₪</span>
    </label>
  `;

  servicesContainer.appendChild(serviceLine);

  if (servicesContainer.childElementCount > 1) {
    removeServiceButton.style.display = "inline-block";
  }
};

const removeServiceLine = (event) => {
  event.preventDefault();

  if (servicesContainer.childElementCount > 1) {
    servicesContainer.removeChild(servicesContainer.lastElementChild);
  }

  if (servicesContainer.childElementCount === 1) {
    removeServiceButton.style.display = "none";
  }
};

addServiceButton.addEventListener("click", addServiceLine);
removeServiceButton.addEventListener("click", removeServiceLine);
removeServiceButton.style.display = "none";

const submitTest = async () => {
  const formData = new FormData(document.getElementById("multi-step-form"));

  const openingHours = [];

  document.querySelectorAll("#working-days .day").forEach((dayDiv) => {
    const checkbox = dayDiv.querySelector("input[type=checkbox]");
    const timeInputs = dayDiv.querySelectorAll("input[type=time]");

    if (checkbox.checked) {
      const dayName = checkbox.parentElement.textContent.trim().toLowerCase();
      const openTime = timeInputs[0]?.value || null;
      const closeTime = timeInputs[1]?.value || null;

      if (openTime && closeTime) {
        openingHours[dayName] = { open: openTime, close: closeTime };
      }
    }
  });

  const services = [];
  document
    .querySelectorAll("#services-container .form-group")
    .forEach((serviceGroup) => {
      const serviceName = serviceGroup.querySelector(
        'input[placeholder="הכנס סוג שירות"]'
      ).value;
      const durationHours =
        serviceGroup.querySelector('input[placeholder="0"]:nth-child(1)')
          .value || "0";
      const durationMinutes =
        serviceGroup.querySelector('input[placeholder="0"]:nth-child(3)')
          .value || "0";
      const price =
        serviceGroup.querySelector('input[placeholder="0.00"]').value || "0.00";

      services.push({
        name: serviceName,
        durationHours: parseInt(durationHours, 10),
        durationMinutes: parseInt(durationMinutes, 10),
        price: parseFloat(price),
      });
    });

  // Add all required fields
  formData.append(
    "fullName",
    document.getElementById("full-name").value.trim()
  );
  formData.append("businessName", document.getElementById("name").value.trim());
  formData.append("email", document.getElementById("email").value.trim());
  formData.append("password", document.getElementById("password").value.trim());
  formData.append("phone", document.getElementById("phone").value.trim());
  formData.append("address", document.getElementById("location").value.trim());
  formData.append("openingHours", JSON.stringify(openingHours));
  formData.append("services", JSON.stringify(services));

  formData.append(
    "advancePayment",
    document.getElementById("price").value.trim()
  );
  formData.append(
    "cancellationDays",
    document.getElementById("number-select").value.trim()
  );
  formData.append("reward", document.getElementById("reward").value.trim());

  const profileImage = document.getElementById("profileImageUpload").files[0];
  if (profileImage) {
    formData.append("profileImage", profileImage);
  }

  try {
    const response = await fetch(
      "https://final-project-mrap.onrender.com/api/add-business",
      {
        method: "POST",
        body: formData,
      }
    );

    const result = await response.json();
    console.log(result.business);

    if (response.ok) {
      return result.business._id;
    } else {
      alert(result.message || "הנתונים שהזנת אינם נכונים, נסה שוב.");
    }
  } catch (error) {
    console.error("Submission failed:", error);
    alert("אירעה שגיאה ברשת. אנא נסה שוב.");
  }
};

// Form step navigation
let currentStep = 0;

const validateStep = () => {
  const currentFormStep = formSteps[currentStep];
  const requiredInputs = currentFormStep.querySelectorAll(".required");

  let isValid = true;

  requiredInputs.forEach((input) => {
    if (!input.value.trim()) {
      isValid = false;
      input.classList.add("input-error");
    } else {
      input.classList.remove("input-error");
    }
  });

  return isValid;
};

const updateSteps = () => {
  steps.forEach((step, index) => {
    step.classList.toggle("completed", index <= currentStep);
  });

  formSteps.forEach((formStep, index) => {
    formStep.classList.toggle("active", index === currentStep);
  });

  prevBtn.disabled = currentStep === 0;
  nextBtn.textContent = currentStep === steps.length - 1 ? "הרשם כעת" : "הבא";
};

nextBtn.addEventListener("click", async (event) => {
  event.preventDefault();
  if (currentStep < steps.length - 1) {
    if (validateStep()) {
      currentStep++;
      updateSteps();
    } else {
      alert("Please complete all required fields before moving forward.");
    }
  } else {
    if (validateStep()) {
      try {
        const businessIdOutput = await submitTest();
        if (businessIdOutput) {
          localStorage.setItem("businessId", businessIdOutput);
          window.location.href = `business.html?businessId=${businessIdOutput}`;
        }
      } catch (error) {
        console.error("Failed to submit form:", error);
        alert("An error occurred while submitting the form.");
      }
    } else {
      alert("Please complete all required fields before submitting.");
    }
  }
});

prevBtn.addEventListener("click", (event) => {
  event.preventDefault();
  if (currentStep > 0) {
    currentStep--;
    updateSteps();
  }
});

updateSteps();

console.log("This is a test!!");
