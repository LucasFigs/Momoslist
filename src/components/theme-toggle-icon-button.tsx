"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Botão redondo — mesmo estilo do "Compartilhar" flutuante sobre a capa da lista pública — que alterna
 * claro/escuro. Antes de montar no navegador ainda não dá para saber a preferência salva, então assume
 * "claro" (ícone de sol) pra não piscar um estado errado.
 */
export function ThemeToggleIconButton({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <Button
      type="button"
      variant="outline"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      disabled={!mounted}
      aria-label={isDark ? "Mudar para modo claro" : "Mudar para modo escuro"}
      className={cn(
        "h-11 w-11 flex-shrink-0 rounded-full border-transparent bg-card/95 p-0 shadow-sm hover:bg-card sm:h-10 sm:w-10",
        className
      )}
    >
      {isDark ? <Moon className="h-4 w-4" aria-hidden="true" /> : <Sun className="h-4 w-4" aria-hidden="true" />}
    </Button>
  );
}
