"use client";

import React, { useState } from 'react';
import { Navbar } from "@/components/layout/Navbar";
import { 
  History, 
  Send, 
  BrainCircuit, 
  CheckCircle2, 
  Lock, 
  Download, 
  Zap, 
  Rocket,
  ShieldCheck,
  ChevronRight
} from "lucide-react";
import { ShopierModal } from '@/components/ui/ShopierModal';

export default function RoadmapPage() {
  const [isShopierOpen, setIsShopierOpen] = useState(false);

  const steps = [
    {
      number: "01",
      title: "KODU BAŞLATIN",
      subtitle: "Dijital Anahtar Kurulumu",
      description: "Ödeme yaparak Tek Seferlik İşlem Kodu satın alın. Bu kod sizin dijital anahtarınızdır ve 24 saat boyunca tüm analiz araçlarını aktif hale getirir.",
      Icon: History,
      color: "from-amber-500/20 to-amber-500/5",
      iconColor: "text-amber-400",
      action: () => setIsShopierOpen(true)
    },
    {
      number: "02",
      title: "DAVET GÖNDERİN",
      subtitle: "Güvenli Masa Oluşturma",
      description: "Eğer karşılıklı bir işlem (Mutabakat, NDA vb.) yapıyorsanız, sistemin size özel ürettiği Davet Kodu'nu karşı tarafa iletin. Masa her iki taraf bağlandığında aktifleşir.",
      Icon: Send,
      color: "from-primary/20 to-primary/5",
      iconColor: "text-primary"
    },
    {
      number: "03",
      title: "AI ANALİZİ",
      subtitle: "Mühür ve Belge Doğrulama",
      description: "Belgelerinizi yükleyin. Yapay zeka; imza, mühür, TC haneleri ve risk analizini anlık yaparak match (eşleşme) skorunu belirler. Mahrem alanlar otomatik olarak flulaşır.",
      Icon: BrainCircuit,
      color: "from-indigo-500/20 to-indigo-500/5",
      iconColor: "text-indigo-400"
    },
    {
      number: "04",
      title: "MÜHÜRLÜ RAPOR",
      subtitle: "Hukuksal Kanıt Dosyası",
      description: "Tüm adımlar bittiğinde, dijital olarak mühürlenmiş ve SHA-256 hash kodu ile imzalanmış 'Teyitli Bilgi Raporu'nuzu PDF olarak indirin. Bu rapor yasal delil niteliğindedir.",
      Icon: CheckCircle2,
      color: "from-emerald-500/20 to-emerald-500/5",
      iconColor: "text-emerald-400"
    }
  ];

  return (
    <main className="min-h-screen relative bg-[#0a0a0c] selection:bg-primary/30">
      <Navbar />
      <ShopierModal isOpen={isShopierOpen} onClose={() => setIsShopierOpen(false)} />

      <section className="container mx-auto px-6 pt-36 pb-32">
        {/* Header Section */}
        <div className="text-center mb-24 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.3em]">
            <Rocket className="w-3 h-3" />
            Operasyonel Yol Haritası
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-none uppercase">
            SİSTEM <span className="premium-gradient">NASIL</span><br />
            <span className="text-white">ÇALIŞIR?</span>
          </h1>
          <p className="text-white/30 text-lg max-w-2xl mx-auto font-medium uppercase text-[11px] tracking-widest leading-relaxed italic">
            Platformu en yüksek verimle kullanmanız için tasarlanmış 4 adımlı standart protokol.
          </p>
        </div>

        {/* Timeline Items */}
        <div className="max-w-5xl mx-auto space-y-12 relative">
           {/* Connecting Line (Desktop) */}
           <div className="absolute left-[31px] top-10 bottom-10 w-px bg-gradient-to-b from-primary/20 via-white/5 to-primary/20 hidden md:block" />

           {steps.map((step, idx) => (
             <div 
              key={idx} 
              className="relative group animate-in slide-in-from-bottom-12 duration-1000"
              style={{ animationDelay: `${idx * 150}ms` }}
             >
                <div className={`glass-card p-1 items-start flex flex-col md:flex-row gap-8 bg-gradient-to-br ${step.color} border-white/5 hover:border-white/10 transition-all duration-500 hover:shadow-3xl hover:shadow-primary/5`}>
                   
                   {/* Number and Icon Column */}
                   <div className="flex md:flex-col items-center gap-4 p-8 md:p-10 border-r border-white/5 bg-white/[0.02]">
                      <div className="text-4xl font-black text-white/10 group-hover:text-primary transition-colors duration-500">{step.number}</div>
                      <div className={`w-20 h-20 rounded-[2rem] bg-black/40 border border-white/5 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500`}>
                         <step.Icon className={`w-10 h-10 ${step.iconColor}`} />
                      </div>
                   </div>

                   {/* Content Column */}
                   <div className="flex-1 p-8 md:p-12 space-y-6">
                      <div className="space-y-2">
                         <div className={`text-[10px] font-black uppercase tracking-widest ${step.iconColor}`}>{step.subtitle}</div>
                         <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight">{step.title}</h2>
                      </div>
                      <p className="text-white/40 text-lg font-medium leading-relaxed max-w-2xl italic">
                         {step.description}
                      </p>
                      {step.action && (
                        <button 
                          onClick={step.action}
                          className="px-8 py-4 bg-white text-black font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-primary transition-all flex items-center gap-3 active:scale-95"
                        >
                          HEMEN BAŞLAT <ChevronRight className="w-4 h-4" />
                        </button>
                      )}
                   </div>
                </div>
             </div>
           ))}
        </div>

        {/* Closing Security Card */}
        <div className="mt-24 max-w-5xl mx-auto">
           <div className="glass-card p-12 bg-emerald-500/5 border-emerald-500/10 flex flex-col md:flex-row items-center gap-10 text-center md:text-left overflow-hidden relative group">
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-[100px] group-hover:bg-emerald-500/20 transition-all duration-1000" />
              <div className="w-20 h-20 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0 animate-pulse">
                 <Lock className="w-10 h-10 text-emerald-400" />
              </div>
              <div className="space-y-4 relative z-10">
                 <h4 className="text-xl font-black text-white uppercase tracking-widest">KUSURSUZ VERİ MAHREMİYETİ</h4>
                 <p className="text-white/40 text-lg font-bold leading-relaxed uppercase text-[11px] tracking-widest">
                    HİÇBİR BELGE VEYA KİŞİSEL VERİ KALICI VERİTABANINA KAYDEDİLMEZ. İŞLEM TAMAMLANDIKTAN VEYA 24 SAAT GEÇTİKTEN SONRA TÜM DİJİTAL İZLERİNİZ OTOMATİK OLARAK SİLİNİR.
                 </p>
              </div>
              <div className="p-4 bg-black/40 border border-white/10 rounded-[2rem] flex items-center gap-3">
                 <ShieldCheck className="w-6 h-6 text-primary" />
                 <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">RAM-ONLY STORAGE</span>
              </div>
           </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 bg-[#0a0a0c] text-center">
        <div className="container mx-auto px-6 flex flex-col items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
              <span className="text-white font-bold text-[10px]">TB</span>
            </div>
            <span className="text-sm font-bold tracking-tight text-white">TrustBridge</span>
          </div>
          <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.3em]">
            © 2026 TrustBridge — Dijital Mühürleme Protokolü.
          </p>
        </div>
      </footer>
    </main>
  );
}
