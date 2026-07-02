import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import {
  Shield,
  Cpu,
  Layers,
  CheckCircle2,
  Zap,
  Eye,
  Package,
  Truck,
  Wrench,
  CircuitBoard,
  Microchip,
  Factory,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductNav from '../components/ProductNav';

interface ProcessStep {
  num: string;
  title: string;
  eng: string;
  desc: string;
  detail: string;
  equipment: string[];
  qcTag?: string;
  icon: React.ReactNode;
}

export default function Process() {
  const { t } = useTranslation();
  const [hoveredStep, setHoveredStep] = useState<string | null>(null);
  const [selectedStep, setSelectedStep] = useState<ProcessStep | null>(null);
  const [autoIndex, setAutoIndex] = useState(0);

  // 구조(번호/아이콘/QC뱃지)는 코드에 고정, 텍스트는 i18n(process.steps.*)에서 → CMS 인라인 편집 가능
  const STEP_META: { num: string; qcTag?: string; icon: React.ReactNode }[] = [
    { num: '01', icon: <CircuitBoard size={20} /> },
    { num: '02', qcTag: 'QC ①', icon: <Eye size={20} /> },
    { num: '03', icon: <Microchip size={20} /> },
    { num: '04', icon: <Factory size={20} /> },
    { num: '05', icon: <Wrench size={20} /> },
    { num: '06', icon: <Cpu size={20} /> },
    { num: '07', qcTag: 'QC ②', icon: <Zap size={20} /> },
    { num: '08', qcTag: 'QC ③', icon: <CheckCircle2 size={20} /> },
    { num: '09', icon: <Package size={20} /> },
    { num: '10', icon: <Truck size={20} /> },
  ];
  const steps: ProcessStep[] = STEP_META.map((m, i) => ({
    num: m.num,
    qcTag: m.qcTag,
    icon: m.icon,
    title: t(`process.steps.${i}.title`),
    eng: t(`process.steps.${i}.eng`),
    desc: t(`process.steps.${i}.desc`),
    detail: t(`process.steps.${i}.detail`),
    equipment: t(`process.steps.${i}.equipment`, { returnObjects: true }) as unknown as string[],
  }));

  // 10단계 경로 자동 순회 애니메이션 (1.2초 간격, hover 시 멈춤)
  useEffect(() => {
    if (hoveredStep !== null) return;
    const id = window.setInterval(() => {
      setAutoIndex((i) => (i + 1) % steps.length);
    }, 1200);
    return () => window.clearInterval(id);
  }, [hoveredStep, steps.length]);

  const activeStepNum = hoveredStep ?? steps[autoIndex].num;

  return (
    <div className="bg-black min-h-screen text-white selection:bg-white/30 selection:text-white">
      <Navbar />

      <main className="pt-32 pb-20">
        {/* Hero Section */}
        <section className="relative flex flex-col items-center justify-center text-center px-6 mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block mb-6 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-xs tracking-widest uppercase text-gray-400"
          >
            {t('process.badge')}
          </motion.div>
          <motion.h1
            className="text-4xl md:text-7xl font-bold mb-8 tracking-tighter break-keep"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {t('process.t1')}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-600">
              {t('process.t2')}
            </span>
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto font-light tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {t('process.desc1')}
            <br className="hidden md:block" />
            {t('process.desc2')}
          </motion.p>
        </section>

        {/* 중간 네비게이션 */}
        <ProductNav />

        {/* Process Flow — Interactive Cards with Auto Traveling Glow */}
        <section className="max-w-7xl mx-auto px-6 mt-20 mb-16">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-2">{t('process.stagesTitle')}</h2>
            <p className="text-gray-500 font-light tracking-tight">{t('process.stagesHint')}</p>
          </motion.div>

          {/* Row 1: Steps 01-05 */}
          <div className="flex flex-col gap-4 mb-4">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
              {steps.slice(0, 5).map((step, i) => {
                const isActive = activeStepNum === step.num;
                return (
                  <motion.div
                    key={step.num}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                    className="relative group"
                    onMouseEnter={() => { setHoveredStep(step.num); setSelectedStep(step); }}
                    onMouseLeave={() => setHoveredStep(null)}
                  >
                    <motion.div
                      animate={isActive ? { scale: 1.02, y: -4 } : { scale: 1, y: 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className={`relative rounded-2xl bg-[#0a0a0a] border p-5 cursor-pointer overflow-hidden transition-colors duration-500 ${
                        isActive ? 'border-white/25 bg-[#111]' : 'border-white/5 hover:border-white/10'
                      }`}
                    >
                      {/* Active glow overlay */}
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4 }}
                            className="absolute inset-0 bg-gradient-to-b from-white/[0.06] to-transparent pointer-events-none"
                          />
                        )}
                      </AnimatePresence>

                      {/* Ambient pulse ring on active */}
                      {isActive && (
                        <motion.div
                          className="absolute inset-0 rounded-2xl border border-white/20 pointer-events-none"
                          animate={{ opacity: [0.6, 0.15, 0.6] }}
                          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                        />
                      )}

                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-[10px] font-mono text-gray-500 tracking-widest">STEP {step.num}</span>
                          {step.qcTag && (
                            <span className="px-2 py-0.5 rounded-full bg-white/[0.08] border border-white/10 text-[9px] font-medium text-gray-300 tracking-wide">{step.qcTag}</span>
                          )}
                        </div>

                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-all duration-500 ${
                          isActive ? 'bg-white/[0.12] text-white' : 'bg-white/[0.04] text-gray-500'
                        }`}>
                          {step.icon}
                        </div>

                        <h3 className="text-sm font-bold tracking-tight mb-1 leading-snug">{step.title}</h3>
                        <p className="text-[11px] text-gray-500 leading-relaxed">{step.desc}</p>
                      </div>
                    </motion.div>

                    {/* Traveling connector arrow */}
                    {i < 4 && (
                      <div className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-[calc(50%+6px)] z-20">
                        <motion.div
                          animate={isActive ? { x: [0, 4, 0], opacity: [0.6, 1, 0.6] } : { opacity: 0.3 }}
                          transition={isActive ? { duration: 1.2, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.3 }}
                          className={isActive ? 'text-white' : 'text-gray-600'}
                        >
                          <svg width="14" height="14" viewBox="0 0 12 12" fill="none"><path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </motion.div>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Turn arrow */}
            <div className="hidden md:flex justify-end pr-[10%]">
              <motion.div
                animate={{ y: [0, 4, 0], opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                className="text-gray-500"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </motion.div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
              {[...steps.slice(5, 10)].reverse().map((step, i) => {
                const isActive = activeStepNum === step.num;
                return (
                  <motion.div
                    key={step.num}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                    className="relative group"
                    onMouseEnter={() => { setHoveredStep(step.num); setSelectedStep(step); }}
                    onMouseLeave={() => setHoveredStep(null)}
                  >
                    <motion.div
                      animate={isActive ? { scale: 1.02, y: -4 } : { scale: 1, y: 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className={`relative rounded-2xl bg-[#0a0a0a] border p-5 cursor-pointer overflow-hidden transition-colors duration-500 ${
                        isActive ? 'border-white/25 bg-[#111]' : 'border-white/5 hover:border-white/10'
                      }`}
                    >
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4 }}
                            className="absolute inset-0 bg-gradient-to-b from-white/[0.06] to-transparent pointer-events-none"
                          />
                        )}
                      </AnimatePresence>

                      {isActive && (
                        <motion.div
                          className="absolute inset-0 rounded-2xl border border-white/20 pointer-events-none"
                          animate={{ opacity: [0.6, 0.15, 0.6] }}
                          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                        />
                      )}

                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-[10px] font-mono text-gray-500 tracking-widest">STEP {step.num}</span>
                          {step.qcTag && (
                            <span className="px-2 py-0.5 rounded-full bg-white/[0.08] border border-white/10 text-[9px] font-medium text-gray-300 tracking-wide">{step.qcTag}</span>
                          )}
                        </div>

                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-all duration-500 ${
                          isActive ? 'bg-white/[0.12] text-white' : 'bg-white/[0.04] text-gray-500'
                        }`}>
                          {step.icon}
                        </div>

                        <h3 className="text-sm font-bold tracking-tight mb-1 leading-snug">{step.title}</h3>
                        <p className="text-[11px] text-gray-500 leading-relaxed">{step.desc}</p>
                      </div>
                    </motion.div>

                    {i < 4 && (
                      <div className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-[calc(50%+6px)] z-20">
                        <motion.div
                          animate={isActive ? { x: [0, -4, 0], opacity: [0.6, 1, 0.6] } : { opacity: 0.3 }}
                          transition={isActive ? { duration: 1.2, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.3 }}
                          className={isActive ? 'text-white' : 'text-gray-600'}
                        >
                          <svg width="14" height="14" viewBox="0 0 12 12" fill="none"><path d="M10 6H2M5 3L2 6l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </motion.div>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Inline Detail Panel */}
          <AnimatePresence mode="wait">
            {selectedStep && (
              <motion.div
                key={selectedStep.num}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="mt-8 rounded-[2rem] bg-[#0a0a0a] border border-white/10 p-8 md:p-10"
              >
                <div className="flex items-center gap-3 mb-5">
                  <span className="px-3 py-1 rounded-full bg-white/[0.06] border border-white/10 text-xs text-gray-400 font-mono tracking-widest">
                    STEP {selectedStep.num}
                  </span>
                  {selectedStep.qcTag && (
                    <span className="px-2.5 py-1 rounded-full bg-white/[0.08] border border-white/10 text-[10px] font-medium text-gray-300 tracking-wide">
                      {selectedStep.qcTag}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-gray-400">
                    {selectedStep.icon}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold tracking-tighter">{selectedStep.title}</h2>
                    <p className="text-sm text-gray-500 tracking-tight">{selectedStep.eng}</p>
                  </div>
                </div>
                <p className="text-gray-400 text-sm font-light leading-relaxed mt-5 mb-8">
                  {selectedStep.detail}
                </p>
                <div>
                  <h4 className="text-xs tracking-widest text-gray-500 uppercase mb-3">{t('footer.equipmentLabel')}</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {selectedStep.equipment.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06]"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0" />
                        <span className="text-sm text-gray-300">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* QC + Capabilities + Categories */}
        <section className="max-w-7xl mx-auto px-6 mt-8 mb-32">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center">
                <Shield size={20} strokeWidth={1.5} className="text-gray-400" />
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-bold tracking-tighter">{t('process.qcTitle')}</h3>
                <p className="text-sm text-gray-500 tracking-tight">{t('process.qcSubtitle')}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { stage: 'QC ①', title: t('process.qc.0.title'), subtitle: t('process.qc.0.subtitle'), desc: t('process.qc.0.desc'), items: t('process.qc.0.items', { returnObjects: true }) as unknown as string[] },
                { stage: 'QC ②', title: t('process.qc.1.title'), subtitle: t('process.qc.1.subtitle'), desc: t('process.qc.1.desc'), items: t('process.qc.1.items', { returnObjects: true }) as unknown as string[] },
                { stage: 'QC ③', title: t('process.qc.2.title'), subtitle: t('process.qc.2.subtitle'), desc: t('process.qc.2.desc'), items: t('process.qc.2.items', { returnObjects: true }) as unknown as string[] },
              ].map((qc, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  className="rounded-[2rem] bg-[#0a0a0a] border border-white/5 p-7 group hover:border-white/10 transition-all duration-500"
                >
                  <span className="inline-block px-2.5 py-1 rounded-full bg-white/[0.08] border border-white/10 text-[10px] font-medium text-gray-300 tracking-wide mb-4">
                    {qc.stage}
                  </span>
                  <h4 className="text-lg font-bold tracking-tight mb-1">{qc.title}</h4>
                  <p className="text-[11px] text-gray-500 mb-4 tracking-tight">{qc.subtitle}</p>
                  <p className="text-sm text-gray-400 font-light leading-relaxed mb-5">{qc.desc}</p>
                  <div className="space-y-2">
                    {qc.items.map((item, j) => (
                      <div key={j} className="flex items-center gap-2.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0" />
                        <span className="text-xs text-gray-400">{item}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* 핵심 역량 + 대응 카테고리 — 우상단 그라디언트 데코 제거 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-[2rem] bg-[#0a0a0a] border border-white/5 p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center">
                  <Cpu size={20} strokeWidth={1.5} className="text-gray-400" />
                </div>
                <h3 className="text-xl font-bold tracking-tight">{t('process.capTitle')}</h3>
              </div>
              <div className="space-y-3">
                {[
                  { label: t('process.cap.0.label'), desc: t('process.cap.0.desc') },
                  { label: t('process.cap.1.label'), desc: t('process.cap.1.desc') },
                  { label: t('process.cap.2.label'), desc: t('process.cap.2.desc') },
                  { label: t('process.cap.3.label'), desc: t('process.cap.3.desc') },
                  { label: t('process.cap.4.label'), desc: t('process.cap.4.desc') },
                ].map((cap, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                    className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] hover:border-white/[0.08] transition-all duration-300"
                  >
                    <div className="w-2 h-2 rounded-full bg-gray-400 mt-1.5 shrink-0" />
                    <div>
                      <span className="text-sm font-semibold text-white">{cap.label}</span>
                      <p className="text-xs text-gray-500 mt-0.5">{cap.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-[2rem] bg-[#0a0a0a] border border-white/5 p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center">
                  <Layers size={20} strokeWidth={1.5} className="text-gray-400" />
                </div>
                <h3 className="text-xl font-bold tracking-tight">{t('process.catTitle')}</h3>
              </div>
              <div className="space-y-4">
                {[
                  { title: t('process.cat.0.title'), desc: t('process.cat.0.desc'), tags: t('process.cat.0.tags', { returnObjects: true }) as unknown as string[] },
                  { title: t('process.cat.1.title'), desc: t('process.cat.1.desc'), tags: t('process.cat.1.tags', { returnObjects: true }) as unknown as string[] },
                  { title: t('process.cat.2.title'), desc: t('process.cat.2.desc'), tags: t('process.cat.2.tags', { returnObjects: true }) as unknown as string[] },
                ].map((cat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                    className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] hover:border-white/[0.08] transition-all duration-300"
                  >
                    <h4 className="text-sm font-bold mb-1">{cat.title}</h4>
                    <p className="text-xs text-gray-500 mb-3">{cat.desc}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.tags.map((tag, j) => (
                        <span key={j} className="px-2 py-0.5 rounded-md bg-white/[0.06] border border-white/10 text-[10px] text-gray-400 font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer pageBadge="Manufacturing Process · v6.0 · ISO 9001 인증 라인" />
    </div>
  );
}
