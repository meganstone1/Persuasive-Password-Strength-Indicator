import { zxcvbnAsync, zxcvbnOptions, debounce } from '@zxcvbn-ts/core';
import zxcvbnCommonPackage from '@zxcvbn-ts/language-common';
import zxcvbnEnPackage from '@zxcvbn-ts/language-en';
if (window.location.href.indexOf("create") > -1 || window.location.href.indexOf("signup") > -1 || window.location.href.indexOf("register") > -1 || window.location.href.indexOf("emailsignup") > -1){
  
  let password = '';

  const options = {
    translations: zxcvbnEnPackage.translations,
    graphs: zxcvbnCommonPackage.adjacencyGraphs,
    dictionary: {
      ...zxcvbnCommonPackage.dictionary,
      ...zxcvbnEnPackage.dictionary,
    },
  }
  zxcvbnOptions.setOptions(options);
  const imageDiv = document.createElement('div');
  imageDiv.classList.add('center');
  imageDiv.style.visibility="hidden";
  document.body.appendChild(imageDiv);
  var lookingStraight = document.createElement("img");
  lookingStraight.classList.add('center');
  var straighteyesUrl = chrome.extension.getURL("./images/lookingstraight.png");
  lookingStraight.src = straighteyesUrl;
  lookingStraight.style.visibility="hidden";
  imageDiv.appendChild(lookingStraight); 
  var lookingRight = document.createElement("img");
  lookingRight.classList.add('center');
  var righteyesUrl = chrome.extension.getURL("./images/lookingright.png");
  lookingRight.src = righteyesUrl;
  lookingRight.style.visibility="hidden";
  imageDiv.appendChild(lookingRight); 
  var lookingLeft = document.createElement("img");
  lookingLeft.classList.add('center');
  var lefteyesUrl = chrome.extension.getURL("./images/lookingleft.png");
  lookingLeft.src = lefteyesUrl;
  lookingLeft.style.visibility="hidden";
  imageDiv.appendChild(lookingLeft); 


  let mousePos = { x: undefined, y: undefined };
    document.addEventListener("keyup", function(e) {
      if (e.target.type === 'password')  {
        password = e.target.value;
        password = zxcvbnAsync(password);
        password.then((value) => { 
        window.addEventListener('mousemove', (event) => {
        mousePos = { x: event.clientX, y: event.clientY };
        if (mousePos.x <=500 && value.score < 3 ){
              lookingRight.style.visibility="hidden";
              lookingStraight.style.visibility="hidden";
              imageDiv.style.visibility="visible";
              lookingLeft.style.visibility="visible";
              
            }
        if (mousePos.x > 500 && mousePos.x <= 1000 && value.score < 3){
              lookingRight.style.visibility="hidden";
              lookingLeft.style.visibility="hidden";
              imageDiv.style.visibility="visible";
              lookingStraight.style.visibility="visible";
          }
        if (mousePos.x > 1000 && value.score < 3){
            lookingStraight.style.visibility="hidden";
            lookingLeft.style.visibility="hidden";
            imageDiv.style.visibility="visible";
            lookingRight.style.visibility="visible";
            }
        if (value.score > 3 || value.password == '') {
          imageDiv.style.visibility="hidden";
          lookingStraight.style.visibility="hidden";
          lookingLeft.style.visibility="hidden";
          lookingRight.style.visibility="hidden";
        }
      })
    })
      }})
      };
