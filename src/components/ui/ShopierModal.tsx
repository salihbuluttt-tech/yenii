"use client";

import React from 'react';
import { X, Lock, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ShopierModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShopierModal = ({ isOpen, onClose }: ShopierModalProps) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#0a0a0c]/80 backdrop-blur-xl"
        />

        {/* Modal Content */}
        <motion.div 
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="relative w-full max-w-2xl bg-white rounded-[2rem] shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="bg-[#0a0a0c] text-white p-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/40 flex items-center justify-center">
                <Lock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-black uppercase tracking-widest">GÜVENLİ ÖDEME</h3>
                <p className="text-[10px] text-white/40 font-bold uppercase tracking-[0.2em]">Shopier Alt Yapısı İle Korunuyor</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors"
            >
              <X className="w-5 h-5 text-white/40" />
            </button>
          </div>

          {/* Iframe Simulation / Loader */}
          <div className="h-[600px] w-full bg-[#f8fafc] relative flex flex-col items-center justify-center p-12 text-center space-y-8">
            <div className="w-24 h-24 rounded-full border-4 border-primary/10 border-t-primary animate-spin" />
            
            <div className="space-y-4">
              <h4 className="text-2xl font-black text-[#0a0a14] tracking-tight">Shopier Güvenli Ödeme Penceresi</h4>
              <p className="text-[#0a0a14]/40 font-bold text-lg max-w-sm mx-auto">
                Ödeme işleminiz tamamlandığında "Tek Seferlik İşlem Kodunuz" anında ekranda belirecektir.
              </p>
            </div>

            <div className="pt-8 flex items-center gap-4 text-[#0a0a14]/20">
              <ShieldCheck className="w-6 h-6" />
              <span className="text-xs font-black uppercase tracking-widest">SSL 256-Bit Sertifikalı Koruma</span>
            </div>

            {/* In a real implementation, you would load the Shopier URL here:
               <iframe src={shopierUrl} className="w-full h-full border-none" />
            */}
          </div>

          <div className="p-4 bg-[#0a0a0c] text-center border-t border-white/5">
              <p className="text-[10px] text-white/20 font-bold uppercase tracking-widest leading-none">
                İŞLEM SONRASI KODUNU KAYDETMEYİ UNUTMAYIN. KODUNUZ 24 SAAT GEÇERLİDİR.
              </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
