import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { useText } from '../contexts/SiteContentContext';

export default function History() {
  const { t } = useTranslation();
  const hisT = useText('his-t', t('history.title'));
  const kicker = useText('his-kicker', t('history.kicker'));

  const historyData = [
    { year: useText('t0y', t('history.m0y')), text: useText('t0t', t('history.m0t')) },
    { year: useText('t1y', t('history.m1y')), text: useText('t1t', t('history.m1t')) },
    { year: useText('t2y', t('history.m2y')), text: useText('t2t', t('history.m2t')) },
    { year: useText('t3y', t('history.m3y')), text: useText('t3t', t('history.m3t')) },
  ];

  return (
    <section id="history" className="py-32 bg-[#0a0a0a]">
      <div className="max-w-4xl mx-auto px-6">
        <motion.h2
          className="text-4xl md:text-6xl font-bold tracking-tighter mb-20 text-center text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {kicker}<br />
          {hisT}
        </motion.h2>

        <div className="space-y-16 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-px before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
          {historyData.map((item, i) => (
            <motion.div
              key={item.year}
              className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center justify-center w-4 h-4 rounded-full border border-white/20 bg-[#0a0a0a] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 group-hover:bg-white group-hover:border-white transition-colors duration-500 shadow-[0_0_15px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"></div>

              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-8 rounded-[2rem] bg-[#111] border border-white/5 group-hover:bg-[#151515] group-hover:border-white/10 transition-all duration-500">
                <div className="text-3xl font-bold text-white mb-3 tracking-tight">{item.year}</div>
                <div className="text-gray-400 font-light leading-relaxed">{item.text}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
