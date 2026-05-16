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

export default function BusinessMedical() {
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);

  const features: Feature[] = [
    {
      title: '환자모니터링',
      desc: '실시간 생체신호 측정 및 모니터링을 위한 고정밀 제어 시스템',
      image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80',
      details: {
        overview: '심전도(ECG), 혈압, 체온, SpO2 등 다채널 생체신호를 동시에 측정하고 실시간으로 표시하는 환자 모니터링 시스템 제어 솔루션입니다. 의료기기 안전 규격(IEC 60601)을 준수하는 전기적 절연 설계와 노이즈 제거 알고리즘을 내장하고 있습니다.',
        specs: [
          { label: 'ADC 분해능', value: '24-bit Sigma-Delta' },
          { label: '채널 수', value: '최대 8채널 동시 측정' },
          { label: '샘플링 레이트', value: '최대 1kSPS/채널' },
          { label: '안전 규격', value: 'IEC 60601-1 적합' },
        ],
        applications: ['베드사이드 모니터', '중환자실 모니터', '이동형 모니터', '원격 모니터링'],
      },
    },
    {
      title: '의료영상장비',
      desc: 'X-ray, CT, 초음파 등 의료 영상 장비의 핵심 제어 솔루션',
      image: 'https://images.unsplash.com/photo-1530497610245-b484e4a67824?auto=format&fit=crop&w=800&q=80',
      details: {
        overview: '의료 영상 장비의 고전압 발생, 모터 위치 제어, 이미지 프로세싱 보조 등 핵심 제어 기능을 담당합니다. 고속 DSP와 FPGA 인터페이스를 통해 대용량 영상 데이터의 실시간 처리를 지원하며, DICOM 표준 출력을 위한 연동 기능을 제공합니다.',
        specs: [
          { label: '프로세서', value: 'DSP + FPGA 하이브리드' },
          { label: '데이터 처리', value: '실시간 16-bit 영상' },
          { label: '모터 제어', value: '서보 모터 정밀 위치' },
          { label: '인터페이스', value: 'DICOM, HL7 지원' },
        ],
        applications: ['디지털 X-ray', '휴대용 초음파', 'C-arm 장비', '치과 파노라마'],
      },
    },
    {
      title: '체외진단기기',
      desc: '혈액분석, 면역진단 등 체외진단 장비를 위한 정밀 제어 기술',
      image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=80',
      details: {
        overview: '혈액 분석기, 면역 분석기, 생화학 분석기 등 체외진단(IVD) 장비의 시료 이송, 시약 분주, 반응 제어, 광학 측정을 통합 제어하는 솔루션입니다. 마이크로리터 단위의 정밀 분주와 정확한 온도·시간 제어로 재현성 높은 검사 결과를 보장합니다.',
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
      title: '치료기기 제어',
      desc: '레이저, 초음파 치료기 등 치료 장비의 안전하고 정확한 출력 제어',
      image: 'https://images.unsplash.com/photo-1551190822-a9ce113ac100?auto=format&fit=crop&w=800&q=80',
      details: {
        overview: '의료용 레이저, 고주파, 초음파 치료기의 출력 에너지를 안전하고 정밀하게 제어하는 솔루션입니다. 실시간 출력 모니터링과 다중 안전 차단 메커니즘을 내장하여 환자 안전을 최우선으로 보장하며, 다양한 치료 프로토콜의 자동 실행을 지원합니다.',
        specs: [
          { label: '출력 정밀도', value: '±2% (설정값 대비)' },
          { label: '안전 차단', value: '3중 독립 안전 회로' },
          { label: '프로토콜', value: '최대 50개 저장' },
          { label: '인증', value: 'IEC 60601-2 적합' },
        ],
        applications: ['피부과 레이저', '물리치료 초음파', '고주파 치료기', '치과 레이저'],
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
            Medical Device
          </motion.div>
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            생명을 지키는 기술.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-600">
              의료기기 제어 솔루션.
            </span>
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto font-light tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            의료 장비의 안전하고 정밀한<br className="hidden md:block" />
            제어 기술을 제공합니다.
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
                <img src={feature.image} alt={feature.title} className="absolute inset-0 w-full h-full object-cover opacity-40 transition-transform duration-1000 group-hover:scale-105" />
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
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedFeature(null)} />
            <motion.div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-[#111] border border-white/10 rounded-[2rem] p-8 md:p-10" initial={{ opacity: 0, scale: 0.9, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 30 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>
              <button onClick={() => setSelectedFeature(null)} className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
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
                <div className="flex flex-wrap gap-2">
                  {selectedFeature.details.applications.map((app, i) => (
                    <span key={i} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300">{app}</span>
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
