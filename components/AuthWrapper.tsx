"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function AuthWrapper({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-md p-6"
      >
        {children}
      </motion.div>
    </main>
  );
}
