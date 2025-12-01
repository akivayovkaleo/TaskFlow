"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, LogOut, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useAuth } from "@/hooks/useAuth";
import { FontSizeSelector } from "./FontSizeSelector";
import { Logo } from "./Logo";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const { user, logout } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    await logout();
    setIsOpen(false);
  };

  if (!mounted) {
    return null;
  }

  return (
    <nav className="bg-gradient-to-r from-navy to-navy-dark shadow-lg">
      <div className="container mx-auto px-4 md:px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Logo />
            <span className="text-2xl font-bold text-baby-blue">TaskFlow</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {user && (
              <>
                <Link
                  href="/dashboard"
                  className="flex items-center space-x-1 text-baby-blue hover:text-white transition-colors"
                >
                  <LayoutDashboard size={20} />
                  <span>Dashboard</span>
                </Link>
                <Link
                  href="/tasks"
                  className="text-baby-blue hover:text-white transition-colors"
                >
                  Tarefas
                </Link>
                <Link
                  href="/kanban"
                  className="text-baby-blue hover:text-white transition-colors"
                >
                  Kanban
                </Link>
                <Link
                  href="/calendar"
                  className="text-baby-blue hover:text-white transition-colors"
                >
                  Calendário
                </Link>
              </>
            )}

            {/* Accessibility Controls */}
            <div className="flex items-center space-x-2 border-l border-baby-blue pl-4">
              <FontSizeSelector />
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="text-baby-blue hover:text-white p-2 rounded-lg hover:bg-navy-light transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>

            {/* Auth Actions */}
            {user ? (
              <div className="flex items-center space-x-4 border-l border-baby-blue pl-4">
                <span className="text-baby-blue text-sm">
                  {user.displayName || user.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 bg-crimson text-white px-4 py-2 rounded-lg hover:bg-crimson-dark transition-colors"
                >
                  <LogOut size={18} />
                  <span>Sair</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2 border-l border-baby-blue pl-4">
                <Link
                  href="/sign-in"
                  className="text-baby-blue hover:text-white transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/sign-up"
                  className="bg-crimson text-white px-4 py-2 rounded-lg hover:bg-crimson-dark transition-colors"
                >
                  Cadastro
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <FontSizeSelector />
            <button
              onClick={toggleMenu}
              className="text-baby-blue hover:text-white p-2"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden mt-4 pb-4 space-y-2 border-t border-baby-blue pt-4"
            >
              {user && (
                <>
                  <Link
                    href="/dashboard"
                    className="block text-baby-blue hover:text-white px-3 py-2 rounded hover:bg-navy-light transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/tasks"
                    className="block text-baby-blue hover:text-white px-3 py-2 rounded hover:bg-navy-light transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Tarefas
                  </Link>
                  <Link
                    href="/kanban"
                    className="block text-baby-blue hover:text-white px-3 py-2 rounded hover:bg-navy-light transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Kanban
                  </Link>
                  <Link
                    href="/calendar"
                    className="block text-baby-blue hover:text-white px-3 py-2 rounded hover:bg-navy-light transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Calendário
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left block bg-crimson text-white px-3 py-2 rounded hover:bg-crimson-dark transition-colors"
                  >
                    Sair
                  </button>
                </>
              )}
              {!user && (
                <>
                  <Link
                    href="/sign-in"
                    className="block text-baby-blue hover:text-white px-3 py-2 rounded hover:bg-navy-light transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/sign-up"
                    className="block bg-crimson text-white px-3 py-2 rounded hover:bg-crimson-dark transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Cadastro
                  </Link>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
