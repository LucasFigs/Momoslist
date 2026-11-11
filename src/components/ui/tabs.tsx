"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";

function Tabs({
  defaultValue,
  ...props
}: React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root>) {
  const [value, setValue] = React.useState(defaultValue);
  React.useEffect(() => {
    const sync = () => {
      const selected = new URL(window.location.href).searchParams.get("tab");
      const allowed =
        defaultValue === "resumo"
          ? [
              "resumo",
              "presentes",
              "confirmacoes",
              "recadinhos",
              "configuracoes",
            ]
          : ["presentes", "recadinhos"];
      setValue(
        selected && allowed.includes(selected) ? selected : defaultValue,
      );
    };
    sync();
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, [defaultValue]);
  return (
    <TabsPrimitive.Root
      {...props}
      value={props.value ?? value}
      onValueChange={(next) => {
        setValue(next);
        props.onValueChange?.(next);
        const url = new URL(window.location.href);
        url.searchParams.set("tab", next);
        window.history.replaceState(null, "", url);
      }}
    />
  );
}

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex min-h-12 max-w-full flex-wrap items-center gap-1 rounded-md bg-muted/60 p-1 text-muted-foreground sm:min-h-11",
      // No celular as 4 abas não cabem: o degradê à direita avisa que há mais para rolar,
      // e o padding final garante que a última aba saia de baixo dele.

      className,
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, onClick, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    onClick={(event) => {
      onClick?.(event);
      // Com várias abas a lista rola na horizontal (celular): traz a aba tocada para a área visível.
      event.currentTarget.scrollIntoView({
        inline: "nearest",
        block: "nearest",
      });
    }}
    className={cn(
      "inline-flex h-10 flex-shrink-0 items-center justify-center whitespace-nowrap rounded-sm px-3.5 text-sm font-medium transition-colors sm:h-9",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
      "data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-sm",
      "data-[state=inactive]:hover:text-foreground",
      className,
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    // `className` precisa entrar no cn(): antes era descartado e nenhum gap/flex passado às abas funcionava.
    className={cn(
      "mt-6 focus-visible:outline-none",
      "data-[state=inactive]:hidden",
      className,
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
