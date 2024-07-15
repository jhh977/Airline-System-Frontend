// Function to fetch and load trip details from the database
async function loadTripDetails() {
    try {
        const response = await fetch('http://your-api-endpoint/trip-details', {
            method: 'POST',  // Changed to POST method
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user_id: 2 })  // Assuming you need to send a user ID or other parameters
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        // Populate HTML with the data
        document.querySelector('.trip-details .departure-from p').textContent = `Depart ${data.departure.location} ${data.departure.time}`;
        document.querySelector('.trip-details .departure-to p').textContent = `Arrive ${data.arrival.location} ${data.arrival.time}`;
        
        document.querySelector('.trip-details .plane-departure:nth-of-type(2) .departure-from p').textContent = `Depart ${data.returnDeparture.location} ${data.returnDeparture.time}`;
        document.querySelector('.trip-details .plane-departure:nth-of-type(2) .departure-to p').textContent = `Arrive ${data.returnArrival.location} ${data.returnArrival.time}`;
        
        document.querySelector('.hotel-taxi-details .departure-from:nth-of-type(1) p').textContent = `Check-in ${data.hotel.checkin}`;
        document.querySelector('.hotel-taxi-details .departure-to:nth-of-type(1) p').textContent = `Check-out ${data.hotel.checkout}`;
        
        document.querySelector('.hotel-taxi-details .departure-from:nth-of-type(2) p').textContent = `Pickup ${data.taxi.pickup}`;
        document.querySelector('.hotel-taxi-details .departure-to:nth-of-type(2) p').textContent = `Dropoff ${data.taxi.dropoff}`;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

// Function to handle the booking process
async function bookTrip(event) {
    event.preventDefault();

    const cardNumberInputs = document.querySelectorAll('.card-number input');
    const cardNumber = Array.from(cardNumberInputs).map(input => input.value).join('');

    const nameOnCard = document.querySelector('.name-on-the-card input').value;
    const expiryDateInputs = document.querySelectorAll('.expiary-date-inputs input');
    const expiryDate = Array.from(expiryDateInputs).map(input => input.value).join('/');
    const cvv = document.querySelector('.CVV-input input').value;

    const bookingDetails = {
        cardNumber,
        nameOnCard,
        expiryDate,
        cvv
    };

    try {
        const response = await fetch('http://your-api-endpoint/book-trip', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bookingDetails)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json();
        
        // Show a popup message
        alert(`Booking successful! Confirmation number: ${result.confirmationNumber}`);

    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        alert('Booking failed. Please try again.');
    }
}

// Event listener for the booking button
document.querySelector('.order-button').addEventListener('click', bookTrip);

// Load trip details when the page loads
document.addEventListener('DOMContentLoaded', loadTripDetails);
