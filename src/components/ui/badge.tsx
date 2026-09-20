import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Selo de estado ou categoria. Sempre em pílula e SEMPRE com texto: a cor reforça, nunca é o único sinal.
 * Uso: <Badge variant="pending">Aguardando confirmação</Badge>
 */
const badgeVariants = cva(
  "inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-medium leading-5",
  {
    variants: {
      variant: {
        /** Categoria/estado neutro (ex.: Rascunho). */
        neutral: "bg-muted text-muted-foreground",
        /** Destaque da lista, na cor de acento (ex.: Vaquinha). */
        primary: "bg-primary-soft text-primary",
        /** Realce forte sobre imagem ou para "concluído" (ex.: meta atingida). */
        solid: "bg-primary text-primary-foreground",
        pending: "bg-pending-soft text-pending",
        success: "bg-success-soft text-success",
        danger: "bg-destructive/10 text-destructive",
        /** Sobre foto: contraste garantido em qualquer imagem. */
        overlay: "bg-card/95 text-foreground shadow-sm",
        /** Sobre foto, estado negativo (ex.: Já escolhido). */
        overlayDark: "bg-foreground/85 text-background",
        outline: "border border-border bg-card text-muted-foreground",
      },
    },
    defaultVariants: { variant: "neutral" },
  }
);

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { badgeVariants };
