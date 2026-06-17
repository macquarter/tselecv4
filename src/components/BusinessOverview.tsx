import { motion } from 'motion/react';
import { useImage } from '../contexts/SiteContentContext';

const PRE = 'https://firebasestorage.googleapis.com/v0/b/gen-lang-client-0276589179.firebasestorage.app/o/cms%2F';

export default function BusinessOverview() {
  const imgHome = useImage('biz.home.f0.img', PRE + 'biz.home.f0.img.jpg?alt=media&token=c7d508dd-a5ef-4b7e-89f0-756cd022a1c5');
  const imgInd = useImage('biz.ind.f0.img', PRE + 'biz.ind.f0.img.jpg?alt=media&token=3c13f1f9-5052-4a70-9987-3cdb8a9989f7');
  const imgMed = useImage('biz.med.f0.img', PRE + 'biz.med.f0.img.jpg?alt=media&token=e62cb91c-b3d9-4190-95e4-993068bd036d');
  const imgRen = useImage('biz.ren.f0.img', PRE + 'biz.ren.f0.img.jpg?alt=media&token=9d13e9cd-e44a-478f-b6d1-d5dbfc3ee0a9');
  const imgIot = useImage('biz.ind.f5.img', PRE + 'biz.ind.f5.img.jpg?alt=media&token=191536fe-765e-4968-96da-b9a5fee02284');

  const areas = [
    { tt: '가전', dd: '냉장고·정수기·레인지후드·공기청정기 제어보드.', link: '/business/home-appliance', img: imgHome },
    { tt: '산업용', dd: '식기세척기·펌프·온도제어 등 산업 장비 제어.', link: '/business/industrial', img: imgInd },
    { tt: '의료기기', dd: '원심분리기·진단기·스케일러 제어보드.', link: '/business/medical', img: imgMed },
    { tt: '신재생에너지', dd: '연료전지·수소드론·태양광 제어 솔루션.', link: '/business/renewable', img: imgRen },
    { tt: '스마트 IoT', dd: '센서·통신·디스플레이 통합 IoT 제어.', link: '/business/smart-iot', img: imgIot },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 mb-24">
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-white">사업영역 전체보기</h2>
        <p className="text-gray-400 font-light mt-3">5대 핵심 산업의 제어 솔루션을 살펴보세요.</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {areas.map((c, i) => (
          <motion.a
            key={c.link}
            href={c.link}
            whileHover={{ y: -3 }}
            className="ts-card group relative rounded-[1.6rem] overflow-hidden border border-white/5 aspect-[3/4] block"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.55, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
          >
            <img src={c.img} alt={c.tt} className="absolute inset-0 w-full h-full object-cover opacity-45 transition-transform duration-1000 group-hover:scale-105 group-hover:opacity-65" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
            <div className="relative z-10 flex flex-col justify-end h-full p-5">
              <h3 className="text-base md:text-lg font-bold tracking-tight text-white ts-card-title">{c.tt}</h3>
              <p className="hidden md:block text-xs text-gray-300 font-light mt-1.5 leading-relaxed">{c.dd}</p>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
