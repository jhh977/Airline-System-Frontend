const herroSection = document.querySelector(".herro-section");
const airplaneImage = document.querySelector(".airplane-image img");

herroSection.addEventListener("mousemove", (e) => {
  const { offsetX, offsetY, target } = e;
  const { clientWidth, clientHeight } = target;
  const moveX = (offsetX / clientWidth) * 30 - 15;
  const moveY = (offsetY / clientHeight) * 30 - 15;

  airplaneImage.style.transform = `translate(-50%, -50%) translate(${moveX}px, ${moveY}px)`;
});

herroSection.addEventListener("mouseleave", () => {
  airplaneImage.style.transform = `translate(-50%, -50%)`; // Reset position on mouse leave
});

const login = document.getElementById("login-btn");
login.addEventListener("click", function () {
  window.location.href = "../Login/Signup/login-signup.html";
});

// document.addEventListener("DOMContentLoaded", () => {
//   const uID = localStorage.getItem("userID");
//   const login = document.querySelector("#login"); // Assuming there is an element with the ID 'login'

//   if (uID !== null) {
//     login.style.display = "none";
//   } else {
//     login.style.display = "inline";
//   }
// });

const user = localStorage.getItem("userID");
console.log(user);
document.querySelector(".search-btn").addEventListener("click", async () => {
  const from = sanitizeInput(document.getElementById("from").value);
  const to = sanitizeInput(document.getElementById("to").value);
  const travellers = sanitizeInput(document.getElementById("travellers").value);
  const travelClass = sanitizeInput(document.getElementById("class").value);

  const requestBody = {
    from: from,
    to: to,
    travellers: travellers,
    class: travelClass,
  };
  console.log(requestBody);
});

function sanitizeInput(text) {
  return text.trim();
}
