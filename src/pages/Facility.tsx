import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Facility() {
  const { t } = useTranslation();
  const images = [
    { src: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80', tKey: 'g0' },
    { src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80', tKey: 'g1' },
    { src: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=800&q=80', tKey: 'g2' },
    { src: 'https://images.unsplash.com/photo-1581092335397-9583eb92d232?auto=format&fit=crop&w=800&q=80', tKey: 'g3' },
  ];

  const stats = [
    { num: '6,500', unit: 'm²', tKey: 'stat0l', uKey: null },
    { num: '3', unit: t('facility.stat1u'), tKey: 'stat1l', uKey: 'stat1u' },
    { num: '50', unit: t('facility.stat2u'), tKey: 'stat2l', uKey: 'stat2u' },
    { num: '96', unit: '%+', tKey: 'stat3l', uKey: null },
  ];

  return (
    <div className="bg-black min-h-screen text-white selection:bg-white/30 selection:text-white">
      <Navbar />

      <main className="pt-32 pb-20">
        <section className="relative flex flex-col items-center justify-center text-center px-6 mb-32">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} className="inline-block mb-6 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-sm font-medium text-gray-300">{t('facility.badge')}</motion.div>
          <motion.h1 className="text-4xl md:text-7xl font-bold mb-8 tracking-tighter break-keep" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}>
            {t('facility.t1')}<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-600">{t('facility.t2')}</span>
          </motion.h1>
          <motion.p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto font-light tracking-tight whitespace-pre-line" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}>
            {t('facility.sub')}
          </motion.p>
        </section>

        <section className="max-w-7xl mx-auto px-6 mb-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {images.map((img, i) => (
              <motion.div key={i} className="group relative rounded-[2rem] overflow-hidden aspect-[4/3] bg-[#0a0a0a] border border-white/5" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}>
                <img loading="lazy" decoding="async" src={img.src} alt={t(`facility.${img.tKey}t`)} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80 group-hover:opacity-100" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-10">
                  <h3 className="text-3xl font-bold mb-2 tracking-tight">{t(`facility.${img.tKey}t`)}</h3>
                  <p className="text-gray-400 font-light">{t(`facility.${img.tKey}d`)}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6">
          <motion.div className="bg-[#0a0a0a] border border-white/5 rounded-[2rem] p-12 md:p-20 text-center relative overflow-hidden" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}>
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent" />
            <h2 className="text-3xl md:text-4xl font-bold mb-16 tracking-tight relative z-10">{t('facility.statsTitle')}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-16 relative z-10">
              {stats.map((stat, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tighter">
                    {stat.num}
                    <span className="text-2xl md:text-3xl ml-1 text-gray-500 font-medium tracking-normal">{stat.unit}</span>
                  </div>
                  <p className="text-gray-400 text-sm tracking-wide font-medium">{t(`facility.${stat.tKey}`)}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}