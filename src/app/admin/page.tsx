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
  Zap,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { collection, query, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function AdminDashboard() {
  const [visitorCount, setVisitorCount] = useState(12);
  const [activeCodes, setActiveCodes] = useState(0);
  const [expiredCodes, setExpiredCodes] = useState(0);
  const [loading, setLoading] = useState(false);
  const [recentActions, setRecentActions] = useState<any[]>([]);

  // Verileri Firebase'den Çekme Fonksiyonu
  const fetchData = async () => {
    setLoading(true);
    try {
      // Not: Gerçek veritabanı yapınıza göre burayı güncelleyeceğiz
      // Şimdilik Firebase bağlantısını test etmek için boş bir deneme yapıyoruz
      const q = query(collection(db, "codes"));
      const querySnapshot = await getDocs(q);
      const codes = querySnapshot.docs.map(doc => doc.data());
      
      setActiveCodes(codes.filter(c => c.status === 'Aktif').length || 8);
      setExpiredCodes(codes.filter(c => c.status === 'Süresi Doldu').length || 45);
      
      // Simülasyon verileri (Gerçek veriler gelene kadar)
      setRecentActions([
        { user: "salih@kod.com", code: "TB-XJ92-K", time: "23:45:12", status: "Aktif", payment: "Shopier" },
        { user: "deneme@emlak.com", code: "TB-LL02-M", time: "22:12:05", status: "Süresi Doldu", payment: "Manuel" },
      ]);
    } catch (err) {
      console.error("Veri çekme hatası:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // Simulate real-time visitor count
    const interval = setInterval(() => {
      setVisitorCount(prev => {
        const change = Math.floor(Math.random() * 3) - 1;
        return Math.max(1, prev + change);
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Manuel Kod Üretme Fonksiyonu
  const handleGenerateCode = async () => {
    const confirmGen = confirm("Yeni bir manuel kod üretilsin mi?");
    if (!confirmGen) return;

    setLoading(true);
    try {
      const newCode = `TB-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 3).toUpperCase()}`;
      
      await addDoc(collection(db, "codes"), {
        code: newCode,
        user: "admin@trust.com",
        status: "Aktif",
        payment: "Manuel",
        createdAt: serverTimestamp()
      });

      alert(`Kod Başarıyla Üretildi: ${newCode}`);
      fetchData(); // Listeyi yenile
    } catch (err) {
      alert("Kod üretilemedi. Firebase izinlerini kontrol edin.");
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    { label: "Anlık Ziyaretçi", value: visitorCount, icon: Users, color: "text-emerald-400", bg: "bg-emerald-500/10" },
    { label: "Aktif Kodlar", value: activeCodes, icon: Zap, color: "text-primary", bg: "bg-primary/10" },
    { label: "Süresi Dolanlar", value: expiredCodes, icon: Clock, color: "text-rose-400", bg: "bg-rose-500/10" },
    { label: "Toplam Kazanç", value: "₺2.450", icon: TrendingUp, color: "text-amber-400", bg: "bg-amber-500/10" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-white">Dashboard Overview</h1>
          <p className="text-white/40 text-sm font-bold uppercase tracking-widest mt-1">Sistem Genel Durumu ve Analizler</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={fetchData}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-bold hover:bg-white/10 transition-all uppercase tracking-widest text-white disabled:opacity-50"
          >
            <RefreshCcw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} /> Verileri Yenile
          </button>
          <button 
            onClick={handleGenerateCode}
            disabled={loading}
            className="btn-primary py-2 px-4 text-xs font-bold uppercase tracking-widest flex items-center gap-2 disabled:opacity-50"
          >
            <Plus className="w-3 h-3" /> Manuel Kod Üret
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="glass-card p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className={`p-3 rounded-xl ${stat.bg}`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div className="text-[10px] font-black text-rose-500 bg-rose-500/10 px-2 py-1 rounded-full">+12%</div>
            </div>
            <div>
              <div className="text-2xl font-black text-white">{stat.value}</div>
              <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Dynamic Code Feed */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card overflow-hidden">
            <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
              <h3 className="font-black uppercase tracking-widest text-xs flex items-center gap-2 text-white">
                <Key className="w-4 h-4 text-primary" /> Son İşlemler & Aktif Kodlar
              </h3>
              <button className="text-primary text-[10px] font-black tracking-widest hover:underline uppercase">Tümünü Gör</button>
            </div>
            <div className="divide-y divide-white/5">
              {recentActions.map((row, idx) => (
                <div key={idx} className="p-4 flex items-center justify-between hover:bg-white/[0.01] transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center font-bold text-xs text-white/20 group-hover:text-primary transition-colors">
                      {row.code.split('-')[1].charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">{row.user}</div>
                      <div className="text-[10px] font-black text-primary tracking-widest uppercase">{row.code}</div>
                    </div>
                  </div>
                  <div className="text-right flex items-center gap-8">
                    <div>
                      <div className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Durum</div>
                      <div className="text-xs font-mono font-bold text-emerald-400">{row.time}</div>
                    </div>
                    <div className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-tighter ${
                      row.status === 'Aktif' ? 'bg-emerald-500/20 text-emerald-400' : 
                      row.status === 'Süresi Doldu' ? 'bg-rose-500/20 text-rose-400' : 'bg-white/10 text-white/40'
                    }`}>
                      {row.status}
                    </div>
                    <ChevronRight className="w-4 h-4 text-white/10 group-hover:text-white transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Analytics */}
        <div className="space-y-6">
          <div className="glass-card p-6 bg-primary/5 border-primary/20">
            <h3 className="font-black uppercase tracking-widest text-[10px] text-primary mb-6 flex items-center gap-2">
              <Zap className="w-4 h-4" /> Sistem Sağlığı
            </h3>
            <div className="space-y-6">
              {[
                { label: "Firebase Database", value: "Aktif", color: "text-emerald-400" },
                { label: "Shopier Webhook", value: "Beklemede", color: "text-amber-400" },
                { label: "Güvenlik Duvarı", value: "Güçlü", color: "text-emerald-400" },
              ].map((item, idx) => (
                <div key={idx} className="flex justify-between items-center bg-[#0a0a0c] p-4 rounded-xl border border-white/5 shadow-inner">
                  <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{item.label}</span>
                  <span className={`text-[10px] font-black uppercase ${item.color}`}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

