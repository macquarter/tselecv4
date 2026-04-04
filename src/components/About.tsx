import { motion } from 'motion/react';
import { useText, useVideo } from '../contexts/SiteContentContext';

export default function About() {
  const abtT1 = useText('abt-t1', '기술로 신뢰를 쌓아온');
  const abtT2 = useText('abt-t2', '35년의 역사.');
  const abtD = useText('abt-d', '태승전자(주)는 1989년 설립 이래, 마이크로컨트롤러 기반 제어기판 설계 및 제조 분야에서 일관된 품질과 기술력으로 고객의 신뢰를 쌓아왔습니다. 인천광역시 서구 로봇랜드에 위치한 생산시설에서 국내외 다양한 산업에 핵심 전자부품을 공급하고 있습니다.');
  const avLb = useText('av-lb', 'Smart Factory');
  const avTl = useText('av-tl', '인천 로봇랜드 첨단 생산시설');
  const videoUrl = useVideo('about-video', 'https://www.youtube.com/embed/Pl0PWsnzDiw?autoplay=1&mute=1&loop=1&playlist=Pl0PWsnzDiw&controls=0&showinfo=0&rel=0&modestbranding=1&start=20');

  const stats = [
    { label: useText('s1l', '업력'), value: useText('s1v', '35+') },
    { label: useText('s2l', '제품 모델'), value: useText('s2v', '100+') },
    { label: useText('s3l', '주요 산업분야'), value: useText('s3v', '3') },
    { label: useText('s4l', '품질인증'), value: useText('s4v', 'ISO') },
  ];

  return (
    <section id="about" className="py-16 md:py-32 bg-black relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          <div className="order-2 lg:order-1">
            <motion.h2 
              className="text-4xl md:text-6xl font-bold tracking-tighter mb-8 leading-tight text-white"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {abtT1} <br />
              <span className="text-gray-500">{abtT2}</span>
            </motion.h2>
            
            <motion.p
              className="text-base md:text-xl text-gray-400 leading-relaxed font-light mb-8 md:mb-12"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              {abtD}
            </motion.p>

            <div className="grid grid-cols-2 gap-8">
              {stats.map((stat, i) => (
                <motion.div 
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }}
                >
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-500 font-medium tracking-wide">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div 
            className="order-1 lg:order-2 relative h-[250px] md:h-[600px] rounded-2xl md:rounded-3xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="w-full h-full relative">
              <iframe 
                src={videoUrl}
                title="Smart Factory"
                className="absolute top-1/2 left-1/2 w-[300%] h-[300%] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
            <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10">
              <div className="text-gray-400 text-sm font-semibold tracking-widest uppercase mb-2">{avLb}</div>
              <div className="text-2xl font-bold text-white">{avTl}</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
