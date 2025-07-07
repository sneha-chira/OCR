let uploadedImage = null;

document.getElementById("imageInput").addEventListener("change", function (e) {
  uploadedImage = e.target.files[0];
});

function extractText() {
  const outputText = document.getElementById("outputText");

  if (!uploadedImage) {
    alert("Please upload an image!");
    return;
  }

  const reader = new FileReader();

  reader.onload = function (e) {
    Tesseract.recognize(
      e.target.result,
      'eng',
      {
        logger: m => console.log(m)
      }
    ).then(({ data: { text } }) => {
      outputText.value = text;
    }).catch(err => {
      outputText.value = "Error extracting text: " + err;
      console.error(err);
    });
  };

  reader.readAsDataURL(uploadedImage);
}

function downloadText() {
  const text = document.getElementById("outputText").value;
  const blob = new Blob([text], { type: "text/plain" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "extracted_text.txt";
  a.click();
}
