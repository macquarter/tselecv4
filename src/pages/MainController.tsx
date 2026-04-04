import { motion } from 'motion/react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductNav from '../components/ProductNav';

export default function MainController() {
  const specs = [
    { label: '프로세서', value: '32/16/8-bit MCU', desc: '다양한 응용에 맞는 프로세서 옵션' },
    { label: '전원 입력', value: '5V ~ 24V DC', desc: '전압 범위 자동 조정' },
    { label: '통신 인터페이스', value: 'UART, SPI, I2C', desc: '산업 표준 통신 프로토콜' },
    { label: '아날로그 입력', value: '8 ~ 16 채널', desc: '정밀 측정 및 제어' },
    { label: '디지털 I/O', value: '24 ~ 32 포트', desc: '센서 및 구동 신호 처리' },
    { label: '온도 범위', value: '-20°C ~ +70°C', desc: '산업용 운영 온도' },
    { label: '인증', value: 'ISO 9001, CE', desc: '국제 품질 및 안전 인증' },
    { label: '보증', value: '3년', desc: '제조 결함에 대한 무상 보증' }
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
            Main Controller
          </motion.div>
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            시스템의 완벽한 두뇌.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-600">
              메인 컨트롤러.
            </span>
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto font-light tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            가전제품부터 산업용 장비까지,<br className="hidden md:block" />
            최고의 성능과 안정성을 위한 핵심 제어 솔루션.
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
                src="https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&w=800&q=80" 
                alt="Main Controller" 
                className="w-full h-full object-cover rounded-[1.5rem] relative z-10 transition-transform duration-1000 group-hover:scale-105 opacity-80"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">고성능 제어의 중심.</h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-12 font-light">
                다양한 산업 분야에서 요구하는 복잡한 제어 로직을 안정적으로 수행하는 메인 컨트롤러입니다. 
                최신 MCU 기술을 적용하여 빠른 처리 속도와 높은 신뢰성을 보장하며, 고객의 요구사항에 맞춘 커스터마이징이 가능합니다.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { title: '고속 처리', desc: '최대 100MHz 클록 속도로 실시간 제어 가능' },
                  { title: '저전력 소비', desc: '에너지 효율적 설계로 운영 비용 절감' },
                  { title: '확장 가능', desc: '모듈식 설계로 다양한 응용에 확장 가능' },
                  { title: '신뢰성', desc: '엄격한 품질 관리로 99.5% 신뢰도 보장' }
                ].map((feature, i) => (
                  <div key={i} className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-6 hover:bg-[#111] transition-colors duration-300">
                    <h3 className="text-white font-semibold mb-2 tracking-tight">{feature.title}</h3>
                    <p className="text-gray-500 text-sm font-light leading-relaxed">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Specs Table */}
          <motion.div 
            className="bg-[#0a0a0a] border border-white/5 rounded-[2rem] overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="p-8 md:p-12 border-b border-white/10">
              <h2 className="text-2xl font-bold">제품 상세 사양</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/5">
                    <th className="p-6 text-red-500 font-bold text-sm tracking-wider uppercase border-b border-white/10">분류</th>
                    <th className="p-6 text-red-500 font-bold text-sm tracking-wider uppercase border-b border-white/10">사양</th>
                    <th className="p-6 text-red-500 font-bold text-sm tracking-wider uppercase border-b border-white/10">설명</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {specs.map((spec, i) => (
                    <tr key={i} className="hover:bg-white/5 transition-colors">
                      <td className="p-6 font-medium text-gray-300">{spec.label}</td>
                      <td className="p-6 text-white font-bold">{spec.value}</td>
                      <td className="p-6 text-gray-400 text-sm">{spec.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}