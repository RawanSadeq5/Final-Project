document.addEventListener('DOMContentLoaded', function() {
  let currentStep = 0; // Start at the first step
  const steps = document.querySelectorAll('.form-step');
  const nextBtn = document.getElementById('next-btn');
  const prevBtn = document.getElementById('prev-btn');
  
  // Show the current step
  function showStep(stepIndex) {
    steps.forEach((step, index) => {
      if (index === stepIndex) {
        step.classList.add('active');
      } else {
        step.classList.remove('active');
      }
    });

    // Disable the previous button on the first step
    prevBtn.disabled = stepIndex === 0;

    // Enable the next button or disable it on the last step
    nextBtn.disabled = stepIndex === steps.length - 1;
  }

  // Next button click handler
  nextBtn.addEventListener('click', function() {
    if (currentStep < steps.length - 1) {
      currentStep++;
      showStep(currentStep);
    }
  });

  // Previous button click handler
  prevBtn.addEventListener('click', function() {
    if (currentStep > 0) {
      currentStep--;
      showStep(currentStep);
    }
  });

  // Initially show the first step
  showStep(currentStep);
});
<<<<<<< HEAD
=======

// Handle Previous button click
prevBtn.addEventListener("click", () => {
  if (currentStep > 0) {
    currentStep--;
    updateSteps();
  }
});

 // Initial setup
updateSteps();
>>>>>>> 10e073a816f451cb7e4a43b2677dca0cdcdbd646
