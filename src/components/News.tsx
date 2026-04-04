import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export default function News() {
  const newsItems = [
    {
      id: 1,
      category: '공지사항',
      title: '2026년 상반기 신제품 라인업 출시 안내',
      date: '2026.03.15',
      isNew: true
    },
    {
      id: 2,
      category: '보도자료',
      title: '태승전자, 스마트팩토리 고도화 프로젝트 성공적 완료',
      date: '2026.02.28',
      isNew: false
    },
    {
      id: 3,
      category: '공지사항',
      title: 'ISO 14001 환경경영시스템 인증 갱신',
      date: '2026.01.10',
      isNew: false
    }
  ];

  return (
    <section className="py-20 bg-black border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <motion.h2 
              className="text-3xl md:text-5xl font-bold tracking-tighter mb-4 text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              뉴스 & 공지사항.
            </motion.h2>
            <motion.p 
              className="text-gray-400 font-light"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              태승전자의 최신 소식을 전해드립니다.
            </motion.p>
          </div>
          <motion.button 
            className="flex items-center gap-2 text-sm font-medium text-white hover:text-gray-300 transition-colors group"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            전체보기
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>

        <div className="flex flex-col gap-4">
          {newsItems.map((item, i) => (
            <motion.a
              href="#"
              key={item.id}
              className="group flex flex-col sm:flex-row sm:items-center justify-between p-6 rounded-2xl bg-[#0a0a0a] border border-white/5 hover:bg-[#111] transition-colors duration-300 gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
                <span className="text-sm font-medium text-gray-500 w-20">{item.category}</span>
                <h3 className="text-lg font-medium text-gray-200 group-hover:text-white transition-colors flex items-center gap-3">
                  {item.title}
                  {item.isNew && (
                    <span className="px-2 py-0.5 rounded-full bg-white/10 text-white text-[10px] font-bold tracking-wider">NEW</span>
                  )}
                </h3>
              </div>
              <span className="text-sm text-gray-500 font-mono">{item.date}</span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}