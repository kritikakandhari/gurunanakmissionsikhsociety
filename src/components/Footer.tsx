"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  const { t, language } = useLanguage();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* Column 1: Brand & Intro */}
          <div className="space-y-4">
            <div className="mb-4">
              <Image 
                src="/images/logo-footer.jpg" 
                alt="Gurdwara Guru Nanak Mission" 
                width={120} 
                height={120} 
                className="h-24 w-auto object-contain"
              />
            </div>
            <p className="text-slate-400 leading-relaxed text-sm pr-4">
              {language === "en" 
                ? "A place of peace, devotion, and community service. We welcome everyone to join our daily Kirtan, Sangat, and Langar Seva." 
                : "ਸ਼ਾਂਤੀ, ਸ਼ਰਧਾ ਅਤੇ ਭਾਈਚਾਰਕ ਸੇਵਾ ਦਾ ਸਥਾਨ। ਅਸੀਂ ਹਰ ਕਿਸੇ ਦਾ ਰੋਜ਼ਾਨਾ ਕੀਰਤਨ, ਸੰਗਤ ਅਤੇ ਲੰਗਰ ਸੇਵਾ ਵਿੱਚ ਸ਼ਾਮਲ ਹੋਣ ਲਈ ਸਵਾਗਤ ਕਰਦੇ ਹਾਂ।"}
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-6 border-b border-slate-700 pb-2 inline-block">
              {language === "en" ? "Quick Links" : "ਮੁੱਖ ਲਿੰਕ"}
            </h3>
            <ul className="space-y-3">
              <li><Link href="/" className="hover:text-blue-400 transition-colors flex items-center gap-2"><span className="text-blue-500 text-xs">▸</span> {t.nav.home}</Link></li>
              <li><Link href="/about" className="hover:text-blue-400 transition-colors flex items-center gap-2"><span className="text-blue-500 text-xs">▸</span> {t.nav.about}</Link></li>
              <li><Link href="/services" className="hover:text-blue-400 transition-colors flex items-center gap-2"><span className="text-blue-500 text-xs">▸</span> {t.nav.services}</Link></li>
              <li><Link href="/gallery" className="hover:text-blue-400 transition-colors flex items-center gap-2"><span className="text-blue-500 text-xs">▸</span> {t.nav.gallery}</Link></li>
              <li><Link href="/contact" className="hover:text-blue-400 transition-colors flex items-center gap-2"><span className="text-blue-500 text-xs">▸</span> {t.nav.contact}</Link></li>
            </ul>
          </div>

          {/* Column 3: Contact Info & Socials */}
          <div>
            <h3 className="text-white font-semibold mb-6 border-b border-slate-700 pb-2 inline-block">
              {language === "en" ? "Connect With Us" : "ਸਾਡੇ ਨਾਲ ਜੁੜੋ"}
            </h3>
            <ul className="space-y-4 text-sm mb-6">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-blue-500 mt-0.5 flex-shrink-0" />
                <span>{t.contact.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-blue-500 flex-shrink-0" />
                <span>{t.contact.phone}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-blue-500 flex-shrink-0" />
                <a href={`mailto:${t.contact.email}`} className="hover:text-blue-400 transition-colors">
                  {t.contact.email}
                </a>
              </li>
            </ul>
            
            {/* Social Icons */}
            <div className="flex gap-4">
              {/* YouTube */}
              <a href="https://www.youtube.com/@gurunanakmissionsikhsociety" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all text-slate-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>
              </a>
              {/* Facebook */}
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all text-slate-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              {/* Instagram */}
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-pink-600 hover:text-white transition-all text-slate-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between text-sm text-slate-500">
          <p>
            © {new Date().getFullYear()} {language === "en" ? "Gurdwara Guru Nanak Mission Sikh Society. All rights reserved." : "ਗੁਰਦੁਆਰਾ ਗੁਰੂ ਨਾਨਕ ਮਿਸ਼ਨ ਸਿੱਖ ਸੁਸਾਇਟੀ. ਸਾਰੇ ਹੱਕ ਰਾਖਵੇਂ ਹਨ."}
          </p>
          <div className="mt-4 md:mt-0 flex gap-4">
            <Link href="/admin" className="hover:text-slate-300 transition-colors">Admin Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
