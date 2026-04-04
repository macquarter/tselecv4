import { motion } from 'motion/react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductNav from '../components/ProductNav';

export default function Others() {
  const specs = [
    { label: '제어 범위', value: '-20°C ~ +200°C' },
    { label: '정확도', value: '±0.5°C' },
    { label: '응답 시간', value: '< 2초' },
    { label: '입력 신호', value: 'Pt100, K-Type TC' },
    { label: '출력', value: '4-20mA, 0-10V' },
    { label: '인증', value: 'ISO 9001, CE' }
  ];

  const apps = [
    { num: '1', title: '냉방/냉동', desc: '냉동 저장실, 냉장 운송, 초저온 처리 시스템의 온도 유지에 사용되는 고신뢰성 솔루션입니다.' },
    { num: '2', title: '산업용 장비', desc: '금속 가공, 열처리, 반도체 제조 등 고정밀 온도 제어가 필요한 산업 공정에 적용됩니다.' },
    { num: '3', title: '식품 가공', desc: '식품 건조, 가열 살균, 냉각 공정에서 엄격한 온도 관리를 통해 제품 품질을 보증합니다.' },
    { num: '4', title: '농업 시설', desc: '온실, 육묘장, 축사 등에서 최적의 생육 환경 유지를 위한 환경 제어 시스템에 통합됩니다.' }
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
            Other Solutions
          </motion.div>
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            한계를 넘어서는<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-600">
              산업용 제어 솔루션.
            </span>
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto font-light tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            정밀 온도 제어부터 특수 산업 장비까지,<br className="hidden md:block" />
            태승전자의 혁신적인 기술력을 경험하세요.
          </motion.p>
        </section>

        {/* Content Section */}
        <section className="max-w-7xl mx-auto px-6 mb-32">
          <ProductNav />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-32">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-[2rem] bg-[#0a0a0a] border border-white/5 p-8 flex items-center justify-center aspect-square overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.05] to-transparent rounded-[2rem]" />
              <img 
                src="https://images.unsplash.com/photo-1581092335397-9583eb92d232?auto=format&fit=crop&w=800&q=80" 
                alt="Electro Steel Controller" 
                className="w-full h-full object-cover rounded-[1.5rem] relative z-10 transition-transform duration-1000 group-hover:scale-105 opacity-80"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">정밀 온도 제어.</h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-12 font-light">
                Electro Steel 컨트롤러는 산업용 가열 및 냉각 시스템의 정밀한 온도 제어를 담당합니다. 고급 센서 기술과 알고리즘을 통해 안정적인 온도 유지를 보장합니다.
              </p>
              
              <div className="bg-[#0a0a0a] border border-white/5 rounded-[1.5rem] overflow-hidden">
                <div className="divide-y divide-white/5">
                  {specs.map((spec, i) => (
                    <div key={i} className="flex justify-between p-5 hover:bg-white/5 transition-colors">
                      <strong className="text-white font-medium tracking-tight">{spec.label}</strong>
                      <span className="text-gray-400 font-light">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Applications Grid */}
          <motion.div 
            className="bg-[#0a0a0a] border border-white/5 rounded-[2rem] p-10 md:p-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">다양한 산업 적용 사례</h2>
              <p className="text-gray-400 font-light">다양한 분야에서 활용되는 태승전자의 기술력을 확인하세요.</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {apps.map((app, i) => (
                <motion.div 
                  key={i}
                  className="bg-[#111] border border-white/10 rounded-2xl p-8 hover:border-red-500/50 transition-colors duration-500"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center text-white font-bold text-xl mb-6 font-orbitron">
                    {app.num}
                  </div>
                  <h3 className="text-xl font-bold mb-4">{app.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{app.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}