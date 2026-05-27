import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useText } from '../contexts/SiteContentContext';

export default function Directions() {
  const { t } = useTranslation();
  const ciAd = useText('ci-ad', t('contact.address'));
  const ciPh = useText('ci-ph', t('contact.phone'));
  const ciFx = useText('ci-fx', t('contact.fax'));

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
            {t('directionsPage.badge')}
          </motion.div>
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {t('directionsPage.t1')}<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-600">
              {t('directionsPage.t2')}
            </span>
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto font-light tracking-tight whitespace-pre-line"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {t('directionsPage.sub')}
          </motion.p>
        </section>

        <section className="max-w-7xl mx-auto px-6 mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <div className="space-y-8">
              <motion.div
                className="bg-[#0a0a0a] border border-white/5 rounded-[2rem] p-12 hover:bg-[#111] transition-colors duration-500 group relative overflow-hidden"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <h3 className="text-gray-400 font-medium tracking-widest mb-4 uppercase text-sm relative z-10">{t('directionsPage.addrLabel')}</h3>
                <p className="text-2xl font-bold leading-relaxed tracking-tight relative z-10">
                  {ciAd}<br />
                  <span className="text-gray-500 text-lg font-normal">{t('directionsPage.addrLegacy')}</span>
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div
                  className="bg-[#0a0a0a] border border-white/5 rounded-[2rem] p-10 hover:bg-[#111] transition-colors duration-500 group relative overflow-hidden"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <h3 className="text-gray-400 font-medium tracking-widest mb-4 uppercase text-sm relative z-10">{t('directionsPage.phoneLabel')}</h3>
                  <p className="text-2xl font-bold mb-2 tracking-tight relative z-10">{ciPh}</p>
                  <p className="text-gray-500 text-sm font-light relative z-10">{t('directionsPage.phoneSub')}</p>
                </motion.div>

                <motion.div
                  className="bg-[#0a0a0a] border border-white/5 rounded-[2rem] p-10 hover:bg-[#111] transition-colors duration-500 group relative overflow-hidden"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <h3 className="text-gray-400 font-medium tracking-widest mb-4 uppercase text-sm relative z-10">{t('directionsPage.faxLabel')}</h3>
                  <p className="text-2xl font-bold mb-2 tracking-tight relative z-10">{ciFx}</p>
                  <p className="text-gray-500 text-sm font-light relative z-10">{t('directionsPage.faxSub')}</p>
                </motion.div>
              </div>

              <motion.div
                className="bg-[#0a0a0a] border border-white/5 rounded-[2rem] p-12 relative overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent" />
                <h3 className="text-xl font-bold mb-8 tracking-tight relative z-10">{t('directionsPage.transitTitle')}</h3>
                <ul className="space-y-6 text-gray-400 font-light leading-relaxed relative z-10">
                  <li className="flex flex-col sm:flex-row sm:items-baseline">
                    <strong className="text-white font-medium w-20 shrink-0">{t('directionsPage.byCar')}</strong>
                    <span>{t('directionsPage.byCarDesc')}</span>
                  </li>
                  <li className="flex flex-col sm:flex-row sm:items-baseline">
                    <strong className="text-white font-medium w-20 shrink-0">{t('directionsPage.byBus')}</strong>
                    <span>{t('directionsPage.byBusDesc')}</span>
                  </li>
                  <li className="flex flex-col sm:flex-row sm:items-baseline">
                    <strong className="text-white font-medium w-20 shrink-0">{t('directionsPage.bySubway')}</strong>
                    <span>{t('directionsPage.bySubwayDesc')}</span>
                  </li>
                </ul>
              </motion.div>
            </div>

            <motion.div
              className="h-[500px] lg:h-auto rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3156.6969169629487!2d126.57119!3d37.60477!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357b4d1f2f2f2f2f%3A0x2f2f2f2f2f2f2f2f!2sRobot%20Land-ro%2C%20Seo-gu%2C%20Incheon!5e0!3m2!1sen!2skr!4v"
                className="w-full h-full border-0 filter invert-[90%] hue-rotate-180 brightness-75 contrast-125"
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
