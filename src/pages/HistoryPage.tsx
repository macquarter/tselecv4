import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function HistoryPage() {
  const { t } = useTranslation();
  const historyData = [
    { year: '2026', key: 'h2026' },
    { year: '2025', key: 'h2025' },
    { year: '2022', key: 'h2022' },
    { year: '2021', key: 'h2021' },
    { year: '2019', key: 'h2019' },
    { year: '2017', key: 'h2017' },
    { year: '2016', key: 'h2016' },
    { year: '2011', key: 'h2011' },
    { year: '2006', key: 'h2006' },
    { year: '2004', key: 'h2004' },
    { year: '2003', key: 'h2003' },
    { year: '2001', key: 'h2001' },
    { year: '2000', key: 'h2000' },
    { year: '1999', key: 'h1999' },
    { year: '1989', key: 'h1989' },
  ];

  return (
    <div className="bg-black min-h-screen text-white selection:bg-white/30 selection:text-white">
      <Navbar />

      <main className="pt-32 pb-20">
        <section className="relative flex flex-col items-center justify-center text-center px-6 mb-32">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} className="inline-block mb-6 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-sm font-medium text-gray-300">{t('historyPage.badge')}</motion.div>
          <motion.h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}>
            {t('historyPage.t1')}<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-600">{t('historyPage.t2')}</span>
          </motion.h1>
          <motion.p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto font-light tracking-tight whitespace-pre-line" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}>
            {t('historyPage.sub')}
          </motion.p>
        </section>

        <section className="max-w-4xl mx-auto px-6">
          <div className="relative border-l border-white/10 ml-4 md:ml-0">
            {historyData.map((item, index) => (
              <motion.div key={item.year} className="mb-20 pl-8 md:pl-16 relative group" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}>
                <div className="absolute w-3 h-3 bg-[#1a1a1a] border-2 border-gray-500 rounded-full -left-[6.5px] top-2.5 group-hover:bg-white group-hover:border-white transition-colors duration-500 shadow-[0_0_10px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_15px_rgba(255,255,255,0.5)]"></div>
                <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12">
                  <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tighter shrink-0 opacity-80 group-hover:opacity-100 transition-opacity duration-500">{item.year}</h3>
                  <p className="text-gray-400 text-lg leading-relaxed font-light whitespace-pre-line group-hover:text-gray-200 transition-colors duration-500">{t(`historyPage.${item.key}`)}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
