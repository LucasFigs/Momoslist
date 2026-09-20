import { Skeleton } from "@/components/ui/skeleton";
import { GiftCardSkeletonList } from "./gift-card-skeleton";

// Espelha o HeaderPublico: capa, avatar sobreposto (metade/metade), título e a grade.
export default function Loading() {
  return (
    <main className="min-h-screen" aria-busy="true" aria-live="polite">
      <span className="sr-only">Carregando a lista de presentes...</span>

      <div className="mx-auto w-full max-w-[1200px] sm:px-6 sm:pt-6 lg:px-8">
        <div className="relative">
          <Skeleton className="aspect-[2/1] max-h-[420px] w-full rounded-none sm:aspect-[3/1] sm:rounded-3xl" />
          <div className="absolute inset-x-0 bottom-0 flex translate-y-1/2 justify-center">
            <Skeleton className="h-28 w-28 rounded-full ring-4 ring-background sm:h-36 sm:w-36" />
          </div>
        </div>
      </div>

      <div className="container flex flex-col items-center gap-4 pb-10 pt-[4.5rem] sm:pt-24">
        <Skeleton className="h-6 w-32 rounded-full" />
        <Skeleton className="h-9 w-72 max-w-full" />
        <Skeleton className="h-4 w-56 max-w-full" />
        <Skeleton className="h-9 w-32" />
      </div>

      <section className="border-t border-border">
        <div className="container pb-16 pt-8 sm:pt-12">
          <Skeleton className="mb-5 h-8 w-52" />
          <Skeleton className="mb-5 h-11 w-full" />
          <GiftCardSkeletonList />
        </div>
      </section>
    </main>
  );
}
