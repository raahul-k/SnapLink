const copyToClipboard = (i) => {
  const copyUrl = document.querySelectorAll(".urlToCopy");

  // Create a range and select the text
  const range = document.createRange();
  range.selectNode(copyUrl[i]);
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(range);

  // Copy the text to the clipboard
  document.execCommand("copy", true);

  // Deselect the text
  window.getSelection().removeAllRanges();

  // Optionally, provide feedback to the user
  console.log("Copied to clipboard");
};

const copyBtn = document.querySelectorAll(".copyBtn");
for (let i = 0; i < copyBtn.length; i++) {
  copyBtn[i].addEventListener("click", () => {
    for (let i = 0; i < copyBtn.length; i++) {
      copyBtn[i].innerHTML =
        '<i class="fa-regular fa-copy"></i><span>Copy</span>';
      copyBtn[i].style.backgroundColor = "rgba(0, 0, 0, 0.3)";
    }
    copyBtn[i].innerHTML =
      '<i class="fa-solid fa-circle-check" style="color: #4cc24e;"></i><span>Copied</span>';
    copyBtn[i].style.backgroundColor = "white";
    copyToClipboard(i);
  });
}

{
  /* <i class="fa-solid fa-circle-check" style="color: #4cc24e;"></i>; */
}
