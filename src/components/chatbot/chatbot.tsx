"use client";

import Script from "next/script";

export function Chatbot() {
  return (
    <Script
      id="tawk-to"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          window.Tawk_API = window.Tawk_API || {};
          window.Tawk_LoadStart = new Date();

          // Hide default UI as soon as Tawk is ready
          window.Tawk_API.onLoad = function () {
            try {
              window.Tawk_API.hideWidget();
              window.Tawk_API.minimize();
            } catch (e) {}
          };

          window.Tawk_API.onChatMinimized = function () {
            try {
              window.Tawk_API.hideWidget();
              document.body.classList.remove("tawk-open");
            } catch (e) {}
          };

          window.Tawk_API.onChatMaximized = function () {
            document.body.classList.add("tawk-open");
          };

          window.Tawk_API.onUnreadCountChanged = function (count) {
            if (typeof window.onTawkUnreadChange === "function") {
              window.onTawkUnreadChange(count);
            }
          };

          (function () {
            var s1 = document.createElement("script");
            var s0 = document.getElementsByTagName("script")[0];
            s1.async = true;
            s1.src = "https://embed.tawk.to/YOUR_PROPERTY_ID/YOUR_WIDGET_ID";
            s1.charset = "UTF-8";
            s1.setAttribute("crossorigin", "*");
            s0.parentNode.insertBefore(s1, s0);
          })();
        `,
      }}
    />
  );
}
