import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Shield, Cpu, Layers, CheckCircle2, Zap, Eye, Package, Truck, Wrench, CircuitBoard, Microchip, ThermometerSun, Factory } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

interface ProcessStep {
  num: string;
  title: string;
  eng: string;
  desc: string;
  detail: string;
  equipment: string[];
  qcTag?: string;
  icon: React.ReactNode;
}

export default function Process() {
  const [hoveredStep, setHoveredStep] = useState<string | null>(null);
  const [selectedStep, setSelectedStep] = useState<ProcessStep | null>(null);

  const steps: ProcessStep[] = [
    {
      num: '01', title: '회로·PCB설계', eng: 'Circuit & PCB Engineering',
      desc: '임베디드 회로 · PCB 아트워크',
      detail: '임베디드 회로 설계, PCB 아트워크, 펌웨어 개발 및 시제품 평가와 신뢰성 검사를 진행합니다. 고객 요구사양 분석부터 회로도(Schematic) 설계, 다층 PCB 아트워크, 시뮬레이션 검증까지 전 과정을 자체 수행합니다.',
      equipment: ['OrCAD / Altium Designer', 'SPICE 시뮬레이션', '4~8층 PCB 설계', '3D 모델링 검증'],
      icon: <CircuitBoard size={20} />,
    },
    {
      num: '02', title: '자재입고·IQC', eng: 'Incoming Inspection',
      desc: '입고 부품 전수 수입검사',
      detail: '입고되는 모든 자재에 대해 엄격한 수입검사(IQC)를 실시합니다. BOM 매칭, 로트 추적관리, 전수 외관검사 및 전기적 특성 샘플링 테스트를 통해 불량 부품의 라인 투입을 원천 차단합니다.',
      equipment: ['LCR 미터', '디지털 마이크로스코프', 'BOM 자동 매칭 시스템', '로트 추적 관리 (MES)'],
      qcTag: 'QC ①',
      icon: <Eye size={20} />,
    },
    {
      num: '03', title: 'SMT 실장', eng: 'Surface Mount Technology',
      desc: 'SPI · 칩마운터 · 리플로우',
      detail: 'SPI(Solder Paste Inspection)로 크림납 인쇄 품질을 검사하고, 고속 칩마운터로 부품을 실장한 후 리플로우 오븐에서 납땜합니다. AOI(자동광학검사)로 실장 상태를 100% 인라인 검사합니다.',
      equipment: ['고속 칩마운터 3대', 'SPI 검사기', '10존 리플로우 오븐', 'AOI 자동광학검사기'],
      icon: <Microchip size={20} />,
    },
    {
      num: '04', title: '자삽 (자동삽입)', eng: 'Auto Insertion',
      desc: '액시얼·래디얼 자동삽입',
      detail: '액시얼(Axial) 및 래디얼(Radial) 부품을 자동삽입기로 정확하게 삽입한 후, 웨이브 솔더링으로 안정적인 납땜을 완성합니다. DIP 부품의 정밀한 위치 정렬과 균일한 납땜 품질을 보장합니다.',
      equipment: ['액시얼 자동삽입기', '래디얼 자동삽입기', '웨이브 솔더링 머신', '질소 분위기 납땜'],
      icon: <Factory size={20} />,
    },
    {
      num: '05', title: '메인 조립', eng: 'Main Assembly',
      desc: '수삽 · 하니스 결선',
      detail: '수삽입(Manual Insertion), 하니스(Harness) 결선, 케이스 및 하우징 조립을 수행하여 최종 제품 형태를 완성합니다. 숙련된 작업자와 지그(Jig) 기반 조립으로 일관된 품질을 유지합니다.',
      equipment: ['전용 조립 지그', '토크 드라이버', '정전기 방지 작업대', '작업 표준서(SOP)'],
      icon: <Wrench size={20} />,
    },
    {
      num: '06', title: '펌웨어 다운로드', eng: 'Firmware Loading',
      desc: '펌웨어 라이팅 · 부트로더',
      detail: '자체 개발 펌웨어를 MCU에 다운로드하고, 부트로더 설정 및 초기 파라미터 셋업을 진행합니다. 시리얼 넘버 부여와 함께 펌웨어 버전 관리 시스템으로 이력을 추적합니다.',
      equipment: ['ISP/JTAG 라이터', '자동 프로그래밍 지그', '펌웨어 버전 관리 시스템', '시리얼 넘버 자동 부여'],
      icon: <Cpu size={20} />,
    },
    {
      num: '07', title: '기능검사 (ICT)', eng: 'Functional & ICT Test',
      desc: '도통·전압·회로 100% 검증',
      detail: '자동 ICT(In-Circuit Test)로 도통, 저항, 전압, 전류를 측정하고, 기능검사(Functional Test)로 실제 동작 시퀀스를 100% 검증합니다. 불량 보드의 출하를 완벽하게 차단하는 핵심 품질 관문입니다.',
      equipment: ['ICT 테스터', '기능검사 전용 지그', '오실로스코프', '데이터 로거'],
      qcTag: 'QC ②',
      icon: <Zap size={20} />,
    },
    {
      num: '08', title: '최종 QC', eng: 'Final Quality Check',
      desc: '외관·라벨·시리얼 점검',
      detail: '최종 출하 전 외관 검사, 라벨 부착 상태, 시리얼 넘버 확인, 포장 상태를 종합 점검합니다. AQL(Acceptable Quality Level) 기준에 따른 샘플링 검사와 전수 육안 검사를 병행합니다.',
      equipment: ['AQL 샘플링 검사', '외관 검사 (3배율)', '라벨 스캐너', '출하 판정 체크시트'],
      qcTag: 'QC ③',
      icon: <CheckCircle2 size={20} />,
    },
    {
      num: '09', title: '포장', eng: 'Packaging',
      desc: 'ESD 정전기방지 포장',
      detail: 'ESD 정전기방지 포장재로 제품을 보호하고, 거래선별 라벨링 및 박싱을 진행합니다. 수분 방지를 위한 방습 포장과 충격 보호 완충재를 적용하여 운송 중 제품 손상을 방지합니다.',
      equipment: ['ESD 포장재', '방습 포장(실리카겔)', '완충 포장재', '바코드 라벨 프린터'],
      icon: <Package size={20} />,
    },
    {
      num: '10', title: '출하', eng: 'Shipping',
      desc: '납기 기반 출하 스케줄',
      detail: '납기 기반 출하 스케줄에 따라 거래선 인도 및 운송 관리를 수행합니다. MES 시스템과 연동된 출하 관리로 실시간 재고 현황 파악과 배송 추적이 가능합니다.',
      equipment: ['MES 출하 관리', '실시간 재고 관리', '배송 추적 시스템', '납기준수율 99% 관리'],
      icon: <Truck size={20} />,
    },
  ];

  const kpis = [
    { value: '100PPM', label: '이하 불량률', icon: <Shield size={24} className="text-green-400" /> },
    { value: '99%', label: '납기준수율', icon: <Truck size={24} className="text-blue-400" /> },
    { value: '100%', label: '검사커버리지', icon: <Eye size={24} className="text-purple-400" /> },
    { value: '50만+', label: '월 생산능력', icon: <Factory size={24} className="text-amber-400" /> },
  ];

  return (
    <div className="bg-black min-h-screen text-white selection:bg-white/30 selection:text-white">
      <Navbar />

      <main className="pt-32 pb-20">
        {/* Hero Section */}
        <section className="relative flex flex-col items-center justify-center text-center px-6 mb-24">
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
            완벽을 향한 여정.
            <br />
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
            설계부터 출하까지 체계적인 10단계 공정으로
            <br className="hidden md:block" />
            무결점 제품을 생산합니다.
          </motion.p>
        </section>

        {/* KPI Cards */}
        <section className="max-w-7xl mx-auto px-6 mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {kpis.map((kpi, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative rounded-2xl bg-[#0a0a0a] border border-white/5 p-6 text-center group hover:border-white/10 transition-colors duration-500"
              >
                <div className="flex justify-center mb-3">{kpi.icon}</div>
                <div className="text-3xl md:text-4xl font-bold tracking-tight mb-1">{kpi.value}</div>
                <div className="text-sm text-gray-500">{kpi.label}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Process Flow — Interactive Cards */}
        <section className="max-w-7xl mx-auto px-6 mb-16">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold tracking-tight mb-2">10단계 제조 공정</h2>
            <p className="text-gray-500 font-light">각 단계를 클릭하면 상세 내용을 확인할 수 있습니다</p>
          </motion.div>

          {/* Row 1: Steps 01-05 */}
          <div className="flex flex-col gap-4 mb-4">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
              {steps.slice(0, 5).map((step, i) => (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="relative group"
                  onMouseEnter={() => setHoveredStep(step.num)}
                  onMouseLeave={() => setHoveredStep(null)}
                  onClick={() => setSelectedStep(step)}
                >
                  <div className={`relative rounded-2xl bg-[#0a0a0a] border p-5 cursor-pointer transition-all duration-500 overflow-hidden ${
                    hoveredStep === step.num ? 'border-purple-500/30 bg-[#111] shadow-lg shadow-purple-500/5 -translate-y-1' : 'border-white/5 hover:border-white/10'
                  }`}>
                    {/* Glow effect on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent transition-opacity duration-500 ${hoveredStep === step.num ? 'opacity-100' : 'opacity-0'}`} />

                    <div className="relative z-10">
                      {/* Top row: step number + QC badge */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-mono font-bold text-purple-400 tracking-widest">STEP {step.num}</span>
                        {step.qcTag && (
                          <span className="px-2 py-0.5 rounded-full bg-purple-500 text-[9px] font-bold text-white tracking-wide">{step.qcTag}</span>
                        )}
                      </div>

                      {/* Icon */}
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-all duration-500 ${
                        hoveredStep === step.num ? 'bg-purple-500/20 text-purple-400' : 'bg-white/5 text-gray-500'
                      }`}>
                        {step.icon}
                      </div>

                      {/* Title */}
                      <h3 className="text-sm font-bold tracking-tight mb-1 leading-snug">{step.title}</h3>
                      <p className="text-[11px] text-gray-500 leading-relaxed">{step.desc}</p>
                    </div>

                    {/* Animated connector arrow (not on last of row) */}
                    {i < 4 && (
                      <div className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-[calc(50%+6px)] z-20">
                        <motion.div
                          animate={{ x: hoveredStep === step.num ? [0, 3, 0] : 0 }}
                          transition={{ duration: 1, repeat: hoveredStep === step.num ? Infinity : 0 }}
                          className="text-gray-600"
                        >
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </motion.div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Turn arrow */}
            <div className="hidden md:flex justify-end pr-[10%]">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-gray-600"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </motion.div>
            </div>

            {/* Row 2: Steps 06-10 (reversed direction) */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
              {[...steps.slice(5, 10)].reverse().map((step, i) => (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="relative group"
                  onMouseEnter={() => setHoveredStep(step.num)}
                  onMouseLeave={() => setHoveredStep(null)}
                  onClick={() => setSelectedStep(step)}
                >
                  <div className={`relative rounded-2xl bg-[#0a0a0a] border p-5 cursor-pointer transition-all duration-500 overflow-hidden ${
                    step.num === '10' ? 'bg-gradient-to-br from-[#0a0a0a] to-[#111] border-purple-500/20' :
                    hoveredStep === step.num ? 'border-purple-500/30 bg-[#111] shadow-lg shadow-purple-500/5 -translate-y-1' : 'border-white/5 hover:border-white/10'
                  }`}>
                    <div className={`absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent transition-opacity duration-500 ${hoveredStep === step.num ? 'opacity-100' : 'opacity-0'}`} />

                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-mono font-bold text-purple-400 tracking-widest">STEP {step.num}</span>
                        {step.qcTag && (
                          <span className="px-2 py-0.5 rounded-full bg-purple-500 text-[9px] font-bold text-white tracking-wide">{step.qcTag}</span>
                        )}
                      </div>

                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-all duration-500 ${
                        hoveredStep === step.num ? 'bg-purple-500/20 text-purple-400' : 'bg-white/5 text-gray-500'
                      }`}>
                        {step.icon}
                      </div>

                      <h3 className="text-sm font-bold tracking-tight mb-1 leading-snug">{step.title}</h3>
                      <p className="text-[11px] text-gray-500 leading-relaxed">{step.desc}</p>
                    </div>

                    {/* Connector arrow (reversed, skip last) */}
                    {i < 4 && (
                      <div className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-[calc(50%+6px)] z-20">
                        <motion.div
                          animate={{ x: hoveredStep === step.num ? [0, -3, 0] : 0 }}
                          transition={{ duration: 1, repeat: hoveredStep === step.num ? Infinity : 0 }}
                          className="text-gray-600"
                        >
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M10 6H2M5 3L2 6l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </motion.div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Step Detail Modal */}
        <AnimatePresence>
          {selectedStep && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 flex items-center justify-center px-6 bg-black/80 backdrop-blur-sm"
              onClick={() => setSelectedStep(null)}
            >
              <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 40, scale: 0.96 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-[2rem] bg-[#0a0a0a] border border-white/10 p-8 md:p-10"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedStep(null)}
                  className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <X size={16} />
                </button>

                {/* Step badge */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.05 }}
                  className="flex items-center gap-2 mb-5"
                >
                  <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs text-purple-400 font-mono font-bold tracking-widest">
                    STEP {selectedStep.num}
                  </span>
                  {selectedStep.qcTag && (
                    <span className="px-2.5 py-1 rounded-full bg-purple-500 text-[10px] font-bold text-white tracking-wide">
                      {selectedStep.qcTag}
                    </span>
                  )}
                </motion.div>

                {/* Icon + Title */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.08 }}
                  className="flex items-center gap-3 mb-2"
                >
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                    {selectedStep.icon}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold tracking-tight">{selectedStep.title}</h2>
                    <p className="text-sm text-gray-500">{selectedStep.eng}</p>
                  </div>
                </motion.div>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="text-gray-400 text-sm font-light leading-relaxed mt-5 mb-8"
                >
                  {selectedStep.detail}
                </motion.p>

                {/* Equipment / Key Items */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.12 }}
                >
                  <h4 className="text-xs tracking-widest text-gray-500 uppercase mb-3">주요 장비 및 시스템</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {selectedStep.equipment.map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.25, delay: 0.15 + i * 0.05 }}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06]"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
                        <span className="text-sm text-gray-300">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ═══════ Bottom Sections: QC, Capabilities, Categories ═══════ */}
        <section className="max-w-7xl mx-auto px-6 mt-8 mb-32">
          {/* 3-Stage Quality Control */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                <Shield size={20} className="text-purple-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold tracking-tight">3-Stage 품질관리</h3>
                <p className="text-sm text-gray-500">입고부터 출하까지 3중 품질 게이트</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                {
                  stage: 'QC ①',
                  title: '입고검사 (IQC)',
                  subtitle: 'Incoming Quality Control',
                  desc: '전 자재 수입검사를 통해 불량 부품의 라인 투입을 원천 차단합니다. BOM 매칭과 로트 추적으로 자재 이력을 100% 관리합니다.',
                  color: 'from-green-500/10 to-transparent',
                  borderColor: 'border-green-500/20',
                  dotColor: 'bg-green-400',
                  items: ['전수 외관검사', 'LCR 전기적 측정', 'BOM 자동 매칭', '로트 추적 관리'],
                },
                {
                  stage: 'QC ②',
                  title: '기능검사 (ICT)',
                  subtitle: 'In-Circuit & Functional Test',
                  desc: 'ICT 자동 테스트와 기능검사를 통해 모든 보드의 전기적 특성과 동작 시퀀스를 100% 검증합니다.',
                  color: 'from-blue-500/10 to-transparent',
                  borderColor: 'border-blue-500/20',
                  dotColor: 'bg-blue-400',
                  items: ['도통·저항·전압 측정', '동작 시퀀스 검증', '오실로스코프 파형 확인', '데이터 로깅'],
                },
                {
                  stage: 'QC ③',
                  title: '출하검사 (OQC)',
                  subtitle: 'Outgoing Quality Control',
                  desc: '출하 전 최종 외관·기능·포장 상태를 종합 점검합니다. AQL 기준 샘플링과 전수 육안 검사를 병행합니다.',
                  color: 'from-amber-500/10 to-transparent',
                  borderColor: 'border-amber-500/20',
                  dotColor: 'bg-amber-400',
                  items: ['AQL 샘플링 검사', '외관 3배율 검사', '라벨·시리얼 확인', '출하 판정 체크시트'],
                },
              ].map((qc, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  className={`rounded-2xl bg-[#0a0a0a] border ${qc.borderColor} p-7 relative overflow-hidden group hover:border-white/15 transition-all duration-500`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-b ${qc.color} opacity-50`} />
                  <div className="relative z-10">
                    <span className="inline-block px-2.5 py-1 rounded-full bg-purple-500 text-[10px] font-bold text-white tracking-wide mb-4">
                      {qc.stage}
                    </span>
                    <h4 className="text-lg font-bold tracking-tight mb-1">{qc.title}</h4>
                    <p className="text-[11px] text-gray-500 mb-4">{qc.subtitle}</p>
                    <p className="text-sm text-gray-400 font-light leading-relaxed mb-5">{qc.desc}</p>
                    <div className="space-y-2">
                      {qc.items.map((item, j) => (
                        <div key={j} className="flex items-center gap-2.5">
                          <div className={`w-1.5 h-1.5 rounded-full ${qc.dotColor} shrink-0`} />
                          <span className="text-xs text-gray-400">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Core Capabilities + Response Categories — Two Column */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 핵심 보유 역량 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-2xl bg-[#0a0a0a] border border-white/5 p-8 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-cyan-500/5 to-transparent rounded-bl-full" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                    <Cpu size={20} className="text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-bold tracking-tight">핵심 보유 역량</h3>
                </div>
                <div className="space-y-3">
                  {[
                    { label: '회로 설계', desc: 'OrCAD / Altium 기반 다층 PCB 설계' },
                    { label: '펌웨어 개발', desc: 'ARM Cortex-M 기반 임베디드 SW 자체 개발' },
                    { label: '신뢰성 검증', desc: '온도·습도·진동 등 환경시험 대응' },
                    { label: '양산 조립', desc: '3개 SMT 라인, 월 50만대+ 생산체제' },
                    { label: '출하 품질관리', desc: '3-Stage QC, 100PPM 이하 불량률' },
                  ].map((cap, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                      className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] hover:border-white/[0.08] transition-all duration-300"
                    >
                      <div className="w-2 h-2 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                      <div>
                        <span className="text-sm font-semibold text-white">{cap.label}</span>
                        <p className="text-xs text-gray-500 mt-0.5">{cap.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* 대응 카테고리 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-2xl bg-[#0a0a0a] border border-white/5 p-8 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-orange-500/5 to-transparent rounded-bl-full" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                    <Layers size={20} className="text-orange-400" />
                  </div>
                  <h3 className="text-xl font-bold tracking-tight">대응 카테고리</h3>
                </div>
                <div className="space-y-4">
                  {[
                    {
                      title: '임베디드 컨트롤러',
                      desc: '가전·산업용 MCU 제어보드 설계 및 양산',
                      tags: ['ARM Cortex-M', '8/16/32bit MCU', 'RTOS'],
                    },
                    {
                      title: 'HMI 솔루션',
                      desc: '디스플레이 패널 및 터치 인터페이스 개발',
                      tags: ['LCD/OLED', 'Touch Panel', 'GUI 개발'],
                    },
                    {
                      title: '커스텀 ODM/OEM',
                      desc: '고객 요구에 맞춘 맞춤형 제어보드 턴키 개발',
                      tags: ['회로설계', '펌웨어', '인증 지원'],
                    },
                  ].map((cat, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                      className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] hover:border-white/[0.08] transition-all duration-300"
                    >
                      <h4 className="text-sm font-bold mb-1">{cat.title}</h4>
                      <p className="text-xs text-gray-500 mb-3">{cat.desc}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {cat.tags.map((tag, j) => (
                          <span key={j} className="px-2 py-0.5 rounded-md bg-orange-500/10 border border-orange-500/15 text-[10px] text-orange-300 font-medium">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ISO Footer Note */}
        <section className="max-w-7xl mx-auto px-6 mb-20">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <p className="text-xs text-gray-600 tracking-wide">
              © 2026 태승전자(주) TSELEC Co., Ltd. · Manufacturing Process v6.0 · ISO 9001 인증 라인
            </p>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}