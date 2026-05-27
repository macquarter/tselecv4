import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BusinessNav from '../components/BusinessNav';

interface Feature {
  key: string;
  image: string;
  fallback?: string;
  specs: { label: string; value: string }[];
  applications: string[];
}

const STOCK = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`;

const features: Feature[] = [
  {
    key: 'f0',
    image: '/images/products/industrial-dishwasher.jpg',
    fallback: STOCK('photo-1581622558663-b2e33377dfb2'),
    specs: [
      { label: '세척 온도', value: '60~85°C 단계 제어' },
      { label: '시간 설정', value: '60s ~ 240s 가변' },
      { label: '제어 방식', value: 'PID + 시퀀스 로직' },
      { label: '소비 전력', value: '6kW급 부하 제어' },
    ],
    applications: ['업소 주방', '단체급식 시설', '호텔·리조트', '병원 식기 처리'],
  },
  {
    key: 'f1',
    image: '/images/products/industrial-temp-controller.jpg',
    fallback: STOCK('photo-1581094794326-c0a7060a4b48'),
    specs: [
      { label: '온도 범위', value: '-50°C ~ +400°C' },
      { label: '정밀도', value: '±0.2°C' },
      { label: '제어 알고리즘', value: 'Fuzzy + PID Hybrid' },
      { label: '입출력', value: 'RTD, T/C, Relay, SSR' },
    ],
    applications: ['반도체 공정', '플라스틱 사출', '식품 가공', '화학 공정'],
  },
  {
    key: 'f2',
    image: '/images/products/industrial-pump.jpg',
    fallback: STOCK('photo-1581094794326-c0a7060a4b48'),
    specs: [
      { label: '모터 구동', value: 'BLDC 인버터' },
      { label: '센서', value: '수위·압력·유량 통합' },
      { label: '제어', value: '회전수 PID 가변' },
      { label: '보호 기능', value: '공운전·과부하 차단' },
    ],
    applications: ['상수도 부스터', '난방·온수 순환', '농업용 양수기', '산업 냉각수'],
  },
  {
    key: 'f3',
    image: '/images/products/industrial-booth-single.jpg',
    fallback: STOCK('photo-1497366216548-37526070297c'),
    specs: [
      { label: '조명 제어', value: 'LED 디밍 + 색온도' },
      { label: '환기', value: 'CO2 센서 연동 자동' },
      { label: '전원', value: 'USB-C / 220V 듀얼' },
      { label: '점유 감지', value: 'PIR + 도어 센서' },
    ],
    applications: ['공유 오피스', '도서관·스터디카페', '병원 진료실', '재택 워크부스'],
  },
  {
    key: 'f4',
    image: '/images/products/industrial-booth-meeting.jpg',
    fallback: STOCK('photo-1497366754035-f200968a6e72'),
    specs: [
      { label: '조명 시나리오', value: '회의·집중·휴식 모드' },
      { label: 'AV 제어', value: 'HDMI + 사운드바' },
      { label: '공조', value: '4ZONE 균등 환기' },
      { label: '예약 연동', value: '캘린더 API 지원' },
    ],
    applications: ['기업 회의실', '코워킹 스페이스', '교육 기관 그룹실', '컨퍼런스 라운지'],
  },
];

export default function BusinessIndustrial() {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<Feature | null>(null);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="relative pt-40 pb-24 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-xs tracking-widest text-gray-400 uppercase mb-8">
              {t('business.industrialTag')}
            </span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
              {t('business.industrialTitle1')}
              <br />
              <span className="bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
                {t('business.industrialTitle2')}
              </span>
            </h1>
            <p className="text-lg text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
              {t('business.industrialDesc')}
            </p>
          </motion.div>
        </div>
      </section>

      <BusinessNav />

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={feature.key}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative rounded-[2rem] bg-[#0a0a0a] border border-white/5 overflow-hidden group aspect-[4/3] cursor-pointer"
                onClick={() => setSelected(feature)}
              >
                <img
                  src={feature.image}
                  alt={t(`bizIndustrial.${feature.key}n`)}
                  className="absolute inset-0 w-full h-full object-cover opacity-60 transition-transform duration-1000 group-hover:scale-105 group-hover:opacity-80"
                  loading="lazy"
                  onError={(e) => {
                    const img = e.currentTarget as HTMLImageElement;
                    if (feature.fallback && !img.src.includes('unsplash')) img.src = feature.fallback;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                <div className="relative z-10 flex flex-col justify-end h-full p-8">
                  <h3 className="text-2xl font-bold mb-2 tracking-tight">{t(`bizIndustrial.${feature.key}n`)}</h3>
                  <p className="text-gray-400 text-sm font-light leading-relaxed">{t(`bizIndustrial.${feature.key}d`)}</p>
                  <span className="mt-4 inline-flex items-center text-xs text-gray-500 group-hover:text-white transition-colors">
                    {t('common.detail')}
                    <svg className="ml-1 w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selected && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="fixed inset-0 z-50 flex items-center justify-center px-6 bg-black/80 backdrop-blur-sm" onClick={() => setSelected(null)}>
            <motion.div initial={{ opacity: 0, y: 40, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 40, scale: 0.96 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[2rem] bg-[#0a0a0a] border border-white/10 p-8 md:p-10" onClick={(e) => e.stopPropagation()}>
              <button onClick={() => setSelected(null)} className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors z-10">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>

              <div className="mb-6 rounded-2xl overflow-hidden aspect-video bg-[#111] border border-white/5">
                <img
                  src={selected.image}
                  alt={t(`bizIndustrial.${selected.key}n`)}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const img = e.currentTarget as HTMLImageElement;
                    if (selected.fallback && !img.src.includes('unsplash')) img.src = selected.fallback;
                  }}
                />
              </div>

              <h2 className="text-2xl font-bold tracking-tight mb-2">{t(`bizIndustrial.${selected.key}n`)}</h2>
              <p className="text-gray-400 text-sm font-light leading-relaxed mb-8">{t(`bizIndustrial.${selected.key}d`)}</p>

              <div className="mb-8">
                <h3 className="text-xs tracking-widest text-gray-500 uppercase mb-4">{t('common.specs')}</h3>
                <div className="grid grid-cols-2 gap-3">
                  {selected.specs.map((spec, i) => (
                    <div key={i} className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-4">
                      <span className="text-[11px] text-gray-500 block mb-1">{spec.label}</span>
                      <span className="text-sm font-medium">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xs tracking-widest text-gray-500 uppercase mb-4">{t('common.applications')}</h3>
                <ul className="grid grid-cols-2 gap-2">
                  {selected.applications.map((app, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                      <span className="w-1 h-1 rounded-full bg-gray-600" />
                      {app}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
