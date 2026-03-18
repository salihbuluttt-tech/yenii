"use client";

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { 
  FileText, 
  Shield, 
  CheckCircle2, 
  Loader2, 
  Download, 
  Sparkles, 
  Lock, 
  Scale, 
  Users, 
  AlertTriangle,
  FileCheck,
  Building,
  ChevronRight,
  ArrowLeft,
  RotateCcw
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function NDAPage() {
  const router = useRouter();
  const [step, setStep] = useState(1); 
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [completed, setCompleted] = useState(false);
  
  // Data States
  const [ndaTitle, setNdaTitle] = useState('');
  const [ndaContent, setNdaContent] = useState('');
  const [partyA, setPartyA] = useState({ name: '', id: '', address: '' });
  const [partyB, setPartyB] = useState({ name: '', id: '', address: '' });

  useEffect(() => {
    setMounted(true);
    // Oturum Kontrolü
    const saved = localStorage.getItem('tb_session_nda');
    if (saved) {
      const session = JSON.parse(saved);
      setStep(session.step);
      setCompleted(session.completed || false);
      setNdaTitle(session.ndaTitle || '');
      setNdaContent(session.ndaContent || '');
      setPartyA(session.partyA || { name: '', id: '', address: '' });
      setPartyB(session.partyB || { name: '', id: '', address: '' });
    }
  }, []);

  const updateSession = (newStep: number, isDone: boolean = false) => {
    setStep(newStep);
    setCompleted(isDone);
    localStorage.setItem('tb_session_nda', JSON.stringify({ 
      step: newStep, 
      completed: isDone,
      ndaTitle,
      ndaContent,
      partyA,
      partyB
    }));
  };

  const clearSession = () => {
    if (confirm("Bu sözleşme taslağını ve verileri silmek istediğinize emin misiniz?")) {
      localStorage.removeItem('tb_session_nda');
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

  const finalizeNDA = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      updateSession(step, true);
    }, 2500);
  };

  return (
    <main className="min-h-screen bg-[#070709] selection:bg-rose-500/30 text-white">
      <Navbar />
      
      <div className="container mx-auto px-6 pt-32 pb-24">
        <div className="max-w-4xl mx-auto space-y-12">
          
          {/* Action Header */}
          <div className="flex items-center justify-between">
             <button 
              onClick={() => router.push('/')}
              className="flex items-center gap-2 text-[10px] font-black text-rose-500/40 hover:text-white transition-all uppercase tracking-[0.3em] group"
             >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> ANA SAYFAYA DÖN
             </button>
             
             {step > 1 && !completed && (
                <button 
                  onClick={clearSession}
                  className="flex items-center gap-2 text-[9px] font-black text-rose-500/40 hover:text-rose-500 transition-all uppercase tracking-[0.3em]"
                >
                   <RotateCcw className="w-3 h-3" /> TASLAĞI SIFIRLA
                </button>
             )}
          </div>

          {!completed ? (
            <div className="space-y-12">
               {/* Timeline Header */}
               <div className="flex items-center justify-between text-[9px] font-black uppercase tracking-[0.4em] text-white/20">
                  <div className="flex items-center gap-2">
                     <span className={step >= 1 ? 'text-rose-400' : ''}>KOD_ERİŞİM</span>
                     <ChevronRight className="w-3 h-3" />
                     <span className={step >= 2 ? 'text-rose-400' : ''}>SÖZLEŞME_KONUSU</span>
                     <ChevronRight className="w-3 h-3" />
                     <span className={step >= 3 ? 'text-rose-400' : ''}>TARAF_BİLGİLERİ</span>
                     <ChevronRight className="w-3 h-3" />
                     <span className={step >= 4 ? 'text-rose-400' : ''}>MÜHÜR_OK</span>
                  </div>
               </div>

               {/* Step 1: Kod Erişimi */}
               {step === 1 && (
                 <div className="glass-card p-12 bg-rose-500/[0.02] border-rose-500/10 text-center space-y-10 animate-in fade-in duration-700 shadow-3xl">
                    <div className="w-20 h-20 rounded-[2.5rem] bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mx-auto shadow-3xl shadow-rose-500/10 relative">
                       <Lock className="w-10 h-10 text-rose-400" />
                    </div>
                    <div className="space-y-4 text-center">
                       <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter leading-none">Sessizlik <br/> <span className="text-rose-500">Protokolü</span></h2>
                       <p className="text-[10px] text-white/20 font-black uppercase tracking-[0.3em] max-w-sm mx-auto">Gizlilik Sözleşmesi (NDA) oluşturmak için geçerli işlem kodunuzu girin.</p>
                    </div>
                    <div className="max-w-xs mx-auto space-y-6">
                       <input type="text" placeholder="TB-XXXX-X" className="w-full bg-black/40 border border-white/10 rounded-2xl p-5 text-center text-xl font-black tracking-widest outline-none focus:border-rose-500/50" />
                       <button onClick={handleNext} className="w-full py-5 bg-rose-500 text-white font-black text-[12px] uppercase tracking-[0.3em] rounded-2xl hover:bg-rose-600 transition-all shadow-2xl">PROTOKOLÜ AKTİF ET</button>
                    </div>
                 </div>
               )}

               {/* Step 2: Konu */}
               {step === 2 && (
                  <div className="glass-card p-12 bg-white/[0.02] border-white/5 space-y-10 animate-in slide-in-from-right-8 duration-700">
                     <div className="flex items-center gap-6 pb-6 border-b border-white/5 font-black uppercase tracking-widest text-[12px]">
                        <div className="w-10 h-10 rounded-2xl bg-rose-500/10 flex items-center justify-center border border-rose-500/20 text-rose-400"><FileText className="w-5 h-5" /></div>
                        SÖZLEŞME KONUSU VE MUHTEVİYATI
                     </div>
                     <form className="space-y-8" onSubmit={(e) => {e.preventDefault(); handleNext();}}>
                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-rose-500/60 uppercase tracking-widest pl-1">SÖZLEŞME BAŞLIĞI</label>
                           <input required value={ndaTitle} onChange={(e) => setNdaTitle(e.target.value)} type="text" placeholder="Örn: X Projesi Teknolojik Veri Aktarımı" className="w-full bg-black/40 border border-white/10 rounded-2xl p-5 text-sm font-bold outline-none focus:border-rose-500/40" />
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-rose-500/60 uppercase tracking-widest pl-1">GİZLİ BİLGİNİN TANIMI (KONU İÇERİĞİ)</label>
                           <textarea required value={ndaContent} onChange={(e) => setNdaContent(e.target.value)} rows={5} placeholder="Korunması istenen ticari sırlar, veriler ve süreçlere dair detaylar..." className="w-full bg-black/40 border border-white/10 rounded-2xl p-5 text-sm font-bold outline-none focus:border-rose-500/40 resize-none font-sans"></textarea>
                        </div>
                        <button type="submit" className="w-full py-6 bg-white text-black font-black text-[12px] uppercase tracking-[0.3em] rounded-2xl hover:bg-rose-500 transition-all flex items-center justify-center gap-4 group">KONUYU MÜHÜRLE VE İLERLE <ChevronRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" /></button>
                     </form>
                  </div>
               )}

               {/* Step 3: Taraflar */}
               {step === 3 && (
                  <div className="space-y-8 animate-in slide-in-from-right-8 duration-700 text-center md:text-left">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="glass-card p-10 bg-white/[0.02] border-white/5 space-y-8">
                           <div className="flex items-center gap-4 text-rose-500 font-black text-[10px] uppercase tracking-widest"><Building className="w-4 h-4" /> BİRİNCİ TARAF (AÇIKLAYAN)</div>
                           <div className="space-y-6">
                              <input type="text" placeholder="Ad Soyad / Firma Ünvanı" value={partyA.name} onChange={(e) => setPartyA({...partyA, name: e.target.value})} className="w-full bg-black/40 border border-white/5 rounded-xl p-4 text-xs font-bold outline-none focus:border-rose-500/20" />
                              <input type="text" placeholder="TC / Vergi No" value={partyA.id} onChange={(e) => setPartyA({...partyA, id: e.target.value})} className="w-full bg-black/40 border border-white/5 rounded-xl p-4 text-xs font-bold outline-none focus:border-rose-500/20" />
                              <textarea placeholder="Yasal Adres" rows={2} value={partyA.address} onChange={(e) => setPartyA({...partyA, address: e.target.value})} className="w-full bg-black/40 border border-white/5 rounded-xl p-4 text-xs font-bold outline-none focus:border-rose-500/20 resize-none"></textarea>
                           </div>
                        </div>
                        <div className="glass-card p-10 bg-white/[0.02] border-white/5 space-y-8 font-black uppercase tracking-widest">
                           <div className="flex items-center gap-4 text-rose-500 font-black text-[10px] uppercase tracking-widest"><Users className="w-4 h-4" /> İKİNCİ TARAF (ALAN)</div>
                           <div className="space-y-6">
                              <input type="text" placeholder="Taraf Ad Soyad" value={partyB.name} onChange={(e) => setPartyB({...partyB, name: e.target.value})} className="w-full bg-black/40 border border-white/5 rounded-xl p-4 text-xs font-bold outline-none focus:border-rose-500/20 shadow-inner" />
                              <input type="text" placeholder="Kimlik/İletişim No" value={partyB.id} onChange={(e) => setPartyB({...partyB, id: e.target.value})} className="w-full bg-black/40 border border-white/5 rounded-xl p-4 text-xs font-bold outline-none focus:border-rose-500/20 shadow-inner" />
                              <textarea placeholder="Yasal Adres" rows={2} value={partyB.address} onChange={(e) => setPartyB({...partyB, address: e.target.value})} className="w-full bg-black/40 border border-white/5 rounded-xl p-4 text-xs font-bold outline-none focus:border-rose-500/20 shadow-inner resize-none"></textarea>
                           </div>
                        </div>
                     </div>
                     <button onClick={handleNext} className="w-full py-6 bg-rose-500 text-white font-black text-[12px] uppercase tracking-[0.4em] rounded-2xl shadow-3xl hover:scale-[1.02] transition-all flex items-center justify-center gap-4 shadow-rose-500/20">TARAF KİMLİKLERİNİ MÜHÜRLE <ChevronRight className="w-4 h-4" /></button>
                  </div>
               )}

               {/* Step 4: Onay */}
               {step === 4 && (
                  <div className="space-y-8 animate-in zoom-in-95 duration-700">
                     <div className="glass-card p-12 bg-black/40 border-white/10 space-y-10 relative">
                        <div className="absolute top-0 right-0 p-12 opacity-5"><Scale className="w-48 h-48" /></div>
                        <div className="space-y-6 relative z-10 font-black uppercase tracking-widest text-center md:text-left">
                           <div className="flex items-center gap-4 text-rose-500 group"><FileCheck className="w-7 h-7" /> <span className="text-2xl italic tracking-tighter">{ndaTitle || 'BAŞLIKSIZ_NDAPRO_OTURUMU'}</span></div>
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8 border-t border-white/5">
                              <div className="space-y-2">
                                 <div className="text-[9px] font-black text-rose-500/40 uppercase tracking-widest">BİRİNCİ TARAF</div>
                                 <div className="text-sm font-black text-white">{partyA.name || 'GİRİLMEDİ'}</div>
                              </div>
                              <div className="space-y-2 font-black uppercase tracking-widest text-[9px]">
                                 <div className="text-[9px] font-black text-rose-500/40 uppercase tracking-widest">İKİNCİ TARAF</div>
                                 <div className="text-sm font-black text-white">{partyB.name || 'GİRİLMEDİ'}</div>
                              </div>
                           </div>
                        </div>
                        <div className="p-8 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-start gap-5">
                           <AlertTriangle className="w-6 h-6 text-red-500 mt-1 shrink-0" />
                           <div className="space-y-2">
                              <h5 className="text-[11px] font-black text-red-500 uppercase tracking-widest">HUKUKSAL UYARI VE DELİL TAAHHÜTNAMESİ</h5>
                              <p className="text-[9px] text-white/30 font-bold leading-relaxed uppercase tracking-wider italic">GİZLİLİK İHLALİ DURUMUNDA TÜRK BORÇLAR KANUNU VE TİCARİ SIRLARIN KORUNMASI HÜKÜMLERİ UYARINCA CEZAİ ŞART VE MADDİ/MANEVİ TAZMİNAT YÜKÜMLÜLÜĞÜ SAKLIDIR.</p>
                           </div>
                        </div>
                     </div>
                     <button onClick={finalizeNDA} className="w-full py-8 bg-rose-500 text-white font-black text-[14px] uppercase tracking-[0.4em] rounded-3xl shadow-3xl hover:bg-white hover:text-rose-500 transition-all active:scale-95">{loading ? <Loader2 className="w-6 h-6 animate-spin mx-auto" /> : "SÖZLEŞMEYİ MÜHÜRLER VE ONAYLARIM"}</button>
                  </div>
               )}
            </div>
          ) : (
            <div className="glass-card p-16 text-center space-y-12 border-rose-500/20 bg-rose-500/5 animate-in zoom-in-95 duration-700 shadow-3xl">
               <div className="w-24 h-24 rounded-[3rem] bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mx-auto relative shadow-2xl">
                  <div className="absolute inset-0 bg-rose-500/20 blur-3xl animate-pulse"></div>
                  <CheckCircle2 className="w-12 h-12 text-rose-400 relative z-10" />
               </div>
               <div className="space-y-4">
                  <h2 className="text-5xl font-black text-white uppercase italic tracking-tighter leading-none">SÖZLEŞME <br/> <span className="text-rose-500 italic">MÜHÜRLENDİ</span></h2>
                  <p className="text-[9px] text-white/30 font-black uppercase tracking-[0.4em] italic leading-relaxed">Gizlilik Sözleşmesi (NDA) Yasal Olarak Onaylandı.</p>
               </div>
               <div className="max-w-md mx-auto space-y-4">
                  <button className="w-full flex items-center justify-between p-7 bg-white text-black font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl hover:bg-rose-500 transition-all group shadow-2xl shadow-rose-500/20">
                     <div className="flex items-center gap-4"><Download className="w-5 h-5" /> GIZLILIK_SOZLESMESI.pdf</div>
                     <span className="text-[8px] opacity-20 font-black uppercase italic">Mühürlü_Protokol</span>
                  </button>
                  <button onClick={clearSession} className="w-full py-5 bg-white/5 text-white/20 font-black text-[9px] uppercase tracking-[0.3em] rounded-2xl hover:bg-white/10 transition-all border border-white/5">YENİ SÖZLEŞME OLUŞTUR</button>
               </div>
            </div>
          )}

        </div>
      </div>
    </main>
  );
}
