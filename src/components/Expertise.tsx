import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { useText, useImage } from '../contexts/SiteContentContext';

export default function Expertise() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const card1Scale = useTransform(scrollYProgress, [0, 0.33], [1, 0.9]);
  const card1Opacity = useTransform(scrollYProgress, [0, 0.33], [1, 0.4]);
  const card1Y = useTransform(scrollYProgress, [0, 0.33], ["0%", "-5%"]);
  const card2Y = useTransform(scrollYProgress, [0, 0.33, 0.66], ["150%", "0%", "-5%"]);
  const card2Scale = useTransform(scrollYProgress, [0, 0.33, 0.66], [1, 1, 0.9]);
  const card2Opacity = useTransform(scrollYProgress, [0, 0.33, 0.66], [1, 1, 0.4]);
  const card3Y = useTransform(scrollYProgress, [0.33, 0.66], ["150%", "0%"]);

  const badge = useText('exp-badge', 'Our Expertise');
  const expT1 = useText('exp-t1', '가전·의료·태양광');
  const expT2 = useText('exp-t2', '3대 핵심 산업을 위한 맞춤형 솔루션');

  const expertiseData = [
    {
      subtitle: useText('e0s', 'HOME APPLIANCE'),
      title: useText('e0t', '가전제품'),
      desc: useText('e0d', '냉장고, 식기건조기, 환기시스템의 MCU 기반 제어보드 및 터치형 LED 디스플레이를 설계·제조합니다.'),
      img: useImage('exp-img-0', 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=1200&q=80'),
    },
    {
      subtitle: useText('e1s', 'MEDICAL DEVICE'),
      title: useText('e1t', '의료기기'),
      desc: useText('e1d', 'ARM Cortex-M4 기반 고정밀 의료기기 MCU 보드. IEC 60601 규격 준수, 이중 안전회로 설계.'),
      img: useImage('exp-img-1', 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80'),
    },
    {
      subtitle: useText('e2s', 'SOLAR ENERGY'),
      title: useText('e2t', '태양광'),
      desc: useText('e2d', 'MPPT 99%+ 효율의 태양광 인버터 제어기. 계통연계/독립형 전환, 원격 모니터링 지원.'),
      img: useImage('exp-img-2', 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1200&q=80'),
    }
  ];

  const renderCard = (data: typeof expertiseData[0]) => (
    <>
      <div className="w-full md:w-1/2 h-48 md:h-full">
        <img src={data.img} alt={data.title} className="w-full h-full object-cover opacity-80" />
      </div>
      <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative">
        <div className="absolute inset-0 bg-gradient-to-r from-white/[0.02] to-transparent pointer-events-none" />
        <div className="text-xs font-medium tracking-widest text-gray-300 mb-3 uppercase relative z-10">{data.subtitle}</div>
        <h3 className="text-2xl md:text-4xl font-bold text-white mb-4 tracking-tight relative z-10">{data.title}</h3>
        <p className="text-gray-400 leading-relaxed font-light relative z-10">{data.desc}</p>
      </div>
    </>
  );

  return (
    <section ref={containerRef} className="h-[300vh] relative bg-[#0a0a0a] border-t border-white/5 shadow-[0_-30px_50px_rgba(0,0,0,0.8)]">
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col items-center justify-center py-20">
        
        <div className="text-center mb-10 z-50">
          <div className="text-[11px] font-bold tracking-widest text-gray-400 uppercase mb-3">{badge}</div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-white leading-tight">
            {expT1}<br />
            {expT2}
          </h2>
        </div>

        <div className="relative w-[calc(100%-3rem)] max-w-5xl h-[60vh] md:h-[50vh]">
          <motion.div
            className="absolute inset-0 w-full h-full rounded-[2rem] overflow-hidden shadow-2xl bg-[#0a0a0a] border border-white/5 flex flex-col md:flex-row"
            style={{ scale: card1Scale, opacity: card1Opacity, y: card1Y, transformOrigin: "top center" }}
          >
            {renderCard(expertiseData[0])}
          </motion.div>

          <motion.div
            className="absolute inset-0 w-full h-full rounded-[2rem] overflow-hidden shadow-2xl bg-[#0a0a0a] border border-white/5 flex flex-col md:flex-row"
            style={{ y: card2Y, scale: card2Scale, opacity: card2Opacity, transformOrigin: "top center" }}
          >
            {renderCard(expertiseData[1])}
          </motion.div>

          <motion.div
            className="absolute inset-0 w-full h-full rounded-[2rem] overflow-hidden shadow-2xl bg-[#0a0a0a] border border-white/5 flex flex-col md:flex-row"
            style={{ y: card3Y, transformOrigin: "top center" }}
          >
            {renderCard(expertiseData[2])}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
