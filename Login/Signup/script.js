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

        showPopup('Sign In Form is valid');
    }
});