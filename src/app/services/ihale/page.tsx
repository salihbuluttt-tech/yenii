"use client";

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Building2, Gavel, FileSignature, CheckCircle2, Loader2, Sparkles, AlertCircle, FileText } from 'lucide-react';

export default function IhalePaneliPage() {
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
    }, 2500);
  };

  return (
    <main className="min-h-screen bg-[#070709]">
      <Navbar />
      
      <div className="container mx-auto px-6 pt-32 pb-24">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-bold uppercase tracking-widest">
              <Building2 className="w-3 h-3" /> Proje İhale ve Teklif Paneli
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight leading-[0.9]">
              Şeffaf <br /> <span className="text-sky-400">İhale Yönetimi</span>
            </h1>
            <p className="text-white/40 max-w-xl mx-auto font-medium leading-relaxed uppercase text-[10px] tracking-widest italic">Arsa sahibi ve müteahhit arasındaki teklif sürecini yasal zeminde mühürleyin.</p>
          </div>

          {!completed ? (
            <div className="glass-card p-8 md:p-12 border-white/5 bg-white/[0.02] space-y-10 animate-in fade-in duration-500 shadow-2xl">
              <div className="p-6 bg-sky-500/5 border border-sky-500/10 rounded-2xl flex items-start gap-4">
                 <AlertCircle className="w-6 h-6 text-sky-400 shrink-0 mt-1" />
                 <div className="space-y-1">
                    <h4 className="text-sm font-black text-white uppercase tracking-widest">4734 Sayılı Kamu İhale Kanunu Prensipleri</h4>
                    <p className="text-[10px] text-white/30 font-bold uppercase leading-relaxed tracking-wider">
                      Tüm teklifler dijital mühürle korunur ve son başvuru tarihine kadar şifreli olarak saklanır.
                    </p>
                 </div>
              </div>

              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-white/40 uppercase tracking-widest pl-1">İHALE BAŞLIĞI</label>
                    <input type="text" placeholder="Örn: Kadıköy 1290/4 Kat Karşılığı Projesi" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-sky-400/50" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-white/40 uppercase tracking-widest pl-1">ARSA SAHİBİ / YETKİLİ</label>
                    <input type="text" placeholder="Ad Soyad" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-sky-400/50" />
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-white/40 uppercase tracking-widest pl-1">PROJE ŞARTNAMESİ ÖZETİ</label>
                    <textarea placeholder="İnşaat alanı, kat adedi, teknik şartlar..." rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-sky-400/50 resize-none"></textarea>
                  </div>
                </div>

                <div className="md:col-span-2 pt-4">
                   <button 
                    type="submit"
                    disabled={loading}
                    className="w-full py-5 bg-sky-500 hover:bg-sky-600 text-black font-black text-xs uppercase tracking-[0.2em] rounded-2xl shadow-2xl shadow-sky-500/20 transition-all flex items-center justify-center gap-3 active:scale-95"
                   >
                     {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Gavel className="w-5 h-5" /> İHALEYİ YAYINA AL VE MÜHÜRLE</>}
                   </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="glass-card p-12 text-center space-y-10 border-sky-500/20 bg-sky-500/5 animate-in zoom-in-95 duration-500 shadow-2xl shadow-sky-500/5">
                <div className="w-24 h-24 rounded-full bg-sky-500/20 flex items-center justify-center mx-auto border border-sky-500/40">
                  <FileSignature className="w-12 h-12 text-sky-400" />
                </div>
                <div className="space-y-4">
                  <h2 className="text-4xl font-black text-white uppercase tracking-tight">İHALE PANALİ AKTİF</h2>
                  <p className="text-white/40 uppercase text-[10px] font-black tracking-widest italic">Teklif TOPLAMA SÜRECİ BAŞLATILDI. ŞARTNAME MÜHÜRLENDİ.</p>
                </div>
                
                <div className="p-8 bg-black/40 border border-white/5 rounded-[2.5rem] text-left space-y-6">
                   <div className="flex items-center gap-4 text-sky-400">
                      <Sparkles className="w-5 h-5" />
                      <span className="text-[10px] font-black uppercase tracking-widest">Hukuksal Mahiyet (HMK MD 193)</span>
                   </div>
                   <p className="text-white/40 text-[11px] font-medium leading-relaxed uppercase tracking-widest italic">
                      İşbu ihale süreci boyunca toplanan tüm teklifler, zaman damgasıyla imzalanmış olup, taraflar arasındaki 'Delil Sözleşmesi' hükmündedir.
                   </p>
                </div>

                <div className="flex justify-center pt-4">
                  <button onClick={() => setCompleted(false)} className="px-16 py-6 bg-white/5 text-white/40 font-black text-xs uppercase tracking-widest rounded-3xl hover:bg-white/10 transition-all shadow-inner">
                    PANELİ SIFIRLA
                  </button>
                </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
