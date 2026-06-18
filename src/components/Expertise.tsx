import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useImage } from '../contexts/SiteContentContext';

const STOCK = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`;

export default function Expertise() {
  const { t } = useTranslation();
  const imgHome = useImage('biz.home.f0.img', STOCK('photo-1571175443880-49e1d25b2bc5'));
  const imgInd = useImage('biz.ind.f3.img', STOCK('photo-1497366216548-37526070297c'));
  const imgMed = useImage('biz.med.f0.img', STOCK('photo-1576091160550-2173dba999ef'));
  const imgRen = useImage('biz.ren.f3.img', STOCK('photo-1509391366360-2e959784a276'));

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // 4-card scroll stagger (quarters)
  const c1Scale = useTransform(scrollYProgress, [0, 0.25], [1, 0.9]);
  const c1Opacity = useTransform(scrollYProgress, [0, 0.25], [1, 0.4]);
  const c1Y = useTransform(scrollYProgress, [0, 0.25], ["0%", "-5%"]);
  const c2Y = useTransform(scrollYProgress, [0, 0.25, 0.5], ["150%", "0%", "-5%"]);
  const c2Scale = useTransform(scrollYProgress, [0, 0.25, 0.5], [1, 1, 0.9]);
  const c2Opacity = useTransform(scrollYProgress, [0, 0.25, 0.5], [1, 1, 0.4]);
  const c3Y = useTransform(scrollYProgress, [0.25, 0.5, 0.75], ["150%", "0%", "-5%"]);
  const c3Scale = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [1, 1, 0.9]);
  const c3Opacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [1, 1, 0.4]);
  const c4Y = useTransform(scrollYProgress, [0.5, 0.75], ["150%", "0%"]);

  const data = [
    { sub: 'HOME APPLIANCE', tt: '가전', dd: '냉장고·정수기·레인지후드·공기청정기 등 생활가전의 MCU 제어보드와 터치 디스플레이를 설계·제조합니다.', img: imgHome },
    { sub: 'INDUSTRIAL', tt: '산업', dd: '식기세척기·펌프·회의부스·온도제어기 등 산업 장비의 핵심 제어 솔루션을 공급합니다.', img: imgInd },
    { sub: 'MEDICAL DEVICE', tt: '의료', dd: '원심분리기·진단기·치과 스케일러 등 고정밀 의료기기 제어보드를 설계·공급합니다.', img: imgMed },
    { sub: 'RENEWABLE ENERGY', tt: '신재생', dd: '태양광·수소연료전지·리튬이온 충전 등 친환경 에너지 시스템 제어 기술을 제공합니다.', img: imgRen },
  ];

  const renderCard = (d: typeof data[0]) => (
    <>
      <div className="w-full md:w-1/2 h-48 md:h-full">
        <img src={d.img} alt={d.tt} loading="eager" fetchPriority="high" decoding="async" className="w-full h-full object-cover opacity-90" />
      </div>
      <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative">
        <div className="absolute inset-0 bg-gradient-to-r from-white/[0.02] to-transparent pointer-events-none" />
        <div className="text-xs font-semibold tracking-widest text-gray-300 mb-3 uppercase relative z-10">{d.sub}</div>
        <h3 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight relative z-10">{d.tt}</h3>
        <p className="text-base md:text-lg text-gray-200 leading-relaxed font-light relative z-10">{d.dd}</p>
      </div>
    </>
  );

  const cardClass = "absolute inset-0 w-full h-full rounded-2xl md:rounded-[2rem] overflow-hidden shadow-2xl bg-[#0a0a0a] border border-white/5 flex flex-col md:flex-row";

  return (
    <section
      ref={containerRef}
      className="h-[330vh] md:h-[400vh] relative bg-[#0a0a0a] border-t border-white/5 shadow-[0_-30px_50px_rgba(0,0,0,0.8)]"
    >
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col items-center justify-center py-10 md:py-20">
        <div className="text-center mb-6 md:mb-10 z-50 px-4">
          <div className="text-[10px] md:text-[11px] font-bold tracking-widest text-gray-400 uppercase mb-3">
            {t('home.expertiseTag')}
          </div>
          <h2 className="text-2xl md:text-5xl font-bold tracking-tighter text-white leading-tight">
            가전·산업·의료·신재생<br />
            4대 핵심 산업을 위한 맞춤형 솔루션
          </h2>
        </div>

        <div className="relative w-[calc(100%-2rem)] md:w-[calc(100%-3rem)] max-w-5xl h-[55vh] md:h-[50vh]">
          <motion.div className={cardClass} style={{ scale: c1Scale, opacity: c1Opacity, y: c1Y, transformOrigin: "top center" }}>
            {renderCard(data[0])}
          </motion.div>
          <motion.div className={cardClass} style={{ y: c2Y, scale: c2Scale, opacity: c2Opacity, transformOrigin: "top center" }}>
            {renderCard(data[1])}
          </motion.div>
          <motion.div className={cardClass} style={{ y: c3Y, scale: c3Scale, opacity: c3Opacity, transformOrigin: "top center" }}>
            {renderCard(data[2])}
          </motion.div>
          <motion.div className={cardClass} style={{ y: c4Y, transformOrigin: "top center" }}>
            {renderCard(data[3])}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
