import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { useImage } from '../contexts/SiteContentContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BusinessNav from '../components/BusinessNav';
import BusinessOverview from '../components/BusinessOverview';

interface Feature {
  key: string;
  image: string;
  fallback?: string;
  solutions: string[];
  boards: string[];
}

const STOCK = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`;

const features: Feature[] = [
  {
    key: 'f0',
    image: '/images/products/centrifuge.jpg',
    fallback: STOCK('photo-1576091160550-2173dba999ef'),
    solutions: [
      'BLDC 모터 정밀 속도(RPM/RCF) 제어',
      '불균형 감지·도어 인터록·과속 보호',
      '프로토콜 저장·자동 사이클 운영',
      '터치 디스플레이 UI / 운영 로그 기록',
    ],
    boards: ['Main PCB', 'POWER PCB', 'Display (HMI)'],
  },
  {
    key: 'f1',
    image: '/images/products/medical-device.jpg',
    fallback: STOCK('photo-1530026405186-ed1f139313f8'),
    solutions: [
      '정밀 아날로그 신호 처리 / ADC 회로',
      '측정 시퀀스 자동화 및 결과 데이터 산출',
      'USB / Ethernet / 시리얼 결과 전송',
      '의료기기 환경 대응 EMC·안전 설계',
    ],
    boards: ['Main PCB', 'POWER PCB', 'Display (HMI)', 'SMPS'],
  },
  {
    key: 'f2',
    image: '/images/products/dental-scaler.jpg',
    fallback: STOCK('photo-1606811971618-4486d14f3f99'),
    solutions: [
      '초음파 핸드피스 주파수·출력 정밀 제어',
      '워터 라인 솔레노이드 / 풋스위치 연동',
      '출력 단계 가변·과부하 보호 회로',
      '의료기기 안전 규격 대응 설계',
    ],
    boards: ['Main PCB', 'POWER PCB', 'Display (HMI)'],
  },
];

export default function BusinessMedical() {
  const _img0 = useImage('biz.med.f0.img', '/images/products/centrifuge.jpg');
  const _img1 = useImage('biz.med.f1.img', '/images/products/medical-device.jpg');
  const _img2 = useImage('biz.med.f2.img', '/images/products/dental-scaler.jpg');
  const _imgMap: Record<string,string> = {'/images/products/centrifuge.jpg': _img0, '/images/products/medical-device.jpg': _img1, '/images/products/dental-scaler.jpg': _img2};
  const { t } = useTranslation();
  const [selected, setSelected] = useState<Feature | null>(null);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="relative pt-40 pb-24 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-xs tracking-widest text-gray-400 uppercase mb-8">
              {t('business.medicalTag')}
            </span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
              {t('business.medicalTitle1')}
              <br />
              <span className="bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
                {t('business.medicalTitle2')}
              </span>
            </h1>
            <p className="text-lg text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
              {t('business.medicalDesc')}
            </p>
          </motion.div>
        </div>
      </section>

      <BusinessNav />

      <BusinessOverview />

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
                whileHover={{ y: -3 }}
                className="relative rounded-[2rem] bg-[#0a0a0a] border border-white/5 overflow-hidden group aspect-[4/3] cursor-pointer ts-card"
                onClick={() => setSelected(feature)}
              >
                <img
                  src={_imgMap[feature.image] || feature.image}
                  alt={t(`bizMedical.${feature.key}n`)}
                  className="absolute inset-0 w-full h-full object-cover opacity-60 transition-transform duration-1000 group-hover:scale-105 group-hover:opacity-80"
                  loading="lazy"
                  onError={(e) => {
                    const img = e.currentTarget as HTMLImageElement;
                    if (feature.fallback && !img.src.includes('unsplash')) img.src = feature.fallback;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                <div className="relative z-10 flex flex-col justify-end h-full p-8">
                  <h3 className="text-2xl font-bold mb-2 tracking-tight ts-card-title">{t(`bizMedical.${feature.key}n`)}</h3>
                  <p className="text-gray-400 text-sm font-light leading-relaxed">{t(`bizMedical.${feature.key}d`)}</p>
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
                  src={_imgMap[selected.image] || selected.image}
                  alt={t(`bizMedical.${selected.key}n`)}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const img = e.currentTarget as HTMLImageElement;
                    if (selected.fallback && !img.src.includes('unsplash')) img.src = selected.fallback;
                  }}
                />
              </div>

              <h2 className="text-2xl font-bold tracking-tight mb-2">{t(`bizMedical.${selected.key}n`)}</h2>
              <p className="text-gray-400 text-sm font-light leading-relaxed mb-8">{t(`bizMedical.${selected.key}d`)}</p>

              <div className="mb-8">
                <h3 className="text-xs tracking-widest text-gray-500 uppercase mb-4">태승전자가 제공하는 솔루션</h3>
                <ul className="space-y-2">
                  {selected.solutions.map((s, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-300 leading-relaxed">
                      <span className="mt-2 w-1 h-1 rounded-full bg-gray-500 shrink-0" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xs tracking-widest text-gray-500 uppercase mb-4">적용 보드 / 모듈</h3>
                <div className="flex flex-wrap gap-2">
                  {selected.boards.map((b, i) => (
                    <span key={i} className="text-xs px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-gray-300">{b}</span>
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
