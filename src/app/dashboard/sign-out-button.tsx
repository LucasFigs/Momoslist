"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

export function SignOutButton() {
  const [isLoading, setIsLoading] = useState(false);

  async function handleSignOut() {
    setIsLoading(true);
    try {
      await signOut({ callbackUrl: "/" });
    } catch {
      // Se o signOut falhar, a página não navega: libera o botão e avisa.
      setIsLoading(false);
      toast({ title: "Não foi possível sair", description: "Tente novamente.", variant: "destructive" });
    }
  }

  return (
    <Button variant="ghost" size="sm" onClick={handleSignOut} disabled={isLoading}>
      {isLoading ? "Saindo..." : "Sair"}
    </Button>
  );
}
