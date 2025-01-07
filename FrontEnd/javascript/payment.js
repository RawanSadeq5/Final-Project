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

function Fetch(url, data) {
  return new Promise((resolve, reject) => {
    console.log(`Fetching data from: ${url}`);
    setTimeout(() => {
      resolve(data);
    }, 500);
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const data1 = { price: 50 };
    const data = await Fetch("https://HananRawanSite.com/api/data", data1);
    const div = document.getElementById("advance-payment");
    div.textContent = `סכום המקדמה: ₪ ${data.price} `;
  } catch (error) {
    alert("Error");
    console.error(error);
  }
});
