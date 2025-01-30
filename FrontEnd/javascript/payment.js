// Open modal
/*function openModal() {
  document.getElementById("successModal").style.display = "block";
}

// Close modal
function closeModal() {
  document.getElementById("successModal").style.display = "none";
}

// Redirect to login
function redirectToLogin() {
  alert("מעבר לדף ההתחברות"); // Replace with actual redirection logic
}*/

document.addEventListener("DOMContentLoaded", async () => {
  const businessId = new URLSearchParams(window.location.search).get(
    "businessId"
  );
  if (!businessId) {
    alert("No business ID provided!");
    return;
  }

  try {
    const response = await fetch(
      `http://localhost:3000/api/payment/${businessId}/advance-payment`
    );
    const data = await response.json();
    console.log(data);

    if (response.ok) {
      //const { business } = data;

      document.getElementById(
        "advance-payment"
      ).textContent = `סכום המקדמה: ${data.advancePayment}₪`;
    } else {
      alert(data.message || "Failed to load the advance.");
    }
  } catch (error) {
    console.error("Error fetching the advance payment:", error);
    alert("An error occurred while loading the advance.");
  }

  // Booking page navigation
  const bookingLink = document.getElementById("cancel");
  bookingLink.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.href = `booking.html?businessId=${businessId}`;
  });
});
