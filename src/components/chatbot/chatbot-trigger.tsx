"use client";

import { Bot, X } from "lucide-react";
import { useEffect, useState } from "react";

declare global {
  interface Window {
    Tawk_API?: any;
    onTawkUnreadChange?: (count: number) => void;
  }
}

export function ChatbotTrigger() {
  const [unread, setUnread] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    window.onTawkUnreadChange = (count: number) => {
      setUnread(count);
    };
  }, []);

  const toggleChat = () => {
    if (!window.Tawk_API) return;

    if (isOpen) {
      window.Tawk_API.minimize?.();
      window.Tawk_API.hideWidget?.();
      document.body.classList.remove("tawk-open");
      setIsOpen(false);
    } else {
      window.Tawk_API.showWidget?.();
      window.Tawk_API.maximize?.();
      document.body.classList.add("tawk-open");
      setIsOpen(true);
    }
  };

  return (
    <div className="fixed bottom-24 right-8 z-50 flex items-center gap-2">
      {/* Compact Circular Bot Button */}
      <button
        onClick={toggleChat}
        aria-label="Toggle Telemetry Assistant"
        className="group relative flex size-12 items-center justify-center rounded-full border border-zinc-200 bg-zinc-600/90 text-zinc-100 shadow-2xl backdrop-blur-md transition-all hover:scale-105 hover:border-orange-500/50 hover:bg-zinc-800 active:scale-95 dark:border-zinc-700 dark:bg-zinc-900"
      >
        {/* Live Status Indicator Dot */}
        <span className="absolute right-0.5 top-0.5 flex size-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75"></span>
          <span className="relative inline-flex size-3 rounded-full border-2 border-zinc-900 bg-purple-500"></span>
        </span>

        {/* Icon Toggle */}
        {isOpen ? (
          <X className="size-5 text-zinc-300 transition-transform group-hover:rotate-90" />
        ) : (
          <Bot className="size-5 text-orange-400 dark:text-purple-400 transition-transform group-hover:scale-110" />
        )}

        {/* Unread Message Badge */}
        {unread > 0 && !isOpen && (
          <span className="absolute -left-1 -top-1 flex size-5 items-center justify-center rounded-full bg-orange-500 font-mono text-[10px] font-bold text-zinc-950 shadow-md">
            {unread}
          </span>
        )}
      </button>
    </div>
  );
}
