import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans"
});

export const metadata: Metadata = {
  title: "[NOME DO SISTEMA] | Gestao inteligente de plantel",
  description:
    "Plataforma SaaS para criadores de passaros com dashboard, genealogia, anilhas e compartilhamento publico."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={`${manrope.variable} font-sans antialiased`}>{children}</body>
    </html>
  );
}
