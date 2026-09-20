import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { PublicListView } from "@/app/lista/[eventSlugToken]/public-list-view";
import { parseGiftQuery, parseGiftSort } from "@/app/lista/[eventSlugToken]/gift-sort";

export const metadata: Metadata = {
  title: "Pré-visualização",
  robots: { index: false, follow: false },
};

interface PageProps {
  params: { id: string };
  searchParams: { cor?: string; q?: string | string[]; sort?: string | string[] };
}

/**
 * Pré-visualização da lista pública para o DONO. Fica fora de /dashboard (sem o cabeçalho do painel), porque
 * é exibida dentro de um iframe — por isso confere a sessão e a posse aqui mesmo, em vez de contar com o middleware.
 * Funciona com a lista em rascunho e aceita `?cor=RRGGBB` para mostrar uma cor ainda não salva.
 */
export default async function PreviewPage({ params, searchParams }: PageProps) {
  const session = await auth();
  if (!session?.user?.id) notFound();

  const event = await prisma.event.findUnique({
    where: { id: params.id },
    include: { gifts: { orderBy: { createdAt: "asc" } } },
  });
  if (!event || event.ownerId !== session.user.id) notFound();

  // Só aceita 6 dígitos hexadecimais: o valor vira CSS, então nada além disso passa.
  const colorOverride = /^[0-9a-fA-F]{6}$/.test(searchParams.cor ?? "") ? `#${searchParams.cor}` : null;

  return (
    <PublicListView
      event={event}
      guest={null}
      publicUrl={`${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/lista/${event.slug}-${event.secureToken}`}
      query={parseGiftQuery(searchParams.q)}
      sort={parseGiftSort(searchParams.sort)}
      clearHref={`/previa/${event.id}${colorOverride ? `?cor=${colorOverride.slice(1)}` : ""}`}
      themeColorOverride={colorOverride}
      preview
    />
  );
}
