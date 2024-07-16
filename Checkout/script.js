// Function to fetch and load trip details from the database
async function loadTripDetails() {
    try {
        const response = await fetch('http://localhost/Airline-System-Backend/public/api/bookings/details', {
            method: 'GET',  
            headers: {
                'Content-Type': 'application/json',
                
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const booking = data.response; // Accessing the booking data within the response

        // Populate HTML with the data
        document.querySelector('.trip-details .departure-from p').textContent = `Depart ${booking.departure_location} at ${booking.departure_time}`;
        document.querySelector('.trip-details .departure-to p').textContent = `Arrive ${booking.arrival_location} at ${booking.arrival_time}`;
        
        document.querySelector('.hotel-taxi-details .departure-from:nth-of-type(1) p').textContent = `Check-in ${booking.checkin_date}`;
        document.querySelector('.hotel-taxi-details .departure-to:nth-of-type(1) p').textContent = `Check-out ${booking.checkout_date}`;
        
        document.querySelector('.hotel-taxi-details .departure-from:nth-of-type(2) p').textContent = `Pickup from ${booking.pickup_location} at ${booking.pickup_time}`;
        document.querySelector('.hotel-taxi-details .departure-to:nth-of-type(2) p').textContent = `Dropoff at ${booking.dropoff_location} at ${booking.dropoff_time}`;
        
        document.querySelector('.total-price').textContent = `Total Price: $${data.total_price}`;
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
