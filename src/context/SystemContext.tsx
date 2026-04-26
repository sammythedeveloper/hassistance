"use client";

import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import type {
  BaseConfig,
  Category,
  CategoryMetricOverrides,
} from "@/lib/telemetry";

export interface SystemBaseConfig extends BaseConfig {
  os: string;
}

interface SystemState {
  category: Category | null;
  setCategory: (c: Category | null) => void;

  baseConfig: SystemBaseConfig;
  setBaseConfig: Dispatch<SetStateAction<SystemBaseConfig>>;

  categoryInputs: CategoryMetricOverrides;
  setCategoryInputs: Dispatch<SetStateAction<CategoryMetricOverrides>>;
}

const SystemContext = createContext<SystemState | null>(null);

export function SystemProvider({ children }: { children: ReactNode }) {
  const [category, setCategory] = useState<Category | null>(null);

  const [baseConfig, setBaseConfig] = useState<SystemBaseConfig>({
    hoursCoded: 4,
    stack: "Full Stack",
    os: "MacOS",
  });

  const [categoryInputs, setCategoryInputs] = useState<CategoryMetricOverrides>({
    physical: {},
    mental: {},
    emotional: {},
    environmental: {},
  });

  return (
    <SystemContext.Provider
      value={{
        category,
        setCategory,
        baseConfig,
        setBaseConfig,
        categoryInputs,
        setCategoryInputs,
      }}
    >
      {children}
    </SystemContext.Provider>
  );
}

export function useSystem() {
  const ctx = useContext(SystemContext);
  if (!ctx) throw new Error("SystemProvider missing");
  return ctx;
}
