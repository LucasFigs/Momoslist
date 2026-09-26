import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Momoslist | Listas de presentes para o seu chá",
    template: "%s | Momoslist",
  },
  description:
    "Crie sua lista de presentes para o chá de panela ou chá de casa nova e compartilhe com quem você ama.",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Momoslist",
    title: "Momoslist | Listas de presentes para o seu chá",
    description:
      "Crie sua lista de presentes e compartilhe o link com seus convidados.",
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FBF8F3" },
    { media: "(prefers-color-scheme: dark)", color: "#171513" },
  ],
  // Necessário para env(safe-area-inset-bottom): mantém botões fora da barra de gestos do iPhone.
  viewportFit: "cover" as const,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // suppressHydrationWarning: o next-themes ajusta a classe "dark" logo antes da hidratação (evita
    // piscar o tema errado), o que por natureza difere do HTML enviado pelo servidor.
    <html lang="pt-BR" className={`${fraunces.variable} ${inter.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
