import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

/**
 * 인사말 페이지.
 * 언어 전환 시 본문이 즉시 바뀌도록 i18n의 t()를 단일 출처로 사용합니다.
 * 핵심가치 섹션은 미니멀 타이포그래피 기반으로 단순화.
 */
export default function Greeting() {
  const { t } = useTranslation();

  const coreValues = [
    { n: '01', title: t('greeting.v0t'), desc: t('greeting.v0d') },
    { n: '02', title: t('greeting.v1t'), desc: t('greeting.v1d') },
    { n: '03', title: t('greeting.v2t'), desc: t('greeting.v2d') },
    { n: '04', title: t('greeting.v3t'), desc: t('greeting.v3d') },
  ];

  return (
    <div className="bg-black min-h-screen text-white selection:bg-white/30 selection:text-white">
      <Navbar />

      <main className="pt-32 pb-20">
        {/* Hero */}
        <section className="relative flex flex-col items-center justify-center text-center px-6 mb-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block mb-6 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-xs tracking-widest uppercase text-gray-300"
          >
            {t('greeting.badge')}
          </motion.div>
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {t('greeting.t1')}<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-600">
              {t('greeting.t2')}
            </span>
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto font-light tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {t('greeting.desc1')}<br className="hidden md:block" />
            {t('greeting.desc2')}
          </motion.p>
        </section>

        {/* CEO Message */}
        <section className="max-w-4xl mx-auto px-6 mb-40">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="space-y-8 text-gray-300 leading-relaxed font-light text-lg">
              <p className="text-2xl font-medium text-white tracking-tight">
                {t('greeting.msg1')}
              </p>
              <p>{t('greeting.msg2')}</p>
              <p>{t('greeting.msg3')}</p>
              <div className="pt-8 border-t border-white/10">
                <h2 className="text-2xl font-bold tracking-tight">{t('greeting.ceoName')}</h2>
                <p className="text-gray-400 font-medium mt-1 tracking-wide uppercase text-sm">{t('greeting.ceoTitle')}</p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Core Values — Minimal */}
        <section className="max-w-4xl mx-auto px-6">
          <motion.div
            className="mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="text-xs tracking-widest uppercase text-gray-500 mb-4">
              {t('greeting.cvBadge')}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">
              {t('greeting.cvT1')} {t('greeting.cvT2')}
            </h2>
            <p className="text-base text-gray-500 font-light tracking-tight">
              {t('greeting.cvDesc')}
            </p>
          </motion.div>

          <div className="divide-y divide-white/5">
            {coreValues.map((item, i) => (
              <motion.div
                key={item.n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-12 gap-6 py-8 group"
              >
                <div className="col-span-2 md:col-span-1">
                  <span className="text-xs font-mono tracking-widest text-gray-600">{item.n}</span>
                </div>
                <div className="col-span-10 md:col-span-4">
                  <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white group-hover:text-white">
                    {item.title}
                  </h3>
                </div>
                <div className="col-span-12 md:col-span-7">
                  <p className="text-gray-400 font-light leading-relaxed text-sm md:text-base">
                    {item.desc}
                  </p>
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
