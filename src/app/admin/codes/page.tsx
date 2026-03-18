"use client";

import React, { useState, useEffect } from 'react';
import { 
  Key, 
  Trash2, 
  Copy, 
  Check, 
  Clock, 
  AlertCircle,
  Search,
  Filter,
  Plus,
  Loader2,
  RefreshCcw,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { collection, query, getDocs, addDoc, deleteDoc, doc, serverTimestamp, orderBy, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface CodeEntry {
  id: string;
  code: string;
  user: string;
  status: 'Aktif' | 'Süresi Doldu' | 'Kullanıldı';
  createdAt?: any;
  payment?: string;
}

export default function CodeManagement() {
  const [codes, setCodes] = useState<CodeEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setMounted(true);
    fetchCodes();
  }, []);

  const fetchCodes = async () => {
    if (loading) return;
    setLoading(true);
    try {
      // Not: Sadece createdAt alanı olan dökümanlar için query çalışır.
      // Eğer bir dökümanın createdAt alanı yoksa listede gözükmez.
      const q = query(collection(db, "codes"), limit(100));
      const querySnapshot = await getDocs(q);
      const codeList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as CodeEntry[];
      
      // Client-side sorting as a fallback
      codeList.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
      
      setCodes(codeList);
    } catch (err) {
      console.error("Kod listeleme hatası:", err);
    } finally {
      setLoading(false);
    }
  };

  const generateCode = async () => {
    setLoading(true);
    try {
      const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
      let r1 = '';
      for (let i = 0; i < 4; i++) r1 += chars.charAt(Math.floor(Math.random() * chars.length));
      const r2 = chars.charAt(Math.floor(Math.random() * chars.length));
      const result = `TB-${r1}-${r2}`;
      
      await addDoc(collection(db, "codes"), {
        code: result,
        user: 'YÖNETİCİ GENEL',
        status: 'Aktif',
        payment: 'MANUEL',
        createdAt: serverTimestamp()
      });
      
      await fetchCodes();
    } catch (err) {
      console.error("Kod üretim hatası:", err);
      alert("Kod üretilemedi!");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCode = async (id: string, codeStr: string) => {
    if (!confirm(`${codeStr} kodunu kalıcı olarak silmek istediğinizden emin misiniz?`)) return;
    setLoading(true);
    try {
      await deleteDoc(doc(db, "codes", id));
      await fetchCodes();
    } catch (err) {
      console.error("Kod silme hatası:", err);
      alert("Silme işlemi başarısız.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Simple notification can be added here
  };

  const filteredCodes = codes.filter(c => 
    c.code.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.user.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!mounted) return null;

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-white uppercase italic">KOD PROTOKOLLERİ</h1>
          <p className="text-[10px] text-white/30 font-black uppercase tracking-[0.3em] mt-1 pl-1">Erişim Anahtarları ve Süre Kontrol Merkezi</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={fetchCodes}
            className="p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all group"
          >
            <RefreshCcw className={`w-4 h-4 text-white/40 group-hover:text-primary transition-all ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button 
            onClick={generateCode}
            disabled={loading}
            className="btn-primary py-4 px-8 text-[11px] font-black uppercase tracking-[0.2em] flex items-center gap-3 shadow-3xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
          >
            <Plus className="w-4 h-4" /> YENİ ANAHTAR ÜRET
          </button>
        </div>
      </div>

      {/* Info Status */}
      <div className="bg-primary/5 border border-primary/20 p-6 rounded-[2rem] flex flex-col md:flex-row items-center gap-6 group">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 shadow-inner group-hover:scale-110 transition-transform">
             <ShieldCheck className="w-6 h-6 text-primary" />
          </div>
          <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] flex-1 text-center md:text-left leading-relaxed">
            SİSTEM ÜZERİNDEN ÜRETİLEN TÜM ANAHTARLAR <span className="text-primary italic">24 SAATLİK RAM DÖNGÜSÜNE</span> TABİDİR. 
            SÜRESİ DOLAN ANAHTARLAR ANALİZ MODÜLLERİNE ERİŞİM SAĞLAYAMAZ VE SİSTEMDEN KALICI OLARAK TEMİZLENİR.
          </p>
          <div className="flex items-center gap-2 px-4 py-2 bg-black/40 rounded-full border border-white/5">
             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
             <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">PROTOCOL_OK</span>
          </div>
      </div>

      {/* Table Card */}
      <div className="glass-card overflow-hidden bg-[#0a0a0c] border-white/5 shadow-3xl">
        {/* Table Controls */}
        <div className="p-8 border-b border-white/5 bg-white/[0.02] flex flex-col md:flex-row items-center gap-6">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
            <input 
              type="text" 
              placeholder="ANAHTAR VEYA KULLANICI REFERANSI İLE ARA..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-2xl pl-16 pr-8 py-5 text-[10px] font-black tracking-[0.3em] placeholder:text-white/10 focus:outline-none focus:border-primary/40 transition-all uppercase text-white shadow-inner"
            />
          </div>
          <div className="flex gap-4 w-full md:w-auto">
             <button className="flex-1 md:flex-none px-6 py-5 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-all flex items-center justify-center gap-3 group">
               <Filter className="w-4 h-4 text-white/20 group-hover:text-white transition-colors" />
               <span className="text-[10px] font-black text-white/20 group-hover:text-white tracking-widest uppercase">Filtrele</span>
             </button>
          </div>
        </div>

        {/* Table Header (Desktop) */}
        <div className="hidden md:grid grid-cols-12 gap-4 px-8 py-4 bg-white/[0.01] border-b border-white/5 text-[9px] font-black text-white/20 uppercase tracking-[0.3em]">
           <div className="col-span-4 pl-12">ANAHTAR BİLGİSİ</div>
           <div className="col-span-3 text-center">OLUŞTURULMA</div>
           <div className="col-span-3 text-center">DURUM / PROTOKOL</div>
           <div className="col-span-2 text-right">EYLEMLER</div>
        </div>

        {/* Table Content */}
        <div className="divide-y divide-white/5">
          {loading && codes.length === 0 && (
            <div className="p-24 text-center space-y-4">
              <Loader2 className="w-10 h-10 text-primary animate-spin mx-auto" />
              <div className="text-[10px] font-black text-white/20 uppercase tracking-widest">BULUT VERİLERİ SORGULANIYOR...</div>
            </div>
          )}
          {!loading && filteredCodes.length === 0 && (
            <div className="p-24 text-center text-white/10 uppercase font-black text-[12px] tracking-[0.4em] italic">
              KRİTERLERE UYGUN ANAHTAR BULUNAMADI.
            </div>
          )}
          {filteredCodes.map((code) => (
            <div key={code.id} className="p-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-center hover:bg-white/[0.01] transition-all group">
              
              {/* Key Info Column */}
              <div className="md:col-span-4 flex items-center gap-6">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border transition-all duration-500 shadow-2xl ${
                  code.status === 'Aktif' ? 'bg-primary/10 border-primary/20 group-hover:rotate-[15deg]' : 'bg-white/5 border-white/5'
                }`}>
                  <Key className={`w-6 h-6 ${code.status === 'Aktif' ? 'text-primary' : 'text-white/10'}`} />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="text-xl font-black tracking-tighter uppercase group-hover:text-primary transition-colors text-white">{code.code}</span>
                    <button 
                      onClick={() => copyToClipboard(code.code)}
                      className="text-white/10 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-lg"
                    >
                      <Copy className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] italic">{code.user}</div>
                </div>
              </div>

              {/* Time Column */}
              <div className="md:col-span-3 text-center">
                 <div className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-1 flex items-center justify-center gap-2">
                    <Clock className="w-3 h-3" /> SYNC_TIME
                 </div>
                 <div className="font-mono text-xs font-black text-white/40 tracking-widest uppercase">
                    {code.createdAt ? new Date(code.createdAt.seconds * 1000).toLocaleTimeString() : 'INIT_TIME'}
                 </div>
              </div>

              {/* Status Column */}
              <div className="md:col-span-3 flex justify-center">
                <div className={`px-6 py-2 rounded-2xl text-[9px] font-black uppercase tracking-widest border transition-all flex items-center gap-3 ${
                  code.status === 'Aktif' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400 shadow-xl shadow-emerald-500/5' : 
                  'bg-rose-500/10 border-rose-500/20 text-rose-500 opacity-40'
                }`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${code.status === 'Aktif' ? 'bg-emerald-400 animate-pulse' : 'bg-rose-500'}`}></div>
                  {code.status}
                </div>
              </div>

              {/* Actions Column */}
              <div className="md:col-span-2 flex items-center justify-end gap-3">
                  <button 
                    onClick={() => handleDeleteCode(code.id, code.code)}
                    disabled={loading}
                    className="p-4 bg-rose-500/5 text-rose-500/40 border border-rose-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-all hover:bg-rose-500 hover:text-white hover:border-transparent shadow-2xl shadow-rose-500/20 disabled:opacity-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button className="p-4 bg-white/5 text-white/20 border border-white/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-all hover:text-white">
                    <ChevronRight className="w-4 h-4" />
                  </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
