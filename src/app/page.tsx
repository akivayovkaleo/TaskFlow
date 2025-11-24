// src/app/page.tsx
"use client";
import Layout from "@/components/Layout";
import { useAuth } from "@/hooks/useAuth";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { LampComponent } from "@/components/ui/lamp";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import Link from "next/link";

export default function HomePage() {
  const { user } = useAuth();
  const words = `Bem-vindo ao TaskFlow, a sua solução definitiva para gerenciamento de tarefas. Organize, colabore e alcance seus objetivos com mais eficiência.`;

  return (
    <Layout>
      <div className="text-center">
        <LampComponent>
          <TextGenerateEffect words={words} className="text-center text-lg md:text-2xl" />
        </LampComponent>
        <div className="mt-8">
          {user ? (
            <Link
              href="/dashboard"
              className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Ir para o painel
            </Link>
          ) : (
            <Link
              href="/sign-up"
              className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Comece agora
            </Link>
          )}
        </div>
      </div>
      <footer className="bg-white mt-16 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600">&copy; 2024 TaskFlow. Todos os direitos reservados.</p>
          <div className="flex justify-center space-x-4 mt-2">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-700">
              <FaGithub size={24} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-700">
              <FaLinkedin size={24} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-700">
              <FaTwitter size={24} />
            </a>
          </div>
        </div>
      </footer>
    </Layout>
  );
}
