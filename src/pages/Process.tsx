import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

interface ProcessStep {
  num: string;
  title: string;
  desc: string;
  detail: string;
}

export default function Process() {
  const [selectedStep, setSelectedStep] = useState<ProcessStep | null>(null);

  const steps: ProcessStep[] = [
    { num: '01', title: '자재입고', desc: '입고검사 IQC', detail: '입고되는 모든 자재에 대해 엄격한 수입검사(IQC)를 실시하여 불량 자재의 공정 투입을 원천 차단합니다.' },
    { num: '02', title: '크림납 인쇄', desc: 'Cream Solder Printing', detail: 'PCB 패드 위에 정밀하게 크림납을 도포하는 공정으로, 최신 3D SPI(Solder Paste Inspection) 장비를 통해 인쇄 상태를 100% 검사합니다.' },
    { num: '03', title: 'SMT 공정', desc: '고속기/저속기 실장', detail: '고속 칩마운터와 이형 부품 마운터를 활용하여 초소형 부품부터 대형 부품까지 빠르고 정확하게 PCB에 실장합니다.' },
    { num: '04', title: '수삽입/검사', desc: 'Manual Insertion', detail: '자동화 장비로 실장하기 어려운 이형 부품이나 커넥터 등을 숙련된 작업자가 정밀하게 수삽입하고 검사합니다.' },
    { num: '05', title: '자동 납땜', desc: 'Auto Soldering', detail: 'Wave Soldering 또는 Selective Soldering 장비를 이용하여 수삽입된 부품들을 견고하게 납땜합니다.' },
    { num: '06', title: '목시검사', desc: 'Visual Inspection', detail: '숙련된 검사원이 육안 및 확대경을 통해 납땜 상태, 부품 오삽입, 미납 등을 정밀하게 검사합니다.' },
    { num: '07', title: '조립', desc: 'Assembly', detail: '완성된 PCB 어셈블리를 기구물에 조립하고 필요한 배선 작업을 수행하여 최종 제품의 형태를 갖춥니다.' },
    { num: '08', title: 'I.C.T 테스트', desc: 'In-Circuit Test', detail: 'ICT 장비를 통해 PCB 상의 각 부품의 전기적 특성(저항, 용량 등)과 단선/단락 여부를 자동으로 검사합니다.' },
    { num: '09', title: '프로그램', desc: 'Program Writing', detail: 'MCU 및 메모리 반도체에 고객이 요구하는 펌웨어 및 소프트웨어를 빠르고 정확하게 라이팅합니다.' },
    { num: '10', title: '기능검사', desc: 'Function Test', detail: '실제 사용 환경과 동일한 조건에서 제품의 모든 기능이 정상적으로 동작하는지 종합적으로 테스트합니다.' },
    { num: '11', title: '포장/출하', desc: 'Packaging/Shipping', detail: '최종 합격된 제품을 정전기 방지 포장재 등으로 안전하게 포장하여 고객이 원하는 납기에 맞춰 출하합니다.' }
  ];

  const getArrowVisibility = (i: number) => {
    const isHiddenMobile = i % 2 === 1;
    const isHiddenSm = i % 3 === 2;
    const isHiddenMd = i % 4 === 3;
    const isHiddenLg = i % 6 === 5;
    
    let classes = isHiddenMobile ? 'hidden ' : 'block ';
    classes += isHiddenSm ? 'sm:hidden ' : 'sm:block ';
    classes += isHiddenMd ? 'md:hidden ' : 'md:block ';
    classes += isHiddenLg ? 'lg:hidden ' : 'lg:block ';
    
    return classes.trim();
  };

  const kpis = [
    { value: '100PPM 이하', label: '불량률' },
    { value: '99%', label: '납기준수율' },
    { value: '100%', label: '검사커버리지' },
    { value: '30만개~', label: '월생산량' }
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
            Manufacturing Process
          </motion.div>
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            완벽을 향한 여정.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-600">
              제조 공정.
            </span>
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto font-light tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            엄격한 품질 관리와 체계적인 11단계 공정으로<br className="hidden md:block" />
            무결점 제품을 생산합니다.
          </motion.p>
        </section>

        {/* Process Steps */}
        <section className="max-w-7xl mx-auto px-6 mb-32">
          <div className="text-center mb-20">
            <h2 className="text-3xl font-bold mb-4 tracking-tight">11단계 제조 프로세스</h2>
            <p className="text-gray-400 font-light">각 공정을 클릭하여 상세 내용을 확인하세요.</p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {steps.map((step, i) => (
              <motion.div 
                key={step.num}
                layoutId={`step-${step.num}`}
                onClick={() => setSelectedStep(step)}
                className="bg-[#0a0a0a] border border-white/5 rounded-[2rem] p-6 text-center hover:bg-[#111] transition-colors duration-500 relative mt-8 group cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[#1a1a1a] border border-white/10 flex items-center justify-center text-white font-medium text-sm shadow-xl group-hover:bg-white group-hover:text-black transition-colors duration-500 z-30">
                  {step.num}
                </div>
                <h3 className="text-lg font-bold mt-8 mb-2 tracking-tight transition-opacity duration-300 group-hover:opacity-0 relative z-10">{step.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed font-light transition-opacity duration-300 group-hover:opacity-0 relative z-10">{step.desc}</p>
                <div className="absolute inset-0 bg-[#111]/95 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-[2rem] flex items-center justify-center z-20 border border-white/10">
                  <span className="text-white font-medium translate-y-2 group-hover:translate-y-0 transition-all duration-300">자세히 보기</span>
                </div>

                {/* Blood Flow Dynamic Arrow */}
                {i < steps.length - 1 && (
                  <div className={`absolute top-1/2 -right-6 w-6 h-6 -translate-y-1/2 z-0 pointer-events-none overflow-visible ${getArrowVisibility(i)}`}>
                    <motion.div
                      className="absolute top-1/2 -translate-y-1/2 text-red-600"
                      initial={{ opacity: 0, x: -10, scale: 0.8 }}
                      animate={{ 
                        opacity: [0, 1, 1, 0], 
                        x: [-5, 10, 20, 25],
                        scale: [0.8, 1.2, 1.2, 0.8]
                      }}
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        repeatDelay: 2.2,
                        ease: "easeInOut",
                        delay: i * 0.3
                      }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-[0_0_8px_rgba(220,38,38,0.9)]">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </motion.div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </section>

        {/* KPIs */}
        <section className="max-w-7xl mx-auto px-6">
          <motion.div 
            className="bg-[#0a0a0a] border border-white/5 rounded-[2rem] p-12 md:p-20 text-center relative overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent" />
            <h3 className="text-3xl font-bold mb-4 tracking-tight relative z-10">핵심 품질 성과</h3>
            <p className="text-gray-400 font-light mb-16 relative z-10">숫자로 증명하는 태승전자의 제조 경쟁력.</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 relative z-10">
              {kpis.map((kpi, i) => (
                <motion.div 
                  key={kpi.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="text-4xl md:text-5xl font-bold tracking-tighter mb-3">{kpi.value}</div>
                  <div className="text-gray-500 text-sm font-light">{kpi.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
      </main>

      {/* Step Detail Modal */}
      <AnimatePresence>
        {selectedStep && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-xl z-50 flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedStep(null)}
          >
            <motion.div
              layoutId={`step-${selectedStep.num}`}
              className="bg-[#0a0a0a] border border-white/10 rounded-[2rem] p-10 md:p-14 max-w-lg w-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedStep(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center text-xl font-bold mb-8">
                {selectedStep.num}
              </div>
              <h3 className="text-3xl font-bold mb-2 tracking-tight">{selectedStep.title}</h3>
              <p className="text-gray-500 text-sm mb-8">{selectedStep.desc}</p>
              <p className="text-gray-300 leading-relaxed font-light text-lg">{selectedStep.detail}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
