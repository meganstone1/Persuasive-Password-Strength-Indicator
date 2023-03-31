const zxcvbn = require('zxcvbn');

document.addEventListener("keyup", function(event) {
    if (event.target.type === "password") {
      chrome.runtime.sendMessage({
        action: "keyup",
        value: event.target.value
      });
    }
  });
  
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "display") {
      var inputField = document.querySelector("input");
      password = request.value;
      console.log(zxcvbn(password));
      var score = zxcvbn(password.score);
      inputField.value = String(score);

    }
  });
  
  
