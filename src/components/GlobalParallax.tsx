"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export function GlobalParallax() {
  const { scrollYProgress } = useScroll();
  
  // Parallax physical displacement maps mapped to the 0-1 percentage of the full page scroll height
  const yGrid = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const yOrb1 = useTransform(scrollYProgress, [0, 1], ["0%", "150%"]);
  const yOrb2 = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);
  const yOrb3 = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden bg-white dark:bg-[#080808]">
      {/* Dynamic Parallax Grid */}
      <motion.div 
        style={{ y: yGrid }} 
        className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:64px_64px]"
      />
    </div>
  );
}
