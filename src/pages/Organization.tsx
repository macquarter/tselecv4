import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Organization() {
  const { t } = useTranslation();

  const ICONS = [
    'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75',
    'M12 2v4m0 12v4M2 12h4m12 0h4 M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83',
    'M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12',
    'M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2',
    'M20 12V8H6a2 2 0 01-2-2c0-1.1.9-2 2-2h12v4 M20 12a2 2 0 010 4H6a2 2 0 01-2-2V6',
    'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z M9 12l2 2 4-4',
    'M2 20h20M4 20V10l4-4v4l4-4v4l4-4v14',
    'M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z'
  ];

  const COLORS = [
    'from-blue-500/20 to-blue-600/5',
    'from-purple-500/20 to-purple-600/5',
    'from-emerald-500/20 to-emerald-600/5',
    'from-amber-500/20 to-amber-600/5',
    'from-orange-500/20 to-orange-600/5',
    'from-red-500/20 to-red-600/5',
    'from-cyan-500/20 to-cyan-600/5',
    'from-indigo-500/20 to-indigo-600/5'
  ];

  const departments = Array.from({ length: 8 }, (_, i) => ({
    name: t(`orgPage.d${i}n`),
    enName: t(`orgPage.d${i}e`),
    desc: t(`orgPage.d${i}d`),
    icon: ICONS[i],
    tasks: Array.from({ length: 6 }, (_, j) => t(`orgPage.d${i}t${j}`)),
    color: COLORS[i],
  }));

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
            {t('orgPage.badge')}
          </motion.div>
          <motion.h1
            className="text-4xl md:text-7xl font-bold mb-8 tracking-tighter break-keep"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {t('orgPage.t1')}<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-600">
              {t('orgPage.t2')}
            </span>
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto font-light tracking-tight whitespace-pre-line"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {t('orgPage.sub')}
          </motion.p>
        </section>

        {/* Departments Grid */}
        <section className="max-w-7xl mx-auto px-6 mb-32">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold tracking-tight mb-2">{t('orgPage.deptsTitle')}</h2>
            <p className="text-gray-500 font-light">{t('orgPage.deptsSub')}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {departments.map((dept, i) => (
              <motion.div
                key={dept.name + i}
                className="bg-[#0a0a0a] border border-white/5 rounded-[2rem] p-8 hover:bg-[#111] transition-all duration-500 group relative overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className={`absolute top-0 left-0 w-full h-full bg-gradient-to-b ${dept.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-[#1a1a1a] border border-white/5 flex items-center justify-center mb-6 group-hover:bg-white group-hover:border-white/20 transition-colors duration-500 text-gray-400 group-hover:text-black overflow-hidden">
                    <motion.svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="w-7 h-7"
                      whileHover={{
                        scale: 1.2,
                        rotate: [0, -10, 10, -5, 0],
                        strokeWidth: 2,
                        transition: {
                          scale: { type: 'spring', stiffness: 400, damping: 12 },
                          rotate: { duration: 0.5, ease: 'easeInOut' }
                        }
                      }}
                    >
                      <path d={dept.icon} />
                    </motion.svg>
                  </div>
                  <p className="text-xs font-medium tracking-widest text-gray-500 uppercase mb-1">{dept.enName}</p>
                  <h3 className="text-xl font-bold tracking-tight mb-3">{dept.name}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">{dept.desc}</p>

                  <ul className="space-y-2">
                    {dept.tasks.map((task, ti) => (
                      <li key={ti} className="flex items-center text-xs text-gray-500 group-hover:text-gray-400 transition-colors">
                        <span className="w-1 h-1 rounded-full bg-gray-600 mr-2" />
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