import { useImage } from '../contexts/SiteContentContext';
import { motion } from 'motion/react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

interface Cert {
  name: string;
  krName: string;
  year: string;
  desc: string;
  category: string;
}

export default function Certifications() {

  // CMS 편집 가능 이미지 (관리자페이지/인라인 CMS에서 변경)
  const patImg0 = useImage('cert.patent.0.img', '/images/patent-10-0891352.jpg');
  const patImg1 = useImage('cert.patent.1.img', '/images/patent-10-0892297.jpg');
  const patImg2 = useImage('cert.patent.2.img', '/images/patent-10-0892298.jpg');

  const certs: Cert[] = [
    {
      name: 'ISO 9001:2015',
      krName: '품질경영시스템',
      year: '2018년 인증 (NTQ-3898)',
      desc: '마이크로 콘트롤러의 개발·제조에 대한 품질경영시스템 인증. 유효기간 2024.03.02~2027.03.01',
      category: 'cert',
    },
    {
      name: 'ISO 14001:2015',
      krName: '환경경영시스템',
      year: '2006년 인증',
      desc: '환경 보호 및 지속 가능한 경영',
      category: 'cert',
    },
    {
      name: 'CE Marking',
      krName: '유럽연합 안전 인증',
      year: '안전적합인증',
      desc: '유럽연합 기술 표준 준수 확인',
      category: 'cert',
    },
    {
      name: 'KC Certification',
      krName: '한국 안전 인증',
      year: '안전인증',
      desc: '한국 전자제품 안전 기준 준수',
      category: 'cert',
    },
    {
      name: '기업부설연구소',
      krName: 'KOITA 인증',
      year: '2000년 인증',
      desc: '독자 기술 개발 능력 보유',
      category: 'cert',
    },
    {
      name: 'RoHS Compliance',
      krName: '유해물질 제한 준수',
      year: '유해물질제한',
      desc: '환경 친화 제조 공정',
      category: 'cert',
    },
  ];

  const patents = [
    {
      number: '10-0891352',
      title: '유비쿼터스를 통한 솔라 가로등 관리 방법 및 그 시스템',
      filing: '2008.09.01',
      registration: '2009.03.25',
      appNumber: '2008-0085896',
      img: patImg0, imgKey: 'cert.patent.0.img',
    },
    {
      number: '10-0892297',
      title: '자가 진단 기능을 가진 경관조명 조절시스템 및 그 자가 진단 방법',
      filing: '2008.09.01',
      registration: '2009.04.01',
      appNumber: '2008-0085903',
      img: patImg1, imgKey: 'cert.patent.1.img',
    },
    {
      number: '10-0892298',
      title: '절전형 조명 시스템 및 그 제어 방법',
      filing: '2008.10.30',
      registration: '2009.04.01',
      appNumber: '2008-0106883',
      img: patImg2, imgKey: 'cert.patent.2.img',
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
            Certifications &amp; Patents
          </motion.div>
          <motion.h1
            className="text-4xl md:text-7xl font-bold mb-8 tracking-tighter break-keep"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            신뢰를 증명하는
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-600">
              글로벌 스탠다드.
            </span>
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto font-light tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            국제 표준 인증과 특허 기술로
            <br className="hidden md:block" />
            최고의 제품과 서비스를 제공합니다.
          </motion.p>
        </section>

        {/* Certifications Grid */}
        <section className="max-w-7xl mx-auto px-6 mb-32">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold tracking-tight mb-2">인증 현황</h2>
            <p className="text-gray-500 font-light">국제 표준 및 안전 인증</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certs.map((cert, i) => (
              <motion.div
                key={cert.name}
                className="group relative bg-[#0a0a0a] border border-white/5 rounded-[2rem] p-10 hover:bg-[#111] hover:border-white/10 transition-all duration-500 overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10 flex flex-col h-full">
                  <div className="mb-auto">
                    <h3 className="text-3xl font-bold mb-2 tracking-tight">{cert.name}</h3>
                    <p className="text-gray-400 font-medium mb-6">{cert.krName}</p>
                    <p className="text-gray-500 text-sm leading-relaxed font-light">{cert.desc}</p>
                  </div>

                  <div className="mt-12 pt-6 border-t border-white/10">
                    <span className="text-sm font-medium text-gray-300">{cert.year}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Patents Section */}
        <section className="max-w-7xl mx-auto px-6 mb-32">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold tracking-tight mb-2">특허 보유 현황</h2>
            <p className="text-gray-500 font-light">대한민국 특허청 등록 특허</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {patents.map((patent, i) => (
              <motion.div
                key={patent.number}
                className="group bg-[#0a0a0a] border border-white/5 rounded-[2rem] overflow-hidden hover:bg-[#111] hover:border-white/10 transition-all duration-500 relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Patent Thumbnail */}
                <div className="h-64 bg-[#1a1a1a] border-b border-white/5 overflow-hidden relative">
                  <img loading="lazy" decoding="async"
                    src={patent.img}
                    data-cms-img-key={`cert.patent.${i}.img`}
                    alt={`특허 제${patent.number}호`}
                    className="absolute inset-0 w-full h-full object-contain p-4 opacity-90 group-hover:scale-105 transition-transform duration-700"
                  />
                </div>

                {/* Patent Info */}
                <div className="p-8">
                  <div className="text-xs text-gray-500 mb-3 font-mono tracking-wide">
                    특허 제{patent.number}호
                  </div>
                  <h3 className="text-lg font-bold mb-6 tracking-tight leading-snug">{patent.title}</h3>
                  <div className="space-y-2.5 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">출원번호</span>
                      <span className="text-gray-300">{patent.appNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">출원일</span>
                      <span className="text-gray-300">{patent.filing}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">등록일</span>
                      <span className="text-gray-300 font-medium">{patent.registration}</span>
                    </div>
                  </div>
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
