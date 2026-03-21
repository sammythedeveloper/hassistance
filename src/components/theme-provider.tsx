
"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
// Use this cleaner import instead:
import { type ThemeProviderProps } from "next-themes";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
