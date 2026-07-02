import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';

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
  to: number;
  unit: string;
  prefix?: string;
  label: string;
  sub: string;
  format?: (n: number) => string;
}

export default function KpiStats() {
  const { t } = useTranslation();
  const { ref, inView } = useInViewOnce<HTMLDivElement>(0.25);

  const items: Kpi[] = [
    {
      to: 100,
      unit: 'PPM',
      prefix: '≤ ',
      label: t('kpiStats.defect', { defaultValue: '불량률' }),
      sub: t('kpiStats.defectSub', { defaultValue: '이하 (100% 검사)' }),
    },
    {
      to: 99,
      unit: '%',
      label: t('kpiStats.delivery', { defaultValue: '납기 준수율' }),
      sub: t('kpiStats.deliverySub', { defaultValue: '36년 누적' }),
    },
    {
      to: 100,
      unit: '%',
      label: t('kpiStats.coverage', { defaultValue: '검사 커버리지' }),
      sub: t('kpiStats.coverageSub', { defaultValue: '3-Stage QC' }),
    },
    {
      to: 30,
      unit: '',
      prefix: '',
      label: t('kpiStats.capacity', { defaultValue: '월 생산능력' }),
      sub: t('kpiStats.capacitySub', { defaultValue: 'SMT 3라인 풀가동' }),
      format: (n) => `${n.toFixed(0)}${t('kpiStats.man', { defaultValue: '만' })}+`,
    },
  ];

  return (
    <section ref={ref} className="relative bg-black py-28 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs tracking-[0.25em] text-gray-500 uppercase mb-6">
            {t('kpiStats.badge', { defaultValue: 'Quality Performance' })}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight text-white break-keep">
            {t('kpiStats.t1', { defaultValue: '숫자로 증명하는' })}
            <br />
            {t('kpiStats.t2', { defaultValue: '핵심 품질 성과.' })}
          </h2>
          <p className="text-gray-400 font-light max-w-2xl mx-auto text-base md:text-lg">
            {t('kpiStats.sub', {
              defaultValue: '36년간 한결같은 품질 표준이 만들어낸 성과 — 단순한 숫자가 아닌 신뢰의 기록입니다.',
            })}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 border-t border-white/10">
          {items.map((it, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="border-b border-white/10 px-2 py-10 md:px-8 md:py-14 lg:border-l lg:[&:first-child]:border-l-0"
            >
              <div className="text-[11px] uppercase tracking-[0.22em] text-gray-500 mb-7">
                {String(i + 1).padStart(2, '0')}
              </div>

              <div className="flex items-baseline gap-1 font-bold tracking-tighter text-white">
                {it.prefix && <span className="text-xl md:text-2xl text-gray-500">{it.prefix}</span>}
                <span className="text-5xl md:text-6xl tabular-nums">
                  <CountUp to={it.to} start={inView} format={it.format} duration={1600 + i * 150} />
                </span>
                {it.unit && (
                  <span className="text-xl md:text-2xl text-gray-400 ml-1">{it.unit}</span>
                )}
              </div>

              <div className="mt-6 h-px w-8 bg-white/25" />

              <div className="mt-6 text-sm md:text-base font-semibold tracking-tight text-white">{it.label}</div>
              <div className="mt-1 text-xs md:text-sm text-gray-500 font-light">{it.sub}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
