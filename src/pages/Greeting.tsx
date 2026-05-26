import { motion } from 'motion/react';
import { Cpu, Heart, Sparkles, TrendingUp, ArrowUpRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useText } from '../contexts/SiteContentContext';

export default function Greeting() {
  const { t } = useTranslation();

  // i18n 우선, Firebase CMS override 가능
  const badge = useText('gr-badge', t('greeting.badge'));
  const grT1 = useText('gr-t1', t('greeting.t1'));
  const grT2 = useText('gr-t2', t('greeting.t2'));
  const grD1 = useText('gr-d1', t('greeting.desc1'));
  const grD2 = useText('gr-d2', t('greeting.desc2'));
  const ceoName = useText('gr-ceo-name', t('greeting.ceoName'));
  const ceoTitle = useText('gr-ceo-title', t('greeting.ceoTitle'));
  const msg1 = useText('gr-msg1', t('greeting.msg1'));
  const msg2 = useText('gr-msg2', t('greeting.msg2'));
  const msg3 = useText('gr-msg3', t('greeting.msg3'));
  void useText('gr-msg4', t('greeting.ceoTitle'));

  const cvBadge = useText('gr-cv-badge', t('greeting.cvBadge'));
  const cvT1 = useText('gr-cv-t1', t('greeting.cvT1'));
  const cvT2 = useText('gr-cv-t2', t('greeting.cvT2'));
  const cvDesc = useText('gr-cv-desc', t('greeting.cvDesc'));

  const coreValues = [
    {
      n: '01',
      icon: <Cpu strokeWidth={1.5} className="w-6 h-6" />,
      title: useText('gr-v0t', t('greeting.v0t')),
      desc: useText('gr-v0d', t('greeting.v0d')),
      stat: t('greeting.v0stat'),
      statLabel: t('greeting.v0statLabel'),
    },
    {
      n: '02',
      icon: <Heart strokeWidth={1.5} className="w-6 h-6" />,
      title: useText('gr-v1t', t('greeting.v1t')),
      desc: useText('gr-v1d', t('greeting.v1d')),
      stat: t('greeting.v1stat'),
      statLabel: t('greeting.v1statLabel'),
    },
    {
      n: '03',
      icon: <Sparkles strokeWidth={1.5} className="w-6 h-6" />,
      title: useText('gr-v2t', t('greeting.v2t')),
      desc: useText('gr-v2d', t('greeting.v2d')),
      stat: t('greeting.v2stat'),
      statLabel: t('greeting.v2statLabel'),
    },
    {
      n: '04',
      icon: <TrendingUp strokeWidth={1.5} className="w-6 h-6" />,
      title: useText('gr-v3t', t('greeting.v3t')),
      desc: useText('gr-v3d', t('greeting.v3d')),
      stat: t('greeting.v3stat'),
      statLabel: t('greeting.v3statLabel'),
    },
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
            className="inline-block mb-6 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-sm font-medium text-gray-300"
          >
            {badge}
          </motion.div>
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {grT1}<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-600">
              {grT2}
            </span>
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto font-light tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {grD1}<br className="hidden md:block" />
            {grD2}
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
                {msg1}
              </p>
              <p>{msg2}</p>
              <p>{msg3}</p>
              <div className="pt-8 border-t border-white/10">
                <h2 className="text-2xl font-bold tracking-tight">{ceoName}</h2>
                <p className="text-gray-400 font-medium mt-1 tracking-wide uppercase text-sm">{ceoTitle}</p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Core Values — Apple-style */}
        <section className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-xs tracking-widest uppercase text-gray-400">
              {cvBadge}
            </div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
              {cvT1}<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-600">
                {cvT2}
              </span>
            </h2>
            <p className="text-lg text-gray-500 font-light tracking-tight max-w-2xl mx-auto">
              {cvDesc}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {coreValues.map((item, i) => (
              <motion.div
                key={item.n}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group relative rounded-[2rem] bg-[#0a0a0a] border border-white/5 p-8 md:p-10 overflow-hidden hover:border-white/15 transition-colors duration-700"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                <div className="relative z-10 flex items-start justify-between mb-10">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono tracking-widest text-gray-600">{item.n}</span>
                    <div className="h-px w-8 bg-white/10" />
                  </div>
                  <div className="flex items-center justify-center w-11 h-11 rounded-full bg-white/[0.04] border border-white/10 text-gray-300 group-hover:bg-white group-hover:text-black group-hover:border-white transition-all duration-500">
                    {item.icon}
                  </div>
                </div>

                <h3 className="relative z-10 text-3xl md:text-4xl font-bold tracking-tighter mb-4 text-white">
                  {item.title}
                </h3>

                <p className="relative z-10 text-gray-400 font-light leading-relaxed mb-10 max-w-md">
                  {item.desc}
                </p>

                <div className="relative z-10 flex items-end justify-between pt-6 border-t border-white/5">
                  <div>
                    <div className="text-3xl md:text-4xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
                      {item.stat}
                    </div>
                    <div className="text-xs tracking-widest uppercase text-gray-500 mt-1">
                      {item.statLabel}
                    </div>
                  </div>
                  <ArrowUpRight
                    className="w-5 h-5 text-gray-600 group-hover:text-white group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-500"
                    strokeWidth={1.5}
                  />
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
