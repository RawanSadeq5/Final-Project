/**
 * File: myAppointments.js
 * Description: This script handles the retrieval, display, and management of user appointments and waiting list entries
 *              for the NexTor appointment booking system. It dynamically fetches data from the backend and updates
 *              the user interface with active and pending bookings.
 * Dependencies:
 * - Requires a valid authentication token (authToken) stored in localStorage.
 * - Works in conjunction with the backend API for appointment and waiting list management.
 * - Uses JavaScript's Fetch API for asynchronous data retrieval and updates.
 **/

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
      `https://final-project-mrap.onrender.com/api/appointments`,
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
      `https://final-project-mrap.onrender.com/api/appointments/waiting-list`,
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

      // Handle status changes (new code)
      const statusSelector = statusDiv.querySelector(".status-selector");
      statusSelector.addEventListener("change", async (event) => {
        const newStatus = event.target.value;
        // Dummy POST request to update status
        try {
          const response = await fetch(
            "https://final-project-mrap.onrender.com/api/appointments/update-status",
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                appointmentId: appointment._id,
                newStatus: newStatus,
              }),
            }
          );

          if (!response.ok) {
            throw new Error("Failed to update status");
          }

          // For a real API, you’d parse the server's response
          const result = await response.json();
          console.log("Status update successful:", result);
        } catch (error) {
          console.error("Error updating status:", error);
        }
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
      const businessName = waitingItem.businessId?.BusinessName || "";
      const address = waitingItem.businessId?.address || "";
      const div = document.createElement("div");
      div.className = "appointment-card";
      const h2 = document.createElement("h2");
      h2.innerHTML = `<strong>שם העסק:</strong> ${businessName}`;
      const labelAddress = document.createElement("label");
      labelAddress.innerHTML = `<strong>כתובת:</strong> ${address}`;
      const labelServiceType = document.createElement("label");
      labelServiceType.innerHTML = `<strong>סוג שירות:</strong> ${waitingItem.serviceType}`;
      const labelDate = document.createElement("label");
      labelDate.innerHTML = `<strong>תאריך:</strong> ${waitingItem.date}`;

      const deleteButton = document.createElement("button");
      deleteButton.classList.add("action-button", "delete-waiting");
      deleteButton.textContent = "מחיקה מרשימת המתנה";

      // IMPORTANT: Store the waiting list _id on the button so we can reference it later
      deleteButton.dataset.waitingId = waitingItem._id;

      div.appendChild(h2);
      div.appendChild(labelAddress);
      div.appendChild(labelServiceType);
      div.appendChild(labelDate);

      div.appendChild(deleteButton);

      waitingListContainerDiv.appendChild(div);
    });

    document.querySelectorAll(".delete-waiting").forEach((button) => {
      button.addEventListener("click", (event) => {
        event.preventDefault();

        // Retrieve the waiting list ID from the button's dataset
        const waitingListId = button.dataset.waitingId;
        console.log("Waiting List ID:", waitingListId);

        // Create confirmation modal
        const confirmationModal = document.createElement("div");
        confirmationModal.classList.add("modal");
        confirmationModal.innerHTML = `
          <div class="modal-content">
              <p>האם ברצונך למחוק את התור מרשימת המתנה?</p>
              <button class="modal-btn confirm" data-waiting-list-id="${waitingListId}">כן</button>
              <button class="modal-btn cancel">לא</button>
          </div>
        `;

        document.body.appendChild(confirmationModal);

        // Handle the "Confirm" click
        confirmationModal
          .querySelector(".confirm")
          .addEventListener("click", async (e) => {
            // Read the ID from the button's dataset
            const idToDelete = e.currentTarget.dataset.waitingListId;

            // Remove modal from DOM
            confirmationModal.remove();

            try {
              // Make DELETE request to remove from waiting list
              // Adjust the endpoint if yours differs, e.g. /api/waiting-list/:id
              const response = await fetch(
                `https://final-project-mrap.onrender.com/api/appointments/waiting-list/${idToDelete}`,
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
                alert("התור נמחק בהצלחה מרשימת ההמתנה!");
                window.location.reload();
              } else {
                alert("Failed to delete: " + data.message);
              }
            } catch (error) {
              console.error("Error deleting from waiting list:", error);
              alert("An error occurred while deleting from waiting list.");
            }
          });

        // Handle the "Cancel" click
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
                  `https://final-project-mrap.onrender.com/api/appointments/${appointmentId}`,
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
