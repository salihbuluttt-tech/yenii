import { Navbar } from "@/components/layout/Navbar";
import { LoginForm } from "@/components/ui/LoginForm";
import { ServicesSection } from "@/components/layout/ServicesSection";
import { OperationGuide } from "@/components/layout/OperationGuide";
import { SecurityProtocol } from "@/components/layout/SecurityProtocol";
import { Shield, Zap } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen relative bg-[#0a0a0c]">
      <Navbar />
      
      {/* Hero Section */}
      <section className="container mx-auto px-6 pt-32 pb-32 flex flex-col lg:flex-row items-center justify-between gap-12">
        <div className="flex-1 space-y-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest">
            <Shield className="w-3 h-3" />
            AI-Powered Compliance Protocol
          </div>
          
          <div className="space-y-4">
            <h1 className="text-6xl md:text-8xl font-bold leading-[0.9] tracking-tighter">
              Emlak <br />
              <span className="premium-gradient">Dünyasında</span><br />
              <span className="text-primary">Yeni Standart.</span>
            </h1>
            <p className="text-xl text-white/40 max-w-xl leading-relaxed">
              Yapay zeka ile güçlendirilmiş, <span className="text-white/80 font-bold">RAM-Tabanlı veri güvenliği</span> ile emlak işlemlerinizi saniyeler içinde resmileştirin ve mühürleyin.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 pt-4">
            <div className="glass-card px-6 py-4 flex items-center gap-4 bg-white/5 border-white/5">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <Shield className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <div className="text-sm font-bold uppercase">RAM-Only Protokolü</div>
                <div className="text-[10px] text-white/30 font-bold uppercase tracking-wider">Veriler Asla Saklanmaz</div>
              </div>
            </div>
            
            <div className="glass-card px-6 py-4 flex items-center gap-4 bg-white/5 border-white/5">
              <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                <Zap className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <div className="text-sm font-bold uppercase">Anlık Teyit</div>
                <div className="text-[10px] text-white/30 font-bold uppercase tracking-wider">Saniyeler İçinde Rapor</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 flex justify-center lg:justify-end">
          <LoginForm />
        </div>
      </section>

      <ServicesSection />
      
      <OperationGuide />
      
      <SecurityProtocol />

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 bg-[#0a0a0c] text-center">
        <div className="container mx-auto px-6 flex flex-col items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
              <span className="text-white font-bold text-[10px]">TB</span>
            </div>
            <span className="text-sm font-bold tracking-tight">TrustBridge</span>
          </div>
          <p className="text-white/20 text-xs font-medium uppercase tracking-widest">
            © 2026 TrustBridge — Güvenli Emlak Ekosistemi. Tüm hakları saklıdır.
          </p>
        </div>
      </footer>
    </main>
  );
}
