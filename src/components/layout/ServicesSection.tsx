import React from 'react';
import { ServiceCard } from '@/components/ui/ServiceCard';
import { 
  Users, 
  ShieldCheck, 
  MapPin, 
  FileText, 
  Key, 
  Building2 
} from 'lucide-react';

export const ServicesSection = () => {
  const services = [
    {
      title: "Karşılıklı Mutabakat",
      description: "Alıcı ve satıcı belgelerinin AI ile çapraz kontrolü ve güvenli eşleşme raporu.",
      Icon: Users,
      iconColor: "text-indigo-400"
    },
    {
      title: "Tek Taraflı Doğrulama",
      description: "Kendi belgenizi (Tapu, Yetki vb.) yükleyip AI mühürlü teyit raporu oluşturun.",
      Icon: ShieldCheck,
      iconColor: "text-emerald-400"
    },
    {
      title: "Dijital Yer Gösterme",
      description: "GPS mühürlü ve dijital imzalı, resmi geçerliliği olan yer gösterme formu.",
      Icon: MapPin,
      iconColor: "text-amber-400"
    },
    {
      title: "Hızlı NDA",
      description: "Hassas görüşmeler öncesi saniyeler içinde AI destekli gizlilik sözleşmesi.",
      Icon: FileText,
      iconColor: "text-rose-400"
    },
    {
      title: "Dijital Yetki Belgesi",
      description: "Mülk sahiplerinden emlakçılara süreli ve kapsamlı resmi yetki ataması.",
      Icon: Key,
      iconColor: "text-zinc-400"
    },
    {
      title: "Proje İhale Paneli",
      description: "Müteahhit tekliflerini toplama ve AI ile en avantajlı olanı analiz etme.",
      Icon: Building2,
      iconColor: "text-sky-400"
    }
  ];

  return (
    <section id="services" className="py-24 bg-[#0d0d12]">
      <div className="container mx-auto px-6 space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight uppercase">Kurumsal Hizmet Yelpazesi</h2>
          <p className="text-white/40 text-lg font-medium">Güvenli emlak ekosistemi için tasarlanmış profesyonel mutabakat araçları.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
};
