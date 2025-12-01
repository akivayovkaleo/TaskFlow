"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export function CallToAction() {
  const { user } = useAuth();

  const benefits = [
    "Dashboard com gráficos em tempo real",
    "Kanban com drag and drop",
    "Calendário integrado",
    "Sub-tarefas com progresso automático",
    "5+ recursos de acessibilidade",
    "100% gratuito e open source",
  ];

  return (
    <>
      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="py-20 bg-white"
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Benefits */}
            <div className="space-y-6">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-navy mb-4">
                  Por que escolher o TaskFlow?
                </h2>
                <p className="text-lg text-gray-600">
                  Mais que um simples gerenciador de tarefas, é uma solução completa
                  para aumentar sua produtividade
                </p>
              </div>

              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle2 className="flex-shrink-0 text-green-500" size={24} />
                    <span className="text-gray-700 font-medium">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right Column - CTA */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-navy to-navy-dark rounded-2xl p-8 md:p-12 shadow-2xl space-y-6"
            >
              <div>
                <h3 className="text-3xl font-bold text-white mb-2">
                  Comece Agora
                </h3>
                <p className="text-baby-blue-light">
                  {user
                    ? "Você já está conectado! Vá organizar suas tarefas."
                    : "Crie sua conta gratuitamente em menos de 1 minuto"}
                </p>
              </div>

              <div className="space-y-3">
                {user ? (
                  <>
                    <Link
                      href="/dashboard"
                      className="flex items-center justify-center gap-2 w-full bg-baby-blue text-navy px-6 py-4 rounded-lg font-bold text-lg hover:bg-baby-blue-light transition-colors shadow-lg"
                    >
                      Acessar Dashboard
                      <ArrowRight size={20} />
                    </Link>
                    <Link
                      href="/tasks/new"
                      className="flex items-center justify-center gap-2 w-full border-2 border-baby-blue text-baby-blue px-6 py-4 rounded-lg font-bold text-lg hover:bg-navy-light transition-colors"
                    >
                      Criar Nova Tarefa
                      <ArrowRight size={20} />
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      href="/sign-up"
                      className="flex items-center justify-center gap-2 w-full bg-baby-blue text-navy px-6 py-4 rounded-lg font-bold text-lg hover:bg-baby-blue-light transition-colors shadow-lg"
                    >
                      Cadastrar Agora
                      <ArrowRight size={20} />
                    </Link>
                    <Link
                      href="/sign-in"
                      className="flex items-center justify-center gap-2 w-full border-2 border-baby-blue text-baby-blue px-6 py-4 rounded-lg font-bold text-lg hover:bg-navy-light transition-colors"
                    >
                      Fazer Login
                      <ArrowRight size={20} />
                    </Link>
                  </>
                )}
              </div>

              <p className="text-sm text-baby-blue-light text-center">
                ✨ Sem cartão de crédito necessário
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Trust Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="py-12 bg-gray-50 border-t border-gray-200"
      >
        <div className="container mx-auto px-4 md:px-6 text-center">
          <p className="text-gray-600 text-sm md:text-base">
            Desenvolvido com <span className="text-crimson">❤</span> para aumentar
            sua produtividade • Seguro • Rápido • Confiável
          </p>
        </div>
      </motion.div>
    </>
  );
}

