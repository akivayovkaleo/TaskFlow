// src/hooks/useAuth.tsx
"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  onAuthStateChanged,
  User,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "@/lib/firebaseConfig";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "sonner";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signup: (email: string, password: string, name: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      const isAuthRoute =
        pathname === "/sign-in" ||
        pathname === "/sign-up" ||
        pathname === "/login" ||
        pathname === "/signup";
      const isPublicRoute = isAuthRoute || pathname === "/";

      if (currentUser && isAuthRoute) {
        // Se o usuário está logado e tenta acessar uma rota de autenticação, redireciona para o dashboard
        router.push("/dashboard");
      } else if (!currentUser && !isPublicRoute) {
        // Se o usuário não está logado e tenta acessar uma rota protegida, redireciona para o login
        router.push("/sign-in");
      }
    });

    return () => unsubscribe();
  }, [pathname, router]);

  const signup = async (email: string, password: string, name: string) => {
    try {
      setLoading(true);
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(result.user, { displayName: name });
      setUser(result.user);
      toast.success("Cadastro realizado com sucesso!");
      router.push("/dashboard");
    } catch (error: any) {
      console.error("Erro ao cadastrar:", error);
      if (error.code === "auth/email-already-in-use") {
        toast.error("Este email já está cadastrado");
      } else if (error.code === "auth/weak-password") {
        toast.error("Senha muito fraca");
      } else {
        toast.error("Erro ao realizar cadastro: " + error.message);
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const result = await signInWithEmailAndPassword(auth, email, password);
      setUser(result.user);
      toast.success("Login realizado com sucesso!");
      router.push("/dashboard");
    } catch (error: any) {
      console.error("Erro ao fazer login:", error);
      if (error.code === "auth/invalid-credential") {
        toast.error("Email ou senha incorretos");
      } else if (error.code === "auth/user-not-found") {
        toast.error("Usuário não encontrado");
      } else {
        toast.error("Erro ao fazer login: " + error.message);
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      toast.success("Logout realizado");
      router.push("/");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      toast.error("Erro ao fazer logout");
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signup, login, logout }}>
      {loading ? (
        <div className="flex items-center justify-center h-screen bg-gradient-navy-blue">
          <div className="text-white text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-baby-blue"></div>
            <p className="mt-4">Carregando...</p>
          </div>
        </div>
      ) : (
        children
      )}
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

