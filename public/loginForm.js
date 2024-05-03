const loginBtn = document.querySelector("form button");
const inputFields = document.querySelectorAll("form input");

const initialWindowHeight = window.innerHeight;

function adjustButtonHeight() {
  let keyboardHeight = initialWindowHeight - window.innerHeight;
  loginBtn.style.bottom = `${keyboardHeight + 20}px`;
}

window.addEventListener("resize", adjustButtonHeight);

adjustButtonHeight();

// inputFields.forEach((field) => {
//   field.addEventListener("focus", () => {
//     loginBtn.style.bottom = "30vh";
//   });
//   field.addEventListener("blur", () => {
//     loginBtn.style.bottom = "10px";
//   });
// });
