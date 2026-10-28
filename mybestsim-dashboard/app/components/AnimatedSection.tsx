"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Wrappe une section dans une animation subtile au scroll
 * (fondu + léger déplacement vertical). Une seule fois par section.
 * `delay` permet de décaler l'animation (stagger) entre plusieurs
 * éléments côte à côte (ex: index * 0.08).
 */
export default function AnimatedSection({
  children,
  delay = 0,
}: {
  children: ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}
