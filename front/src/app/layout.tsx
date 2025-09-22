import type { Metadata } from "next";
import "./globals.css";
import { AuthorsProvider } from "../modules/authors/hooks/AuthorsContext";


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <AuthorsProvider>
          <main className="max-w-5xl mx-auto">{children}</main>
        </AuthorsProvider>
      </body>
    </html>
  );
}
