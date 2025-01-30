/**
 * File: payment.js
 * Description: This script handles advance payment retrieval and navigation for the NexTor appointment booking system.
 *              It fetches the advance payment amount from the server based on the business ID in the URL query parameters.
 *              It also includes event listeners for navigation to the booking page and error handling for failed API requests.
 * Dependencies: Requires an API endpoint at "http://localhost:3000/api/payment/{businessId}/advance-payment"
 *               and works with payment.html.
 **/

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
