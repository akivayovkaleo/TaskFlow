// src/app/(auth)/sign-in/page.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TSignInSchema, signInSchema } from "@/lib/schemas";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";

export default function SignInPage() {
  const { login, loading } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TSignInSchema>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: TSignInSchema) => {
    try {
      await login(data.email, data.password);
    } catch (error) {
      // Erro já tratado no hook useAuth
      console.error("Erro ao fazer login:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy to-navy-light flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="text-center text-4xl font-bold text-baby-blue mb-2">
          TaskFlow
        </h1>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          Acesse sua conta
        </h2>
        <p className="mt-2 text-center text-baby-blue-light">
          Organize e gerencie suas tarefas com eficiência
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-lg rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <div className="mt-1">
                <input
                  {...register("email")}
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="seu.email@exemplo.com"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-navy focus:border-navy sm:text-sm"
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-crimson">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Senha
              </label>
              <div className="mt-1">
                <input
                  {...register("password")}
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="Sua senha"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-navy focus:border-navy sm:text-sm"
                />
                {errors.password && (
                  <p className="mt-2 text-sm text-crimson">{errors.password.message}</p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting || loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-navy hover:bg-navy-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-navy disabled:opacity-50 transition-colors"
              >
                {isSubmitting ? "Entrando..." : "Entrar"}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Não possui uma conta?</span>
              </div>
            </div>

            <div className="mt-6">
              <Link
                href="/sign-up"
                className="w-full flex justify-center py-2 px-4 border border-navy text-navy rounded-md hover:bg-blue-50 font-medium transition-colors"
              >
                Criar Conta
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

