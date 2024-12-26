document.addEventListener("DOMContentLoaded", function () {
    const serviceLinks = document.querySelectorAll(".service-link");
    const continueButton = document.querySelector("#continue-button");
    const calendarContainer = document.querySelector("#calendar-container");
    const confirmDateButton = document.querySelector("#confirm-date-button");

    // Initially hide the "המשך" button and the calendar container
    continueButton.style.display = "none";
    calendarContainer.style.display = "none";

    // Add click event listener to service links
    serviceLinks.forEach((link) => {
        link.addEventListener("click", function (event) {
            event.preventDefault(); // Prevent default link behavior

            // Remove the "selected" class from all services
            serviceLinks.forEach((l) => l.classList.remove("selected"));

            // Add the "selected" class to the clicked service
            link.classList.add("selected");

            // Show the "המשך" button
            continueButton.style.display = "block";
        });
    });

    // Add click event listener to the "המשך" button
    continueButton.addEventListener("click", function () {
        // Show the calendar container
        calendarContainer.style.display = "block";

        // Smooth scroll to the calendar container
        calendarContainer.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    // Add click event listener to the "אישור" button (confirm date)
    confirmDateButton.addEventListener("click", function () {
        const selectedDate = document.querySelector("#date-picker").value;

        if (selectedDate) {
            alert(`תאריך שנבחר: ${selectedDate}`);
        } else {
            alert("נא לבחור תאריך.");
        }
    });
});
