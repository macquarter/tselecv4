import { motion } from 'motion/react';
import { Cpu, Heart, Sparkles, TrendingUp, ArrowUpRight } from 'lucide-react';
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
  // msg4 (서명) — 본문 인용 하단의 CEO 정보 블록으로 통합되어 별도 출력하지 않음
  void useText('gr-msg4', '태승전자(주) 대표이사 유태호');

  const cvBadge = useText('gr-cv-badge', 'Core Values');
  const cvT1 = useText('gr-cv-t1', '우리가 지키는');
  const cvT2 = useText('gr-cv-t2', '네 가지 약속.');
  const cvDesc = useText('gr-cv-desc', '36년간 변하지 않은 태승전자의 일하는 방식입니다.');

  const coreValues = [
    {
      n: '01',
      icon: <Cpu strokeWidth={1.5} className="w-6 h-6" />,
      title: useText('gr-v0t', '정밀한 품질'),
      desc: useText('gr-v0d', '100PPM 이하 불량률, 100% 검사 커버리지. 최고의 기술력으로 정밀한 마이크로컨트롤러를 개발·제조합니다.'),
      stat: '100PPM',
      statLabel: '이하 불량률',
    },
    {
      n: '02',
      icon: <Heart strokeWidth={1.5} className="w-6 h-6" />,
      title: useText('gr-v1t', '고객만족'),
      desc: useText('gr-v1d', '99% 납기 준수, 36년 누적 거래 관계. 고객의 요구를 우선으로 하고 장기적인 신뢰 관계를 구축합니다.'),
      stat: '99%',
      statLabel: '납기준수율',
    },
    {
      n: '03',
      icon: <Sparkles strokeWidth={1.5} className="w-6 h-6" />,
      title: useText('gr-v2t', '기술혁신'),
      desc: useText('gr-v2d', '회로 설계부터 펌웨어·양산까지 인하우스 R&D. 디지털 기술과의 융합으로 새로운 가치를 창조합니다.'),
      stat: 'R&D',
      statLabel: '인하우스 연구소',
    },
    {
      n: '04',
      icon: <TrendingUp strokeWidth={1.5} className="w-6 h-6" />,
      title: useText('gr-v3t', '지속성장'),
      desc: useText('gr-v3d', '4개 사업영역 풀라인업, 해외 수출 확대. 브랜드 가치를 높이고 지속 가능한 성장을 추구합니다.'),
      stat: '4',
      statLabel: '사업영역',
    },
  ];

  return (
    <div className="bg-black min-h-screen text-white selection:bg-white/30 selection:text-white">
      <Navbar />

      <main className="pt-32 pb-20">
        {/* Hero */}
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

        {/* CEO Message */}
        <section className="max-w-4xl mx-auto px-6 mb-40">
          <motion.div
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
        </section>

        {/* Core Values — Redesigned Apple-style */}
        <section className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-xs tracking-widest uppercase text-gray-400">
              {cvBadge}
            </div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
              {cvT1}<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-600">
                {cvT2}
              </span>
            </h2>
            <p className="text-lg text-gray-500 font-light tracking-tight max-w-2xl mx-auto">
              {cvDesc}
            </p>
          </motion.div>

          {/* Core Value Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {coreValues.map((item, i) => (
              <motion.div
                key={item.n}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group relative rounded-[2rem] bg-[#0a0a0a] border border-white/5 p-8 md:p-10 overflow-hidden hover:border-white/15 transition-colors duration-700"
              >
                {/* Hover Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                {/* Top Row: Number + Icon + Arrow */}
                <div className="relative z-10 flex items-start justify-between mb-10">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono tracking-widest text-gray-600">{item.n}</span>
                    <div className="h-px w-8 bg-white/10" />
                  </div>
                  <div className="flex items-center justify-center w-11 h-11 rounded-full bg-white/[0.04] border border-white/10 text-gray-300 group-hover:bg-white group-hover:text-black group-hover:border-white transition-all duration-500">
                    {item.icon}
                  </div>
                </div>

                {/* Title */}
                <h3 className="relative z-10 text-3xl md:text-4xl font-bold tracking-tighter mb-4 text-white">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="relative z-10 text-gray-400 font-light leading-relaxed mb-10 max-w-md">
                  {item.desc}
                </p>

                {/* Bottom Row: Stat */}
                <div className="relative z-10 flex items-end justify-between pt-6 border-t border-white/5">
                  <div>
                    <div className="text-3xl md:text-4xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
                      {item.stat}
                    </div>
                    <div className="text-xs tracking-widest uppercase text-gray-500 mt-1">
                      {item.statLabel}
                    </div>
                  </div>
                  <ArrowUpRight
                    className="w-5 h-5 text-gray-600 group-hover:text-white group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-500"
                    strokeWidth={1.5}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
