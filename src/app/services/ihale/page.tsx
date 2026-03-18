"use client";

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { 
  Building2, 
  UserCircle2, 
  Construction, 
  Briefcase, 
  Globe, 
  Percent, 
  Send, 
  ShieldCheck, 
  Loader2, 
  CheckCircle2, 
  Download, 
  Lock, 
  Table, 
  Eye, 
  FileText,
  Clock,
  ChevronRight,
  TrendingUp,
  ArrowLeft,
  RotateCcw
} from 'lucide-react';
import { useRouter } from 'next/navigation';

type Role = 'SAHIP' | 'MUTEAHHIT' | null;

export default function IhalePage() {
  const router = useRouter();
  const [role, setRole] = useState<Role>(null);
  const [step, setStep] = useState(1); 
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  // Simulated Tenders
  const [tenders, setTenders] = useState([
    { id: 1, company: 'Kaya İnşaat A.Ş.', rate: '%42', web: 'kayainsaat.com', date: '1 saat önce' },
    { id: 2, company: 'Yıldız Yapı Grup', rate: '%45', web: 'yildizyapı.com.tr', date: '3 saat önce' }
  ]);

  // Form States
  const [formData, setFormData] = useState({ company: '', web: '', refs: '', rate: '' });

  useEffect(() => {
    setMounted(true);
    // Oturum Kontrolü
    const saved = localStorage.getItem('tb_session_ihale');
    if (saved) {
      const session = JSON.parse(saved);
      setRole(session.role);
      setStep(session.step);
      setSubmitted(session.submitted || false);
      setFormData(session.formData || { company: '', web: '', refs: '', rate: '' });
    }
  }, []);

  const updateSession = (newStep: number, isDone: boolean = false) => {
    setStep(newStep);
    setSubmitted(isDone);
    localStorage.setItem('tb_session_ihale', JSON.stringify({ 
      role,
      step: newStep, 
      submitted: isDone,
      formData
    }));
  };

  const clearSession = () => {
    if (confirm("Bu ihale oturumunu ve verileri sıfırlamak istediğinize emin misiniz?")) {
      localStorage.removeItem('tb_session_ihale');
      window.location.reload();
    }
  };

  if (!mounted) return null;

  const handleLogin = (r: Role) => {
    setRole(r);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      updateSession(2);
    }, 1500);
  };

  const handleSendTender = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      updateSession(step, true);
    }, 2500);
  };

  return (
    <main className="min-h-screen bg-[#070709] selection:bg-sky-500/30 text-white">
      <Navbar />
      
      <div className="container mx-auto px-6 pt-32 pb-24">
        <div className="max-w-6xl mx-auto space-y-12">
          
          {/* Action Header */}
          <div className="flex items-center justify-between border-b border-white/5 pb-8">
             <button 
              onClick={() => router.push('/')}
              className="flex items-center gap-2 text-[10px] font-black text-sky-500/40 hover:text-white transition-all uppercase tracking-[0.3em] group"
             >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> ANA SAYFAYA DÖN
             </button>
             
             {step > 1 && (
                <button 
                  onClick={clearSession}
                  className="flex items-center gap-2 text-[9px] font-black text-rose-500/40 hover:text-rose-500 transition-all uppercase tracking-[0.3em]"
                >
                   <RotateCcw className="w-3 h-3" /> OTURUMU SIFIRLA
                </button>
             )}
          </div>

          {!submitted ? (
            <div className="space-y-12 animate-in fade-in duration-700">
               {step === 1 && (
                  <div className="text-center space-y-12">
                     <div className="space-y-4">
                        <h1 className="text-5xl font-black italic tracking-tighter uppercase leading-none">İHALE <span className="text-sky-400 italic">ANALİZİ</span></h1>
                        <p className="text-[10px] text-white/20 font-black uppercase tracking-[0.4em] italic leading-relaxed">Kapalı Teklif ve Proje Değerlendirme Protokolü</p>
                     </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl mx-auto">
                        <button onClick={() => handleLogin('SAHIP')} className="glass-card p-12 border-2 border-white/5 hover:border-sky-500 bg-white/[0.02] hover:bg-sky-500/5 transition-all text-center space-y-6 group">
                           <Building2 className="w-12 h-12 text-sky-400 mx-auto group-hover:scale-110 transition-transform" />
                           <h3 className="text-xl font-black uppercase italic tracking-tighter">Arsa Yer Sahibi</h3>
                           <p className="text-[9px] text-white/20 font-bold uppercase tracking-widest leading-relaxed">Teklifleri İzleme ve Analiz Paneli</p>
                        </button>
                        <button onClick={() => handleLogin('MUTEAHHIT')} className="glass-card p-12 border-2 border-white/5 hover:border-amber-500 bg-white/[0.02] hover:bg-amber-500/5 transition-all text-center space-y-6 group">
                           <Construction className="w-12 h-12 text-amber-400 mx-auto group-hover:scale-110 transition-transform" />
                           <h3 className="text-xl font-black uppercase italic tracking-tighter">Müteahhit Firma</h3>
                           <p className="text-[9px] text-white/20 font-bold uppercase tracking-widest leading-relaxed">Davet Koduyla Teklif Sunma Ekranı</p>
                        </button>
                     </div>
                  </div>
               )}

               {step === 2 && role === 'SAHIP' && (
                  <div className="space-y-12 animate-in slide-in-from-left-8 duration-700">
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-[11px] font-black uppercase tracking-widest">
                        <div className="glass-card p-8 bg-sky-500/5 border-sky-500/10 flex items-center gap-6 shadow-2xl">
                           <div className="w-12 h-12 rounded-2xl bg-sky-500/10 flex items-center justify-center border border-sky-500/20"><Table className="w-6 h-6 text-sky-400" /></div>
                           <div><div className="text-[8px] text-white/20 uppercase tracking-widest italic">AKTİF TEKLİFLER</div><div className="text-2xl font-black text-white">{tenders.length} PROJE</div></div>
                        </div>
                        <div className="glass-card p-8 bg-emerald-500/5 border-emerald-500/10 flex items-center gap-6 shadow-2xl">
                           <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20"><TrendingUp className="w-6 h-6 text-emerald-400" /></div>
                           <div><div className="text-[8px] text-white/20 uppercase tracking-widest italic">ORTALAMA ORAN</div><div className="text-2xl font-black text-white">%43.5</div></div>
                        </div>
                        <div className="glass-card p-8 bg-rose-500/5 border-rose-500/10 flex items-center gap-6 shadow-2xl">
                           <div className="w-12 h-12 rounded-2xl bg-rose-500/10 flex items-center justify-center border border-rose-500/20"><Clock className="w-6 h-6 text-rose-400" /></div>
                           <div><div className="text-[8px] text-white/20 uppercase tracking-widest italic">KALAN SÜRE</div><div className="text-2xl font-black text-white">14:22:04</div></div>
                        </div>
                     </div>
                     <div className="glass-card overflow-hidden bg-black/40 border-white/5 shadow-3xl text-center md:text-left">
                        <div className="p-10 border-b border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
                           <div className="space-y-1">
                              <h3 className="text-xs font-black text-white uppercase tracking-[0.4em] flex items-center gap-4"><Eye className="w-5 h-5 text-sky-400" /> GELEN BAŞVURU HAVUZU</h3>
                              <p className="text-[8px] text-white/20 font-black uppercase tracking-widest italic pl-9">TOPLAM {tenders.length} KATILIMCI ANALİZ EDİLDİ</p>
                           </div>
                           <button className="px-8 py-5 bg-white text-black font-black text-[9px] uppercase tracking-[0.2em] rounded-2xl hover:bg-sky-400 transition-all flex items-center gap-4 shadow-3xl active:scale-95"><Download className="w-5 h-5" /> TÜM TEKLİFLERİ PDF İNDİR</button>
                        </div>
                        <div className="overflow-x-auto">
                           <table className="w-full text-left">
                              <thead className="bg-white/[0.02] border-b border-white/5">
                                 <tr>
                                    <th className="px-10 py-6 text-[9px] font-black text-white/20 uppercase tracking-widest">Firma</th>
                                    <th className="px-10 py-6 text-[9px] font-black text-white/20 uppercase tracking-widest">Oran</th>
                                    <th className="px-10 py-6 text-[9px] font-black text-white/20 uppercase tracking-widest">Durum</th>
                                    <th className="px-10 py-6 text-[9px] font-black text-white/20 uppercase tracking-widest text-right">Detay</th>
                                 </tr>
                              </thead>
                              <tbody className="divide-y divide-white/5">
                                 {tenders.map(t => (
                                    <tr key={t.id} className="hover:bg-white/[0.01] transition-all group">
                                       <td className="px-10 py-8 text-sm font-black italic tracking-tight group-hover:text-sky-400 transition-all uppercase">{t.company}</td>
                                       <td className="px-10 py-8 text-2xl font-black text-emerald-400 italic tracking-tighter">{t.rate}</td>
                                       <td className="px-10 py-8 text-[9px] font-bold text-white/20 uppercase tracking-widest italic">{t.date}</td>
                                       <td className="px-10 py-8 text-right"><button className="p-4 bg-white/5 rounded-2xl hover:bg-sky-500 transition-all"><FileText className="w-5 h-5" /></button></td>
                                    </tr>
                                 ))}
                              </tbody>
                           </table>
                        </div>
                     </div>
                  </div>
               )}

               {step === 2 && role === 'MUTEAHHIT' && (
                  <div className="max-w-3xl mx-auto animate-in slide-in-from-right-8 duration-700">
                     <div className="glass-card p-12 bg-white/[0.02] border-white/5 space-y-12 shadow-3xl">
                        <div className="space-y-2 border-b border-white/5 pb-8">
                           <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter leading-none">İHALE <span className="text-amber-400">TEKLİF_MERKEZİ</span></h3>
                           <p className="text-[10px] text-white/20 font-black uppercase tracking-[0.4em] italic leading-relaxed">Resmi kat karşılığı veya proje teklifini sunun.</p>
                        </div>
                        <form className="space-y-10" onSubmit={handleSendTender}>
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-10 font-black uppercase tracking-widest">
                              <div className="space-y-3">
                                 <label className="text-[9px] text-white/40 pl-1 italic">FİRMA ÜNVANI</label>
                                 <input required value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} type="text" placeholder="Limitless Yapı A.Ş." className="w-full bg-black/40 border border-white/10 rounded-2xl p-5 text-sm font-bold outline-none focus:border-amber-500/40" />
                              </div>
                              <div className="space-y-3">
                                 <label className="text-[9px] text-white/40 pl-1 italic">PAY ORANI TEKLİFİ</label>
                                 <input required value={formData.rate} onChange={(e) => setFormData({...formData, rate: e.target.value})} type="text" placeholder="%45" className="w-full bg-black/40 border border-white/10 rounded-2xl p-5 text-2xl font-black text-center text-amber-500 outline-none focus:border-amber-500/40" />
                              </div>
                              <div className="md:col-span-2 space-y-3">
                                 <label className="text-[9px] text-white/40 pl-1 italic">REFERANS PROJELER VE WEB SİTESİ</label>
                                 <textarea required value={formData.refs} onChange={(e) => setFormData({...formData, refs: e.target.value})} rows={3} placeholder="Daha önce bitirilen projeler ve kurumsal web adresi..." className="w-full bg-black/40 border border-white/10 rounded-2xl p-5 text-sm font-bold outline-none focus:border-amber-500/40 resize-none font-sans"></textarea>
                              </div>
                           </div>
                           <button type="submit" className="w-full py-8 bg-amber-500 text-black font-black text-[14px] uppercase tracking-[0.4em] rounded-[2.5rem] shadow-3xl hover:bg-white transition-all flex items-center justify-center gap-5 active:scale-95">{loading ? <Loader2 className="w-6 h-6 animate-spin mx-auto" /> : "TEKLİFİ ŞİFRELE VE GÖNDER"}</button>
                        </form>
                     </div>
                  </div>
               )}
            </div>
          ) : (
            <div className="max-w-2xl mx-auto glass-card p-20 text-center space-y-12 border-emerald-500/20 bg-emerald-500/5 animate-in zoom-in-95 duration-700 shadow-3xl">
               <div className="w-24 h-24 rounded-[3rem] bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto relative shadow-2xl">
                  <div className="absolute inset-0 bg-emerald-500/20 blur-3xl animate-pulse"></div>
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 relative z-10" />
               </div>
               <div className="space-y-4">
                  <h2 className="text-5xl font-black text-white uppercase italic tracking-tighter leading-none text-emerald-400 italic">BAŞARILI</h2>
                  <p className="text-[10px] text-white/30 font-black uppercase tracking-[0.4em] italic leading-relaxed">Teklifiniz şifrelenerek havuzdaki yerini aldı.</p>
               </div>
               <div className="max-w-md mx-auto space-y-6">
                  <button className="w-full flex items-center justify-between p-8 bg-white text-black font-black text-[10px] uppercase tracking-[0.2em] rounded-3xl hover:bg-emerald-500 transition-all group shadow-3xl">
                     <div className="flex items-center gap-4"><Download className="w-6 h-6" /> TEKLIF_BILGI_NOTU.pdf</div>
                     <span className="text-[8px] opacity-20 font-black uppercase italic tracking-widest">Mühürlü_Belge</span>
                  </button>
                  <button onClick={clearSession} className="w-full py-5 bg-white/5 text-white/20 font-black text-[9px] uppercase tracking-[0.3em] rounded-2xl hover:bg-white/10 transition-all border border-white/5 uppercase">YENİ İHALE SÜRECİ</button>
               </div>
            </div>
          )}

        </div>
      </div>
    </main>
  );
}
