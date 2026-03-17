import React from 'react';
import { Lock, Shield, ShieldCheck, DatabaseZap } from 'lucide-react';

export const SecurityProtocol = () => {
  return (
    <section className="py-32 bg-[#0a0a14] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 blur-[120px] rounded-full" />
      
      <div className="container mx-auto px-6 relative z-10 text-center space-y-16">
        <div className="inline-flex items-center justify-center p-4 rounded-3xl bg-primary/10 border border-primary/20 shadow-2xl shadow-primary/10 mb-8 animate-bounce transition-all">
          <Lock className="w-8 h-8 text-primary" />
        </div>

        <div className="space-y-6 max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none">
            GÜVENLİK PROTOKOLÜ <span className="text-primary">(RAM-ONLY)</span>
          </h2>
          <p className="text-white/40 text-xl font-bold leading-relaxed">
            TrustBridge AI, yüklenen hiçbir belgeyi sunucu disklerinde saklamaz. Tüm analizler veri güvenliği protokolü gereği anlık olarak <span className="text-white underline underline-offset-8 decoration-primary/50 font-black italic">bellek (RAM) üzerinde</span> yapılır ve işlem bittiği an veri silsilesi yok edilir.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 pt-12">
          {[
            { label: "KVKK UYUMLU", icon: ShieldCheck },
            { label: "END-TO-END ENCRYPTION", icon: Shield },
            { label: "ZERO RETENTION POLICY", icon: DatabaseZap }
          ].map((tag, idx) => (
            <div key={idx} className="px-8 py-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3 hover:bg-white/10 hover:border-primary/30 transition-all cursor-default group">
              <tag.icon className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
              <span className="text-xs font-black tracking-[0.2em]">{tag.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
