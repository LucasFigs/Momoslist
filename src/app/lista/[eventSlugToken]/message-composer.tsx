"use client";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import {
  Dialog,
  DialogTitle,
  SheetContent,
  SheetHeader,
  SheetBody,
  SheetFooter,
} from "@/components/ui/dialog";
import { IdentifyGuestDialog } from "./identify-guest-dialog";
import {
  saveEventMessageAction,
  deleteEventMessageAction,
} from "@/actions/message.actions";
import { toast } from "@/hooks/use-toast";

export function MessageComposer({
  eventId,
  identified,
  mine,
}: {
  eventId: string;
  identified: boolean;
  mine: { message: string; public: boolean; hidden: boolean } | null;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [identify, setIdentify] = useState(false);
  const [message, setMessage] = useState(mine?.message ?? "");
  const [isPublic, setPublic] = useState(mine?.public ?? true);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState("");
  function submit(remove = false) {
    setError("");
    startTransition(async () => {
      const result = remove
        ? await deleteEventMessageAction(eventId)
        : await saveEventMessageAction(eventId, message, isPublic);
      if (!result.success) {
        setError(result.error);
        return;
      }
      toast({
        title: remove
          ? "Recadinho excluído"
          : "Recadinho enviado com carinho 💌",
      });
      if (remove) setMessage("");
      setOpen(false);
      router.refresh();
    });
  }
  return (
    <div className="mb-6 rounded-xl border border-primary-border bg-primary-subtle p-4 sm:p-5">
      <p className="mb-3 text-sm leading-relaxed">
        Seu carinho já é um presente. Deixe uma mensagem, mesmo sem escolher um
        presente ou confirmar presença.
      </p>
      {mine?.hidden && (
        <p className="mb-2 text-sm text-muted-foreground">
          O organizador ocultou seu recadinho do mural. Ele ainda pode lê-lo no
          painel.
        </p>
      )}
      <Button onClick={() => (identified ? setOpen(true) : setIdentify(true))}>
        {mine ? "Editar meu recadinho" : "Deixar um recadinho 💌"}
      </Button>
      <IdentifyGuestDialog
        open={identify}
        onOpenChange={setIdentify}
        onIdentified={() => {
          setIdentify(false);
          setOpen(true);
          router.refresh();
        }}
      />
      <Dialog open={open} onOpenChange={setOpen}>
        <SheetContent aria-describedby={undefined}>
          <SheetHeader>
            <DialogTitle>Um recadinho para o casal</DialogTitle>
          </SheetHeader>
          <SheetBody className="space-y-3">
            <Label htmlFor="event-note">Sua mensagem</Label>
            <Textarea
              id="event-note"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              maxLength={500}
              rows={5}
              aria-describedby="note-count"
            />
            <p id="note-count" className="text-xs text-muted-foreground">
              {message.length}/500 caracteres
            </p>
            <Label htmlFor="note-visibility">Quem pode ler?</Label>
            <Select
              id="note-visibility"
              value={isPublic ? "public" : "private"}
              onChange={(e) => setPublic(e.target.value === "public")}
            >
              <option value="private">
                Privado — somente os organizadores
              </option>
              <option value="public">Público — quem tem o link da lista</option>
            </Select>
            <p className="text-xs text-muted-foreground">
              {isPublic
                ? "Seu nome e mensagem aparecerão no mural. Evite dados pessoais ou sensíveis."
                : "Sua mensagem e seu nome ficam visíveis somente para os organizadores."}
            </p>
            {error && (
              <p role="alert" className="text-sm text-destructive">
                {error}
              </p>
            )}
          </SheetBody>
          <SheetFooter>
            <Button
              disabled={pending || !message.trim()}
              onClick={() => submit()}
            >
              {pending ? "Salvando..." : "Enviar recadinho"}
            </Button>
            {mine && (
              <Button
                variant="outline"
                disabled={pending}
                onClick={() => submit(true)}
              >
                Excluir meu recadinho
              </Button>
            )}
          </SheetFooter>
        </SheetContent>
      </Dialog>
    </div>
  );
}
