import { zxcvbnAsync, zxcvbnOptions, debounce } from '@zxcvbn-ts/core'
import zxcvbnCommonPackage from '@zxcvbn-ts/language-common'
import zxcvbnEnPackage from '@zxcvbn-ts/language-en'
import matcherPwnedFactory from '@zxcvbn-ts/matcher-pwned'


let password = 'somePassword'

const options = {
  translations: zxcvbnEnPackage.translations,
  graphs: zxcvbnCommonPackage.adjacencyGraphs,
  dictionary: {
    ...zxcvbnCommonPackage.dictionary,
    ...zxcvbnEnPackage.dictionary,
  },
}
const matcherPwned = matcherPwnedFactory(fetch, zxcvbnOptions)
zxcvbnOptions.setOptions(options)
zxcvbnOptions.addMatcher('pwned', matcherPwned)


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
      password = zxcvbnAsync(password);
      password.then((value) => {
        console.log(value);
        presentStrength(value);
      })
    }
  });

function presentStrength(value, num) {
    var inputField = document.activeElement;
    var box = document.createElement("div");
    box.replaceChildren();
    box.style.position = "absolute";
    box.style.top = inputField.offsetTop + inputField.offsetHeight + "px";
    box.style.left = inputField.offsetLeft + "px";
    box.style.width = inputField.offsetWidth + "px";
    box.style.height = "25px";
    box.style.backgroundColor = "white";
    box.style.zIndex= 99999999999;
    box.textContent = value.feedback.warning;
    box.style.border = "medium solid black";
    inputField.parentNode.insertBefore(box, inputField.nextSibling);

  }


  
