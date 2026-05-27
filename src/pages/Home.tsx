import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
// Clients removed per 2026-05-14 revision (경쟁사 정보누출 방지)
import About from '../components/About';
import Expertise from '../components/Expertise';
import KpiStats from '../components/KpiStats';
import Products from '../components/Products';
import FAQ from '../components/FAQ';
import News from '../components/News';
import History from '../components/History';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import ProductModal from '../components/ProductModal';
import { Product } from '../types';

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (selectedProduct) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [selectedProduct]);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, []);

  return (
    <div className="bg-black min-h-screen text-white selection:bg-white/30 selection:text-white">
      <motion.div
        animate={{
          scale: selectedProduct ? 0.93 : 1,
          y: selectedProduct ? 20 : 0,
          opacity: selectedProduct ? 0.4 : 1,
          borderRadius: selectedProduct ? '32px' : '0px',
        }}
        transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
        className="origin-top bg-black min-h-screen shadow-2xl"
      >
        <Navbar />
        <main>
          <Hero />
          <Expertise />
          <About />
          <KpiStats />
          <Products onSelectProduct={setSelectedProduct} />
          <FAQ />
          <News />
          <History />
          <Contact />
        </main>
        <Footer />
      </motion.div>

      <AnimatePresence>
        {selectedProduct && (
          <ProductModal key="modal" product={selectedProduct} onClose={() => setSelectedProduct(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
