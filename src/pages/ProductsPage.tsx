import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductNav from '../components/ProductNav';

type TabId = 'embedded' | 'hmi' | 'custom';

interface CatalogItem {
  tag: string;
  name: string;
  lede: string;
  specs: { k: string; v: string }[];
  chips: string[];
  accent: string;
}

const CATALOG: Record<TabId, CatalogItem[]> = {
  embedded: [
    {
      tag: 'EMBEDDED · MAIN BOARD',
      name: 'Main PCB',
      lede: '제품의 전체 동작을 제어하는 메인 컨트롤 보드. MCU·센서 인터페이스·통신·전원 관리를 통합 설계하여 가전부터 산업기기까지 대응합니다.',
      specs: [
        { k: 'MCU 아키텍처', v: '8/16/32-bit (요구사양별)' },
        { k: '통신 인터페이스', v: 'UART · I²C · SPI · CAN · RS-485' },
        { k: '설계 방식', v: '표준 라인업 + ODM/맞춤 설계' },
        { k: '대응 환경', v: '가전 · 산업 · 의료 · 신재생에너지' },
      ],
      chips: ['제어 알고리즘', '센서 연동', '통신 모듈 통합', 'EMC 대응 설계'],
      accent: 'from-blue-500/15 to-blue-700/5',
    },
    {
      tag: 'EMBEDDED · POWER BOARD',
      name: 'POWER PCB',
      lede: '제품 내 전력 변환·분배를 담당하는 전원 제어 보드. 안정적인 전압·전류 공급과 보호 회로 설계를 통해 메인 PCB와 부하단을 분리·보호합니다.',
      specs: [
        { k: '전력 변환', v: 'AC/DC · DC/DC 변환 설계' },
        { k: '보호 기능', v: '과전압 · 과전류 · 단락 · 과열 보호' },
        { k: '설계 방식', v: '제품별 부하 사양 맞춤 설계' },
        { k: '적용 영역', v: '가전 모터 · 산업 액추에이터 · 의료 전원부' },
      ],
      chips: ['고효율 전원 설계', '보호 회로', '노이즈 대응', '발열 설계'],
      accent: 'from-amber-500/15 to-amber-700/5',
    },
  ],
  hmi: [
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
  ],
  custom: [
    {
      tag: 'PERIPHERAL · POWER SUPPLY',
      name: 'SMPS',
      lede: 'Switching Mode Power Supply. 입력 AC를 안정적인 DC로 변환·공급하는 전원 장치로, 제품 요구 전압·전류와 효율 등급에 맞춰 설계합니다.',
      specs: [
        { k: '입력', v: 'AC 100~240V (제품 사양별)' },
        { k: '출력', v: 'DC 5V · 12V · 24V 등 다중 출력' },
        { k: '보호 기능', v: '과전압 · 과전류 · 단락 · 과열' },
        { k: '설계 방식', v: '표준품 + 요구사양 맞춤 설계' },
      ],
      chips: ['고효율 설계', '다중 출력', 'EMC 대응', '소형 폼팩터'],
      accent: 'from-emerald-500/15 to-emerald-700/5',
    },
    {
      tag: 'PERIPHERAL · WIRELESS',
      name: '무선모듈',
      lede: 'Wi-Fi · Bluetooth · 저전력 무선 통신 모듈. 컨트롤 보드에 통합하거나 별도 모듈로 공급하여 IoT·원격 제어·모니터링 기능을 구현합니다.',
      specs: [
        { k: '통신 규격', v: 'Wi-Fi · BLE · Zigbee 등 (사양별)' },
        { k: '연동', v: '메인 PCB · 클라우드 · 모바일 앱' },
        { k: '활용', v: '원격 제어 · 상태 모니터링 · 펌웨어 OTA' },
        { k: '설계 방식', v: '모듈 단품 + 메인 보드 통합 옵션' },
      ],
      chips: ['IoT 연동', '원격 제어', 'OTA 업데이트', '저전력 설계'],
      accent: 'from-purple-500/15 to-purple-700/5',
    },
  ],
};

const TABS: { id: TabId; label: string; count: number }[] = [
  { id: 'embedded', label: '임베디드', count: 2 },
  { id: 'hmi', label: 'HMI', count: 1 },
  { id: 'custom', label: '주변기기', count: 2 },
];

