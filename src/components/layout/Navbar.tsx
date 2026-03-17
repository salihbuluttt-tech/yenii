import React from 'react';
import Link from 'next/link';
import { Shield } from 'lucide-react';

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-background/50 backdrop-blur-md">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
            <span className="text-white font-bold text-sm">TB</span>
          </div>
          <span className="text-xl font-bold tracking-tight">
            Trust<span className="text-primary">Bridge</span>
          </span>
        </Link>
        <div className="flex items-center gap-8">
          <Link href="/roadmap" className="text-sm font-medium text-white/60 hover:text-white transition-colors uppercase tracking-widest">
            Yol Haritası
          </Link>
        </div>
      </div>
    </nav>
  );
};
