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
  RefreshCcw
} from 'lucide-react';
import { collection, query, getDocs, addDoc, deleteDoc, doc, serverTimestamp, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface CodeEntry {
  id: string;
  code: string;
  user: string;
  status: 'Aktif' | 'Süresi Doldu' | 'Kullanıldı';
  createdAt?: any;
}

export default function CodeManagement() {
  const [codes, setCodes] = useState<CodeEntry[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchCodes = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "codes"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const codeList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as CodeEntry[];
      setCodes(codeList);
    } catch (err) {
      console.error("Kod çekme hatası:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCodes();
  }, []);

  const generateCode = async () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let result = 'TB-';
    for (let i = 0; i < 4; i++) result += chars.charAt(Math.floor(Math.random() * chars.length));
    result += '-';
    for (let i = 0; i < 1; i++) result += chars.charAt(Math.floor(Math.random() * chars.length));
    
    try {
      await addDoc(collection(db, "codes"), {
        code: result,
        user: 'Yönetici Tarafından',
        status: 'Aktif',
        createdAt: serverTimestamp()
      });
      alert(`Kod Başarıyla Üretildi: ${result}`);
      fetchCodes();
    } catch (err) {
      alert("Kod üretilemedi.");
    }
  };

  const handleDeleteCode = async (id: string) => {
    if (!confirm("Bu kodu silmek istediğinizden emin misiniz?")) return;
    try {
      await deleteDoc(doc(db, "codes", id));
      alert("Kod silindi.");
      fetchCodes();
    } catch (err) {
      alert("Silme işlemi başarısız.");
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Kod kopyalandı!");
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tight uppercase text-white">Kod Yönetimi</h1>
          <p className="text-white/40 text-sm font-bold uppercase tracking-widest mt-1">İşlem Kodları, Süreler ve Oturumlar</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={fetchCodes}
            className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all"
          >
            <RefreshCcw className={`w-4 h-4 text-white ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button 
            onClick={generateCode}
            className="btn-primary py-3 px-6 text-sm font-black uppercase tracking-widest flex items-center gap-3 shadow-2xl shadow-primary/40 active:scale-95 transition-all"
          >
            <Plus className="w-4 h-4" /> Manuel Kod Üret
          </button>
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-2xl flex items-start gap-4">
        <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-1" />
        <div className="text-xs font-bold text-amber-500/80 leading-relaxed uppercase tracking-widest leading-6">
          DİKKAT: Manuel üretilen kodlar standart 24 saat geçerliliğe sahiptir. <br />
          Süresi dolan kodlar sistem tarafından RAM buffer'dan otomatik olarak temizlenir.
        </div>
      </div>

      {/* Table Section */}
      <div className="glass-card overflow-hidden">
        <div className="p-6 border-b border-white/5 bg-white/[0.02] flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
            <input 
              type="text" 
              placeholder="KOD VEYA KULLANICI ARA..."
              className="w-full bg-[#0a0a0c] border border-white/5 rounded-xl pl-12 pr-4 py-3 text-xs font-bold tracking-widest placeholder:text-white/10 focus:outline-none focus:border-primary/50 transition-all uppercase text-white"
            />
          </div>
          <button className="px-4 py-3 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 transition-all">
            <Filter className="w-4 h-4 text-white/40" />
          </button>
        </div>

        <div className="divide-y divide-white/5">
          {loading && (
            <div className="p-12 text-center">
              <Loader2 className="w-8 h-8 text-primary animate-spin mx-auto" />
            </div>
          )}
          {!loading && codes.length === 0 && (
            <div className="p-12 text-center text-white/20 uppercase font-black text-xs italic">
              Henüz kod üretilmemiş.
            </div>
          )}
          {codes.map((code) => (
            <div key={code.id} className="p-6 flex items-center justify-between hover:bg-white/[0.01] transition-colors group">
              <div className="flex items-center gap-6">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xs ${
                  code.status === 'Aktif' ? 'bg-primary/20 text-primary' : 'bg-white/5 text-white/10'
                }`}>
                  <Key className="w-6 h-6 opacity-30 group-hover:opacity-100 transition-all" />
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-black tracking-tight uppercase group-hover:text-primary transition-colors text-white">{code.code}</span>
                    <button 
                      onClick={() => copyToClipboard(code.code)}
                      className="text-white/20 hover:text-white transition-colors"
                    >
                      <Copy className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mt-1">{code.user}</div>
                </div>
              </div>

              <div className="flex items-center gap-12">
                <div className="text-right">
                  <div className="text-[10px] font-black text-white/40 uppercase tracking-widest flex items-center justify-end gap-2 mb-1">
                    <Clock className="w-3 h-3" /> DURUM TEYİDİ
                  </div>
                  <div className={`font-mono text-sm font-black ${
                    code.status === 'Aktif' ? 'text-emerald-400' : 'text-rose-500 opacity-50'
                  }`}>
                    {code.status === 'Aktif' ? 'DOĞRULANDI' : 'SÜRESİ DOLDU'}
                  </div>
                </div>

                <div className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                  code.status === 'Aktif' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 
                  'bg-rose-500/10 border-rose-500/20 text-rose-500 opacity-50'
                }`}>
                  {code.status}
                </div>

                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => handleDeleteCode(code.id)}
                    className="p-3 bg-rose-500/10 text-rose-500 rounded-xl opacity-0 group-hover:opacity-100 transition-all hover:bg-rose-500 hover:text-white shadow-xl shadow-rose-500/20"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

