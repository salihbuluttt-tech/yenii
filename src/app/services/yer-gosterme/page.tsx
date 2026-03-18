"use client";

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { MapPin, Shield, CheckCircle2, Loader2, Navigation, Send, Smartphone } from 'lucide-react';

export default function YerGostermePage() {
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [gpsLocked, setGpsLocked] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleLockGps = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setGpsLocked(true);
    }, 1500);
  };

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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-widest">
              <MapPin className="w-3 h-3" /> Dijital Yer Gösterme Modülü
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight leading-[0.9]">
              GPS Mühürlü <br /> <span className="text-amber-400">Teyit Formu</span>
            </h1>
            <p className="text-white/40 max-w-xl mx-auto font-medium leading-relaxed uppercase text-[10px] tracking-widest italic">Konum bazlı teyit ile portföy emniyetinizi saniyeler içinde resmileştirin.</p>
          </div>

          {!completed ? (
            <div className="glass-card p-8 md:p-12 border-white/5 bg-white/[0.02] space-y-10 animate-in fade-in duration-500">
              
              {/* GPS Status */}
              <div className={`p-6 rounded-2xl border transition-all flex items-center justify-between ${
                gpsLocked ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-amber-500/5 border-amber-500/10'
              }`}>
                 <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${gpsLocked ? 'bg-emerald-500/20' : 'bg-amber-500/20'}`}>
                       <Navigation className={`w-5 h-5 ${gpsLocked ? 'text-emerald-400' : 'text-amber-400 opacity-50'}`} />
                    </div>
                    <div>
                      <div className="text-[10px] font-black text-white/20 uppercase tracking-widest">KONUM DURUMU</div>
                      <div className={`text-xs font-bold uppercase ${gpsLocked ? 'text-emerald-400' : 'text-amber-400'}`}>
                        {gpsLocked ? "GPS KONUMU MÜHÜRLENDİ" : "SİSTEM KONUM BEKLİYOR"}
                      </div>
                    </div>
                 </div>
                 {!gpsLocked && (
                   <button 
                    onClick={handleLockGps}
                    className="px-6 py-2 bg-amber-500 text-white font-black text-[10px] uppercase tracking-widest rounded-lg hover:bg-amber-600 transition-all active:scale-95"
                   >
                     {loading ? "ARANIYOR..." : "KONUMU SABİTLE"}
                   </button>
                 )}
              </div>

              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-white/40 uppercase tracking-widest pl-1">Emlak Danışmanı</label>
                    <input type="text" placeholder="Ad Soyad" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-amber-400/50" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-white/40 uppercase tracking-widest pl-1">Müşteri (Alıcı)</label>
                    <input type="text" placeholder="Ad Soyad" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-amber-400/50" />
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-white/40 uppercase tracking-widest pl-1">Gayrimenkul Detayı</label>
                    <textarea placeholder="Adres, Ada Parsel veya Ünite Ref No" rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-amber-400/50 resize-none"></textarea>
                  </div>
                </div>

                <div className="md:col-span-2 pt-4">
                   <button 
                    type="submit"
                    disabled={!gpsLocked || loading}
                    className="w-full py-5 bg-amber-500 hover:bg-amber-600 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl shadow-2xl shadow-amber-500/20 transition-all flex items-center justify-center gap-3 disabled:opacity-20 active:scale-95"
                   >
                     {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Send className="w-5 h-5" /> FORMULÜ ONAYLA VE GÖNDER</>}
                   </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="glass-card p-12 text-center space-y-10 border-emerald-500/20 bg-emerald-500/5 animate-in zoom-in-95 duration-500 shadow-2xl shadow-emerald-500/5">
                <div className="w-24 h-24 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto border border-emerald-500/40">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400" />
                </div>
                <div className="space-y-4">
                  <h2 className="text-4xl font-black text-white uppercase tracking-tight">FORM ONAYLANDI</h2>
                  <p className="text-white/40 uppercase text-[10px] font-black tracking-widest italic">Dijital imza ve GPS kanıtı eklendi. Rapora mühür vuruldu.</p>
                </div>
                <div className="flex flex-col md:flex-row gap-4 justify-center pt-4">
                  <div className="p-6 bg-[#0a0a0c] border border-white/5 rounded-[2rem] text-left flex items-center gap-6 shadow-2xl shadow-black/50">
                    <Smartphone className="w-10 h-10 text-white/10" />
                    <div>
                      <div className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">SMS BİLDİRİMİ</div>
                      <div className="text-[10px] text-white/30 font-bold uppercase leading-relaxed">Müşteriye Doğrulama Linki <br /> İletildi. Teyit Alındı.</div>
                    </div>
                  </div>
                </div>
                <button onClick={() => setCompleted(false)} className="px-16 py-6 bg-white/5 text-white/40 font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-white/10 transition-all shadow-inner">
                  YENİ FORM OLUŞTUR
                </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
