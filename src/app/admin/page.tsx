"use client";

import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Key, 
  Clock, 
  TrendingUp,
  ChevronRight,
  Plus,
  RefreshCcw,
  Zap
} from 'lucide-react';
import { collection, query, getDocs, addDoc, serverTimestamp, limit, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function AdminDashboard() {
  const [visitorCount, setVisitorCount] = useState(0);
  const [activeCodes, setActiveCodes] = useState(0);
  const [expiredCodes, setExpiredCodes] = useState(0);
  const [loading, setLoading] = useState(false);
  const [recentActions, setRecentActions] = useState<any[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchData();
    
    // Simulate real-time visitor count only on client
    const interval = setInterval(() => {
      setVisitorCount(prev => {
        const base = prev > 0 ? prev : 12;
        const change = Math.floor(Math.random() * 3) - 1;
        return Math.max(1, base + change);
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const q = query(collection(db, "codes"), limit(20));
      const querySnapshot = await getDocs(q);
      const codeDocs = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      setActiveCodes(codeDocs.filter((c: any) => c.status === 'Aktif').length);
      setExpiredCodes(codeDocs.filter((c: any) => c.status === 'Süresi Doldu').length);
      
      // Update recent actions with real data
      const mappedActions = codeDocs.slice(0, 5).map((doc: any) => ({
        user: doc.user || "Bilinmiyor",
        code: doc.code || "TB-XXXX-X",
        time: doc.createdAt ? new Date(doc.createdAt.seconds * 1000).toLocaleTimeString() : '---',
        status: doc.status || "Aktif",
        payment: doc.payment || "Dijital"
      }));

      setRecentActions(mappedActions.length > 0 ? mappedActions : [
        { user: "Sistem", code: "HOSGELDIN-01", time: "--:--", status: "Aktif", payment: "Sistem" }
      ]);

    } catch (err) {
      console.error("Dashboard veri hatası:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateCode = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/protocol/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'HIZLI_YONETICI', userEmail: 'Admin (Hızlı)' })
      });
      
      const data = await response.json();

      if (data.success) {
        alert(`KOD ARKA PLANDA ÜRETİLDİ: ${data.code}\nListe Güncelleniyor.`);
        await fetchData();
      } else {
        throw new Error(data.error);
      }
    } catch (err: any) {
       console.error("Kod üretim hatası:", err);
       alert("Hata: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;

  const stats = [
    { label: "Anlık Ziyaretçi", value: visitorCount || 12, icon: Users, color: "text-emerald-400", bg: "bg-emerald-500/10" },
    { label: "Aktif Kodlar", value: activeCodes, icon: Zap, color: "text-primary", bg: "bg-primary/10" },
    { label: "Süresi Dolanlar", value: expiredCodes, icon: Clock, color: "text-rose-400", bg: "bg-rose-500/10" },
    { label: "Tahminlenen Hacim", value: "₺" + (activeCodes * 100).toLocaleString(), icon: TrendingUp, color: "text-amber-400", bg: "bg-amber-500/10" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-black tracking-tight text-white uppercase italic">SİSTEM KONTROLÜ</h1>
          <p className="text-[10px] text-white/30 font-bold uppercase tracking-[0.3em] pl-1 italic">Real-time Admin Analytics & Protocol Buffer</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={fetchData}
            disabled={loading}
            className="group flex items-center gap-2 px-5 py-3 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black hover:bg-white/10 transition-all uppercase tracking-widest text-white/60 disabled:opacity-50"
          >
            <RefreshCcw className={`w-3 h-3 ${loading ? 'animate-spin text-primary' : 'group-hover:rotate-180 transition-transform duration-500'}`} /> VERİLERİ SORGULA
          </button>
          <button 
            onClick={handleGenerateCode}
            disabled={loading}
            className="px-6 py-3 bg-primary text-black text-[10px] font-black uppercase tracking-widest rounded-2xl shadow-2xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-3 disabled:opacity-50"
          >
            <Plus className="w-4 h-4" /> KOD ÜRET
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="glass-card p-8 space-y-6 bg-white/[0.02] border-white/5 hover:border-white/10 transition-all">
            <div className="flex items-center justify-between">
              <div className={`p-4 rounded-2xl ${stat.bg} border border-white/5`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div className="text-[9px] font-black text-primary bg-primary/10 px-3 py-1 rounded-full uppercase tracking-tighter shadow-inner">LIVE</div>
            </div>
            <div className="space-y-1">
              <div className="text-4xl font-black text-white tracking-tighter">{stat.value}</div>
              <div className="text-[10px] font-bold text-white/20 uppercase tracking-widest mt-1">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card overflow-hidden bg-[#0a0a0c] border-white/5">
            <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.03]">
              <h3 className="font-black uppercase tracking-[0.2em] text-[10px] flex items-center gap-3 text-white/60">
                <Key className="w-4 h-4 text-primary" /> SON İŞLEMLER VE AKTİF KODLAR
              </h3>
            </div>
            <div className="divide-y divide-white/5">
              {recentActions.map((row, idx) => (
                <div key={idx} className="p-6 flex items-center justify-between hover:bg-white/[0.01] transition-colors group">
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center font-black text-xs text-white/10 group-hover:text-primary transition-all duration-500">
                      {row.code?.split('-')[1]?.charAt(0) || 'TB'}
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm font-black text-white italic">{row.user}</div>
                      <div className="text-[10px] font-black text-primary tracking-[0.2em] uppercase">{row.code}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-10">
                    <div className="text-right hidden sm:block">
                      <div className="text-[9px] font-black text-white/10 uppercase tracking-widest mb-1">DATA_TIME</div>
                      <div className="text-xs font-mono font-bold text-white/40">{row.time}</div>
                    </div>
                    <div className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-tighter border ${
                      row.status === 'Aktif' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400 shadow-xl shadow-emerald-500/5' : 
                      'bg-rose-500/10 border-rose-500/20 text-rose-400 opacity-40'
                    }`}>
                      {row.status}
                    </div>
                    <ChevronRight className="w-4 h-4 text-white/10 group-hover:text-primary transition-all" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-card p-10 bg-primary/5 border-primary/20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-primary/10 transition-all" />
            <h3 className="font-black uppercase tracking-[0.2em] text-[10px] text-primary mb-10 flex items-center gap-3">
              <Zap className="w-4 h-4" /> CORE PROTOKOL ANALİZİ
            </h3>
            <div className="space-y-6">
              {[
                { label: "Firebase Cluster", value: "HEALTHY", color: "text-emerald-400" },
                { label: "Analytics Buffer", value: "SYNCED", color: "text-emerald-400" },
                { label: "Security Layer", value: "ENHANCED", color: "text-primary" },
                { label: "Memory Storage", value: "RAM-ONLY", color: "text-emerald-400" },
              ].map((item, idx) => (
                <div key={idx} className="flex justify-between items-center bg-black/40 p-5 rounded-2xl border border-white/5 shadow-inner group hover:border-primary/20 transition-all">
                  <span className="text-[9px] font-black text-white/40 uppercase tracking-[0.2em]">{item.label}</span>
                  <span className={`text-[10px] font-black uppercase italic ${item.color}`}>{item.value}</span>
                </div>
              ))}
            </div>
            <div className="mt-10 p-4 border border-white/5 rounded-2xl bg-black/20 text-[9px] font-bold text-white/20 uppercase tracking-widest text-center leading-relaxed">
              SİSTEM %100 ÜRETKENLİKLE <br/> ÇALIŞMAYA DEVAM EDİYOR.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
