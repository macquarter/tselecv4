import { motion } from 'motion/react';
import { useText } from '../contexts/SiteContentContext';

export default function History() {
  const hisT = useText('his-t', '최근의 발자취.');
  const kicker = useText('his-kicker', '끊임없는 혁신.');

  // 2020s 이후만 표시 — 4개 마일스톤 (Updated: 2026-05-27)
  const historyData = [
    {
      year: useText('t0y', '2026'),
      text: useText('t0t', 'AI 기반 품질검사 도입 · 사업영역 4개 카테고리(가전·산업용·의료기기·신재생에너지) 풀라인업 확립'),
    },
    {
      year: useText('t1y', '2024'),
      text: useText('t1t', '신재생에너지(태양광·수소·연료전지) 제어보드 라인업 출시 · 해외 수출 품목 확대'),
    },
    {
      year: useText('t2y', '2022'),
      text: useText('t2t', '의료기기 MCU 보드 IEC 60601 인증 · ISO 14001 환경경영 시스템 갱신'),
    },
    {
      year: useText('t3y', '2020'),
      text: useText('t3t', '인천광역시 서구 로봇랜드 신공장 이전 · 스마트팩토리 시스템(MES·SMT 3라인) 도입'),
    },
  ];

  return (
    <section id="history" className="py-32 bg-[#0a0a0a]">
      <div className="max-w-4xl mx-auto px-6">
        <motion.h2
          className="text-4xl md:text-6xl font-bold tracking-tighter mb-20 text-center text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {kicker}<br />
          {hisT}
        </motion.h2>

        <div className="space-y-16 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-px before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
          {historyData.map((item, i) => (
            <motion.div
              key={item.year}
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
