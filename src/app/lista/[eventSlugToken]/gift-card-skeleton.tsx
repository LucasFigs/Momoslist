import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

// Mesma estrutura do GiftCard: imagem quadrada, textos, preço e botão de largura total.
export function GiftCardSkeleton() {
  return (
    <Card className="flex flex-col overflow-hidden">
      <Skeleton className="aspect-square w-full rounded-none" />
      <CardContent className="flex flex-1 flex-col gap-2 p-3 sm:gap-3 sm:p-4">
        <div className="flex flex-col gap-1.5">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-3 w-full" />
        </div>
        <div className="mt-auto flex flex-col gap-2 pt-1">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-10 w-full" />
        </div>
      </CardContent>
    </Card>
  );
}

export function GiftCardSkeletonList({ count = 8 }: { count?: number }) {
  return (
    <div
      className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4"
      aria-busy="true"
      aria-live="polite"
    >
      <span className="sr-only">Carregando presentes...</span>
      {Array.from({ length: count }).map((_, i) => (
        <GiftCardSkeleton key={i} />
      ))}
    </div>
  );
}
