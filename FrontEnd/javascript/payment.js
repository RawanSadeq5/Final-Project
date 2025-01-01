// Open modal
function openModal() {
    document.getElementById("successModal").style.display = "block";
  }
  
  // Close modal
  function closeModal() {
    document.getElementById("successModal").style.display = "none";
  }
  
  // Redirect to login
  function redirectToLogin() {
    alert("מעבר לדף ההתחברות"); // Replace with actual redirection logic
  }

  document.addEventListener("DOMContentLoaded", () => {
    // booking page navigation
    const bookingLink = document.getElementById("cancel");
    bookingLink.addEventListener("click", (event) => {
        event.preventDefault();
        window.location.href = "booking.html"; 
    });
  });
  