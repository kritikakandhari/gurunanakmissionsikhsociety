"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { auth, db } from "@/lib/firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  User
} from "firebase/auth";
import { collection, addDoc, serverTimestamp, getDocs, query, orderBy, deleteDoc, doc } from "firebase/firestore";
import { LogOut, Upload, Plus, Trash2 } from "lucide-react";

const ADMIN_EMAIL = "gurunanakmissiongurdwara@gmail.com";

// Helper to compress image and convert to base64
const compressImage = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 1200;
        const MAX_HEIGHT = 1200;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height = Math.round((height * MAX_WIDTH) / width);
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width = Math.round((width * MAX_HEIGHT) / height);
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, width, height);
        // Compress as JPEG with 0.75 quality
        const dataUrl = canvas.toDataURL("image/jpeg", 0.75);
        resolve(dataUrl);
      };
      img.onerror = reject;
    };
    reader.onerror = reject;
  });
};

interface MediaInput {
  id: string;
  type: "image" | "youtube";
  file?: File;
  youtubeId?: string;
  previewUrl?: string;
}

interface Post {
  id: string;
  heading: string;
  date?: string;
  media: { type: string; data: string }[];
}

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [authError, setAuthError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Create post state
  const [heading, setHeading] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState("");
  const [mediaItems, setMediaItems] = useState<MediaInput[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Manage posts state
  const [posts, setPosts] = useState<Post[]>([]);
  const [activeTab, setActiveTab] = useState<"create" | "manage">("create");
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser && currentUser.email === ADMIN_EMAIL) {
        setUser(currentUser);
      } else if (currentUser) {
        // Non-admin Google account signed in - reject
        signOut(auth);
        setAuthError("Access denied. Only the admin account can log in.");
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchPosts = async () => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const snap = await getDocs(q);
    const fetched: Post[] = [];
    snap.forEach(d => fetched.push({ id: d.id, ...d.data() } as Post));
    setPosts(fetched);
  };

  useEffect(() => {
    if (user && activeTab === "manage") fetchPosts();
  }, [user, activeTab]);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setAuthError("");
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      if (result.user.email !== ADMIN_EMAIL) {
        await signOut(auth);
        setAuthError("Access denied. Only the admin account can log in.");
      }
    } catch (error: any) {
      setAuthError("Login failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setAuthError("");
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      if (result.user.email !== ADMIN_EMAIL) {
        await signOut(auth);
        setAuthError("Access denied. Only the admin Google account can log in.");
      }
    } catch (error: any) {
      setAuthError("Google login failed: " + error.message);
    }
  };

  const handleDelete = async (postId: string) => {
    if (!confirm("Are you sure you want to delete this post? This cannot be undone.")) return;
    setDeleting(postId);
    try {
      await deleteDoc(doc(db, "posts", postId));
      setPosts(posts.filter(p => p.id !== postId));
    } catch (error: any) {
      alert("Delete failed: " + error.message);
    } finally {
      setDeleting(null);
    }
  };

  const extractYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const addMediaItem = (type: "image" | "youtube") => {
    setMediaItems(prev => [...prev, { id: Math.random().toString(), type }]);
  };

  const handleMultipleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const newItems: MediaInput[] = Array.from(files).map(file => ({
      id: Math.random().toString(),
      type: "image" as const,
      file,
      previewUrl: URL.createObjectURL(file)
    }));
    setMediaItems(prev => [...prev, ...newItems]);
  };

  const removeMediaItem = (id: string) => {
    setMediaItems(mediaItems.filter(item => item.id !== id));
  };

  const handleFileChange = (id: string, file: File | null) => {
    if (!file) return;
    const previewUrl = URL.createObjectURL(file);
    setMediaItems(items => items.map(item => item.id === id ? { ...item, file, previewUrl } : item));
  };

  const handleYouTubeChange = (id: string, url: string) => {
    const ytId = extractYouTubeId(url);
    setMediaItems(items => items.map(item => item.id === id ? { ...item, youtubeId: ytId || "" } : item));
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (mediaItems.length === 0) {
      setMessage("Please add at least one image or YouTube video.");
      return;
    }
    setLoading(true);
    setMessage("");
    try {
      const finalMedia = [];
      for (const item of mediaItems) {
        if (item.type === "image" && item.file) {
          const compressedBase64 = await compressImage(item.file);
          finalMedia.push({ type: "image", data: compressedBase64 });
        } else if (item.type === "youtube" && item.youtubeId) {
          finalMedia.push({ type: "youtube", data: item.youtubeId });
        }
      }
      await addDoc(collection(db, "posts"), {
        heading,
        desc,
        date: date ? new Date(date).toISOString() : new Date().toISOString(),
        media: finalMedia,
        createdAt: serverTimestamp()
      });
      setMessage("Successfully published to gallery!");
      setHeading(""); setDesc(""); setDate(""); setMediaItems([]);
    } catch (error: any) {
      console.error("Upload error:", error);
      setMessage("Upload failed: " + (error.message || "Unknown error occurred"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 pt-20 flex flex-col">
      <Navbar />

      <section className="flex-grow py-16 px-4">
        <div className="max-w-4xl mx-auto">

          {!user ? (
            // ── LOGIN PANEL ──
            <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl border border-slate-200 p-10">
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Admin Login</h2>
              <p className="text-slate-500 mb-8">Only the authorised admin can access this panel.</p>

              {authError && <div className="p-3 mb-6 bg-red-50 text-red-700 rounded-lg text-sm border border-red-200">{authError}</div>}

              {/* Google Sign-In */}
              <button
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-3 border-2 border-slate-200 hover:border-blue-400 hover:bg-blue-50 text-slate-700 font-semibold py-3 px-6 rounded-xl transition-all mb-6"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                Sign in with Google
              </button>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1 h-px bg-slate-200"></div>
                <span className="text-slate-400 text-sm">or</span>
                <div className="flex-1 h-px bg-slate-200"></div>
              </div>

              {/* Email/Password */}
              <form onSubmit={handleEmailLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                  <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                  <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors">
                  {loading ? "Logging in..." : "Login with Email"}
                </button>
              </form>
            </div>

          ) : (
            // ── ADMIN DASHBOARD ──
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
              {/* Header */}
              <div className="flex justify-between items-center p-6 border-b border-slate-200 bg-blue-900 text-white">
                <div>
                  <h2 className="text-2xl font-bold">Admin Dashboard</h2>
                  <p className="text-blue-200 text-sm mt-1">Logged in as {user.email}</p>
                </div>
                <button onClick={() => signOut(auth)} className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors">
                  <LogOut size={18} /> Logout
                </button>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-slate-200">
                <button onClick={() => setActiveTab("create")} className={`flex-1 py-4 font-semibold transition-colors ${activeTab === "create" ? "text-blue-600 border-b-2 border-blue-600" : "text-slate-500 hover:text-slate-700"}`}>
                  + Create New Post
                </button>
                <button onClick={() => setActiveTab("manage")} className={`flex-1 py-4 font-semibold transition-colors ${activeTab === "manage" ? "text-blue-600 border-b-2 border-blue-600" : "text-slate-500 hover:text-slate-700"}`}>
                  Manage Posts
                </button>
              </div>

              <div className="p-8">
                {/* ── CREATE TAB ── */}
                {activeTab === "create" && (
                  <form onSubmit={handleUpload} className="space-y-8">
                    {message && <div className={`p-4 rounded-lg font-medium ${message.includes('success') ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>{message}</div>}

                    <div className="space-y-4 bg-slate-50 p-6 rounded-xl border border-slate-200">
                      <h3 className="text-lg font-semibold text-slate-800">1. Post Details</h3>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Heading / Title <span className="text-red-500">*</span></label>
                        <input type="text" required value={heading} onChange={(e) => setHeading(e.target.value)} placeholder="e.g. Sunday Kirtan Darbar, Nagar Kirtan 2024" className="w-full px-4 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" />
                        <p className="text-xs text-slate-500 mt-1">This heading decides which folder the post goes into in the gallery.</p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">Date</label>
                          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Description (Optional)</label>
                        <textarea rows={3} value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Write something about this event..." className="w-full px-4 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 resize-none"></textarea>
                      </div>
                    </div>

                    <div className="space-y-4 bg-slate-50 p-6 rounded-xl border border-slate-200">
                      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                        <div>
                          <h3 className="text-lg font-semibold text-slate-800">2. Add Media</h3>
                          <p className="text-xs text-slate-500">You can select multiple photos at once or add YouTube links.</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <label className="flex items-center gap-1.5 text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium cursor-pointer shadow-sm transition-colors">
                            <Plus size={16} /> Choose Multiple Photos
                            <input 
                              type="file" 
                              multiple 
                              accept="image/*" 
                              className="hidden" 
                              onChange={(e) => handleMultipleFiles(e.target.files)} 
                            />
                          </label>
                          <button type="button" onClick={() => addMediaItem("youtube")} className="flex items-center gap-1.5 text-sm bg-red-100 text-red-700 px-4 py-2 rounded-lg hover:bg-red-200 font-medium transition-colors">
                            <Plus size={16} /> YouTube Link
                          </button>
                        </div>
                      </div>
                      {mediaItems.length === 0 && (
                        <div className="text-center py-10 text-slate-500 border-2 border-dashed border-slate-300 rounded-xl bg-white">
                          <p className="font-medium text-slate-700 mb-1">No media selected yet</p>
                          <p className="text-xs text-slate-400">Click &quot;Choose Multiple Photos&quot; above to select all pictures from your folder at once.</p>
                        </div>
                      )}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {mediaItems.map((item, index) => (
                          <div key={item.id} className="relative p-4 bg-white border border-slate-200 rounded-xl shadow-sm hover:border-slate-300 transition-colors">
                            <button type="button" onClick={() => removeMediaItem(item.id)} className="absolute top-2 right-2 text-slate-400 hover:text-red-500 p-1 rounded-md hover:bg-slate-50 transition-colors" title="Remove"><Trash2 size={18} /></button>
                            <p className="font-semibold text-sm mb-3 text-slate-700">Media {index + 1} ({item.type === "image" ? "Photo" : "YouTube"})</p>
                            {item.type === "image" ? (
                              <div>
                                <input type="file" accept="image/*" onChange={(e) => handleFileChange(item.id, e.target.files?.[0] || null)} className="w-full text-sm text-slate-500 file:mr-4 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                                {item.previewUrl && <img src={item.previewUrl} alt="Preview" className="mt-3 h-28 w-full object-cover rounded-lg border border-slate-200" />}
                              </div>
                            ) : (
                              <div>
                                <input type="url" placeholder="Paste YouTube Link here..." onChange={(e) => handleYouTubeChange(item.id, e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-md outline-none text-sm focus:ring-1 focus:ring-blue-500" />
                                {item.youtubeId && <img src={`https://img.youtube.com/vi/${item.youtubeId}/mqdefault.jpg`} alt="YT Preview" className="mt-3 h-28 w-full object-cover rounded-lg border border-slate-200" />}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl flex justify-center items-center gap-2 shadow-lg">
                      <Upload size={20} /> {loading ? "Publishing Post..." : "Publish to Gallery"}
                    </button>
                  </form>
                )}

                {/* ── MANAGE TAB ── */}
                {activeTab === "manage" && (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-bold text-slate-800">All Gallery Posts ({posts.length})</h3>
                      <button onClick={fetchPosts} className="text-sm text-blue-600 hover:underline">Refresh</button>
                    </div>

                    {posts.length === 0 ? (
                      <p className="text-slate-500 text-center py-8">No posts yet.</p>
                    ) : (
                      <div className="space-y-4">
                        {posts.map(p => {
                          const firstImg = p.media?.find(m => m.type === "image");
                          const firstYt = p.media?.find(m => m.type === "youtube");
                          const thumb = firstImg?.data || (firstYt ? `https://img.youtube.com/vi/${firstYt.data}/mqdefault.jpg` : null);

                          return (
                            <div key={p.id} className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors">
                              {thumb && (
                                <div className="w-20 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-slate-200">
                                  <img src={thumb} alt={p.heading} className="w-full h-full object-cover" />
                                </div>
                              )}
                              <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-slate-900 truncate">{p.heading}</h4>
                                <p className="text-sm text-slate-500">{p.media?.length || 0} media items · {p.date ? new Date(p.date).toLocaleDateString() : "No date"}</p>
                              </div>
                              <button
                                onClick={() => handleDelete(p.id)}
                                disabled={deleting === p.id}
                                className="flex items-center gap-1.5 text-sm text-red-600 hover:text-white hover:bg-red-500 border border-red-200 hover:border-red-500 px-3 py-2 rounded-lg transition-all font-medium flex-shrink-0"
                              >
                                <Trash2 size={15} /> {deleting === p.id ? "Deleting..." : "Delete"}
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
