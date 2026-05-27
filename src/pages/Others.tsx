import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductNav from '../components/ProductNav';
import ModuleCatalog, { CatalogCard } from '../components/ModuleCatalog';

const PERIPHERAL_CARDS: CatalogCard[] = [
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
];

export default function Others() {
  const { t } = useTranslation();

  const specs = Array.from({ length: 6 }, (_, i) => ({
    label: t(`othersPage.s${i}l`),
    value: t(`othersPage.s${i}v`),
  }));

  const apps = Array.from({ length: 4 }, (_, i) => ({
    num: String(i + 1),
    title: t(`othersPage.a${i}t`),
    desc: t(`othersPage.a${i}d`),
  }));

  return (
    <div className="bg-black min-h-screen text-white selection:bg-white/30 selection:text-white">
      <Navbar />

      <main className="pt-32 pb-20">
        {/* Hero Section */}
        <section className="relative flex flex-col items-center justify-center text-center px-6 mb-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block mb-6 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-sm font-medium text-gray-300"
          >
            {t('othersPage.badge')}
          </motion.div>
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {t('othersPage.t1')}<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-600">
              {t('othersPage.t2')}
            </span>
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto font-light tracking-tight whitespace-pre-line"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {t('othersPage.sub')}
          </motion.p>
        </section>

        {/* Content Section */}
        <section className="max-w-7xl mx-auto px-6 mb-32">
          <ProductNav />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-32">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-[2rem] bg-[#0a0a0a] border border-white/5 p-8 flex items-center justify-center aspect-square overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.05] to-transparent rounded-[2rem]" />
              <img
                src="https://images.unsplash.com/photo-1581092335397-9583eb92d232?auto=format&fit=crop&w=800&q=80"
                alt="Electro Steel Controller"
                className="w-full h-full object-cover rounded-[1.5rem] relative z-10 transition-transform duration-1000 group-hover:scale-105 opacity-80"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">{t('othersPage.h2')}</h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-12 font-light">
                {t('othersPage.desc')}
              </p>

              <div className="bg-[#0a0a0a] border border-white/5 rounded-[1.5rem] overflow-hidden">
                <div className="divide-y divide-white/5">
                  {specs.map((spec, i) => (
                    <div key={i} className="flex justify-between p-5 hover:bg-white/5 transition-colors">
                      <strong className="text-white font-medium tracking-tight">{spec.label}</strong>
                      <span className="text-gray-400 font-light">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Applications Grid */}
          <motion.div
            className="bg-[#0a0a0a] border border-white/5 rounded-[2rem] p-10 md:p-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">{t('othersPage.appsTitle')}</h2>
              <p className="text-gray-400 font-light">{t('othersPage.appsSub')}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {apps.map((app, i) => (
                <motion.div
                  key={i}
                  className="bg-[#111] border border-white/10 rounded-2xl p-8 hover:border-red-500/50 transition-colors duration-500"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center text-white font-bold text-xl mb-6 font-orbitron">
                    {app.num}
                  </div>
                  <h3 className="text-xl font-bold mb-4">{app.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{app.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        <ModuleCatalog
          badge="Peripheral Modules"
          title1="주변기기 라인업"
          title2="상세 사양."
          sub="SMPS 전원 장치와 무선 통신 모듈을 표준품/맞춤 설계로 공급합니다."
          cards={PERIPHERAL_CARDS}
        />
      </main>

      <Footer />
    </div>
  );
}
