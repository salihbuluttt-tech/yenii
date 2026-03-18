"use client";

import React, { useState } from 'react';
import { Shield, Lock, CreditCard, ExternalLink, ChevronRight, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

interface ServiceGateProps {
  serviceName: string;
  onSuccess: () => void;
}

export const ServiceGate: React.FC<ServiceGateProps> = ({ serviceName, onSuccess }) => {
  const [view, setView] = useState<'LOGIN' | 'PACKAGES' | 'PAYMENT' | 'VERIFY'>('LOGIN');
  const [loading, setLoading] = useState(false);
  const [packageUrl, setPackageUrl] = useState('');
  const [orderId, setOrderId] = useState('');
  const [selectedPkg, setSelectedPkg] = useState('');

  const packages = [
    { name: 'SAATLİK PROTOKOL', price: '100 TL', url: 'https://www.shopier.com/fidorax/44846416', desc: 'Sadece 1 saat geçerli tekil işlem kodu.' },
    { name: 'AYLIK PROFESYONEL', price: '1250 TL', url: 'https://www.shopier.com/fidorax/44846597', desc: '30 gün sınırsız kullanım ve mühürleme.' },
    { name: 'YILLIK KURUMSAL', price: '3250 TL', url: 'https://www.shopier.com/fidorax/44846604', desc: '365 gün tüm hizmetlerde sınırsız yetki.' }
  ];

  const handlePackageSelect = (url: string, name: string) => {
    setPackageUrl(url);
    setSelectedPkg(name);
    setView('PAYMENT');
  };

  const handleVerify = () => {
    setLoading(true);
    // Simüle edilen doğrulama (Burada Firebase'e manuel teyit bildirimi düşecek)
    setTimeout(() => {
      setLoading(false);
      onSuccess();
    }, 2000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto animate-in fade-in zoom-in-95 duration-700">
      
      {/* 1. KOD GİRİŞ EKRANI */}
      {view === 'LOGIN' && (
        <div className="glass-card p-12 bg-white/[0.02] border-white/5 text-center space-y-10 shadow-3xl">
           <div className="w-20 h-20 rounded-[2.5rem] bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto">
              <Lock className="w-10 h-10 text-primary" />
           </div>
           <div className="space-y-4">
              <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter leading-none italic">{serviceName} <br/><span className="text-primary italic">PROTOKOL_ERİŞİMİ</span></h2>
              <p className="text-[10px] text-white/30 font-black uppercase tracking-[0.4em]">Hizmeti aktif etmek için 24 saatlik geçerli anahtarınızı girin.</p>
           </div>
           <div className="max-w-xs mx-auto space-y-6">
              <input type="text" placeholder="TB-XXXX-X" className="w-full bg-black/40 border border-white/10 rounded-2xl p-5 text-center text-xl font-black tracking-[0.3em] outline-none focus:border-primary/50" />
              <button onClick={() => handleVerify()} className="w-full py-5 bg-white text-black font-black text-[12px] uppercase tracking-[0.4em] rounded-2xl hover:bg-primary transition-all">SİSTEME GİRİŞ YAP</button>
              <div className="flex flex-col items-center gap-3">
                 <p className="text-[9px] text-white/20 font-bold uppercase tracking-widest">KODUNUZ YOK MU?</p>
                 <button onClick={() => setView('PACKAGES')} className="text-[11px] text-primary font-black uppercase tracking-[0.2em] underline underline-offset-8 decoration-2 hover:text-white transition-all italic">PROTOKOL ANAHTARI SATIN AL</button>
              </div>
           </div>
        </div>
      )}

      {/* 2. PAKET SEÇİM EKRANI */}
      {view === 'PACKAGES' && (
        <div className="space-y-10 animate-in slide-in-from-right-8 duration-700">
           <div className="text-center space-y-2">
              <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter">PROTOKOL <span className="text-primary">PAKETLERİ</span></h3>
              <p className="text-[10px] text-white/20 font-black uppercase tracking-[0.4em]">İhiyacınız olan kullanım süresini seçin.</p>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {packages.map((pkg, idx) => (
                <button 
                  key={idx} 
                  onClick={() => handlePackageSelect(pkg.url, pkg.name)}
                  className="glass-card p-10 bg-white/[0.02] border-white/5 hover:border-primary/40 hover:bg-primary/5 transition-all text-center space-y-6 group"
                >
                   <div className="text-2xl font-black text-primary italic">{pkg.price}</div>
                   <div className="space-y-2">
                      <div className="text-[11px] font-black text-white uppercase tracking-widest leading-none">{pkg.name}</div>
                      <p className="text-[9px] text-white/20 font-bold uppercase tracking-widest leading-relaxed">({pkg.desc})</p>
                   </div>
                   <div className="w-full py-4 bg-white/5 rounded-xl border border-white/5 text-[9px] font-black uppercase tracking-widest group-hover:bg-primary group-hover:text-black transition-all italic">SEÇ VE ÖDE</div>
                </button>
              ))}
           </div>
           <button onClick={() => setView('LOGIN')} className="w-full py-4 text-[9px] font-black text-white/20 uppercase tracking-[0.4em] hover:text-white transition-all underline">GERİ DÖN</button>
        </div>
      )}

      {/* 3. SHOPIER ÖDEME VE TEYİT EKRANI */}
      {view === 'PAYMENT' && (
        <div className="space-y-8 animate-in zoom-in-95 duration-700">
           <div className="glass-card p-4 bg-black border-white/10 rounded-[2.5rem] overflow-hidden relative shadow-3xl">
              <div className="bg-[#f0f0f0] rounded-[2rem] h-[600px] relative overflow-hidden flex flex-col items-center justify-center">
                 {/* Simulated Shopier Iframe Area */}
                 <div className="absolute inset-0 bg-white flex flex-col items-center justify-center text-black space-y-6">
                    <img src="https://www.shopier.com/assets/img/logo.png" className="w-32" alt="Shopier" />
                    <div className="text-center space-y-2">
                       <h4 className="text-xl font-bold italic tracking-tight uppercase">Güvenli Ödeme Ekranı</h4>
                       <p className="text-xs text-gray-400 font-medium">Paket: {selectedPkg}</p>
                    </div>
                    <div className="w-full max-w-xs h-1 bg-gray-100 rounded-full relative overflow-hidden">
                       <div className="absolute inset-0 bg-indigo-600 animate-progress"></div>
                    </div>
                    <p className="text-[10px] text-gray-400 uppercase font-black animate-pulse italic">Shopier ile Güvenli Bağlantı Kuruldu...</p>
                 </div>
                 {/* Real Shopier Frame (Placeholder for real implementation) */}
                 {/* <iframe src={packageUrl} className="w-full h-full border-none" /> */}
              </div>
           </div>

           {/* MANUEL TEYİT ALANI (Kullanıcı tarafından istenir) */}
           <div className="glass-card p-10 bg-primary/5 border border-primary/20 space-y-8 shadow-3xl">
              <div className="flex items-center gap-4 border-b border-primary/20 pb-4">
                 <CreditCard className="w-5 h-5 text-primary" />
                 <h4 className="text-[12px] font-black text-white uppercase tracking-widest">ÖDEME TEYİT VE DOĞRULAMA</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end font-black uppercase tracking-widest">
                 <div className="space-y-3">
                    <label className="text-[9px] text-white/40 pl-1 italic">SHOPIER ÖDEME KODU / SİPARİŞ NO</label>
                    <input value={orderId} onChange={(e) => setOrderId(e.target.value)} type="text" placeholder="Örn: 291044..." className="w-full bg-black/60 border border-white/10 rounded-2xl p-4 text-sm font-bold text-primary outline-none focus:border-primary/50" />
                 </div>
                 <button 
                  onClick={() => setView('VERIFY')} 
                  disabled={!orderId}
                  className="py-4 bg-primary text-black font-black text-[11px] uppercase tracking-[0.2em] rounded-2xl hover:bg-white transition-all disabled:opacity-30 flex items-center justify-center gap-3 active:scale-95"
                 >
                   ÖDEMEYİ SİSTEME BİLDİR <ChevronRight className="w-4 h-4" />
                 </button>
              </div>
              <p className="text-[8px] text-white/20 font-black italic uppercase text-center tracking-widest">ÖDEMENİZ ONAYLANDIKTAN SONRA ANAHTAR KODUNUZ 5 SANİYE İÇİNDE AKTİF OLACAKTIR.</p>
           </div>
        </div>
      )}

      {/* 4. DOĞRULAMA BEKLEME EKRANI */}
      {view === 'VERIFY' && (
        <div className="glass-card p-20 bg-black border-emerald-500/20 text-center space-y-12 animate-in zoom-in-95 duration-700 shadow-3xl">
           <div className="relative">
              <div className="w-24 h-24 rounded-[3rem] bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto shadow-2xl relative">
                 <Loader2 className="w-12 h-12 text-emerald-400 animate-spin" />
              </div>
              <div className="absolute inset-0 bg-emerald-500/20 blur-3xl animate-pulse"></div>
           </div>
           
           <div className="space-y-4">
              <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter italic leading-none">ÖDEME <span className="text-emerald-400 italic">KONTROLÜ</span></h3>
              <p className="text-[10px] text-white/40 font-black uppercase tracking-[0.3em] max-w-sm mx-auto italic">Shopier {orderId} nolu işlem veritabanında sorgulanıyor. Lütfen sayfayı kapatmayın.</p>
           </div>

           <div className="flex flex-col items-center gap-4">
              <div className="w-48 h-1 bg-white/5 rounded-full relative overflow-hidden">
                 <div className="absolute inset-0 bg-emerald-500 animate-progress-fast"></div>
              </div>
              <button onClick={() => onSuccess()} className="text-[9px] text-emerald-500/40 font-bold hover:text-emerald-400 uppercase tracking-widest underline animate-pulse">SORGULAMAYI BEKLEMEDEN GEÇ (TEST İÇİN)</button>
           </div>
        </div>
      )}

    </div>
  );
};
