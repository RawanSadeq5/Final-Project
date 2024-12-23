// Select DOM elements
const steps = document.querySelectorAll(".step");
const formSteps = document.querySelectorAll(".form-step");
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");

const imageUpload = document.getElementById("imageUpload");
const imagePreview = document.getElementById("imagePreview");
const errorMessage = document.getElementById("errorMessage");

const maxImages = 6;
let uploadedImages = [];

// Image upload functionality
imageUpload.addEventListener("change", (event) => {
  const files = Array.from(event.target.files);

  files.forEach((file) => {
    if (uploadedImages.some((img) => img.name === file.name)) {
      errorMessage.textContent = `התמונה "${file.name}" כבר קיימת.`;
      return;
    }

    if (uploadedImages.length < maxImages) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const imgWrapper = document.createElement("div");
        imgWrapper.className = "image-wrapper";
        imgWrapper.style.position = "relative";
        imgWrapper.style.display = "inline-block";
        imgWrapper.style.margin = "10px";

        const img = document.createElement("img");
        img.src = e.target.result;
        img.style.width = "120px";
        img.style.height = "120px";
        img.style.objectFit = "cover";
        img.style.borderRadius = "8px";
        img.style.boxShadow = "0px 2px 4px rgba(0, 0, 0, 0.1)";

        const removeBtn = document.createElement("button");
        removeBtn.className = "remove-btn";
        removeBtn.textContent = "×";
        removeBtn.style.position = "absolute";
        removeBtn.style.top = "5px";
        removeBtn.style.right = "5px";
        removeBtn.style.backgroundColor = "#921A40";
        removeBtn.style.color = "white";
        removeBtn.style.border = "none";
        removeBtn.style.borderRadius = "50%";
        removeBtn.style.width = "20px";
        removeBtn.style.height = "20px";
        removeBtn.style.cursor = "pointer";
        removeBtn.style.display = "flex";
        removeBtn.style.alignItems = "center";
        removeBtn.style.justifyContent = "center";

        removeBtn.addEventListener("click", () => {
          const index = uploadedImages.findIndex((img) => img.name === file.name);
          if (index > -1) {
            uploadedImages.splice(index, 1);
            imgWrapper.remove();
          }
        });

        imgWrapper.appendChild(img);
        imgWrapper.appendChild(removeBtn);
        imagePreview.appendChild(imgWrapper);
      };

      reader.readAsDataURL(file);
      uploadedImages.push(file);
      errorMessage.textContent = "";
    } else {
      errorMessage.textContent = `ניתן להעלות עד ${maxImages} תמונות.`;
    }
  });

  imageUpload.value = ""; // Reset file input
});

// Initialize the current step
let currentStep = 0;

// Update the progress bar and form step
function updateSteps() {
  steps.forEach((step, index) => {
    if (index <= currentStep) {
      step.classList.add("completed");
    } else {
      step.classList.remove("completed");
    }
  });

  formSteps.forEach((formStep, index) => {
    formStep.classList.toggle("active", index === currentStep);
  });

  prevBtn.disabled = currentStep === 0;
  nextBtn.textContent = currentStep === steps.length - 1 ? "הרשם כעת" : "הבא";
}

nextBtn.addEventListener("click", () => {
  if (currentStep < steps.length - 1) {
    currentStep++;
    updateSteps();
  } else {
    alert("הטופס נשלח בהצלחה!");
  }
});

prevBtn.addEventListener("click", () => {
  if (currentStep > 0) {
    currentStep--;
    updateSteps();
  }
});

updateSteps();

// Add Service Lines Dynamically
const addServiceButton = document.getElementById("plus-button");

function addServiceLine(event) {
  // Prevent default button behavior
  event.preventDefault();

  // Select the container where the new lines will be added
  const servicesContainer = document.getElementById("services-container");

  // Create a new div for the service line
  const serviceLine = document.createElement("div");
  serviceLine.className = "form-group";
  serviceLine.style.display = "flex";
  serviceLine.style.alignItems = "center";
  serviceLine.style.gap = "20px";
  serviceLine.style.marginBottom = "15px"; // Add space below each row

  // Add the HTML structure for the new service line
  serviceLine.innerHTML = `
    <label style="font-size:17px;">
      סוג שירות:
      <input type="text" placeholder="הכנס סוג שירות" class="form-input" style="font-size: 17px; padding: 10px; width: 150px;">
    </label>
    <label style="font-size:17px;">
      משך:
      <input type="number" placeholder="0" style="font-size: 17px; padding: 10px; width: 60px;">
      <span>שעות</span>
      <input type="number" placeholder="0" style="font-size: 17px; padding: 10px; width: 60px;">
      <span>דקות</span>
    </label>
    <label style="font-size:17px;">
      מחיר:
      <input type="number" placeholder="0.00" step="0.01" min="0" style="font-size: 17px; padding: 10px; width: 100px;">
      <span>₪</span>
    </label>
  `;

  // Append the new service line to the container
  servicesContainer.appendChild(serviceLine);
}


// Add an event listener to the button
addServiceButton.addEventListener("click", addServiceLine);
