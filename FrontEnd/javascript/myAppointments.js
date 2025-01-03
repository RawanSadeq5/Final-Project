document.addEventListener("DOMContentLoaded", () => {
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

  // Handle cancellation buttons for appointments
  document.querySelectorAll(".appointment-card .action-button.cancel").forEach(button => {
      button.addEventListener("click", (event) => {
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
          confirmationModal.querySelector(".confirm").addEventListener("click", () => {
              confirmationModal.remove();

              // Create cancellation modal
              const cancellationModal = document.createElement("div");
              cancellationModal.classList.add("modal");
              cancellationModal.innerHTML = `
                  <div class="modal-content">
                      <p>התור התבטל בהצלחה</p>
                      <button class="modal-btn close">סגור</button>
                  </div>
              `;
              document.body.appendChild(cancellationModal);

              // Add close button event listener
              cancellationModal.querySelector(".close").addEventListener("click", () => {
                  cancellationModal.remove();
              });
          });

          confirmationModal.querySelector(".cancel").addEventListener("click", () => {
              confirmationModal.remove();
          });
      });
  });


  // Handle deletion buttons for waiting list
  document.querySelectorAll(".waiting-list .action-button.delete-waiting").forEach(button => {
      button.addEventListener("click", (event) => {
          event.preventDefault();

          // Create confirmation modal for deleting from waiting list
          const confirmationModal = document.createElement("div");
          confirmationModal.classList.add("modal");
          confirmationModal.innerHTML = `
              <div class="modal-content">
                  <p>האם ברצונך למחוק את התור מרשימת המתנה?</p>
                  <button class="modal-btn confirm">כן</button>
                  <button class="modal-btn cancel">לא</button>
              </div>
          `;
          document.body.appendChild(confirmationModal);

          // Add event listeners to modal buttons
          confirmationModal.querySelector(".confirm").addEventListener("click", () => {
              confirmationModal.remove();

              // Create deletion modal
              const deletionModal = document.createElement("div");
              deletionModal.classList.add("modal");
              deletionModal.innerHTML = `
                  <div class="modal-content">
                      <p>התור נמחק בהצלחה מרשימת ההמתנה</p>
                      <button class="modal-btn close">סגור</button>
                  </div>
              `;
              document.body.appendChild(deletionModal);

              // Add close button event listener
              deletionModal.querySelector(".close").addEventListener("click", () => {
                  deletionModal.remove();
              });
          });

          confirmationModal.querySelector(".cancel").addEventListener("click", () => {
              confirmationModal.remove();
          });
      });
  });
});

const transferButton = document.getElementById('transferButton');
const popup = document.getElementById('popup');
const copyButton = document.getElementById('copyButton');
const linkInput = document.getElementById('linkInput');

// Show the popup and dim the background
transferButton.addEventListener('click', function (event) {
    event.preventDefault();
    document.body.classList.add('popup-active');
    popup.style.display = 'block';
});

copyButton.addEventListener('click', function () {
    linkInput.select();
    linkInput.setSelectionRange(0, 99999); // For mobile devices
    navigator.clipboard.writeText(linkInput.value).then(() => {
        const originalText = copyButton.innerHTML;
        copyButton.innerHTML = 'הועתק!';
        setTimeout(() => {
            copyButton.innerHTML = originalText;
        }, 2000); // Restore original text after 2 seconds
    });
});

// Close the popup when clicking outside of it
document.addEventListener('click', function (event) {
    if (!popup.contains(event.target) && event.target !== transferButton) {
        popup.style.display = 'none';
        document.body.classList.remove('popup-active');
    }
});


