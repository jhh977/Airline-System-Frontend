const herroSection = document.querySelector(".herro-section");
const airplaneImage = document.querySelector(".airplane-image img");

herroSection.addEventListener("mousemove", (e) => {
  const { offsetX, offsetY, target } = e;
  const { clientWidth, clientHeight } = target;
  const moveX = (offsetX / clientWidth) * 30 - 15; // Adjust the 30 for intensity
  const moveY = (offsetY / clientHeight) * 30 - 15; // Adjust the 30 for intensity

  airplaneImage.style.transform = `translate(-50%, -50%) translate(${moveX}px, ${moveY}px)`;
});

herroSection.addEventListener("mouseleave", () => {
  airplaneImage.style.transform = `translate(-50%, -50%)`; // Reset position on mouse leave
});

const login = document.getElementById("login-btn");
login.addEventListener("click", function () {
  window.location.href = "../Login/Signup/login-signup.html";
});

document.addEventListener("DOMContentLoaded", () => {
  const uID = localStorage.getItem("userID");
  console.log(uID);
  if (typeof uID !== "undefined") {
    login.style.display = "none";
  } else {
    login.style.display = "inline";
  }
});
