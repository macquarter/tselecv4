import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductNav from '../components/ProductNav';
import ModuleCatalog, { CatalogCard } from '../components/ModuleCatalog';

const HMI_CARDS: CatalogCard[] = [
  {
    tag: 'HMI · DISPLAY',
    name: 'Display',
    lede: '터치 디스플레이 모듈과 UI 펌웨어를 통합 공급. 컨트롤 보드와의 연동까지 한 번에 설계되어, 별도 인터페이스 개발 부담을 줄입니다.',
    specs: [
      { k: '디스플레이', v: 'TFT LCD · 정전식 터치 패널' },
      { k: '사이즈 옵션', v: '요구사양별 사이즈/해상도 대응' },
      { k: 'UI 펌웨어', v: '메뉴 구성 · 다국어 · 커스텀 그래픽' },
      { k: '통신', v: 'UART · SPI · I²C (메인 보드 연동)' },
    ],
    chips: ['터치 UI', '다국어 메뉴', '커스텀 그래픽', '메인 보드 연동'],
    accent: 'from-blue-500/15 to-blue-700/5',
  },
];

export default function Display() {
  const { t } = useTranslation();

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

        <ModuleCatalog
          badge="HMI Module"
          title1="HMI 솔루션"
          title2="라인업 상세."
          sub="터치 디스플레이 + UI 펌웨어 + 메인 보드 연동을 한 번에 공급합니다."
          cards={HMI_CARDS}
        />
      </main>

      <Footer />
    </div>
  );
}
