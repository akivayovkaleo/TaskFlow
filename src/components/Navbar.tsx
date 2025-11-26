"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { FontSizeSelector } from "./FontSizeSelector";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-3 md:flex md:justify-between md:items-center">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-red-600">
            TaskFlow
          </Link>
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-800 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        <div className="hidden md:flex items-center">
          <FontSizeSelector />
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="text-gray-800 dark:text-white px-3 py-2"
          >
            {theme === "dark" ? <Sun size={24} /> : <Moon size={24} />}
          </button>
          <Link
            href="/login"
            className="text-gray-800 dark:text-white hover:text-red-600 px-3 py-2"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="bg-red-600 text-white rounded-md px-4 py-2 hover:bg-red-700"
          >
            Sign Up
          </Link>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                href="/login"
                className="block text-gray-800 hover:text-red-600 px-3 py-2"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="block bg-red-600 text-white rounded-md px-4 py-2 hover:bg-red-700"
              >
                Sign Up
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
