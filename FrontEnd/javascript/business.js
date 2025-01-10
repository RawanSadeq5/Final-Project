document.addEventListener("DOMContentLoaded", async () => {
  // Home page navigation
  const homeLink = document.getElementById("home-link");
  homeLink.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.href = "home.html"; // Replace with your actual home page URL
  });

  // About page navigation
  const aboutLink = document.getElementById("about-link");
  aboutLink.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.href = "about.html"; // Replace with your actual about page URL
  });

  // contact us page navigation
  const contactLink = document.getElementById("contact-link");
  contactLink.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.href = "contactUs.html"; // Replace with your actual about page URL
  });

  // Profile Image Upload
  const profileImage = document.getElementById("profileImage");
  const uploadProfileImage = document.getElementById("uploadProfileImage");

  profileImage.addEventListener("click", () => {
    uploadProfileImage.click();
  });

  uploadProfileImage.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        profileImage.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  });

  const uploadImageInput = document.getElementById("uploadImageInput");
  const imageGallery = document.getElementById("imageGallery");

  // Handle image click for updating
  imageGallery.addEventListener("click", (event) => {
    if (event.target.classList.contains("business-image")) {
      const index = event.target.dataset.index;
      uploadImageInput.dataset.index = index; // Save the index to identify which image to update
      uploadImageInput.click();
    }
  });

  // Handle image file selection
  uploadImageInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    const index = uploadImageInput.dataset.index;

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = imageGallery.querySelector(`img[data-index='${index}']`);
        img.src = e.target.result;
        // Optionally, send the updated image to the server
      };
      reader.readAsDataURL(file);
    }
  });

  const profileImageElement = document.getElementById("profileImage");
  profileImageElement.innerHTML = ""; // Clear loading state

  try {
    const profileImageData = {
      imagePath: "https://www.w3schools.com/images/w3schools_green.jpg",
    };

    const businessDetails = {
      BusinessName: "Salam Nails",
      Address: "אנילביץ 9, עכו",
      phoneNumber: "0508917531",
      openHours: "א'-ה': 9:00-19:00",
    };

    const businessImages = [
      {
        id: 1,
        imagePath:
          "https://media.geeksforgeeks.org/wp-content/cdn-uploads/20190710102234/download3.png",
      },
      {
        id: 2,
        imagePath: "https://www.w3schools.com/images/w3schools_green.jpg",
      },
      {
        id: 3,
        imagePath: "https://www.w3schools.com/images/w3schools_green.jpg",
      },
      {
        id: 4,
        imagePath:
          "https://media.geeksforgeeks.org/wp-content/cdn-uploads/20190710102234/download3.png",
      },
      {
        id: 5,
        imagePath: "https://www.w3schools.com/images/w3schools_green.jpg",
      },
      {
        id: 6,
        imagePath:
          "https://media.geeksforgeeks.org/wp-content/cdn-uploads/20190710102234/download3.png",
      },
    ];

    const tableData = [
      {
        service: "לק ג'ל",
        date: "15/1/2024",
        hour: "15:00",
        duration: "60",
        price: "120",
        customerName: "חנאן",
        customerPhoneNumber: "0524366744",
      },
      {
        service: "תספורת",
        date: "15/1/2024",
        hour: "16:00",
        duration: "60",
        price: "100",
        customerName: "רואן",
        customerPhoneNumber: "0508917531",
      },
    ];

    const serviceTypes = ["לק ג'ל", "תספורת", "החלפת צבע"];

    const imageGallery = document.getElementById("imageGallery");

    const businessDetailsContainer = document.getElementById("businessDetails");
    console.log(businessDetailsContainer);
    businessDetailsContainer.innerHTML = ""; // Clear loading state

    const businessDetailsData = await Fetch(
      "https://HananRawanSite.com/api/data",
      businessDetails
    );

    const labelName = document.createElement("p");
    labelName.innerHTML = `<strong>שם העסק:</strong> ${businessDetailsData.BusinessName}`;

    const labelAddress = document.createElement("p");
    labelAddress.innerHTML = `<strong>כתובת:</strong> ${businessDetailsData.Address}`;

    const labelPhoneNumber = document.createElement("p");
    labelPhoneNumber.innerHTML = `<strong>מספר טלפון:</strong> ${businessDetailsData.phoneNumber}`;

    const labelHours = document.createElement("p");
    labelHours.innerHTML = `<strong>שעות פתיחה:</strong> ${businessDetailsData.openHours}`;

    businessDetailsContainer.appendChild(labelName);
    businessDetailsContainer.appendChild(labelAddress);
    businessDetailsContainer.appendChild(labelPhoneNumber);
    businessDetailsContainer.appendChild(labelHours);
    console.log(businessDetailsContainer);

    // Fetchs
    const image = await Fetch(
      "https://fakeapi.com/profile-image",
      profileImageData
    );

    const businessGallery = await Fetch(
      "https://fakeapi.com/profile-image",
      businessImages
    );

    // Ensure the image path is properly set
    if (image && image.imagePath) {
      profileImageElement.src = image.imagePath;
    } else {
      throw new Error("Profile image path is missing or invalid");
    }

    // Loop through each image in the gallery and update its source
    businessGallery.forEach((imageData, index) => {
      const imgElement = imageGallery.querySelector(
        `img[data-index='${index}']`
      );

      if (imgElement && imageData && imageData.imagePath) {
        imgElement.src = imageData.imagePath;
      } else {
        console.error(
          `Image ${
            index + 1
          }: Path is missing or invalid. Using fallback image.`
        );
      }
    });

    const tableBody = document.getElementById("appointmentsTable");

    const appointmentsDataTtable = await Fetch(
      "https://HananRawanSite.com/api/data",
      tableData
    );

    appointmentsDataTtable.forEach((item, index) => {
      const tr = document.createElement("tr");
      tr.className = "appointment-row";

      const service = document.createElement("th");
      service.innerHTML = ` ${item.service}`;

      const date = document.createElement("th");
      date.innerHTML = `${item.date}`;

      const hour = document.createElement("th");
      hour.innerHTML = ` ${item.hour}`;

      const duration = document.createElement("th");
      duration.innerHTML = `${item.duration}`;

      const price = document.createElement("th");
      price.innerHTML = `${item.price}`;

      const customerName = document.createElement("th");
      customerName.innerHTML = `${item.customerName}`;

      const customerPhoneNumber = document.createElement("th");
      customerPhoneNumber.innerHTML = `${item.customerPhoneNumber}`;
      const statusTh = document.createElement("th");
      statusTh.innerHTML = `
            <label>
                <select class="status-selector">
                    <option value="appointment-taken">אישור תור</option>
                    <option value="ready-to-give-up">ביטול תור</option>
                </select>
            </label>
            <button id="deleteButton${index}" class="">X</button>
        `;

      statusTh
        //.querySelector(`#deleteButton${index}`)
        .addEventListener("click", async (event) => {
          console.log(event.target);
          const row = event.target.closest("tr"); // Find the closest table row
          row.remove(); // Remove the row from the table
          await wait(200);
          alert("התור נמחק בהצלחה!");
          // Optionally, send a request to the server to delete the appointment
        });

      tr.appendChild(service);
      tr.appendChild(date);
      tr.appendChild(hour);
      tr.appendChild(duration);
      tr.appendChild(price);
      tr.appendChild(customerName);
      tr.appendChild(customerPhoneNumber);
      tr.appendChild(statusTh);
      //tr.appendChild(deletButton);
      tableBody.appendChild(tr);
    });

    const serviceOption = document.getElementById("service");
    const hotServiceOption = document.getElementById("hotService");
    serviceOption.innerHTML = "";
    hotServiceOption.innerHTML = "";

    const servicesData = await Fetch(
      "https://HananRawanSite.com/api/data",
      serviceTypes
    );

    servicesData.forEach((item, index) => {
      const option1 = document.createElement("option");
      option1.value = `service${index}`;
      option1.textContent = item;
      const option2 = document.createElement("option");
      option2.value = `service${index}`;
      option2.textContent = item;
      serviceOption.appendChild(option1);
      hotServiceOption.appendChild(option2);
    });
  } catch (error) {
    // Catch and handle errors
    console.error("Error fetching profile image:", error.message);
  }
});

