import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

const expertiseData = [
  {
    id: 'home',
    title: '가전제품',
    subtitle: 'HOME APPLIANCE',
    desc: '냉장고, 식기건조기, 환기시스템의 MCU 기반 제어보드 및 터치형 LED 디스플레이를 설계·제조합니다.',
    img: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=1200&q=80',
    color: 'text-gray-300'
  },
  {
    id: 'medical',
    title: '의료기기',
    subtitle: 'MEDICAL DEVICE',
    desc: 'ARM Cortex-M4 기반 고정밀 의료기기 MCU 보드. IEC 60601 규격 준수, 이중 안전회로 설계.',
    img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80',
    color: 'text-gray-300'
  },
  {
    id: 'solar',
    title: '태양광',
    subtitle: 'SOLAR ENERGY',
    desc: 'MPPT 99%+ 효율의 태양광 인버터 제어기. 계통연계/독립형 전환, 원격 모니터링 지원.',
    img: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1200&q=80',
    color: 'text-gray-300'
  }
];

export default function Expertise() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Card 1
  const card1Scale = useTransform(scrollYProgress, [0, 0.33], [1, 0.9]);
  const card1Opacity = useTransform(scrollYProgress, [0, 0.33], [1, 0.4]);
  const card1Y = useTransform(scrollYProgress, [0, 0.33], ["0%", "-5%"]);

  // Card 2
  const card2Y = useTransform(scrollYProgress, [0, 0.33, 0.66], ["150%", "0%", "-5%"]);
  const card2Scale = useTransform(scrollYProgress, [0, 0.33, 0.66], [1, 1, 0.9]);
  const card2Opacity = useTransform(scrollYProgress, [0, 0.33, 0.66], [1, 1, 0.4]);

  // Card 3
  const card3Y = useTransform(scrollYProgress, [0.33, 0.66], ["150%", "0%"]);

  return (
    <section ref={containerRef} className="h-[300vh] relative bg-[#0a0a0a] border-t border-white/5 shadow-[0_-30px_50px_rgba(0,0,0,0.8)]">
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col items-center justify-center py-20">
        
        <div className="text-center mb-10 z-50">
          <div className="text-[11px] font-bold tracking-widest text-gray-400 uppercase mb-3">Our Expertise</div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-white leading-tight">
            가전·의료·태양광<br />
            3대 핵심 산업을 위한 맞춤형 솔루션
          </h2>
        </div>

        <div className="relative w-[calc(100%-3rem)] max-w-5xl h-[60vh] md:h-[50vh]">
          {/* Card 1 */}
          <motion.div
            className="absolute inset-0 w-full h-full rounded-[2rem] overflow-hidden shadow-2xl bg-[#0a0a0a] border border-white/5 flex flex-col md:flex-row"
            style={{ scale: card1Scale, opacity: card1Opacity, y: card1Y, transformOrigin: "top center" }}
          >
            <div className="w-full md:w-1/2 h-48 md:h-full">
              <img src={expertiseData[0].img} alt={expertiseData[0].title} className="w-full h-full object-cover opacity-80" />
            </div>
            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative">
              <div className="absolute inset-0 bg-gradient-to-r from-white/[0.02] to-transparent pointer-events-none" />
              <div className={`text-xs font-medium tracking-widest ${expertiseData[0].color} mb-3 uppercase relative z-10`}>{expertiseData[0].subtitle}</div>
              <h3 className="text-2xl md:text-4xl font-bold text-white mb-4 tracking-tight relative z-10">{expertiseData[0].title}</h3>
              <p className="text-gray-400 leading-relaxed font-light relative z-10">{expertiseData[0].desc}</p>
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            className="absolute inset-0 w-full h-full rounded-[2rem] overflow-hidden shadow-2xl bg-[#0a0a0a] border border-white/5 flex flex-col md:flex-row"
            style={{ y: card2Y, scale: card2Scale, opacity: card2Opacity, transformOrigin: "top center" }}
          >
            <div className="w-full md:w-1/2 h-48 md:h-full">
              <img src={expertiseData[1].img} alt={expertiseData[1].title} className="w-full h-full object-cover opacity-80" />
            </div>
            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative">
              <div className="absolute inset-0 bg-gradient-to-r from-white/[0.02] to-transparent pointer-events-none" />
              <div className={`text-xs font-medium tracking-widest ${expertiseData[1].color} mb-3 uppercase relative z-10`}>{expertiseData[1].subtitle}</div>
              <h3 className="text-2xl md:text-4xl font-bold text-white mb-4 tracking-tight relative z-10">{expertiseData[1].title}</h3>
              <p className="text-gray-400 leading-relaxed font-light relative z-10">{expertiseData[1].desc}</p>
            </div>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            className="absolute inset-0 w-full h-full rounded-[2rem] overflow-hidden shadow-2xl bg-[#0a0a0a] border border-white/5 flex flex-col md:flex-row"
            style={{ y: card3Y, transformOrigin: "top center" }}
          >
            <div className="w-full md:w-1/2 h-48 md:h-full">
              <img src={expertiseData[2].img} alt={expertiseData[2].title} className="w-full h-full object-cover opacity-80" />
            </div>
            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative">
              <div className="absolute inset-0 bg-gradient-to-r from-white/[0.02] to-transparent pointer-events-none" />
              <div className={`text-xs font-medium tracking-widest ${expertiseData[2].color} mb-3 uppercase relative z-10`}>{expertiseData[2].subtitle}</div>
              <h3 className="text-2xl md:text-4xl font-bold text-white mb-4 tracking-tight relative z-10">{expertiseData[2].title}</h3>
              <p className="text-gray-400 leading-relaxed font-light relative z-10">{expertiseData[2].desc}</p>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}