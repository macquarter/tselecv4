import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductNav from '../components/ProductNav';
import ModuleCatalog, { CatalogCard } from '../components/ModuleCatalog';


export default function MainController() {
  const { t } = useTranslation();
  const catAccents = ['from-blue-500/15 to-blue-700/5', 'from-amber-500/15 to-amber-700/5'];
  const embeddedCards: CatalogCard[] = (t('mainCtrl.cat', { returnObjects: true }) as unknown as Omit<CatalogCard, 'accent'>[]).map((c, i) => ({ ...c, accent: catAccents[i] }));
  const specs = [
    { key: 's0', value: '32/16/8-bit MCU' },
    { key: 's1', value: '5V ~ 24V DC' },
    { key: 's2', value: 'UART, SPI, I2C' },
    { key: 's3', value: '8 ~ 16 ch' },
    { key: 's4', value: '24 ~ 32 ports' },
    { key: 's5', value: '-20°C ~ +70°C' },
    { key: 's6', value: 'ISO 9001, CE' },
    { key: 's7', value: '3 yrs' },
  ];

  const features = ['f0', 'f1', 'f2', 'f3'];

  return (
    <div className="bg-black min-h-screen text-white selection:bg-white/30 selection:text-white">
      <Navbar />

      <main className="pt-32 pb-20">
        <section className="relative flex flex-col items-center justify-center text-center px-6 mb-32">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} className="inline-block mb-6 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-sm font-medium text-gray-300">{t('mainCtrl.badge')}</motion.div>
          <motion.h1 className="text-4xl md:text-7xl font-bold mb-8 tracking-tighter break-keep" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}>
            {t('mainCtrl.t1')}<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-600">{t('mainCtrl.t2')}</span>
          </motion.h1>
          <motion.p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto font-light tracking-tight whitespace-pre-line" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}>
            {t('mainCtrl.sub')}
          </motion.p>
        </section>

        <section className="max-w-7xl mx-auto px-6 mb-32">
          <ProductNav />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-32">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} className="relative rounded-[2rem] bg-[#0a0a0a] border border-white/5 p-8 flex items-center justify-center aspect-square overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.05] to-transparent rounded-[2rem]" />
              <img src="https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&w=800&q=80" alt="Main Controller" className="w-full h-full object-cover rounded-[1.5rem] relative z-10 transition-transform duration-1000 group-hover:scale-105 opacity-80" />
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">{t('mainCtrl.h2')}</h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-12 font-light">{t('mainCtrl.desc')}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {features.map((f) => (
                  <div key={f} className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-6 hover:bg-[#111] transition-colors duration-300">
                    <h3 className="text-white font-semibold mb-2 tracking-tight">{t(`mainCtrl.${f}t`)}</h3>
                    <p className="text-gray-500 text-sm font-light leading-relaxed">{t(`mainCtrl.${f}d`)}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div className="bg-[#0a0a0a] border border-white/5 rounded-[2rem] overflow-hidden" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <div className="p-8 md:p-12 border-b border-white/10">
              <h2 className="text-2xl font-bold">{t('mainCtrl.specsTitle')}</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/5">
                    <th className="p-6 text-red-500 font-bold text-sm tracking-wider uppercase border-b border-white/10">{t('mainCtrl.thLabel')}</th>
                    <th className="p-6 text-red-500 font-bold text-sm tracking-wider uppercase border-b border-white/10">{t('mainCtrl.thValue')}</th>
                    <th className="p-6 text-red-500 font-bold text-sm tracking-wider uppercase border-b border-white/10">{t('mainCtrl.thDesc')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {specs.map((spec) => (
                    <tr key={spec.key} className="hover:bg-white/5 transition-colors">
                      <td className="p-6 font-medium text-gray-300">{t(`mainCtrl.${spec.key}l`)}</td>
                      <td className="p-6 text-white font-bold">{spec.value}</td>
                      <td className="p-6 text-gray-400 text-sm">{t(`mainCtrl.${spec.key}d`)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </section>

        <ModuleCatalog
          badge="Embedded Modules"
          title1={t('mainCtrl.catTitle1')}
          title2={t('mainCtrl.catTitle2')}
          sub={t('mainCtrl.catSub')}
          cards={embeddedCards}
        />
      </main>

      <Footer />
    </div>
  );
}