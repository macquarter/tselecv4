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

export default function MainController() {
  const [selected, setSelected] = useState<Product | null>(null);

  const products: Product[] = [
    {
      title: '냉동고 MAIN',
      desc: '냉동고 전용 메인 컨트롤러 기판',
      img: '/images/products/freezer-main.jpg',
      specs: [
        { label: '전원', value: 'AC220V' },
        { label: 'MCU', value: 'Renesas / ATMEGA' },
        { label: '제어 대상', value: '압축기, FAN, 히터, 센서' },
        { label: '용도', value: '냉동고 메인 제어' },
      ],
    },
    {
      title: '의료기기 제어보드',
      desc: 'ATMEGA16L MCU 기반 의료기기 히터/초음파(레이저) 제어',
      img: '/images/products/medical-device.jpg',
      specs: [
        { label: '전원', value: 'AC220V' },
        { label: 'MCU', value: 'ATMEGA16L-8PU' },
        { label: '제어 대상', value: 'HEATER, 초음파(레이저)' },
        { label: '용도', value: '의료기기 제어' },
      ],
    },
    {
      title: '정수기 MAIN (R5F)',
      desc: 'Renesas R5F100MG 기반 정수기 메인 제어보드',
      img: '/images/products/water-purifier-main.jpg',
      specs: [
        { label: '전원', value: '24VDC' },
        { label: 'MCU', value: 'R5F100MGAFA (Renesas)' },
        { label: '제어 대상', value: 'MOTOR, PUMP, COMPRESSOR, FAN, 히터' },
        { label: '용도', value: '정수기 메인 제어' },
      ],
    },
    {
      title: '공기청정기 MAIN',
      desc: 'Renesas MCU 기반 BLDC/STEPPING 모터 + LCD 제어',
      img: '/images/products/air-purifier-main.jpg',
      specs: [
        { label: '전원', value: '12VDC' },
        { label: 'MCU', value: 'R5F100MGAFA (Renesas)' },
        { label: '제어 대상', value: 'MOTOR(BLDC, STEPPING), LCD, RGB LED' },
        { label: '용도', value: '공기청정기 메인 제어' },
      ],
    },
    {
      title: '냉장고 MAIN',
      desc: '압축기·FAN·RGB LED·센서 통합 제어 기판',
      img: '/images/products/refrigerator-main.jpg',
      specs: [
        { label: '전원', value: 'AC220V' },
        { label: 'MCU', value: 'Renesas / ATMEGA' },
        { label: '제어 대상', value: '압축기, FAN, RGB LED, LED, SENSOR' },
        { label: '용도', value: '냉장고 메인 제어' },
      ],
    },
    {
      title: '스마트부스',
      desc: 'ESP32 Wi-Fi 기반 IoT 스마트 부스 제어 시스템',
      img: '/images/products/smart-booth.jpg',
      specs: [
        { label: '전원', value: '12VDC' },
        { label: 'MCU', value: 'ESP32 (Wi-Fi 내장)' },
        { label: '제어 대상', value: 'LED, DOOR, FAN' },
        { label: '통신', value: 'Wi-Fi' },
      ],
    },
    {
      title: '정수기 MAIN (PIC)',
      desc: 'Microchip PIC16F887 기반 정수기 메인 제어보드',
      img: '/images/products/chungho-ice-550.jpg',
      specs: [
        { label: '전원', value: '24VDC' },
        { label: 'MCU', value: 'PIC16F887 (Microchip)' },
        { label: '제어 대상', value: 'PUMP, COMPRESSOR, FAN, HEATER, LCD' },
        { label: '용도', value: '정수기 메인 제어' },
      ],
    },
    {
      title: '인체감지 레이더 통신모듈',
      desc: '레이더 기반 인체 감지 및 통신 모듈',
      img: '/images/products/radar-sensor-module.jpg',
      specs: [
        { label: '센서', value: '레이더(Radar) 인체감지' },
        { label: '통신', value: '무선 통신 모듈' },
        { label: '용도', value: '인체감지, 보안, IoT' },
        { label: '특징', value: '비접촉 감지' },
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
            Embedded Controllers
          </motion.div>
          <motion.h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}>
            시스템의 완벽한 두뇌.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-600">임베디드 컨트롤러.</span>
          </motion.h1>
          <motion.p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto font-light tracking-tight" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}>
            가전·의료·산업용 장비의 핵심 메인 제어보드.<br className="hidden md:block" />
            실제 양산 중인 MCU 기반 제어 솔루션.
          </motion.p>
        </section>

        {/* Products Grid */}
        <section className="max-w-7xl mx-auto px-6 mb-32">
          <ProductNav />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((p, i) => (
              <motion.div
                key={p.title}
                className="group bg-[#0a0a0a] border border-white/5 rounded-[2rem] overflow-hidden cursor-pointer hover:bg-[#111] transition-colors duration-500 relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
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

      {/* Detail Modal */}
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
