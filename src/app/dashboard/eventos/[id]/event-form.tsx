"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import type { Event } from "@prisma/client";
import { ListPreviewDialog } from "./list-preview";

type ActionResult = { success: true } | { success: false; error: string };

function toDatetimeLocalValue(date: Date | string): string {
  const d = new Date(date);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

interface EventFormProps {
  action: (formData: FormData) => Promise<ActionResult>;
  submitLabel: string;
  /** Na edição de uma lista existente: habilita "Salvar e visualizar" (mostra a lista como o convidado vê). */
  previewEventId?: string;
  initialValues?: Pick<
    Event,
    | "title"
    | "type"
    | "description"
    | "eventDate"
    | "pixKey"
    | "pixKeyType"
    | "deliveryAddress"
    | "locationName"
    | "locationAddress"
    | "locationMapsUrl"
  >;
}

/** Grupo de campos com título: separa visualmente os assuntos de um formulário longo. */
function FormSection({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="flex flex-col gap-4 border-t border-border pt-6 first:border-t-0 first:pt-0">
      <div>
        <legend className="p-0 text-base font-semibold tracking-tight text-foreground">{title}</legend>
        {description && <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>}
      </div>
      {children}
    </fieldset>
  );
}

function Field({
  label,
  htmlFor,
  hint,
  children,
}: {
  label: string;
  htmlFor: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

export function EventForm({ action, submitLabel, previewEventId, initialValues }: EventFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  // Qual botão enviou o formulário: só "Salvar e visualizar" abre a pré-visualização depois de salvar.
  const wantsPreview = useRef(false);

  function handleSubmit(formData: FormData) {
    setError(null);
    const openPreviewAfterSave = wantsPreview.current;
    startTransition(async () => {
      const result = await action(formData);
      if (result && !result.success) {
        // Fica também inline: o formulário é longo e o erro costuma ser de um campo específico.
        setError(result.error);
        toast({ title: "Não foi possível salvar", description: result.error, variant: "destructive" });
        return;
      }
      toast({ title: "Alterações salvas" });
      router.refresh();
      // Só abre depois de salvar: a pré-visualização lê do banco.
      if (openPreviewAfterSave) setPreviewOpen(true);
    });
  }

  // datetime-local espera "YYYY-MM-DDTHH:mm" em horário local (não UTC).
  const eventDateValue = initialValues?.eventDate ? toDatetimeLocalValue(initialValues.eventDate) : "";

  return (
    <form action={handleSubmit} className="flex flex-col gap-6">
      <FormSection title="Sobre o evento">
        <Field label="Nome do evento" htmlFor="title">
          <Input
            id="title"
            name="title"
            placeholder="Ex: Chá de casa nova do Lucas e Vitória"
            defaultValue={initialValues?.title}
            required
          />
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Tipo do evento" htmlFor="type">
            <Select id="type" name="type" defaultValue={initialValues?.type ?? ""} required>
              <option value="" disabled>
                Selecione...
              </option>
              <option value="CHA_PANELA">Chá de Panela</option>
              <option value="CHA_CASA_NOVA">Chá de Casa Nova</option>
            </Select>
          </Field>
          <Field label="Data e horário (opcional)" htmlFor="eventDate">
            <Input id="eventDate" name="eventDate" type="datetime-local" defaultValue={eventDateValue} />
          </Field>
        </div>
      </FormSection>

      <FormSection title="Local" description="Opcional — aparece no topo da lista, com link para o mapa.">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Nome do local" htmlFor="locationName">
            <Input
              id="locationName"
              name="locationName"
              placeholder="Ex: Salão de Festas Village Noble"
              defaultValue={initialValues?.locationName ?? ""}
            />
          </Field>
          <Field label="Link do Google Maps" htmlFor="locationMapsUrl">
            <Input
              id="locationMapsUrl"
              name="locationMapsUrl"
              type="url"
              inputMode="url"
              placeholder="https://maps.google.com/..."
              defaultValue={initialValues?.locationMapsUrl ?? ""}
            />
          </Field>
        </div>
        <Field label="Endereço" htmlFor="locationAddress">
          <Textarea
            id="locationAddress"
            name="locationAddress"
            placeholder="Rua, número, bairro, cidade"
            defaultValue={initialValues?.locationAddress ?? ""}
          />
        </Field>
      </FormSection>

      <FormSection title="Mensagem e entrega" description="Opcional — o que seus convidados leem antes de escolher.">
        <Field
          label="Mensagem para os convidados"
          htmlFor="description"
          hint="Quebras de linha são preservadas e **texto entre asteriscos duplos** fica em negrito."
        >
          <Textarea
            id="description"
            name="description"
            className="min-h-[160px]"
            placeholder="Estamos muito felizes em compartilhar esse momento com vocês..."
            defaultValue={initialValues?.description ?? ""}
          />
        </Field>
        <Field
          label="Endereço para entrega do presente"
          htmlFor="deliveryAddress"
          hint="Mostrado aos convidados que preferirem enviar o presente em vez de levá-lo no dia."
        >
          <Textarea
            id="deliveryAddress"
            name="deliveryAddress"
            placeholder="Rua, número, complemento, CEP"
            defaultValue={initialValues?.deliveryAddress ?? ""}
          />
        </Field>
      </FormSection>

      <FormSection title="Pix" description="Opcional — necessário para receber presentes em dinheiro.">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Tipo da chave" htmlFor="pixKeyType">
            <Select id="pixKeyType" name="pixKeyType" defaultValue={initialValues?.pixKeyType ?? ""}>
              <option value="">Não informar agora</option>
              <option value="CPF">CPF</option>
              <option value="CNPJ">CNPJ</option>
              <option value="EMAIL">E-mail</option>
              <option value="TELEFONE">Telefone</option>
              <option value="ALEATORIA">Chave aleatória</option>
            </Select>
          </Field>
          <Field label="Chave Pix" htmlFor="pixKey">
            <Input id="pixKey" name="pixKey" defaultValue={initialValues?.pixKey ?? ""} />
          </Field>
        </div>
      </FormSection>

      {error && (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}

      <div className="flex flex-col-reverse gap-2 border-t border-border pt-6 sm:flex-row sm:justify-end">
        {previewEventId && (
          // Salva e já mostra a lista como o convidado vê, com o que acabou de ser digitado.
          <Button
            type="submit"
            variant="outline"
            disabled={isPending}
            onClick={() => (wantsPreview.current = true)}
            className="w-full sm:w-auto"
          >
            Salvar e visualizar
          </Button>
        )}
        <Button
          type="submit"
          disabled={isPending}
          onClick={() => (wantsPreview.current = false)}
          className="w-full sm:w-auto sm:min-w-[11rem]"
        >
          {isPending ? "Salvando..." : submitLabel}
        </Button>
      </div>

      {previewEventId && (
        <ListPreviewDialog eventId={previewEventId} open={previewOpen} onOpenChange={setPreviewOpen} />
      )}
    </form>
  );
}
