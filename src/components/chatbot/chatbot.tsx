"use client";

import Script from "next/script";

export function Chatbot() {
  return (
    <Script
      id="tawk-to"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
          
          Tawk_API.onLoad = function() {
            if (window.Tawk_API) {
              window.Tawk_API.hideWidget();
            }
          };

          // Hides the white bubble whenever the user closes/minimizes the chat
          Tawk_API.onChatMinimized = function() {
            if (window.Tawk_API) {
              window.Tawk_API.hideWidget();
            }
          };

          Tawk_API.onUnreadCountChanged = function(count) {
            if (window.onTawkUnreadChange) {
              window.onTawkUnreadChange(count);
            }
          };

          (function(){
            var s1 = document.createElement("script");
            var s0 = document.getElementsByTagName("script")[0];

            s1.async = true;
            s1.src = 'https://embed.tawk.to/6a67c54aaa7dbb1d404d07a3/1juillb5p';
            s1.charset = 'UTF-8';
            s1.setAttribute('crossorigin','*');

            s0.parentNode.insertBefore(s1,s0);
          })();
        `,
      }}
    />
  );
}
