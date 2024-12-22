// Select DOM elements
const steps = document.querySelectorAll(".step");
const formSteps = document.querySelectorAll(".form-step");
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");

// Initialize the current step
let currentStep = 0;

// Update the progress bar and form step
function updateSteps() {
  // Update progress bar
  steps.forEach((step, index) => {
    if (index <= currentStep) {
      step.classList.add("completed");
    } else {
      step.classList.remove("completed");
    }
  });

  // Show the current form step
  formSteps.forEach((formStep, index) => {
    formStep.classList.toggle("active", index === currentStep);
  });

  // Toggle button states
  prevBtn.disabled = currentStep === 0;
  nextBtn.textContent = currentStep === steps.length - 1 ? "שלח" : "הבא";
}

// Handle Next button click
nextBtn.addEventListener("click", () => {
  if (currentStep < steps.length - 1) {
    currentStep++;
    updateSteps();
  } else {
    // Submit logic here (e.g., form validation or sending data to a server)
    alert("הטופס נשלח בהצלחה!");
  }
});

// Handle Previous button click
prevBtn.addEventListener("click", () => {
  if (currentStep > 0) {
    currentStep--;
    updateSteps();
  }
});

 // Initial setup
updateSteps();
