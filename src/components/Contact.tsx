import { motion } from 'motion/react';
import { MapPin, Phone, Printer, Clock } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-32 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <motion.h2 
              className="text-4xl md:text-6xl font-bold tracking-tighter mb-8 text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              언제든지 <br />
              연락주세요.
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-400 font-light mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              제품 문의, 기술 상담, 납품 가격 문의 등 모든 문의에 신속하게 답변드립니다.
            </motion.p>

            <div className="space-y-8">
              {[
                { icon: MapPin, label: 'Address', value: '인천광역시 서구 로봇랜드로 249번길 62-8' },
                { icon: Phone, label: 'Telephone', value: '032-329-7600 ~ 7603' },
                { icon: Printer, label: 'Fax', value: '032-329-7604' },
                { icon: Clock, label: 'Business Hours', value: '평일 09:00 – 18:00 (주말·공휴일 휴무)' },
              ].map((info, i) => (
                <motion.div 
                  key={info.label}
                  className="flex items-start gap-6"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                >
                  <div className="w-12 h-12 rounded-full bg-[#1a1a1a] flex items-center justify-center text-white shrink-0">
                    <info.icon size={20} />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 font-semibold tracking-widest uppercase mb-1">{info.label}</div>
                    <div className="text-lg font-medium text-white">{info.value}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div 
            className="bg-[#0a0a0a] p-10 rounded-[2rem] border border-white/5 relative overflow-hidden group"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <h3 className="text-2xl font-bold mb-2 text-white relative z-10 tracking-tight">문의 남기기</h3>
            <p className="text-gray-400 mb-8 font-light relative z-10">빠른 시일 내 담당자가 연락드립니다.</p>
            
            <form className="space-y-6 relative z-10" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">회사명 / 성함</label>
                <input type="text" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors" placeholder="(주)태승전자 홍길동" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">연락처</label>
                <input type="tel" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors" placeholder="010-0000-0000" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">이메일</label>
                <input type="email" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors" placeholder="example@company.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">문의 내용</label>
                <textarea rows={4} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors resize-none" placeholder="제품명 및 문의 내용을 입력해주세요."></textarea>
              </div>
              <button className="w-full bg-white text-black font-medium rounded-xl px-4 py-4 hover:bg-gray-200 transition-colors">
                문의 보내기
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}