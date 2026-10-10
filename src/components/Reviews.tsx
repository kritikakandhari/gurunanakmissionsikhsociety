"use client";

import Script from "next/script";
import { useLanguage } from "@/context/LanguageContext";

export default function Reviews() {
  const { language } = useLanguage();

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">
            {language === "en" ? "Community Reviews" : "ਸੰਗਤ ਦੇ ਵਿਚਾਰ"}
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full mb-12"></div>
        </div>

        <div className="flex justify-center w-full min-h-[400px]">
          {/* Elfsight Google Reviews | Untitled Google Reviews */}
          <Script src="https://elfsightcdn.com/platform.js" strategy="lazyOnload" />
          <div className="elfsight-app-adbcd87b-c998-4bca-9dcb-becd041585b7" data-elfsight-app-lazy></div>
        </div>
      </div>
    </section>
  );
}
