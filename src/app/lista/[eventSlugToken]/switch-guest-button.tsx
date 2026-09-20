"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { forgetGuestAction } from "@/actions/guest.actions";

export function SwitchGuestButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    startTransition(async () => {
      await forgetGuestAction();
      router.refresh();
    });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isPending}
      className="underline-offset-4 hover:underline"
    >
      Não é você? Trocar
    </button>
  );
}
