import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Target, Truck, ShieldCheck, Factory } from 'lucide-react';

/**
 * Hook: IntersectionObserver 기반 inView 트리거 (한 번만 발동)
 */
function useInViewOnce<T extends HTMLElement>(threshold = 0.3) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current || inView) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setInView(true);
            obs.disconnect();
            break;
          }
        }
      },
      { threshold, rootMargin: '0px 0px -10% 0px' }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold, inView]);
  return { ref, inView };
}

/**
 * 부드러운 이징 — easeOutCubic
 */
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

interface CountUpProps {
  to: number;
  duration?: number;
  decimals?: number;
  start: boolean;
  format?: (n: number) => string;
}

/** 부동소수점 카운트업 */
function CountUp({ to, duration = 1800, decimals = 0, start, format }: CountUpProps) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / duration);
      const v = to * easeOut(p);
      setVal(v);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, duration, start]);
  const display = format ? format(val) : val.toFixed(decimals);
  return <span>{display}</span>;
}

interface Kpi {
  Icon: typeof Target;
  to: number;
  unit: string;
  prefix?: string;
  label: string;
  sub: string;
  accent: string;
  format?: (n: number) => string;
}

export default function KpiStats() {
  const { t } = useTranslation();
  const { ref, inView } = useInViewOnce<HTMLDivElement>(0.25);

  const items: Kpi[] = [
    {
      Icon: Target,
      to: 100,
      unit: 'PPM',
      prefix: '≤ ',
      label: t('kpiStats.defect', { defaultValue: '불량률' }),
      sub: t('kpiStats.defectSub', { defaultValue: '이하 (100% 검사)' }),
      accent: 'from-rose-500/40 to-rose-700/10',
    },
    {
      Icon: Truck,
      to: 99,
      unit: '%',
      label: t('kpiStats.delivery', { defaultValue: '납기 준수율' }),
      sub: t('kpiStats.deliverySub', { defaultValue: '36년 누적' }),
      accent: 'from-sky-400/40 to-sky-600/10',
    },
    {
      Icon: ShieldCheck,
      to: 100,
      unit: '%',
      label: t('kpiStats.coverage', { defaultValue: '검사 커버리지' }),
      sub: t('kpiStats.coverageSub', { defaultValue: '3-Stage QC' }),
      accent: 'from-emerald-400/40 to-emerald-600/10',
    },
    {
      Icon: Factory,
      to: 30,
      unit: '',
      prefix: '',
      label: t('kpiStats.capacity', { defaultValue: '월 생산능력' }),
      sub: t('kpiStats.capacitySub', { defaultValue: 'SMT 3라인 풀가동' }),
      accent: 'from-amber-400/40 to-amber-600/10',
      format: (n) => `${n.toFixed(0)}${t('kpiStats.man', { defaultValue: '만' })}+`,
    },
  ];

  return (
    <section ref={ref} className="relative bg-black py-28 px-6 overflow-hidden">
      {/* Background subtle grid */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
           style={{
             backgroundImage: 'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
             backgroundSize: '64px 64px',
           }} />

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-xs tracking-widest text-gray-400 uppercase mb-6">
            {t('kpiStats.badge', { defaultValue: 'Quality Performance' })}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">
            {t('kpiStats.t1', { defaultValue: '숫자로 증명하는' })}
            <br />
            <span className="bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
              {t('kpiStats.t2', { defaultValue: '핵심 품질 성과.' })}
            </span>
          </h2>
          <p className="text-gray-400 font-light max-w-2xl mx-auto text-base md:text-lg">
            {t('kpiStats.sub', {
              defaultValue: '36년간 한결같은 품질 표준이 만들어낸 성과 — 단순한 숫자가 아닌 신뢰의 기록입니다.',
            })}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {items.map((it, i) => {
            const Icon = it.Icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative rounded-[2rem] bg-[#0a0a0a] border border-white/5 p-6 md:p-8 overflow-hidden group hover:border-white/10 transition-colors duration-500"
              >
                <div className={`absolute -top-20 -right-20 w-48 h-48 rounded-full bg-gradient-to-br ${it.accent} blur-3xl opacity-60 group-hover:opacity-100 transition-opacity duration-700`} />

                <div className="relative z-10">
                  <div className="w-11 h-11 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mb-6">
                    <Icon size={20} className="text-white/80" strokeWidth={1.5} />
                  </div>

                  <div className="flex items-baseline gap-1 mb-2 font-bold tracking-tighter">
                    {it.prefix && <span className="text-xl md:text-2xl text-gray-500">{it.prefix}</span>}
                    <span className="text-4xl md:text-5xl tabular-nums">
                      <CountUp to={it.to} start={inView} format={it.format} duration={1600 + i * 150} />
                    </span>
                    {it.unit && (
                      <span className="text-xl md:text-2xl text-gray-400 ml-1">{it.unit}</span>
                    )}
                  </div>

                  <div className="text-sm md:text-base font-semibold mb-1 tracking-tight">{it.label}</div>
                  <div className="text-xs md:text-sm text-gray-500 font-light">{it.sub}</div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
