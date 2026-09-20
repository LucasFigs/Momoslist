"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-12 max-w-full items-center gap-1 overflow-x-auto rounded-md bg-muted/60 p-1 text-muted-foreground sm:h-11",
      // No celular as 4 abas não cabem: o degradê à direita avisa que há mais para rolar,
      // e o padding final garante que a última aba saia de baixo dele.
      "max-sm:pr-8 max-sm:[mask-image:linear-gradient(to_right,#000_86%,transparent)]",
      className
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
      event.currentTarget.scrollIntoView({ inline: "nearest", block: "nearest" });
    }}
    className={cn(
      "inline-flex h-10 flex-shrink-0 items-center justify-center whitespace-nowrap rounded-sm px-3.5 text-sm font-medium transition-colors sm:h-9",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
      "data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-sm",
      "data-[state=inactive]:hover:text-foreground",
      className
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
    className={cn("mt-6 focus-visible:outline-none", "data-[state=inactive]:hidden", className)}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
