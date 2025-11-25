"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export function CallToAction() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="text-center py-16"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
        Ready to get started?
      </h2>
      <p className="text-gray-600 mt-4">
        Sign up today and take control of your tasks.
      </p>
      <Link
        href="/signup"
        className="mt-6 inline-block bg-red-600 text-white rounded-md px-6 py-3 hover:bg-red-700"
      >
        Sign Up Now
      </Link>
    </motion.div>
  );
}
