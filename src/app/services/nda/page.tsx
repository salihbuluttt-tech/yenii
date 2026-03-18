"use client";

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { FileText, Shield, Download, CheckCircle2, Loader2, Sparkles } from 'lucide-react';

export default function NDAPage() {
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setCompleted(true);
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-[#0a0a0c]">
      <Navbar />
      
      <div className="container mx-auto px-6 pt-32 pb-24">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold uppercase tracking-widest">
              <FileText className="w-3 h-3" /> Hızlı NDA Protokolü
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight">
              Anlık Gizlilik <span className="text-primary text-rose-400">Sözleşmesi</span>
            </h1>
            <p className="text-white/40 max-w-xl mx-auto font-medium">Hassas görüşmeler öncesi yasal korumanızı saniyeler içinde AI ile mühürleyin.</p>
          </div>

          {!completed ? (
            <div className="glass-card p-8 md:p-12 border-white/5 bg-white/[0.02]">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-white/40 uppercase tracking-widest pl-1">Taraf 1 (Siz)</label>
                    <input 
                      type="text" 
                      placeholder="Ad Soyad veya Firma Ünvanı"
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-rose-500/50 transition-all font-bold"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-white/40 uppercase tracking-widest pl-1">Taraf 2 (Karşı Taraf)</label>
                    <input 
                      type="text" 
                      placeholder="Ad Soyad veya Firma Ünvanı"
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-rose-500/50 transition-all font-bold"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-white/40 uppercase tracking-widest pl-1">Görüşme Konusu (Kapsam)</label>
                  <textarea 
                    placeholder="Örn: X Mahallesi Y Ada Parsel satış görüşmesi hakkında..."
                    rows={4}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-rose-500/50 transition-all font-medium"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full py-5 bg-rose-500 hover:bg-rose-600 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl shadow-2xl shadow-rose-500/20 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" /> SÖZLEŞMEYİ OLUŞTUR VE MÜHÜRLE
                    </>
                  )}
                </button>
              </form>
            </div>
          ) : (
            <div className="glass-card p-12 border-emerald-500/20 bg-emerald-500/5 text-center space-y-8 animate-in zoom-in-95 duration-500">
               <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto border border-emerald-500/40">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400" />
               </div>
               <div className="space-y-2">
                  <h2 className="text-3xl font-black text-white">SÖZLEŞME HAZIR</h2>
                  <p className="text-white/40 uppercase text-[10px] font-black tracking-widest">Sanal imza ve zaman damgası eklendi.</p>
               </div>
               <div className="flex flex-col md:flex-row gap-4 justify-center">
                  <button className="px-8 py-4 bg-emerald-500 text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-emerald-600 transition-all flex items-center justify-center gap-2">
                    <Download className="w-4 h-4" /> PDF OLARAK İNDİR
                  </button>
                  <button onClick={() => setCompleted(false)} className="px-8 py-4 bg-white/5 text-white/40 font-black text-xs uppercase tracking-widest rounded-xl hover:bg-white/10 transition-all">
                    YENİ OLUŞTUR
                  </button>
               </div>
            </div>
          )}

          {/* Guidelines */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 opacity-40">
            {[
              { title: "Yasal Geçerlilik", desc: "6098 sayılı TBK uyumlu." },
              { title: "Dijital Mühür", desc: "Zaman damgalı hash kaydı." },
              { title: "KVKK Uyumlu", desc: "Veriler 24 saat sonra silinir." },
            ].map((item, i) => (
              <div key={i} className="p-4 border border-white/5 rounded-xl text-center">
                <div className="text-[10px] font-black text-white uppercase tracking-widest mb-1">{item.title}</div>
                <div className="text-[9px] font-bold text-white/40 uppercase">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
