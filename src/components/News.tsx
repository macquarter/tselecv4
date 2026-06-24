import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useTranslation } from 'react-i18next';
import { useBoardOpt } from '../contexts/SiteContentContext';

interface NewsItem {
  id: string;
  category: string;
  title: string;
  date: string;
  isNew: boolean;
}

// 샘플 공지 하드코딩 제거: 홈 공지 섹션도 어드민(Firestore)에 등록된 글만 노출. (태승 수정: 공지 내용 전체 삭제)
const staticItems: NewsItem[] = [];

export default function News() {
  const { t } = useTranslation();
  const [newsItems, setNewsItems] = useState<NewsItem[]>(staticItems);
  const boardOpt = useBoardOpt('news');

  useEffect(() => {
    async function fetchNews() {
      try {
        const q = query(collection(db, 'news'), orderBy('createdAt', 'desc'), limit(3));
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          const items: NewsItem[] = snapshot.docs.map((doc, i) => {
            const data = doc.data();
            const createdAt = data.createdAt?.toDate?.();
            return {
              id: doc.id,
              category: data.category || '공지사항',
              title: data.title || '',
              date: createdAt ? `${createdAt.getFullYear()}.${String(createdAt.getMonth()+1).padStart(2,'0')}.${String(createdAt.getDate()).padStart(2,'0')}` : '',
              isNew: i === 0,
            };
          });
          setNewsItems(items);
        }
      } catch {
        // Firestore failure → static fallback
      }
    }
    fetchNews();
  }, []);

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
              {t('news.t')}
            </motion.h2>
            <motion.p
              className="text-gray-400 font-light"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              {t('news.s')}
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              to="/news"
              className="flex items-center gap-2 text-sm font-medium text-white hover:text-gray-300 transition-colors group"
            >
              {t('news.viewAll')}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <div className="flex flex-col gap-4">
          {newsItems.length === 0 && (
            <div className="py-16 text-center text-gray-500 text-sm">{t('news.empty')}</div>
          )}
          {newsItems.map((item, i) => (
            <motion.div
              key={item.id}
              className="group flex flex-col sm:flex-row sm:items-center justify-between p-6 rounded-2xl bg-[#0a0a0a] border border-white/5 hover:bg-[#111] transition-colors duration-300 gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link to="/news" className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
                <span className="text-sm font-medium text-gray-500 w-20">{item.category}</span>
                <h3 className="text-lg font-medium text-gray-200 group-hover:text-white transition-colors flex items-center gap-3">
                  {item.title}
                  {item.isNew && (
                    <span className="px-2 py-0.5 rounded-full bg-white/10 text-white text-[10px] font-bold tracking-wider">
                      {t('news.newBadge')}
                    </span>
                  )}
                </h3>
              </Link>
              {boardOpt.showDate && <span className="text-sm text-gray-500 font-mono">{item.date}</span>}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
