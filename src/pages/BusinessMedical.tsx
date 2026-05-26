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
    title: '원심분리기 제어보드',
    desc: '고속 회전체의 정밀 RPM 제어와 안전 인터록을 담당하는 핵심 보드',
    image: '/images/products/medical-device.jpg',
    details: {
      overview:
        '의료·연구용 원심분리기의 BLDC 모터 속도 제어, 온도 관리, 안전 인터록 기능을 통합한 제어보드입니다. 최대 15,000RPM 정밀 속도 제어와 가속·감속 프로파일 설정, 불균형 감지 자동 정지 기능으로 안전하고 재현성 높은 분리 결과를 보장합니다.',
      specs: [
        { label: '최대 회전수', value: '15,000 RPM' },
        { label: '속도 정밀도', value: '±10 RPM' },
        { label: '온도 제어', value: '냉동형 ±0.5°C' },
        { label: '안전 기능', value: '불균형 감지, 도어 인터록' },
      ],
      applications: ['혈액 원심분리기', '마이크로 원심분리기', '대용량 연구용', '산업용 원심분리기'],
    },
  },
  {
    title: '진단기 제어보드',
    desc: '체외진단 장비의 시료 이송·반응·측정을 통합 제어하는 솔루션',
    image:
      'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=80',
    details: {
      overview:
        '혈액 분석기, 면역 분석기 등 체외진단(IVD) 장비의 시료 이송, 시약 분주, 반응 제어, 광학 측정을 통합 제어하는 솔루션입니다. 마이크로리터 단위의 정밀 분주와 정확한 온도·시간 제어로 재현성 높은 검사 결과를 보장합니다.',
      specs: [
        { label: '분주 정밀도', value: '±1% (1μL 이상)' },
        { label: '온도 제어', value: '±0.1°C (반응 챔버)' },
        { label: '광학 측정', value: '340~800nm 흡광도' },
        { label: '처리 속도', value: '최대 200 test/hour' },
      ],
      applications: ['자동 혈액 분석기', '면역 분석기', '생화학 분석기', 'PCR 장비'],
    },
  },
  {
    title: '치과 스케일러 제어보드',
    desc: '초음파 진동자의 출력과 주파수를 정밀 제어하는 치과 장비 솔루션',
    image: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=800&q=80',
    details: {
      overview:
        '치과용 초음파 스케일러의 피에조 진동자 구동 주파수와 출력 파워를 정밀하게 제어하는 보드입니다. 다단계 출력 조절과 자동 주파수 추적으로 다양한 시술 상황에 대응하며, 환자 안전을 위한 과출력 자동 차단 기능을 내장하고 있습니다.',
      specs: [
        { label: '구동 주파수', value: '25~36kHz' },
        { label: '출력 단계', value: '10단 세밀 조절' },
        { label: '자동 추적', value: '공진 주파수 추적' },
        { label: '안전 기능', value: '과출력 자동 차단' },
      ],
      applications: ['치석 제거', '치주 치료', '임플란트 주위 관리', '근관 세척'],
    },
  },
];

export default function BusinessMedical() {
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
              Medical Device
            </span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
              생명을 지키는 기술.
              <br />
              <span className="bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
                의료기기 제어 솔루션.
              </span>
            </h1>
            <p
              className="text-lg text-gray-400 font-light max-w-2xl mx-auto leading-relaxed"
              dangerouslySetInnerHTML={{
                __html:
                  '원심분리기, 진단기, 치과 스케일러 등<br/>의료 장비의 안전하고 정밀한 제어 기술을 제공합니다.',
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
                    <div key={i} className="rounded-2xl bg-white/[0.03] border border-white/5 p-4">
                      <div className="text-[11px] text-gray-500 mb-1">{spec.label}</div>
                      <div className="text-sm font-medium">{spec.value}</div>
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
                      className="px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-xs text-gray-400"
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
