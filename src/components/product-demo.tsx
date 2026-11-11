"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const DemoContent = dynamic(
  () =>
    import("./product-demo-content").then(
      (module) => module.ProductDemoContent,
    ),
  {
    loading: () => (
      <p role="status" className="p-6 text-sm text-muted-foreground">
        Carregando a demonstração…
      </p>
    ),
  },
);

export function ProductDemo() {
  const container = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!container.current) return;
    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(container.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={container} className="min-h-[520px]">
      <p className="mb-5 max-w-2xl text-sm text-muted-foreground">
        Veja a mesma interface usada por convidados e organizadores. Os dados
        abaixo são fictícios e a prévia não cria reservas nem pagamentos.
      </p>
      {visible && <DemoContent />}
    </div>
  );
}
