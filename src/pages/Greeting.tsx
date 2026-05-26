import { motion } from 'motion/react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useText } from '../contexts/SiteContentContext';

export default function Greeting() {
  const badge = useText('gr-badge', 'CEO Message');
  const grT1 = useText('gr-t1', '미래를 향한');
  const grT2 = useText('gr-t2', '우리의 약속.');
  const grD1 = useText('gr-d1', '한계에 도전하는 최고의 기술력으로');
  const grD2 = useText('gr-d2', '고객만족 경영을 주도합니다.');
  const ceoName = useText('gr-ceo-name', '유태호');
  const ceoTitle = useText('gr-ceo-title', '태승전자(주) 대표이사');
  const msg1 = useText('gr-msg1', '홈페이지를 찾아주셔서 감사합니다.');
  const msg2 = useText('gr-msg2', '태승전자는 1989년 시작해, 36년 동안 제어보드 한 가지에 집중해온 회사입니다. 가전·산업용·의료기기·신재생에너지 다양한 산업에 필요한 부품을 공급하고 있습니다.');
  const msg3 = useText('gr-msg3', '좋은 부품 하나가 좋은 제품을 만든다고 믿습니다. 앞으로도 깊이 다듬어가겠습니다.');
  const msg4 = useText('gr-msg4', '태승전자(주) 대표이사 유태호');
  const cvT = useText('gr-cv-t', '핵심 가치.');

  const coreValues = [
    { title: useText('gr-v0t', '정밀한 품질'), desc: useText('gr-v0d', '최고의 기술력으로 정밀한 마이크로컨트롤러를 개발·제조합니다.') },
    { title: useText('gr-v1t', '고객만족'), desc: useText('gr-v1d', '고객의 요구를 우선으로 하고 신뢰 관계를 구축합니다.') },
    { title: useText('gr-v2t', '기술혁신'), desc: useText('gr-v2d', '디지털 기술과의 융합으로 새로운 가치를 창조합니다.') },
    { title: useText('gr-v3t', '지속성장'), desc: useText('gr-v3d', '브랜드 가치를 높이고 지속가능한 성장을 추구합니다.') },
  ];

  return (
    <div className="bg-black min-h-screen text-white selection:bg-white/30 selection:text-white">
      <Navbar />
      
      <main className="pt-32 pb-20">
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

        <section className="max-w-4xl mx-auto px-6">
          <motion.div
            className="mb-40"
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

          <motion.div 
            className="bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] p-12 md:p-20 relative overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent" />
            <h3 className="text-3xl md:text-4xl font-bold mb-16 text-center tracking-tight relative z-10">{cvT}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
              {coreValues.map((item, i) => (
                <motion.div 
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="group"
                >
                  <h4 className="text-xl font-bold mb-4 tracking-tight group-hover:text-white transition-colors duration-500">{item.title}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed font-light group-hover:text-gray-400 transition-colors duration-500">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
