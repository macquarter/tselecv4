import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { useImage } from '../contexts/SiteContentContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductNav from '../components/ProductNav';

export default function ProductsPage() {
  const _p0 = useImage('productsPage.p0.img', 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=800&q=80');
  const _p1 = useImage('productsPage.p1.img', 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80');
  const _p2 = useImage('productsPage.p2.img', 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80');
  const _p3 = useImage('productsPage.p3.img', 'https://images.unsplash.com/photo-1526406915894-7bcd65f60845?auto=format&fit=crop&w=800&q=80');
  const _p4 = useImage('productsPage.p4.img', 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=800&q=80');
  const _p5 = useImage('productsPage.p5.img', 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80');
  const _catEmbedded = useImage('productsCat.embedded.img', 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80');
  const _catHmi = useImage('productsCat.hmi.img', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80');
  const _catCustom = useImage('productsCat.custom.img', 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1200&q=80');
  const _catProcess = useImage('productsCat.process.img', 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1600&q=80');
  const _imgMap: Record<string,string> = {'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=800&q=80': _p0, 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80': _p1, 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80': _p2, 'https://images.unsplash.com/photo-1526406915894-7bcd65f60845?auto=format&fit=crop&w=800&q=80': _p3, 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=800&q=80': _p4, 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80': _p5};
  const { t } = useTranslation();

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

        <section className="max-w-7xl mx-auto px-6 mb-16">
          <ProductNav />
        </section>

        <section className="max-w-7xl mx-auto px-6 mb-24">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-white">제품 카테고리</h2>
            <p className="text-gray-400 font-light mt-3">필요한 제품군을 선택하세요.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {[
              { tt: t('nav.embedded'), dd: '시스템의 두뇌. 고성능 임베디드 제어.', link: '/main-controller', img: _catEmbedded },
              { tt: t('nav.hmi'), dd: '터치 디스플레이 + UI 펌웨어 통합 공급.', link: '/display', img: _catHmi },
              { tt: t('nav.custom'), dd: '정밀 온도 제어 · 특수 산업 장비.', link: '/others', img: _catCustom },
            ].map((c, i) => (
              <motion.a
                key={c.link}
                href={c.link}
                whileHover={{ y: -3 }}
                className="ts-card group relative rounded-[2rem] overflow-hidden border border-white/5 aspect-[4/3] block"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                <img src={c.img} alt={c.tt} className="absolute inset-0 w-full h-full object-cover opacity-50 transition-transform duration-1000 group-hover:scale-105 group-hover:opacity-70" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                <div className="relative z-10 flex flex-col justify-end h-full p-8">
                  <div className="text-[11px] uppercase tracking-[0.2em] text-gray-400 mb-3">{String(i + 1).padStart(2, '0')}</div>
                  <h3 className="text-2xl font-bold tracking-tight text-white ts-card-title">{c.tt}</h3>
                  <p className="text-sm text-gray-300 font-light mt-2">{c.dd}</p>
                </div>
              </motion.a>
            ))}
          </div>

          <motion.a
            href="/process"
            className="ts-card group relative block rounded-[2rem] overflow-hidden border border-white/10 h-[300px] md:h-[380px]"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <img src={_catProcess} alt="제조공정" className="absolute inset-0 w-full h-full object-cover opacity-45 transition-transform duration-[1200ms] group-hover:scale-105 group-hover:opacity-60" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
            <div className="relative z-10 flex flex-col justify-center h-full max-w-2xl px-10 md:px-16">
              <div className="text-[11px] uppercase tracking-[0.25em] text-gray-400 mb-5">04 · Manufacturing Process</div>
              <h3 className="text-4xl md:text-6xl font-bold tracking-tighter text-white mb-4 ts-card-title">제조공정</h3>
              <p className="text-gray-300 font-light text-base md:text-lg leading-relaxed mb-7">설계부터 출하까지, 10단계 정밀 제조 공정으로 무결점 품질을 구현합니다.</p>
              <span className="inline-flex items-center text-sm text-white border-b border-white/40 pb-1 w-fit group-hover:border-white transition-colors">
                제조공정 자세히 보기
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
            </div>
          </motion.a>
        </section>

        <section className="max-w-7xl mx-auto px-6 mb-32">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, i) => (
              <motion.a
                href={product.link}
                key={product.id}
                whileHover={{ y: -3 }}
                className="group relative rounded-[2rem] overflow-hidden bg-[#0a0a0a] border border-white/5 block flex flex-col h-[450px] ts-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="p-10 z-10 relative">
                  <h3 className="text-3xl font-bold mb-3 tracking-tight group-hover:text-white transition-colors ts-card-title">{product.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed font-light max-w-[80%]">{product.desc}</p>
                </div>
                <div className="absolute inset-0 top-1/3 mt-4 overflow-hidden rounded-b-[2rem]">
                  <img
                    src={_imgMap[product.img] || product.img}
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
      </main>

      <Footer />
    </div>
  );
}
