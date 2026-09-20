import { cn } from "@/lib/utils";

/** Marca tipográfica da Momoslist: "Momos" em grafite e "list" no acento. Sem símbolo, sem ornamento. */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("font-serif text-xl font-medium tracking-tight text-foreground", className)}>
      Momos<span className="text-primary">list</span>
    </span>
  );
}
