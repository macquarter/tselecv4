import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

interface CertDetail {
  what: string;
  benefits: string[];
  scope: string;
}

interface Cert {
  name: string;
  krName: string;
  year: string;
  desc: string;
  img: string;
  category: string;
  detail: CertDetail;
}

export default function Certifications() {
  const [selectedCert, setSelectedCert] = useState<Cert | null>(null);

  const certs: Cert[] = [
    {
      name: 'ISO 9001:2015',
      krName: '품질경영시스템',
      year: '2018년 인증 (NTQ-3898)',
      desc: '마이크로 콘트롤러의 개발·제조에 대한 품질경영시스템 인증. 유효기간 2024.03.02~2027.03.01',
      img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
      category: 'cert',
      detail: {
        what: 'ISO 9001은 국제표준화기구(ISO)가 제정한 품질경영시스템(QMS) 국제 표준입니다. 조직이 고객 요구사항과 법적 규제를 충족하는 제품·서비스를 일관되게 제공할 수 있는 능력을 갖추었음을 제3자 인증기관이 검증한 것입니다.',
        benefits: [
          '제품 품질의 일관성과 신뢰성 보장',
          '고객 만족도 향상 및 불량률 감소',
          '글로벌 시장 진출 시 필수 자격 요건 충족',
          '지속적 개선(PDCA) 체계 기반의 경영 효율화',
          '국내외 대기업 납품 시 기본 요구 인증',
        ],
        scope: '마이크로 콘트롤러의 개발 및 제조',
      },
    },
    {
      name: 'ISO 14001:2015',
      krName: '환경경영시스템',
      year: '2006년 인증',
      desc: '환경 보호 및 지속 가능한 경영',
      img: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=800&q=80',
      category: 'cert',
      detail: {
        what: 'ISO 14001은 환경경영시스템(EMS) 국제 표준으로, 조직이 환경 영향을 체계적으로 관리하고 지속적으로 환경 성과를 개선할 수 있는 프레임워크를 갖추었음을 인증합니다.',
        benefits: [
          '환경 규제 준수 체계 구축으로 법적 리스크 최소화',
          '에너지·자원 사용 효율화로 비용 절감',
          '친환경 기업 이미지 구축으로 ESG 경영 대응',
          '유해물질 관리 및 폐기물 저감 시스템 운영',
          '환경 친화적 제품을 요구하는 해외 바이어 대응 가능',
        ],
        scope: '전자 제어보드 제조 전 공정의 환경 관리',
      },
    },
    {
      name: 'CE Marking',
      krName: '유럽연합 안전 인증',
      year: '안전적합인증',
      desc: '유럽연합 기술 표준 준수 확인',
      img: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80',
      category: 'cert',
      detail: {
        what: 'CE 마킹(Conformité Européenne)은 제품이 유럽연합(EU)의 안전·건강·환경 보호에 관한 기술 규격(Directive)을 충족함을 나타내는 의무 인증 마크입니다. EU 시장에 유통되는 전자제품에 반드시 필요합니다.',
        benefits: [
          'EU 28개국 + EEA 시장 진출 필수 인증',
          '전기안전(LVD), 전자파 적합성(EMC) 기준 충족 입증',
          '유럽 수출 시 통관 및 유통 장벽 해소',
          '글로벌 제품 안전성에 대한 국제적 신뢰 확보',
          '거래처·최종 고객에게 제품 안전성 보증',
        ],
        scope: '전자 제어보드 및 모듈 제품',
      },
    },
    {
      name: 'KC Certification',
      krName: '한국 안전 인증',
      year: '안전인증',
      desc: '한국 전자제품 안전 기준 준수',
      img: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=800&q=80',
      category: 'cert',
      detail: {
        what: 'KC 인증(Korea Certification)은 대한민국 국가통합인증마크로, 전기·전자제품의 안전성, 전자파 적합성(EMC), 에너지 효율 등에 대한 법적 인증입니다. 국내 시장 유통을 위해 반드시 취득해야 합니다.',
        benefits: [
          '국내 시장 유통을 위한 법적 필수 인증',
          '전기안전, 전자파(EMC), 에너지효율 기준 충족',
          '소비자 안전 보호 및 제품 신뢰도 향상',
          '국내 대기업 납품 시 기본 요구사항 충족',
          '한국 정부 조달 입찰 참여 자격 확보',
        ],
        scope: '전자제어 모듈, 디스플레이 보드, 전원부 제품',
      },
    },
    {
      name: '기업부설연구소',
      krName: 'KOITA 인증',
      year: '2000년 인증',
      desc: '독자 기술 개발 능력 보유',
      img: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80',
      category: 'cert',
      detail: {
        what: 'KOITA(한국산업기술진흥협회)에서 인증하는 기업부설연구소는 기업이 독자적인 연구개발(R&D) 조직과 인력, 시설을 갖추고 기술혁신 활동을 수행할 역량이 있음을 공식 인정하는 제도입니다.',
        benefits: [
          '연구개발(R&D) 세액공제 혜택 적용',
          '정부 R&D 과제 신청 자격 확보',
          '독자적 기술 개발 역량 공식 인증',
          '기술혁신형 기업(이노비즈) 연계 가능',
          '고객사에게 자체 연구개발 능력 입증',
        ],
        scope: '마이크로컨트롤러 설계 및 펌웨어 R&D',
      },
    },
    {
      name: 'RoHS Compliance',
      krName: '유해물질 제한 준수',
      year: '유해물질제한',
      desc: '환경 친화 제조 공정',
      img: 'https://images.unsplash.com/photo-1567789884554-0b844b597180?auto=format&fit=crop&w=800&q=80',
      category: 'cert',
      detail: {
        what: 'RoHS(Restriction of Hazardous Substances)는 EU 지침으로, 전기·전자제품에 납(Pb), 수은(Hg), 카드뮴(Cd), 6가 크롬 등 10대 유해물질의 사용을 제한하는 환경 규제입니다.',
        benefits: [
          '유해물질 10종 사용 제한 기준 준수',
          'EU 및 글로벌 시장 수출 필수 요건 충족',
          '친환경 제조 공정으로 작업자·소비자 안전 확보',
          'WEEE(폐전자제품) 지침과 연계한 환경 대응',
          '친환경 공급망(Green SCM) 요구 기업과의 거래 가능',
        ],
        scope: '전 제품 라인의 자재·부품·납땜 공정',
      },
    },
  ];

  const patents = [
    {
      number: '10-0891352',
      title: '유비쿼터스를 통한 솔라 가로등 관리 방법 및 그 시스템',
      filing: '2008.09.01',
      registration: '2009.03.25',
      appNumber: '2008-0085896',
      img: '/images/patent-10-0891352.jpg',
    },
    {
      number: '10-0892297',
      title: '자가 진단 기능을 가진 경관조명 조절시스템 및 그 자가 진단 방법',
      filing: '2008.09.01',
      registration: '2009.04.01',
      appNumber: '2008-0085903',
      img: '/images/patent-10-0892297.jpg',
    },
    {
      number: '10-0892298',
      title: '절전형 조명 시스템 및 그 제어 방법',
      filing: '2008.10.30',
      registration: '2009.04.01',
      appNumber: '2008-0106883',
      img: '/images/patent-10-0892298.jpg',
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
            className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter"
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
                className="group relative bg-[#0a0a0a] border border-white/5 rounded-[2rem] p-10 hover:bg-[#111] hover:border-white/10 transition-all duration-500 overflow-hidden cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setSelectedCert(cert)}
              >
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10 flex flex-col h-full">
                  <div className="mb-6 h-48 rounded-xl overflow-hidden bg-[#1a1a1a] border border-white/5 relative">
                    <img
                      src={cert.img}
                      alt={cert.name}
                      className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                      onError={(e) => {
                        const im = e.currentTarget as HTMLImageElement;
                        const fb = 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80';
                        if (im.src !== fb) im.src = fb;
                      }}
                    />
                  </div>
                  <div className="mb-auto">
                    <h3 className="text-3xl font-bold mb-2 tracking-tight">{cert.name}</h3>
                    <p className="text-gray-400 font-medium mb-6">{cert.krName}</p>
                    <p className="text-gray-500 text-sm leading-relaxed font-light">{cert.desc}</p>
                  </div>

                  <div className="mt-12 pt-6 border-t border-white/10 flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-300">{cert.year}</span>
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white text-white group-hover:text-black transition-colors duration-300">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Certification Detail Modal */}
        <AnimatePresence>
          {selectedCert && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 flex items-center justify-center px-6 bg-black/80 backdrop-blur-sm"
              onClick={() => setSelectedCert(null)}
            >
              <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 40, scale: 0.96 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-[2rem] bg-[#0a0a0a] border border-white/10 p-8 md:p-10"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close */}
                <button
                  onClick={() => setSelectedCert(null)}
                  className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.05 }}
                  className="mb-6"
                >
                  <span className="inline-block px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs text-purple-400 font-medium tracking-wide">
                    {selectedCert.year}
                  </span>
                </motion.div>

                {/* Title */}
                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.08 }}
                  className="text-3xl font-bold tracking-tight mb-1"
                >
                  {selectedCert.name}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.1 }}
                  className="text-gray-400 font-medium mb-6"
                >
                  {selectedCert.krName}
                </motion.p>

                {/* What is it */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.12 }}
                  className="mb-8"
                >
                  <h4 className="text-xs tracking-widest text-gray-500 uppercase mb-3">인증 개요</h4>
                  <p className="text-gray-300 text-sm leading-relaxed font-light">
                    {selectedCert.detail.what}
                  </p>
                </motion.div>

                {/* Scope */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.14 }}
                  className="mb-8"
                >
                  <h4 className="text-xs tracking-widest text-gray-500 uppercase mb-3">인증 범위</h4>
                  <div className="px-5 py-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-sm text-gray-300">
                    {selectedCert.detail.scope}
                  </div>
                </motion.div>

                {/* Benefits */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.16 }}
                >
                  <h4 className="text-xs tracking-widest text-gray-500 uppercase mb-4">
                    태승전자에 주는 이점
                  </h4>
                  <div className="space-y-2.5">
                    {selectedCert.detail.benefits.map((benefit, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 + i * 0.06 }}
                        className="group/item relative"
                      >
                        <div className="flex items-start gap-3 px-5 py-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] transition-all duration-300 hover:bg-white/[0.06] hover:border-white/[0.1]">
                          <div className="w-5 h-5 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center shrink-0 mt-0.5">
                            <svg className="w-3 h-3 text-green-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                              <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </div>
                          <span className="text-sm text-gray-300 leading-relaxed">{benefit}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

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
                  <img
                    src={patent.img}
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
