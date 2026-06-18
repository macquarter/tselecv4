import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductNav from '../components/ProductNav';
import { useImage } from '../contexts/SiteContentContext';

const HMI_CARD = {
  tag: 'HMI · DISPLAY',
  lede: '터치 디스플레이 모듈과 UI 펌웨어를 통합 공급. 컨트롤 보드와의 연동까지 한 번에 설계되어, 별도 인터페이스 개발 부담을 줄입니다.',
  specs: [
    { k: '디스플레이', v: 'TFT LCD · 정전식 터치 패널' },
    { k: '사이즈 옵션', v: '요구사양별 사이즈/해상도 대응' },
    { k: 'UI 펌웨어', v: '메뉴 구성 · 다국어 · 커스텀 그래픽' },
    { k: '통신', v: 'UART · SPI · I²C (메인 보드 연동)' },
  ],
  chips: ['터치 UI', '다국어 메뉴', '커스텀 그래픽', '메인 보드 연동'],
};

export default function Display() {
  const { t } = useTranslation();
  const _heroImg = useImage('displayPage.hero.img', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80');

  return (
    <div className="bg-black min-h-screen text-white selection:bg-white/30 selection:text-white">
      <Navbar />

      <main className="pt-32 pb-20">
        <section className="relative flex flex-col items-center justify-center text-center px-6 mb-32">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} className="inline-block mb-6 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-sm font-medium text-gray-300">{t('displayPage.badge')}</motion.div>
          <motion.h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}>
            {t('displayPage.t1')}<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-600">{t('displayPage.t2')}</span>
          </motion.h1>
          <motion.p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto font-light tracking-tight whitespace-pre-line" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}>
            {t('displayPage.sub')}
          </motion.p>
        </section>

        <section className="max-w-7xl mx-auto px-6 mb-16">
          <ProductNav />
        </section>

        <section className="max-w-7xl mx-auto px-6 pb-24">
          <div className="grid lg:grid-cols-[3fr_7fr] gap-8 lg:gap-10 items-stretch">
            {/* LEFT: HMI Solutions 사진 (3 : 스펙 7, 높이 매칭) */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-[2rem] overflow-hidden border border-white/10 bg-[#0a0a0a] min-h-[320px] lg:min-h-0"
            >
              <img src={_heroImg} alt={t('displayPage.t2')} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </motion.div>

            {/* RIGHT: HMI Module */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-[2rem] bg-[#0a0a0a] border border-white/5 overflow-hidden ts-card p-8 md:p-10"
            >
              <div className="absolute -top-32 -right-32 w-72 h-72 rounded-full bg-gradient-to-br from-blue-500/15 to-blue-700/5 blur-3xl pointer-events-none" />
              <div className="relative z-10">
                <span className="inline-block px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-xs tracking-widest text-gray-400 uppercase mb-5">HMI Module</span>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 ts-card-title">HMI 솔루션 라인업 상세</h2>
                <p className="text-sm md:text-base text-gray-400 font-light leading-relaxed mb-8">{HMI_CARD.lede}</p>

                <div className="text-[11px] font-semibold tracking-[0.12em] uppercase text-gray-500 mb-3">{HMI_CARD.tag}</div>
                <ul className="divide-y divide-white/5 border-t border-white/5 mb-7">
                  {HMI_CARD.specs.map((s, si) => (
                    <li key={si} className="flex items-start justify-between gap-4 py-3 text-sm">
                      <span className="text-gray-500 shrink-0">{s.k}</span>
                      <span className="text-gray-200 text-right font-medium">{s.v}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {HMI_CARD.chips.map((c, ci) => (
                    <span key={ci} className="text-xs px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-gray-300">{c}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
