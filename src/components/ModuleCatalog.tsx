import { motion } from 'motion/react';

export interface CatalogCard {
  tag: string;
  name: string;
  lede: string;
  specs: { k: string; v: string }[];
  chips: string[];
  accent: string;
}

interface Props {
  badge: string;
  title1: string;
  title2: string;
  sub: string;
  cards: CatalogCard[];
}

/**
 * 임베디드 / HMI / 주변기기 페이지 하단에 재사용하는 모듈 상세 카드 섹션.
 * 다크 톤 + glass + accent glow + spec list + chip 디자인.
 */
export default function ModuleCatalog({ badge, title1, title2, sub, cards }: Props) {
  return (
    <section className="max-w-7xl mx-auto px-6 pb-24">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="inline-block px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-xs tracking-widest text-gray-400 uppercase mb-6">
          {badge}
        </span>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
          {title1}
          <br />
          <span className="bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
            {title2}
          </span>
        </h2>
        <p className="text-gray-400 font-light max-w-2xl mx-auto">{sub}</p>
      </motion.div>

      <div className={`grid gap-6 ${cards.length === 1 ? 'md:grid-cols-1 max-w-2xl mx-auto' : 'md:grid-cols-2'}`}>
        {cards.map((card, i) => (
          <motion.div
            key={card.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-[2rem] bg-[#0a0a0a] border border-white/5 overflow-hidden group hover:border-white/10 transition-colors duration-500"
          >
            <div className={`absolute -top-32 -right-32 w-72 h-72 rounded-full bg-gradient-to-br ${card.accent} blur-3xl pointer-events-none`} />

            <div className="relative z-10 p-8 md:p-10">
              <div className="text-[11px] font-semibold tracking-[0.12em] uppercase text-gray-500 mb-3">{card.tag}</div>
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">{card.name}</h3>
              <p className="text-sm md:text-base text-gray-400 font-light leading-relaxed mb-7">{card.lede}</p>

              <ul className="divide-y divide-white/5 border-t border-white/5 mb-6">
                {card.specs.map((s, si) => (
                  <li key={si} className="flex items-start justify-between gap-4 py-3 text-sm">
                    <span className="text-gray-500 shrink-0">{s.k}</span>
                    <span className="text-gray-200 text-right font-medium">{s.v}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {card.chips.map((c, ci) => (
                  <span key={ci} className="text-xs px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-gray-300">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
