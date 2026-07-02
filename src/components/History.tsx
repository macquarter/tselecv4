import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';

/**
 * 메인 페이지 발자취 섹션.
 * 언어 전환 시 본문이 즉시 바뀌도록 useText(Firebase override)는 제거하고
 * i18n의 t()를 단일 출처로 사용합니다.
 */
export default function History() {
  const { t } = useTranslation();

  // 2020s 이후 4개 마일스톤
  const historyData = [
    { year: t('history.m0y'), text: t('history.m0t') },
    { year: t('history.m1y'), text: t('history.m1t') },
    { year: t('history.m2y'), text: t('history.m2t') },
    { year: t('history.m3y'), text: t('history.m3t') },
  ];

  return (
    <section id="history" className="py-32 bg-[#0a0a0a]">
      <div className="max-w-4xl mx-auto px-6">
        <motion.h2
          className="text-4xl md:text-6xl font-bold tracking-tighter mb-20 text-center text-white break-keep"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {t('history.kicker')}<br />
          {t('history.title')}
        </motion.h2>

        <div className="space-y-16 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-px before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
          {historyData.map((item, i) => (
            <motion.div
              key={item.year + i}
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