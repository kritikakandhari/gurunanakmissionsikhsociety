"use client";

import React, { createContext, useContext, useState } from "react";
import { en } from "../locales/en";
import { pa } from "../locales/pa";

type Language = "en" | "pa";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: typeof en;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en");

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "pa" : "en"));
  };

  const t = language === "en" ? en : pa;

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
