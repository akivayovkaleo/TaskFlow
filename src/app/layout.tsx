import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/hooks/useAuth";
import { TaskProvider } from "@/hooks/useTasks";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TaskFlow",
  description: "Gerenciador de Tarefas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <AuthProvider>
          <TaskProvider>
            <Toaster position="top-right" />
            {children}
          </TaskProvider>
        </AuthProvider>
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
          {`new window.VLibras.Widget('https://vlibras.gov.br/app');`}
        </Script>
      </body>
    </html>
  );
}
