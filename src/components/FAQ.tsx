import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { useText } from '../contexts/SiteContentContext';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const fqT = useText('fq-t', '자주 묻는 질문');
  const fqS = useText('fq-s', '태승일렉의 기술력과 서비스에 대해 궁금하신 점을 확인해 보세요.');

  const faqData = [
    {
      q: useText('f0q', '태승일렉(TSELEC)은 어떤 기업인가요?'),
      a: useText('f0a', '1989년 설립된 태승일렉은 마이크로컨트롤러 설계 및 제조를 시작으로, 현재는 반도체, 디스플레이, 가전, 의료기기 등 다양한 산업 분야의 핵심 제어 시스템과 자동화 솔루션을 제공하는 전문 기업입니다.'),
    },
    {
      q: useText('f1q', '주요 취급 제품 및 솔루션은 무엇인가요?'),
      a: useText('f1a', '주요 제품으로는 Main Controller, Display Panel, 그리고 각종 센서 및 구동부를 제어하는 특수 제어 보드가 있습니다. 고객 맞춤형 제어 시스템 설계도 지원합니다.'),
    },
    {
      q: useText('f2q', '맞춤형 제어 시스템 개발 의뢰가 가능한가요?'),
      a: useText('f2a', '네, 가능합니다. 태승일렉은 수십 년간 축적된 설계 노하우를 바탕으로 고객사의 요구사항에 완벽하게 부합하는 맞춤형 솔루션을 턴키로 개발해 드립니다.'),
    },
    {
      q: useText('f3q', '제품 A/S 및 기술 지원 절차는 어떻게 되나요?'),
      a: useText('f3a', '대표번호(032-682-8811)로 연락 주시면, 전문 엔지니어가 신속하게 원인 분석 및 해결책을 제공해 드립니다.'),
    },
  ];

  return (
    <section id="faq" className="py-32 bg-[#0a0a0a]">
      <div className="max-w-3xl mx-auto px-6">
        <motion.h2
          className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 text-center text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {fqT}
        </motion.h2>
        <motion.p
          className="text-gray-400 font-light text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          {fqS}
        </motion.p>

        <div className="space-y-4">
          {faqData.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={i}
                className="rounded-2xl bg-[#111] border border-white/5 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left group"
                >
                  <span className="text-lg font-medium text-gray-200 group-hover:text-white transition-colors pr-4">
                    {item.q}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="shrink-0"
                  >
                    <ChevronDown size={20} className="text-gray-500" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="px-6 pb-6 text-gray-400 font-light leading-relaxed">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
