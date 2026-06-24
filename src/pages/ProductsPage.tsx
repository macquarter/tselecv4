import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { useImage } from '../contexts/SiteContentContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductNav from '../components/ProductNav';

export default function ProductsPage() {
  const _catEmbedded = useImage('productsCat.embedded.img', 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80');
  const _catHmi = useImage('productsCat.hmi.img', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80');
  const _catCustom = useImage('productsCat.custom.img', 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1200&q=80');
  const _catProcess = useImage('productsCat.process.img', 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1600&q=80');
  const { t } = useTranslation();


  return (
    <div className="bg-black min-h-screen text-white selection:bg-white/30 selection:text-white">
      <Navbar />

      <main className="pt-32 pb-20">
        <section className="relative flex flex-col items-center justify-center text-center px-6 mb-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block mb-6 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-sm font-medium text-gray-300"
          >
            {t('productsPage.badge')}
          </motion.div>
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {t('productsPage.t1')}<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-600">
              {t('productsPage.t2')}
            </span>
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto font-light tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {t('productsPage.d1')}<br className="hidden md:block" />
            {t('productsPage.d2')}
          </motion.p>
        </section>

        <section className="max-w-7xl mx-auto px-6 mb-16">
          <ProductNav />
        </section>

        <section className="max-w-7xl mx-auto px-6 mb-24">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-white">{t('productsPage.catTitle')}</h2>
            <p className="text-gray-400 font-light mt-3">{t('productsPage.catSub')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {[
              { tt: t('nav.embedded'), dd: t('productsPage.catEmbeddedDesc'), link: '/main-controller', img: _catEmbedded, imgKey: 'productsCat.embedded.img' },
              { tt: t('nav.hmi'), dd: t('productsPage.catHmiDesc'), link: '/display', img: _catHmi, imgKey: 'productsCat.hmi.img' },
              { tt: t('nav.custom'), dd: t('productsPage.catCustomDesc'), link: '/others', img: _catCustom, imgKey: 'productsCat.custom.img' },
            ].map((c, i) => (
              <motion.a
                key={c.link}
                href={c.link}
                whileHover={{ y: -3 }}
                className="ts-card group relative rounded-[2rem] overflow-hidden border border-white/5 aspect-[4/3] block"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '300px 0px' }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                <img src={c.img} data-cms-img-key={c.imgKey} alt={c.tt} className="absolute inset-0 w-full h-full object-cover opacity-85 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100" loading="eager" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                <div className="relative z-10 flex flex-col justify-end h-full p-8">
                  <div className="text-[11px] uppercase tracking-[0.2em] text-gray-400 mb-3">{String(i + 1).padStart(2, '0')}</div>
                  <h3 className="text-2xl font-bold tracking-tight text-white ts-card-title">{c.tt}</h3>
                  <p className="text-sm md:text-[15px] text-gray-100 font-light mt-2">{c.dd}</p>
                </div>
              </motion.a>
            ))}
          </div>

          <motion.a
            href="/process"
            className="ts-card group relative block rounded-[2rem] overflow-hidden border border-white/10 h-[300px] md:h-[380px]"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '300px 0px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <img src={_catProcess} data-cms-img-key="productsCat.process.img" alt="제조공정" className="absolute inset-0 w-full h-full object-cover opacity-75 transition-all duration-[1200ms] group-hover:scale-105 group-hover:opacity-90" loading="eager" />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
            <div className="relative z-10 flex flex-col justify-center h-full max-w-2xl px-10 md:px-16">
              <div className="text-[11px] uppercase tracking-[0.25em] text-gray-400 mb-5">04 · Manufacturing Process</div>
              <h3 className="text-4xl md:text-6xl font-bold tracking-tighter text-white mb-4 ts-card-title">{t('productsPage.processTitle')}</h3>
              <p className="text-gray-300 font-light text-base md:text-lg leading-relaxed mb-7">{t('productsPage.processDesc')}</p>
              <span className="inline-flex items-center text-sm text-white border-b border-white/40 pb-1 w-fit group-hover:border-white transition-colors">
                {t('productsPage.processMore')}
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
            </div>
          </motion.a>
        </section>

      </main>

      <Footer />
    </div>
  );
}
