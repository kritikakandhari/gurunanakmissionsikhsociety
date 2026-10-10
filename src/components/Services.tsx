"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Music, BookOpen, HeartHandshake, Users, Mic2, Activity, Utensils } from "lucide-react";
import { motion } from "framer-motion";

export default function Services() {
  const { t } = useLanguage();

  const services = [
    {
      icon: <Music className="w-8 h-8 text-blue-600" />,
      title: t.services.kirtan,
      desc: t.services.kirtanDesc,
    },
    {
      icon: <Activity className="w-8 h-8 text-blue-600" />,
      title: t.services.tabla,
      desc: t.services.tablaDesc,
    },
    {
      icon: <Mic2 className="w-8 h-8 text-blue-600" />,
      title: t.services.harmonium,
      desc: t.services.harmoniumDesc,
    },
    {
      icon: <BookOpen className="w-8 h-8 text-blue-600" />,
      title: t.services.punjabi,
      desc: t.services.punjabiDesc,
    },
    {
      icon: <Utensils className="w-8 h-8 text-blue-600" />,
      title: t.services.langar,
      desc: t.services.langarDesc,
    },
    {
      icon: <HeartHandshake className="w-8 h-8 text-blue-600" />,
      title: t.services.sangat,
      desc: t.services.sangatDesc,
    },
    {
      icon: <Users className="w-8 h-8 text-blue-600" />,
      title: t.services.paath,
      desc: t.services.paathDesc,
    }
  ];

  return (
    <section id="services" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">{t.services.title}</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-center">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:border-blue-100 transition-all group"
            >
              <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all [&>svg]:group-hover:text-white">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">{service.title}</h3>
              <p className="text-slate-600 leading-relaxed">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
