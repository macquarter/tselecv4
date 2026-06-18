import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductNav from '../components/ProductNav';
import { useImage } from '../contexts/SiteContentContext';

export default function Display() {
  const { t } = useTranslation();
  const _heroImg = useImage('displayPage.hero.img', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80');

  return (
    <div className="bg-black min-h-screen text-white selection:bg-white/30 selection:text-white">
      <Navbar />

      <main className="pt-32 pb-20">
        <section className="relative flex flex-col items-center justify-center text-center px-6 mb-32">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} className="inline-block mb-6 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-sm font-medium text-gray-300">{t('displayPage.badge')}</motion.div>
          <motion.h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}>
            {t('displayPage.t1')}<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-600">{t('displayPage.t2')}</span>
          </motion.h1>
          <motion.p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto font-light tracking-tight whitespace-pre-line" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}>
            {t('displayPage.sub')}
          </motion.p>
        </section>

        <section className="max-w-7xl mx-auto px-6 mb-16">
          <ProductNav />
        </section>

        <section className="max-w-7xl mx-auto px-6 pb-24">
          <div className="text-center mb-10 md:mb-14">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white leading-tight">{t('displayPage.hmiDetailTitle')}</h2>
            <p className="text-gray-400 font-light mt-4 max-w-2xl mx-auto leading-relaxed">{t('displayPage.hmiLede')}</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">
            {/* LEFT: 사진 (라운드) */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '300px 0px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-[2rem] overflow-hidden border border-white/10 bg-[#0a0a0a] aspect-[4/3]"
            >
              <img src={_heroImg} alt={t('displayPage.t2')} className="absolute inset-0 w-full h-full object-cover" loading="eager" decoding="async" />
            </motion.div>

            {/* RIGHT: 사양 (라운드 박스 없음, 배지 없음) */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '300px 0px' }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="text-[11px] font-semibold tracking-[0.16em] uppercase text-gray-500 mb-5">{t('displayPage.hmiTag')}</div>
              <ul className="divide-y divide-white/10 border-t border-white/10 mb-8">
                {(t('displayPage.hmiSpecs', { returnObjects: true }) as {k:string;v:string}[]).map((s, si) => (
                  <li key={si} className="flex items-start justify-between gap-4 py-4 text-base">
                    <span className="text-gray-400 shrink-0">{s.k}</span>
                    <span className="text-white text-right font-medium">{s.v}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2">
                {(t('displayPage.hmiChips', { returnObjects: true }) as string[]).map((c, ci) => (
                  <span key={ci} className="text-xs px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-gray-300">{c}</span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
