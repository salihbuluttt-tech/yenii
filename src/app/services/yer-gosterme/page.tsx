"use client";

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { 
  MapPin, 
  Shield, 
  CheckCircle2, 
  Loader2, 
  Navigation, 
  Send, 
  Smartphone, 
  Copy, 
  MessageCircle, 
  UserPlus, 
  FileText, 
  CheckCheck, 
  Download,
  AlertCircle,
  Clock,
  ChevronRight,
  ArrowLeft,
  RotateCcw
} from 'lucide-react';
import { useRouter } from 'next/navigation';

type Role = 'EMLAKCI' | 'MUSTERI';

export default function YerGostermePage() {
  const router = useRouter();
  const [step, setStep] = useState(1); 
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [role, setRole] = useState<Role>('EMLAKCI');
  const [inviteCode, setInviteCode] = useState('');
  const [completed, setCompleted] = useState(false);

  // Info States
  const [agentName, setAgentName] = useState('');
  const [agentOffice, setAgentOffice] = useState('');
  const [customerName, setCustomerName] = useState('');

  useEffect(() => {
    setMounted(true);
    setInviteCode('TR-' + Math.random().toString(36).substring(2, 7).toUpperCase());
    
    // Oturum Kontrolü
    const saved = localStorage.getItem('tb_session_yer_gosterme');
    if (saved) {
      const session = JSON.parse(saved);
      setStep(session.step);
      setCompleted(session.completed || false);
      setAgentName(session.agentName || '');
      setAgentOffice(session.agentOffice || '');
      setCustomerName(session.customerName || '');
    }
  }, []);

  const updateSession = (newStep: number, isDone: boolean = false) => {
    setStep(newStep);
    setCompleted(isDone);
    localStorage.setItem('tb_session_yer_gosterme', JSON.stringify({ 
      step: newStep, 
      completed: isDone,
      agentName,
      agentOffice,
      customerName
    }));
  };

  const clearSession = () => {
    if (confirm("Bu işlem mühürlerini ve verileri silmek istediğinize emin misiniz?")) {
      localStorage.removeItem('tb_session_yer_gosterme');
      window.location.reload();
    }
  };

  if (!mounted) return null;

  const handleNext = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      updateSession(step + 1);
    }, 1500);
  };

  const finalizeProtokol = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      updateSession(step, true);
    }, 2500);
  };

  return (
    <main className="min-h-screen bg-[#070709] selection:bg-primary/30 text-white">
      <Navbar />
      
      <div className="container mx-auto px-6 pt-32 pb-24">
        <div className="max-w-4xl mx-auto space-y-12">
          
          {/* Action Bar */}
          <div className="flex items-center justify-between">
             <button 
              onClick={() => router.push('/')}
              className="flex items-center gap-2 text-[10px] font-black text-white/40 hover:text-amber-500 transition-all uppercase tracking-[0.3em] group"
             >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> ANA SAYFAYA DÖN
             </button>
             
             {step > 1 && !completed && (
                <button 
                  onClick={clearSession}
                  className="flex items-center gap-2 text-[9px] font-black text-rose-500/40 hover:text-rose-500 transition-all uppercase tracking-[0.3em]"
                >
                   <RotateCcw className="w-3 h-3" /> OTURUMU SIFIRLA
                </button>
             )}
          </div>

          {!completed ? (
            <div className="space-y-12">
               {/* Timeline Header */}
               <div className="flex items-center justify-between text-[9px] font-black uppercase tracking-[0.4em] text-white/20">
                  <div className="flex items-center gap-2">
                     <span className={step >= 1 ? 'text-amber-500' : ''}>KOD_ERİŞİM</span>
                     <ChevronRight className="w-3 h-3" />
                     <span className={step >= 2 ? 'text-amber-500' : ''}>EMLAKÇI_KİMLİK</span>
                     <ChevronRight className="w-3 h-3" />
                     <span className={step >= 4 ? 'text-amber-500' : ''}>MÜŞTERİ_TEYİT</span>
                     <ChevronRight className="w-3 h-3" />
                     <span className={step >= 5 ? 'text-amber-500' : ''}>RESMİ_MÜHÜR_OK</span>
                  </div>
               </div>

               {/* Step 1: Emlakçı Kod Girişi */}
               {step === 1 && (
                 <div className="glass-card p-12 bg-white/[0.02] border-white/5 text-center space-y-10 animate-in fade-in duration-700">
                    <div className="w-20 h-20 rounded-[2.5rem] bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mx-auto shadow-3xl shadow-amber-500/10">
                       <Smartphone className="w-10 h-10 text-amber-400" />
                    </div>
                    <div className="space-y-4">
                       <h2 className="text-4xl font-black text-white uppercase italic">Erişim <span className="text-amber-400">Anahtarı</span></h2>
                       <p className="text-[10px] text-white/20 font-black uppercase tracking-[0.3em] max-w-sm mx-auto leading-relaxed">Yer Gösterme modülünü aktif etmek için işlem kodunuzu girin.</p>
                    </div>
                    <div className="max-w-xs mx-auto space-y-6">
                       <input type="text" placeholder="TB-XXXX-X" className="w-full bg-black/40 border border-white/10 rounded-2xl p-5 text-center text-xl font-black tracking-widest outline-none focus:border-amber-400/50" />
                       <button onClick={handleNext} className="w-full py-5 bg-amber-500 text-black font-black text-[12px] uppercase tracking-[0.3em] rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-2xl">KODU DOĞRULA</button>
                    </div>
                 </div>
               )}

               {/* Step 2: Emlakçı Bilgileri */}
               {step === 2 && (
                 <div className="glass-card p-12 bg-white/[0.02] border-white/5 space-y-10 animate-in slide-in-from-right-8 duration-700">
                    <div className="flex items-center gap-6 pb-6 border-b border-white/5 font-black uppercase tracking-widest text-[12px]">
                       <div className="w-10 h-10 rounded-2xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20 text-amber-500"><MapPin className="w-5 h-5" /></div>
                       PORTFÖY YETKİLİSİ KİMLİK TANIMLAMA
                    </div>
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-8" onSubmit={(e) => {e.preventDefault(); handleNext();}}>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-white/40 uppercase tracking-widest pl-1">EMLAK OFİSİ ÜNVANI</label>
                          <input required value={agentOffice} onChange={(e) => setAgentOffice(e.target.value)} type="text" placeholder="TrustBridge Gayrimenkul A.Ş." className="w-full bg-black/40 border border-white/10 rounded-2xl p-5 text-sm font-bold outline-none focus:border-amber-500/40" />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-white/40 uppercase tracking-widest pl-1">AD SOYAD</label>
                          <input required value={agentName} onChange={(e) => setAgentName(e.target.value)} type="text" placeholder="Salih Bulut" className="w-full bg-black/40 border border-white/10 rounded-2xl p-5 text-sm font-bold outline-none focus:border-amber-400/40" />
                       </div>
                       <div className="md:col-span-2 pt-6">
                          <button type="submit" className="w-full py-6 bg-white text-black font-black text-[12px] uppercase tracking-[0.3em] rounded-2xl hover:bg-amber-500 transition-all flex items-center justify-center gap-4">BİLGİLERİ MÜHÜRLE <ChevronRight className="w-4 h-4" /></button>
                       </div>
                    </form>
                 </div>
               )}

               {/* Step 3: Davet Paneli */}
               {step === 3 && (
                 <div className="glass-card p-12 bg-white/[0.02] border-amber-500/10 space-y-12 text-center animate-in zoom-in-95 duration-700">
                    <div className="space-y-4">
                       <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter">MÜŞTERİ <span className="text-amber-500 italic uppercase underline underline-offset-8">DAVET_MASASI</span></h3>
                       <p className="text-[10px] text-white/30 font-black uppercase tracking-[0.4em]">Aşağıdaki kodu müşterinize ileterek "Dijital Masa"yı oluşturun.</p>
                    </div>
                    <div className="p-10 bg-black/60 border border-white/5 rounded-[3rem] space-y-8 relative overflow-hidden group">
                       <div className="absolute inset-0 bg-amber-500/5 blur-3xl opacity-0 group-hover:opacity-100 transition-duration-1000"></div>
                       <div className="text-5xl font-mono font-black text-amber-500 tracking-[0.4em] relative z-10">{inviteCode}</div>
                       <div className="flex flex-col md:flex-row gap-4 justify-center relative z-10">
                          <button onClick={() => alert("Kod Kopyalandı!")} className="px-8 py-5 bg-white/5 border border-white/5 text-white font-black text-[10px] uppercase tracking-widest rounded-2xl flex items-center justify-center gap-3 active:scale-95 transition-all"><Copy className="w-4 h-4" /> KOPYALA</button>
                          <button className="px-8 py-5 bg-emerald-500 text-black font-black text-[10px] uppercase tracking-widest rounded-2xl flex items-center justify-center gap-3 hover:bg-emerald-400 hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-emerald-500/20"><MessageCircle className="w-5 h-5" /> WHATSAPP GÖNDER</button>
                       </div>
                    </div>
                    <div className="pt-8 border-t border-white/5 flex flex-col items-center space-y-6">
                       <div className="flex items-center gap-3 animate-pulse">
                          <Loader2 className="w-4 h-4 text-amber-500 animate-spin" />
                          <span className="text-[9px] font-black text-white/40 uppercase tracking-[0.3em]">MÜŞTERİ BAĞLANTISI BEKLENİYOR...</span>
                       </div>
                       <button onClick={() => {setRole('MUSTERI'); handleNext();}} className="text-[9px] text-amber-500/40 font-bold hover:text-amber-500 transition-all uppercase tracking-widest underline underline-offset-4">MÜŞTERİ EKRANINA GEÇ (DRAFT)</button>
                    </div>
                 </div>
               )}

               {/* Step 4: Müşteri Bilgileri */}
               {step === 4 && (
                  <div className="glass-card p-12 bg-white/[0.02] border-white/5 space-y-10 animate-in slide-in-from-left-8 duration-700 text-center md:text-left">
                    <div className="flex items-center gap-6 pb-6 border-b border-white/5 font-black uppercase tracking-widest text-[12px]">
                       <div className="w-10 h-10 rounded-2xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20 text-amber-500"><UserPlus className="w-5 h-5" /></div>
                       ALICI KİMLİK DOĞRULAMA
                    </div>
                    <form className="space-y-8" onSubmit={(e) => {e.preventDefault(); handleNext();}}>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-black uppercase tracking-widest">
                          <input required value={customerName} onChange={(e) => setCustomerName(e.target.value)} type="text" placeholder="Müşteri Ad Soyad" className="w-full bg-black/40 border border-white/10 rounded-2xl p-5 text-sm font-bold outline-none focus:border-amber-500/40 shadow-inner" />
                          <input required type="text" placeholder="TC KİMLİK NO" className="w-full bg-black/40 border border-white/10 rounded-2xl p-5 text-sm font-bold outline-none focus:border-amber-500/40 shadow-inner" />
                       </div>
                       <button type="submit" className="w-full py-6 bg-amber-500 text-black font-black text-[12px] uppercase tracking-[0.3em] rounded-2xl hover:scale-[1.02] transition-all">VERİLERİMİ MASAYA EKLE</button>
                    </form>
                  </div>
               )}

               {/* Step 5: Onay */}
               {step === 5 && (
                  <div className="space-y-8 animate-in zoom-in-95 duration-700">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border border-white/10 rounded-[3rem] overflow-hidden">
                        <div className="p-12 space-y-8 bg-black/40 relative">
                           <h4 className="text-[10px] font-black text-amber-500 uppercase tracking-widest flex items-center gap-4"><CheckCircle2 className="w-4 h-4" /> EMLAK İŞLETMESİ</h4>
                           <div className="space-y-6">
                              <div className="text-[9px] text-white/20 uppercase font-black">YETKİLİ: {agentName}</div>
                              <div className="text-sm font-black uppercase italic">{agentOffice}</div>
                           </div>
                        </div>
                        <div className="p-12 space-y-8 bg-black/60 relative">
                           <h4 className="text-[10px] font-black text-emerald-500 uppercase tracking-widest flex items-center gap-4"><CheckCircle2 className="w-4 h-4" /> MÜŞTERİ (ALICI)</h4>
                           <div className="space-y-6">
                              <div className="text-[9px] text-white/20 uppercase font-black">ALICI: {customerName}</div>
                              <div className="text-sm font-black uppercase italic text-emerald-500">KİMLİK_ONAYLI_OK</div>
                           </div>
                        </div>
                     </div>
                     <button onClick={finalizeProtokol} className="w-full py-8 bg-emerald-500 text-black font-black text-[14px] uppercase tracking-[0.4em] rounded-[2.5rem] shadow-3xl hover:bg-white transition-all flex items-center justify-center gap-4">{loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <><CheckCheck className="w-6 h-6" /> PROTOKOLÜ RESMİLEŞTİR</>}</button>
                  </div>
               )}
            </div>
          ) : (
            <div className="glass-card p-16 text-center space-y-12 border-emerald-500/20 bg-emerald-500/5 animate-in zoom-in-95 duration-700 shadow-3xl">
               <div className="w-24 h-24 rounded-[3rem] bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto relative shadow-2xl">
                  <div className="absolute inset-0 bg-emerald-500/20 blur-3xl"></div>
                  <FileText className="w-12 h-12 text-emerald-400 relative z-10" />
               </div>
               <div className="space-y-4">
                  <h2 className="text-5xl font-black text-white uppercase italic tracking-tighter leading-none">İŞLEM <br/> <span className="text-emerald-400 italic">MÜHÜRLENDİ</span></h2>
                  <p className="text-[9px] text-white/30 font-black uppercase tracking-[0.4em] italic leading-relaxed">Yer Gösterme Tutanağı Hukuki Delil Olarak Arşivlendi.</p>
               </div>
               <div className="max-w-md mx-auto space-y-4">
                  <button className="w-full flex items-center justify-between p-7 bg-white text-black font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl hover:bg-emerald-500 transition-all group shadow-2xl">
                     <div className="flex items-center gap-4">
                        <Download className="w-5 h-5" />
                        RESMI_YER_GOSTERME_TUTANAGI.pdf
                     </div>
                     <span className="text-[8px] opacity-20 group-hover:opacity-100 font-black italic uppercase">Mühürlü_Belge</span>
                  </button>
                  <button onClick={clearSession} className="w-full py-5 bg-white/5 text-white/20 font-black text-[9px] uppercase tracking-[0.3em] rounded-2xl hover:bg-white/10 transition-all border border-white/5">YENİ PROTOKOL BAŞLAT</button>
               </div>
            </div>
          )}

        </div>
      </div>
    </main>
  );
}
