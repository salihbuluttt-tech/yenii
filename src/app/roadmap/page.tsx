'use client';

import { Navbar } from "@/components/layout/Navbar";
import { Shield, Zap, CreditCard, Lock, BarChart3, Code2, CheckCircle2, Clock, Rocket } from "lucide-react";

type Phase = {
  phase: string;
  title: string;
  status: "done" | "in-progress" | "planned";
  items: { icon: React.ElementType; text: string }[];
};

const roadmapPhases: Phase[] = [
  {
    phase: "Faz 1",
    title: "Temel Altyapı",
    status: "done",
    items: [
      { icon: Shield, text: "Firebase Authentication & Google ile Giriş" },
      { icon: Lock, text: "RAM-Tabanlı güvenlik protokolü" },
      { icon: Code2, text: "Uyumluluk kodu sistemi (Manuel)" },
      { icon: Zap, text: "Temel Next.js & Vercel altyapısı" },
    ],
  },
  {
    phase: "Faz 2",
    title: "Ödeme & Admin Paneli",
    status: "in-progress",
    items: [
      { icon: CreditCard, text: "Shopier ödeme entegrasyonu (sayfa içi modal)" },
      { icon: BarChart3, text: "Admin paneli — gerçek zamanlı analitik dashboard" },
      { icon: Code2, text: "Otomatik & manuel kod üretim sistemi" },
      { icon: Shield, text: "Yöneticiye anlık işlem bildirimleri" },
    ],
  },
  {
    phase: "Faz 3",
    title: "Yapay Zeka & Ölçeklendirme",
    status: "planned",
    items: [
      { icon: Zap, text: "Gemini AI destekli tapu belge analizi" },
      { icon: BarChart3, text: "Gelişmiş raporlama & istatistik merkezi" },
      { icon: Rocket, text: "Çoklu kullanıcı ve rol yönetimi" },
      { icon: Lock, text: "Kurumsal düzey şifreleme & denetim günlüğü" },
    ],
  },
];

const statusConfig = {
  done: {
    label: "Tamamlandı",
    icon: CheckCircle2,
    className: "text-emerald-400 border-emerald-400/30 bg-emerald-400/10",
    dotClass: "bg-emerald-400",
  },
  "in-progress": {
    label: "Devam Ediyor",
    icon: Clock,
    className: "text-amber-400 border-amber-400/30 bg-amber-400/10",
    dotClass: "bg-amber-400 animate-pulse",
  },
  planned: {
    label: "Planlandı",
    icon: Rocket,
    className: "text-indigo-400 border-indigo-400/30 bg-indigo-400/10",
    dotClass: "bg-indigo-400",
  },
};

export default function RoadmapPage() {
  return (
    <main className="min-h-screen relative bg-[#0a0a0c]">
      <Navbar />

      <section className="container mx-auto px-6 pt-36 pb-24">
        {/* Header */}
        <div className="text-center mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest">
            <Rocket className="w-3 h-3" />
            Ürün Yol Haritası
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">
            <span className="premium-gradient">TrustBridge</span>
            <br />
            <span className="text-primary">Yol Haritası</span>
          </h1>
          <p className="text-white/40 text-lg max-w-xl mx-auto leading-relaxed">
            Platformumuzun geçmiş başarıları, aktif geliştirme süreci ve gelecek vizyonu.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-3xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-white/10 hidden md:block" />

          <div className="space-y-10">
            {roadmapPhases.map((phase, idx) => {
              const config = statusConfig[phase.status];
              const StatusIcon = config.icon;

              return (
                <div key={idx} className="relative flex gap-8 group">
                  {/* Timeline dot */}
                  <div className="hidden md:flex flex-shrink-0 w-16 items-start justify-center pt-6">
                    <div className={`w-4 h-4 rounded-full border-4 border-[#0a0a0c] ${config.dotClass}`} />
                  </div>

                  {/* Card */}
                  <div className="flex-1 glass-card p-8 hover:border-white/10 transition-all duration-300 group-hover:shadow-xl group-hover:shadow-primary/5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-widest text-white/30">
                          {phase.phase}
                        </span>
                        <h2 className="text-2xl font-bold mt-1">{phase.title}</h2>
                      </div>
                      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold uppercase tracking-wider ${config.className}`}>
                        <StatusIcon className="w-3 h-3" />
                        {config.label}
                      </div>
                    </div>

                    <ul className="space-y-3">
                      {phase.items.map((item, i) => {
                        const Icon = item.icon;
                        return (
                          <li key={i} className="flex items-center gap-3 text-white/60 text-sm">
                            <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                              <Icon className="w-3.5 h-3.5 text-primary" />
                            </div>
                            {item.text}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

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
