import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BusinessNav from '../components/BusinessNav';

interface Feature {
  title: string;
  desc: string;
  image: string;
  details: {
    overview: string;
    specs: { label: string; value: string }[];
    applications: string[];
  };
}

const features: Feature[] = [
  {
    title: '태양광 패널 제어',
    desc: '태양광 발전 시스템의 MPPT 제어와 모니터링을 위한 솔루션',
    image: '/images/products/solar-panel.jpg',
    details: {
      overview:
        '태양광 패널에서 생산되는 DC 전력을 최적으로 관리하는 제어보드입니다. MPPT(최대전력점추적) 알고리즘으로 기상 조건 변화에 따른 최적 발전량을 확보하며, 계통 연계 보호 기능과 발전량 모니터링 기능을 내장하고 있습니다.',
      specs: [
        { label: '변환 효율', value: '최대 98.5%' },
        { label: 'MPPT 트래커', value: '최대 4채널 독립' },
        { label: '출력 범위', value: '3kW ~ 100kW' },
        { label: '계통 연계', value: 'IEEE 1547 / KC 적합' },
      ],
      applications: ['주택용 태양광', '상업용 태양광', '대규모 발전소', '건물 일체형(BIPV)'],
    },
  },
  {
    title: '수소 시스템 제어',
    desc: '수소 연료전지·전해조의 핵심 제어와 안전 관리 솔루션',
    image: '/images/products/hydrogen.jpg',
    details: {
      overview:
        '수소 연료전지 스택의 출력 제어와 수전해 시스템의 운전 관리를 위한 보드입니다. 수소 누출 감지, 압력·온도 제어, 스택 전압 모니터링 등 다중 안전 기능을 내장하여 수소 에너지 시스템의 안전하고 효율적인 운영을 지원합니다.',
      specs: [
        { label: '스택 모니터링', value: '셀 전압 개별 측정' },
        { label: '안전 감지', value: '수소 누출·압력·온도' },
        { label: '제어 출력', value: '밸브·펌프·블로워' },
        { label: '통신', value: 'CAN, RS-485, Ethernet' },
      ],
      applications: ['수소 연료전지 발전', '수소 드론', '수소 지게차', '수전해 시스템'],
    },
  },
  {
    title: '리튬이온 충전기 제어',
    desc: '리튬이온 배터리의 안전한 충방전 관리를 위한 BMS 솔루션',
    image: '/images/products/lithium-charger.jpg',
    details: {
      overview:
        '리튬이온 배터리 팩의 CC/CV 충전 제어, 셀 밸런싱, SOC/SOH 추정, 과충전·과방전 보호를 통합 수행하는 BMS 보드입니다. 다양한 배터리 용량과 전압에 대응하는 유연한 설계로 전기이동수단, ESS 등 폭넓은 분야에 적용됩니다.',
      specs: [
        { label: '셀 모니터링', value: '최대 16S' },
        { label: 'SOC 정확도', value: '±2%' },
        { label: '보호 기능', value: '과충전·과방전·과전류·과열' },
        { label: '밸런싱', value: '패시브 밸런싱' },
      ],
      applications: ['전동 킥보드', '전기자전거', '소형 ESS', '산업용 배터리 팩'],
    },
  },
  {
    title: '연료전지 제어',
    desc: '연료전지 발전 시스템의 스택 운전과 BoP를 통합 관리하는 솔루션',
    image: '/images/products/fuel-cell-pbu.jpg',
    details: {
      overview:
        'PEMFC/SOFC 연료전지 스택의 출력 제어와 Balance of Plant(BoP) 장비를 통합 관리하는 제어보드입니다. 공기·연료 유량 조절, 가습기 제어, 열관리 등을 자동화하며, 부하 변동에 대한 빠른 응답 제어를 지원합니다.',
      specs: [
        { label: '출력 범위', value: '1kW ~ 100kW' },
        { label: 'BoP 제어', value: '블로워, 밸브, 펌프, 가습기' },
        { label: '응답 속도', value: '< 500ms (부하 변동)' },
        { label: '효율', value: '시스템 효율 40% 이상' },
      ],
      applications: ['가정용 연료전지', '건물용 연료전지', '이동형 발전기', '선박용 발전'],
    },
  },
];

export default function BusinessRenewable() {
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-40 pb-24 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-xs tracking-widest text-gray-400 uppercase mb-8">
              Renewable Energy
            </span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
              지속 가능한 미래.
              <br />
              <span className="bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
                신재생에너지 제어 솔루션.
              </span>
            </h1>
            <p
              className="text-lg text-gray-400 font-light max-w-2xl mx-auto leading-relaxed"
              dangerouslySetInnerHTML={{
                __html:
                  '태양광, 수소, 리튬이온 충전 등<br/>친환경 에너지 시스템 제어 기술을 제공합니다.',
              }}
            />
          </motion.div>
        </div>
      </section>

      <BusinessNav />

      {/* Features Grid */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative rounded-[2rem] bg-[#0a0a0a] border border-white/5 overflow-hidden group aspect-[4/3] cursor-pointer"
                onClick={() => setSelectedFeature(feature)}
              >
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-40 transition-transform duration-1000 group-hover:scale-105"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                <div className="relative z-10 flex flex-col justify-end h-full p-8">
                  <h3 className="text-2xl font-bold mb-2 tracking-tight">{feature.title}</h3>
                  <p className="text-gray-400 text-sm font-light leading-relaxed">{feature.desc}</p>
                  <span className="mt-4 inline-flex items-center text-xs text-gray-500 group-hover:text-white transition-colors">
                    자세히 보기
                    <svg
                      className="ml-1 w-3.5 h-3.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M5 12h14M12 5l7 7-7 7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedFeature && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-6 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedFeature(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.96 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-[2rem] bg-[#0a0a0a] border border-white/10 p-8 md:p-10"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedFeature(null)}
                className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.05 }}
                className="text-2xl font-bold tracking-tight mb-4"
              >
                {selectedFeature.title}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.08 }}
                className="text-gray-400 text-sm font-light leading-relaxed mb-8"
              >
                {selectedFeature.details.overview}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.12 }}
                className="mb-8"
              >
                <h3 className="text-xs tracking-widest text-gray-500 uppercase mb-4">주요 사양</h3>
                <div className="grid grid-cols-2 gap-3">
                  {selectedFeature.details.specs.map((spec, i) => (
                    <div key={i} className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-4">
                      <span className="text-[11px] text-gray-500 block mb-1">{spec.label}</span>
                      <span className="text-sm font-medium">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.16 }}
              >
                <h3 className="text-xs tracking-widest text-gray-500 uppercase mb-4">적용 분야</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedFeature.details.applications.map((app, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-xs text-gray-300"
                    >
                      {app}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
