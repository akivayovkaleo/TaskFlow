// src/hooks/useAuth.tsx
"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebaseConfig";
import { useRouter, usePathname } from "next/navigation";

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);

      const isAuthRoute = pathname === "/sign-in" || pathname === "/sign-up";
      const isPublicRoute = isAuthRoute || pathname === "/";

      if (user && isAuthRoute) {
        // Se o usuário está logado e tenta acessar uma rota de autenticação, redireciona para o dashboard
        router.push("/dashboard");
      } else if (!user && !isPublicRoute) {
        // Se o usuário não está logado e tenta acessar uma rota protegida, redireciona para o login
        router.push("/sign-in");
      }
    });

    return () => unsubscribe();
  }, [pathname, router]);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {loading ? <p>Carregando...</p> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
