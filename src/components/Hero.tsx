"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle2, Zap, BarChart3 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export function Hero() {
  const { user } = useAuth();

  const features = [
    {
      icon: CheckCircle2,
      title: "Gestão Completa",
      description: "CRUD completo de tarefas com sub-tarefas e progresso",
    },
    {
      icon: Zap,
      title: "Kanban Interativo",
      description: "Drag and drop para gerenciar tarefas entre colunas",
    },
    {
      icon: BarChart3,
      title: "Dashboard Analytics",
      description: "Gráficos e métricas para acompanhar produtividade",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-navy via-navy-light to-white">
      {/* Hero Section */}
      <motion.div
        className="container mx-auto px-4 md:px-6 py-20 md:py-32"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
              Organizesu<span className="text-baby-blue">s Tarefas</span> com
              <span className="text-crimson"> TaskFlow</span>
            </h1>
            <p className="text-xl md:text-2xl text-baby-blue-light max-w-2xl mx-auto">
              O gestor de tarefas completo com Dashboard, Kanban, Calendário e muito mais.
              Aumente sua produtividade e organize suas atividades de forma eficiente.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="px-8 py-4 bg-baby-blue text-navy rounded-lg font-bold text-lg hover:bg-baby-blue-light transition-colors shadow-lg"
                >
                  Ir para Dashboard
                </Link>
                <Link
                  href="/tasks"
                  className="px-8 py-4 border-2 border-baby-blue text-baby-blue rounded-lg font-bold text-lg hover:bg-navy-light transition-colors"
                >
                  Minhas Tarefas
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/sign-up"
                  className="px-8 py-4 bg-baby-blue text-navy rounded-lg font-bold text-lg hover:bg-baby-blue-light transition-colors shadow-lg"
                >
                  Começar Agora
                </Link>
                <Link
                  href="/sign-in"
                  className="px-8 py-4 border-2 border-baby-blue text-baby-blue rounded-lg font-bold text-lg hover:bg-navy-light transition-colors"
                >
                  Fazer Login
                </Link>
              </>
            )}
          </motion.div>
        </div>

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="p-6 bg-white/10 backdrop-blur-lg rounded-lg border border-baby-blue/30 hover:border-baby-blue hover:bg-white/20 transition-all"
              >
                <Icon className="w-12 h-12 text-baby-blue mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-baby-blue-light">{feature.description}</p>
              </div>
            );
          })}
        </motion.div>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        className="bg-white py-12 md:py-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-navy">100%</div>
              <p className="text-gray-600 mt-2">Funcional</p>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-navy">5+</div>
              <p className="text-gray-600 mt-2">Acessibilidade</p>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-navy">∞</div>
              <p className="text-gray-600 mt-2">Tarefas</p>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-navy">✓</div>
              <p className="text-gray-600 mt-2">Gratuito</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

