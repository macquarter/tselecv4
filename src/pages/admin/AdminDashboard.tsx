import { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
  Send,
  Bot,
  User,
  Sparkles,
  RotateCcw,
} from 'lucide-react';
import {
  CHATBOT_MEMORY,
  MEMORY_STATS,
  findBestMatch,
  type MemoryCategory,
  type MemoryEntry,
} from '../../data/chatbotMemory';

type TabId = 'memory' | 'products' | 'news' | 'users';

interface ChatTurn {
  role: 'user' | 'bot';
  text: string;
  matchedId?: string;
  matchedCategory?: MemoryCategory;
  followUp?: string;
  time: string;
}

const SUGGESTED_QUESTIONS = [
  '태승전자 16개 제품 라인업을 알려주세요',
  'Main PCB와 POWER PCB 차이가 뭐예요?',
  'HMI Display 솔루션은 어떤 사양이 가능한가요?',
  '수소드론 / 연료전지 제어보드도 만드시나요?',
  '기능 사양서만 드리면 회로 설계부터 전부 진행해 주시나요?',
  '월간 또는 연간 최대 생산 능력(Capa)은 어떻게 되나요?',
  '거버 파일과 BOM 없이 샘플 PCB만 있어도 제작 가능한가요?',
  'MOQ가 어떻게 되나요?',
  '회로도와 거버 파일 소유권(IP)은 이관되나요?',
  'KC·CE 인증 대행이 가능한가요?',
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabId>('memory');

  // 챗봇 시뮬레이션 상태
  const [messages, setMessages] = useState<ChatTurn[]>([
    {
      role: 'bot',
      text:
        '안녕하세요! 태승전자(주) 학습 챗봇입니다. 회사·제품·신규개발·양산이관·인증 등 무엇이든 물어보세요.',
      followUp:
        '아래 추천 질문을 눌러보시거나 직접 입력해 주세요.',
      time: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<MemoryCategory | 'ALL'>('ALL');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (!isAdmin) {
      navigate('/admin');
    }
  }, [navigate]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/admin');
  };

  const handleSend = (text?: string) => {
    const userText = (text ?? input).trim();
    if (!userText) return;

    const now = new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
    setMessages((prev) => [...prev, { role: 'user', text: userText, time: now }]);
    setInput('');
    setIsTyping(true);

    // 챗봇 응답 시뮬레이션 (typing latency 500~900ms)
    const latency = 500 + Math.random() * 400;
    setTimeout(() => {
      const match = findBestMatch(userText);
      const botReply: ChatTurn = match
        ? {
            role: 'bot',
            text: match.answer,
            matchedId: match.id,
            matchedCategory: match.category,
            followUp: match.followUp,
            time: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
          }
        : {
            role: 'bot',
            text:
              '죄송합니다, 해당 질문에 대한 답변이 학습되어 있지 않습니다.\n\n태승전자(주) 영업팀(032-329-7600)으로 문의 주시거나, 아래 추천 질문을 참고해 주세요.',
            time: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
          };
      setMessages((prev) => [...prev, botReply]);
      setIsTyping(false);
    }, latency);
  };

  const handleResetChat = () => {
    setMessages([
      {
        role: 'bot',
        text:
          '대화가 초기화되었습니다. 다시 질문을 시작해 주세요!',
        time: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  // KB browser (사이드 패널)
  const filteredKB: MemoryEntry[] = useMemo(() => {
    if (activeCategoryFilter === 'ALL') return CHATBOT_MEMORY;
    return CHATBOT_MEMORY.filter((m) => m.category === activeCategoryFilter);
  }, [activeCategoryFilter]);

  const categories: Array<MemoryCategory | 'ALL'> = [
    'ALL',
    '회사소개',
    '연락처',
    '제품',
    '신규개발',
    '양산이관',
    '서비스',
    '인증',
    '시설',
    '조직',
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
      <div className="flex-1 overflow-hidden flex flex-col">
        <div className="px-10 pt-10 pb-6 border-b border-white/5 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tighter">
              {activeTab === 'memory' && '챗봇 메모리.'}
              {activeTab === 'products' && '제품 관리'}
              {activeTab === 'news' && '뉴스/공지 관리'}
              {activeTab === 'users' && '문의 내역'}
            </h1>
            {activeTab === 'memory' && (
              <p className="text-sm text-gray-500 mt-1 font-light">
                {MEMORY_STATS.total}개 학습 항목 · {MEMORY_STATS.version} · 마지막 갱신{' '}
                {MEMORY_STATS.lastUpdated}
              </p>
            )}
          </div>
          {activeTab !== 'memory' && (
            <button className="bg-white text-black px-6 py-2.5 rounded-full font-medium flex items-center gap-2 hover:bg-gray-200 transition-colors">
              <Plus size={18} />
              새로 등록하기
            </button>
          )}
          {activeTab === 'memory' && (
            <button
              onClick={handleResetChat}
              className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 hover:border-white/30"
            >
              <RotateCcw size={14} />
              대화 초기화
            </button>
          )}
        </div>

        {/* ─────── 챗봇 메모리 (실제 챗봇 시뮬레이션 UI) ─────── */}
        {activeTab === 'memory' && (
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_320px] overflow-hidden">
            {/* 챗봇 대화창 */}
            <div className="flex flex-col overflow-hidden">
              <div className="flex-1 overflow-y-auto px-10 py-8 space-y-6">
                <AnimatePresence initial={false}>
                  {messages.map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {msg.role === 'bot' && (
                        <div className="w-9 h-9 rounded-full bg-white/[0.08] border border-white/10 flex items-center justify-center shrink-0 mt-1">
                          <Bot size={16} className="text-gray-300" />
                        </div>
                      )}

                      <div className={`max-w-[600px] ${msg.role === 'user' ? 'order-1' : ''}`}>
                        <div
                          className={`rounded-2xl px-5 py-4 ${
                            msg.role === 'user'
                              ? 'bg-white text-black'
                              : 'bg-[#0a0a0a] border border-white/10 text-gray-200'
                          }`}
                        >
                          <p className="whitespace-pre-line text-sm leading-relaxed">{msg.text}</p>
                          {msg.followUp && (
                            <p className="mt-3 pt-3 border-t border-white/10 text-xs text-gray-400 italic leading-relaxed whitespace-pre-line">
                              {msg.followUp}
                            </p>
                          )}
                        </div>
                        <div
                          className={`mt-1 flex items-center gap-2 text-[10px] text-gray-600 ${
                            msg.role === 'user' ? 'justify-end' : 'justify-start'
                          }`}
                        >
                          <span>{msg.time}</span>
                          {msg.matchedCategory && (
                            <>
                              <span>·</span>
                              <span className="px-1.5 py-0.5 rounded bg-white/[0.06] border border-white/10 font-mono">
                                {msg.matchedCategory} / {msg.matchedId}
                              </span>
                            </>
                          )}
                        </div>
                      </div>

                      {msg.role === 'user' && (
                        <div className="w-9 h-9 rounded-full bg-white/[0.08] border border-white/10 flex items-center justify-center shrink-0 mt-1 order-2">
                          <User size={16} className="text-gray-300" />
                        </div>
                      )}
                    </motion.div>
                  ))}

                  {isTyping && (
                    <motion.div
                      key="typing"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex gap-3"
                    >
                      <div className="w-9 h-9 rounded-full bg-white/[0.08] border border-white/10 flex items-center justify-center shrink-0">
                        <Bot size={16} className="text-gray-300" />
                      </div>
                      <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl px-5 py-4 flex items-center gap-1.5">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            className="w-1.5 h-1.5 rounded-full bg-gray-400"
                            animate={{ y: [0, -4, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div ref={chatEndRef} />
              </div>

              {/* Suggested questions */}
              {messages.length <= 2 && (
                <div className="px-10 pb-4 border-t border-white/5 pt-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles size={14} className="text-gray-500" />
                    <span className="text-xs tracking-widest uppercase text-gray-500">
                      추천 질문
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {SUGGESTED_QUESTIONS.map((q, i) => (
                      <button
                        key={i}
                        onClick={() => handleSend(q)}
                        className="px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs text-gray-300 hover:bg-white/[0.08] hover:text-white transition-colors"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input */}
              <div className="px-10 py-6 border-t border-white/5">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSend();
                  }}
                  className="flex gap-3"
                >
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="학습된 내용을 질문해 보세요…  (예: 회사 소개, MOQ, IP 이관 가능?)"
                    className="flex-1 bg-[#0a0a0a] border border-white/10 rounded-full px-5 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-white/30 transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || isTyping}
                    className="bg-white text-black rounded-full w-12 h-12 flex items-center justify-center hover:bg-gray-200 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <Send size={16} />
                  </button>
                </form>
              </div>
            </div>

            {/* KB Browser (사이드 패널) */}
            <div className="border-l border-white/5 bg-[#080808] overflow-y-auto px-6 py-8 hidden lg:block">
              <div className="text-xs tracking-widest uppercase text-gray-500 mb-4">
                Knowledge Base
              </div>

              {/* Stats */}
              <div className="space-y-2 mb-6">
                {Object.entries(MEMORY_STATS.byCategory).map(([cat, n]) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategoryFilter(cat as MemoryCategory)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-colors ${
                      activeCategoryFilter === cat
                        ? 'bg-white text-black font-medium'
                        : 'text-gray-400 hover:bg-white/[0.04] hover:text-white'
                    }`}
                  >
                    <span>{cat}</span>
                    <span className="font-mono">{n}</span>
                  </button>
                ))}
                <button
                  onClick={() => setActiveCategoryFilter('ALL')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-colors border-t border-white/5 mt-2 pt-3 ${
                    activeCategoryFilter === 'ALL'
                      ? 'text-white font-semibold'
                      : 'text-gray-500 hover:text-white'
                  }`}
                >
                  <span>전체</span>
                  <span className="font-mono">{MEMORY_STATS.total}</span>
                </button>
              </div>

              {/* Entry list */}
              <div className="text-xs tracking-widest uppercase text-gray-500 mb-3">
                {activeCategoryFilter === 'ALL' ? '전체 항목' : activeCategoryFilter}
              </div>
              <div className="space-y-2">
                {filteredKB.slice(0, 50).map((m) => {
                  const firstKw = m.keywords[0] ?? m.id;
                  return (
                    <button
                      key={m.id}
                      onClick={() => handleSend(firstKw)}
                      className="w-full text-left rounded-lg p-3 bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.05] hover:border-white/10 transition-colors group"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <code className="text-[10px] font-mono text-gray-500">{m.id}</code>
                        <span className="text-[9px] text-gray-600">{m.updatedAt}</span>
                      </div>
                      <p className="text-xs text-gray-300 line-clamp-2 group-hover:text-white">
                        {m.answer.split('\n')[0]}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ─────── 제품 관리 탭 ─────── */}
        {activeTab === 'products' && (
          <div className="px-10 py-8 overflow-y-auto">
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
                    { name: '냉장고 제어보드', category: '가전', date: '2026-05-27' },
                    { name: '정수기 제어보드', category: '가전', date: '2026-05-27' },
                    { name: '레인지후드 제어보드', category: '가전', date: '2026-05-27' },
                    { name: '공기청정기 제어보드', category: '가전', date: '2026-05-27' },
                    { name: '식기세척기 제어보드', category: '산업용', date: '2026-05-27' },
                    { name: '제빙기 제어보드', category: '산업용', date: '2026-05-27' },
                    { name: '펌프 제어보드', category: '산업용', date: '2026-05-27' },
                    { name: '회의부스 제어보드', category: '산업용', date: '2026-05-27' },
                    { name: '산업용 온도제어기', category: '산업용', date: '2026-05-27' },
                    { name: '원심분리기 제어보드', category: '의료기기', date: '2026-05-27' },
                    { name: '진단기 제어보드', category: '의료기기', date: '2026-05-27' },
                    { name: '치과용 스케일러 제어보드', category: '의료기기', date: '2026-05-27' },
                    { name: '연료전지 제어보드', category: '신재생에너지', date: '2026-05-27' },
                    { name: '수소드론 제어보드', category: '신재생에너지', date: '2026-05-27' },
                    { name: '리튬이온 배터리충전 제어', category: '신재생에너지', date: '2026-05-27' },
                    { name: '태양광패널 제어보드', category: '신재생에너지', date: '2026-05-27' },
                    { name: 'Main PCB', category: '임베디드', date: '2026-05-27' },
                    { name: 'POWER PCB', category: '임베디드', date: '2026-05-27' },
                    { name: 'Display (HMI)', category: 'HMI', date: '2026-05-27' },
                    { name: 'SMPS', category: '주변기기', date: '2026-05-27' },
                    { name: '무선모듈 (Wi-Fi/BLE)', category: '주변기기', date: '2026-05-27' },
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
          </div>
        )}

        {(activeTab === 'news' || activeTab === 'users') && (
          <div className="px-10 py-8">
            <div className="bg-[#111] rounded-3xl border border-white/10 p-12 text-center text-gray-500 text-sm">
              준비 중입니다.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
