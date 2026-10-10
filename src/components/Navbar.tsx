"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { Menu, X, Globe } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { language, toggleLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { name: t.nav.home, href: "/" },
    { name: t.nav.about, href: "/about" },
    { name: t.nav.services, href: "/services" },
    { name: t.nav.gallery, href: "/gallery" },
    { name: t.nav.contact, href: "/contact" },
  ];

  return (
    <nav className="fixed w-full bg-white/95 backdrop-blur-sm z-50 shadow-sm border-b border-blue-100 top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link href="/" className="flex-shrink-0 flex items-center">
            <Image 
              src="/images/logo-navbar.png" 
              alt="Gurdwara Guru Nanak Mission" 
              width={220} 
              height={60} 
              className="h-12 w-auto object-contain"
            />
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            {links.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`${isActive ? "text-blue-600 font-semibold" : "text-slate-600"} hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors`}
                >
                  {link.name}
                </Link>
              );
            })}
            <div className="flex items-center gap-4 border-l border-slate-200 pl-4">
              <a 
                href="https://www.youtube.com/@gurunanakmissionsikhsociety" 
                target="_blank" 
                rel="noreferrer"
                className="text-slate-400 hover:text-red-600 transition-colors"
                title="Visit our YouTube Channel"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>
              </a>
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full hover:bg-blue-100 transition-colors text-sm font-medium cursor-pointer"
              >
                <Globe size={16} />
                {language === "en" ? "ਪੰਜਾਬੀ" : "English"}
              </button>
            </div>
          </div>

          <div className="md:hidden flex items-center gap-4">
             <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full hover:bg-blue-100 transition-colors text-sm font-medium cursor-pointer"
            >
              <Globe size={14} />
              {language === "en" ? "PA" : "EN"}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-blue-600 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 shadow-lg absolute w-full">
          <div className="px-4 pt-3 pb-4 space-y-1">
            {links.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`${isActive ? "text-blue-600 bg-blue-50 font-semibold" : "text-slate-700"} hover:text-blue-600 hover:bg-blue-50 block px-4 py-3 rounded-xl text-base font-medium transition-colors`}
                >
                  {link.name}
                </Link>
              );
            })}
            <div className="pt-3 mt-2 border-t border-slate-100 flex items-center gap-3">
              <a 
                href="https://www.youtube.com/@gurunanakmissionsikhsociety" 
                target="_blank" rel="noreferrer"
                className="flex items-center gap-2 text-slate-600 hover:text-red-600 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>
                YouTube
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
