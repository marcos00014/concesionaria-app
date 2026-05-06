import type { Metadata } from "next";
// Puede que tengas fuentes importadas aquí (como Inter o Geist), dejalas como están si las tenés.
import "./globals.css";

export const metadata: Metadata = {
  title: "AutoElite | Concesionaria Premium",
  description: "Catálogo exclusivo de vehículos. Financiación y tasación a medida.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    /* ¡Aquí agregamos scroll-smooth para el efecto de deslizamiento! */
    <html lang="es" className="scroll-smooth">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}