document.querySelector('.img__btn').addEventListener('click', function() {
    document.querySelector('.cont').classList.toggle('s--signup');
});

document.addEventListener('DOMContentLoaded', function() {
const img = document.querySelector('.airplane-image img');

document.querySelector('.airplane-image').addEventListener('mousemove', function(e) {
const rect = img.getBoundingClientRect();
const x = e.clientX - rect.left;
const y = e.clientY - rect.top;

// Calculate the movement range
const moveX = (x / rect.width - 0.5) * 50; // 10px max movement
const moveY = (y / rect.height - 0.5) * 50; // 10px max movement

img.style.transform = `translate(${moveX}px, ${moveY}px)`;
});

document.querySelector('.airplane-image').addEventListener('mouseleave', function() {
img.style.transform = 'translate(0, 0)'; // Reset the image position
});

document.getElementById('signInButton').addEventListener('click', sanitizeSignInForm);
document.getElementById('signUpButton').addEventListener('click', sanitizeSignUpForm);
document.getElementById('close-popup').addEventListener('click', closePopup);

function sanitizeInput(input) {
    let sanitized = input.trim();
    sanitized = sanitized.replace(/[<>\/\\'";]/g, '');
    return sanitized;
}

function showPopup(message) {
    const popup = document.getElementById('popup');
    const popupMessage = document.getElementById('popup-message');
    popupMessage.textContent = message;
    popup.classList.remove('hidden');
    popup.style.display = 'block';
}

function closePopup() {
    const popup = document.getElementById('popup');
    popup.classList.add('hidden');
    popup.style.display = 'none';
}

async function fetchLoginApi(email, password) {
    try {
        const res = await fetch("backendAPI", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        });

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        return data; // You can process the data as needed
    } catch (error) {
        console.error('Error:', error);
    }
}

function sanitizeSignInForm() {
    let email = sanitizeInput(document.getElementById('signInEmail').value);
    let password = sanitizeInput(document.getElementById('signInPassword').value);

    if (!email || !password) {
        showPopup('Email and Password cannot be empty');
        return;
    }

    if (!validateEmail(email)) {
        showPopup('Invalid email format');
        return;
    }

    if (!validatePassword(password)) {
        showPopup('Password must be at least 6 characters long');
        return;
    }

    fetchLoginApi(email,password);
}


async function fetchSignupApi(name,email,password,phoneNumber) {
    try {
        const res = await fetch("http://localhost/Airline-System-Backend/public/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name:name,
                email: email,
                password: password,
                phoneNumber:phoneNumber,
            }),
        });


        console.log(res);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        else{
            console.log(res.body);
        }
        const data = await res.json();
        console.log(data.message);

    } catch (error) {
        console.error('Error:', error);
    }
}
/* 
async function fetchSignupApi(name, email, password, phoneNumber) {
    try {
        // Construct the query string
        const queryString = new URLSearchParams({
            name: name,
            email: email,
            password: password,
            phoneNumber: phoneNumber
        }).toString();

        // Send a GET request with query parameters
        const res = await fetch(`http://localhost/Airline-System-Backend/public/api/register?${queryString}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        // Log the response for debugging
        console.log(res);

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        // Parse and log the response data
        const data = await res.json();
        console.log("Data received after success:", data);

    } catch (error) {
        console.error('Error:', error);
    }
}*/

