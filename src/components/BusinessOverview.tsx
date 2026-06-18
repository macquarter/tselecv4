import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { useImage } from '../contexts/SiteContentContext';

const PRE = 'https://firebasestorage.googleapis.com/v0/b/gen-lang-client-0276589179.firebasestorage.app/o/cms%2F';

export default function BusinessOverview() {
  const { t } = useTranslation();
  const imgHome = useImage('biz.home.f0.img', PRE + 'biz.home.f0.img.jpg?alt=media&token=28a9e697-943a-47aa-81b4-6c8460b46d16');
  const imgInd = useImage('biz.ind.f0.img', PRE + 'biz.ind.f0.img.jpg?alt=media&token=d92ec6c2-65bd-4db5-9a5f-1a689300d07d');
  const imgMed = useImage('biz.med.f0.img', PRE + 'biz.med.f0.img.jpg?alt=media&token=96c7fec5-2b44-436b-8323-9a7e2a929049');
  const imgRen = useImage('biz.ren.f0.img', PRE + 'biz.ren.f0.img.jpg?alt=media&token=5877c91c-a038-4f5b-b85b-fa69fa89f0be');

  const areas = [
    { tt: t('bizOverview.c0t'), dd: t('bizOverview.c0d'), link: '/business/home-appliance', img: imgHome },
    { tt: t('bizOverview.c1t'), dd: t('bizOverview.c1d'), link: '/business/industrial', img: imgInd },
    { tt: t('bizOverview.c2t'), dd: t('bizOverview.c2d'), link: '/business/medical', img: imgMed },
    { tt: t('bizOverview.c3t'), dd: t('bizOverview.c3d'), link: '/business/renewable', img: imgRen },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 mb-24">
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-white">{t('bizOverview.title')}</h2>
        <p className="text-gray-400 font-light mt-3">{t('bizOverview.sub')}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {areas.map((c, i) => (
          <motion.a
            key={c.link}
            href={c.link}
            whileHover={{ y: -4 }}
            className="ts-card group relative rounded-[2rem] overflow-hidden border border-white/5 aspect-[4/5] block"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '300px 0px' }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            <img src={c.img} alt={c.tt} className="absolute inset-0 w-full h-full object-cover opacity-85 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100" loading="eager" fetchPriority="high" decoding="async" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
            <div className="relative z-10 flex flex-col justify-end h-full p-7">
              <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white ts-card-title">{c.tt}</h3>
              <p className="text-sm md:text-[15px] text-gray-100 font-light mt-2 leading-relaxed">{c.dd}</p>
              <span className="mt-4 inline-flex items-center text-xs text-gray-400 group-hover:text-white transition-colors">
                {t('bizOverview.detail')}
                <svg className="ml-1 w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
