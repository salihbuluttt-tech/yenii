"use client";

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { 
  Shield, 
  Lock, 
  FileCheck, 
  MapPin, 
  Gavel, 
  TrendingUp, 
  HelpCircle, 
  CheckCircle2, 
  ArrowRight,
  Database,
  EyeOff,
  Clock,
  ChevronRight,
  Construction
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const mainServices = [
    { 
      id: 'yetki', 
      title: 'Dijital Yetkilendirme', 
      desc: 'Mülk sahibi ve danışman arasında güvenli yetki sözleşmesi.', 
      icon: Gavel, 
      btn: 'BAŞLAT',
      href: '/services/yetki'
    },
    { 
      id: 'yer-gosterme', 
      title: 'Yer Gösterme', 
      desc: 'Yasal uyumlu, dijital imzalı taşınmaz gösterme formu.', 
      icon: MapPin, 
      btn: 'OLUŞTUR',
      href: '/services/yer-gosterme'
    },
    { 
      id: 'nda', 
      title: 'Karşılıklı Mutabakat (NDA)', 
      desc: 'Alıcı ve Satıcı danışmanları arasında güvenli eşleşme.', 
      icon: Shield, 
      btn: 'BAŞLAT',
      href: '/services/nda'
    },
    { 
      id: 'dogrulama', 
      title: 'Tek Taraflı Onay (Analiz)', 
      desc: 'Sadece kendi belgenizi yükleyerek teyitli form oluşturun.', 
      icon: FileCheck, 
      btn: 'OLUŞTUR',
      href: '/services/dogrulama'
    }
  ];

  return (
    <main className="min-h-screen bg-[#0a0a1a] selection:bg-indigo-500/30 text-white font-sans overflow-x-hidden">
      <Navbar />
      
      <div className="container mx-auto px-6 lg:px-20 pt-44 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* LEFT COLUMN: BRAND & SECURITY */}
          <div className="space-y-12 animate-in fade-in slide-in-from-left-8 duration-1000">
            <div className="space-y-6">
              <span className="px-5 py-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-[0.4em] rounded-full inline-flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></div>
                SİSTEM ONLİNE
              </span>
              <div className="space-y-2">
                <h1 className="text-7xl lg:text-9xl font-black tracking-tighter italic">fidorax</h1>
                <h2 className="text-4xl lg:text-5xl font-black text-indigo-500 tracking-tighter italic leading-none">TrustBridge</h2>
              </div>
              <p className="text-lg lg:text-xl text-white/40 font-medium max-w-lg leading-relaxed">
                Emlak sektöründe <span className="text-white font-bold">güven krizini</span> bitiren yapay zeka destekli mutabakat platformu.
              </p>
            </div>

            <button className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl flex items-center gap-3 transition-all group">
              <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center">
                <HelpCircle className="w-4 h-4 text-white" />
              </div>
              <span className="text-xs font-black uppercase tracking-widest italic group-hover:text-indigo-400 transition-all">Nasıl Çalışır?</span>
            </button>

            {/* SECURITY BOX */}
            <div className="glass-card p-10 bg-black/40 border-white/5 rounded-[2.5rem] space-y-8 relative overflow-hidden group shadow-3xl">
              <div className="absolute top-0 right-0 p-12 opacity-5 -rotate-12">
                <Shield className="w-40 h-40" />
              </div>
              <div className="flex items-center gap-4 relative z-10">
                <div className="p-3 bg-red-500/10 rounded-xl border border-red-500/20">
                  <Shield className="w-6 h-6 text-red-500" />
                </div>
                <h3 className="text-sm font-black uppercase tracking-widest italic text-white/80">TrustBridge AI Güvenlik Protokolü</h3>
              </div>
              <ul className="space-y-4 text-[11px] font-medium text-white/30 tracking-wide relative z-10 font-black">
                {[
                  { label: "Uçtan Uca Şifreleme", desc: "Verileriniz 256-bit SSL ile korunur." },
                  { label: "Güvenli Erişim Kontrolü", desc: "Firebase Auth ile yetkisiz erişim imkansızdır." },
                  { label: "Gizlilik Odaklı Depolama", desc: "Verileriniz asla üçüncü taraflarla paylaşılmaz." },
                  { label: "Anlık İmha", desc: "Süre dolduğunda veri geri döndürülemez şekilde silinir." }
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 group/item">
                    <CheckCircle2 className="w-4 h-4 text-indigo-500 group-hover/item:scale-110 transition-transform" />
                    <div>
                      <span className="text-white/70 block uppercase tracking-tighter italic">{item.label}:</span>
                      <span className="italic">{item.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* RIGHT COLUMN: SERVICES CARD */}
          <div className="animate-in fade-in slide-in-from-right-8 duration-1000">
            <div className="bg-white rounded-[3.5rem] p-12 lg:p-16 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] flex flex-col gap-10">
              
              {/* SERVICES GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-100 border border-gray-100 rounded-[2.5rem] overflow-hidden">
                {mainServices.map((service, idx) => (
                  <div key={idx} className="bg-white p-10 space-y-8 hover:bg-gray-50/50 transition-all flex flex-col items-center text-center">
                    <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center">
                      <service.icon className="w-7 h-7 text-indigo-600" />
                    </div>
                    <div className="space-y-3">
                      <h4 className="text-lg font-black text-gray-900 uppercase italic tracking-tighter">{service.title}</h4>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-relaxed px-4">{service.desc}</p>
                    </div>
                    <button 
                      onClick={() => router.push(service.href)}
                      className="w-full py-4 bg-[#2b2d6a] text-white font-black text-[10px] uppercase tracking-[0.3em] rounded-xl hover:bg-indigo-600 transition-all shadow-xl active:scale-95"
                    >
                      {service.btn}
                    </button>
                  </div>
                ))}
              </div>

              {/* WIDE BOTTOM SERVICE (Ihale) */}
              <div 
                onClick={() => router.push('/services/ihale')}
                className="p-8 bg-gray-50/50 border border-gray-100 rounded-[2rem] flex flex-col md:flex-row items-center justify-between gap-6 cursor-pointer group hover:border-indigo-200 transition-all"
              >
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center">
                    <Construction className="w-6 h-6 text-indigo-600 group-hover:rotate-12 transition-transform" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-black text-gray-900 uppercase italic">Proje Analizi & İhale Paneli</h4>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest italic">Yapay zeka destekli teknik teklif ve ihale analiz motoru.</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                   <span className="px-3 py-1 bg-indigo-100 text-indigo-600 text-[8px] font-black uppercase rounded-lg">AKTİF</span>
                   <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-indigo-600 transition-all" />
                </div>
              </div>

              {/* CODE ENTRY SECTION */}
              <div className="pt-8 border-t border-gray-100 space-y-6">
                 <div className="flex items-center justify-center gap-4">
                    <div className="h-px flex-1 bg-gray-100"></div>
                    <span className="text-[10px] font-black text-gray-300 uppercase tracking-[0.4em] italic">MEVCUT KOD İLE GİRİŞ</span>
                    <div className="h-px flex-1 bg-gray-100"></div>
                 </div>
                 <div className="flex gap-4">
                    <div className="flex-1 relative group">
                       <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 font-bold text-lg">#</span>
                       <input type="text" placeholder="DAVET KODU VEYA ERİŞİM KODU" className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-6 pl-12 text-[10px] font-black uppercase tracking-widest text-gray-900 outline-none focus:border-indigo-300 transition-all shadow-inner" />
                    </div>
                    <button className="px-10 bg-[#1e2330] text-white font-black text-[12px] uppercase tracking-[0.2em] rounded-2xl hover:bg-indigo-600 transition-all shadow-xl active:scale-95">GİRİŞ YAP</button>
                 </div>
              </div>

            </div>
          </div>

        </div>
      </div>
      
      {/* BACKGROUND EFFECTS */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
         <div className="absolute top-[20%] -left-[10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[150px] rounded-full"></div>
         <div className="absolute bottom-[20%] -right-[10%] w-[30%] h-[30%] bg-indigo-900/10 blur-[100px] rounded-full"></div>
      </div>

    </main>
  );
}
