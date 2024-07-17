function updateTaxiListing(taxis) {
  const taxiListingSelection = document.querySelector(".all-cards");
  taxiListingSelection.innerHTML = "";

  taxis.forEach((taxi) => {
    const taxiElement = document.createElement("div");
    taxiElement.classList.add("card");

    taxiElement.innerHTML = `
      <div class="card">
                                <div class="card-image">
                                        <img src="${taxi.taxi_logo}" alt="Image" width=330px height=180px>
                                </div>
                                
                                <div class="card-details">
                                    <div class= "info">
                                            <div class="column">
                                             <span id="label">Company Name:   </span>
                                             <span id="label">Location:   </span>
                                             <span id="label">Location:   </span>
                                             <span id="label">Price per Hour:   </span>      
                                     </div>
                                     <div class="column">
                                             <span class="value" id="label" placeholder="companyname">${taxi.name}</span>
                                             <input class="value" id="location" placeholder="pickup"></input>
                                             <input class="value" id="location" placeholder="drop"></input>
                                             <span class="value" id="price-per-hour">${taxi.price}</span>
                                      </div>
                                </div>
                                
                                <button class="take-button">Book</button>
                        </div>
                </div>
    `;
    taxiListingSelection.appendChild(taxiElement);
  });
}

function sanitizeInput(text) {
  return text.trim();
}

function showPopup(message) {
  alert(message);
}
const takeButtons = document.querySelectorAll(".take-button");

// Loop through each button to add event listener
takeButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    // Find the parent card element and remove it
    const card = button.closest(".card");
    if (card) {
      card.remove();
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const searchButton = document.getElementById("search");

  searchButton.addEventListener("click", async function (event) {
    event.preventDefault(); // Prevent form submission

    const name = sanitizeInput(document.getElementById("searchText").value);
    const guests = sanitizeInput(document.getElementById("guests").value);

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
        const data = await response.json();
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
