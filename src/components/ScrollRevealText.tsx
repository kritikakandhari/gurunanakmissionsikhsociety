"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ScrollRevealText({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 80%", "end 30%"],
  });

  const words = text.split(" ");

  return (
    <div ref={container} className={`text-center font-serif leading-relaxed ${className}`}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]}>
            {word}
          </Word>
        );
      })}
    </div>
  );
}

function Word({ children, progress, range }: { children: string; progress: any; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.1, 1]);
  return (
    <span className="relative inline-block mx-[0.2em] my-[0.1em]">
      <span className="absolute opacity-10 text-slate-300">{children}</span>
      <motion.span style={{ opacity }} className="text-blue-900 drop-shadow-sm">
        {children}
      </motion.span>
    </span>
  );
}
