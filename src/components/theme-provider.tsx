"use client";

import { ThemeProvider as NextThemeProvider, type ThemeProviderProps } from "next-themes";

/** Liga a classe `dark` no `<html>` conforme a preferência salva (ou do sistema, na primeira visita). */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemeProvider attribute="class" defaultTheme="system" enableSystem {...props}>
      {children}
    </NextThemeProvider>
  );
}
