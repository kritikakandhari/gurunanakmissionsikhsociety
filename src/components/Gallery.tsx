"use client";

import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { PlaySquare } from "lucide-react";

export default function Gallery() {
  const { language } = useLanguage();

  return (
    <section id="gallery" className="py-24 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            {language === "en" ? "Media & Gallery" : "ਮੀਡੀਆ ਅਤੇ ਗੈਲਰੀ"}
          </h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full mb-8"></div>
          <p className="text-slate-300 max-w-2xl mx-auto text-lg">
            {language === "en" 
              ? "Glimpses of our daily Kirtan, special events, and community Seva." 
              : "ਸਾਡੇ ਰੋਜ਼ਾਨਾ ਕੀਰਤਨ, ਵਿਸ਼ੇਸ਼ ਸਮਾਗਮਾਂ ਅਤੇ ਭਾਈਚਾਰਕ ਸੇਵਾ ਦੀਆਂ ਝਲਕੀਆਂ।"}
          </p>
        </div>

        {/* YouTube Section */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-semibold flex items-center gap-3">
              <PlaySquare className="text-red-500 w-8 h-8" />
              {language === "en" ? "Latest on YouTube" : "ਯੂਟਿਊਬ 'ਤੇ ਨਵੀਨਤਮ"}
            </h3>
            <a 
              href="https://www.youtube.com/@gurunanakmissionsikhsociety" 
              target="_blank" 
              rel="noreferrer"
              className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
            >
              {language === "en" ? "View Channel →" : "ਚੈਨਲ ਦੇਖੋ →"}
            </a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Embedded YouTube video placeholders. (In a real scenario, use actual video IDs) */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="aspect-video bg-slate-800 rounded-xl overflow-hidden shadow-lg border border-slate-700 relative group"
            >
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-all">
                <a 
                  href="https://www.youtube.com/@gurunanakmissionsikhsociety" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white pl-1 shadow-lg hover:bg-red-500 transition-colors"
                >
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                </a>
              </div>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="aspect-video bg-slate-800 rounded-xl overflow-hidden shadow-lg border border-slate-700 relative group"
            >
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-all">
                <a 
                  href="https://www.youtube.com/@gurunanakmissionsikhsociety" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white pl-1 shadow-lg hover:bg-red-500 transition-colors"
                >
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                </a>
              </div>
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}
