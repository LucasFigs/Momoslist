"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Search } from "lucide-react";
import { parseGiftQuery, parseGiftSort, SORT_OPTIONS } from "./gift-sort";

export function GiftFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // A URL é a fonte da verdade; o input só guarda o texto enquanto a pessoa digita.
  const urlQuery = parseGiftQuery(searchParams.get("q") ?? undefined);
  const urlSort = parseGiftSort(searchParams.get("sort") ?? undefined);

  const [query, setQuery] = useState(urlQuery);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();
  const inputRef = useRef<HTMLInputElement>(null);

  // O timeout do debounce roda depois do render que o criou: sem este ref ele
  // mesclaria a busca com um `sort` antigo e desfaria uma troca de ordenação.
  const searchParamsRef = useRef(searchParams);
  searchParamsRef.current = searchParams;

  // Voltar/avançar no navegador muda a URL sem passar pelo input. Com o input em
  // foco a pessoa está digitando e a URL que chega pode ser de um instante atrás
  // (ex.: "ab" chegando quando já digitou "abc"), então não sobrescrevemos.
  useEffect(() => {
    if (document.activeElement === inputRef.current) return;
    setQuery(urlQuery);
  }, [urlQuery]);

  function updateParams(next: { q?: string; sort?: string }) {
    const params = new URLSearchParams(searchParamsRef.current.toString());

    for (const [key, value] of Object.entries(next)) {
      if (value) params.set(key, value);
      else params.delete(key);
    }

    const queryString = params.toString();
    startTransition(() => {
      router.replace(queryString ? `${pathname}?${queryString}` : pathname, { scroll: false });
    });
  }

  function handleQueryChange(value: string) {
    setQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => updateParams({ q: value.trim() }), 300);
  }

  function handleSortChange(value: string) {
    // Uma busca ainda no debounce entra junto, em vez de ser descartada.
    if (debounceRef.current) clearTimeout(debounceRef.current);
    updateParams({ q: query.trim(), sort: value });
  }

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  return (
    // Uma linha só (busca + ordenação), inclusive no celular: ocupa ~44px em vez de ~110px.
    // Fixa no topo a partir de md, para a busca continuar à mão ao rolar listas longas.
    <div className="mb-5 flex items-center gap-2 sm:gap-3 md:sticky md:top-0 md:z-20 md:-mx-6 md:bg-background md:px-6 md:py-3 lg:-mx-8 lg:px-8">
      <div className="relative min-w-0 flex-1">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
        <Input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => handleQueryChange(e.target.value)}
          placeholder="Buscar presente"
          className="pl-9"
          aria-label="Buscar presente"
          maxLength={80}
        />
      </div>

      <Select
        value={urlSort}
        onChange={(e) => handleSortChange(e.target.value)}
        className="w-[9.5rem] flex-shrink-0 sm:w-52"
        aria-label="Ordenar por"
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>

      <span className="sr-only" role="status" aria-live="polite">
        {isPending ? "Atualizando lista..." : ""}
      </span>
    </div>
  );
}
