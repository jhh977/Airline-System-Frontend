// const hotels = [
//   {
//     imageUrl: "hotel1.jpg",
//     name: "Hotel One",
//     rating: 4.5,
//     location: "City A",
//     services: ["Free Wi-Fi", "Swimming Pool", "Room Service"],
//   },
//   {
//     imageUrl: "hotel2.jpg",
//     name: "Hotel Two",
//     rating: 4.2,
//     location: "City B",
//     services: ["Restaurant", "Fitness Center", "Spa"],
//   },
// ];

// Call the function with your JSON object
// updateHotelListings(hotels);

function updateHotelListings(hotels) {
  const hotelListingsSection = document.querySelector(".hotel-listings");
  hotelListingsSection.innerHTML = "";

  // Convert the object to an array
  const hotelsArray = Object.values(hotels);

  hotelsArray.forEach((hotel) => {
    const hotelElement = document.createElement("div");
    hotelElement.classList.add("hotel");

    let servicesHtml = "";
    hotel.services.forEach((service) => {
      servicesHtml += `<p><i class="${service.service_image}"></i> ${service.name}</p>`;
    });

    hotelElement.innerHTML = `
      <div class="hotel">
        <img
          src="${hotel.hotel_image_url}"
          alt="${hotel.name}"
          class="image" 
        />

        <div class="info">
          <h2 class="hotel-name">${hotel.name}</h2>
          <div class="location-rating">
            <p>
              <i class="fas fa-star"></i>
              ${hotel.rating} rating
            </p>
            <p>
              <i class="fas fa-map-marker-alt"></i>
              ${hotel.city}
            </p>
          </div>

          <div class="hotel-serves">
            ${servicesHtml}
          </div>
        </div>

        <button class="view-take">Book</button>
      </div>
    `;

    hotelListingsSection.appendChild(hotelElement);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const searchButton = document.getElementById("search");

  searchButton.addEventListener("click", async function () {
    const name = sanitizeInput(document.getElementById("text").value);

    if (!name) {
      showPopup("Search text cannot be empty");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost/Airline-System-Backend/public/api/hotels",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            //     searchText: searchText,
            //     fromDate: fromDate,
            //     toDate: toDate,
            //     guests: guests,
          }),
        }
      );
      if (!response.ok) {
        showPopup("try another city");
        document.getElementById("text").value = "";
        throw new error(`http error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      updateHotelListings(data);
      document.getElementById("text").value = "";
    } catch (error) {
      console.error("Error:", error);
    }
  });
});
function sanitizeInput(input) {
  return input.trim();
}

function showPopup(message) {
  alert(message);
}

const book = document.getElementById("");
