const hotelsData = {
  hotels: [
    {
      name: "Phoenicia Beirut",
      imageUrl: "assets/phoneca_beirut.jpg",
      location: "Beirut",
      rating: 4.5,
      services: [
        "Restaurant",
        "Hotel star",
        "Free Parking",
        "Free WiFi",
        "Air Conditioning",
        "Coffee Shop",
        "Fitness Center",
      ],
    },
    {
      name: "Another Hotel",
      imageUrl: "assets/another_hotel.jpg",
      location: "Tripoli",
      rating: 4.0,
      services: ["Restaurant", "Free Parking", "Free WiFi"],
    },
    {
      name: "Luxury Resort",
      imageUrl: "assets/luxury_resort.jpg",
      location: "Jounieh",
      rating: 4.8,

      services: ["Restaurant", "Spa", "Beach Access", "Pool", "Free WiFi"],
    },
  ],
};
const data = hotelsData;

updateHotelListings(data.hotels);

function updateHotelListings(hotels) {
  const hotelListingsSection = document.querySelector(".hotel-listings");
  hotelListingsSection.innerHTML = "";

  hotels.forEach((hotel) => {
    const hotelElement = document.createElement("div");
    hotelElement.classList.add("hotel");

    hotelElement.innerHTML = `
      <div class="hotel">
        <img
          src="${hotel.imageUrl}"
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
              ${hotel.location}
            </p>
          </div>

          <div class="hotel-serves">
            ${hotel.services
              .map(
                (service) => `<p><i class="fas fa-utensils"></i> ${service}</p>`
              )
              .join("")}
          </div>
        </div>

        <button class="view-take">take</button>
      </div>
    `;

    hotelListingsSection.appendChild(hotelElement);
  });
}
