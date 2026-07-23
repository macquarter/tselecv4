import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useImage } from '../contexts/SiteContentContext';
import BusinessNav from '../components/BusinessNav';

interface Feature {
  key: string;
  image: string;
  fallback?: string;
}

const STOCK = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`;

const features: Feature[] = [
  {
    key: 'f0',
    image: STOCK('photo-1518770660439-4636190af475'),
    fallback: STOCK('photo-1558494949-ef010cbdcc31'),
  },
  {
    key: 'f1',
    image: STOCK('photo-1551808525-051f4baf7cba'),
    fallback: STOCK('photo-1581092160562-40aa08e78837'),
  },
  {
    key: 'f2',
    image: STOCK('photo-1573164713988-8665fc963095'),
    fallback: STOCK('photo-1581094794326-c0a7060a4b48'),
  },
  {
    key: 'f3',
    image: STOCK('photo-1581091226825-a6a2a5aee158'),
    fallback: STOCK('photo-1518770660439-4636190af475'),
  },
];

export default function BusinessSmartIoT() {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<Feature | null>(null);
  const _img0 = useImage('biz.iot.f0.img', STOCK('photo-1518770660439-4636190af475'));
  const _img1 = useImage('biz.iot.f1.img', STOCK('photo-1551808525-051f4baf7cba'));
  const _img2 = useImage('biz.iot.f2.img', STOCK('photo-1573164713988-8665fc963095'));
  const _img3 = useImage('biz.iot.f3.img', STOCK('photo-1581091226825-a6a2a5aee158'));
  const _imgMap: Record<string,string> = {[STOCK('photo-1518770660439-4636190af475')]: _img0, [STOCK('photo-1551808525-051f4baf7cba')]: _img1, [STOCK('photo-1573164713988-8665fc963095')]: _img2, [STOCK('photo-1581091226825-a6a2a5aee158')]: _img3};

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="relative pt-40 pb-24 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-xs tracking-widest text-gray-400 uppercase mb-8">
              {t('business.smartIotTag')}
            </span>
            <h1 className="text-4xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6 break-keep">
              {t('business.smartIotTitle1')}
              <br />
              <span className="bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
                {t('business.smartIotTitle2')}
              </span>
            </h1>
            <p className="text-lg text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
              {t('business.smartIotDesc')}
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
                viewport={{ once: true, margin: '300px 0px' }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -3 }}
                className="relative rounded-[2rem] bg-[#0a0a0a] border border-white/5 overflow-hidden group aspect-[4/3] cursor-pointer ts-card"
                onClick={() => setSelected(feature)}
              >
                <img
                  src={_imgMap[feature.image] || feature.image}
                  data-cms-img-key={`biz.iot.${feature.key}.img`}
                  alt={t(`bizSmartIot.${feature.key}n`)}
                  className="absolute inset-0 w-full h-full object-cover opacity-85 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100"
                  loading="eager"
                  onError={(e) => {
                    const img = e.currentTarget as HTMLImageElement;
                    if (feature.fallback && img.src !== feature.fallback) img.src = feature.fallback;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                <div className="relative z-10 flex flex-col justify-end h-full p-8">
                  <h3 className="text-2xl font-bold mb-2 tracking-tight ts-card-title">{t(`bizSmartIot.${feature.key}n`)}</h3>
                  <p className="text-gray-200 text-sm md:text-[15px] font-light leading-relaxed">{t(`bizSmartIot.${feature.key}d`)}</p>
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
                <img loading="lazy" decoding="async"
                  src={_imgMap[selected.image] || selected.image}
                  data-cms-img-key={`biz.iot.${selected.key}.img`}
                  alt={t(`bizSmartIot.${selected.key}n`)}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const img = e.currentTarget as HTMLImageElement;
                    if (selected.fallback && img.src !== selected.fallback) img.src = selected.fallback;
                  }}
                />
              </div>

              <h2 className="text-2xl font-bold tracking-tight mb-2">{t(`bizSmartIot.${selected.key}n`)}</h2>
              <p className="text-gray-400 text-sm font-light leading-relaxed mb-8">{t(`bizSmartIot.${selected.key}d`)}</p>

              <div className="mb-8">
                <h3 className="text-xs tracking-widest text-gray-500 uppercase mb-4">{t('business.solutionsLabel')}</h3>
                <ul className="space-y-2">
                  {(t(`bizSmartIot.${selected.key}.solutions`, { returnObjects: true }) as unknown as string[]).filter((s) => typeof s === 'string' && s.trim() !== '').map((s, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-300 leading-relaxed">
                      <span className="mt-2 w-1 h-1 rounded-full bg-gray-500 shrink-0" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xs tracking-widest text-gray-500 uppercase mb-4">{t('business.boardsLabel')}</h3>
                <div className="flex flex-wrap gap-2">
                  {(t(`bizSmartIot.${selected.key}.boards`, { returnObjects: true }) as unknown as string[]).filter((b) => typeof b === 'string' && b.trim() !== '').map((b, i) => (
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