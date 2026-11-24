"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageOff, Gift } from "lucide-react";
import { cn } from "@/lib/utils";

const PUBLIC_IMAGE_HOST = "wiirvczljhoskngovxer.supabase.co";
const PUBLIC_IMAGE_PREFIX = "/storage/v1/object/public/gift-images/";

/** Only canonical public object URLs may bypass the image optimizer. */
export function isPublicGiftImageUrl(src: string | null | undefined): boolean {
  if (!src || src.trim() !== src || /[\\\u0000-\u0020\u007f]/.test(src)) return false;
  try {
    const url = new URL(src);
    if (
      url.protocol !== "https:" || url.hostname !== PUBLIC_IMAGE_HOST ||
      url.port || url.username || url.password || url.hash ||
      !url.pathname.startsWith(PUBLIC_IMAGE_PREFIX)
    ) return false;
    // URL() normalizes dot segments. Inspect the original path as well so that
    // traversal, encoded separators and double encoding never gain the exception.
    const rawPath = src.match(/^https:\/\/[^/?#]+([^?#]*)/i)?.[1];
    if (!rawPath || !rawPath.startsWith(PUBLIC_IMAGE_PREFIX) || /%(?:2f|5c|25)/i.test(rawPath)) return false;
    const segments = decodeURIComponent(rawPath).split("/").slice(1);
    if (segments.some((segment) => !segment || segment === "." || segment === ".." || /[\\\u0000-\u001f\u007f]/.test(segment))) return false;
    // download is a Storage option; v is an inert cache-busting parameter.
    // Unknown parameters (including signed tokens/redirect hints) keep the old path.
    return [...url.searchParams.keys()].every((key) => key === "download" || key === "v");
  } catch {
    return false;
  }
}

function isUsableImageSource(src: string | null): src is string {
  if (!src || src.trim() !== src || /[\\\u0000-\u001f\u007f]/.test(src)) return false;
  if (src.startsWith("/")) return !src.startsWith("//");
  try {
    return ["https:", "http:"].includes(new URL(src).protocol);
  } catch {
    return false;
  }
}

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

  if (!isUsableImageSource(src) || failed) {
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
      unoptimized={isPublicGiftImageUrl(src)}
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
      unoptimized={isPublicGiftImageUrl(src)}
      onError={() => setFailedSrc(src)}
      className={imageClassName}
    />
  );
}
