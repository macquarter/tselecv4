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
    { num: '01', title: '회로·PCB설계', desc: 'Circuit & PCB Engineering', detail: '임베디드 회로 설계, PCB 아트워크, 펌웨어 개발 및 시제품 평가와 신뢰성 검사를 진행합니다.' },
    { num: '02', title: '자재입고·IQC', desc: 'Incoming Inspection', detail: '입고되는 모든 자재에 대해 엄격한 수입검사(IQC)를 실시하여 BOM 매칭과 로트 추적관리를 수행합니다.' },
    { num: '03', title: 'SMT 실장', desc: 'Surface Mount Technology', detail: 'SPI 검사, 칩마운터 실장, 리플로우 솔더링 후 AOI 인라인 검사를 진행합니다.' },
    { num: '04', title: '자삽 (자동삽입)', desc: 'Auto Insertion', detail: '액시얼·래디얼 자동삽입 후 웨이브 솔더링으로 마감합니다.' },
    { num: '05', title: '메인 조립', desc: 'Main Assembly', detail: '수삽입, 하니스 결선, 케이스 및 하우징 조립을 수행하여 최종 제품 형태를 갖춥니다.' },
    { num: '06', title: '펌웨어 다운로드', desc: 'Firmware Loading', detail: '펌웨어 라이팅, 부트로더 설정, 초기 파라미터 셋업을 진행합니다.' },
    { num: '07', title: '기능검사 (ICT)', desc: 'Functional & ICT Test', detail: '도통·전압·회로 측정 및 동작 시퀀스 100% 검증을 수행합니다.' },
    { num: '08', title: '최종 QC', desc: 'Final Quality Check', detail: '외관·라벨·시리얼 점검 후 출하 합부 최종 판정을 내립니다.' },
    { num: '09', title: '포장', desc: 'Packaging', detail: 'ESD 정전기방지 포장, 거래선별 라벨링 및 박싱을 진행합니다.' },
    { num: '10', title: '출하', desc: 'Shipping', detail: '납기 기반 출하 스케줄에 따라 거래선 인도 및 운송 관리를 수행합니다.' }
  ];

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
            설계부터 출하까지 체계적인 10단계 공정으로<br className="hidden md:block" />
            무결점 제품을 생산합니다.
          </motion.p>
        </section>

        {/* 공정도 SVG Flow Chart */}
        <section className="max-w-7xl mx-auto px-6 mb-32">
          <motion.div
            className="bg-[#0a0a0a] border border-white/5 rounded-[2rem] p-6 md:p-10 overflow-x-auto"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <svg viewBox="0 0 1400 700" xmlns="http://www.w3.org/2000/svg" role="img" className="w-full h-auto min-w-[800px]">
              <style>{`
                .h1-dark { font: 700 28px 'Pretendard', -apple-system, sans-serif; fill: #ffffff; }
                .label-dark { font: 500 13px 'Pretendard', sans-serif; fill: #737373; letter-spacing: 0.5px; }
                .star-dark { font: 600 14px 'Pretendard', sans-serif; fill: #a855f7; }
                .step-no-dark { font: 700 12px 'Menlo', 'Consolas', monospace; fill: #a855f7; letter-spacing: 1px; }
                .step-ko-dark { font: 700 17px 'Pretendard', sans-serif; fill: #ffffff; }
                .step-en-dark { font: 500 11px 'Pretendard', sans-serif; fill: #525252; letter-spacing: 0.4px; }
                .step-desc-dark { font: 400 12px 'Pretendard', sans-serif; fill: #a3a3a3; }
                .annotation-dark { font: 600 9.5px 'Pretendard', sans-serif; fill: #a855f7; letter-spacing: 0.2px; }
                .qc-tag-dark { font: 700 10px 'Pretendard', sans-serif; fill: #ffffff; letter-spacing: 0.5px; }
                .legend-title-dark { font: 700 13px 'Pretendard', sans-serif; fill: #ffffff; letter-spacing: 0.5px; }
                .legend-dark { font: 500 13px 'Pretendard', sans-serif; fill: #a3a3a3; }
                .arrow-dark { fill: none; stroke: #333333; stroke-width: 2; }
                .arrow-head-dark { fill: #525252; }
                .accent-dot-dark { fill: #a855f7; }
              `}</style>

              <rect width="1400" height="700" fill="transparent"/>

              {/* 헤더 */}
              <text x="60" y="52" className="h1-dark">제조공정도 <tspan className="star-dark">★ Manufacturing Flow</tspan></text>
              <text x="60" y="76" className="label-dark">설계부터 출하까지 10단계 양산 공정  ·  ISO 9001 품질경영  ·  3-Stage QC</text>

              {/* 카드 컨테이너 */}
              <rect x="50" y="105" width="1300" height="500" rx="16" fill="#111111" stroke="rgba(255,255,255,0.05)" strokeWidth="1.5"/>

              {/* ROW 1: 01~05 */}
              {/* 01 */}
              <rect x="80" y="150" width="220" height="120" rx="12" fill="#1a1a1a" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
              <circle cx="98" cy="168" r="3.5" className="accent-dot-dark"/>
              <text x="110" y="172" className="step-no-dark">STEP 01</text>
              <text x="98" y="200" className="step-ko-dark">회로 · PCB 설계</text>
              <text x="98" y="215" className="step-en-dark">Circuit &amp; PCB Engineering</text>
              <text x="98" y="238" className="step-desc-dark">임베디드 회로 · PCB 아트워크,</text>
              <text x="98" y="254" className="step-desc-dark">펌웨어 개발 · 시제품 평가</text>

              <line x1="305" y1="210" x2="320" y2="210" className="arrow-dark"/>
              <polygon points="320,205 330,210 320,215" className="arrow-head-dark"/>

              {/* 02 */}
              <rect x="335" y="150" width="220" height="120" rx="12" fill="#1a1a1a" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
              <circle cx="353" cy="168" r="3.5" className="accent-dot-dark"/>
              <text x="365" y="172" className="step-no-dark">STEP 02</text>
              <rect x="498" y="160" width="42" height="18" rx="9" fill="#a855f7"/>
              <text x="519" y="173" className="qc-tag-dark" style={{textAnchor:'middle'}}>QC ①</text>
              <text x="353" y="200" className="step-ko-dark">자재 입고 · IQC</text>
              <text x="353" y="215" className="step-en-dark">Incoming Inspection</text>
              <text x="353" y="238" className="step-desc-dark">입고 부품 전수 수입검사,</text>
              <text x="353" y="254" className="step-desc-dark">BOM 매칭 · 로트 추적관리</text>

              <line x1="560" y1="210" x2="575" y2="210" className="arrow-dark"/>
              <polygon points="575,205 585,210 575,215" className="arrow-head-dark"/>

              {/* 03 */}
              <rect x="590" y="150" width="220" height="120" rx="12" fill="#1a1a1a" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
              <circle cx="608" cy="168" r="3.5" className="accent-dot-dark"/>
              <text x="620" y="172" className="step-no-dark">STEP 03</text>
              <text x="608" y="200" className="step-ko-dark">SMT 실장</text>
              <text x="608" y="215" className="step-en-dark">Surface Mount Technology</text>
              <text x="608" y="238" className="step-desc-dark">SPI · 칩마운터 · 리플로우,</text>
              <text x="608" y="254" className="step-desc-dark">AOI 인라인 검사</text>

              <line x1="815" y1="210" x2="830" y2="210" className="arrow-dark"/>
              <polygon points="830,205 840,210 830,215" className="arrow-head-dark"/>

              {/* 04 */}
              <rect x="845" y="150" width="220" height="120" rx="12" fill="#1a1a1a" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
              <circle cx="863" cy="168" r="3.5" className="accent-dot-dark"/>
              <text x="875" y="172" className="step-no-dark">STEP 04</text>
              <text x="863" y="200" className="step-ko-dark">자삽 (자동삽입)</text>
              <text x="863" y="215" className="step-en-dark">Auto Insertion</text>
              <text x="863" y="238" className="step-desc-dark">액시얼 · 래디얼 자동삽입,</text>
              <text x="863" y="254" className="step-desc-dark">웨이브 솔더링 마감</text>

              <line x1="1070" y1="210" x2="1085" y2="210" className="arrow-dark"/>
              <polygon points="1085,205 1095,210 1085,215" className="arrow-head-dark"/>

              {/* 05 */}
              <rect x="1100" y="150" width="220" height="120" rx="12" fill="#1a1a1a" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
              <circle cx="1118" cy="168" r="3.5" className="accent-dot-dark"/>
              <text x="1130" y="172" className="step-no-dark">STEP 05</text>
              <text x="1118" y="200" className="step-ko-dark">메인 조립</text>
              <text x="1118" y="215" className="step-en-dark">Main Assembly</text>
              <text x="1118" y="238" className="step-desc-dark">수삽 · 하니스 결선,</text>
              <text x="1118" y="254" className="step-desc-dark">케이스 · 하우징 조립</text>

              {/* 05→06 down arrow */}
              <line x1="1210" y1="270" x2="1210" y2="328" className="arrow-dark"/>
              <polygon points="1205,328 1210,338 1215,328" className="arrow-head-dark"/>

              {/* ROW 2: 06~10 (right to left) */}
              {/* 06 */}
              <rect x="1100" y="340" width="220" height="120" rx="12" fill="#1a1a1a" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
              <circle cx="1118" cy="358" r="3.5" className="accent-dot-dark"/>
              <text x="1130" y="362" className="step-no-dark">STEP 06</text>
              <text x="1118" y="390" className="step-ko-dark">펌웨어 다운로드</text>
              <text x="1118" y="405" className="step-en-dark">Firmware Loading</text>
              <text x="1118" y="428" className="step-desc-dark">펌웨어 라이팅 · 부트로더,</text>
              <text x="1118" y="444" className="step-desc-dark">초기 파라미터 셋업</text>

              <line x1="1095" y1="400" x2="1080" y2="400" className="arrow-dark"/>
              <polygon points="1080,395 1070,400 1080,405" className="arrow-head-dark"/>

              {/* 07 */}
              <rect x="845" y="340" width="220" height="120" rx="12" fill="#1a1a1a" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
              <circle cx="863" cy="358" r="3.5" className="accent-dot-dark"/>
              <text x="875" y="362" className="step-no-dark">STEP 07</text>
              <rect x="1008" y="350" width="42" height="18" rx="9" fill="#a855f7"/>
              <text x="1029" y="363" className="qc-tag-dark" style={{textAnchor:'middle'}}>QC ②</text>
              <text x="863" y="390" className="step-ko-dark">기능검사 (ICT)</text>
              <text x="863" y="405" className="step-en-dark">Functional &amp; ICT Test</text>
              <text x="863" y="428" className="step-desc-dark">도통 · 전압 · 회로 측정,</text>
              <text x="863" y="444" className="step-desc-dark">동작 시퀀스 100% 검증</text>

              <line x1="840" y1="400" x2="825" y2="400" className="arrow-dark"/>
              <polygon points="825,395 815,400 825,405" className="arrow-head-dark"/>

              {/* 08 */}
              <rect x="590" y="340" width="220" height="120" rx="12" fill="#1a1a1a" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
              <circle cx="608" cy="358" r="3.5" className="accent-dot-dark"/>
              <text x="620" y="362" className="step-no-dark">STEP 08</text>
              <rect x="753" y="350" width="42" height="18" rx="9" fill="#a855f7"/>
              <text x="774" y="363" className="qc-tag-dark" style={{textAnchor:'middle'}}>QC ③</text>
              <text x="608" y="390" className="step-ko-dark">최종 QC</text>
              <text x="608" y="405" className="step-en-dark">Final Quality Check</text>
              <text x="608" y="428" className="step-desc-dark">외관 · 라벨 · 시리얼 점검,</text>
              <text x="608" y="444" className="step-desc-dark">출하 합부 최종 판정</text>

              <line x1="585" y1="400" x2="570" y2="400" className="arrow-dark"/>
              <polygon points="570,395 560,400 570,405" className="arrow-head-dark"/>

              {/* 09 */}
              <rect x="335" y="340" width="220" height="120" rx="12" fill="#1a1a1a" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
              <circle cx="353" cy="358" r="3.5" className="accent-dot-dark"/>
              <text x="365" y="362" className="step-no-dark">STEP 09</text>
              <text x="353" y="390" className="step-ko-dark">포장</text>
              <text x="353" y="405" className="step-en-dark">Packaging</text>
              <text x="353" y="428" className="step-desc-dark">ESD 정전기방지 포장,</text>
              <text x="353" y="444" className="step-desc-dark">거래선별 라벨링 · 박싱</text>

              <line x1="330" y1="400" x2="315" y2="400" className="arrow-dark"/>
              <polygon points="315,395 305,400 315,405" className="arrow-head-dark"/>

              {/* 10 (accent card) */}
              <rect x="80" y="340" width="220" height="120" rx="12" fill="#a855f7"/>
              <circle cx="98" cy="358" r="3.5" fill="#ffffff"/>
              <text x="110" y="362" style={{font:"700 12px 'Menlo', monospace", fill:'#ffffff', letterSpacing:'1px'}}>STEP 10</text>
              <text x="98" y="390" style={{font:"700 17px 'Pretendard', sans-serif", fill:'#ffffff'}}>출하</text>
              <text x="98" y="405" style={{font:"500 11px 'Pretendard', sans-serif", fill:'rgba(255,255,255,0.7)'}}>Shipping</text>
              <text x="98" y="428" style={{font:"400 12px 'Pretendard', sans-serif", fill:'rgba(255,255,255,0.85)'}}>납기 기반 출하 스케줄,</text>
              <text x="98" y="444" style={{font:"400 12px 'Pretendard', sans-serif", fill:'rgba(255,255,255,0.85)'}}>거래선 인도 · 운송 관리</text>

              {/* 구분선 */}
              <line x1="80" y1="500" x2="1320" y2="500" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>

              {/* 하단 범례 */}
              <text x="80" y="530" className="legend-title-dark">3-Stage 품질관리</text>
              <rect x="220" y="518" width="18" height="14" rx="7" fill="#a855f7"/>
              <text x="230" y="529" className="qc-tag-dark" style={{textAnchor:'middle'}}>QC</text>
              <text x="248" y="530" className="legend-dark">① 입고검사 (IQC)  ·  ② 펌웨어·기능검사 (ICT)  ·  ③ 출하 전 최종검사</text>

              <text x="80" y="558" className="legend-title-dark">핵심 보유 역량</text>
              <text x="220" y="558" className="legend-dark">회로 설계 · 펌웨어 개발 · 신뢰성 검증 · 양산 조립 · 출하 품질관리</text>

              <text x="80" y="586" className="legend-title-dark">대응 카테고리</text>
              <text x="220" y="586" className="legend-dark">임베디드 컨트롤러  ·  HMI 솔루션  ·  주변기기 및 커스텀 (ODM/OEM)</text>

              {/* 푸터 */}
              <text x="80" y="650" className="label-dark" style={{fontSize:'11px'}}>© 2026 태승전자(주) TSELEC  ·  Manufacturing Process v6.0  ·  ISO 9001 인증 라인</text>
            </svg>
          </motion.div>
        </section>

        {/* Interactive Process Steps */}
        <section className="max-w-7xl mx-auto px-6 mb-32">
          <div className="text-center mb-20">
            <h2 className="text-3xl font-bold mb-4 tracking-tight">공정 상세</h2>
            <p className="text-gray-400 font-light">각 공정을 클릭하여 상세 내용을 확인하세요.</p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
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
                <h3 className="text-base font-bold mt-8 mb-2 tracking-tight transition-opacity duration-300 group-hover:opacity-0 relative z-10">{step.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed font-light transition-opacity duration-300 group-hover:opacity-0 relative z-10">{step.desc}</p>
                <div className="absolute inset-0 bg-[#111]/95 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-[2rem] flex items-center justify-center z-20 border border-white/10">
                  <span className="text-white font-medium translate-y-2 group-hover:translate-y-0 transition-all duration-300 text-sm">자세히 보기</span>
                </div>
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
