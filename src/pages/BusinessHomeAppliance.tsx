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

export default function BusinessHomeAppliance() {
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);

  const features: Feature[] = [
    {
      title: '냉장고 컨트롤러',
      desc: '정밀 온도 제어와 에너지 효율을 극대화하는 냉장고 전용 MCU 솔루션',
      image: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?auto=format&fit=crop&w=800&q=80',
      details: {
        overview: '태승전자의 냉장고 컨트롤러는 멀티 존 온도 제어, 인버터 컴프레서 구동, 디스플레이 인터페이스를 하나의 MCU로 통합 관리합니다. 저전력 설계로 에너지 등급 향상에 기여하며, 다양한 냉장고 라인업에 유연하게 적용 가능합니다.',
        specs: [
          { label: '프로세서', value: '32-bit ARM Cortex-M4' },
          { label: '온도 정밀도', value: '±0.3°C' },
          { label: '제어 채널', value: '최대 4존 독립 제어' },
          { label: '통신', value: 'UART, I2C, Wi-Fi 모듈 지원' },
        ],
        applications: ['양문형 냉장고', '김치냉장고', '업소용 냉장·냉동고', '와인셀러'],
      },
    },
    {
      title: '세탁기 제어보드',
      desc: '다양한 세탁 모드와 모터 구동을 안정적으로 제어하는 통합 보드',
      image: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=800&q=80',
      details: {
        overview: 'DD(Direct Drive) 모터부터 BLDC 모터까지 다양한 모터 타입을 지원하는 세탁기 전용 제어보드입니다. 진동 감지 센서와 연동하여 불균형 보정 알고리즘을 내장하고 있으며, IoT 연동을 통한 원격 제어가 가능합니다.',
        specs: [
          { label: '모터 제어', value: 'FOC 벡터 제어' },
          { label: '최대 RPM', value: '1,600 RPM' },
          { label: '세탁 모드', value: '최대 20가지 프로그램' },
          { label: '안전 기능', value: '누수 감지, 도어 잠금' },
        ],
        applications: ['드럼 세탁기', '통돌이 세탁기', '건조기', '세탁건조기 복합'],
      },
    },
    {
      title: '에어컨 인버터',
      desc: '고효율 BLDC 모터 인버터 기반의 쾌적한 냉난방 제어 시스템',
      image: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&w=800&q=80',
      details: {
        overview: '태승전자의 에어컨 인버터 솔루션은 고효율 BLDC 컴프레서 모터를 정밀하게 제어하여 소비 전력을 최소화합니다. PFC(역률 보정) 회로 내장으로 전력 품질을 높이고, 저소음 PWM 제어로 쾌적한 실내 환경을 만들어줍니다.',
        specs: [
          { label: '효율', value: 'SEER 6.0 이상 지원' },
          { label: '입력 전압', value: 'AC 220V ±15%' },
          { label: '냉매 호환', value: 'R32, R410A' },
          { label: '소음 레벨', value: '< 22dB (실내기)' },
        ],
        applications: ['벽걸이 에어컨', '스탠드 에어컨', '시스템 에어컨', '창문형 에어컨'],
      },
    },
    {
      title: '소형가전 MCU',
      desc: '청소기, 공기청정기 등 소형 생활가전을 위한 저전력 MCU 솔루션',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80',
      details: {
        overview: '8/16비트 저전력 MCU를 기반으로 다양한 소형가전에 적용 가능한 범용 제어 솔루션입니다. 터치 키 인터페이스, LED 디스플레이 드라이버, 모터 제어를 원칩으로 구현하여 BOM 비용을 절감합니다.',
        specs: [
          { label: '프로세서', value: '8/16-bit MCU' },
          { label: '동작 전류', value: '< 5mA (활성 모드)' },
          { label: '터치 키', value: '최대 12채널' },
          { label: '패키지', value: 'QFP, SOP 다양' },
        ],
        applications: ['로봇청소기', '공기청정기', '가습기', '전기밥솥'],
      },
    },
  ];

  return (
    <div className="bg-black min-h-screen text-white selection:bg-white/30 selection:text-white">
      <Navbar />

      <main className="pt-32 pb-20">
        <section className="relative flex flex-col items-center justify-center text-center px-6 mb-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block mb-6 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-sm font-medium text-gray-300"
          >
            Home Appliance
          </motion.div>
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            일상을 바꾸는 기술.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-600">
              가전 제어 솔루션.
            </span>
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto font-light tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            냉장고, 세탁기, 에어컨 등<br className="hidden md:block" />
            생활가전의 핵심 제어 기술을 제공합니다.
          </motion.p>
        </section>

        <section className="max-w-7xl mx-auto px-6 mb-32">
          <BusinessNav />
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
                    <svg className="ml-1 w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <Footer />

      <AnimatePresence>
        {selectedFeature && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedFeature(null)} />
            <motion.div
              className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-[#111] border border-white/10 rounded-[2rem] p-8 md:p-10"
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <button
                onClick={() => setSelectedFeature(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>

              <div className="h-48 rounded-2xl overflow-hidden mb-8 border border-white/5">
                <img src={selectedFeature.image} alt={selectedFeature.title} className="w-full h-full object-cover opacity-70" />
              </div>

              <h2 className="text-3xl font-bold mb-3 tracking-tight">{selectedFeature.title}</h2>
              <p className="text-gray-400 leading-relaxed mb-8 font-light">{selectedFeature.details.overview}</p>

              <div className="bg-black/50 border border-white/5 rounded-2xl p-6 mb-8">
                <h3 className="text-sm font-bold text-gray-300 uppercase tracking-wider mb-4">주요 사양</h3>
                <div className="space-y-3">
                  {selectedFeature.details.specs.map((spec, i) => (
                    <div key={i} className="flex justify-between text-sm border-b border-white/5 pb-3 last:border-0 last:pb-0">
                      <span className="text-gray-500">{spec.label}</span>
                      <span className="text-white font-medium">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-gray-300 uppercase tracking-wider mb-4">적용 분야</h3>
                <div className="grid grid-cols-2 gap-3">
                  {selectedFeature.details.applications.map((app, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: 0.15 + i * 0.06 }}
                      className="group relative"
                    >
                      <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="relative px-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-sm text-gray-300 text-center transition-all duration-300 group-hover:bg-white/[0.08] group-hover:text-white group-hover:border-white/[0.12] group-hover:-translate-y-[2px] group-hover:shadow-lg group-hover:shadow-black/20">
                        {app}
                      </div>
                    </motion.div>
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
