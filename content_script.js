import { zxcvbnAsync, zxcvbnOptions, debounce } from '@zxcvbn-ts/core';
import zxcvbnCommonPackage from '@zxcvbn-ts/language-common';
import zxcvbnEnPackage from '@zxcvbn-ts/language-en';
import matcherPwnedFactory from '@zxcvbn-ts/matcher-pwned';
if (window.location.href.indexOf("create") > -1 || window.location.href.indexOf("signup") > -1 || window.location.href.indexOf("register") > -1 || window.location.href.indexOf("emailsignup") > -1 || window.location.href.indexOf("-1 signUp")){
  
  var randomWords = require('random-words');
  let password = '';

  const options = {
    translations: zxcvbnEnPackage.translations,
    graphs: zxcvbnCommonPackage.adjacencyGraphs,
    dictionary: {
      ...zxcvbnCommonPackage.dictionary,
      ...zxcvbnEnPackage.dictionary,
    },
  };
  const matcherPwned = matcherPwnedFactory(fetch, zxcvbnOptions);
  zxcvbnOptions.setOptions(options);
  zxcvbnOptions.addMatcher('pwned', matcherPwned);

  const box = document.createElement('div');
  box.classList.add('box');
  document.body.appendChild(box);
  box.style.position = 'fixed';
  box.style.visibility = 'hidden';

  const RecBox = document.createElement('div');
  RecBox.classList.add('RecBox');
  document.body.appendChild(RecBox);
  RecBox.style.position = 'fixed';
  RecBox.style.visibility = 'hidden';
  var copyButton = document.createElement("button");
  copyButton.classList.add('copyButton');
  copyButton.type = "button";
  copyButton.innerHTML = "Copy Password";
  var retryButton = document.createElement("button");
  retryButton.classList.add('retryButton');
  retryButton.type = "button";
  retryButton.innerHTML = "Refresh Suggestion";
  var triggered = 0;
  var passwordSuggestion;
  var passwordSuggestion;
  var passwordSuggestionArr;
  var suggestionMessage = "Strong Password Suggestion: " ;

  const hackBox = document.createElement('div');
  hackBox.classList.add('box');
  document.body.appendChild(hackBox);
  hackBox.style.position = 'fixed';
  hackBox.style.visibility = 'hidden';

  const breachBox = document.createElement('div');
  breachBox.classList.add('box');
  document.body.appendChild(breachBox);
  breachBox.style.position = 'fixed';
  breachBox.style.visibility = 'hidden';

  document.addEventListener("keyup", function(e) {
    if (e.target.type === 'password')  {
          if ( triggered == 0){
            var inputField = document.activeElement;
            const inputRectb2 = inputField.getBoundingClientRect();
            const scrollTopb2 = document.documentElement.scrollTop || document.body.scrollTop;
            const topb2 = (inputRectb2.top + scrollTopb2) - 75;
            const leftb2 = inputRectb2.right + 105;
            RecBox.style.top = `${topb2}px`;
            RecBox.style.left = `${leftb2}px`;
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
        }}});


  document.addEventListener("keyup", function(e) {
      if (e.target.type === 'password')  {
        password = e.target.value;
        password = zxcvbnAsync(password);
        password.then((value) => {
            var value1 = String(value.password);
            const sha1Hash = Sha1.hash(value1);
            var prefix = sha1Hash.substring(0, 5);
            var suffix = (sha1Hash.substring(5)).toUpperCase();
            var url = 'https://api.pwnedpasswords.com/range/'+prefix;
            let breachedCountMessage = null;
            fetch(url).then((response) => response.text())
            .then((data) => {
              const lines = data.split("\n");
              for (let line of lines) {
                const [hashSuffix, count] = line.split(":");
                if (hashSuffix === suffix) {
                  const breachedCount = parseInt(count);
                  if (breachedCount > 0) {
                  breachedCountMessage = ("Your password has been breached " + breachedCount + " times!");
                  }
                }
                
              }
            })
            .finally(() => {
              var crackTime = "Your password can be hacked in " +  value.crackTimesDisplay.offlineSlowHashing1e4PerSecond + "!";
              var inputField = document.activeElement;
              const inputRect = inputField.getBoundingClientRect();
              const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
              const top = (inputRect.top + scrollTop) + 20;
              const left = inputRect.right + 105;
              var inputField = document.activeElement;
              const inputRectb3 = inputField.getBoundingClientRect();
              const scrollTopb3 = document.documentElement.scrollTop || document.body.scrollTop;
              const topb3 = (inputRectb3.top + scrollTopb3) + 140;
              const leftb3 = inputRectb3.right + 105;
              var inputField = document.activeElement;
              const inputRectb4 = inputField.getBoundingClientRect();
              const scrollTopb4 = document.documentElement.scrollTop || document.body.scrollTop;
              const topb4 = (inputRectb4.top + scrollTopb4) + 80;
              const leftb4 = inputRectb4.right + 105;
              var hackerFactArr = ["With this account, hackers can steal and sell your information!", "With this account, hackers can steal your identity!", "With this account, hackers can access any account with the same password!", "With this account, hackers can access your private information! "]
              var hackerFact = hackerFactArr[Math.floor(Math.random()*hackerFactArr.length)];
              if (breachedCountMessage == null){
                breachedCountMessage = "This password has not been breached!"
              }
              if (value.password == '') {
                box.style.visibility = 'hidden';
                hackBox.style.visibility = 'hidden';
                breachBox.style.visibility = 'hidden';

              }
              else{
                box.style.top = `${top}px`;
                box.style.left = `${left}px`;
                box.style.visibility = 'visible';
                box.textContent = crackTime;
                hackBox.style.top = `${topb3}px`;
                hackBox.style.left = `${leftb3}px`;
                hackBox.style.visibility = 'visible';
                hackBox.textContent = hackerFact;
                breachBox.style.top = `${topb4}px`;
                breachBox.style.left = `${leftb4}px`;
                breachBox.style.visibility = 'visible';
                breachBox.textContent = breachedCountMessage;
              }          
            });

        })
      }
    });
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

    var Sha1 = {};


    /**
     * Generates SHA-1 hash of string.
     *
     * @param   {string} msg - (Unicode) string to be hashed.
     * @returns {string} Hash of msg as hex character string.
     */
    Sha1.hash = function(msg) {
        // convert string to UTF-8, as SHA only deals with byte-streams
        msg = msg.utf8Encode();
        // constants [?4.2.1]
        var K = [ 0x5a827999, 0x6ed9eba1, 0x8f1bbcdc, 0xca62c1d6 ];
    
        // PREPROCESSING
    
        msg += String.fromCharCode(0x80);  // add trailing '1' bit (+ 0's padding) to string [?5.1.1]
    
        // convert string msg into 512-bit/16-integer blocks arrays of ints [?5.2.1]
        var l = msg.length/4 + 2; // length (in 32-bit integers) of msg + ?1? + appended length
        var N = Math.ceil(l/16);  // number of 16-integer-blocks required to hold 'l' ints
        var M = new Array(N);
    
        for (var i=0; i<N; i++) {
            M[i] = new Array(16);
            for (var j=0; j<16; j++) {  // encode 4 chars per integer, big-endian encoding
                M[i][j] = (msg.charCodeAt(i*64+j*4)<<24) | (msg.charCodeAt(i*64+j*4+1)<<16) |
                    (msg.charCodeAt(i*64+j*4+2)<<8) | (msg.charCodeAt(i*64+j*4+3));
            } // note running off the end of msg is ok 'cos bitwise ops on NaN return 0
        }
        // add length (in bits) into final pair of 32-bit integers (big-endian) [?5.1.1]
        // note: most significant word would be (len-1)*8 >>> 32, but since JS converts
        // bitwise-op args to 32 bits, we need to simulate this by arithmetic operators
        M[N-1][14] = ((msg.length-1)*8) / Math.pow(2, 32); M[N-1][14] = Math.floor(M[N-1][14]);
        M[N-1][15] = ((msg.length-1)*8) & 0xffffffff;
    
        // set initial hash value [?5.3.1]
        var H0 = 0x67452301;
        var H1 = 0xefcdab89;
        var H2 = 0x98badcfe;
        var H3 = 0x10325476;
        var H4 = 0xc3d2e1f0;
    
        // HASH COMPUTATION [?6.1.2]
    
        var W = new Array(80); var a, b, c, d, e;
        for (var i=0; i<N; i++) {
    
            // 1 - prepare message schedule 'W'
            for (var t=0;  t<16; t++) W[t] = M[i][t];
            for (var t=16; t<80; t++) W[t] = Sha1.ROTL(W[t-3] ^ W[t-8] ^ W[t-14] ^ W[t-16], 1);
    
            // 2 - initialise five working variables a, b, c, d, e with previous hash value
            a = H0; b = H1; c = H2; d = H3; e = H4;
    
            // 3 - main loop
            for (var t=0; t<80; t++) {
                var s = Math.floor(t/20); // seq for blocks of 'f' functions and 'K' constants
                var T = (Sha1.ROTL(a,5) + Sha1.f(s,b,c,d) + e + K[s] + W[t]) & 0xffffffff;
                e = d;
                d = c;
                c = Sha1.ROTL(b, 30);
                b = a;
                a = T;
            }
    
            // 4 - compute the new intermediate hash value (note 'addition modulo 2^32')
            H0 = (H0+a) & 0xffffffff;
            H1 = (H1+b) & 0xffffffff;
            H2 = (H2+c) & 0xffffffff;
            H3 = (H3+d) & 0xffffffff;
            H4 = (H4+e) & 0xffffffff;
        }
    
        return Sha1.toHexStr(H0) + Sha1.toHexStr(H1) + Sha1.toHexStr(H2) +
              Sha1.toHexStr(H3) + Sha1.toHexStr(H4);
    };
    
    
    /**
     * Function 'f' [?4.1.1].
     * @private
     */
    Sha1.f = function(s, x, y, z)  {
        switch (s) {
            case 0: return (x & y) ^ (~x & z);           // Ch()
            case 1: return  x ^ y  ^  z;                 // Parity()
            case 2: return (x & y) ^ (x & z) ^ (y & z);  // Maj()
            case 3: return  x ^ y  ^  z;                 // Parity()
        }
    };
    
    /**
     * Rotates left (circular left shift) value x by n positions [?3.2.5].
     * @private
     */
    Sha1.ROTL = function(x, n) {
        return (x<<n) | (x>>>(32-n));
    };
    
    
    /**
     * Hexadecimal representation of a number.
     * @private
     */
    Sha1.toHexStr = function(n) {
        // note can't use toString(16) as it is implementation-dependant,
        // and in IE returns signed numbers when used on full words
        var s="", v;
        for (var i=7; i>=0; i--) { v = (n>>>(i*4)) & 0xf; s += v.toString(16); }
        return s;
    };
    
    
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
    
    
    /** Extend String object with method to encode multi-byte string to utf8
     *  - monsur.hossa.in/2012/07/20/utf-8-in-javascript.html */
    if (typeof String.prototype.utf8Encode == 'undefined') {
        String.prototype.utf8Encode = function() {
            return unescape( encodeURIComponent( this ) );
        };
    }
    
    /** Extend String object with method to decode utf8 string to multi-byte */
    if (typeof String.prototype.utf8Decode == 'undefined') {
        String.prototype.utf8Decode = function() {
            try {
                return decodeURIComponent( escape( this ) );
            } catch (e) {
                return this; // invalid UTF-8? return as-is
            }
        };
    }
    
    
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
    if (typeof module != 'undefined' && module.exports) module.exports = Sha1; // CommonJs export
    if (typeof define == 'function' && define.amd) define([], function() { return Sha1; }); // AMD

  //http://www.java2s.com/example/nodejs/security/sha1-hash-function-reference-implementation.html 







}

