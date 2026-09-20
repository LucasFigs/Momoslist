"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";

import { Button } from "@/components/ui/button";

/** Encerra a sessão atual e volta ao login, para entrar com outra conta. */
export function SwitchAccountButton() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Button
      variant="outline"
      disabled={isLoading}
      onClick={() => {
        setIsLoading(true);
        void signOut({ callbackUrl: "/login" });
      }}
    >
      {isLoading ? "Saindo..." : "Sair e entrar com outra conta"}
    </Button>
  );
}
