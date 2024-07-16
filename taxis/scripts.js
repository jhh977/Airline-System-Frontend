document.addEventListener("DOMContentLoaded", function () {
  const search = sanitizeInput(document.getElementById("searchText"));
  const guest = sanitizeInput(document.getElementById("guests"));
});

function updateTaxiListing(taxis) {
  const taxiListingSelection = document.querySelector(".all-cards");
  taxiListingSelection.innerHTML = "";

  const array = Object.values(taxis);
  array.forEach((taxi) => {
    const taxiElement = document.createElement("div");
    taxiElement.classList.add("card");

    taxiElement.innerHTML = `        <div class="card">
                                <div class="card-image">
                                        <img src="${taxi.taxi_image}" alt="Image" />
                                </div>
                                
                                <div class="card-details">
                                        <div class= "info">
                                                <div class="column">
                                                        <span id="label">Company Name:   </span>
                                                        <span id="label">Location:   </span>
                                                        <span id="label">Location:   </span>
                                                        <span id="label">Price per Hour:   </span>
                                                        <span id="label">Total Price:   </span>
                                                        
                                                </div>
                                                <div class="column">
                                                        <span class="value" id="company-name" placeholder="">${taxi.companyname}</span>
                                                        <input class="value" id="location" placeholder="pickup"></input>
                                                        <input class="value" id="location" placeholder="drop"></input>
                                                        <span class="value" id="price-per-hour">price-per-hour</span>
                                                        <span class="value" id="total-price">total-price</span>
                                                </div>
                                </div>
                                
                                <button class="take-button">Take</button>
                        </div>`;
    taxiListingSelection.appendChild(taxiElement);
  });
}

function sanitizeInput(text) {
  return text.trim();
}

function showPopup(message) {
  alert(message);
}
