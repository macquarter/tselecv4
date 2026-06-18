import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { useImage } from '../contexts/SiteContentContext';

const STOCK = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`;

export default function Expertise() {
  const { t } = useTranslation();
  const imgHome = useImage('biz.home.f0.img', STOCK('photo-1571175443880-49e1d25b2bc5'));
  const imgInd = useImage('biz.ind.f3.img', STOCK('photo-1497366216548-37526070297c'));
  const imgMed = useImage('biz.med.f0.img', STOCK('photo-1576091160550-2173dba999ef'));
  const imgRen = useImage('biz.ren.f3.img', STOCK('photo-1509391366360-2e959784a276'));

  const cards = [
    { sub: 'HOME APPLIANCE', tt: '가전', dd: '냉장고·정수기·레인지후드·공기청정기 등 생활가전의 MCU 제어보드와 터치 디스플레이를 설계·제조합니다.', img: imgHome, link: '/business/home-appliance' },
    { sub: 'INDUSTRIAL', tt: '산업', dd: '식기세척기·펌프·회의부스·온도제어기 등 산업 장비의 핵심 제어 솔루션을 공급합니다.', img: imgInd, link: '/business/industrial' },
    { sub: 'MEDICAL DEVICE', tt: '의료', dd: '원심분리기·진단기·치과 스케일러 등 고정밀 의료기기 제어보드를 설계·공급합니다.', img: imgMed, link: '/business/medical' },
    { sub: 'RENEWABLE ENERGY', tt: '신재생', dd: '태양광·수소연료전지·리튬이온 충전 등 친환경 에너지 시스템 제어 기술을 제공합니다.', img: imgRen, link: '/business/renewable' },
  ];

  return (
    <section className="bg-[#0a0a0a] border-t border-white/5 py-20 md:py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <div className="text-[11px] font-bold tracking-widest text-gray-400 uppercase mb-4">{t('home.expertiseTag')}</div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white leading-tight">가전·산업·의료·신재생</h2>
          <p className="text-lg md:text-2xl text-gray-300 font-light mt-4">4대 핵심 산업을 위한 맞춤형 솔루션</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {cards.map((c, i) => (
            <motion.a
              key={c.link}
              href={c.link}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4 }}
              className="ts-card group relative rounded-[1.8rem] overflow-hidden border border-white/10 aspect-[3/4] block"
            >
              <img
                src={c.img}
                alt={c.tt}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover opacity-85 transition-all duration-700 group-hover:opacity-100 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              <div className="relative z-10 flex flex-col justify-end h-full p-6">
                <div className="text-[11px] font-semibold tracking-widest text-gray-200 uppercase mb-2">{c.sub}</div>
                <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-2 ts-card-title">{c.tt}</h3>
                <p className="text-sm md:text-[15px] text-gray-100 leading-relaxed font-light">{c.dd}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
