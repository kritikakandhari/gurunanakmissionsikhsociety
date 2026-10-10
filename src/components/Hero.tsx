"use client";

import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative w-full flex items-center justify-center overflow-hidden pt-20" style={{ minHeight: '100svh' }}>
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/banner.jpg')" }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-slate-900/60 mix-blend-multiply" />
      </div>

      {/* Hero Content — extra bottom padding so button doesn't overlap marquee */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-sm font-medium tracking-wide">
            ੴ Satnam Waheguru
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-5 leading-tight drop-shadow-lg">
            {t.hero.title}
          </h1>
          <p className="text-base sm:text-xl md:text-2xl text-blue-50 font-light mb-8 max-w-2xl mx-auto drop-shadow-md">
            {t.hero.subtitle}
          </p>
          <a
             href="/services"
             className="inline-flex items-center gap-2 bg-white text-blue-900 px-7 py-3.5 rounded-full font-semibold hover:bg-blue-50 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 text-sm sm:text-base"
          >
            Explore Services
          </a>
        </motion.div>
      </div>

      {/* Scrolling Marquee */}
      <div className="absolute bottom-0 w-full bg-blue-900/90 backdrop-blur-sm border-t border-blue-400/30 overflow-hidden py-2.5">
        <motion.div 
          className="whitespace-nowrap flex"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
        >
          <p className="text-blue-100 text-sm sm:text-lg px-4 font-medium flex-shrink-0">
            {t.hero.scrollText} {t.hero.scrollText} {t.hero.scrollText} {t.hero.scrollText}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
