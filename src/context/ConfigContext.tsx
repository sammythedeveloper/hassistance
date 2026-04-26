// src/context/ConfigContext.tsx
"use client";

import {
  createContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

interface ConfigState {
  stack: string;
  os: string;
  hoursCoded: number;
  theme: string;
  language: string;
}

interface ConfigContextValue {
  config: ConfigState;
  setConfig: Dispatch<SetStateAction<ConfigState>>;
}

export const ConfigContext = createContext<ConfigContextValue>({
  config: {
    stack: "Full Stack",
    os: "MacOS",
    hoursCoded: 4,
    theme: "Dark",
    language: "en",
  },
  setConfig: () => undefined,
});

export function ConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<ConfigState>({
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
