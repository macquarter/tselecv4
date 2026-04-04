import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ChevronLeft } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

interface NewsItem {
  id: string;
  cat: string;
  title: string;
  content: string;
  date: string;
  views: number;
  author: string;
}

const newsItems: NewsItem[] = [
  { id: 'n1', cat: '공지사항', title: '2026년 상반기 신제품 라인업 출시 안내', content: '태승전자의 2026년 상반기 신제품 라인업을 안내드립니다.\n\n이번 라인업에는 차세대 메인 컨트롤러 MC-300 시리즈와 고해상도 디스플레이 패널 DP-200 시리즈가 포함되어 있습니다.\n\n자세한 사양 및 가격 문의는 영업부(032-329-7600)로 연락 부탁드립니다.', date: '2026.03.15', views: 452, author: '관리자' },
  { id: 'n2', cat: '보도자료', title: '태승전자, 스마트팩토리 고도화 프로젝트 성공적 완료', content: '태승전자(주)는 인천 로봇랜드 공장의 스마트팩토리 고도화 프로젝트를 성공적으로 완료했습니다.\n\n이번 프로젝트를 통해 생산 효율이 35% 향상되었으며, 불량률이 0.1% 이하로 감소했습니다.\n\nAI 기반 품질 검사 시스템과 실시간 생산 모니터링 체계를 도입하여 스마트 제조 역량을 한 단계 끌어올렸습니다.', date: '2026.02.28', views: 287, author: '관리자' },
  { id: 'n3', cat: '공지사항', title: 'ISO 14001 환경경영시스템 인증 갱신', content: '태승전자(주)는 ISO 14001:2015 환경경영시스템 인증을 성공적으로 갱신하였습니다.\n\n당사는 환경 보호와 지속 가능한 경영을 위해 지속적으로 노력하고 있습니다.', date: '2026.01.10', views: 156, author: '관리자' },
  { id: 'n4', cat: '보도자료', title: '2025 한국전자전 참가 안내', content: '태승전자(주)는 2025 한국전자전(KES 2025)에 참가합니다.\n\n전시 기간: 2025.10.21 ~ 10.24\n장소: 코엑스 Hall A\n부스번호: A-215\n\n신제품 시연 및 기술 상담을 진행하오니 많은 관심 부탁드립니다.', date: '2025.10.15', views: 198, author: '관리자' },
  { id: 'n5', cat: '공지사항', title: '2025년 추석 연휴 휴무 안내', content: '2025년 추석 연휴 휴무 안내드립니다.\n\n휴무 기간: 2025.10.03(금) ~ 10.07(화)\n업무 재개: 2025.10.08(수)\n\n긴급 문의는 대표번호로 연락 부탁드립니다.', date: '2025.09.25', views: 89, author: '관리자' },
  { id: 'n6', cat: '이벤트', title: '태승전자 창립 36주년 기념 이벤트', content: '태승전자 창립 36주년을 맞아 기념 이벤트를 진행합니다.\n\n이벤트 기간 동안 제품 문의 고객분들께 특별 할인 혜택을 제공합니다.\n\n자세한 내용은 영업부로 문의 부탁드립니다.', date: '2025.07.01', views: 234, author: '관리자' },
];

const categories = ['전체', '공지사항', '보도자료', '이벤트'];

export default function NewsPage() {
  const [filter, setFilter] = useState('전체');
  const [search, setSearch] = useState('');
  const [openItem, setOpenItem] = useState<NewsItem | null>(null);

  const filtered = newsItems
    .filter(item => filter === '전체' || item.cat === filter)
    .filter(item => !search || item.title.toLowerCase().includes(search.toLowerCase()) || item.content.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="bg-black min-h-screen text-white selection:bg-white/30 selection:text-white">
      <Navbar />

      <main className="pt-32 pb-20">
        {/* Hero Section */}
        <section className="relative flex flex-col items-center justify-center text-center px-6 mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block mb-6 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-sm font-medium text-gray-300"
          >
            News & Notice
          </motion.div>
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            뉴스 & 공지사항.
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto font-light tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            태승전자의 최신 소식을 전해드립니다.
          </motion.p>
        </section>

        {/* Board Section */}
        <section className="max-w-4xl mx-auto px-6">
          <AnimatePresence mode="wait">
            {openItem ? (
              /* Detail View */
              <motion.div
                key="detail"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <button
                  onClick={() => setOpenItem(null)}
                  className="flex items-center gap-2 px-4 py-2 mb-6 rounded-lg bg-white/5 border border-white/10 text-gray-400 text-sm hover:bg-white/10 hover:text-white transition-colors"
                >
                  <ChevronLeft size={16} />
                  목록으로
                </button>

                <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl overflow-hidden">
                  <div className="p-8 border-b border-white/5">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-sky-400/10 text-sky-400">{openItem.cat}</span>
                      <span className="text-xs text-gray-500 font-mono">{openItem.date}</span>
                      <span className="text-xs text-gray-500">조회 {openItem.views}</span>
                    </div>
                    <h2 className="text-2xl font-bold tracking-tight">{openItem.title}</h2>
                    <p className="text-xs text-gray-500 mt-2">작성자: {openItem.author}</p>
                  </div>

                  <div className="p-8 text-gray-300 leading-relaxed whitespace-pre-wrap min-h-[160px]">
                    {openItem.content}
                  </div>
                </div>
              </motion.div>
            ) : (
              /* List View */
              <motion.div
                key="list"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                {/* Search */}
                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                  <div className="relative flex-1">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                      type="text"
                      placeholder="검색어 입력..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-gray-500 outline-none focus:border-white/20 transition-colors"
                    />
                  </div>
                </div>

                {/* Category Tabs */}
                <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setFilter(cat)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap border transition-all ${
                        filter === cat
                          ? 'bg-white/10 border-white/15 text-white'
                          : 'bg-white/[0.02] border-white/5 text-gray-500 hover:text-gray-300 hover:bg-white/5'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Table */}
                <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl overflow-hidden">
                  {filtered.length === 0 ? (
                    <div className="py-16 text-center text-gray-500 text-sm">
                      {search ? '검색 결과가 없습니다' : '등록된 글이 없습니다'}
                    </div>
                  ) : (
                    <div className="divide-y divide-white/5">
                      {filtered.map((item, i) => (
                        <motion.div
                          key={item.id}
                          onClick={() => setOpenItem({ ...item, views: item.views + 1 })}
                          className="group flex flex-col sm:flex-row sm:items-center justify-between p-5 sm:p-6 cursor-pointer hover:bg-white/[0.03] transition-colors"
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: i * 0.05 }}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-5">
                            <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-white/5 text-gray-400 w-fit">{item.cat}</span>
                            <h3 className="text-sm sm:text-base font-medium text-gray-200 group-hover:text-white transition-colors flex items-center gap-2">
                              {item.title}
                              {item === newsItems[0] && (
                                <span className="px-2 py-0.5 rounded-full bg-white/10 text-white text-[10px] font-bold tracking-wider">NEW</span>
                              )}
                            </h3>
                          </div>
                          <div className="flex items-center gap-4 mt-2 sm:mt-0 text-xs text-gray-500 shrink-0">
                            <span className="font-mono">{item.date}</span>
                            <span>조회 {item.views}</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Summary */}
                <div className="flex justify-between items-center mt-4 text-xs text-gray-500">
                  <span>전체 {newsItems.length}건{filter !== '전체' ? ` / 필터: ${filter}` : ''}{search ? ` / 검색: "${search}"` : ''}</span>
                  <span>표시 {filtered.length}건</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </main>

      <Footer />
    </div>
  );
}
