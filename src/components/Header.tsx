// src/components/Header.tsx
"use client";

import { useAuth } from "@/hooks/useAuth";
import { auth } from "@/lib/firebaseConfig";
import { signOut } from "firebase/auth";
import toast from "react-hot-toast";
import Logo from "./Logo";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Header() {
  const { user } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      toast.success("Você saiu da sua conta.");
      router.push("/sign-in");
    } catch (error) {
      console.error("Error signing out:", error);
      toast.error("Ocorreu um erro ao sair.");
    }
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Logo />
          <nav className="flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-sm font-medium text-gray-700 hover:text-indigo-600"
                >
                  Dashboard
                </Link>
                <Link
                  href="/board"
                  className="text-sm font-medium text-gray-700 hover:text-indigo-600"
                >
                  Quadro
                </Link>
                <Link
                  href="/calendar"
                  className="text-sm font-medium text-gray-700 hover:text-indigo-600"
                >
                  Calendário
                </Link>
                <span className="text-gray-700">Olá, {user.displayName || user.email}</span>
                <button
                  onClick={handleSignOut}
                  className="px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Sair
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className="px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100"
                >
                  Entrar
                </Link>
                <Link
                  href="/sign-up"
                  className="px-3 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                >
                  Criar conta
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
