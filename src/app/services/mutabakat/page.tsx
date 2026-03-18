"use client";

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { 
  Users, Key, CreditCard, ShieldCheck, Clock, ArrowRight, CheckCircle2, 
  Loader2, FileText, Smartphone, Copy, Share2, Lock, Upload, Zap, 
  UserCircle2, AlertTriangle, FileDown, EyeOff 
} from 'lucide-react';

// SENARYO ADIMLARI
type Step = 
  | 'INITIAL_CODE_WINDOW' 
  | 'PACKAGE_SELECTION' 
  | 'PAYMENT_IFRAME' 
  | 'CODE_RECOVERY_POPUP' 
  | 'ROLE_CHOICE' 
  | 'SUBJECT_DETAIL' 
  | 'PERSONAL_INFO' 
  | 'MUTABAKAT_DESK' 
  | 'FINAL_REPORT';

export default function MutabakatPage() {
  const [step, setStep] = useState<Step>('INITIAL_CODE_WINDOW');
  const [accessCodeInput, setAccessCodeInput] = useState('');
  const [orderNumber, setOrderNumber] = useState('');
  const [manualPackageType, setManualPackageType] = useState('100');
  const [generatedCodeForUser, setGeneratedCodeForUser] = useState('');
  const [selectedRole, setSelectedRole] = useState<'ALICI' | 'SATICI' | null>(null);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(3600); // Varsayılan 1 saat
  const [inviteCode, setInviteCode] = useState('INV-' + Math.random().toString(36).substring(2, 7).toUpperCase());

  // Kullanıcı Verileri
  const [form, setForm] = useState({
    konu: '',
    ad: '',
    soyad: '',
    tc: '',
    telefon: '',
    adres: ''
  });

  // ÖDEME SONRASI 5 SANIYELIK BEKLEME VE KOD ÜRETME
  const processPaymentStep = () => {
    setLoading(true);
    setTimeout(() => {
      const code = `TRST-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
      setGeneratedCodeForUser(code);
      setLoading(false);
      setStep('CODE_RECOVERY_POPUP');
    }, 5000);
  };

  // KODLA GİRİŞ KONTROLÜ
  const checkAccessCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (accessCodeInput.length > 4) {
      setStep('ROLE_CHOICE');
    } else {
      alert("Lütfen geçerli bir mutabakat kodu girin!");
    }
  };

  return (
    <main className="min-h-screen bg-[#070709] text-white font-sans selection:bg-primary/30">
      <Navbar />
      
      <div className="container mx-auto px-6 pt-32 pb-24 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-4xl">
          
          {/* 1. ADIM: GİRİŞ KODU PENCERESİ */}
          {step === 'INITIAL_CODE_WINDOW' && (
            <div className="glass-card p-12 text-center space-y-8 animate-in zoom-in duration-500 max-w-lg mx-auto border-white/5 shadow-2xl">
              <div className="w-20 h-20 rounded-3xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto shadow-inner">
                <Key className="w-10 h-10 text-primary" />
              </div>
              <div className="space-y-4">
                <h1 className="text-3xl font-black uppercase tracking-tighter">Mutabakat Protokolü</h1>
                <p className="text-white/30 font-bold uppercase text-[9px] tracking-[0.3em]">Hizmete erişmek için mühürlü kodunuzu girin</p>
              </div>
              <form onSubmit={checkAccessCode} className="space-y-4">
                <input 
                  type="text" 
                  autoFocus
                  placeholder="GİRİŞ KODU"
                  value={accessCodeInput}
                  onChange={(e) => setAccessCodeInput(e.target.value.toUpperCase())}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-center text-2xl font-black tracking-[0.4em] focus:border-primary focus:ring-1 ring-primary/50 outline-none transition-all placeholder:tracking-normal placeholder:text-[10px] placeholder:font-black placeholder:opacity-20"
                />
                <button className="w-full btn-primary py-5 font-black uppercase tracking-widest text-[10px] shadow-2xl shadow-primary/20">OTURUMU BAŞLAT</button>
              </form>
              <div className="pt-2">
                <button 
                  onClick={() => setStep('PACKAGE_SELECTION')}
                  className="text-white/20 text-[10px] font-black uppercase tracking-widest hover:text-primary transition-colors border-b border-transparent hover:border-primary"
                >
                  KODUNUZ YOK MU? SATIN ALIN →
                </button>
              </div>
            </div>
          )}

          {/* 2. ADIM: PAKET SEÇİM SAYFASI */}
          {step === 'PACKAGE_SELECTION' && (
            <div className="space-y-12 animate-in slide-in-from-bottom-8 duration-500">
               <div className="text-center space-y-4">
                  <h2 className="text-5xl font-black uppercase tracking-tighter">HİZMET PAKETLERİ</h2>
                  <p className="text-white/40 font-bold uppercase text-[10px] tracking-[0.3em]">Mutabakat süresini belirleyin</p>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    { id: '100', t: "1 SAATLİK KOD", p: "100", desc: "Hızlı Tek Seferlik Belge Teyidi.", url: "https://www.shopier.com/fidorax/44846416" },
                    { id: '1250', t: "AYLIK KOD", p: "1250", desc: "Sınırsız Karşılıklı Mutabakat.", url: "https://www.shopier.com/fidorax/44846597", best: true },
                    { id: '3250', t: "YILLIK KOD", p: "3250", desc: "Tam Kapsamlı Kurumsal Yetki Belgesi.", url: "https://www.shopier.com/fidorax/44846604" },
                  ].map((pkg) => (
                    <div 
                      key={pkg.id} 
                      onClick={() => { setManualPackageType(pkg.id); setStep('PAYMENT_IFRAME'); }}
                      className={`glass-card p-10 group cursor-pointer border-white/5 hover:border-primary/50 transition-all ${pkg.best ? 'ring-2 ring-primary relative bg-primary/5' : ''}`}
                    >
                      {pkg.best && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-black text-[10px] font-black px-6 py-1 rounded-full uppercase tracking-widest">En Verimli</div>}
                      <div className="text-[11px] font-black text-primary uppercase tracking-[0.2em] mb-4">{pkg.t}</div>
                      <div className="text-5xl font-black mb-2 tracking-tighter">₺{pkg.p}</div>
                      <p className="text-white/30 text-[10px] font-bold uppercase mb-10 leading-relaxed italic">{pkg.desc}</p>
                      <div className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl text-center text-[10px] font-black uppercase group-hover:bg-primary group-hover:text-black transition-all">PAKETİ SEÇ</div>
                    </div>
                  ))}
               </div>
            </div>
          )}

          {/* 3. ADIM: AYNI SAYFADA ÖDEME EKRANI (IFRAME) */}
          {step === 'PAYMENT_IFRAME' && (
            <div className="space-y-8 animate-in slide-in-from-right-8 duration-500 max-w-3xl mx-auto">
               <div className="glass-card overflow-hidden shadow-2xl border-primary/20">
                  <div className="p-4 bg-white/5 border-b border-white/10 flex items-center justify-between px-8">
                     <div className="flex items-center gap-3">
                        <Lock className="w-4 h-4 text-primary" />
                        <span className="text-[10px] font-black uppercase text-white/50 tracking-widest">GÜVENLİ SHOPIER ÖDEME KANALI</span>
                     </div>
                     <button onClick={() => setStep('PACKAGE_SELECTION')} className="text-[9px] font-black text-rose-500 uppercase hover:underline">Vazgeç</button>
                  </div>
                  <div className="w-full bg-white h-[500px]">
                     <iframe 
                        src={`https://www.shopier.com/fidorax/${manualPackageType === '100' ? '44846416' : manualPackageType === '1250' ? '44846597' : '44846604'}`}
                        className="w-full h-full border-none"
                     />
                  </div>
               </div>

               {/* ÖDEME ALTI MANUEL SEÇİM VE SİPARİŞ NO */}
               <div className="glass-card p-10 border-primary/20 bg-primary/5 space-y-8">
                  <div className="text-center space-y-3">
                     <h3 className="text-lg font-black uppercase tracking-widest text-primary">Ödeme Doğrulama</h3>
                     <p className="text-white/30 text-[10px] font-bold uppercase">Shopier tarafından verilen bilgileri girin</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="space-y-2">
                        <label className="text-[9px] font-black text-white/40 uppercase tracking-widest pl-1">SİPARİŞ NUMARASI</label>
                        <input 
                          type="text" 
                          placeholder="Örn: 991203" 
                          value={orderNumber}
                          onChange={(e) => setOrderNumber(e.target.value)}
                          className="w-full bg-[#0a0a0c] border border-white/10 rounded-2xl px-6 py-4 text-white font-bold outline-none focus:border-primary transition-all"
                        />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[9px] font-black text-white/40 uppercase tracking-widest pl-1">ALINAN PAKET (MANUEL SEÇİM)</label>
                        <select 
                          value={manualPackageType}
                          onChange={(e) => setManualPackageType(e.target.value)}
                          className="w-full bg-[#0a0a0c] border border-white/10 rounded-2xl px-6 py-4 text-white font-black text-xs uppercase outline-none"
                        >
                          <option value="100">SAATLİK PAKET (100 TL)</option>
                          <option value="1250">AYLIK PAKET (1250 TL)</option>
                          <option value="3250">YILLIK PAKET (3250 TL)</option>
                        </select>
                     </div>
                  </div>
                  <button 
                    onClick={processPaymentStep}
                    disabled={!orderNumber || loading}
                    className="w-full py-5 bg-primary text-black font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl shadow-primary/30 flex items-center justify-center gap-3 active:scale-95 disabled:opacity-20 transition-all font-black"
                  >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "KODUMU ÜRET VE ONAYLA"}
                  </button>
               </div>
            </div>
          )}

          {/* 4. ADIM: KODU GÖSTER VE KAYDETME UYARISI */}
          {step === 'CODE_RECOVERY_POPUP' && (
            <div className="glass-card p-12 text-center space-y-10 animate-in zoom-in-95 duration-500 max-w-xl mx-auto border-emerald-500/30">
               <div className="w-24 h-24 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto shadow-2xl shadow-emerald-500/10">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400" />
               </div>
               <div className="space-y-4 text-center">
                  <h2 className="text-3xl font-black uppercase">Kodunuz Hazır!</h2>
                  <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-400 text-[10px] font-black uppercase tracking-widest animate-pulse">
                     DİKKAT: BU KODU KAYDEDİN, EKRANI KAPATTIĞINIZDA TEKRAR GÖSTERİLMEYECEKTİR!
                  </div>
               </div>
               <div className="p-8 bg-white/5 border border-white/10 rounded-3xl relative group">
                  <div className="text-4xl font-black tracking-[0.4em] text-primary">{generatedCodeForUser}</div>
                  <button onClick={() => { navigator.clipboard.writeText(generatedCodeForUser); alert("Kod Kopyalandı!"); }} className="absolute top-4 right-4 p-2 text-white/20 hover:text-white transition-all"><Copy className="w-4 h-4" /></button>
               </div>
               <button 
                 onClick={() => setStep('INITIAL_CODE_WINDOW')}
                 className="w-full py-5 bg-white text-black font-black text-xs uppercase tracking-[0.2em] rounded-2xl shadow-2xl hover:bg-zinc-200 transition-all"
               >
                 KODU KAYDETTİM, ANA GİRİŞE DÖN
               </button>
            </div>
          )}

          {/* 5. ADIM: ROL SEÇİMİ (ALICI - SATICI) */}
          {step === 'ROLE_CHOICE' && (
            <div className="space-y-10 animate-in slide-in-from-right-8 duration-500 max-w-3xl mx-auto">
               <div className="text-center space-y-4">
                  <h2 className="text-4xl font-black uppercase tracking-tighter">İşlem Kimliği Belirle</h2>
                  <p className="text-white/30 text-[10px] uppercase font-black tracking-widest italic">Masadaki konumunuzu seçin (Seçtiğiniz buton pasifleşecektir)</p>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <button 
                    onClick={() => { setSelectedRole('ALICI'); setStep('SUBJECT_DETAIL'); }}
                    className={`glass-card p-16 border-white/5 hover:border-primary/50 group transition-all ${selectedRole === 'SATICI' ? 'opacity-20 grayscale pointer-events-none' : ''}`}
                  >
                     <UserCircle2 className="w-20 h-20 text-indigo-400 mx-auto mb-8 group-hover:scale-110 transition-transform" />
                     <h3 className="text-3xl font-black uppercase tracking-tight">ALICI</h3>
                     <p className="text-[9px] font-bold text-white/20 uppercase mt-2 tracking-widest">PORTFÖYE TÜLIP EDEN TARAF</p>
                  </button>
                  <button 
                    onClick={() => { setSelectedRole('SATICI'); setStep('SUBJECT_DETAIL'); }}
                    className={`glass-card p-16 border-white/5 hover:border-primary/50 group transition-all ${selectedRole === 'ALICI' ? 'opacity-20 grayscale pointer-events-none' : ''}`}
                  >
                     <Users className="w-20 h-20 text-amber-500 mx-auto mb-8 group-hover:scale-110 transition-transform" />
                     <h3 className="text-3xl font-black uppercase tracking-tight">SATICI</h3>
                     <p className="text-[9px] font-bold text-white/20 uppercase mt-2 tracking-widest">PORTFÖY SAHİBİ VEYA TEMSİLCİSİ</p>
                  </button>
               </div>
            </div>
          )}

          {/* 6. ADIM: KONU BAŞLIĞI DETAYI (YAPAY ZEKA İÇİN) */}
          {step === 'SUBJECT_DETAIL' && (
            <div className="glass-card p-12 space-y-8 animate-in slide-in-from-bottom-8 duration-500 max-w-2xl mx-auto border-primary/20 shadow-2xl">
               <div className="flex items-center gap-4 border-b border-white/5 pb-8">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <Zap className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black uppercase text-white">Mutabakat Konusu</h3>
                    <p className="text-white/30 text-[9px] font-black uppercase tracking-widest">Yapay zeka analizini bu temel üzerinden yapacaktır</p>
                  </div>
               </div>
               <div className="space-y-4">
                  <label className="text-[10px] font-black text-white/50 uppercase tracking-[0.2em] pl-1">Belge Konu Başlığı ve Kısa Detay</label>
                  <textarea 
                    autoFocus
                    rows={5}
                    placeholder="Örn: Kadıköy Göztepe Mah. 1290 Ada 4 Parseldeki mülkün satışına dair tapu ve fon kanıtı mutabakatı..."
                    value={form.konu}
                    onChange={(e) => setForm({...form, konu: e.target.value})}
                    className="w-full bg-[#0a0a0c] border border-white/10 rounded-3xl px-6 py-6 text-white font-medium outline-none focus:border-primary transition-all resize-none"
                  />
               </div>
               <button 
                 onClick={() => setStep('PERSONAL_INFO')}
                 disabled={form.konu.length < 10}
                 className="w-full py-5 bg-primary text-black font-black text-xs uppercase tracking-widest rounded-2xl shadow-2xl shadow-primary/20 disabled:opacity-20 transition-all active:scale-95"
               >
                 DEVAM ET: ŞAHSİ BİLGİLER →
               </button>
            </div>
          )}

          {/* 7. ADIM: KULLANICI ŞAHSİ BİLGİLERİ (TC 8 VE 11) */}
          {step === 'PERSONAL_INFO' && (
            <div className="glass-card p-12 space-y-10 animate-in fade-in duration-500 max-w-3xl mx-auto border-white/10 shadow-2xl">
               <div className="space-y-3 border-b border-white/5 pb-8">
                  <h3 className="text-3xl font-black uppercase tracking-tighter">Kimlik Doğrulama</h3>
                  <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.2em]">Yasal mutabakat raporu için gerekli veriler</p>
               </div>
               <form onSubmit={(e) => { e.preventDefault(); setStep('MUTABAKAT_DESK'); }} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-white/40 uppercase tracking-widest pl-1">ADINIZ</label>
                        <input type="text" required value={form.ad} onChange={(e) => setForm({...form, ad: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-bold outline-none focus:border-primary" />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-white/40 uppercase tracking-widest pl-1">SOYADINIZ</label>
                        <input type="text" required value={form.soyad} onChange={(e) => setForm({...form, soyad: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-bold outline-none focus:border-primary" />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-white/40 uppercase tracking-widest pl-1">TC NO (8. VE 11. HANELERE DİKKAT)</label>
                        <input type="text" maxLength={11} required value={form.tc} onChange={(e) => setForm({...form, tc: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-bold outline-none focus:border-primary tracking-widest" />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-white/40 uppercase tracking-widest pl-1">TELEFON</label>
                        <input type="tel" required value={form.telefon} onChange={(e) => setForm({...form, telefon: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-bold outline-none focus:border-primary" />
                     </div>
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-black text-white/40 uppercase tracking-widest pl-1">ADRES</label>
                     <input type="text" required value={form.adres} onChange={(e) => setForm({...form, adres: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-bold outline-none focus:border-primary" />
                  </div>
                  <button type="submit" className="w-full py-5 bg-primary text-black font-black text-xs uppercase tracking-widest rounded-2xl shadow-2xl shadow-primary/20 transition-all hover:bg-white">
                    MASAYI KUR VE BELGE YÜKLEMEYE GEÇ
                  </button>
               </form>
            </div>
          )}

          {/* 8. ADIM: MUTABAKAT MASASI (DASHBOARD) */}
          {step === 'MUTABAKAT_DESK' && (
            <div className="space-y-10 animate-in fade-in duration-700">
               {/* Dashboard Top Bar */}
               <div className="glass-card p-10 flex flex-col md:flex-row justify-between items-center gap-10 border-white/10 shadow-3xl bg-white/[0.02]">
                  <div className="text-center md:text-left space-y-2">
                     <div className="text-[10px] font-black text-rose-500 uppercase tracking-widest flex items-center justify-center md:justify-start gap-2">
                        <Clock className="w-4 h-4 animate-pulse" /> KALAN MUTABAKAT SÜRESİ
                     </div>
                     <div className="text-5xl font-black text-white tracking-widest font-mono">59:59:52</div>
                  </div>
                  
                  <div className="flex-1 max-w-md w-full p-6 bg-[#0a0a0c] border border-white/10 rounded-3xl space-y-6">
                     <div className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] text-center">DAVET KODU ÜRETİLDİ</div>
                     <div className="flex gap-2">
                        <div className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-xs font-black tracking-widest text-primary flex items-center justify-center font-mono">
                           {inviteCode}
                        </div>
                        <button onClick={() => { navigator.clipboard.writeText(inviteCode); alert("Davet Kodu Kopyalandı!"); }} className="p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-all shadow-inner"><Copy className="w-4 h-4 text-white/40" /></button>
                        <button className="p-4 bg-emerald-500/10 hover:bg-emerald-500/20 rounded-xl transition-all border border-emerald-500/20 shadow-xl shadow-emerald-500/10"><Smartphone className="w-4 h-4 text-emerald-400" /></button>
                     </div>
                     <div className="text-[9px] font-black text-white/20 uppercase tracking-widest text-center italic">WhatsApp veya Link ile karşı tarafı masaya çağırın.</div>
                  </div>
               </div>

               {/* Belge Yükleme Alanı */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  {/* Taraf 1 (Siz) */}
                  <div className="space-y-6 animate-in slide-in-from-left-8 duration-500">
                     <h4 className="text-[10px] font-black text-primary uppercase tracking-[0.2em] px-2 flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div> SİZ : {selectedRole} TARAFINDASINIZ
                     </h4>
                     <div className="glass-card p-10 border-primary/20 bg-primary/5 space-y-8 min-h-[400px] flex flex-col justify-between">
                        <div className="relative aspect-[4/3] border-2 border-dashed border-white/10 rounded-3xl flex flex-col items-center justify-center group cursor-pointer hover:border-primary/50 transition-all overflow-hidden">
                           {/* Simulated Blurred Content */}
                           <div className="absolute inset-0 bg-white/5 backdrop-blur-3xl opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center z-20">
                              <EyeOff className="w-12 h-12 text-white/40 mb-4" />
                           </div>
                           <Upload className="w-14 h-14 text-white/10 mb-6 group-hover:text-primary transition-all group-hover:scale-110" />
                           <div className="text-center space-y-2 z-10 px-6">
                              <span className="text-[11px] font-black text-white/30 uppercase tracking-[0.2em] block">BELGEYİ BURAYA BIRAKIN</span>
                              <span className="text-[9px] font-bold text-white/10 uppercase block">MAX 20MB (PDF/JPG/PNG)</span>
                           </div>
                        </div>
                        <div className="space-y-3">
                           <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                              <span className="text-white/30">MAHREMİYET MÜHRÜ:</span>
                              <span className="text-emerald-400">AKTİF</span>
                           </div>
                           <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                             <div className="w-1/3 h-full bg-primary"></div>
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Taraf 2 (Davet Edilen) */}
                  <div className="space-y-6 animate-in slide-in-from-right-8 duration-500">
                     <h4 className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] px-2">
                        KARŞI TARAF BEKLENİYOR...
                     </h4>
                     <div className="glass-card p-10 border-white/5 bg-white/[0.01] space-y-8 min-h-[400px] flex flex-col justify-center items-center opacity-40">
                        <div className="w-24 h-24 rounded-full border-2 border-dashed border-white/10 flex items-center justify-center mb-8">
                           <Users className="w-10 h-10 text-white/10" />
                        </div>
                        <div className="text-center space-y-4">
                           <div className="text-[11px] font-black text-white/20 uppercase tracking-[0.2em]">DAVET KABULÜ BEKLENİYOR</div>
                           <div className="flex items-center gap-3 px-6 py-3 bg-white/2 border border-white/5 rounded-2xl">
                              <Loader2 className="w-4 h-4 animate-spin text-white/10" />
                              <span className="text-[9px] font-bold text-white/20 uppercase tracking-[0.3em] font-mono">PENDING_PARTNER...</span>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Action Footer */}
               <div className="pt-12 text-center space-y-8">
                  <div className="max-w-md mx-auto p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl flex items-center gap-4 text-left">
                     <ShieldCheck className="w-8 h-8 text-emerald-500/50" />
                     <p className="text-[9px] font-bold text-emerald-500/50 uppercase leading-relaxed tracking-wider">
                       Yapay zeka belgelerin kaşe, imza, tc ve isim gibi mahrem bölümlerini analiz sırasında otomatik olarak flulaştıracaktır.
                     </p>
                  </div>
                  <button 
                    onClick={() => { setLoading(true); setTimeout(() => { setStep('FINAL_REPORT'); setLoading(false); }, 3000); }}
                    className="btn-primary px-24 py-6 text-sm font-black tracking-[0.4em] uppercase shadow-inner active:scale-95"
                  >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "KARŞILIKLI MUTABAKATI BAŞLAT"}
                  </button>
               </div>
            </div>
          )}

          {/* 9. ADIM: FINAL RAPORU VE HUKUKSAL PDF */}
          {step === 'FINAL_REPORT' && (
            <div className="glass-card p-12 text-center space-y-12 animate-in zoom-in-95 duration-700 bg-white/[0.01]">
               <div className="w-32 h-32 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto shadow-2xl shadow-emerald-500/20 relative">
                  <div className="absolute inset-0 bg-emerald-400 blur-3xl opacity-10 animate-pulse"></div>
                  <ShieldCheck className="w-16 h-16 text-emerald-400 relative z-10" />
               </div>
               
               <div className="space-y-4">
                  <h2 className="text-5xl font-black uppercase tracking-tighter">İşlem Onaylandı</h2>
                  <p className="text-white/40 uppercase text-[10px] font-black tracking-[0.3em]">AI-Powered Legal Verification Successful</p>
               </div>

               <div className="max-w-3xl mx-auto p-12 bg-[#020202] border border-white/5 rounded-[3rem] text-left font-serif text-[12px] leading-relaxed text-white/60 shadow-inner relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-100 transition-all">
                     <div className="w-24 h-24 border-4 border-emerald-500/30 rounded-full flex items-center justify-center text-emerald-500/50 font-black text-[9px] rotate-[25deg] uppercase">
                       ONAYLANDI<br/>MUTABAKAT
                     </div>
                  </div>
                  
                  <div className="border-b border-white/10 pb-6 mb-8 text-center space-y-2">
                    <h3 className="text-xl font-bold text-white uppercase tracking-widest font-sans">MUTABAKAT VE GİZLİLİK PROTOKOLÜ</h3>
                    <p className="text-[9px] font-sans font-black text-white/30 uppercase tracking-[0.4em]">BELGE REF: {generatedCodeForUser || 'TB-CONF-001'}</p>
                  </div>

                  <div className="space-y-6 max-h-[400px] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-white/10">
                    <p className="font-bold text-white">1. TARAFLAR VE KATILIM</p>
                    <p>İşbu mutabakat zaptı, sistem nezdinde kimliği doğrulanmış "Alıcı" ve "Satıcı" taraflar arasında, dijital ortamda mühürlenen belgelerin birbirine uygunluğu ve doğruluğu hususunda tanzim edilmiştir.</p>
                    
                    <p className="font-bold text-white uppercase mt-6">2. MUTABAKAT KONUSU</p>
                    <p className="italic underline italic">"{form.konu}"</p>
                    <p>Yapay zeka analizörleri tarafından yapılan tarama sonucunda, her iki tarafın sunduğu verilerin birbiriyle %100 uyumlu olduğu, mülkiyet ve fon kanıtlarının gerçekliğini koruduğu tespit edilmiştir.</p>

                    <p className="font-bold text-white uppercase mt-6">3. GİZLİLİK VE VERİ GÜVENLİĞİ</p>
                    <p>6698 Sayılı Kişisel Verilerin Korunması Kanunu (KVKK) uyarınca, mutabakat sırasında paylaşılan belgeler sadece analiz amacıyla işlenmiş, tarafların rızası dışında üçüncü kişilerle paylaşılmayacağı taahhüt edilmiştır.</p>

                    <p className="font-bold text-white uppercase mt-6">4. HUKUKSAL DELİL ŞARTI</p>
                    <p>6100 Sayılı Hukuk Muhakemeleri Kanunu madde 193 uyarınca, TrustBridge sistemi üzerinden alınan bu dijital kayıt kesin delil niteliğindedir.</p>
                  </div>
               </div>

               <div className="flex flex-col md:flex-row justify-center gap-6 pt-8">
                  <button className="px-16 py-6 bg-emerald-500 text-black font-black text-xs uppercase tracking-[0.2em] rounded-3xl shadow-3xl shadow-emerald-500/30 hover:bg-white transition-all flex items-center justify-center gap-3">
                    <FileDown className="w-5 h-5" /> MUTABAKAT RAPORUNU İNDİR (PDF)
                  </button>
                  <button onClick={() => setStep('INITIAL_CODE_WINDOW')} className="px-12 py-6 bg-white/5 text-white/40 font-black text-xs uppercase tracking-widest rounded-3xl hover:bg-white/10">
                    YENİ OTURUM
                  </button>
               </div>
            </div>
          )}

        </div>
      </div>
    </main>
  );
}
