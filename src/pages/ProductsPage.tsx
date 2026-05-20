import { motion } from 'motion/react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductNav from '../components/ProductNav';

export default function ProductsPage() {
  const products = [
    {
      id: 'freezer-main',
      title: '냉동고 MAIN',
      desc: '냉동고 전용 메인 컨트롤러 기판',
      img: '/images/products/freezer-main.jpg',
      link: '/main-controller'
    },
    {
      id: 'medical-device',
      title: '의료기기 제어보드',
      desc: 'AC220V 전원, ATMEGA16L MCU 기반 의료기기 제어',
      img: '/images/products/medical-device.jpg',
      link: '/main-controller'
    },
    {
      id: 'water-purifier-main',
      title: '정수기 MAIN',
      desc: '24VDC, Renesas MCU 기반 정수기 메인 제어보드',
      img: '/images/products/water-purifier-main.jpg',
      link: '/main-controller'
    },
    {
      id: 'air-purifier-main',
      title: '공기청정기 MAIN',
      desc: '12VDC, BLDC/STEPPING 모터 제어 및 LCD 디스플레이',
      img: '/images/products/air-purifier-main.jpg',
      link: '/main-controller'
    },
    {
      id: 'refrigerator-main',
      title: '냉장고 MAIN',
      desc: 'AC220V 전원, 압축기·FAN·RGB LED·센서 통합 제어',
      img: '/images/products/refrigerator-main.jpg',
      link: '/main-controller'
    },
    {
      id: 'smart-booth',
      title: '스마트부스',
      desc: 'ESP32 기반 Wi-Fi 연동형 스마트 부스 제어 시스템',
      img: '/images/products/smart-booth.jpg',
      link: '/main-controller'
    },
    {
      id: 'fuel-cell-pbu',
      title: '연료전지 PBU',
      desc: '연료전지 Power Board Unit 제어 기판',
      img: '/images/products/fuel-cell-pbu.jpg',
      link: '/others'
    },
    {
      id: 'smps-25v',
      title: 'SMPS 25V/2.0A',
      desc: '25V 2.0A 출력 스위칭 모드 전원공급장치',
      img: '/images/products/smps-25v.jpg',
      link: '/others'
    },
    {
      id: 'smps-120w',
      title: 'SMPS 120W',
      desc: '120W급 고출력 스위칭 모드 전원공급장치',
      img: '/images/products/smps-120w.jpg',
      link: '/others'
    },
    {
      id: 'air-purifier-power',
      title: '공기청정기 POWER',
      desc: '220VAC 전원, 모터 구동 전용 파워보드',
      img: '/images/products/air-purifier-power.jpg',
      link: '/others'
    },
    {
      id: 'refrigerator-display',
      title: '냉장고 DISPLAY',
      desc: '냉장고 전면 디스플레이 제어 모듈',
      img: '/images/products/refrigerator-display.jpg',
      link: '/display'
    },
    {
      id: 'water-purifier-power',
      title: '정수기 POWER',
      desc: '정수기 전용 파워 서플라이 보드',
      img: '/images/products/water-purifier-power.jpg',
      link: '/others'
    },
  ];

  return (
    <div className="bg-black min-h-screen text-white selection:bg-white/30 selection:text-white">
      <Navbar />

      <main className="pt-32 pb-20">
        {/* Hero Section */}
        <section className="relative flex flex-col items-center justify-center text-center px-6 mb-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block mb-6 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-sm font-medium text-gray-300"
          >
            Products
          </motion.div>
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            모든 혁신의 중심.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-600">
              태승전자 제어 솔루션.
            </span>
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto font-light tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            가전·의료·산업용 장비까지,<br className="hidden md:block" />
            실제 양산 중인 제어 기판 라인업.
          </motion.p>
        </section>

        {/* Products Grid */}
        <section className="max-w-7xl mx-auto px-6 mb-32">
          <ProductNav />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, i) => (
              <motion.a
                href={product.link}
                key={product.id}
                className="group relative rounded-[2rem] overflow-hidden bg-[#0a0a0a] border border-white/5 block h-[420px]"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Product image - centered board photo */}
                <div className="absolute inset-0 flex items-center justify-center p-8 pt-20">
                  <img
                    src={product.img}
                    alt={product.title}
                    className="max-w-full max-h-full object-contain transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/80" />

                {/* Top label */}
                <div className="absolute top-6 left-6 z-10">
                  <span className="text-[10px] font-semibold tracking-widest text-gray-500 uppercase">PCB Module</span>
                </div>

                {/* Bottom info */}
                <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
                  <h3 className="text-xl font-bold mb-1.5 tracking-tight group-hover:text-white transition-colors">{product.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed font-light">{product.desc}</p>
                </div>

                {/* Arrow */}
                <div className="absolute bottom-8 right-8 z-20 w-9 h-9 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </div>
              </motion.a>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
