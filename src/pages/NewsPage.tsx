import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ChevronLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useBoardOpt } from '../contexts/SiteContentContext';
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

// Static fallback data
// 샘플(보도자료 등) 하드코딩 데이터 제거: 공개 사이트에는 어드민에 등록된 글만 노출.
// → 어드민 '뉴스/공지 관리'에서 등록/수정/삭제한 내용이 그대로 사이트에 반영됨.
const staticNews: NewsItem[] = [];

const CAT_KEYS = ['전체', '공지사항', '보도자료', '이벤트'];
const CAT_LABEL: Record<string, string> = { '전체': 'catAll', '공지사항': 'catNotice', '보도자료': 'catPress', '이벤트': 'catEvent' };

export default function NewsPage() {
  const { t } = useTranslation();
  const boardOpt = useBoardOpt('news');
  const [newsItems, setNewsItems] = useState<NewsItem[]>(staticNews);
  const [filter, setFilter] = useState('전체');
  const [search, setSearch] = useState('');
  const [openItem, setOpenItem] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch news from Firestore
  useEffect(() => {
    async function fetchNews() {
      try {
        const snapshot = await getDocs(collection(db, 'news'));
        if (!snapshot.empty) {
          const items: NewsItem[] = snapshot.docs.map(doc => {
            const data = doc.data();
            const createdAt = data.createdAt?.toDate?.() || (typeof data.createdAt === 'string' ? new Date(data.createdAt) : null);
            return {
              id: doc.id,
              cat: data.category || '공지사항',
              title: data.title || '',
              content: data.content || '',
              date: createdAt ? `${createdAt.getFullYear()}.${String(createdAt.getMonth()+1).padStart(2,'0')}.${String(createdAt.getDate()).padStart(2,'0')}` : '',
              views: data.views || 0,
              author: data.author || '관리자',
              _ts: createdAt ? createdAt.getTime() : 0,
            };
          });
          items.sort((a, b) => (b as any)._ts - (a as any)._ts);
          setNewsItems(items);
        }
      } catch (err) {
        console.log('Firestore 연결 실패, 정적 데이터 사용:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, []);

  const filtered = newsItems
    .filter(item => filter === '전체' || item.cat === filter)
    .filter(item => !search || item.title.toLowerCase().includes(search.toLowerCase()) || item.content.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="bg-black min-h-screen text-white selection:bg-white/30 selection:text-white">
      <Navbar />

      <main className="pt-32 pb-20">
        <section className="relative flex flex-col items-center justify-center text-center px-6 mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block mb-6 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-sm font-medium text-gray-300"
          >
            {t('newsPage.badge')}
          </motion.div>
          <motion.h1
            className="text-4xl md:text-7xl font-bold mb-8 tracking-tighter break-keep"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {t('newsPage.title')}
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto font-light tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {t('newsPage.sub')}
          </motion.p>
        </section>

        <section className="max-w-4xl mx-auto px-6">
          {loading ? (
            <div className="py-20 text-center text-gray-500">{t('newsPage.loading')}</div>
          ) : (
          <AnimatePresence mode="wait">
            {openItem ? (
              <motion.div key="detail" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}>
                <button onClick={() => setOpenItem(null)} className="flex items-center gap-2 px-4 py-2 mb-6 rounded-lg bg-white/5 border border-white/10 text-gray-400 text-sm hover:bg-white/10 hover:text-white transition-colors">
                  <ChevronLeft size={16} /> {t('newsPage.back')}
                </button>
                <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl overflow-hidden">
                  <div className="p-8 border-b border-white/5">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-sky-400/10 text-sky-400">{t(`newsPage.${CAT_LABEL[openItem.cat] || 'catNotice'}`)}</span>
                      {boardOpt.showDate && <span className="text-xs text-gray-500 font-mono">{openItem.date}</span>}
                      {boardOpt.showViews && <span className="text-xs text-gray-500">{t('newsPage.views')} {openItem.views}</span>}
                    </div>
                    <h2 className="text-2xl font-bold tracking-tight">{openItem.title}</h2>
                    <p className="text-xs text-gray-500 mt-2">{t('newsPage.author')}: {openItem.author}</p>
                  </div>
                  <div className="p-8 text-gray-300 leading-relaxed whitespace-pre-wrap min-h-[160px]">{openItem.content}</div>
                </div>
              </motion.div>
            ) : (
              <motion.div key="list" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}>
                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                  <div className="relative flex-1">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input type="text" placeholder={t('newsPage.searchPh')} value={search} onChange={(e) => setSearch(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-gray-500 outline-none focus:border-white/20 transition-colors" />
                  </div>
                </div>
                <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
                  {CAT_KEYS.map(cat => (
                    <button key={cat} onClick={() => setFilter(cat)} className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap border transition-all ${filter === cat ? 'bg-white/10 border-white/15 text-white' : 'bg-white/[0.02] border-white/5 text-gray-500 hover:text-gray-300 hover:bg-white/5'}`}>{t(`newsPage.${CAT_LABEL[cat]}`)}</button>
                  ))}
                </div>
                <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl overflow-hidden">
                  {filtered.length === 0 ? (
                    <div className="py-16 text-center text-gray-500 text-sm">{t('newsPage.empty')}</div>
                  ) : (
                    <div className="divide-y divide-white/5">
                      {filtered.map((item, i) => (
                        <motion.div key={item.id} onClick={() => setOpenItem({ ...item, views: item.views + 1 })} className="group flex flex-col sm:flex-row sm:items-center justify-between p-5 sm:p-6 cursor-pointer hover:bg-white/[0.03] transition-colors" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }}>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-5">
                            <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-white/5 text-gray-400 w-fit">{t(`newsPage.${CAT_LABEL[item.cat] || 'catNotice'}`)}</span>
                            <h3 className="text-sm sm:text-base font-medium text-gray-200 group-hover:text-white transition-colors flex items-center gap-2">
                              {item.title}
                              {item === newsItems[0] && <span className="px-2 py-0.5 rounded-full bg-white/10 text-white text-[10px] font-bold tracking-wider">NEW</span>}
                            </h3>
                          </div>
                          <div className="flex items-center gap-4 mt-2 sm:mt-0 text-xs text-gray-500 shrink-0">
                            {boardOpt.showDate && <span className="font-mono">{item.date}</span>}
                            {boardOpt.showViews && <span>{t('newsPage.views')} {item.views}</span>}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}