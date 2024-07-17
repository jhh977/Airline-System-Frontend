let isBookingWindowOpen = false;

function updateTaxiListing(taxis) {
  const taxiListingSelection = document.querySelector(".all-cards");
  taxiListingSelection.innerHTML = "";

  taxis.forEach((taxi) => {
    const taxiElement = document.createElement("div");
    taxiElement.classList.add("card");

    taxiElement.innerHTML = `
      <div class="card">
        <div class="card-image">
          <img src="${taxi.taxi_logo}" alt="Image" width="330px" height="180px">
        </div>
        <div class="card-details">
          <div class="info">
            <div class="column">
              <span class="label">Company Name:</span>
              <span class="label">Location:</span>
              <span class="label">Location:</span>
            </div>
            <div class="column">
              <span class="value" id="companyname">${taxi.name}</span>
              <input class="value" id="pickup" placeholder="Pickup">
              <input class="value" id="drop" placeholder="Drop">
            </div>
          </div>
          <button class="take-button">Book</button>
        </div>
      </div>
    `;
    taxiListingSelection.appendChild(taxiElement);

    const takeButton = taxiElement.querySelector(".take-button");
    takeButton.addEventListener("click", function () {
      if (isBookingWindowOpen) {
        alert(
          "Please complete or cancel the current booking before starting a new one."
        );
        return;
      }

      const pickupInput = taxiElement.querySelector("#pickup");
      const dropInput = taxiElement.querySelector("#drop");
      if (!pickupInput.value.trim() || !dropInput.value.trim()) {
        alert("Please fill in both Pickup and Drop locations before booking.");
        return;
      }

      const popupWindow = document.createElement("div");
      popupWindow.classList.add("popup-window");

      const pickupValue = pickupInput.value;
      const dropValue = dropInput.value;

      popupWindow.innerHTML = `
        <div class="container">
          <h1>Book Your Taxi</h1>
          <form id="bookingForm">
            <div class="form-group">
              <label for="company-name">Company Name:</label>
              <span id="Company-name">${taxi.name}</span>
            </div>
            <div class="form-group">
              <label for="checkIn">Pick UP:</label>
              <span id="checkIn">${pickupValue}</span>
            </div>
            <div class="form-group">
              <label for="checkOut">Drop Off:</label>
              <span id="checkOut">${dropValue}</span>
            </div>
            <div class="form-group">
              <label for="travelClass">Price</label>
              <span id="travelClass">[Dynamic Price]</span>
            </div>
            <div class="button-group">
              <button type="submit" id="checkAvailability">Book</button>
              <button type="button" id="cancel">Cancel</button>
            </div>
          </form>
        </div>
      `;

      document.body.appendChild(popupWindow);
      isBookingWindowOpen = true;

      const closeButton = popupWindow.querySelector("#cancel");
      closeButton.addEventListener("click", function () {
        popupWindow.remove();
        isBookingWindowOpen = false;
      });

      const bookButton = popupWindow.querySelector("#checkAvailability");
      bookButton.addEventListener("click", function (event) {
        event.preventDefault();
        console.log("Booking confirmed for:", pickupValue, dropValue);
        showPopup("Booking confirmed!");
        popupWindow.remove();
        isBookingWindowOpen = false;
      });
    });
  });
}

function sanitizeInput(text) {
  return text.trim();
}

function showPopup(message) {
  alert(message);
}

document.addEventListener("DOMContentLoaded", function () {
  const searchButton = document.getElementById("search");

  searchButton.addEventListener("click", async function (event) {
    event.preventDefault();

    const name = sanitizeInput(document.getElementById("searchText").value);

    if (!name) {
      showPopup("Please enter a city to search for taxis!");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost/Airline-System-Backend/public/api/taxis",
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
          }),
        }
      );

      if (!response.ok) {
        showPopup(
          "No taxis found for the specified city. Please try another city."
        );
        document.getElementById("searchText").value = "";
        return;
      }

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        let data = await response.json();
        console.log(data);
        updateTaxiListing(data);
        document.getElementById("searchText").value = "";
      } else {
        throw new Error("Response was not in JSON format");
      }
    } catch (error) {
      console.error("Error:", error);
      showPopup("An error occurred while fetching taxis. Please try again.");
    }
  });
});