function Fetch(url, data) {
  return new Promise((resolve, reject) => {
    console.log(`Fetching data from: ${url}`);
    setTimeout(() => {
      resolve(data);
    }, 200);
  });
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Toggle edit form visibility
const editDetailsButton = document.getElementById("editDetailsButton");
const editDetailsForm = document.getElementById("editDetailsForm");
const businessDetails = document.getElementById("businessDetails");
const saveDetailsButton = document.getElementById("saveDetailsButton");
const cancelEditButton = document.getElementById("cancelEditButton");

editDetailsButton.addEventListener("click", () => {
  editDetailsForm.style.display = "block";
  editDetailsButton.style.display = "none";
});

cancelEditButton.addEventListener("click", () => {
  editDetailsForm.style.display = "none";
  editDetailsButton.style.display = "block";
});

saveDetailsButton.addEventListener("click", () => {
  const name = document.getElementById("businessName").value;
  const address = document.getElementById("businessAddress").value;
  const phone = document.getElementById("businessPhone").value;
  const hours = document.getElementById("businessHours").value;

  businessDetails.innerHTML = `
        <p>שם העסק: ${name}</p>
        <p>כתובת: ${address}</p>
        <p>טלפון: ${phone}</p>
        <p>שעות פתיחה: ${hours}</p>
    `;

  editDetailsForm.style.display = "none";
  editDetailsButton.style.display = "block";
  alert("פרטי העסק עודכנו בהצלחה!");
});

// Add appointment functionality
document.getElementById("addButton").addEventListener("click", function () {
  const service = document.getElementById("service").value;
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;
  const duration = document.getElementById("duration").value;
  const price = document.getElementById("price").value;
  const advance = document.getElementById("advance").value;

  if (!service || !date || !time || !duration || !price || !advance) {
    alert("נא למלא את כל השדות");
    return;
  }

  document.getElementById("addAppointmentForm").reset();
  alert("התור נוסף בהצלחה!");
});
