import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductNav from '../components/ProductNav';

interface Product {
  title: string;
  desc: string;
  img: string;
  specs: { label: string; value: string }[];
}

export default function Others() {
  const [selected, setSelected] = useState<Product | null>(null);

  const products: Product[] = [
    {
      title: 'SMPS 25V/2.0A',
      desc: '25V 2.0A 출력 스위칭 모드 전원공급장치',
      img: '/images/products/smps-25v.jpg',
      specs: [
        { label: '출력 전압', value: '25V' },
        { label: '출력 전류', value: '2.0A' },
        { label: '타입', value: 'SMPS (스위칭 모드)' },
        { label: '용도', value: '각종 제어 기판 전원공급' },
      ],
    },
    {
      title: 'SMPS 120W',
      desc: '120W급 고출력 스위칭 모드 전원공급장치',
      img: '/images/products/smps-120w.jpg',
      specs: [
        { label: '출력', value: '120W' },
        { label: '타입', value: 'SMPS (스위칭 모드)' },
        { label: '특징', value: '고출력, 고효율' },
        { label: '용도', value: '산업·가전 기기 전원공급' },
      ],
    },
    {
      title: '공기청정기 POWER',
      desc: '220VAC 입력, 모터 구동 전용 파워보드',
      img: '/images/products/air-purifier-power.jpg',
      specs: [
        { label: '입력 전원', value: '220VAC' },
        { label: '제어 대상', value: 'MOTOR' },
        { label: '타입', value: '전용 파워보드' },
        { label: '용도', value: '공기청정기 모터 구동' },
      ],
    },
    {
      title: '정수기 POWER',
      desc: '정수기 전용 파워 서플라이 보드',
      img: '/images/products/water-purifier-power.jpg',
      specs: [
        { label: '타입', value: '전용 파워보드' },
        { label: '출력', value: 'DC (다중 출력)' },
        { label: '특징', value: '안정적 전력 공급' },
        { label: '용도', value: '정수기 전원부' },
      ],
    },
    {
      title: '연료전지 PBU',
      desc: '연료전지 Power Board Unit 제어 기판',
      img: '/images/products/fuel-cell-pbu.jpg',
      specs: [
        { label: '타입', value: 'Power Board Unit' },
        { label: '용도', value: '연료전지 전력 제어' },
        { label: '특징', value: '고효율 전력 변환' },
        { label: '산업', value: '신재생에너지' },
      ],
    },
  ];

  return (
    <div className="bg-black min-h-screen text-white selection:bg-white/30 selection:text-white">
      <Navbar />

      <main className="pt-32 pb-20">
        {/* Hero */}
        <section className="relative flex flex-col items-center justify-center text-center px-6 mb-32">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} className="inline-block mb-6 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-sm font-medium text-gray-300">
            Power &amp; Peripherals
          </motion.div>
          <motion.h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}>
            안정적인 전원.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-600">SMPS &amp; 파워보드.</span>
          </motion.h1>
          <motion.p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto font-light tracking-tight" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}>
            SMPS, 파워보드, 연료전지 PBU 등<br className="hidden md:block" />
            전력 변환 및 공급 솔루션.
          </motion.p>
        </section>

        {/* Products */}
        <section className="max-w-7xl mx-auto px-6 mb-32">
          <ProductNav />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p, i) => (
              <motion.div
                key={p.title}
                className="group bg-[#0a0a0a] border border-white/5 rounded-[2rem] overflow-hidden cursor-pointer hover:bg-[#111] transition-colors duration-500"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setSelected(p)}
              >
                <div className="aspect-square bg-[#111] flex items-center justify-center p-6 relative overflow-hidden">
                  <img src={p.img} alt={p.title} className="max-w-full max-h-full object-contain transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold tracking-tight mb-1">{p.title}</h3>
                  <p className="text-gray-500 text-xs font-light leading-relaxed">{p.desc}</p>
                  <span className="mt-3 inline-flex items-center text-[11px] text-gray-600 group-hover:text-white transition-colors">
                    사양 보기
                    <svg className="ml-1 w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <Footer />

      <AnimatePresence>
        {selected && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setSelected(null)} />
            <motion.div className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto bg-[#111] border border-white/10 rounded-[2rem] p-8" initial={{ opacity: 0, scale: 0.9, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 30 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>
              <button onClick={() => setSelected(null)} className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
              <div className="h-48 bg-[#0a0a0a] rounded-2xl flex items-center justify-center mb-6 border border-white/5">
                <img src={selected.img} alt={selected.title} className="max-w-full max-h-full object-contain p-4" />
              </div>
              <h2 className="text-2xl font-bold mb-2 tracking-tight">{selected.title}</h2>
              <p className="text-gray-400 text-sm mb-6 font-light">{selected.desc}</p>
              <div className="bg-black/50 border border-white/5 rounded-2xl p-5">
                <h3 className="text-xs font-bold text-gray-300 uppercase tracking-wider mb-4">주요 사양</h3>
                <div className="space-y-3">
                  {selected.specs.map((s, i) => (
                    <div key={i} className="flex justify-between text-sm border-b border-white/5 pb-3 last:border-0 last:pb-0">
                      <span className="text-gray-500">{s.label}</span>
                      <span className="text-white font-medium text-right">{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
