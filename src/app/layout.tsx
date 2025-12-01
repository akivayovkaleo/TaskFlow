import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { AuthProvider } from "@/hooks/useAuth";
import { TaskProvider } from "@/hooks/useTasks";
import Script from "next/script";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { ThemeProvider } from "next-themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TaskFlow - Gestor de Tarefas",
  description: "Gerenciador de Tarefas com Dashboard, Kanban e Calendário",
  keywords: "tarefas, gerenciador, taskflow, produtividade",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${inter.className} bg-white`}>
        <ThemeProvider attribute="class">
          <AuthProvider>
            <TaskProvider>
              <Toaster position="top-right" richColors closeButton />
              <Navbar />
              <main className="container mx-auto px-4 md:px-6 py-8 min-h-screen">
                {children}
              </main>
              <Footer />
            </TaskProvider>
          </AuthProvider>
        </ThemeProvider>
        {/* VLibras - Acessibilidade */}
        <div vw="true" className="enabled">
          <div vw-access-button="true" className="active"></div>
          <div vw-plugin-wrapper="true">
            <div className="vw-plugin-top-wrapper"></div>
          </div>
        </div>
        <Script
          src="https://vlibras.gov.br/app/vlibras-plugin.js"
          strategy="beforeInteractive"
        />
        <Script id="vlibras-init" strategy="afterInteractive">
          {`if (typeof window !== 'undefined') { new window.VLibras.Widget('https://vlibras.gov.br/app'); }`}
        </Script>
      </body>
    </html>
  );
}
