import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { useText } from '../contexts/SiteContentContext';

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const contentOpacity = useTransform(scrollYProgress, [0, 0.6, 0.9], [1, 1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.8], [0, -40]);
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  const badge = useText('hero-badge', 'Since 1989');
  const t1 = useText('hero-t1', '기술로 신뢰를 쌓아온');
  const t2 = useText('hero-t2', '35년의 역사');
  const sub = useText('hero-sub', '마이크로컨트롤러 설계부터 제조까지,\n태승전자가 혁신적인 자동화 솔루션의 기준을 제시합니다.');

  return (
    <section ref={containerRef} className="h-[150vh] relative bg-black">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">

        <motion.div
          className="absolute inset-0 z-10 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 px-6 lg:px-20 max-w-[1400px] mx-auto w-full"
          style={{ opacity: contentOpacity, y: contentY }}
        >
          {/* Left — Text */}
          <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-sm font-medium text-gray-300">
              {badge}
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-6 md:mb-8 leading-[1.1] text-white">
              {t1} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 drop-shadow-[0_0_15px_rgba(129,140,248,0.5)]">{t2}</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 font-light max-w-xl leading-relaxed whitespace-pre-line">
              {sub}
            </p>
          </div>

          {/* Right — Video */}
          <div className="flex-1 w-full max-w-[560px] lg:max-w-none">
            <div className="relative aspect-square rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl shadow-black/50">
              <video
                src="/hero-video.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </motion.div>

        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-30"
          style={{ opacity: scrollOpacity }}
        >
          <span className="text-xs font-bold tracking-[0.2em] text-gray-500 uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-[1px] h-12 bg-gradient-to-b from-gray-500 to-transparent"
          ></motion.div>
        </motion.div>

      </div>
    </section>
  );
}