export default function ProductsPage() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<TabId>('embedded');

  const products = [
    {
      id: 'display',
      title: t('productsPage.p0n'),
      desc: t('productsPage.p0d'),
      img: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=800&q=80',
      link: '/display',
    },
    {
      id: 'medical',
      title: t('productsPage.p1n'),
      desc: t('productsPage.p1d'),
      img: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80',
      link: '/main-controller',
    },
    {
      id: 'solar',
      title: t('productsPage.p2n'),
      desc: t('productsPage.p2d'),
      img: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80',
      link: '/others',
    },
    {
      id: 'module',
      title: t('productsPage.p3n'),
      desc: t('productsPage.p3d'),
      img: 'https://images.unsplash.com/photo-1526406915894-7bcd65f60845?auto=format&fit=crop&w=800&q=80',
      link: '/display',
    },
    {
      id: 'temp',
      title: t('productsPage.p4n'),
      desc: t('productsPage.p4d'),
      img: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=800&q=80',
      link: '/others',
    },
    {
      id: 'iot',
      title: t('productsPage.p5n'),
      desc: t('productsPage.p5d'),
      img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
      link: '/main-controller',
    },
  ];

  return (
    <div className="bg-black min-h-screen text-white selection:bg-white/30 selection:text-white">
      <Navbar />

      <main className="pt-32 pb-20">
        <section className="relative flex flex-col items-center justify-center text-center px-6 mb-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block mb-6 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-sm font-medium text-gray-300"
          >
            {t('productsPage.badge')}
          </motion.div>
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {t('productsPage.t1')}<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-600">
              {t('productsPage.t2')}
            </span>
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto font-light tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {t('productsPage.d1')}<br className="hidden md:block" />
            {t('productsPage.d2')}
          </motion.p>
        </section>

        <section className="max-w-7xl mx-auto px-6 mb-32">
          <ProductNav />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, i) => (
              <motion.a
                href={product.link}
                key={product.id}
                className="group relative rounded-[2rem] overflow-hidden bg-[#0a0a0a] border border-white/5 block flex flex-col h-[450px]"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="p-10 z-10 relative">
                  <h3 className="text-3xl font-bold mb-3 tracking-tight group-hover:text-white transition-colors">{product.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed font-light max-w-[80%]">{product.desc}</p>
                </div>
                <div className="absolute inset-0 top-1/3 mt-4 overflow-hidden rounded-b-[2rem]">
                  <img
                    src={product.img}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-60 group-hover:opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                </div>
                <div className="absolute bottom-8 right-8 z-20 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </div>
              </motion.a>
            ))}
          </div>
        </section>

        {/* ===== 임베디드 / HMI / 주변기기 탭 섹션 ===== */}
        <section className="max-w-7xl mx-auto px-6 pb-12">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-xs tracking-widest text-gray-400 uppercase mb-6">
              Core Modules
            </span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
              모듈로 살펴보는
              <br />
              <span className="bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
                태승전자 라인업.
              </span>
            </h2>
            <p className="text-gray-400 font-light max-w-2xl mx-auto">
              표준 라인업 외에도 고객 요구사양에 맞춘 ODM 개발을 진행합니다.
            </p>
          </motion.div>

          {/* Tabs */}
          <div className="sticky top-20 z-20 bg-black/80 backdrop-blur-md border-b border-white/5 -mx-6 px-6 mb-10">
            <div className="max-w-7xl mx-auto flex gap-1 overflow-x-auto">
              {TABS.map((tab) => {
                const active = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative px-5 md:px-7 py-4 text-sm md:text-base font-semibold whitespace-nowrap transition-colors ${
                      active ? 'text-white' : 'text-gray-500 hover:text-gray-300'
                    }`}
                  >
                    {tab.label}
                    <span className={`ml-1.5 text-[11px] font-medium ${active ? 'text-gray-400' : 'text-gray-600'}`}>
                      {tab.count}
                    </span>
                    {active && (
                      <motion.span
                        layoutId="catalogTabUnderline"
                        className="absolute left-3 right-3 bottom-0 h-[2px] bg-white rounded-full"
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Cards */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {CATALOG[activeTab].map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="relative rounded-[2rem] bg-[#0a0a0a] border border-white/5 overflow-hidden group hover:border-white/10 transition-colors duration-500"
                >
                  <div className={`absolute -top-32 -right-32 w-72 h-72 rounded-full bg-gradient-to-br ${item.accent} blur-3xl pointer-events-none`} />

                  <div className="relative z-10 p-8 md:p-10">
                    <div className="text-[11px] font-semibold tracking-[0.12em] uppercase text-gray-500 mb-3">{item.tag}</div>
                    <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">{item.name}</h3>
                    <p className="text-sm md:text-base text-gray-400 font-light leading-relaxed mb-7">{item.lede}</p>

                    <ul className="divide-y divide-white/5 border-t border-white/5 mb-6">
                      {item.specs.map((s, si) => (
                        <li key={si} className="flex items-start justify-between gap-4 py-3 text-sm">
                          <span className="text-gray-500 shrink-0">{s.k}</span>
                          <span className="text-gray-200 text-right font-medium">{s.v}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2">
                      {item.chips.map((c, ci) => (
                        <span key={ci} className="text-xs px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-gray-300">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </section>
      </main>

      <Footer />
    </div>
  );
}
