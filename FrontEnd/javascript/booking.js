document.addEventListener("DOMContentLoaded", () => {
    // Show the date picker container when the continue button is clicked
    const continueButton = document.getElementById('continue-button');
    const datePickerContainer = document.getElementById('date-picker-container');
    
    if (continueButton && datePickerContainer) {
        continueButton.addEventListener('click', () => {
            datePickerContainer.style.display = 'block'; // Show the date picker container
            continueButton.style.display = 'none'; // Hide the continue button
        });
    }

    // Initialize Flatpickr for the date picker
    flatpickr("#datepicker", {
        altInput: true,
        altFormat: "F j, Y",
        dateFormat: "Y-m-d",
        minDate: "today", // Disable past dates
        locale: "he", // Set locale to Hebrew
        onChange: function(selectedDates, dateStr, instance) {
            console.log(`Selected date: ${dateStr}`); // Debug log for selected date
        }
    });

    // Functionality to handle form submission
    const formSubmitButton = document.getElementById('submit-button');
    if (formSubmitButton) {
        formSubmitButton.addEventListener('click', () => {
            const selectedDate = document.getElementById('datepicker').value;
            if (selectedDate) {
                alert(`תאריך שנבחר: ${selectedDate}`);
            } else {
                alert("אנא בחר תאריך לפני המשך");
            }
        });
    }
});
