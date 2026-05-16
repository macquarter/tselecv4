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

export default function BusinessIndustrial() {
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);

  const features: Feature[] = [
    {
      title: '공장자동화 컨트롤러',
      desc: 'PLC 연동 및 실시간 공정 제어를 위한 고성능 산업용 컨트롤러',
      image: 'https://images.unsplash.com/photo-1565043666747-69f6646db940?auto=format&fit=crop&w=800&q=80',
      details: {
        overview: '다양한 산업 현장의 자동화 요구에 맞춰 설계된 고성능 컨트롤러입니다. RS-485, Modbus, CAN 등 산업 표준 프로토콜을 지원하며, 실시간 OS 기반으로 정확한 타이밍 제어가 가능합니다. 방진·방습 설계로 가혹한 산업 환경에서도 안정적으로 동작합니다.',
        specs: [
          { label: '프로세서', value: '32-bit ARM Cortex-M7' },
          { label: '통신', value: 'RS-485, Modbus, CAN 2.0' },
          { label: '동작 온도', value: '-20°C ~ +70°C' },
          { label: '보호 등급', value: 'IP54' },
        ],
        applications: ['컨베이어 시스템', '로봇 팔 제어', '자동 검사 장비', 'CNC 가공기'],
      },
    },
    {
      title: '산업용 온도제어기',
      desc: '정밀 PID 제어 알고리즘 기반의 고정도 온도 관리 시스템',
      image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=80',
      details: {
        overview: '자동 튜닝 PID 알고리즘을 탑재한 산업용 온도 제어기입니다. 열전대(K, J, T 타입) 및 RTD(Pt100) 센서를 직접 입력받아 ±0.1°C 정밀도의 온도 제어를 수행합니다. 다단계 프로파일 제어로 복잡한 열처리 공정도 자동화할 수 있습니다.',
        specs: [
          { label: '제어 정밀도', value: '±0.1°C' },
          { label: '센서 입력', value: 'K/J/T TC, Pt100 RTD' },
          { label: '제어 출력', value: 'SSR, 릴레이, 4-20mA' },
          { label: '프로파일', value: '최대 32스텝 프로그램' },
        ],
        applications: ['열처리 로', '사출 성형기', '반도체 공정', '식품 가공 라인'],
      },
    },
    {
      title: '모터 드라이브',
      desc: '산업용 모터의 속도와 토크를 정밀하게 제어하는 인버터 드라이브',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
      details: {
        overview: '0.4kW부터 75kW까지 다양한 용량의 산업용 모터를 정밀하게 제어하는 인버터 드라이브입니다. 센서리스 벡터 제어로 설치 비용을 줄이면서도 높은 토크 응답성을 확보합니다. 내장 PLC 기능으로 간단한 시퀀스 제어도 가능합니다.',
        specs: [
          { label: '용량 범위', value: '0.4kW ~ 75kW' },
          { label: '제어 방식', value: '센서리스 벡터 / V/F' },
          { label: '캐리어 주파수', value: '최대 15kHz' },
          { label: '보호 기능', value: '과전류, 과전압, 과열' },
        ],
        applications: ['펌프·팬 제어', '크레인·호이스트', '압출기·혼합기', '포장 기계'],
      },
    },
    {
      title: '빌딩 자동화',
      desc: '조명, 공조, 보안 등 빌딩 설비의 통합 제어 및 에너지 관리',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
      details: {
        overview: 'BACnet 및 KNX 프로토콜을 지원하는 빌딩 자동화 컨트롤러입니다. 조명, 공조(HVAC), 전력, 보안 시스템을 하나의 플랫폼에서 통합 관리하며, 에너지 사용량 모니터링과 스케줄 제어를 통해 운영 비용을 절감합니다.',
        specs: [
          { label: '프로토콜', value: 'BACnet/IP, KNX, Modbus' },
          { label: 'I/O 확장', value: '최대 256포인트' },
          { label: '웹 인터페이스', value: 'HTML5 기반 대시보드' },
          { label: '에너지 절감', value: '최대 30% 절감 효과' },
        ],
        applications: ['오피스 빌딩', '병원·의료시설', '대형 쇼핑몰', '데이터센터'],
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
            Industrial
          </motion.div>
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            산업의 심장을 설계하다.<br />
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
            공장 자동화, 산업용 장비 등<br className="hidden md:block" />
            고신뢰성 산업 제어 기술을 제공합니다.
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
