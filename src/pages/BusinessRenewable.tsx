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

export default function BusinessRenewable() {
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);

  const features: Feature[] = [
    {
      title: '태양광 인버터',
      desc: 'DC-AC 변환 효율을 극대화하는 태양광 발전용 인버터 제어 시스템',
      image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80',
      details: {
        overview: '태양광 패널에서 생산되는 DC 전력을 고효율로 AC 변환하는 인버터 제어 솔루션입니다. MPPT(최대전력점추적) 알고리즘으로 기상 조건 변화에 따른 최적 발전량을 확보하며, 계통 연계 보호 기능과 무효전력 보상 기능을 내장하고 있습니다.',
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
      title: 'ESS 제어',
      desc: '배터리 충방전 관리 및 전력 최적화를 위한 에너지 저장 시스템 제어',
      image: 'https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?auto=format&fit=crop&w=800&q=80',
      details: {
        overview: '리튬이온 배터리 팩의 충방전을 최적 관리하는 BMS(배터리관리시스템) 및 PCS(전력변환장치) 제어 솔루션입니다. 셀 밸런싱, SOC/SOH 추정, 열관리를 통합 수행하며, 피크 저감 및 수요 반응(DR) 운영 알고리즘을 지원합니다.',
        specs: [
          { label: '셀 모니터링', value: '최대 192셀' },
          { label: 'SOC 정확도', value: '±2%' },
          { label: '충방전 효율', value: '95% 이상 (PCS)' },
          { label: '통신', value: 'CAN, RS-485, TCP/IP' },
        ],
        applications: ['주거용 ESS', '상업·산업용 ESS', 'UPS 대체형', '마이크로그리드'],
      },
    },
    {
      title: '스마트그리드',
      desc: '분산 전원 통합 관리 및 전력망 안정화를 위한 지능형 제어 기술',
      image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80',
      details: {
        overview: '태양광, 풍력, ESS 등 분산 전원을 통합 관리하고 전력 수급 균형을 유지하는 EMS(에너지관리시스템) 제어 솔루션입니다. AI 기반 발전량 예측과 실시간 부하 관리를 통해 전력망 안정성을 확보하고 에너지 비용을 최적화합니다.',
        specs: [
          { label: '연결 DER', value: '최대 500개 관리' },
          { label: '예측 정확도', value: '발전량 예측 ±5%' },
          { label: '응답 시간', value: '< 100ms (긴급 제어)' },
          { label: '프로토콜', value: 'IEC 61850, DNP3' },
        ],
        applications: ['산업단지 마이크로그리드', '도서·산간 독립 전원', '캠퍼스 에너지 관리', '스마트시티 전력망'],
      },
    },
    {
      title: '충전 인프라',
      desc: '전기차 충전기 및 충전소 통합 관리를 위한 제어 솔루션',
      image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=800&q=80',
      details: {
        overview: '완속(7kW)부터 초급속(350kW)까지 다양한 전기차 충전기의 전력 변환 및 충전 프로토콜 제어를 담당합니다. OCPP 기반 백엔드 연동으로 원격 모니터링·결제·부하 관리가 가능하며, V2G(Vehicle-to-Grid) 양방향 충전도 지원합니다.',
        specs: [
          { label: '충전 용량', value: '7kW ~ 350kW' },
          { label: '충전 규격', value: 'CCS1/2, CHAdeMO, AC' },
          { label: '백엔드', value: 'OCPP 1.6J / 2.0.1' },
          { label: 'V2G', value: '양방향 충방전 지원' },
        ],
        applications: ['공용 급속충전소', '아파트 완속충전기', '버스·트럭 전용 충전', 'V2G 충전 스테이션'],
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
            Renewable Energy
          </motion.div>
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            지속 가능한 미래.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-600">
              신재생에너지 제어 솔루션.
            </span>
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto font-light tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            태양광 인버터, ESS 등<br className="hidden md:block" />
            친환경 에너지 시스템 제어 기술을 제공합니다.
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
