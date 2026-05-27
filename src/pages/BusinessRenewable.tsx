import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BusinessNav from '../components/BusinessNav';

interface Feature {
  key: string;
  image: string;
  modalImage: string;
  specs: { label: string; value: string }[];
  applications: string[];
}

const STOCK = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`;

const features: Feature[] = [
  {
    key: 'f0',
    image: STOCK('photo-1509391366360-2e959784a276'),
    modalImage: '/images/products/solar-panel.jpg',
    specs: [
      { label: '변환 효율', value: '최대 98.5%' },
      { label: 'MPPT 트래커', value: '최대 4채널 독립' },
      { label: '출력 범위', value: '3kW ~ 100kW' },
      { label: '계통 연계', value: 'IEEE 1547 / KC 적합' },
    ],
    applications: ['주택용 태양광', '상업용 태양광', '대규모 발전소', '건물 일체형(BIPV)'],
  },
  {
    key: 'f1',
    image: STOCK('photo-1466611653911-95081537e5b7'),
    modalImage: '/images/products/hydrogen.jpg',
    specs: [
      { label: '스택 모니터링', value: '셀 전압 개별 측정' },
      { label: '안전 감지', value: '수소 누출·압력·온도' },
      { label: '제어 출력', value: '밸브·펌프·블로워' },
      { label: '통신', value: 'CAN, RS-485, Ethernet' },
    ],
    applications: ['수소 연료전지 발전', '수소 드론', '수소 지게차', '수전해 시스템'],
  },
  {
    key: 'f2',
    image: STOCK('photo-1593941707882-a5bba14938c7'),
    modalImage: '/images/products/lithium-charger.jpg',
    specs: [
      { label: '셀 모니터링', value: '최대 16S' },
      { label: 'SOC 정확도', value: '±2%' },
      { label: '보호 기능', value: '과충전·과방전·과전류·과열' },
      { label: '밸런싱', value: '패시브 밸런싱' },
    ],
    applications: ['전동 킥보드', '전기자전거', '소형 ESS', '산업용 배터리 팩'],
  },
  {
    key: 'f3',
    image: STOCK('photo-1620714223084-8fcacc6dfd8d'),
    modalImage: '/images/products/fuel-cell-pbu.jpg',
    specs: [
      { label: '출력 범위', value: '1kW ~ 100kW' },
      { label: 'BoP 제어', value: '블로워, 밸브, 펌프, 가습기' },
      { label: '응답 속도', value: '< 500ms (부하 변동)' },
      { label: '효율', value: '시스템 효율 40% 이상' },
    ],
    applications: ['가정용 연료전지', '건물용 연료전지', '이동형 발전기', '선박용 발전'],
  },
];

export default function BusinessRenewable() {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<Feature | null>(null);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="relative pt-40 pb-24 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-xs tracking-widest text-gray-400 uppercase mb-8">
              {t('business.renewableTag')}
            </span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
              {t('business.renewableTitle1')}
              <br />
              <span className="bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
                {t('business.renewableTitle2')}
              </span>
            </h1>
            <p className="text-lg text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
              {t('business.renewableDesc')}
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
                <img src={feature.image} alt={t(`bizRenewable.${feature.key}n`)} className="absolute inset-0 w-full h-full object-cover opacity-50 transition-transform duration-1000 group-hover:scale-105" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                <div className="relative z-10 flex flex-col justify-end h-full p-8">
                  <h3 className="text-2xl font-bold mb-2 tracking-tight">{t(`bizRenewable.${feature.key}n`)}</h3>
                  <p className="text-gray-400 text-sm font-light leading-relaxed">{t(`bizRenewable.${feature.key}d`)}</p>
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
                <img src={selected.modalImage} alt={t(`bizRenewable.${selected.key}n`)} className="w-full h-full object-cover" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
              </div>

              <h2 className="text-2xl font-bold tracking-tight mb-2">{t(`bizRenewable.${selected.key}n`)}</h2>
              <p className="text-gray-400 text-sm font-light leading-relaxed mb-8">{t(`bizRenewable.${selected.key}d`)}</p>

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
