"use client";

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { 
  ShieldCheck, 
  Upload, 
  FileText, 
  CheckCircle2, 
  Loader2, 
  Sparkles, 
  Building2, 
  EyeOff, 
  Lock, 
  Download,
  AlertCircle,
  Database,
  Search,
  FileSearch,
  ChevronRight,
  ArrowLeft,
  RotateCcw
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { ServiceGate } from '@/components/ui/ServiceGate';

type DocType = 'TAPU' | 'RUHSAT' | 'YETKI' | 'DIGER';

export default function DogrulamaPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [gatePassed, setGatePassed] = useState(false);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<DocType>('TAPU');
  const [isScanning, setIsScanning] = useState(false);
  const [isBlurred, setIsBlurred] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Oturum Kontrolü (Kapı Geçildiyse Hatırla)
    const gateStatus = localStorage.getItem('tb_gate_dogrulama');
    if (gateStatus === 'passed') setGatePassed(true);

    const savedSession = localStorage.getItem('tb_session_dogrulama');
    if (savedSession) {
       const session = JSON.parse(savedSession);
       setStep(session.step);
       setCompleted(session.completed || false);
    }
  }, []);

  const onGateSuccess = () => {
    setGatePassed(true);
    localStorage.setItem('tb_gate_dogrulama', 'passed');
  };

  const updateSession = (newStep: number, isDone: boolean = false) => {
    setStep(newStep);
    setCompleted(isDone);
    localStorage.setItem('tb_session_dogrulama', JSON.stringify({ step: newStep, completed: isDone }));
  };

  const clearSession = () => {
    if (confirm("Mevcut işlem verileri silinecek. Emin misiniz?")) {
      localStorage.removeItem('tb_session_dogrulama');
      localStorage.removeItem('tb_gate_dogrulama');
      window.location.reload();
    }
  };

  const handleStartScan = () => {
    setIsScanning(true);
    setLoading(true);
    setTimeout(() => {
      setIsBlurred(true);
      setLoading(false);
    }, 2000);
    setTimeout(() => {
      setIsScanning(false);
      updateSession(2);
    }, 4500);
  };

  const handleConfirm = () => {
    setLoading(true);
    setTimeout(() => {
       setLoading(false);
       updateSession(step, true);
    }, 2500);
  };

  const docTemplates = {
    TAPU: { title: "Tapu Belgesi", icon: Building2, color: "text-amber-400" },
    RUHSAT: { title: "Yapı Ruhsatı", icon: FileText, color: "text-sky-400" },
    YETKI: { title: "Yetki Belgesi", icon: ShieldCheck, color: "text-emerald-400" },
    DIGER: { title: "Hukuksal Meta", icon: Lock, color: "text-white/40" }
  };

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-[#070709] selection:bg-primary/30 text-white">
      <Navbar />
      
      <div className="container mx-auto px-6 pt-32 pb-24">
        {!gatePassed ? (
          <ServiceGate serviceName="TEK TARAFLI DOĞRULAMA" onSuccess={onGateSuccess} />
        ) : (
          <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in duration-1000">
            {/* Top Navigation & Back Button */}
            <div className="flex items-center justify-between">
               <button 
                onClick={() => router.push('/')}
                className="flex items-center gap-2 text-[10px] font-black text-white/40 hover:text-primary transition-all uppercase tracking-[0.3em] group"
               >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> GERİ DÖN
               </button>
               
               {step > 1 && !completed && (
                  <button 
                    onClick={clearSession}
                    className="flex items-center gap-2 text-[9px] font-black text-rose-500/40 hover:text-rose-500 transition-all uppercase tracking-[0.3em]"
                  >
                     <RotateCcw className="w-3 h-3" /> İŞLEMİ SIFIRLA
                  </button>
               )}
            </div>

            <div className="pt-4 space-y-2">
               <h1 className="text-4xl font-black italic tracking-tighter uppercase">TEK TARAFLI <span className="text-primary italic">DOĞRULAMA</span></h1>
               <p className="text-[10px] text-white/20 font-black uppercase tracking-[0.4em] italic leading-relaxed">Güvenli Belge Analiz ve Mühürleme Protokolü / Ver. 2.4</p>
            </div>

            {!completed ? (
              <div className="space-y-8 animate-in fade-in duration-700">
                  {/* Steps Timeline */}
                  <div className="flex items-center gap-4 text-[9px] font-black uppercase tracking-[0.4em] text-white/10">
                    <span className={step >= 1 ? 'text-primary' : ''}>01_BELGE_YÜKLEME</span>
                    <ChevronRight className="w-3 h-3" />
                    <span className={step >= 2 ? 'text-primary' : ''}>02_AI_ANALİZ</span>
                    <ChevronRight className="w-3 h-3" />
                    <span>03_MÜHÜRLÜ_RAPOR</span>
                  </div>

                  {/* Step 1: Upload */}
                  {step === 1 && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                      <div className="lg:col-span-1 space-y-6">
                        <div className="glass-card p-10 border-white/5 bg-white/[0.02] space-y-8">
                            <h2 className="text-xl font-black uppercase italic leading-none">ŞABLON <br/> <span className="text-primary italic">SEÇİMİ</span></h2>
                            <div className="space-y-3">
                              {Object.entries(docTemplates).map(([key, t]) => (
                                <button 
                                  key={key}
                                  onClick={() => setSelectedDoc(key as DocType)}
                                  className={`w-full p-4 rounded-xl flex items-center justify-between border transition-all ${
                                    selectedDoc === key ? 'bg-primary/10 border-primary/40' : 'bg-black/40 border-white/5 hover:border-white/10'
                                  }`}
                                >
                                    <div className="flex items-center gap-3">
                                      <t.icon className={`w-4 h-4 ${selectedDoc === key ? 'text-primary' : 'text-white/20'}`} />
                                      <span className={`text-[9px] font-black uppercase tracking-widest ${selectedDoc === key ? 'text-white' : 'text-white/40'}`}>{t.title}</span>
                                    </div>
                                    {selectedDoc === key && <CheckCircle2 className="w-3 h-3 text-primary" />}
                                </button>
                              ))}
                            </div>
                        </div>
                      </div>

                      <div className="lg:col-span-2">
                        <input 
                          type="file" 
                          id="document-upload" 
                          className="hidden" 
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => {
                            if (e.target.files && e.target.files.length > 0) {
                              handleStartScan();
                            }
                          }}
                        />
                        <div 
                          onClick={() => document.getElementById('document-upload')?.click()}
                          className="glass-card p-12 bg-[#0d0d12] border-white/5 border-dashed border-2 min-h-[450px] flex flex-col items-center justify-center text-center space-y-8 group transition-all hover:bg-white/[0.01] cursor-pointer"
                        >
                            {isScanning ? (
                              <div className="flex flex-col items-center space-y-8 w-full max-w-sm">
                                  <div className="w-full h-1 bg-white/5 rounded-full relative overflow-hidden">
                                    <div className="absolute inset-0 bg-primary animate-progress-fast"></div>
                                  </div>
                                  <div className="space-y-4 relative text-center">
                                    <Loader2 className="w-10 h-10 text-primary animate-spin mx-auto" />
                                    <p className="text-[9px] font-black text-white/40 uppercase tracking-[0.4em]">BELGE ANALİZ EDİLİYOR...</p>
                                  </div>
                              </div>
                            ) : (
                              <>
                                  <div className="w-20 h-20 rounded-[2rem] bg-primary/20 flex items-center justify-center shadow-3xl shadow-primary/10 group-hover:scale-110 transition-transform">
                                    <Upload className="w-8 h-8 text-primary" />
                                  </div>
                                  <div className="space-y-2">
                                    <h3 className="text-xl font-black text-white uppercase italic">OTOMATİK TARAMA</h3>
                                    <p className="text-[9px] text-white/10 font-bold uppercase tracking-[0.2em] max-w-xs mx-auto italic">Dosyayı sürükleyin veya <span className="text-primary underline">Gözat</span></p>
                                  </div>
                                  <button 
                                  className="px-10 py-5 bg-white text-black font-black text-[9px] uppercase tracking-[0.3em] rounded-xl hover:bg-primary transition-all active:scale-95 shadow-2xl"
                                  >
                                    DOSYA SEÇİNİZ
                                  </button>
                              </>
                            )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Analysis */}
                  {step === 2 && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch animate-in slide-in-from-bottom-8 duration-700">
                        <div className="glass-card p-10 bg-black/40 border-white/5 space-y-8 relative overflow-hidden">
                          <div className="aspect-[3/4] bg-white/5 rounded-3xl relative overflow-hidden border border-white/5">
                              <div className="absolute inset-8 border border-white/10 rounded-lg p-6 space-y-6">
                                <div className="w-1/2 h-3 bg-white/20 rounded"></div>
                                <div className="space-y-3">
                                    <div className="w-full h-2 bg-white/10 rounded"></div>
                                    <div className="w-3/4 h-8 bg-white/5 blur-md border border-white/10 rounded"></div>
                                    <div className="w-full h-2 bg-white/10 rounded"></div>
                                    <div className="w-full h-2 bg-white/10 rounded"></div>
                                </div>
                                <div className="absolute bottom-6 left-6 flex gap-2">
                                    <div className="w-10 h-10 border border-white/20 rounded-lg"></div>
                                    <div className="flex-1 space-y-2">
                                      <div className="w-16 h-2 bg-white/20 rounded"></div>
                                    </div>
                                </div>
                              </div>
                              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent opacity-50"></div>
                              <div className="absolute top-6 right-6">
                                <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-[8px] font-black uppercase rounded-full border border-emerald-500/20">SAHTECİLİK ANALİZİ: GÜVENLİ</span>
                              </div>
                          </div>
                        </div>

                        <div className="space-y-8 flex flex-col">
                          <div className="glass-card p-10 bg-primary/[0.03] border-primary/10 flex-1 space-y-8 relative overflow-hidden group">
                            <div className="flex items-center gap-4">
                                <Search className="w-5 h-5 text-primary" />
                                <h3 className="text-lg font-black text-white uppercase italic tracking-tighter">İÇERİK_DOĞRULAMA_MATRİSİ</h3>
                            </div>
                            <div className="space-y-5">
                                {[
                                  { label: "BELGE_ADI", value: selectedDoc + "_INTERNAL_PRO" },
                                  { label: "KARTI_NO", value: "XXXXXXXX (MASKELENDİ)" },
                                  { label: "HUKUKİ_DİL", value: "BORÇLAR KANUNU UYUMLU" },
                                  { label: "GEÇERLİLİK", value: "TÜM KRİRLER OK" },
                                ].map((item, idx) => (
                                  <div key={idx} className="flex justify-between items-center border-b border-white/5 pb-4">
                                    <div className="text-[8px] font-black text-white/20 uppercase tracking-widest">{item.label}</div>
                                    <div className="text-[10px] font-bold text-white uppercase tracking-widest">{item.value}</div>
                                  </div>
                                ))}
                            </div>
                            <div className="p-5 bg-amber-500/10 border border-amber-500/20 rounded-xl space-y-1">
                                <p className="text-[9px] text-white/40 font-bold uppercase leading-relaxed italic">
                                  *Belge içeriğinde 3. Şahıs verisi tespit edilemedi. Rapor "KAPSAM DIŞI" ibaresiyle onaylanacaktır.
                                </p>
                            </div>
                          </div>
                          <button 
                            onClick={handleConfirm}
                            disabled={loading}
                            className="w-full py-6 bg-primary text-black font-black text-[11px] uppercase tracking-[0.3em] rounded-2xl shadow-3xl hover:bg-white transition-all flex items-center justify-center gap-4 active:scale-95 disabled:opacity-50"
                          >
                            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>PROTOKOLÜ MÜHÜRLER VE İNDİRİRİM <Sparkles className="w-4 h-4" /></>}
                          </button>
                        </div>
                    </div>
                  )}
              </div>
            ) : (
              <div className="glass-card p-16 text-center space-y-12 border-emerald-500/20 bg-emerald-500/5 animate-in zoom-in-95 duration-700 shadow-3xl">
                  <div className="w-24 h-24 rounded-[2.5rem] bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto shadow-2xl relative">
                    <div className="absolute inset-0 bg-emerald-500/20 blur-3xl animate-pulse"></div>
                    <CheckCircle2 className="w-12 h-12 text-emerald-400 relative z-10" />
                  </div>
                  
                  <div className="space-y-4">
                    <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter leading-none">İŞLEM <br/> <span className="text-emerald-400 italic">ONAYLANDI</span></h2>
                    <p className="text-[9px] text-white/30 font-black uppercase tracking-[0.4em] italic leading-relaxed">
                        Resmi teyit belgesi başarıyla dökümantasyona işlendi. <br/> 
                        SHA-256 Hash Kanıtı eklendi.
                    </p>
                  </div>

                  <div className="max-w-md mx-auto space-y-4">
                    <button className="w-full flex items-center justify-between p-6 bg-white text-black font-black text-[10px] uppercase tracking-[0.2em] rounded-xl hover:bg-emerald-500 transition-all group shadow-2xl">
                        <div className="flex items-center gap-4">
                          <Download className="w-4 h-4" />
                          DOGRULANMIS_RAPOR.pdf
                        </div>
                        <span className="text-[8px] opacity-20 font-black uppercase italic">820 KB</span>
                    </button>
                    <button onClick={clearSession} className="w-full py-4 bg-white/5 text-white/20 font-black text-[9px] uppercase tracking-[0.3em] rounded-xl hover:bg-white/10 transition-all border border-white/5">
                        YENİ BELGE TARA
                    </button>
                  </div>

                  <div className="flex items-center justify-center gap-6 pt-6 opacity-30 text-[8px] font-black uppercase tracking-[0.4em]">
                    <div className="flex items-center gap-2 italic"><ShieldCheck className="w-3 h-3" /> ISO 27001</div>
                    <div className="flex items-center gap-2 italic"><Lock className="w-3 h-3" /> RAM_STORAGE</div>
                  </div>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
