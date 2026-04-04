import { motion } from 'motion/react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductNav from '../components/ProductNav';

export default function Display() {
  const specs = [
    {
      title: 'LCD 7-Segment Display',
      desc: '온도 표시, 디지털 계기판 제어',
      img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
      fallback: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'LCD 16x2 Character',
      desc: '텍스트 표시 모듈',
      img: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=800&q=80',
      fallback: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'LCD 128x64 Graphic',
      desc: '그래픽 디스플레이',
      img: 'https://images.unsplash.com/photo-1526406915894-7bcd65f60845?auto=format&fit=crop&w=800&q=80',
      fallback: 'https://images.unsplash.com/photo-1526406915894-7bcd65f60845?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'LED Driver IC',
      desc: 'LED 조명 제어',
      img: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80',
      fallback: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'TFT LCD Controller',
      desc: '컬러 터치 디스플레이',
      img: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80',
      fallback: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'OLED Controller',
      desc: '저전력 OLED 제어',
      img: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=800&q=80',
      fallback: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=800&q=80'
    }
  ];

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
            Display Solutions
          </motion.div>
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            선명함의 기준.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-600">
              디스플레이 제어.
            </span>
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto font-light tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            다양한 LCD/LED 제어 및 고성능 디스플레이 솔루션으로<br className="hidden md:block" />
            사용자 경험을 한 차원 높입니다.
          </motion.p>
        </section>

        {/* Specs Grid */}
        <section className="max-w-7xl mx-auto px-6 mb-32">
          <ProductNav />
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 tracking-tight">제품 라인업</h2>
            <p className="text-gray-400 font-light">다양한 디스플레이 제어 솔루션을 확인하세요.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {specs.map((spec, i) => (
              <motion.div 
                key={spec.title}
                className="group relative rounded-[2rem] overflow-hidden bg-[#0a0a0a] border border-white/5 block flex flex-col h-[400px]"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="p-8 z-10 relative">
                  <h3 className="text-2xl font-bold mb-2 tracking-tight group-hover:text-white transition-colors">{spec.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed font-light">{spec.desc}</p>
                </div>
                <div className="absolute inset-0 top-1/4 mt-4 overflow-hidden rounded-b-[2rem]">
                  <img 
                    src={spec.img} 
                    alt={spec.title} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-60 group-hover:opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}