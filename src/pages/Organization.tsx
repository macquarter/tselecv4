import { motion } from 'motion/react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Organization() {
  const departments = [
    {
      name: '영업팀',
      icon: 'M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2',
      tasks: ['제품개발 · 수주접수', '납품 및 배송', '견적관리', '고객관리', '신기술 제품개발', '기술지원']
    },
    {
      name: '연구소',
      icon: 'M12 2v4m0 12v4M2 12h4m12 0h4 M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83',
      tasks: ['MCU 설계개발', '펌웨어 개발', '신기술 R&D', '기술표준 수립', '성능 검증', '다양한 분야 응용개발']
    },
    {
      name: '생산기술팀',
      icon: 'M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z',
      tasks: ['제품검토', '양산자료배포', 'A/S 및 불량검토', '공정개선', '생산성향상', '비용절감']
    },
    {
      name: '구매팀',
      icon: 'M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12',
      tasks: ['자재조달', '원가관리', '협력사관리', '공급망 최적화', '수급계획', '품질확보']
    },
    {
      name: '생산팀',
      icon: 'M2 20h20M4 20V10l4-4v4l4-4v4l4-4v14',
      tasks: ['생산계획 수립', '생산 및 운영', '공정검토', '수입검사', '출하검사', '개선검토']
    },
    {
      name: '품질경영팀',
      icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z M9 12l2 2 4-4',
      tasks: ['고객불만관리', '품질개선활동', '규격관리', '감시측정', '시정조치', '예방활동']
    },
    {
      name: '경영지원팀',
      icon: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75',
      tasks: ['총괄지원', '자금관리', '총무업무', '자재관리', '행정관리', '인사관리']
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
            Organization
          </motion.div>
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            혁신을 이끄는<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-600">
              전문가 그룹.
            </span>
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto font-light tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            각 분야의 전문가들이 모여<br className="hidden md:block" />
            최고의 시너지를 창출합니다.
          </motion.p>
        </section>

        {/* CEO Section */}
        <section className="max-w-7xl mx-auto px-6 mb-24 text-center">
          <motion.div 
            className="inline-block bg-[#0a0a0a] border border-white/5 rounded-[2rem] p-12 md:p-20 shadow-2xl relative overflow-hidden group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <p className="text-gray-400 font-medium tracking-widest mb-4 uppercase text-sm relative z-10">대표이사</p>
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight relative z-10">유태호</h2>
          </motion.div>
        </section>

        {/* Departments Grid */}
        <section className="max-w-7xl mx-auto px-6 mb-32">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((dept, i) => (
              <motion.div 
                key={dept.name}
                className="bg-[#0a0a0a] border border-white/5 rounded-[2rem] p-10 hover:bg-[#111] transition-colors duration-500 group relative overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-[#1a1a1a] border border-white/5 flex items-center justify-center mb-8 group-hover:bg-white group-hover:text-black transition-colors duration-500 text-gray-400">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
                      <path d={dept.icon} />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-6 tracking-tight">{dept.name}</h3>
                  <ul className="space-y-3">
                    {dept.tasks.map((task, j) => (
                      <li key={j} className="flex items-start text-gray-400 text-sm leading-relaxed font-light">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-600 mr-3 mt-1.5" />
                        {task}
                      </li>
                    ))}
                  </ul>
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