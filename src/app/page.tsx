"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { LoginForm } from "@/components/ui/LoginForm";
import { ServicesSection } from "@/components/layout/ServicesSection";
import { SecurityProtocol } from "@/components/layout/SecurityProtocol";
import { Shield, Zap, Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Home() {
  const { user, loading } = useAuth();
  const [mounted, setMounted] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0c] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <main className="min-h-screen relative bg-[#0a0a0c] selection:bg-primary/30">
      <Navbar />
      
      {/* Hero & Login Section */}
      <section className="container mx-auto px-6 pt-32 pb-32 flex flex-col lg:flex-row items-center justify-between gap-12">
        <div className="flex-1 space-y-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.3em] italic">
            <Shield className="w-3 h-3" />
            AI-Powered Compliance Protocol
          </div>
          
          <div className="space-y-4">
            <h1 className="text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter text-white uppercase italic">
              Emlak <br />
              <span className="premium-gradient">Dünyasında</span><br />
              <span className="text-primary underline decoration-white/10 underline-offset-8">Yeni Standart.</span>
            </h1>
            <p className="text-lg text-white/40 max-w-xl leading-[1.8] italic font-medium">
              Yapay zeka ile güçlendirilmiş, <span className="text-white/80 font-black">RAM-Tabanlı veri güvenliği</span> ile emlak işlemlerinizi saniyeler içinde resmileştirin ve mühürleyin.
            </p>
          </div>

          {!user && (
            <div className="flex flex-wrap gap-4 pt-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
              <div className="glass-card px-8 py-5 flex items-center gap-6 bg-white/[0.02] border-white/5">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shadow-2xl">
                  <Shield className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <div className="text-[11px] font-black uppercase text-white tracking-widest">RAM-ONLY STORAGE</div>
                  <div className="text-[9px] text-white/20 font-black uppercase tracking-[0.2em] mt-1 italic">Veriler Asla Saklanmaz</div>
                </div>
              </div>
              
              <div className="glass-card px-8 py-5 flex items-center gap-6 bg-white/[0.02] border-white/5">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shadow-2xl">
                  <Zap className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <div className="text-[11px] font-black uppercase text-white tracking-widest">ANLIK TEYİT</div>
                  <div className="text-[9px] text-white/20 font-black uppercase tracking-[0.2em] mt-1 italic">Saniyeler İçinde Rapor</div>
                </div>
              </div>
            </div>
          )}

          {user && (
            <div className="pt-8">
              <div className="glass-card p-10 border-emerald-500/10 bg-emerald-500/[0.02] inline-flex flex-col md:flex-row items-center gap-8 shadow-3xl shadow-emerald-500/5">
                <div className="w-16 h-16 rounded-[2rem] bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                  <Shield className="w-8 h-8 text-emerald-400" />
                </div>
                <div className="text-center md:text-left">
                  <div className="text-2xl font-black text-white uppercase italic tracking-tighter">Kimlik Doğrulandı!</div>
                  <div className="text-[10px] text-white/30 font-black uppercase tracking-[0.3em] mt-1 italic">Erişim protokolü aktif. Hizmetler bölümüne geçebilirsiniz.</div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex-1 flex justify-center lg:justify-end">
          {user ? (
             <div className="w-full max-w-md glass-card p-10 border-primary/20 bg-primary/5 text-center space-y-8 shadow-3xl">
                <div className="space-y-2">
                   <h3 className="text-xl font-black text-white uppercase italic">Sistem Oturumu</h3>
                   <p className="text-[10px] text-white/30 font-black uppercase tracking-widest font-mono italic">{user.email}</p>
                </div>
                
                <div className="py-4 px-6 rounded-2xl bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.3em]">
                  DOĞRULANMIŞ_KULLANICI_OK
                </div>

                {user.email === 'admin@trustbridge.com' && (
                  <button 
                    onClick={() => router.push('/admin')}
                    className="w-full py-5 bg-white text-black font-black text-[11px] uppercase tracking-[0.4em] rounded-2xl shadow-3xl hover:bg-primary transition-all flex items-center justify-center gap-3 animate-pulse ring-4 ring-primary/10"
                  >
                    <Shield className="w-4 h-4" /> YÖNETİCİ PANELİ
                  </button>
                )}
             </div>
          ) : (
            <LoginForm />
          )}
        </div>
      </section>

      {user && (
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <ServicesSection />
          <SecurityProtocol />
        </div>
      )}

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 bg-[#0a0a0c] text-center">
        <div className="container mx-auto px-6 flex flex-col items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
              <span className="text-white font-bold text-[10px]">TB</span>
            </div>
            <span className="text-sm font-bold tracking-tight text-white italic">TrustBridge</span>
          </div>
          <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.3em]">
            © 2026 TrustBridge — Güvenli Emlak Ekosistemi.
          </p>
        </div>
      </footer>
    </main>
  );
}
