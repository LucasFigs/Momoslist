import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { EventForm } from "../eventos/[id]/event-form";
import { createEventAction } from "@/actions/event.actions";

export const metadata: Metadata = { title: "Nova lista" };

export default function NovaListaPage() {
  return (
    <div className="mx-auto flex max-w-xl flex-col gap-4">
      <Link
        href="/dashboard"
        className="inline-flex w-fit items-center gap-1.5 rounded-sm text-sm text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Suas listas
      </Link>
      <Card>
        <CardHeader>
          <CardTitle as="h1">Criar sua lista</CardTitle>
          <CardDescription>
            Comece com as informações básicas — você pode adicionar os presentes e a chave Pix
            em seguida.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <EventForm action={createEventAction} submitLabel="Criar lista" />
        </CardContent>
      </Card>
    </div>
  );
}
