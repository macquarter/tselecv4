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
    title: '산업용 식기세척기',
    desc: '고온 세척·헹굼·건조 전 공정을 자동 제어하는 산업용 솔루션',
    image: 'https://images.unsplash.com/photo-1585659722983-3a675dabf23d?auto=format&fit=crop&w=800&q=80',
    details: {
      overview:
        '대형 업소용 식기세척기의 세척·헹굼·건조·배수 전 공정을 자동 제어하는 메인보드입니다. 워터 레벨 센서, 온도 센서, 도어 스위치 등 다양한 센서 입력을 처리하고, 고온(80°C 이상) 헹굼 사이클 제어로 위생 기준을 충족합니다.',
      specs: [
        { label: '온도 제어', value: '최대 90°C 정밀 제어' },
        { label: '세척 모드', value: '최대 8가지 프로그램' },
        { label: '센서 입력', value: '수위·온도·도어 감지' },
        { label: '안전 기능', value: '누수 차단, 과열 보호' },
      ],
      applications: ['업소용 식기세척기', '컨베이어형 세척기', '글라스워셔', '산업용 부품세척기'],
    },
  },
  {
    title: '산업용 온도제어기',
    desc: '정밀 PID 제어 알고리즘 기반의 산업 현장 온도 관리 시스템',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=800&q=80',
    details: {
      overview:
        '자동 튜닝 PID 알고리즘을 탑재한 산업용 온도 제어기 전용 보드입니다. 열전대(K, J, T 타입) 및 RTD(Pt100) 센서를 직접 입력받아 ±0.1°C 정밀도의 온도 제어를 수행합니다. 다단계 프로파일 제어로 복잡한 열처리 공정도 자동화할 수 있습니다.',
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
    title: '펌프 제어보드',
    desc: '수위 감지부터 인버터 모터 구동까지 통합하는 펌프 제어 솔루션',
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=80',
    details: {
      overview:
        '산업용·건물용 펌프 시스템의 수위 감지, 압력 제어, 인버터 모터 구동을 통합 관리하는 제어보드입니다. 다중 펌프 교대 운전 알고리즘과 이상 진동 감지 기능으로 설비 수명을 연장하고 에너지 효율을 극대화합니다.',
      specs: [
        { label: '모터 제어', value: '인버터 0.4~15kW' },
        { label: '센서', value: '수위·압력·유량·진동' },
        { label: '운전 모드', value: '교대·병렬·대기' },
        { label: '통신', value: 'RS-485, Modbus RTU' },
      ],
      applications: ['급수·배수 펌프', '순환 펌프', '가압 펌프', '소방 펌프'],
    },
  },
  {
    title: '회의부스 1인부스',
    desc: '조명·환기·전원을 스마트하게 제어하는 1인 프라이빗 부스 솔루션',
    image: '/images/products/smart-booth.jpg',
    details: {
      overview:
        '1인 집중 업무 공간인 프라이빗 부스의 LED 조명, 환기 팬, 전원 콘센트, 재실 감지를 하나의 제어보드로 통합 관리합니다. PIR 센서로 자동 ON/OFF 하여 에너지를 절약하고, 조도·환기량 자동 조절로 쾌적한 업무 환경을 제공합니다.',
      specs: [
        { label: '조명', value: 'LED 디밍 3단계' },
        { label: '환기', value: 'DC 팬 자동 제어' },
        { label: '감지', value: 'PIR 재실 센서' },
        { label: '전원', value: 'USB-C PD, 220V 콘센트' },
      ],
      applications: ['오피스 1인 부스', '도서관 집중석', '공유오피스 포커스룸', '공항·역사 워크스테이션'],
    },
  },
  {
    title: '회의부스 회의룸',
    desc: '다인 회의 공간의 조명·AV·공조를 통합 제어하는 스마트 솔루션',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    details: {
      overview:
        '4~8인 회의 부스의 LED 조명, 환기 시스템, AV 장비 전원, 예약 디스플레이를 통합 제어하는 보드입니다. CO2 센서 연동 자동 환기와 회의 예약 시스템 연동으로 스마트 오피스 환경을 구현합니다.',
      specs: [
        { label: '조명', value: 'LED 시나리오 4모드' },
        { label: '공조', value: 'CO2 센서 연동 환기' },
        { label: 'AV 제어', value: 'HDMI·전원 자동 관리' },
        { label: '예약 연동', value: '외부 디스플레이 출력' },
      ],
      applications: ['회의실 부스', '화상회의 부스', '상담실', '교육실'],
    },
  },
];

export default function BusinessIndustrial() {
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
              Industrial
            </span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
              산업의 심장을 설계하다.
              <br />
              <span className="bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
                산업용 제어 솔루션.
              </span>
            </h1>
            <p
              className="text-lg text-gray-400 font-light max-w-2xl mx-auto leading-relaxed"
              dangerouslySetInnerHTML={{
                __html:
                  '식기세척기, 펌프, 회의부스, 온도제어기 등<br/>산업용 장비의 핵심 제어 기술을 제공합니다.',
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
