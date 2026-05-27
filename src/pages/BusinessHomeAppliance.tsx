import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BusinessNav from '../components/BusinessNav';

interface Feature {
  title: string;
  desc: string;
  image: string;
  fallback?: string;
  details: {
    overview: string;
    specs: { label: string; value: string }[];
    applications: string[];
  };
}

// 로컬 우선, Unsplash 폴백 (이미지 누락 방지)
const STOCK = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`;

const features: Feature[] = [
  {
    title: '냉장고 Display PCB',
    desc: '냉장고 전면 디스플레이 및 온도 제어를 위한 전용 PCB 솔루션',
    image: '/images/products/refrigerator-display.jpg',
    fallback: STOCK('photo-1571175443880-49e1d25b2bc5'),
    details: {
      overview:
        '태승전자의 냉장고 Display PCB는 전면 터치 디스플레이와 멀티 존 온도 제어를 통합하는 핵심 제어보드입니다. 고객사 요구에 맞춘 커스텀 설계로 다양한 냉장고 라인업에 유연하게 대응하며, 저전력 설계로 에너지 효율 향상에 기여합니다.',
      specs: [
        { label: '프로세서', value: '32-bit ARM Cortex-M' },
        { label: '온도 정밀도', value: '±0.3°C' },
        { label: '제어 채널', value: '최대 4존 독립 제어' },
        { label: '통신', value: 'UART, I2C, Wi-Fi 모듈 지원' },
      ],
      applications: ['양문형 냉장고', '김치냉장고', '업소용 냉장·냉동고', '와인셀러'],
    },
  },
  {
    title: '얼음정수기 제어보드',
    desc: '정수·냉각·얼음 생성을 하나의 보드로 통합 제어하는 솔루션',
    image: '/images/products/water-purifier.jpg',
    fallback: STOCK('photo-1548839140-29a749e1cf4d'),
    details: {
      overview:
        '정수 필터 관리, 냉각 시스템 구동, 얼음 생성 사이클을 하나의 제어보드로 통합한 솔루션입니다. UV 살균 타이밍 제어와 필터 교체 알림, 누수 감지 기능까지 내장하여 안전하고 편리한 사용 환경을 제공합니다.',
      specs: [
        { label: '냉각 제어', value: '인버터 컴프레서 구동' },
        { label: '필터 관리', value: '자동 교체 알림' },
        { label: '안전 기능', value: '누수 감지, UV 살균' },
        { label: '인터페이스', value: '터치 패널, LED 표시' },
      ],
      applications: ['직수형 정수기', '얼음정수기', '냉온정수기', '업소용 정수기'],
    },
  },
  {
    title: '레인지후드 제어보드',
    desc: '흡입력 자동 조절과 LED 조명을 통합 제어하는 레인지후드 PCB',
    image: '/images/products/range-hood.jpg',
    fallback: STOCK('photo-1556909114-f6e7ad7d3136'),
    details: {
      overview:
        'BLDC 팬 모터 구동과 조리 환경에 따른 자동 풍량 조절, LED 조명 제어를 통합한 레인지후드 전용 PCB입니다. 가스·연기 센서와 연동하여 자동으로 흡입력을 조절하며, 저소음 설계로 쾌적한 주방 환경을 만들어줍니다.',
      specs: [
        { label: '모터 제어', value: 'BLDC 3단 풍량' },
        { label: '센서 연동', value: '가스·연기 자동 감지' },
        { label: '소음 레벨', value: '< 35dB (저속)' },
        { label: '조명', value: 'LED 디밍 제어' },
      ],
      applications: ['빌트인 레인지후드', '벽걸이형 후드', '아일랜드 후드', '업소용 환기설비'],
    },
  },
  {
    title: '공기청정기 제어보드',
    desc: '미세먼지 센서 연동과 다단 필터 시스템을 제어하는 PCB 솔루션',
    image: '/images/products/air-purifier-main.jpg',
    fallback: STOCK('photo-1585771724684-38269d6639fd'),
    details: {
      overview:
        'PM2.5/PM10 미세먼지 센서, VOC 센서와 연동하여 실내 공기질을 실시간으로 모니터링하고, HEPA 필터 팬 속도를 자동 조절하는 제어보드입니다. 필터 수명 관리와 IoT 연동을 통한 원격 제어 기능을 지원합니다.',
      specs: [
        { label: '센서', value: 'PM2.5, PM10, VOC, CO2' },
        { label: '모터 제어', value: 'BLDC 인버터' },
        { label: '필터 관리', value: '수명 자동 산출' },
        { label: '연결', value: 'Wi-Fi, BLE' },
      ],
      applications: ['가정용 공기청정기', '차량용 공기청정기', '상업용 공기청정기', '공기청정 에어컨'],
    },
  },
];

export default function BusinessHomeAppliance() {
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="relative pt-40 pb-24 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-xs tracking-widest text-gray-400 uppercase mb-8">
              Home Appliance
            </span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
              일상을 바꾸는 기술.
              <br />
              <span className="bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
                가전 제어 솔루션.
              </span>
            </h1>
            <p
              className="text-lg text-gray-400 font-light max-w-2xl mx-auto leading-relaxed"
              dangerouslySetInnerHTML={{
                __html:
                  '냉장고, 정수기, 레인지후드, 공기청정기 등<br/>생활가전의 핵심 제어보드를 공급합니다.',
              }}
            />
          </motion.div>
        </div>
      </section>

      <BusinessNav />

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
                  className="absolute inset-0 w-full h-full object-cover opacity-50 transition-transform duration-1000 group-hover:scale-105"
                  loading="lazy"
                  onError={(e) => {
                    const img = e.currentTarget as HTMLImageElement;
                    if (feature.fallback && img.src !== feature.fallback) {
                      img.src = feature.fallback;
                    }
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                <div className="relative z-10 flex flex-col justify-end h-full p-8">
                  <h3 className="text-2xl font-bold mb-2 tracking-tight">{feature.title}</h3>
                  <p className="text-gray-400 text-sm font-light leading-relaxed">{feature.desc}</p>
                  <span className="mt-4 inline-flex items-center text-xs text-gray-500 group-hover:text-white transition-colors">
                    자세히 보기
                    <svg className="ml-1 w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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

              <h2 className="text-2xl font-bold tracking-tight mb-4">{selectedFeature.title}</h2>
              <p className="text-gray-400 text-sm font-light leading-relaxed mb-8">{selectedFeature.details.overview}</p>

              <div className="mb-8">
                <h3 className="text-xs tracking-widest text-gray-500 uppercase mb-4">주요 사양</h3>
                <div className="grid grid-cols-2 gap-3">
                  {selectedFeature.details.specs.map((spec, i) => (
                    <div key={i} className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-4">
                      <span className="text-[11px] text-gray-500 block mb-1">{spec.label}</span>
                      <span className="text-sm font-medium">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xs tracking-widest text-gray-500 uppercase mb-4">적용 분야</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedFeature.details.applications.map((app, i) => (
                    <span key={i} className="px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-xs text-gray-300">
                      {app}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
