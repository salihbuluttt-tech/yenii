"use client";

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { 
  Users, 
  Key, 
  CreditCard, 
  ShieldCheck, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  Loader2, 
  FileText, 
  Smartphone, 
  Copy, 
  Share2, 
  Lock,
  Upload,
  Zap,
  UserCircle2,
  AlertTriangle
} from 'lucide-react';

// Adım Tipleri
type Step = 'CODE_ENTRY' | 'PACKAGES' | 'PAYMENT' | 'GENERATE_CODE' | 'ROLE_SELECTION' | 'INFO_ENTRY' | 'DASHBOARD' | 'FINAL';

export default function MutabakatPage() {
  const [step, setStep] = useState<Step>('CODE_ENTRY');
  const [accessCode, setAccessCode] = useState('');
  const [orderNo, setOrderNo] = useState('');
  const [selectedUrl, setSelectedUrl] = useState('');
  const [selectedPackage, setSelectedPackage] = useState('');
  const [tempGeneratedCode, setTempGeneratedCode] = useState('');
  const [role, setRole] = useState<'ALICI' | 'SATICI' | null>(null);
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(3600); // 1 saat varsayılan

  // Kullanıcı Bilgileri
  const [userInfo, setUserInfo] = useState({
    adSoyad: '',
    tc: '',
    telefon: '',
    adres: '',
    konu: ''
  });

  // AŞAMA 1: Giriş Kodu Kontrolü
  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (accessCode === "DEMO-123") { // Örnek geçerli kod
      setStep('ROLE_SELECTION');
    } else {
      alert("Geçersiz kod! Lütfen yeni bir paket satın alın.");
    }
  };

  // AŞAMA 2: Ödeme Sonrası Kod Üretimi (5 Saniye Simülasyonu)
  const handleSimulatePayment = () => {
    setLoading(true);
    setTimeout(() => {
      const code = `TB-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${selectedPackage.charAt(0)}`;
      setTempGeneratedCode(code);
      setLoading(false);
      setStep('GENERATE_CODE');
    }, 5000);
  };

  return (
    <main className="min-h-screen bg-[#0a0a0c] text-white">
      <Navbar />
      
      <div className="container mx-auto px-6 pt-32 pb-24">
        <div className="max-w-4xl mx-auto">
          
          {/* STEP 1: GİRİŞ KODU SORGULAMA */}
          {step === 'CODE_ENTRY' && (
            <div className="glass-card p-12 text-center space-y-8 animate-in fade-in zoom-in-95">
              <div className="w-20 h-20 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto">
                <Key className="w-10 h-10 text-primary" />
              </div>
              <div className="space-y-4">
                <h1 className="text-4xl font-black uppercase tracking-tight">MUTABAKAT GİRİŞİ</h1>
                <p className="text-white/40 font-bold uppercase text-[10px] tracking-[0.2em]">Hizmete erişmek için kodu girin</p>
              </div>
              <form onSubmit={handleCodeSubmit} className="max-w-sm mx-auto space-y-4">
                <input 
                  type="text" 
                  placeholder="ERİŞİM KODUNUZ"
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-center text-xl font-black tracking-[0.5em] focus:border-primary focus:ring-1 ring-primary outline-none transition-all"
                />
                <button className="w-full btn-primary py-4 font-black uppercase tracking-widest text-xs">MODÜLÜ AÇ</button>
              </form>
              <div className="pt-4">
                <button 
                  onClick={() => setStep('PACKAGES')}
                  className="text-primary text-[10px] font-black uppercase tracking-widest hover:underline decoration-2 underline-offset-8"
                >
                  KODUNUZ YOK MU? SATIN ALIN →
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: PAKET SEÇİMİ */}
          {step === 'PACKAGES' && (
            <div className="space-y-12 animate-in slide-in-from-bottom-8">
               <div className="text-center">
                  <h2 className="text-5xl font-black uppercase tracking-tighter text-white">HIZLI PAKETLER</h2>
                  <p className="text-white/40 mt-2 font-bold uppercase text-xs tracking-widest italic tracking-wider">Hemen Kodunuzu Alın ve Analize Başlayın</p>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    { id: '100', t: "1 SAATLİK", p: "100", desc: "Tek seferlik hızlı işlem.", url: "https://www.shopier.com/fidorax/44846416" },
                    { id: '1250', t: "AYLIK", p: "1250", desc: "Emlak ofisleri için ideal.", best: true, url: "https://www.shopier.com/fidorax/44846597" },
                    { id: '3250', t: "YILLIK", p: "3250", desc: "Kurumsal sınırsız erişim.", url: "https://www.shopier.com/fidorax/44846604" },
                  ].map((pkg) => (
                    <div 
                      key={pkg.id} 
                      onClick={() => { setSelectedPackage(pkg.id); setSelectedUrl(pkg.url); setStep('PAYMENT'); }}
                      className={`glass-card p-10 group cursor-pointer border-white/5 hover:border-primary/50 transition-all ${pkg.best ? 'ring-2 ring-primary/50 relative' : ''}`}
                    >
                      {pkg.best && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-[9px] font-black px-4 py-1 rounded-full uppercase tracking-widest">En Popüler</div>}
                      <div className="text-[10px] font-black text-primary uppercase tracking-widest mb-4">{pkg.t} GEÇERLİ</div>
                      <div className="text-5xl font-black mb-2 tracking-tight text-white">₺{pkg.p}</div>
                      <p className="text-white/40 text-xs font-bold uppercase mb-10 leading-relaxed">{pkg.desc}</p>
                      <div className="w-full py-4 border border-white/10 rounded-xl text-center text-[10px] font-black uppercase group-hover:bg-primary group-hover:text-white transition-all text-white/60">ŞİMDİ KOD AL</div>
                    </div>
                  ))}
               </div>
            </div>
          )}

          {/* STEP 3: GERÇEK SHOPIER IFRAME ÖDEME EKRANI */}
          {step === 'PAYMENT' && (
            <div className="space-y-8 animate-in zoom-in-95">
               <div className="glass-card overflow-hidden border-primary/20 bg-primary/5 shadow-2xl">
                  {/* Iframe Header */}
                  <div className="p-4 bg-white/5 border-b border-white/10 flex items-center justify-between">
                     <div className="flex items-center gap-3">
                        <Lock className="w-4 h-4 text-primary" />
                        <span className="text-[10px] font-black uppercase text-white tracking-widest leading-none">GÜVENLİ SHOPIER ÖDEME KANALI</span>
                     </div>
                     <button onClick={() => setStep('PACKAGES')} className="text-[9px] font-black text-rose-500 uppercase hover:underline">Geri Dön</button>
                  </div>
                  {/* Real Shopier Iframe */}
                  <div className="w-full bg-white h-[600px] overflow-hidden">
                     <iframe 
                        src={selectedUrl} 
                        className="w-full h-full border-none"
                        style={{ height: '600px' }}
                        title="Shopier Ödeme"
                     />
                  </div>
               </div>

               {/* Manual Verification Section */}
               <div className="glass-card p-8 border-white/5 bg-white/[0.02] space-y-6">
                  <div className="text-center space-y-2">
                     <h4 className="text-xs font-black uppercase tracking-widest text-primary">ÖDEME SONRASI İŞLEM</h4>
                     <p className="text-white/40 text-[9px] font-bold uppercase italic">Ödeme yaptıysanız Shopier sipariş numarasını buraya girin.</p>
                  </div>
                  <div className="flex flex-col md:flex-row gap-4">
                     <input 
                        type="text" 
                        placeholder="SİPARİŞ NUMARASI"
                        value={orderNo}
                        onChange={(e) => setOrderNo(e.target.value)}
                        className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-center text-sm font-bold outline-none focus:border-primary text-white"
                     />
                     <select 
                        value={selectedPackage}
                        onChange={(e) => setSelectedPackage(e.target.value)}
                        className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-[10px] font-black text-white uppercase outline-none"
                     >
                        <option value="100">SAATLİK PAKET</option>
                        <option value="1250">AYLIK PAKET</option>
                        <option value="3250">YILLIK PAKET</option>
                     </select>
                     <button 
                       onClick={handleSimulatePayment}
                       disabled={!orderNo}
                       className="px-10 py-4 bg-primary text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl shadow-primary/20 active:scale-95 disabled:opacity-20 transition-all flex items-center gap-2"
                     >
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "KODUMU ONAYLA"}
                     </button>
                  </div>
               </div>
            </div>
          )}


          {/* STEP 4: KOD ÜRETİM VE HATIRLATMA */}
          {step === 'GENERATE_CODE' && (
            <div className="glass-card p-12 text-center space-y-8 animate-in zoom-in-95">
               <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400" />
               </div>
               <div className="space-y-4">
                  <h2 className="text-3xl font-black uppercase">ÖDEME BAŞARILI!</h2>
                  <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em] max-w-sm mx-auto">LÜTFEN AŞAĞIDAKİ KODU KOPYALAYIN. BU KOD BİR DAHA GÖSTERİLMEYECEKTİR.</p>
               </div>
               <div className="p-10 bg-white/5 border border-white/10 rounded-3xl relative group">
                  <span className="text-5xl font-black tracking-[0.4em] text-primary">{tempGeneratedCode}</span>
                  <button 
                    onClick={() => { navigator.clipboard.writeText(tempGeneratedCode); alert("Kod Kopyalandı!"); }}
                    className="absolute top-4 right-4 p-2 bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
               </div>
               <button 
                 onClick={() => setStep('ROLE_SELECTION')}
                 className="w-full py-5 bg-primary text-white font-black text-xs uppercase tracking-widest rounded-2xl"
               >
                 KODU KAYDETTİM, MODÜLE DEVAM ET
               </button>
            </div>
          )}

          {/* STEP 5: ROL SEÇİMİ */}
          {step === 'ROLE_SELECTION' && (
            <div className="space-y-8 animate-in fade-in">
               <div className="text-center space-y-3">
                  <h2 className="text-4xl font-black uppercase tracking-tight">TARAF SEÇİMİ</h2>
                  <p className="text-white/40 text-xs font-bold uppercase tracking-widest italic">Mutabakat sürecindeki kimliğinizi belirleyin</p>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <button 
                    onClick={() => { setRole('ALICI'); setStep('INFO_ENTRY'); }}
                    className={`glass-card p-12 border-indigo-500/20 bg-indigo-500/5 group hover:bg-indigo-500/10 transition-all ${role === 'SATICI' ? 'opacity-20 cursor-not-allowed pointer-events-none' : ''}`}
                  >
                     <UserCircle2 className="w-16 h-16 text-indigo-400 mx-auto mb-6 group-hover:scale-110 transition-transform" />
                     <h3 className="text-2xl font-black uppercase">ALICI TARAFIYIM</h3>
                  </button>
                  <button 
                    onClick={() => { setRole('SATICI'); setStep('INFO_ENTRY'); }}
                    className={`glass-card p-12 border-amber-500/20 bg-amber-500/5 group hover:bg-amber-500/10 transition-all ${role === 'ALICI' ? 'opacity-20 cursor-not-allowed pointer-events-none' : ''}`}
                  >
                     <Users className="w-16 h-16 text-amber-400 mx-auto mb-6 group-hover:scale-110 transition-transform" />
                     <h3 className="text-2xl font-black uppercase">SATICI TARAFIYIM</h3>
                  </button>
               </div>
            </div>
          )}

          {/* STEP 6: BİLGİ GİRİŞİ */}
          {step === 'INFO_ENTRY' && (
            <div className="glass-card p-12 space-y-10 animate-in slide-in-from-right-8">
               <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                  <div className="space-y-4">
                     <h3 className="text-3xl font-black uppercase tracking-tight">KULLANICI TEYİT VERİLERİ</h3>
                     <p className="text-white/40 text-[10px] font-black tracking-widest uppercase">Yapay zeka analizi için detaylı bilgi girişi</p>
                  </div>
                  <div className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border ${role === 'ALICI' ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400' : 'bg-amber-500/10 border-amber-500/20 text-amber-400'}`}>
                    AKTİF ROL: {role}
                  </div>
               </div>

               <form onSubmit={(e) => { e.preventDefault(); setStep('DASHBOARD'); }} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-white/40 uppercase tracking-widest pl-1">AD SOYAD</label>
                        <input 
                           type="text" 
                           required 
                           value={userInfo.adSoyad}
                           onChange={(e) => setUserInfo({...userInfo, adSoyad: e.target.value})}
                           className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-bold outline-none focus:border-primary transition-all" 
                        />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-white/40 uppercase tracking-widest pl-1">TC NO (8 VE 11. HANELERE DİKKAT)</label>
                        <input 
                           type="text" 
                           maxLength={11} 
                           placeholder="11 Haneli TC Kimlik No"
                           required 
                           value={userInfo.tc}
                           onChange={(e) => setUserInfo({...userInfo, tc: e.target.value})}
                           className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-bold outline-none focus:border-primary transition-all" 
                        />
                     </div>
                  </div>

                  <div className="space-y-2">
                     <label className="text-[10px] font-black text-white/40 uppercase tracking-widest pl-1">MUTABAKAT KONUSU (DETAYLI)</label>
                     <textarea 
                        rows={3} 
                        placeholder="Örn: X mahallesi Y parseldeki taşınmazın 00/00/2026 tarihindeki devir süreci..."
                        required 
                        value={userInfo.konu}
                        onChange={(e) => setUserInfo({...userInfo, konu: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-medium outline-none focus:border-primary transition-all" 
                     />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-white/40 uppercase tracking-widest pl-1">TELEFON</label>
                        <input 
                           type="tel" 
                           required 
                           value={userInfo.telefon}
                           onChange={(e) => setUserInfo({...userInfo, telefon: e.target.value})}
                           className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-bold outline-none focus:border-primary transition-all" 
                        />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-white/40 uppercase tracking-widest pl-1">ADRES</label>
                        <input 
                           type="text" 
                           required 
                           value={userInfo.adres}
                           onChange={(e) => setUserInfo({...userInfo, adres: e.target.value})}
                           className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-bold outline-none focus:border-primary transition-all" 
                        />
                     </div>
                  </div>

                  <button className="w-full py-5 bg-primary text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl shadow-2xl shadow-primary/20 transition-all flex items-center justify-center gap-3">
                    BİLGİLERİ ONAYLA VE MASAYA GEÇ <ArrowRight className="w-4 h-4" />
                  </button>
               </form>
            </div>
          )}

          {/* STEP 7: MUTABAKAT DASHBOARD (ANA SAYFA) */}
          {step === 'DASHBOARD' && (
            <div className="space-y-8 animate-in fade-in">
               <div className="flex flex-col md:flex-row justify-between items-center bg-white/5 border border-white/10 rounded-3xl p-8 gap-8">
                  <div className="text-center md:text-left">
                     <div className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1 flex items-center justify-center md:justify-start gap-2">
                        <Clock className="w-4 h-4 text-rose-500" /> KALAN SÜRE
                     </div>
                     <div className="text-4xl font-black text-rose-500 tracking-wider font-mono">59:59:00</div>
                  </div>
                  <div className="h-20 w-px bg-white/10 hidden md:block"></div>
                  <div className="flex-1 space-y-4">
                     <div className="text-[10px] font-black text-white/40 uppercase tracking-widest text-center">KARŞI TARAFI DAVET ET</div>
                     <div className="flex gap-2">
                        <div className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs font-black tracking-widest text-primary flex items-center justify-center">
                           M-INV-9922X
                        </div>
                        <button className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all" title="Kopyala">
                           <Copy className="w-4 h-4 text-white/40" />
                        </button>
                        <button className="p-3 bg-emerald-500/20 hover:bg-emerald-500/30 rounded-xl transition-all" title="WhatsApp">
                           <Smartphone className="w-4 h-4 text-emerald-400" />
                        </button>
                     </div>
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8">
                  {/* Taraf A */}
                  <div className="space-y-6">
                     <div className="text-[10px] font-black text-primary uppercase tracking-[0.2em] flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div> SİZ (KAYITLI)
                     </div>
                     <div className="glass-card p-10 border-white/5 space-y-8">
                        <div className="w-full aspect-square border-2 border-dashed border-white/10 rounded-3xl flex flex-col items-center justify-center relative overflow-hidden group cursor-pointer">
                           <div className="absolute inset-0 bg-white/10 blur-3xl opacity-0 group-hover:opacity-100 transition-all"></div>
                           <Upload className="w-12 h-12 text-white/20 mb-4 group-hover:text-primary transition-all scale-100 group-hover:scale-110" />
                           <span className="text-[10px] font-black text-white/20 uppercase tracking-widest group-hover:text-white transition-all">BELGEYİ BURAYA BIRAKIN</span>
                        </div>
                        <div className="space-y-3">
                           <div className="flex justify-between items-center text-[10px] font-black text-white/40">
                              <span>DURUM:</span>
                              <span className="text-amber-500">YÜKLEME BEKLENİYOR</span>
                           </div>
                           <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                              <div className="w-0 h-full bg-primary"></div>
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Taraf B */}
                  <div className="space-y-6">
                     <div className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-white/10"></div> KARŞI TARAF
                     </div>
                     <div className="glass-card p-10 border-white/5 bg-white/2 space-y-8 opacity-40">
                        <div className="w-full aspect-square border-2 border-dashed border-white/10 rounded-3xl flex flex-col items-center justify-center">
                           <Users className="w-12 h-12 text-white/10 mb-4" />
                           <span className="text-[10px] font-black text-white/10 uppercase tracking-widest">BEKLENİYOR</span>
                        </div>
                        <div className="flex items-center gap-4 p-4 border border-white/5 rounded-2xl bg-white/2">
                           <Loader2 className="w-4 h-4 animate-spin text-white/10" />
                           <div className="text-[9px] font-bold text-white/20 uppercase tracking-widest">DAVET KABUL EDİLMESİ BEKLENİYOR...</div>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="pt-12 text-center">
                  <button 
                    disabled 
                    onClick={() => setStep('FINAL')}
                    className="btn-primary px-16 py-5 text-sm font-black tracking-[0.2em] uppercase opacity-20 cursor-not-allowed shadow-none"
                  >
                    ANALİZİ BAŞLAT (HER İKİ TARAF YÜKLEMELİ)
                  </button>
                  <p className="mt-4 text-[9px] font-bold text-white/20 uppercase tracking-widest italic">Belgelerin mahrem Alanları yapay zeka tarafından otomatik flulaşacaktır.</p>
               </div>
            </div>
          )}

          {/* STEP 8: FINAL VE PDF ÇIKTISI */}
          {/* ... (Bu bölüm bir sonraki adımda AI analiz ekranı olarak detaylandırılacaktır) ... */}

        </div>
      </div>
    </main>
  );
}
