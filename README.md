# Persuasive-Password-Strength-Indicator <br />
A chrome web extension that persuasively presents password strength to users when they enter a password into a password field on a sign up page. <br />
There are two solutions that can be implemented. <br />
In order to change between these solutions change the manifest.json file from:<br />
    "content_scripts": [<br />
      {<br />
        &nbsp;&nbsp;&nbsp;&nbsp;"matches": ["<all_urls>"],<br />
        &nbsp;&nbsp;&nbsp;&nbsp;"js": ["main.js"],<br />
        &nbsp;&nbsp;&nbsp;&nbsp;"css": ["style.css"]<br />
      }<br />
to:<br />
    "content_scripts": [<br />
      {<br />
        &nbsp;&nbsp;&nbsp;&nbsp;"matches": ["<all_urls>"],<br />
        &nbsp;&nbsp;&nbsp;&nbsp;"js": ["PersuasiveEyesBundle.js"],<br />
        &nbsp;&nbsp;&nbsp;&nbsp;"css": ["style.css"]<br />
      }<br />
