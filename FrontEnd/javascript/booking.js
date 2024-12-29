document.addEventListener("DOMContentLoaded", function () {
    const serviceLinks = document.querySelectorAll(".service-link");
    const continueButton = document.querySelector("#continue-button");
    const calendarContainer = document.querySelector(".wrapper");

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
            continueButton.style.display = "inline-block"; // Make the button visible
        });
    });

    // Add click event listener to the "המשך" button
    continueButton.addEventListener("click", function () {
        // Show the calendar container
        calendarContainer.style.display = "block";

        // Smoothly scroll to the calendar container
        calendarContainer.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    /*******************************************************
     * Calendar functionality (already provided in your code)
     *******************************************************/
    const daysTag = document.querySelector(".days"),
        currentDate = document.querySelector(".current-date"),
        prevNextIcon = document.querySelectorAll(".icons span");

    // Getting the current date, year, and month
    let date = new Date(),
        currYear = date.getFullYear(),
        currMonth = date.getMonth();

    // Full names of months
    const months = [
        "ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי",
        "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"
    ];

    // Function to render the calendar
    const renderCalendar = () => {
        let firstDayOfMonth = new Date(currYear, currMonth, 1).getDay(),
            lastDateOfMonth = new Date(currYear, currMonth + 1, 0).getDate(),
            lastDayOfMonth = new Date(currYear, currMonth, lastDateOfMonth).getDay(),
            lastDateOfLastMonth = new Date(currYear, currMonth, 0).getDate();
        let liTag = "";

        // Previous month's days
        for (let i = firstDayOfMonth; i > 0; i--) {
            liTag += `<li class="inactive">${lastDateOfLastMonth - i + 1}</li>`;
        }

        // Current month's days
        for (let i = 1; i <= lastDateOfMonth; i++) {
            // Highlight today
            let isToday =
                i === date.getDate() &&
                currMonth === new Date().getMonth() &&
                currYear === new Date().getFullYear()
                    ? "active"
                    : "";
            liTag += `<li class="${isToday}">${i}</li>`;
        }

        // Next month's days
        for (let i = lastDayOfMonth; i < 6; i++) {
            liTag += `<li class="inactive">${i - lastDayOfMonth + 1}</li>`;
        }

        currentDate.innerText = `${months[currMonth]} ${currYear}`; // Update the month and year
        daysTag.innerHTML = liTag;
    };

    renderCalendar();

    // Handle previous and next icons
    prevNextIcon.forEach((icon) => {
        icon.addEventListener("click", () => {
            currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

            if (currMonth < 0 || currMonth > 11) {
                date = new Date(currYear, currMonth, new Date().getDate());
                currYear = date.getFullYear();
                currMonth = date.getMonth();
            } else {
                date = new Date();
            }
            renderCalendar();
        });
    });
});

// Add this at the end of your existing JavaScript file
const daysTag = document.querySelector(".days");
const calendarContainer = document.querySelector(".wrapper");
const proceedButtonContainer = document.createElement("div"); // Create a container for the new button
proceedButtonContainer.className = "button-container"; // Add the button container class

// Create the new button element
const newProceedButton = document.createElement("button");
newProceedButton.id = "new-proceed-button";
newProceedButton.style.display = "none"; // Initially hidden
newProceedButton.textContent = "המשך";

// Append the button to the button container and then to the calendar container
proceedButtonContainer.appendChild(newProceedButton);
calendarContainer.appendChild(proceedButtonContainer);

// Add click event listener to the calendar days
daysTag.addEventListener("click", function (event) {
    if (event.target.tagName === "LI" && !event.target.classList.contains("inactive")) {
        // Remove active class from previously selected date
        daysTag.querySelectorAll("li").forEach((day) => day.classList.remove("active"));

        // Add active class to the clicked date
        event.target.classList.add("active");

        // Show the new "המשך" button
        newProceedButton.style.display = "inline-block"; // Make the button visible
    }
});



