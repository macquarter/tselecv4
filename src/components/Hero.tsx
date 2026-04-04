import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Main Text animations
  const text1Scale = useTransform(scrollYProgress, [0, 0.8], [1, 1.1]);
  const text1Opacity = useTransform(scrollYProgress, [0, 0.6, 0.9], [1, 1, 0]);
  const text1Y = useTransform(scrollYProgress, [0, 0.8], [0, -30]);

  // Image animations
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.8, 1], [0.5, 0.3, 0]);

  // Scroll Indicator
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  return (
    <section ref={containerRef} className="h-[150vh] relative bg-black">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        
        {/* Background Image */}
        <motion.div 
          className="absolute inset-0 z-0 origin-center"
          style={{ scale: imageScale, opacity: imageOpacity }}
        >
          <img 
            src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=2500&q=80" 
            alt="Circuit Board" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/80 to-black"></div>
        </motion.div>

        {/* Main Hero Text */}
        <motion.div 
          className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 w-full"
          style={{ scale: text1Scale, opacity: text1Opacity, y: text1Y }}
        >
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-sm font-medium text-gray-300">
            Since 1989
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-8 leading-[1.1] text-white text-center">
            정밀한 제어, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 drop-shadow-[0_0_15px_rgba(129,140,248,0.5)]">무한한 가능성</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 font-light max-w-2xl text-center leading-relaxed">
            마이크로컨트롤러 설계부터 제조까지,<br />
            태승일렉이 혁신적인 자동화 솔루션의 기준을 제시합니다.
          </p>
        </motion.div>

        {/* Scroll Indicator */}
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