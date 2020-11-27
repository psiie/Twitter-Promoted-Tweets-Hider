// ==UserScript==
// @name         Highlight Promoted Tweets
// @namespace    https://github.com/darkenvy
// @version      1.0
// @description  Remove ads one tweet at a time
// @author       darkenvy
// @match        https://twitter.com/*
// @grant        GM_addStyle
// ==/UserScript==

(function() {
  'use strict';

  GM_addStyle (`
    .promoted-tweet > div {
      background: #fffece;
      opacity: 0.1;

      transition: opacity .5s ease-in-out;
     -moz-transition: opacity .5s ease-in-out;
     -webkit-transition: opacity .5s ease-in-out;
    }

    .promoted-tweet::before {
      content: "Promoted Tweet";
      z-index: 10;
      font-size: 24pt;
      font-family: sans-serif;
      font-weight: bold;

      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    /* Uncomment the next 4 lines if want to enable hover-to-see */
    /*.promoted-tweet > div:hover {
      background: #ffc90085;
      opacity: 0.75;
    }*/
    /* Uncomment the above 4 lines if you want to enable hover-to-see */
  `);

  const ONE_SECOND = 1000;
  let lastCheck = Date.now();

  window.addEventListener('scroll', event => {
    const now = Date.now();
    const timeDelta = now - lastCheck

    if (timeDelta < ONE_SECOND) return;

    lastCheck = now;

    Array.from(document.querySelector('[aria-label*="Timeline"] div').children).forEach(item => {
      if (/Promoted$/.test(item.innerText)) {
        item.classList.add('promoted-tweet');
      }
    });

  });
})();