function sanitizeSignUpForm() {
    let name = sanitizeInput(document.getElementById('signUpName').value);
    let email = sanitizeInput(document.getElementById('signUpEmail').value);
    let password = sanitizeInput(document.getElementById('signUpPassword').value);
    let confirmPassword = sanitizeInput(document.getElementById('signUpConfirmPassword').value);
    let phoneNumber = sanitizeInput(document.getElementById('signUpPhoneNumber').value);

    if (!name) {
        showPopup('Name cannot be empty');
        return;
    }

    if (!email) {
        showPopup('Email cannot be empty');
        return;
    }

    if (!validateEmail(email)) {
        showPopup('Invalid email format');
        return;
    }

    if (!password) {
        showPopup('Password cannot be empty');
        return;
    }

    if (!validatePassword(password)) {
        showPopup('Password must be at least 6 characters long');
        return;
    }

    if (password !== confirmPassword) {
        showPopup('Passwords do not match');
        return;
    }

    if (!phoneNumber) {
        showPopup('Phone Number cannot be empty');
        return;
    }

    if (!validatePhoneNumber(phoneNumber)) {
        showPopup('Invalid phone number format');
        return;
    }

    showPopup('Sign Up Form is valid');
    // You can proceed with form submission or further processing
    console.log(name,"====",email,"====",password,"====",phoneNumber,"====");
    fetchSignupApi(name,email,password,phoneNumber);

}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePassword(password) {
    return password.length >= 6;
}

function validateName(name) {
    return name.length > 0;
}

function validatePhoneNumber(phoneNumber) {
    // Matches a number starting with +961 followed by a space and then 8 digits
    const re = /^\+961\s\d{8}$/;
    return re.test(phoneNumber);
}

const passwordToggles = document.querySelectorAll('.passwordToggleClass');

    passwordToggles.forEach(toggle => {
        const passwordInput = toggle.previousElementSibling; // Get the corresponding input field

        // Add mousedown event to show password
        toggle.addEventListener('mousedown', () => {
            passwordInput.type = 'text';
            toggle.classList.remove('fa-eye-slash');
            toggle.classList.add('fa-eye');
            
        });

        // Add mouseup and mouseleave events to hide password
        toggle.addEventListener('mouseup', () => {
            passwordInput.type = 'password';
            toggle.classList.remove('fa-eye');
            toggle.classList.add('fa-eye-slash');
        });

        toggle.addEventListener('mouseleave', () => {
            passwordInput.type = 'password';
            toggle.classList.remove('fa-eye');
            toggle.classList.add('fa-eye-slash');
        });
    });

    const signInPasswordToggle = document.getElementById('signInpasswordToggle');
    const signUpPasswordToggle1 = document.getElementById('signUpPasswordToggle1');
    const signUpPasswordToggle2 = document.getElementById('signUpPasswordToggle2');
    
if (signInPasswordToggle) {
    signInPasswordToggle.addEventListener('mousedown', () => togglePasswordVisibility('signInPassword', true));
    signInPasswordToggle.addEventListener('mouseup', () => togglePasswordVisibility('signInPassword', false));
    signInPasswordToggle.addEventListener('mouseleave', () => togglePasswordVisibility('signInPassword', false));
}

if (signUpPasswordToggle1) {
    signUpPasswordToggle1.addEventListener('mousedown', () => togglePasswordVisibility('signUpPassword', true));
    signUpPasswordToggle1.addEventListener('mouseup', () => togglePasswordVisibility('signUpPassword', false));
    signUpPasswordToggle1.addEventListener('mouseleave', () => togglePasswordVisibility('signUpPassword', false));
}
if (signUpPasswordToggle2) {
    signUpPasswordToggle2.addEventListener('mousedown', () => togglePasswordVisibility('signUpConfirmPassword', true));
    signUpPasswordToggle2.addEventListener('mouseup', () => togglePasswordVisibility('signUpConfirmPassword', false));
    signUpPasswordToggle2.addEventListener('mouseleave', () => togglePasswordVisibility('signUpConfirmPassword', false));
}

function togglePasswordVisibility(inputId, show) {
    const passwordInput = document.getElementById(inputId);
    if (passwordInput) {
        if (show) {
            passwordInput.type = 'text';
            //passwordToggle.classList.remove('fa-eye-slash');
            //passwordToggle.classList.add('fa-eye');
        } else {
            passwordInput.type = 'password';
            //passwordToggle.classList.remove('fa-eye');
            //passwordToggle.classList.add('fa-eye-slash');
        }
    }
}


});

