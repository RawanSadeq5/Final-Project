document.addEventListener("DOMContentLoaded", function () {
    const serviceLinks = document.querySelectorAll(".service-link");
    const continueButton = document.querySelector("#continue-button");
    const calendarContainer = document.querySelector(".wrapper");
    const newProceedButton = document.querySelector("#proceed-button");
    const daysTag = document.querySelector(".days");
    const currentDate = document.querySelector(".current-date");
    const prevNextIcon = document.querySelectorAll(".icons span");
    const timesContainer = document.querySelector(".times-container");
    const availableTimesList = document.querySelector("#available-times");
    const detailsContainer = document.querySelector(".details-container");

    // Initially hide elements
    continueButton.style.display = "none";
    calendarContainer.style.display = "none";
    newProceedButton.style.display = "none";
    timesContainer.style.display = "none";
    detailsContainer.style.display = "none";

    // Step 1: Select Service
    serviceLinks.forEach((link) => {
        link.addEventListener("click", function (event) {
            event.preventDefault();

            // Remove selected class from all services
            serviceLinks.forEach((l) => l.classList.remove("selected"));

            // Add selected class to the clicked service
            link.classList.add("selected");

            // Show the first "המשך" button
            continueButton.style.display = "inline-block";
        });
    });

    // Step 2: Show Calendar
    continueButton.addEventListener("click", function () {
        calendarContainer.style.display = "block";

        // Scroll to the calendar
        calendarContainer.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    // Step 3: Render Calendar
    let date = new Date(),
        currYear = date.getFullYear(),
        currMonth = date.getMonth();

    const months = [
        "ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי",
        "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר",
    ];

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

        currentDate.innerText = `${months[currMonth]} ${currYear}`;
        daysTag.innerHTML = liTag;
    };

    renderCalendar();

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

    // Step 4: Select Date
    daysTag.addEventListener("click", function (event) {
        if (event.target.tagName === "LI" && !event.target.classList.contains("inactive")) {
            // Highlight selected date
            daysTag.querySelectorAll("li").forEach((day) => day.classList.remove("active"));
            event.target.classList.add("active");

            // Show the second "המשך" button
            newProceedButton.style.display = "inline-block";
        }
    });

    // Step 5: Show Times
    newProceedButton.addEventListener("click", function () {
        // Ensure a date is selected
        const selectedDate = document.querySelector(".days li.active");
        if (!selectedDate) {
            alert("אנא בחר תאריך");
            return;
        }

        timesContainer.style.display = "block";

        // Smooth scroll to times container
        timesContainer.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    // Step 6: Select Time
    availableTimesList.addEventListener("click", function (event) {
        if (event.target.tagName === "LI") {
            availableTimesList.querySelectorAll("li").forEach((time) => time.classList.remove("selected"));
            event.target.classList.add("selected");

            // Show the details container
            detailsContainer.style.display = "block";

            // Smooth scroll to details container
            detailsContainer.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    });

    // Step 7: Proceed to Payment
    const paymentButton = document.querySelector("#payment-button");
    paymentButton.addEventListener("click", function () {
        const fullName = document.querySelector("#full-name").value.trim();
        const phoneNumber = document.querySelector("#phone-number").value.trim();
        const notes = document.querySelector("#notes").value.trim();

        if (!fullName || !phoneNumber) {
            alert("אנא מלא את כל השדות הנדרשים");
            return;
        }

        alert(`תשלום מתבצע עבור:\nשם מלא: ${fullName}\nמספר טלפון: ${phoneNumber}\nהערות: ${notes || "אין"}`);
        // Redirect to payment page or handle payment logic here
    });
});