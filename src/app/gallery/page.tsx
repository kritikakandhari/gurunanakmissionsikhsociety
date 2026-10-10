"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { FolderOpen, ArrowLeft, Image as ImageIcon, Calendar, Lock } from "lucide-react";

interface MediaItem {
  type: "image" | "video" | "youtube";
  data: string;
}

interface Post {
  id: string;
  heading: string;
  desc?: string;
  date?: string;
  createdAt: number;
  media: MediaItem[];
}

const CATEGORIES = {
  "Nagar Kirtan": ["nagar", "parbhat", "pheri"],
  "Kirtan & Paath": ["kirtan", "paath", "path", "katha", "diwan", "smagam"],
  "Langar Seva": ["langar", "sewa", "seva"],
  "Gurbani Classes": ["punjabi", "tabla", "harmonium", "class", "gurbani", "santhiya"],
  "Special Events": ["gurpurab", "vaisakhi", "khalsa", "event", "camp"]
};

function getCategory(heading: string) {
  const h = (heading || '').toLowerCase();
  for (const [cat, keywords] of Object.entries(CATEGORIES)) {
    for (const keyword of keywords) {
      if (h.includes(keyword)) return cat;
    }
  }
  return "Other Albums";
}

export default function GalleryPage() {
  const { language } = useLanguage();
  const [folders, setFolders] = useState<Record<string, Post[]>>({});
  const [loading, setLoading] = useState(true);
  const [activeFolder, setActiveFolder] = useState<string | null>(null);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
        const snap = await getDocs(q);
        
        const grouped: Record<string, Post[]> = {};
        
        snap.forEach(d => {
          const p = { id: d.id, ...d.data() } as Post;
          const cat = getCategory(p.heading);
          if (!grouped[cat]) grouped[cat] = [];
          grouped[cat].push(p);
        });
        
        setFolders(grouped);
      } catch (error) {
        console.error("Error fetching gallery:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  const renderFolders = () => {
    if (Object.keys(folders).length === 0) {
      return (
        <div className="text-center text-slate-500 py-10">
          <p>{language === "en" ? "No photos yet. Check back soon!" : "ਗੈਲਰੀ ਵਿੱਚ ਅਜੇ ਕੋਈ ਮੀਡੀਆ ਨਹੀਂ ਮਿਲਿਆ।"}</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {Object.entries(folders).map(([catName, posts]) => {
          let totalItems = 0;
          let thumb = '/images/banner.jpg'; // fallback
          
          posts.forEach(p => { 
            if (p.media) totalItems += p.media.length; 
          });

          // Find first image/video for thumbnail
          for (const p of posts) {
            if (p.media && p.media.length > 0) {
              const firstImg = p.media.find(m => m.type === 'image');
              if (firstImg) { 
                thumb = firstImg.data; 
                break; 
              } else if (p.media[0].type === 'youtube') { 
                thumb = `https://img.youtube.com/vi/${p.media[0].data}/mqdefault.jpg`; 
                break; 
              }
            }
          }

          return (
            <div 
              key={catName}
              onClick={() => setActiveFolder(catName)}
              className="bg-white rounded-2xl overflow-hidden shadow-md border border-slate-200 cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all group"
            >
              <div 
                className="h-48 bg-cover bg-center"
                style={{ backgroundImage: `url('${thumb}')` }}
              >
                <div className="w-full h-full bg-black/20 group-hover:bg-black/10 transition-colors"></div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <FolderOpen className="text-blue-600 w-6 h-6" />
                  <h3 className="text-xl font-bold text-slate-800">{catName}</h3>
                </div>
                <div className="flex justify-between text-sm text-slate-500 font-medium">
                  <span>{posts.length} Posts</span>
                  <span className="flex items-center gap-1"><ImageIcon size={16}/> {totalItems} items</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderActiveFolder = () => {
    if (!activeFolder || !folders[activeFolder]) return null;
    const posts = folders[activeFolder];

    return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        <button 
          onClick={() => setActiveFolder(null)}
          className="flex items-center gap-2 text-slate-600 hover:text-blue-600 font-medium mb-8 transition-colors"
        >
          <ArrowLeft size={20} /> {language === "en" ? "Back to Folders" : "ਵਾਪਸ ਫੋਲਡਰਾਂ 'ਤੇ ਜਾਓ"}
        </button>

        <h2 className="text-3xl font-bold text-slate-900 mb-8 pb-4 border-b-2 border-blue-600 flex items-center gap-3">
          <FolderOpen className="text-blue-600" /> {activeFolder}
        </h2>

        {posts.map(p => {
          const dateStr = p.date ? new Date(p.date).toLocaleDateString(language === "en" ? 'en-GB' : 'pa-IN', {day:'numeric',month:'long',year:'numeric'}) : '';
          
          const youtubeMedia = p.media?.filter(m => m.type === 'youtube') || [];
          const videoMedia = p.media?.filter(m => m.type === 'video') || [];
          const imageMedia = p.media?.filter(m => m.type === 'image') || [];

          return (
            <div key={p.id} className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm mb-10">
              <h3 className="text-2xl font-bold text-amber-700 mb-2">{p.heading}</h3>
              {dateStr && (
                <div className="flex items-center gap-2 text-slate-500 text-sm font-medium mb-4">
                  <Calendar size={16} /> {dateStr}
                </div>
              )}
              {p.desc && <p className="text-slate-700 mb-6">{p.desc}</p>}

              {youtubeMedia.length > 0 && (
                <div className="mb-8">
                  <h4 className="text-lg font-bold text-slate-800 border-b border-slate-200 pb-2 mb-4 flex items-center gap-2">
                    <span className="text-red-500">▶</span> Videos
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {youtubeMedia.map((m, i) => (
                      <div key={i} className="aspect-video rounded-xl overflow-hidden shadow-sm">
                        <iframe src={`https://www.youtube.com/embed/${m.data}?rel=0`} className="w-full h-full" allowFullScreen></iframe>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {videoMedia.length > 0 && (
                <div className="mb-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {videoMedia.map((m, i) => (
                      <video key={i} src={m.data} controls className="w-full rounded-xl shadow-sm"></video>
                    ))}
                  </div>
                </div>
              )}

              {imageMedia.length > 0 && (
                <div>
                  <h4 className="text-lg font-bold text-slate-800 border-b border-slate-200 pb-2 mb-4 flex items-center gap-2">
                    <ImageIcon className="text-blue-600 w-5 h-5" /> Photos
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {imageMedia.map((m, i) => (
                      <div 
                        key={i} 
                        onClick={() => setLightboxImg(m.data)}
                        className="aspect-square rounded-xl overflow-hidden shadow-sm cursor-pointer hover:opacity-90 transition-opacity"
                      >
                        <img src={m.data} alt={p.heading} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-slate-50 pt-20 flex flex-col">
      <Navbar />
      
      <section className="flex-grow py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {!activeFolder && (
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">
                {language === "en" ? "Gallery" : "ਗੈਲਰੀ"}
              </h2>
              <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full mb-8"></div>
            </div>
          )}

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            activeFolder ? renderActiveFolder() : renderFolders()
          )}
          
          <div className="flex justify-end mt-12 pt-8 border-t border-slate-200">
            <a href="/admin" className="flex items-center gap-2 text-slate-400 hover:text-blue-600 transition-colors text-sm font-medium">
              <Lock size={14} /> Admin Login
            </a>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxImg && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
          onClick={() => setLightboxImg(null)}
        >
          <button 
            className="absolute top-6 right-6 text-white hover:text-red-500 transition-colors"
            onClick={() => setLightboxImg(null)}
          >
            <span className="text-4xl">&times;</span>
          </button>
          <img src={lightboxImg} className="max-w-full max-h-full rounded-md" alt="Enlarged" onClick={(e) => e.stopPropagation()} />
        </div>
      )}

      <Footer />
    </main>
  );
}
