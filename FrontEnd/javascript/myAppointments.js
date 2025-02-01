// About page navigation
const aboutLink = document.getElementById("about-link");
aboutLink.addEventListener("click", (event) => {
  event.preventDefault();
  window.location.href = "about.html";
});

// Contact us page navigation
const contactLink = document.getElementById("contact-link");
contactLink.addEventListener("click", (event) => {
  event.preventDefault();
  window.location.href = "contactUs.html";
});

// Home page navigation
const homeLink = document.getElementById("home-link");
homeLink.addEventListener("click", (event) => {
  event.preventDefault();
  window.location.href = "home.html";
});

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

document.addEventListener("DOMContentLoaded", async () => {
  // const transferButton = document.getElementById('transferButton');
  const token = localStorage.getItem("authToken");

  if (!token) {
    //alert();
    window.location.href = "login.html";
    return;
  }

  const popup = document.getElementById("popup");
  const copyButton = document.getElementById("copyButton");
  const linkInput = document.getElementById("linkInput");

  copyButton.addEventListener("click", function () {
    linkInput.select();
    linkInput.setSelectionRange(0, 99999); // For mobile devices
    navigator.clipboard.writeText(linkInput.value).then(() => {
      const originalText = copyButton.innerHTML;
      copyButton.innerHTML = "הועתק!";
      setTimeout(() => {
        copyButton.innerHTML = originalText;
      }, 2000); // Restore original text after 2 seconds
    });
  });

  document.addEventListener("click", function (event) {
    if (
      !popup.contains(event.target) &&
      !event.target.classList.contains("transfer")
    ) {
      popup.style.display = "none";
      document.body.classList.remove("popup-active");
    }
  });

  const dataContainer = document.getElementById("appointment-container");
  const waitingListContainerDiv = document.getElementById("waiting-list");

  waitingListContainerDiv.innerHTML = "<p>טוען...</p>";
  dataContainer.innerHTML = "<p>טוען...</p>";

  try {
    const appointmentsResult = await fetch(
      `http://localhost:3000/api/appointments`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Parse JSON response
    const appointmentsData = await appointmentsResult.json();

    const waitingListResult = await fetch(
      `http://localhost:3000/api/appointments/waiting-list`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Parse JSON response
    const waitingListData = await waitingListResult.json();

    // Extract appointment and waiting list data
    const Appointments = appointmentsData.appointments;
    const WaitingList = waitingListData.waitingList;

    dataContainer.innerHTML = "";

    // const { Appointments, WaitingList } = data;

    Appointments.forEach((appointment, index) => {
      const div = document.createElement("div");
      div.className = "appointment-card";
      const h2 = document.createElement("h2");
      h2.innerHTML = `<strong>שם העסק:</strong> ${appointment.businessName}`;
      const labelAddress = document.createElement("label");
      labelAddress.innerHTML = `<strong>כתובת:</strong> ${appointment.address}`;
      const labelServiceType = document.createElement("label");
      labelServiceType.innerHTML = `<strong>סוג שירות:</strong> ${appointment.serviceType}`;
      const labelPrice = document.createElement("label");
      labelPrice.innerHTML = `<strong>מחיר:</strong> ${appointment.price}`;
      const labelDate = document.createElement("label");
      labelDate.innerHTML = `<strong>תאריך:</strong> ${appointment.date}`;
      const labelTime = document.createElement("label");
      labelTime.innerHTML = `<strong>שעה:</strong> ${appointment.time}`;

      const statusDiv = document.createElement("div");
      statusDiv.innerHTML = `
            <label>
                <strong>סטטוס:</strong>
                <select class="status-selector">
                    <option value="appointment-taken">התור תפוס</option>
                    <option value="ready-to-give-up">מוכן לוותר</option>
                </select>
            </label>
            <br/>
            <br/>
            <div class="appointment-actions">
                <button id="transferButton${index}" class="action-button transfer">העבר לחבר</button>
               <button class="action-button cancel" data-appointment-id="${appointment._id}">ביטול תור</button>
            </div>
        `;

      statusDiv
        .querySelector(`#transferButton${index}`)
        .addEventListener("click", function (event) {
          event.preventDefault();
          document.body.classList.add("popup-active");
          const popup = document.getElementById("popup");
          popup.style.display = "block";
        });

      div.appendChild(h2);
      div.appendChild(labelAddress);
      div.appendChild(labelServiceType);
      div.appendChild(labelPrice);
      div.appendChild(labelDate);
      div.appendChild(labelTime);
      // div.appendChild(labelDuration);
      div.appendChild(statusDiv);

      dataContainer.appendChild(div);
    });

    // Waiting list Container Div

    waitingListContainerDiv.innerHTML = "";
    WaitingList.forEach((waitingItem) => {
      const div = document.createElement("div");
      div.className = "appointment-card";
      const h2 = document.createElement("h2");
      h2.innerHTML = `<strong>שם העסק:</strong> ${waitingItem.businessName}`;
      const labelAddress = document.createElement("label");
      labelAddress.innerHTML = `<strong>כתובת:</strong> ${waitingItem.address}`;
      const labelServiceType = document.createElement("label");
      labelServiceType.innerHTML = `<strong>סוג שירות:</strong> ${waitingItem.serviceType}`;
      const labelDate = document.createElement("label");
      labelDate.innerHTML = `<strong>תאריך:</strong> ${waitingItem.date}`;
      const labelTime = document.createElement("label");
      labelTime.innerHTML = `<strong>שעה:</strong> ${waitingItem.time}`;

      const transferButtonElement = document.createElement("button");
      transferButtonElement.className += " action-button delete-waiting";
      transferButtonElement.textContent = "מחיקה מרשימת המתנה";

      div.appendChild(h2);
      div.appendChild(labelAddress);
      div.appendChild(labelServiceType);
      div.appendChild(labelDate);
      div.appendChild(labelTime);

      div.appendChild(transferButtonElement);

      waitingListContainerDiv.appendChild(div);
    });

    document.querySelectorAll(".delete-waiting").forEach((button) => {
      console.log(button);
      button.addEventListener("click", (event) => {
        event.preventDefault();

        // Create confirmation modal for deleting from waiting list
        const confirmationModal = document.createElement("div");
        confirmationModal.classList.add("modal");
        confirmationModal.innerHTML = `
                <div class="modal-content">
                    <p>האם ברצונך למחוק את התור מרשימת המתנה?</p>
                    <button class="modal-btn confirm" data-appointment-id="${waitingItem._id}">כן</button>
                    <button class="modal-btn cancel">לא</button>
                </div>
            `;
        document.body.appendChild(confirmationModal);

        const appointmentId = event.currentTarget.dataset.appointmentId;
        console.log("Appointment ID:", appointmentId); // Debugging
        // Add event listeners to modal buttons
        confirmationModal
          .querySelector(".confirm")
          .addEventListener("click", async () => {
            confirmationModal.dataset.appointmentId = appointmentId; // Attach ID to modal
            confirmationModal.remove();

            try {
              const response = await fetch(
                `http://localhost:3000/api/appointments/${appointmentId}`,
                {
                  method: "DELETE",
                  headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                  },
                }
              );

              const data = await response.json();

              if (data.success) {
                alert("התור בוטל בהצלחה!");
                window.location.reload();
              } else {
                alert("Failed to cancel: " + data.message);
              }
            } catch (error) {
              console.error("Error canceling appointment:", error);
              alert("An error occurred while canceling the appointment.");
            }

            // Add close button event listener
            deletionModal
              .querySelector(".close")
              .addEventListener("click", () => {
                deletionModal.remove();
              });
          });

        confirmationModal
          .querySelector(".cancel")
          .addEventListener("click", () => {
            confirmationModal.remove();
          });
      });
    });

    // Handle cancellation buttons for appointments
    document
      .querySelectorAll(".appointment-card .action-button.cancel")
      .forEach((button) => {
        button.addEventListener("click", (event) => {
          const appointmentId = event.currentTarget.dataset.appointmentId;
          console.log("Appointment ID:", appointmentId); // Debugging

          event.preventDefault();

          // Create confirmation modal for canceling appointment
          const confirmationModal = document.createElement("div");
          confirmationModal.classList.add("modal");
          confirmationModal.innerHTML = `
                <div class="modal-content">
                    <p>האם אתה בטוח שברוצנך לבטל את התור שנבחר?</p>
                    <button class="modal-btn confirm">כן</button>
                    <button class="modal-btn cancel">לא</button>
                </div>
            `;
          document.body.appendChild(confirmationModal);

          // Add event listeners to modal buttons
          confirmationModal
            .querySelector(".confirm")
            .addEventListener("click", async () => {
              confirmationModal.dataset.appointmentId = appointmentId; // Attach ID to modal
              confirmationModal.remove();

              try {
                const response = await fetch(
                  `http://localhost:3000/api/appointments/${appointmentId}`,
                  {
                    method: "DELETE",
                    headers: {
                      Authorization: `Bearer ${token}`,
                      "Content-Type": "application/json",
                    },
                  }
                );

                const data = await response.json();

                if (data.success) {
                  alert("התור בוטל בהצלחה!");
                  window.location.reload();
                } else {
                  alert("Failed to cancel: " + data.message);
                }
              } catch (error) {
                console.error("Error canceling appointment:", error);
                alert("An error occurred while canceling the appointment.");
              }
            });

          confirmationModal
            .querySelector(".cancel")
            .addEventListener("click", () => {
              confirmationModal.remove();
            });
        });

        // Handle deletion buttons for waiting list
      });
  } catch (error) {
    console.error(error);
  }
});

/*const { UserAppointment, WaitingList } = require("../models/Schemas");

// Example: Fetch all user appointments
exports.getUserAppointments = async (req, res) => {
  try {
    const userId = req.user.id;
    const appointments = await UserAppointment.find({ userId });
    res.status(200).json({ success: true, appointments });
  } catch (error) {
    console.error("Error fetching user appointments:", error);
    res.status(500).json({ success: false, message: "Failed to fetch appointments." });
  }
};*/
