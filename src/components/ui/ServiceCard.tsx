import React from 'react';
import { LucideIcon } from 'lucide-react';
import Link from 'next/link';

interface ServiceCardProps {
  title: string;
  description: string;
  Icon: LucideIcon;
  iconColor: string;
  href?: string;
}

export const ServiceCard = ({ title, description, Icon, iconColor, href = "#" }: ServiceCardProps) => {
  return (
    <Link href={href}>
      <div className="glass-card p-8 group cursor-pointer h-full flex flex-col justify-between hover:border-primary/50 transition-all duration-300 active:scale-95">
        <div className="space-y-6">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 group-hover:border-primary/50 transition-all duration-500 shadow-xl shadow-transparent group-hover:shadow-primary/10`}>
            <Icon className={`w-6 h-6 ${iconColor} group-hover:scale-110 transition-transform`} />
          </div>
          
          <div className="space-y-3">
            <h3 className="text-xl font-bold tracking-tight uppercase group-hover:text-primary transition-colors text-white">{title}</h3>
            <p className="text-white/40 text-sm leading-relaxed font-medium">
              {description}
            </p>
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between">
          <span className="text-[10px] font-black text-primary tracking-widest uppercase">MODÜLÜ BAŞLAT →</span>
          <div className="w-1.5 h-1.5 rounded-full bg-primary/20 group-hover:bg-primary transition-colors animate-pulse"></div>
        </div>
      </div>
    </Link>
  );
};

