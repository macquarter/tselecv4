import React from 'react';
import { motion } from 'motion/react';
import { X } from 'lucide-react';
import { Product } from '../types';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
  key?: React.Key;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  return (
    <motion.div 
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-md"
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <motion.div
        layoutId={`card-${product.id}`}
        className="bg-[#0a0a0a] w-full sm:max-w-4xl h-[90vh] sm:h-[85vh] rounded-t-[2rem] sm:rounded-[2rem] overflow-hidden relative z-10 flex flex-col shadow-2xl border border-white/5"
        transition={{ type: "spring", damping: 30, stiffness: 250 }}
      >
        {/* Image Header */}
        <div className="relative h-[45%] sm:h-[55%] overflow-hidden bg-black shrink-0">
          <motion.img 
            layoutId={`img-${product.id}`} 
            src={product.img} 
            alt={product.name}
            className="w-full h-full object-cover opacity-70" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
          
          <button 
            onClick={onClose} 
            className="absolute top-6 right-6 w-10 h-10 bg-black/40 backdrop-blur-xl rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-black/60 transition-all z-50"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Content Body */}
        <div className="p-8 sm:p-12 overflow-y-auto flex-1 scrollbar-hide">
          <motion.h3 layoutId={`title-${product.id}`} className="text-3xl sm:text-4xl font-bold mb-4 text-white">
            {product.name}
          </motion.h3>
          <motion.p layoutId={`desc-${product.id}`} className="text-xl text-gray-400 font-light mb-10 leading-relaxed">
            {product.desc}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h4 className="text-sm font-bold tracking-widest text-gray-400 uppercase mb-6">주요 기능 및 특징</h4>
            <ul className="space-y-4">
              {product.details?.map((detail, idx) => (
                <li key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-[#111] border border-white/5">
                  <div className="w-1.5 h-1.5 rounded-full bg-white mt-2 shrink-0" />
                  <span className="text-gray-300 leading-relaxed font-light">{detail}</span>
                </li>
              ))}
            </ul>

            <div className="mt-12">
              <button
                onClick={() => { onClose(); setTimeout(() => { document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }, 350); }}
                className="w-full py-4 bg-white text-black font-medium rounded-xl hover:bg-gray-200 transition-colors"
              >
                상담 문의하기
              </button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
