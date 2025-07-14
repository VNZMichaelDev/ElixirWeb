// EmailJS CDN loader for ElixirWeb
// This file loads EmailJS SDK from CDN if not already loaded
(function() {
  if (!window.emailjs) {
    var script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/emailjs-com@3/dist/email.min.js';
    script.async = true;
    script.onload = function() {
      if (window.emailjs && window.ElixirEmailJSConfig && window.emailjs.init) {
        window.emailjs.init(window.ElixirEmailJSConfig.publicKey);
      }
    };
    document.head.appendChild(script);
  } else if (window.ElixirEmailJSConfig && window.emailjs.init) {
    window.emailjs.init(window.ElixirEmailJSConfig.publicKey);
  }
})();
