"use client";

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Building2, Gavel, FileSignature, CheckCircle2, Loader2, Sparkles, AlertCircle, FileText } from 'lucide-react';

export default function IhalePage() {
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setCompleted(true);
    }, 3000);
  };

  return (
    <main className="min-h-screen bg-[#0a0a0c]">
      <Navbar />
      
      <div className="container mx-auto px-6 pt-32 pb-24">
        <div className="max-w-5xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-bold uppercase tracking-widest">
              <Gavel className="w-3 h-3" /> Proje İhale ve Teklif Paneli
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight">
              Müteahhit <span className="text-primary text-sky-400">Teklif Toplama</span>
            </h1>
            <p className="text-white/40 max-w-xl mx-auto font-medium leading-relaxed uppercase text-[11px] tracking-widest">
              Arsa Payı Karşılığı İnşaat ve Kat Karşılığı İhale Şartnamesi Hazırlama.
            </p>
          </div>

          {!completed ? (
            <div className="glass-card p-8 md:p-12 border-white/5 bg-white/[0.02] space-y-8 shadow-2xl">
              <div className="flex items-center gap-4 p-4 bg-sky-500/10 border border-sky-500/20 rounded-2xl text-sky-400 text-xs font-bold uppercase tracking-widest">
                 <AlertCircle className="w-5 h-5" />
                 DİKKAT: İŞBU ŞARTNAME, 4734 SAYILI KAMU İHALE KANUNU (KIYASEN) VE TBK HÜKÜMLERİNE UYGUNDUR.
              </div>

              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-white/40 uppercase tracking-widest pl-1">Arsa Sahibi / Yetkilisi</label>
                    <input type="text" placeholder="İsim / Ünvan" required className="w-full bg-[#0a0a0c] border border-white/10 rounded-xl px-4 py-3 text-white text-xs font-bold focus:border-sky-500/50 outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-white/40 uppercase tracking-widest pl-1">Proje Tahmini Bedeli (TL)</label>
                    <input type="number" placeholder="Örn: 50.000.000" className="w-full bg-[#0a0a0c] border border-white/10 rounded-xl px-4 py-3 text-white text-xs font-bold focus:border-sky-500/50 outline-none" />
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-white/40 uppercase tracking-widest pl-1">Yüklenici (Müteahhit) Bilgisi</label>
                    <input type="text" placeholder="Şirket Adı / Ticari Sicil No" className="w-full bg-[#0a0a0c] border border-white/10 rounded-xl px-4 py-3 text-white text-xs font-bold focus:border-sky-500/50 outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-white/40 uppercase tracking-widest pl-1">Teklif / Paylaşım Oranı (%)</label>
                    <input type="text" placeholder="Örn: %40 Arsa Sahibi - %60 Müteahhit" className="w-full bg-[#0a0a0c] border border-white/10 rounded-xl px-4 py-3 text-white text-xs font-bold focus:border-sky-500/50 outline-none" />
                  </div>
                </div>

                <div className="md:col-span-2 pt-8">
                   <button 
                    type="submit"
                    disabled={loading}
                    className="w-full py-5 bg-sky-500 hover:bg-sky-600 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl shadow-2xl shadow-sky-500/20 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                   >
                     {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><FileSignature className="w-5 h-5" /> ŞARTNAMEYİ ONAYLA VE YAYINLA</>}
                   </button>
                </div>
              </form>
            </div>
          ) : (
             <div className="glass-card p-12 text-center space-y-10 border-sky-500/20 bg-sky-500/5 animate-in fade-in duration-700">
               <div className="w-24 h-24 rounded-full bg-sky-500/20 flex items-center justify-center mx-auto border border-sky-500/40">
                  <CheckCircle2 className="w-12 h-12 text-sky-400" />
               </div>
               
               <div className="space-y-4">
                  <h2 className="text-4xl font-black text-white uppercase tracking-tight leading-none">İHALE ŞARTNAMESİ MÜHÜRLENDİ</h2>
                  <div className="max-w-2xl mx-auto p-8 bg-[#0a0a0c] border border-white/5 rounded-3xl text-left font-serif text-[11px] leading-tight text-white/60 shadow-2xl h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 shadow-inner">
                    <p className="font-bold text-center text-white mb-6 uppercase border-b border-white/5 pb-2">ARSA PAYI KARŞILIĞI İNŞAAT VE İHALE PROTOKOLÜ</p>
                    <p className="mb-4">İşbu protokol, Arsa Sahibi tarafın mülkiyetindeki taşınmazın, Yüklenici tarafça ihaleye konu olan teklif ve şartlar çerçevesinde anahtar teslim inşa edilmesi ve paydaşlık oranlarının belirlenmesi gayesiyle dijital mühürle tanzim edilmiştir.</p>
                    
                    <p className="font-bold text-sky-400 mb-2 underline">MADDE 1 - TAAHHÜT ŞARTLARI</p>
                    <p className="mb-4">Yüklenici, işbu ihale kapsamında sunulan projeyi, onaylı ruhsat ve eklerine, fen ve sanat kurallarına, TSE standartlarına ve deprem yönetmeliğine tam uyumlu olarak inşa etmeyi gayrikabili rücu kabul, beyan ve taahhüt eder.</p>
                    
                    <p className="font-bold text-sky-400 mb-2 underline">MADDE 2 - PAYDAŞLIK VE TESLİM</p>
                    <p className="mb-4">Arsa sahibi ve Yüklenici arasındaki paylaşım oranı, ihale sonucunda belirlenen oran dâhilinde (%...) tescil edilecektir. Teslim süresi, ruhsat alım tarihinden itibaren en geç 24 (yirmi dört) ay olarak kararlaştırılmıştır.</p>

                    <p className="font-bold text-sky-400 mb-2 underline">MADDE 3 - TEMİNAT VE CEZAİ ŞARTLAR</p>
                    <p className="mb-4">Gecikilen her ay için Yüklenici, arsa sahiplerine kira tazminatı olarak belirlenen güncel rayiç bedeli ödemekle yükümlüdür. Mücbir sebepler haricinde işin durdurulması halinde teminat mektubu nakde çevrilecektir.</p>

                    <p className="font-bold text-sky-400 mb-2 underline">MADDE 4 - DİJİTAL MÜHÜR VE DELİL SÖZLEŞMESİ</p>
                    <p className="mb-4 italic">6100 Sayılı HMK madde 193 uyarınca, TrustBridge sistemi üzerinden alınan bu dijital kayıt kesin delil niteliğindedir.</p>
                  </div>
               </div>

               <div className="flex justify-center flex-col md:flex-row gap-4">
                  <button className="px-12 py-5 bg-sky-500 text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-2xl shadow-sky-500/30">
                    ŞARTNAMEYİ İNDİR (PDF)
                  </button>
                  <button onClick={() => setCompleted(false)} className="px-12 py-5 bg-white/5 text-white/40 font-black text-xs uppercase tracking-widest rounded-2xl">
                    YENİ İHALE AÇ
                  </button>
               </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
