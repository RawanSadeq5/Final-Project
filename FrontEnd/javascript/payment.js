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
  // Booking page navigation
  const bookingLink = document.getElementById("cancel");
  bookingLink.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.href = "booking.html";
  });
});

// Reusable Fetch Function
async function fetchAdvancePayment(businessId) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/payment/advance-payment/${businessId}`
    );

    const data = await response.json();

    if (response.ok) {
      return data.advancePayment;
    } else {
      console.error("Error fetching advance payment:", data.message);
      throw new Error(data.message || "Failed to fetch advance payment");
    }
  } catch (error) {
    console.error("Network error:", error);
    throw error;
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Replace this with the actual business ID
    const businessId = "YOUR_BUSINESS_ID"; // Example: "64a9c1e3b59d1c1f2e8d0e6b"

    const advancePayment = await fetchAdvancePayment(businessId);

    const div = document.getElementById("advance-payment");
    div.textContent = `סכום המקדמה: ₪ ${advancePayment}`;
  } catch (error) {
    alert("שגיאה בטעינת סכום המקדמה");
  }
});
