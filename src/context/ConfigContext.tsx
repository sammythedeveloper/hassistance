// context/ConfigContext.tsx
"use client";
import { createContext, useState } from "react";

// 1. Create and EXPORT the context
export const ConfigContext = createContext<any>(null);

export function ConfigProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState({
    stack: "Full Stack",
    os: "MacOS",
    hoursCoded: 4,
    theme: "Dark",
    language: "en",
  });
  
  return (
    <ConfigContext.Provider value={{ config, setConfig }}>
      {children}
    </ConfigContext.Provider>
  );
}