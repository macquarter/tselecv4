import { motion } from 'motion/react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductNav from '../components/ProductNav';

export default function Display() {
  const products = [
    {
      title: '냉장고 DISPLAY',
      desc: '냉장고 전면부 온도·상태 표시용 디스플레이 제어 모듈',
      img: '/images/products/refrigerator-display.jpg',
    },
    {
      title: '냉장고 DISPLAY (Type B)',
      desc: '냉장고용 디스플레이 모듈 — 다른 사양 적용 버전',
      img: '/images/products/refrigerator-display-alt.jpg',
    },
  ];

  return (
    <div className="bg-black min-h-screen text-white selection:bg-white/30 selection:text-white">
      <Navbar />

      <main className="pt-32 pb-20">
        {/* Hero */}
        <section className="relative flex flex-col items-center justify-center text-center px-6 mb-32">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} className="inline-block mb-6 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-sm font-medium text-gray-300">
            HMI Solutions
          </motion.div>
          <motion.h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}>
            선명함의 기준.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-600">HMI 솔루션.</span>
          </motion.h1>
          <motion.p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto font-light tracking-tight" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}>
            가전제품의 사용자 인터페이스를 위한<br className="hidden md:block" />
            디스플레이 제어 모듈.
          </motion.p>
        </section>

        {/* Products */}
        <section className="max-w-7xl mx-auto px-6 mb-32">
          <ProductNav />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {products.map((p, i) => (
              <motion.div
                key={p.title}
                className="group bg-[#0a0a0a] border border-white/5 rounded-[2rem] overflow-hidden hover:bg-[#111] transition-colors duration-500"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="aspect-[4/3] bg-[#111] flex items-center justify-center p-10 relative overflow-hidden">
                  <img src={p.img} alt={p.title} className="max-w-full max-h-full object-contain transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-40" />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold tracking-tight mb-2">{p.title}</h3>
                  <p className="text-gray-400 text-sm font-light leading-relaxed">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
