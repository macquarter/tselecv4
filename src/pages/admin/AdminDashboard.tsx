import { useState, useEffect, useMemo } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import {
  LogOut,
  Plus,
  Edit2,
  Trash2,
  Settings,
  Users,
  FileText,
  Brain,
  Search,
  Tag,
  Clock,
} from 'lucide-react';
import {
  CHATBOT_MEMORY,
  MEMORY_STATS,
  type MemoryCategory,
  type MemoryEntry,
} from '../../data/chatbotMemory';

type TabId = 'products' | 'news' | 'users' | 'memory';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabId>('memory');

  // 챗봇 메모리 탭 상태
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<MemoryCategory | 'ALL'>('ALL');
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (!isAdmin) {
      navigate('/admin');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/admin');
  };

  // 필터링된 메모리 엔트리
  const filteredMemory: MemoryEntry[] = useMemo(() => {
    const q = search.trim().toLowerCase();
    return CHATBOT_MEMORY.filter((m) => {
      if (activeCategory !== 'ALL' && m.category !== activeCategory) return false;
      if (!q) return true;
      return (
        m.id.toLowerCase().includes(q) ||
        m.answer.toLowerCase().includes(q) ||
        m.keywords.some((k) => k.toLowerCase().includes(q)) ||
        m.category.toLowerCase().includes(q)
      );
    });
  }, [search, activeCategory]);

  const categories: Array<MemoryCategory | 'ALL'> = [
    'ALL',
    '회사소개',
    '연락처',
    '제품',
    '서비스',
    '인증',
    '시설',
    '조직',
    '신규개발',
    '기타',
  ];

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar */}
      <div className="w-64 bg-[#111] border-r border-white/10 p-6 flex flex-col">
        <div className="text-2xl font-bold tracking-tighter mb-12">TSELEC Admin</div>

        <nav className="flex-1 space-y-2">
          {[
            { id: 'memory' as const, label: '챗봇 메모리', icon: <Brain size={20} /> },
            { id: 'products' as const, label: '제품 관리', icon: <Settings size={20} /> },
            { id: 'news' as const, label: '뉴스/공지 관리', icon: <FileText size={20} /> },
            { id: 'users' as const, label: '문의 내역', icon: <Users size={20} /> },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                activeTab === item.id
                  ? 'bg-white text-black font-medium'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors px-4 py-3 mt-auto"
        >
          <LogOut size={20} />
          로그아웃
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10 overflow-y-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold tracking-tighter">
            {activeTab === 'memory' && '챗봇 메모리.'}
            {activeTab === 'products' && '제품 관리'}
            {activeTab === 'news' && '뉴스/공지 관리'}
            {activeTab === 'users' && '문의 내역'}
          </h1>
          {activeTab !== 'memory' && (
            <button className="bg-white text-black px-6 py-2.5 rounded-full font-medium flex items-center gap-2 hover:bg-gray-200 transition-colors">
              <Plus size={18} />
              새로 등록하기
            </button>
          )}
          {activeTab === 'memory' && (
            <span className="text-xs font-mono tracking-widest text-gray-500">
              {MEMORY_STATS.version} · 마지막 갱신 {MEMORY_STATS.lastUpdated}
            </span>
          )}
        </div>

        {/* ─────── 챗봇 메모리 탭 ─────── */}
        {activeTab === 'memory' && (
          <div className="space-y-6">
            {/* Stats Strip */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              <div className="rounded-2xl bg-[#0a0a0a] border border-white/5 p-5">
                <div className="text-xs tracking-widest uppercase text-gray-500 mb-2">전체 엔트리</div>
                <div className="text-3xl font-bold tracking-tighter">{MEMORY_STATS.total}</div>
              </div>
              {Object.entries(MEMORY_STATS.byCategory)
                .slice(0, 4)
                .map(([cat, n]) => (
                  <div
                    key={cat}
                    className="rounded-2xl bg-[#0a0a0a] border border-white/5 p-5"
                  >
                    <div className="text-xs tracking-widest uppercase text-gray-500 mb-2">{cat}</div>
                    <div className="text-3xl font-bold tracking-tighter">{n}</div>
                  </div>
                ))}
            </div>

            {/* Description Card */}
            <div className="rounded-2xl bg-[#0a0a0a] border border-white/5 p-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center shrink-0">
                  <Brain size={20} strokeWidth={1.5} className="text-gray-300" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-bold tracking-tight text-white mb-1">
                    챗봇이 학습한 회사·제품·공정·인증·연락처 정보입니다.
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed font-light">
                    아래 카드들은 <code className="px-1 py-0.5 rounded bg-white/[0.06] font-mono text-[10px]">src/data/chatbotMemory.ts</code>에 저장된
                    단일 소스이며, <code className="px-1 py-0.5 rounded bg-white/[0.06] font-mono text-[10px]">ChatBot.tsx</code>와 Gemini AI 폴백이 동일한 메모리를 참조합니다.
                    수정은 코드 PR을 통해 진행됩니다.
                  </p>
                </div>
              </div>
            </div>

            {/* Search + Category Filter */}
            <div className="flex flex-col md:flex-row gap-3">
              <div className="relative flex-1">
                <Search
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                  strokeWidth={1.5}
                />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="키워드, 답변 텍스트, 카테고리로 검색…"
                  className="w-full pl-11 pr-4 py-3 rounded-full bg-[#0a0a0a] border border-white/10 text-sm placeholder-gray-600 focus:outline-none focus:border-white/30 transition-colors"
                />
              </div>
              <div className="flex overflow-x-auto gap-2 scrollbar-hide">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-colors border ${
                      activeCategory === cat
                        ? 'bg-white text-black border-white'
                        : 'bg-[#0a0a0a] text-gray-400 border-white/10 hover:border-white/30 hover:text-white'
                    }`}
                  >
                    {cat === 'ALL' ? '전체' : cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Memory Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredMemory.length === 0 && (
                <div className="col-span-full text-center py-16 text-gray-500 text-sm">
                  검색 결과가 없습니다.
                </div>
              )}
              {filteredMemory.map((m, i) => {
                const isOpen = expanded === m.id;
                return (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: Math.min(i * 0.02, 0.3), ease: [0.16, 1, 0.3, 1] }}
                    className="rounded-2xl bg-[#0a0a0a] border border-white/5 p-5 hover:border-white/15 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-full bg-white/[0.06] border border-white/10 text-[10px] font-medium tracking-wide text-gray-300">
                          {m.category}
                        </span>
                        <code className="text-[10px] font-mono tracking-wide text-gray-600">{m.id}</code>
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] text-gray-600">
                        <Clock size={11} strokeWidth={1.5} />
                        {m.updatedAt}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {m.keywords.slice(0, isOpen ? m.keywords.length : 5).map((k) => (
                        <span
                          key={k}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.06] text-[10px] text-gray-400"
                        >
                          <Tag size={9} strokeWidth={1.5} />
                          {k}
                        </span>
                      ))}
                      {!isOpen && m.keywords.length > 5 && (
                        <span className="text-[10px] text-gray-600 px-2 py-0.5">
                          +{m.keywords.length - 5}
                        </span>
                      )}
                    </div>

                    <p
                      className={`text-sm text-gray-400 leading-relaxed font-light whitespace-pre-line ${
                        isOpen ? '' : 'line-clamp-3'
                      }`}
                    >
                      {m.answer}
                    </p>

                    {isOpen && m.followUp && (
                      <div className="mt-3 pt-3 border-t border-white/5">
                        <p className="text-xs tracking-widest uppercase text-gray-600 mb-1">Follow-up</p>
                        <p className="text-xs text-gray-500 leading-relaxed">{m.followUp}</p>
                      </div>
                    )}

                    <button
                      onClick={() => setExpanded(isOpen ? null : m.id)}
                      className="mt-3 text-xs text-gray-500 hover:text-white transition-colors"
                    >
                      {isOpen ? '닫기 ↑' : '자세히 보기 ↓'}
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* ─────── 제품 관리 탭 ─────── */}
        {activeTab === 'products' && (
          <div className="bg-[#111] rounded-3xl border border-white/10 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-white/5 border-b border-white/10">
                <tr>
                  <th className="px-6 py-4 font-medium text-gray-400">제품명</th>
                  <th className="px-6 py-4 font-medium text-gray-400">카테고리</th>
                  <th className="px-6 py-4 font-medium text-gray-400">등록일</th>
                  <th className="px-6 py-4 font-medium text-gray-400 text-right">관리</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {[
                  { name: 'TS-MCU-2024', category: '제어기판', date: '2024-03-15' },
                  { name: 'Smart Sensor Node', category: '센서모듈', date: '2024-03-10' },
                  { name: 'Industrial Gateway', category: '통신장비', date: '2024-02-28' },
                ].map((product, idx) => (
                  <tr key={idx} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-medium">{product.name}</td>
                    <td className="px-6 py-4 text-gray-400">{product.category}</td>
                    <td className="px-6 py-4 text-gray-400">{product.date}</td>
                    <td className="px-6 py-4 text-right space-x-3">
                      <button className="text-gray-400 hover:text-white transition-colors">
                        <Edit2 size={18} />
                      </button>
                      <button className="text-red-500 hover:text-red-400 transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ─────── 뉴스/공지 / 문의 — placeholder ─────── */}
        {(activeTab === 'news' || activeTab === 'users') && (
          <div className="bg-[#111] rounded-3xl border border-white/10 p-12 text-center text-gray-500 text-sm">
            준비 중입니다.
          </div>
        )}
      </div>
    </div>
  );
}
