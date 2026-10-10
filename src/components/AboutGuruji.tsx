"use client";

import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutGuruji() {
  const { language } = useLanguage();

  return (
    <section id="about" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/5] max-w-md mx-auto lg:mx-0">
              <Image 
                src="/images/gurunanak.webp" 
                alt="Guru Nanak Dev Ji"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 space-y-6"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900">
              {language === "en" ? "Teachings of Guru Nanak Dev Ji" : "ਸ਼੍ਰੀ ਗੁਰੂ ਨਾਨਕ ਦੇਵ ਜੀ ਦੀਆਂ ਸਿੱਖਿਆਵਾਂ"}
            </h2>
            <div className="w-20 h-1 bg-blue-600 rounded-full"></div>
            
            <div className="prose prose-lg text-slate-600">
              <p>
                {language === "en" 
                  ? "Guru Nanak Dev Ji's teachings are founded on the principles of equality, fraternal love, goodness, and virtue. The core of his philosophy is to remember God at all times (Naam Japo), earn a righteous living (Kirat Karo), and share what you have with others (Vand Chhako)."
                  : "ਗੁਰੂ ਨਾਨਕ ਦੇਵ ਜੀ ਦੀਆਂ ਸਿੱਖਿਆਵਾਂ ਬਰਾਬਰੀ, ਭਾਈਚਾਰਕ ਪਿਆਰ, ਚੰਗਿਆਈ ਅਤੇ ਨੇਕੀ ਦੇ ਸਿਧਾਂਤਾਂ 'ਤੇ ਅਧਾਰਤ ਹਨ। ਉਨ੍ਹਾਂ ਦੇ ਫਲਸਫੇ ਦਾ ਮੁੱਖ ਉਦੇਸ਼ ਹਮੇਸ਼ਾ ਪ੍ਰਮਾਤਮਾ ਨੂੰ ਯਾਦ ਰੱਖਣਾ (ਨਾਮ ਜਪੋ), ਧਰਮ ਦੀ ਕਿਰਤ ਕਰਨਾ (ਕਿਰਤ ਕਰੋ), ਅਤੇ ਜੋ ਤੁਹਾਡੇ ਕੋਲ ਹੈ ਉਸਨੂੰ ਦੂਜਿਆਂ ਨਾਲ ਸਾਂਝਾ ਕਰਨਾ (ਵੰਡ ਛਕੋ) ਹੈ।"}
              </p>
              <p>
                {language === "en"
                  ? "Our Gurdwara strives to embody these divine principles through everyday Seva, Kirtan, and community support. Everyone, regardless of their background, is welcome here."
                  : "ਸਾਡਾ ਗੁਰਦੁਆਰਾ ਰੋਜ਼ਾਨਾ ਸੇਵਾ, ਕੀਰਤਨ ਅਤੇ ਭਾਈਚਾਰਕ ਸਹਾਇਤਾ ਰਾਹੀਂ ਇਨ੍ਹਾਂ ਇਲਾਹੀ ਸਿਧਾਂਤਾਂ ਨੂੰ ਸਾਕਾਰ ਕਰਨ ਦਾ ਯਤਨ ਕਰਦਾ ਹੈ। ਇੱਥੇ ਹਰ ਕਿਸੇ ਦਾ, ਭਾਵੇਂ ਉਹ ਕਿਸੇ ਵੀ ਪਿਛੋਕੜ ਦਾ ਹੋਵੇ, ਸਵਾਗਤ ਹੈ।"}
              </p>
            </div>
            
            <blockquote className="border-l-4 border-blue-600 pl-6 py-2 mt-8 bg-blue-50 rounded-r-lg">
              <p className="text-xl italic text-blue-900 font-medium">
                "There is but One God. His name is Truth; He is the Creator."
              </p>
            </blockquote>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
