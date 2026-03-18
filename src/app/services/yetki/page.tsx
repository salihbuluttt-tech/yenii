"use client";

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { 
  Key, 
  ShieldCheck, 
  Building2, 
  MapPin, 
  UserCircle2, 
  MessageSquare, 
  Copy, 
  CheckCircle2, 
  Loader2, 
  FileCheck, 
  Scale, 
  Clock, 
  Download,
  AlertCircle,
  ChevronRight,
  Gavel,
  ArrowLeft,
  RotateCcw
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ServiceGate } from '@/components/ui/ServiceGate';

export default function YetkiBelgesiPage() {
  const router = useRouter();
  const [gatePassed, setGatePassed] = useState(false);
  const [step, setStep] = useState(1); 
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [completed, setCompleted] = useState(false);
  
  // Data States
  const [propertyInfo, setPropertyInfo] = useState({ city: '', district: '', ada: '', parsel: '' });
  const [terms, setTerms] = useState({ type: 'SATIS', duration: '3 AY', rate: '%2 + KDV' });
  const [ownerInfo, setOwnerInfo] = useState({ name: '', id: '', share: 'TAM' });
  const [inviteCode, setInviteCode] = useState('');

  useEffect(() => {
    setMounted(true);
    setInviteCode('AUTH-' + Math.random().toString(36).substring(7).toUpperCase());
    
    // Kapı Kontrolü
    const gateStatus = localStorage.getItem('tb_gate_yetki');
    if (gateStatus === 'passed') setGatePassed(true);

    // Oturum Kontrolü
    const saved = localStorage.getItem('tb_session_yetki');
    if (saved) {
      const session = JSON.parse(saved);
      setStep(session.step);
      setCompleted(session.completed || false);
      setPropertyInfo(session.propertyInfo || { city: '', district: '', ada: '', parsel: '' });
      setTerms(session.terms || { type: 'SATIS', duration: '3 AY', rate: '%2 + KDV' });
      setOwnerInfo(session.ownerInfo || { name: '', id: '', share: 'TAM' });
    }
  }, []);

  const onGateSuccess = () => {
    setGatePassed(true);
    localStorage.setItem('tb_gate_yetki', 'passed');
  };

  const updateSession = (newStep: number, isDone: boolean = false) => {
    setStep(newStep);
    setCompleted(isDone);
    localStorage.setItem('tb_session_yetki', JSON.stringify({ 
      step: newStep, 
      completed: isDone,
      propertyInfo,
      terms,
      ownerInfo
    }));
  };

  const clearSession = () => {
    if (confirm("Bu yetki protokolü taslağını ve verileri silmek istediğinize emin misiniz?")) {
      localStorage.removeItem('tb_session_yetki');
      localStorage.removeItem('tb_gate_yetki');
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

  const finalizeYetki = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      updateSession(step, true);
    }, 2500);
  };

  return (
    <main className="min-h-screen bg-[#070709] selection:bg-amber-500/30 text-white">
      <Navbar />
      
      <div className="container mx-auto px-6 pt-32 pb-24">
        {!gatePassed ? (
          <ServiceGate serviceName="DİJİTAL YETKİ BELGESİ" onSuccess={onGateSuccess} />
        ) : (
          <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in duration-1000">
            {/* Action Header */}
            <div className="flex items-center justify-between">
              <button 
                onClick={() => router.push('/')}
                className="flex items-center gap-2 text-[10px] font-black text-amber-500/40 hover:text-white transition-all uppercase tracking-[0.3em] group"
              >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> ANA SAYFAYA DÖN
              </button>
              
              {step > 1 && !completed && (
                  <button 
                    onClick={clearSession}
                    className="flex items-center gap-2 text-[9px] font-black text-amber-500/40 hover:text-rose-500 transition-all uppercase tracking-[0.3em]"
                  >
                    <RotateCcw className="w-3 h-3" /> YETKİ TASLAĞINI SIFIRLA
                  </button>
              )}
            </div>

            {!completed ? (
              <div className="space-y-12">
                {/* Timeline Header */}
                <div className="flex items-center justify-between text-[9px] font-black uppercase tracking-[0.4em] text-white/20">
                    <div className="flex items-center gap-2">
                      <span className={step >= 1 ? 'text-amber-500' : ''}>TAŞINMAZ_VERİ</span>
                      <ChevronRight className="w-3 h-3" />
                      <span className={step >= 3 ? 'text-amber-500' : ''}>SAHİBİ_DAVET</span>
                      <ChevronRight className="w-3 h-3" />
                      <span className={step >= 5 ? 'text-primary' : ''}>YETKİ_MÜHÜR_OK</span>
                    </div>
                </div>

                {/* Step 1: Taşınmaz Veri (Eski Step 2 Buraya Kaydı çünkü Gate Başta) */}
                {step === 1 && (
                    <div className="glass-card p-12 bg-white/[0.02] border-white/5 space-y-10 animate-in slide-in-from-right-8 duration-700">
                      <div className="flex items-center gap-6 pb-6 border-b border-white/5 font-black uppercase tracking-widest text-[12px]">
                          <div className="w-10 h-10 rounded-2xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20 text-amber-500 font-black tracking-widest uppercase"><MapPin className="w-5 h-5" /></div>
                          TAŞINMAZ (PORTFÖY) VERİ TANIMLAMA
                      </div>
                      <form className="grid grid-cols-1 md:grid-cols-2 gap-8" onSubmit={(e) => {e.preventDefault(); handleNext();}}>
                          <div className="space-y-2">
                            <label className="text-[10px] font-black text-white/40 uppercase tracking-widest pl-1 italic">İL / ŞEHİR</label>
                            <input required value={propertyInfo.city} onChange={(e) => setPropertyInfo({...propertyInfo, city: e.target.value})} type="text" placeholder="İstanbul" className="w-full bg-black/40 border border-white/10 rounded-2xl p-5 text-sm font-bold outline-none focus:border-amber-500/40" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-black text-white/40 uppercase tracking-widest pl-1 italic">ADA / PARSEL</label>
                            <div className="grid grid-cols-2 gap-4">
                                <input required value={propertyInfo.ada} onChange={(e) => setPropertyInfo({...propertyInfo, ada: e.target.value})} type="text" placeholder="Ada" className="w-full bg-black/40 border border-white/10 rounded-2xl p-5 text-sm font-bold outline-none focus:border-amber-500/40" />
                                <input required value={propertyInfo.parsel} onChange={(e) => setPropertyInfo({...propertyInfo, parsel: e.target.value})} type="text" placeholder="Parsel" className="w-full bg-black/40 border border-white/10 rounded-2xl p-5 text-sm font-bold outline-none focus:border-amber-500/40" />
                            </div>
                          </div>
                          <button type="submit" className="md:col-span-2 py-6 bg-white text-black font-black text-[12px] uppercase tracking-[0.3em] rounded-2xl hover:bg-amber-500 transition-all flex items-center justify-center gap-4 group">TAŞINMAZ VERİLERİNİ KİLİTLE <ChevronRight className="w-4 h-4" /></button>
                      </form>
                    </div>
                )}

                {/* Step 2: Şartlar */}
                {step === 2 && (
                    <div className="glass-card p-12 bg-white/[0.02] border-white/5 space-y-10 animate-in slide-in-from-right-8 duration-700">
                      <div className="flex items-center gap-6 pb-6 border-b border-white/5 font-black uppercase tracking-widest text-[12px]">
                          <div className="w-10 h-10 rounded-2xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20 text-amber-500"><Gavel className="w-5 h-5" /></div>
                          YETKİ ŞARTLARI VE KOMİSYON PROTOKOLÜ
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-black uppercase tracking-widest">
                          <div className="space-y-4">
                            <label className="text-[10px] font-black text-white/40 uppercase tracking-widest pl-1">İşlem Türü</label>
                            <div className="grid grid-cols-2 gap-4">
                                {['SATIS', 'KIRALAMA'].map(t => (
                                  <button key={t} onClick={() => setTerms({...terms, type: t})} className={`p-4 rounded-xl border text-[10px] font-black transition-all ${terms.type === t ? 'bg-amber-500/20 border-amber-500 text-amber-500' : 'bg-black/40 border-white/5 text-white/30'}`}>{t}</button>
                                ))}
                            </div>
                          </div>
                          <div className="space-y-4 text-center md:text-left">
                            <label className="text-[10px] font-black text-white/40 uppercase tracking-widest pl-1">Komisyon (Yönetmelik Üst Limit)</label>
                            <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] rounded-xl flex items-center justify-between group shadow-inner">
                                <span>%2 + KDV</span>
                                <ShieldCheck className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                            </div>
                          </div>
                      </div>
                      <button onClick={handleNext} className="w-full py-6 bg-amber-500 text-black font-black text-[12px] uppercase tracking-[0.3em] rounded-2xl hover:bg-white transition-all">ŞARTLARI ONAYLA VE DAVET ÜRET</button>
                    </div>
                )}

                {/* Step 3: Davet */}
                {step === 3 && (
                    <div className="glass-card p-12 bg-white/[0.02] border-amber-500/20 space-y-12 text-center animate-in zoom-in-95 duration-700">
                      <div className="space-y-4">
                          <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter">HAK SAHİBİ <br/> <span className="text-amber-500 italic uppercase">DAVET_MASASI</span></h3>
                          <p className="text-[10px] text-white/30 font-black uppercase tracking-[0.4em]">Mülkiyet onayı için mülk sahibine davet kodunu iletin.</p>
                      </div>
                      <div className="p-10 bg-black/60 border border-white/5 rounded-[3rem] space-y-8 relative overflow-hidden group shadow-3xl">
                          <div className="text-5xl font-mono font-black text-amber-500 tracking-[0.4em] relative z-10">{inviteCode}</div>
                          <div className="flex flex-col md:flex-row gap-4 justify-center relative z-10">
                            <button onClick={() => alert("Davet Kodu Kopyalandı!")} className="px-10 py-5 bg-white/5 border border-white/5 text-white font-black text-[10px] uppercase tracking-widest rounded-2xl flex items-center justify-center gap-3 transition-all"><Copy className="w-4 h-4" /> KOPYALA</button>
                            <button className="px-10 py-5 bg-emerald-500 text-black font-black text-[10px] uppercase tracking-widest rounded-2xl flex items-center justify-center gap-3 hover:bg-emerald-400 transition-all shadow-2xl"><MessageSquare className="w-5 h-5" /> WHATSAPP İLE GÖNDER</button>
                          </div>
                      </div>
                      <div className="pt-8 border-t border-white/5">
                          <div className="flex items-center justify-center gap-3 animate-pulse opacity-50">
                            <Loader2 className="w-4 h-4 text-amber-500 animate-spin" />
                            <span className="text-[9px] font-black text-white/40 uppercase tracking-[0.3em]">HAK SAHİBİ BAĞLANTISI BEKLENİYOR...</span>
                          </div>
                          <button onClick={handleNext} className="text-[9px] text-amber-500/30 font-bold hover:text-amber-500 transition-all uppercase tracking-widest mt-6 underline">HAK SAHİBİ EKRANINDAN DEVAM ET (DRAFT)</button>
                      </div>
                    </div>
                )}

                {/* Step 4: Sahip Onayı */}
                {step === 4 && (
                    <div className="glass-card p-12 bg-white/[0.02] border-white/5 space-y-10 animate-in slide-in-from-left-8 duration-700 text-center md:text-left shadow-3xl">
                      <div className="flex items-center gap-6 pb-6 border-b border-white/5 font-black uppercase tracking-widest text-[12px]">
                          <div className="w-10 h-10 rounded-2xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20 text-amber-500"><UserCircle2 className="w-5 h-5" /></div>
                          HAK SAHİBİ KİMLİK ONAYI
                      </div>
                      <form className="space-y-8" onSubmit={(e) => {e.preventDefault(); finalizeYetki();}}>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-black uppercase tracking-widest">
                            <input required value={ownerInfo.name} onChange={(e) => setOwnerInfo({...ownerInfo, name: e.target.value})} type="text" placeholder="Mülk Sahibi Ad Soyad" className="w-full bg-black/40 border border-white/10 rounded-2xl p-5 text-sm font-bold outline-none focus:border-amber-500/40 shadow-inner" />
                            <input required value={ownerInfo.id} onChange={(e) => setOwnerInfo({...ownerInfo, id: e.target.value})} type="text" placeholder="TC KİMLİK NO" className="w-full bg-black/40 border border-white/10 rounded-2xl p-5 text-sm font-bold outline-none focus:border-amber-500/40 shadow-inner" />
                          </div>
                          <div className="p-8 bg-white/[0.02] border border-white/5 rounded-2xl space-y-4 shadow-3xl">
                            <p className="text-[11px] font-medium text-white/50 leading-relaxed uppercase tracking-widest italic text-center md:text-left">
                                "Yukarıda bilgileri yazılı taşınmazın {terms.type} işlemleri için yönetmelik uyarınca özel yetkilendirmeyi onaylıyorum."
                            </p>
                          </div>
                          <button type="submit" className="w-full py-8 bg-amber-500 text-black font-black text-[12px] uppercase tracking-[0.4em] rounded-2xl hover:scale-[1.02] transition-all flex items-center justify-center gap-4 shadow-3xl shadow-amber-500/10">YETKİYİ RESMİLEŞTİR VE MÜHÜRLE <CheckCircle2 className="w-6 h-6" /></button>
                      </form>
                    </div>
                )}
              </div>
            ) : (
              <div className="glass-card p-16 text-center space-y-12 border-amber-500/20 bg-amber-500/5 animate-in zoom-in-95 duration-700 shadow-3xl">
                <div className="w-24 h-24 rounded-[3rem] bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mx-auto relative shadow-2xl">
                    <div className="absolute inset-0 bg-amber-500/20 blur-3xl animate-pulse"></div>
                    <FileCheck className="w-12 h-12 text-amber-500 relative z-10" />
                </div>
                <div className="space-y-4">
                    <h2 className="text-5xl font-black text-white uppercase italic tracking-tighter leading-none">YETKİ <br/> <span className="text-amber-500">PROTOTOKOLÜ AKTİF</span></h2>
                    <p className="text-[9px] text-white/30 font-black uppercase tracking-[0.4em] italic leading-relaxed">Taşınmaz Ticareti Yönetmeliği Madde 13 Uyumlu Mühür.</p>
                </div>
                <div className="max-w-md mx-auto space-y-4">
                    <button className="w-full flex items-center justify-between p-7 bg-white text-black font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl hover:bg-amber-500 transition-all group shadow-2xl">
                      <div className="flex items-center gap-4"><Download className="w-6 h-6" /> RESMI_YETKI_BELGESI.pdf</div>
                      <span className="text-[8px] opacity-20 font-black uppercase italic tracking-widest">Mühürlü_Belge</span>
                    </button>
                    <button onClick={clearSession} className="w-full py-5 bg-white/5 text-white/20 font-black text-[9px] uppercase tracking-[0.3em] rounded-2xl hover:bg-white/10 transition-all border border-white/5">YENİ YETKİ OLUŞTUR</button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
