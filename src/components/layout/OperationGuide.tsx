import React from 'react';
import { 
  History, 
  Send, 
  BrainCircuit, 
  CheckCircle2, 
  X,
  Lock,
  Download
} from 'lucide-react';

export const OperationGuide = () => {
  const steps = [
    {
      number: "01",
      title: "KODU BAŞLATIN",
      description: "Ödeme yaparak Tek Seferlik İşlem Kodu satın alın. Bu kod sizin dijital anahtarınızdır ve 24 saat geçerlidir.",
      Icon: History
    },
    {
      number: "02",
      title: "DAVET GÖNDERİN",
      description: "Eğer karşılıklı bir işlem yapıyorsanız, sistemin size verdiği Davet Kodu'nu karşı tarafa iletin.",
      Icon: Send
    },
    {
      number: "03",
      title: "AI ANALİZİ",
      description: "Belgelerinizi yükleyin. Yapay zeka imza, mühür ve risk analizini anlık yaparak match skorunu belirler.",
      Icon: BrainCircuit
    },
    {
      number: "04",
      title: "MÜHÜRLÜ RAPOR",
      description: "Tüm adımlar bittiğinde, dijital olarak mühürlenmiş 'Teyitli Bilgi Raporu'nuzu PDF olarak indirin.",
      Icon: CheckCircle2
    }
  ];

  return (
    <section className="py-24 bg-white text-[#0a0a14] rounded-[3rem_3rem_0_0] relative overflow-hidden">
      <div className="container mx-auto px-6 space-y-20 relative z-10">
        <div className="flex justify-between items-center border-b border-[#0a0a14]/5 pb-12">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-[#0a0a14]">Sistem Operasyon Rehberi</h2>
            <p className="text-[#0a0a14]/50 text-xl font-bold">Platformu en verimli şekilde nasıl kullanırsınız?</p>
          </div>
          <button className="w-12 h-12 rounded-full border border-[#0a0a14]/10 flex items-center justify-center hover:bg-[#0a0a14]/5 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
          {steps.map((step, index) => (
            <div key={index} className="flex gap-8 group">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center text-white text-2xl font-black shadow-xl shadow-primary/20 transition-transform group-hover:scale-105">
                  {step.number}
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-3xl font-black tracking-tight">{step.title}</h3>
                <p className="text-[#0a0a14]/60 text-lg leading-relaxed font-bold max-w-md">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-[#0a0a14] text-white p-10 rounded-[2.5rem] flex flex-col md:flex-row items-center gap-8 group relative overflow-hidden">
          {/* Subtle glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px]" />
          
          <div className="w-16 h-16 rounded-3xl border border-white/10 flex items-center justify-center bg-white/5 shadow-2xl group-hover:bg-primary/20 transition-all duration-500">
            <Lock className="w-8 h-8 text-primary" />
          </div>
          <div className="space-y-2 flex-1 text-center md:text-left">
            <h4 className="text-lg font-black uppercase tracking-widest text-primary">UNUTMAYIN</h4>
            <p className="text-white/60 text-lg font-bold leading-relaxed">
              İşleminiz bittikten sonra veya 24 saat geçtiğinde tüm veriler kalıcı olarak silinir. Lütfen raporunuzu indirmeyi unutmayın.
            </p>
          </div>
          <button className="px-8 py-5 bg-white text-[#0a0a14] font-black rounded-2xl flex items-center gap-3 hover:bg-white/90 active:scale-95 transition-all shadow-2xl">
            <Download className="w-5 h-5" /> RAPORU İNDİR
          </button>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#f8fafc] to-transparent pointer-events-none" />
    </section>
  );
};
