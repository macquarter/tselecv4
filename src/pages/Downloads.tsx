import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ChevronLeft, Download, FileText, Paperclip } from 'lucide-react';
import { useBoardOpt } from '../contexts/SiteContentContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

interface DownloadItem {
  id: string;
  cat: string;
  title: string;
  content: string;
  date: string;
  views: number;
  file: string;
}

const downloadItems: DownloadItem[] = [
  { id: 'd1', cat: '카탈로그', title: '2026 종합 카탈로그', content: '태승전자 2026년 종합 카탈로그입니다.\n\n제품 라인업, 사양, 적용 분야 등 상세 정보를 확인하실 수 있습니다.', date: '2026.03.01', views: 340, file: '카탈로그_2026.pdf' },
  { id: 'd2', cat: '데이터시트', title: 'MC-200 메인 컨트롤러 데이터시트', content: 'MC-200 메인 컨트롤러의 전기적 사양, 핀 배치, 동작 조건 등 기술 데이터시트입니다.', date: '2026.02.15', views: 178, file: 'MC-200_Datasheet.pdf' },
  { id: 'd3', cat: '인증서', title: 'ISO 9001:2015 품질경영시스템 인증서', content: 'ISO 9001:2015 국제 품질경영시스템 인증서 사본입니다.', date: '2025.12.20', views: 95, file: 'ISO9001_Certificate.pdf' },
  { id: 'd4', cat: '매뉴얼', title: 'MC-200 사용자 매뉴얼 v2.1', content: 'MC-200 메인 컨트롤러 설치 및 운용 매뉴얼입니다.\n\n설치 가이드, 배선도, 프로그래밍 방법, 트러블슈팅 가이드를 포함합니다.', date: '2025.11.10', views: 256, file: 'MC-200_Manual_v2.1.pdf' },
  { id: 'd5', cat: '데이터시트', title: 'DP-100 디스플레이 패널 데이터시트', content: 'DP-100 터치형 LED 디스플레이 패널의 기술 데이터시트입니다.', date: '2025.10.05', views: 134, file: 'DP-100_Datasheet.pdf' },
  { id: 'd6', cat: '카탈로그', title: '태양광 인버터 제어기 제품 카탈로그', content: 'MPPT 기반 태양광 인버터 제어기 라인업 카탈로그입니다.', date: '2025.09.18', views: 89, file: 'Solar_Inverter_Catalog.pdf' },
  { id: 'd7', cat: '소프트웨어', title: 'TSELEC 모니터링 소프트웨어 v3.0', content: '태승전자 제품 원격 모니터링 소프트웨어 최신 버전입니다.\n\n시스템 요구사항: Windows 10 이상', date: '2025.08.25', views: 312, file: 'TSELEC_Monitor_v3.0.zip' },
];

const categories = ['전체', '카탈로그', '데이터시트', '인증서', '매뉴얼', '소프트웨어'];

export default function Downloads() {
  const boardOpt = useBoardOpt('dl');
  const [filter, setFilter] = useState('전체');
  const [search, setSearch] = useState('');
  const [openItem, setOpenItem] = useState<DownloadItem | null>(null);

  const filtered = downloadItems
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
            Downloads
          </motion.div>
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            자료실.
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto font-light tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            카탈로그, 데이터시트, 인증서 등<br className="hidden md:block" />
            필요한 자료를 다운로드하세요.
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
                      {boardOpt.showDate && <span className="text-xs text-gray-500 font-mono">{openItem.date}</span>}
                      {boardOpt.showViews && <span className="text-xs text-gray-500">조회 {openItem.views}</span>}
                    </div>
                    <h2 className="text-2xl font-bold tracking-tight">{openItem.title}</h2>
                  </div>

                  <div className="p-8 text-gray-300 leading-relaxed whitespace-pre-wrap min-h-[120px]">
                    {openItem.content}
                  </div>

                  {openItem.file && (
                    <div className="px-8 py-5 border-t border-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-3 text-gray-400">
                        <Paperclip size={16} />
                        <span className="text-sm">{openItem.file}</span>
                      </div>
                      <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-sky-400/10 border border-sky-400/20 text-sky-400 text-sm font-semibold hover:bg-sky-400/20 transition-colors">
                        <Download size={14} />
                        다운로드
                      </button>
                    </div>
                  )}
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
                {/* Search & Controls */}
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
                      {search ? '검색 결과가 없습니다' : '등록된 자료가 없습니다'}
                    </div>
                  ) : (
                    <div className="divide-y divide-white/5">
                      {filtered.map((item, i) => (
                        <motion.div
                          key={item.id}
                          onClick={() => setOpenItem(item)}
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
                              {item === downloadItems[0] && (
                                <span className="px-2 py-0.5 rounded-full bg-white/10 text-white text-[10px] font-bold tracking-wider">NEW</span>
                              )}
                            </h3>
                          </div>
                          <div className="flex items-center gap-4 mt-2 sm:mt-0 text-xs text-gray-500 shrink-0">
                            {item.file && (
                              <span className="flex items-center gap-1">
                                <FileText size={12} />
                                {item.file.split('.').pop()?.toUpperCase()}
                              </span>
                            )}
                            {boardOpt.showDate && <span className="font-mono">{item.date}</span>}
                            {boardOpt.showViews && <span>조회 {item.views}</span>}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Summary */}
                <div className="flex justify-between items-center mt-4 text-xs text-gray-500">
                  <span>전체 {downloadItems.length}건{filter !== '전체' ? ` / 필터: ${filter}` : ''}{search ? ` / 검색: "${search}"` : ''}</span>
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
