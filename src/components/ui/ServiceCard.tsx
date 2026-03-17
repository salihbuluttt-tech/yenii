import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string;
  Icon: LucideIcon;
  iconColor: string;
}

export const ServiceCard = ({ title, description, Icon, iconColor }: ServiceCardProps) => {
  return (
    <div className="glass-card p-8 group cursor-pointer h-full flex flex-col justify-between">
      <div className="space-y-6">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 group-hover:border-primary/50 transition-all duration-500`}>
          <Icon className={`w-6 h-6 ${iconColor} group-hover:scale-110 transition-transform`} />
        </div>
        
        <div className="space-y-3">
          <h3 className="text-xl font-bold tracking-tight uppercase group-hover:text-primary transition-colors">{title}</h3>
          <p className="text-white/40 text-sm leading-relaxed font-medium">
            {description}
          </p>
        </div>
      </div>
      
      <div className="mt-8 pt-4 border-t border-white/5 opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="text-[10px] font-bold text-primary tracking-widest uppercase">MODÜLÜ BAŞLAT →</span>
      </div>
    </div>
  );
};
