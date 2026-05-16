import { motion } from 'motion/react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function BusinessRenewable() {
  const features = [
    {
      title: '태양광 인버터',
      desc: 'DC-AC 변환 효율을 극대화하는 태양광 발전용 인버터 제어 시스템',
      image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'ESS 제어',
      desc: '배터리 충방전 관리 및 전력 최적화를 위한 에너지 저장 시스템 제어',
      image: 'https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: '스마트그리드',
      desc: '분산 전원 통합 관리 및 전력망 안정화를 위한 지능형 제어 기술',
      image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: '충전 인프라',
      desc: '전기차 충전기 및 충전소 통합 관리를 위한 제어 솔루션',
      image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=800&q=80',
    },
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
            Renewable Energy
          </motion.div>
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            지속 가능한 미래.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-600">
              신재생에너지 제어 솔루션.
            </span>
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto font-light tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            태양광 인버터, ESS 등<br className="hidden md:block" />
            친환경 에너지 시스템 제어 기술을 제공합니다.
          </motion.p>
        </section>

        {/* Feature Cards Section */}
        <section className="max-w-7xl mx-auto px-6 mb-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative rounded-[2rem] bg-[#0a0a0a] border border-white/5 overflow-hidden group aspect-[4/3]"
              >
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-40 transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                <div className="relative z-10 flex flex-col justify-end h-full p-8">
                  <h3 className="text-2xl font-bold mb-2 tracking-tight">{feature.title}</h3>
                  <p className="text-gray-400 text-sm font-light leading-relaxed">{feature.desc}</p>
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
