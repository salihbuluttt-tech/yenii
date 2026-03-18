"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { LoginForm } from "@/components/ui/LoginForm";
import { ServicesSection } from "@/components/layout/ServicesSection";
import { Shield, Loader2 } from "lucide-react";
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
      <div className="min-h-screen bg-[#070709] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#070709] selection:bg-primary/30 text-white overflow-hidden">
      <Navbar />
      
      {/* Üst Bölüm: Hero & Giriş */}
      <section className="container mx-auto px-6 pt-32 pb-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          
          {/* Sol: Slogan ve Vizyon */}
          <div className="flex-1 space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.3em]">
              <Shield className="w-3 h-3" /> TRUSTBRIDGE SECURITY PROTOCOL
            </div>
            <h1 className="text-5xl md:text-7xl font-black leading-tight tracking-tighter uppercase italic">
              Emlak İşlemlerini <br />
              <span className="text-primary italic">Resmileştirin.</span>
            </h1>
            <p className="text-white/40 max-w-lg text-sm font-medium leading-relaxed uppercase tracking-widest italic mx-auto lg:mx-0">
              Yapay zeka analizli güvenli mühürleme ve anlık mutabakat anahtarı ile veri kirliliğine son verin.
            </p>
          </div>

          {/* Sağ: Giriş veya Profil Kartı */}
          <div className="flex-1 flex justify-center lg:justify-end">
            {!user && (
              <LoginForm />
            )}
          </div>
        </div>
      </section>

      {/* Alt Bölüm: Hizmetler (Sadece Giriş Yapınca Görünür) */}
      {user && (
        <section className="container mx-auto px-6 pb-32 animate-in fade-in slide-in-from-bottom-12 duration-1000">
           <div className="py-12 border-t border-white/5 mb-12">
              <h2 className="text-center text-xs font-black uppercase tracking-[0.5em] text-white/20 italic">Aktif Hizmet Modülleri</h2>
           </div>
           <ServicesSection />
        </section>
      )}

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 bg-black/40 text-center">
         <div className="text-[10px] text-white/10 font-bold uppercase tracking-[0.4em]">
            TrustBridge © 2026 — Legal Compliance Engine
         </div>
      </footer>
    </main>
  );
}
