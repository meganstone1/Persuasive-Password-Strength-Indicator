import { zxcvbnAsync, zxcvbnOptions, debounce } from '@zxcvbn-ts/core';
import zxcvbnCommonPackage from '@zxcvbn-ts/language-common';
import zxcvbnEnPackage from '@zxcvbn-ts/language-en';
if (window.location.href.indexOf("create") > -1 || window.location.href.indexOf("signup") > -1 || window.location.href.indexOf("register") > -1 || window.location.href.indexOf("emailsignup") > -1){
  
  var randomWords = require('random-words');
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
  
  var lookingStraight = document.createElement("img");
  lookingStraight.classList.add('center');
  var straighteyesUrl = chrome.extension.getURL("./images/lookingstraight.png");
  lookingStraight.src = straighteyesUrl;
  lookingStraight.style.visibility="hidden";
  document.body.appendChild(lookingStraight); 
  var lookingRight = document.createElement("img");
  lookingRight.classList.add('center');
  var righteyesUrl = chrome.extension.getURL("./images/lookingright.png");
  lookingRight.src = righteyesUrl;
  lookingRight.style.visibility="hidden";
  document.body.appendChild(lookingRight); 
  var lookingLeft = document.createElement("img");
  lookingLeft.classList.add('center');
  var lefteyesUrl = chrome.extension.getURL("./images/lookingleft.png");
  lookingLeft.src = lefteyesUrl;
  lookingLeft.style.visibility="hidden";
  document.body.appendChild(lookingLeft); 

  const strengthBox = document.createElement('div');
  strengthBox.classList.add('strengthBox');
  document.body.appendChild(strengthBox);
  strengthBox.style.position = 'fixed';
  strengthBox.style.visibility = 'hidden';
  strengthBox.textContent = 'This password is weak! Your account will be vulnerable!';

  const RecBox = document.createElement('div');
  RecBox.classList.add('RecBoxEyes');
  document.body.appendChild(RecBox);
  RecBox.style.position = 'fixed';
  RecBox.style.visibility = 'hidden';
  var copyButton = document.createElement("button");
  copyButton.classList.add('copyButtonEyes');
  copyButton.type = "button";
  copyButton.innerHTML = "Copy Password";
  var retryButton = document.createElement("button");
  retryButton.classList.add('retryButtonEyes');
  retryButton.type = "button";
  retryButton.innerHTML = "Refresh Suggestion";
  var triggered = 0;
  var passwordSuggestion;
  var passwordSuggestion;
  var passwordSuggestionArr;
  var suggestionMessage = "Use a strong password:" ;
  
  let mousePos = { x: undefined, y: undefined };
  document.addEventListener("keyup", function(e) {
      if (e.target.type === 'password')  {
        password = e.target.value;
        password = zxcvbnAsync(password);
        password.then((value) => { 
          if (value.score < 3)
          {
            e.target.type = 'text';
            setTimeout(function(){
              e.target.type = 'password';
              setTimeout(function(){
                e.target.type = 'text';
                setTimeout(function(){
                  e.target.type = 'password';
                  setTimeout(function(){
                    e.target.type = 'text';
                    setTimeout(function(){
                      e.target.type = 'password';
                      }, 200);
                    }, 400);
                  }, 100);
                }, 200);
              }, 400);
              lookingStraight.style.visibility="visible";
              var inputField = document.activeElement;
              const inputRect = inputField.getBoundingClientRect();
              const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
              const top = (inputRect.top + scrollTop);
              const left = inputRect.right + 105;
              strengthBox.style.top = `${top}px`;
              strengthBox.style.left = `${left}px`;
              strengthBox.style.visibility = 'visible';
              if ( triggered == 0){
                RecBox.style.visibility = 'visible';
                passwordSuggestion = randomWords(4);
                for(var i = 0 ; i < passwordSuggestion.length ; i++){
                      passwordSuggestion[i] = passwordSuggestion[i].charAt(0).toUpperCase() + passwordSuggestion[i].substr(1);
                    }       
                passwordSuggestion = passwordSuggestion.join('');
                passwordSuggestionArr = [suggestionMessage, passwordSuggestion];
                passwordSuggestionArr = passwordSuggestionArr.join('\r\n');
                RecBox.innerText = passwordSuggestionArr;
                RecBox.appendChild(copyButton);
                RecBox.appendChild(retryButton);
                triggered++;
              }
            }
            if (value.score >= 3 || value.password == '') {
              lookingStraight.style.visibility="hidden";
              strengthBox.style.visibility = 'hidden';
            }
          window.addEventListener('mousemove', (event) => {
            mousePos = { x: event.clientX, y: event.clientY };
            lookingStraight.style.visibility="hidden";
            if (mousePos.x <=500 && value.score < 3 ){
                  lookingRight.style.visibility="hidden";
                  lookingStraight.style.visibility="hidden";
                  lookingLeft.style.visibility="visible"; 
                }
            else if (mousePos.x > 500 && mousePos.x <= 1000 && value.score < 3){
                  lookingRight.style.visibility="hidden";
                  lookingLeft.style.visibility="hidden";
                  lookingStraight.style.visibility="visible";
              }
            else if (mousePos.x > 1000 && value.score < 3){
                lookingStraight.style.visibility="hidden";
                lookingLeft.style.visibility="hidden";
                lookingRight.style.visibility="visible";
                }
            if (value.score >= 3 || value.password == '') {
                lookingStraight.style.visibility="hidden";
                lookingLeft.style.visibility="hidden";
                lookingRight.style.visibility="hidden";
                }        
        })
      })
  }})
  copyButton.onclick = function(){
    navigator.clipboard.writeText(passwordSuggestion).then(() => {
    });
  };
  retryButton.onclick = function(){
    passwordSuggestion = randomWords(4);
    for(var i = 0 ; i < passwordSuggestion.length ; i++){
      passwordSuggestion[i] = passwordSuggestion[i].charAt(0).toUpperCase() + passwordSuggestion[i].substr(1);
    }       
    passwordSuggestion = passwordSuggestion.join('');
    passwordSuggestionArr = [suggestionMessage, passwordSuggestion];
    passwordSuggestionArr = passwordSuggestionArr.join('\r\n');
    RecBox.innerText  = passwordSuggestionArr;
    RecBox.appendChild(copyButton);
    RecBox.appendChild(retryButton);
  }
}; 
