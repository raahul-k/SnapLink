const loginBtn = document.querySelector("form button");
const inputFields = document.querySelectorAll("form input");

inputFields.forEach((field) => {
  field.addEventListener("focus", () => {
    loginBtn.style.bottom = "30vh";
  });
  field.addEventListener("blur", () => {
    loginBtn.style.bottom = "10px";
  });
});
