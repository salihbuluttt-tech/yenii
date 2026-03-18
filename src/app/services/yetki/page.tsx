"use client";

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Key, Shield, CheckCircle2, Loader2, FileCheck, Info, Scale } from 'lucide-react';

export default function YetkiBelgesiPage() {
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setCompleted(true);
    }, 2500);
  };

  return (
    <main className="min-h-screen bg-[#0a0a0c]">
      <Navbar />
      
      <div className="container mx-auto px-6 pt-32 pb-24">
        <div className="max-w-5xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-500/10 border border-zinc-500/20 text-zinc-400 text-xs font-bold uppercase tracking-widest">
              <Key className="w-3 h-3" /> Dijital Yetki Belgesi Modülü
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight">
              Süreli Satış <span className="text-primary text-zinc-400">Yetkilendirme</span>
            </h1>
            <p className="text-white/40 max-w-xl mx-auto font-medium leading-relaxed uppercase text-[11px] tracking-widest">
              Taşınmaz Ticareti Hakkında Yönetmelik Uyarınca Dijital Mühürlü Yetki Sözleşmesi.
            </p>
          </div>

          {!completed ? (
            <div className="glass-card overflow-hidden border-white/5 bg-white/[0.02] flex flex-col md:flex-row shadow-2xl">
              {/* Form Section */}
              <div className="flex-[1.5] p-8 md:p-12 space-y-8 border-r border-white/5">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-white/40 uppercase tracking-widest pl-1">Mülk Sahibi Bilgileri</label>
                       <input type="text" placeholder="Ad Soyad / Şirket Ünvanı" required className="w-full bg-[#0a0a0c] border border-white/10 rounded-xl px-4 py-3 text-white text-xs font-bold outline-none focus:border-white/40 transition-all" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-white/40 uppercase tracking-widest pl-1">Emlak İşletmesi</label>
                       <input type="text" placeholder="Yetki Belge No / Firma Adı" required className="w-full bg-[#0a0a0c] border border-white/10 rounded-xl px-4 py-3 text-white text-xs font-bold outline-none focus:border-white/40 transition-all" />
                    </div>
                  </div>

                  <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-white/40 text-[10px] leading-relaxed uppercase tracking-widest font-bold">
                    <div className="flex items-center gap-2 text-primary mb-2">
                       <Info className="w-3 h-3" /> YASAL BİLGİ
                    </div>
                    BU SÖZLEŞME, 6098 SAYILI TÜRK BORÇLAR KANUNU VE TAŞINMAZ TİCARETİ YÖNETMELİĞİ MADDELERİNCE DÜZENLENMİŞ OLUP, DİJİTAL İMZA İLE RESMİ GEÇERLİLİĞE SAHİPTİR.
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-white/40 uppercase tracking-widest pl-1">Sözleşme Süresi (Gün)</label>
                       <select className="w-full bg-[#0a0a0c] border border-white/10 rounded-xl px-4 py-3 text-white text-xs font-bold outline-none">
                          <option>90 GÜN</option>
                          <option>180 GÜN</option>
                          <option>360 GÜN</option>
                       </select>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-white/40 uppercase tracking-widest pl-1">Komisyon Oranı (%)</label>
                       <input type="number" placeholder="%2" className="w-full bg-[#0a0a0c] border border-white/10 rounded-xl px-4 py-3 text-white text-xs font-bold outline-none" />
                    </div>
                  </div>

                  <button 
                    type="submit"
                    disabled={loading}
                    className="w-full py-5 bg-white text-black font-black text-xs uppercase tracking-[0.2em] rounded-2xl hover:bg-zinc-200 transition-all flex items-center justify-center gap-3"
                  >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "SÖZLEŞMEYİ MÜHÜRLER"}
                  </button>
                </form>
              </div>

              {/* Sidebar Info */}
              <div className="flex-1 p-8 bg-white/5 space-y-8">
                 <div className="space-y-6">
                    <div className="flex items-center gap-3">
                       <Scale className="w-5 h-5 text-primary" />
                       <h4 className="text-xs font-black uppercase tracking-widest text-white">Hukuksal Şoförlük</h4>
                    </div>
                    <ul className="space-y-4 text-[9px] font-bold text-white/30 uppercase tracking-[0.1em] leading-loose">
                      <li>• Portföyün pazarlanması sırasında uygulanacak stratejik vergi ve tapu devri danışmanlığı.</li>
                      <li>• Alıcı adaylarının mali yeterlilik teyidi ve risk analizi.</li>
                      <li>• Sözleşme süresince başka bir aracıya yetki verilmemesi tahahhüdü.</li>
                      <li>• Cayma durumunda oluşacak makul tazminat maddeleri.</li>
                    </ul>
                 </div>
              </div>
            </div>
          ) : (
            <div className="glass-card p-12 text-center space-y-10 border-emerald-500/20 bg-emerald-500/5 animate-in zoom-in-95 duration-700">
               <div className="w-24 h-24 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto border border-emerald-500/40">
                  <FileCheck className="w-12 h-12 text-emerald-400" />
               </div>
               
               <div className="space-y-4">
                  <h2 className="text-4xl font-black text-white uppercase tracking-tight">DİJİTAL YETKİ MÜHÜRLENDİ</h2>
                  <div className="max-w-2xl mx-auto p-8 bg-[#0a0a0c] border border-white/5 rounded-3xl text-left font-serif text-[11px] leading-relaxed text-white/60 shadow-2xl h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10">
                    <p className="font-bold text-center text-white mb-4 uppercase underline">TAŞINMAZ GÖSTERME VE YETKİLEME SÖZLEŞMESİ</p>
                    <p className="mb-4">İşbu Sözleşme, mülk sahibi veya yasal vekili (bundan böyle "İŞ SAHİBİ" olarak anılacaktır) ile emlak işletmesi (bundan böyle "ARACI" olarak anılacaktır) arasında, aşağıda belirtilen şartlar dâhilinde dijital ortamda mühürlenerek tanzim edilmiştir.</p>
                    <p className="font-bold mb-2">1. KONU VE KAPSAM</p>
                    <p className="mb-4">İŞ SAHİBİ, mülkiyetinde bulunan taşınmazın satışı/kiralanması hususunda ARACI'yı süreli olarak tam yetkilendirmiştir. ARACI, taşınmazın pazarlanması, alıcı adaylarına gösterilmesi ve tapu işlemlerine rehberlik edilmesi süreçlerini yürütecektir.</p>
                    <p className="font-bold mb-2">2. ÜCRET VE KOMİSYON</p>
                    <p className="mb-4">Satış işleminin gerçekleşmesi halinde, ARACI, satış bedelinin %2'si oranında (KDV hariç) hizmet bedeline hak kazanır. Söz konusu bedel, tapu tescil anında muaccel hale gelir.</p>
                    <p className="font-bold mb-2">3. MÜNHASIRLIK VE TAZMİNAT</p>
                    <p className="mb-4">İşbu yetkilendirme süresince İŞ SAHİBİ, başka bir aracıya yetki veremez. Sözleşmeye aykırı hareket edilmesi durumunda ARACI'nın hak kazandığı hizmet bedeli tutarında cezai şart uygulanır.</p>
                    <p className="text-[9px] mt-8 italic text-white/30 italic">Not: Bu belge SHA-256 algoritması ile TrustBridge protokolü tarafından mühürlenmiş olup, 17169 Sayılı Kanun ve Elektronik İmza Kanunu uyumludur.</p>
                  </div>
               </div>

               <div className="flex justify-center gap-4">
                  <button className="px-12 py-5 bg-emerald-500 text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-2xl shadow-emerald-500/30">
                    SÖZLEŞMEYİ İNDİR (PDF)
                  </button>
                  <button onClick={() => setCompleted(false)} className="px-12 py-5 bg-white/5 text-white/40 font-black text-xs uppercase tracking-widest rounded-2xl">
                    YENİ FORM
                  </button>
               </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
