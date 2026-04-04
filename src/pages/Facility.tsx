import { motion } from 'motion/react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Facility() {
  const images = [
    { src: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80', title: '생산동 외관', desc: '인천 로봇랜드 제조동' },
    { src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80', title: '관리동 / 연구동', desc: '기술만이 최고를 지킨다' },
    { src: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=800&q=80', title: 'SMT 라인', desc: '표면실장 생산라인' },
    { src: 'https://images.unsplash.com/photo-1581092335397-9583eb92d232?auto=format&fit=crop&w=800&q=80', title: 'R&D 센터', desc: '연구개발 및 설계실' },
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
            Facilities
          </motion.div>
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            미래를 만드는 공간.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-600">
              스마트 팩토리.
            </span>
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto font-light tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            인천 로봇랜드에 위치한 최첨단 제조 시설에서<br className="hidden md:block" />
            최고의 품질과 생산성을 실현합니다.
          </motion.p>
        </section>

        {/* Gallery Section */}
        <section className="max-w-7xl mx-auto px-6 mb-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {images.map((img, i) => (
              <motion.div 
                key={i}
                className="group relative rounded-[2rem] overflow-hidden aspect-[4/3] bg-[#0a0a0a] border border-white/5"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <img 
                  src={img.src} 
                  alt={img.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-10">
                  <h3 className="text-3xl font-bold mb-2 tracking-tight">{img.title}</h3>
                  <p className="text-gray-400 font-light">{img.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="max-w-7xl mx-auto px-6">
          <motion.div 
            className="bg-[#0a0a0a] border border-white/5 rounded-[2rem] p-12 md:p-20 text-center relative overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent" />
            <h2 className="text-3xl md:text-4xl font-bold mb-16 tracking-tight relative z-10">시설 규모 및 역량.</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-16 relative z-10">
              {[
                { num: '6,500', unit: 'm²', label: '총 시설 면적' },
                { num: '3', unit: '개', label: 'SMT 생산라인' },
                { num: '50', unit: '만+', label: '월 생산량 pcs' },
                { num: '96', unit: '%+', label: '가동률' }
              ].map((stat, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tighter">
                    {stat.num}
                    <span className="text-2xl md:text-3xl ml-1 text-gray-500 font-medium tracking-normal">{stat.unit}</span>
                  </div>
                  <p className="text-gray-400 text-sm tracking-wide font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}