import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';

export default function Expertise() {
  const { t } = useTranslation();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const card1Scale = useTransform(scrollYProgress, [0, 0.33], [1, 0.9]);
  const card1Opacity = useTransform(scrollYProgress, [0, 0.33], [1, 0.4]);
  const card1Y = useTransform(scrollYProgress, [0, 0.33], ["0%", "-5%"]);
  const card2Y = useTransform(scrollYProgress, [0, 0.33, 0.66], ["150%", "0%", "-5%"]);
  const card2Scale = useTransform(scrollYProgress, [0, 0.33, 0.66], [1, 1, 0.9]);
  const card2Opacity = useTransform(scrollYProgress, [0, 0.33, 0.66], [1, 1, 0.4]);
  const card3Y = useTransform(scrollYProgress, [0.33, 0.66], ["150%", "0%"]);

  const expertiseData = [
    {
      subtitle: 'HOME APPLIANCE',
      title: t('expertise.e0t'),
      desc: t('expertise.e0d'),
      img: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=1200&q=80',
    },
    {
      subtitle: 'MEDICAL DEVICE',
      title: t('expertise.e1t'),
      desc: t('expertise.e1d'),
      img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80',
    },
    {
      subtitle: 'SOLAR ENERGY',
      title: t('expertise.e2t'),
      desc: t('expertise.e2d'),
      img: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1200&q=80',
    },
  ];

  const renderCard = (data: typeof expertiseData[0]) => (
    <>
      <div className="w-full md:w-1/2 h-48 md:h-full">
        <img src={data.img} alt={data.title} className="w-full h-full object-cover opacity-80" />
      </div>
      <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative">
        <div className="absolute inset-0 bg-gradient-to-r from-white/[0.02] to-transparent pointer-events-none" />
        <div className="text-xs font-medium tracking-widest text-gray-300 mb-3 uppercase relative z-10">
          {data.subtitle}
        </div>
        <h3 className="text-2xl md:text-4xl font-bold text-white mb-4 tracking-tight relative z-10">
          {data.title}
        </h3>
        <p className="text-gray-400 leading-relaxed font-light relative z-10">{data.desc}</p>
      </div>
    </>
  );

  return (
    <section
      ref={containerRef}
      className="h-[250vh] md:h-[300vh] relative bg-[#0a0a0a] border-t border-white/5 shadow-[0_-30px_50px_rgba(0,0,0,0.8)]"
    >
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col items-center justify-center py-10 md:py-20">
        <div className="text-center mb-6 md:mb-10 z-50 px-4">
          <div className="text-[10px] md:text-[11px] font-bold tracking-widest text-gray-400 uppercase mb-3">
            {t('home.expertiseTag')}
          </div>
          <h2 className="text-2xl md:text-5xl font-bold tracking-tighter text-white leading-tight">
            {t('expertise.t1')}<br />
            {t('expertise.t2')}
          </h2>
        </div>

        <div className="relative w-[calc(100%-2rem)] md:w-[calc(100%-3rem)] max-w-5xl h-[55vh] md:h-[50vh]">
          <motion.div
            className="absolute inset-0 w-full h-full rounded-2xl md:rounded-[2rem] overflow-hidden shadow-2xl bg-[#0a0a0a] border border-white/5 flex flex-col md:flex-row"
            style={{ scale: card1Scale, opacity: card1Opacity, y: card1Y, transformOrigin: "top center" }}
          >
            {renderCard(expertiseData[0])}
          </motion.div>

          <motion.div
            className="absolute inset-0 w-full h-full rounded-2xl md:rounded-[2rem] overflow-hidden shadow-2xl bg-[#0a0a0a] border border-white/5 flex flex-col md:flex-row"
            style={{ y: card2Y, scale: card2Scale, opacity: card2Opacity, transformOrigin: "top center" }}
          >
            {renderCard(expertiseData[1])}
          </motion.div>

          <motion.div
            className="absolute inset-0 w-full h-full rounded-2xl md:rounded-[2rem] overflow-hidden shadow-2xl bg-[#0a0a0a] border border-white/5 flex flex-col md:flex-row"
            style={{ y: card3Y, transformOrigin: "top center" }}
          >
            {renderCard(expertiseData[2])}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
