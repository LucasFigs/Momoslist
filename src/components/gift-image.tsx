"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageOff, Gift } from "lucide-react";
import { cn } from "@/lib/utils";

type Sizing =
  | { fill?: false; width: number; height: number }
  | { fill: true; width?: never; height?: never };

type GiftImageProps = Sizing & {
  src: string | null;
  alt: string;
  className?: string;
  /** Só com `fill`: dica de tamanho para o `next/image` escolher a resolução. */
  sizes?: string;
  priority?: boolean;
  /** "contain" mostra a imagem inteira, sem recortar (com sobra nas laterais); "cover" preenche e corta. */
  fit?: "cover" | "contain";
  /** Mostra um aviso explícito quando havia URL mas a imagem não carregou. */
  showBrokenHint?: boolean;
};

export function GiftImage({
  src,
  alt,
  width,
  height,
  fill,
  sizes,
  priority,
  fit = "cover",
  className,
  showBrokenHint = false,
}: GiftImageProps) {
  // Guarda a URL que falhou (e não um boolean): quando a URL muda — ex.: o
  // o casal troca a capa — a imagem nova é tentada em vez de ficar presa no placeholder.
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const failed = src !== null && failedSrc === src;

  if (!src || failed) {
    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center gap-1",
          fill ? "absolute inset-0" : "h-full w-full",
          failed
            ? "bg-neutral-200 text-neutral-400"
            : "bg-gradient-to-br from-primary-subtle to-primary-soft text-primary/60",
          className
        )}
        role="img"
        aria-label={failed ? `Imagem de ${alt || "capa"} não pôde ser carregada` : `${alt} sem imagem`}
      >
        {failed ? (
          <>
            <ImageOff className="h-5 w-5" aria-hidden="true" />
            {showBrokenHint && <span className="text-[10px]">imagem indisponível</span>}
          </>
        ) : (
          <Gift className="h-6 w-6" aria-hidden="true" />
        )}
      </div>
    );
  }

  const imageClassName = cn(fit === "contain" ? "object-contain" : "object-cover", !fill && "h-full w-full", className);

  return fill ? (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      onError={() => setFailedSrc(src)}
      className={imageClassName}
    />
  ) : (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      onError={() => setFailedSrc(src)}
      className={imageClassName}
    />
  );
}
