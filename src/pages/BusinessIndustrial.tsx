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
    image: STOCK('photo-1581244277943-fe4a9c777189'),
    modalImage: '/images/products/dishwasher.jpg',
    specs: [
      { label: '온도 제어', value: '최대 90°C 정밀 제어' },
      { label: '세척 모드', value: '최대 8가지 프로그램' },
      { label: '센서 입력', value: '수위·온도·도어 감지' },
      { label: '안전 기능', value: '누수 차단, 과열 보호' },
    ],
    applications: ['업소용 식기세척기', '컨베이어형 세척기', '글라스워셔', '산업용 부품세척기'],
  },
  {
    key: 'f1',
    image: STOCK('photo-1581092334651-ddf26d9a09d0'),
    modalImage: '/images/products/temp-controller.jpg',
    specs: [
      { label: '제어 정밀도', value: '±0.1°C' },
      { label: '센서 입력', value: 'K/J/T TC, Pt100 RTD' },
      { label: '제어 출력', value: 'SSR, 릴레이, 4-20mA' },
      { label: '프로파일', value: '최대 32스텝 프로그램' },
    ],
    applications: ['열처리 로', '사출 성형기', '반도체 공정', '식품 가공 라인'],
  },
  {
    key: 'f2',
    image: STOCK('photo-1581092160562-40aa08e78837'),
    modalImage: '/images/products/pump.jpg',
    specs: [
      { label: '모터 제어', value: '인버터 0.4~15kW' },
      { label: '센서', value: '수위·압력·유량·진동' },
      { label: '운전 모드', value: '교대·병렬·대기' },
      { label: '통신', value: 'RS-485, Modbus RTU' },
    ],
    applications: ['급수·배수 펌프', '순환 펌프', '가압 펌프', '소방 펌프'],
  },
  {
    key: 'f3',
    image: STOCK('photo-1497366216548-37526070297c'),
    modalImage: '/images/products/booth-single.jpg',
    specs: [
      { label: '조명', value: 'LED 디밍 3단계' },
      { label: '환기', value: 'DC 팬 자동 제어' },
      { label: '감지', value: 'PIR 재실 센서' },
      { label: '전원', value: 'USB-C PD, 220V 콘센트' },
    ],
    applications: ['오피스 1인 부스', '도서관 집중석', '공유오피스 포커스룸', '공항·역사 워크스테이션'],
  },
  {
    key: 'f4',
    image: STOCK('photo-1497366811353-6870744d04b2'),
    modalImage: '/images/products/booth-meeting.jpg',
    specs: [
      { label: '조명', value: 'LED 시나리오 4모드' },
      { label: '공조', value: 'CO2 센서 연동 환기' },
      { label: 'AV 제어', value: 'HDMI·전원 자동 관리' },
      { label: '예약 연동', value: '외부 디스플레이 출력' },
    ],
    applications: ['회의실 부스', '화상회의 부스', '상담실', '교육실'],
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
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
                  className="absolute inset-0 w-full h-full object-cover opacity-50 transition-transform duration-1000 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                <div className="relative z-10 flex flex-col justify-end h-full p-8">
                  <h3 className="text-2xl font-bold mb-2 tracking-tight">{t(`bizIndustrial.${feature.key}n`)}</h3>
                  <p className="text-gray-400 text-sm font-light leading-relaxed">{t(`bizIndustrial.${feature.key}d`)}</p>
                  <span className="mt-4 inline-flex items-center text-xs text-gray-500 group-hover:text-white transition-colors">
                    {t('common.detail')}
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
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-6 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.96 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[2rem] bg-[#0a0a0a] border border-white/10 p-8 md:p-10"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setSelected(null)} className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors z-10">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <div className="mb-6 rounded-2xl overflow-hidden aspect-video bg-[#111] border border-white/5">
                <img
                  src={selected.modalImage}
                  alt={t(`bizIndustrial.${selected.key}n`)}
                  className="w-full h-full object-cover"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
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
