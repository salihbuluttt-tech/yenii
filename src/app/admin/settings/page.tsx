"use client";

import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  Shield, 
  Database, 
  Bell, 
  Globe, 
  Lock, 
  Save, 
  RefreshCcw,
  Zap
} from 'lucide-react';

export default function AdminSettings() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("Sistem ayarları başarıyla güncellendi.");
    }, 1500);
  };

  if (!mounted) return null;

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-black tracking-tight text-white uppercase italic">SİSTEM YAPILANDIRMASI</h1>
          <p className="text-[10px] text-white/30 font-black uppercase tracking-[0.3em] pl-1 italic">Protokol Parametreleri ve Sunucu Ayarları</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={loading}
          className="px-8 py-4 bg-primary text-black font-black text-[11px] uppercase tracking-[0.3em] rounded-2xl shadow-3xl hover:bg-white transition-all flex items-center gap-3 disabled:opacity-50"
        >
          {loading ? <RefreshCcw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} DEĞİŞİKLİKLERİ KAYDET
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Güvenlik Ayarları */}
        <div className="glass-card p-10 border-white/5 bg-white/[0.02] space-y-8 hover:border-primary/20 transition-all">
          <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary flex items-center gap-3">
            <Lock className="w-4 h-4" /> GÜVENLİK VE ERİŞİM PROTOKOLLERİ
          </h3>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between p-5 bg-black/40 rounded-2xl border border-white/5">
              <div className="space-y-1">
                 <div className="text-[11px] font-black text-white uppercase tracking-widest">İki Faktörlü Doğrulama</div>
                 <div className="text-[9px] text-white/20 font-bold uppercase">Tüm admin girişlerinde zorunlu</div>
              </div>
              <div className="w-12 h-6 bg-primary rounded-full relative flex items-center px-1">
                 <div className="w-4 h-4 bg-black rounded-full absolute right-1 shadow-inner translate-x-0"></div>
              </div>
            </div>

            <div className="flex items-center justify-between p-5 bg-black/40 rounded-2xl border border-white/5 opacity-50">
              <div className="space-y-1">
                 <div className="text-[11px] font-black text-white uppercase tracking-widest">IP Kısıtlaması</div>
                 <div className="text-[9px] text-white/20 font-bold uppercase">Sadece belirli IP'lerden erişim</div>
              </div>
              <div className="w-12 h-6 bg-white/10 rounded-full relative flex items-center px-1 shadow-inner">
                 <div className="w-4 h-4 bg-white/20 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Sistem Durumu */}
        <div className="glass-card p-10 border-white/5 bg-white/[0.02] space-y-8 hover:border-emerald-500/20 transition-all">
          <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-400 flex items-center gap-3">
            <Zap className="w-4 h-4" /> SUNUCU VE VERİTABANI KONDİSYONU
          </h3>
          
          <div className="space-y-6">
            <div className="p-6 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl flex items-center gap-6 group">
               <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 animate-pulse">
                  <Database className="w-6 h-6 text-emerald-400" />
               </div>
               <div>
                  <div className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-1">GCP_REGION_STATUS</div>
                  <div className="text-sm font-black text-emerald-400 uppercase italic">OPERATIONAL (99.9% Uptime)</div>
               </div>
            </div>

            <div className="p-6 bg-white/5 border border-white/5 rounded-2xl flex items-center gap-6">
               <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 text-white/20 uppercase font-black text-[9px]">
                  SSL
               </div>
               <div>
                  <div className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-1">CERTIFICATE_EXPIRY</div>
                  <div className="text-xs font-mono font-bold text-white/60">346 DAYS REMAINING</div>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="p-8 bg-zinc-900/50 border border-white/5 rounded-[2.5rem] flex items-center gap-6 shadow-3xl">
         <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Shield className="w-6 h-6 text-primary" />
         </div>
         <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] leading-relaxed italic">
            Bu panel üzerinden yapılan tüm değişiklikler anlık olarak <span className="text-white/40">Audit Log</span> sistemine kaydedilmektedir. 
            Güvenlik gereği kritik değişikliklerde SMS doğrulaması istenebilir. <br />
            © TrustBridge Core System Settings v2.4.0
         </p>
      </div>
    </div>
  );
}
