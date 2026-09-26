"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

/**
 * Alterna claro/escuro. Só sabe o tema de verdade depois de montar no navegador (o servidor não tem como
 * saber a preferência salva) — antes disso assume "claro" pra não piscar um estado errado.
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? "Mudar para modo claro" : "Mudar para modo escuro"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      disabled={!mounted}
      className="relative inline-flex h-7 w-12 flex-shrink-0 items-center rounded-full border border-border bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none"
    >
      <span
        aria-hidden="true"
        className={`inline-flex h-5 w-5 transform items-center justify-center rounded-full bg-card text-foreground shadow-sm transition-transform ${
          isDark ? "translate-x-[22px]" : "translate-x-1"
        }`}
      >
        {isDark ? <Moon className="h-3 w-3" /> : <Sun className="h-3 w-3" />}
      </span>
    </button>
  );
}
