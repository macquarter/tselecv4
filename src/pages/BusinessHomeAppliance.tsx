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
    image: '/images/products/refrigerator-display.jpg',
    fallback: STOCK('photo-1571175443880-49e1d25b2bc5'),
    specs: [
      { label: '프로세서', value: '32-bit ARM Cortex-M' },
      { label: '온도 정밀도', value: '±0.3°C' },
      { label: '제어 채널', value: '최대 4존 독립 제어' },
      { label: '통신', value: 'UART, I2C, Wi-Fi 모듈 지원' },
    ],
    applications: ['양문형 냉장고', '김치냉장고', '업소용 냉장·냉동고', '와인셀러'],
  },
  {
    key: 'f1',
    image: '/images/products/water-purifier-ice.jpg',
    fallback: STOCK('photo-1548839140-29a749e1cf4d'),
    specs: [
      { label: '냉각 제어', value: '인버터 컴프레서 구동' },
      { label: '필터 관리', value: '자동 교체 알림' },
      { label: '안전 기능', value: '누수 감지, UV 살균' },
      { label: '인터페이스', value: '터치 패널, LED 표시' },
    ],
    applications: ['직수형 정수기', '얼음정수기', '냉온정수기', '업소용 정수기'],
  },
  {
    key: 'f2',
    image: '/images/products/range-hood.jpg',
    fallback: STOCK('photo-1556909114-f6e7ad7d3136'),
    specs: [
      { label: '모터 제어', value: 'BLDC 3단 풍량' },
      { label: '센서 연동', value: '가스·연기 자동 감지' },
      { label: '소음 레벨', value: '< 35dB (저속)' },
      { label: '조명', value: 'LED 디밍 제어' },
    ],
    applications: ['빌트인 레인지후드', '벽걸이형 후드', '아일랜드 후드', '업소용 환기설비'],
  },
  {
    key: 'f3',
    image: '/images/products/air-purifier-main.jpg',
    fallback: STOCK('photo-1585771724684-38269d6639fd'),
    specs: [
      { label: '센서', value: 'PM2.5, PM10, VOC, CO2' },
      { label: '모터 제어', value: 'BLDC 인버터' },
      { label: '필터 관리', value: '수명 자동 산출' },
      { label: '연결', value: 'Wi-Fi, BLE' },
    ],
    applications: ['가정용 공기청정기', '차량용 공기청정기', '상업용 공기청정기', '공기청정 에어컨'],
  },
];

export default function BusinessHomeAppliance() {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<Feature | null>(null);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="relative pt-40 pb-24 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-xs tracking-widest text-gray-400 uppercase mb-8">
              {t('business.homeApplianceTag')}
            </span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
              {t('business.homeApplianceTitle1')}
              <br />
              <span className="bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
                {t('business.homeApplianceTitle2')}
              </span>
            </h1>
            <p className="text-lg text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
              {t('business.homeApplianceDesc')}
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
                  alt={t(`bizHome.${feature.key}n`)}
                  className="absolute inset-0 w-full h-full object-cover opacity-60 transition-transform duration-1000 group-hover:scale-105 group-hover:opacity-80"
                  loading="lazy"
                  onError={(e) => {
                    const img = e.currentTarget as HTMLImageElement;
                    if (feature.fallback && !img.src.includes('unsplash')) img.src = feature.fallback;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                <div className="relative z-10 flex flex-col justify-end h-full p-8">
                  <h3 className="text-2xl font-bold mb-2 tracking-tight">{t(`bizHome.${feature.key}n`)}</h3>
                  <p className="text-gray-400 text-sm font-light leading-relaxed">{t(`bizHome.${feature.key}d`)}</p>
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
                <img src={selected.image} alt={t(`bizHome.${selected.key}n`)} className="w-full h-full object-cover" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
              </div>

              <h2 className="text-2xl font-bold tracking-tight mb-2">{t(`bizHome.${selected.key}n`)}</h2>
              <p className="text-gray-400 text-sm font-light leading-relaxed mb-8">{t(`bizHome.${selected.key}d`)}</p>

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
                <div className="flex flex-wrap gap-2">
                  {selected.applications.map((app, i) => (
                    <span key={i} className="px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-xs text-gray-300">{app}</span>
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
