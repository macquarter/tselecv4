import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Message {
  role: 'bot' | 'user';
  text: string;
  time: string;
}

// ── 태승전자 지식 베이스 ──
const KB: { keywords: string[]; answer: string }[] = [
  // 회사 소개
  { keywords: ['회사', '태승', '소개', '뭐하는', '어떤'],
    answer: '태승전자(주)는 1989년 설립된 마이크로컨트롤러 설계·제조 전문 기업입니다. 가전, 의료기기, 태양광 분야의 제어기판과 디스플레이 솔루션을 제공하고 있으며, 인천 로봇랜드에 최첨단 스마트팩토리를 운영하고 있습니다.' },
  { keywords: ['설립', '창립', '역사', '연혁'],
    answer: '태승전자는 1989년에 설립되었습니다. 2000년 기업부설연구소 설립, 2003년 ISO 9001 인증, 2006년 ISO 14001 인증을 취득했으며, 2016년 인천 청라지구로 확장 이전하여 현재의 스마트팩토리를 운영 중입니다.' },
  { keywords: ['대표', 'CEO', '사장'],
    answer: '태승전자(주)의 대표이사는 유태호 사장님입니다.' },
  { keywords: ['위치', '주소', '어디', '오시는', '찾아'],
    answer: '태승전자는 인천광역시 서구 로봇랜드로 249번길 62-8에 위치해 있습니다.\n\n🚗 자동차: 경부고속도로 인천 I.C에서 로봇랜드 방향 약 5분\n🚌 버스: 인천역 앞에서 123번 버스 → 로봇랜드 하차\n🚇 지하철: 인천 1호선 토성역 5번 출구에서 택시 이용' },
  // 연락처
  { keywords: ['전화', '연락', '번호', '문의', '콜', '전화번호'],
    answer: '태승전자 대표번호는 032-329-7600~7603 입니다.\n팩스: 032-329-7604\n\n영업시간: 평일 09:00~18:00 (주말·공휴일 휴무)\n\n구체적인 제품 문의나 기술 상담은 홈페이지 문의 양식을 이용해 주시면 담당자가 신속히 연락드리겠습니다.' },
  { keywords: ['팩스', 'fax'],
    answer: '태승전자 팩스번호는 032-329-7604 입니다.' },
  { keywords: ['영업시간', '업무시간', '근무시간', '몇시'],
    answer: '태승전자 영업시간은 평일 09:00~18:00이며, 주말·공휴일은 휴무입니다.' },
  { keywords: ['이메일', 'email', '메일'],
    answer: '이메일 문의는 홈페이지의 문의하기 폼을 이용해 주시면 담당자가 확인 후 이메일로 답변드리겠습니다. 부서별 이메일은 추후 안내드리겠습니다.' },
  // 제품
  { keywords: ['제품', '상품', '뭐 만', '생산', '판매'],
    answer: '태승전자의 주요 제품군입니다:\n\n🔹 메인 컨트롤러 (MC 시리즈) — 32/16/8-bit MCU 기반\n🔹 디스플레이 패널 — LCD, LED, OLED, TFT\n🔹 냉장고 제어기판 — 인버터 압축기 제어\n🔹 식기건조기 제어기\n🔹 환기시스템 제어기\n🔹 의료기기 MCU 보드\n🔹 태양광 인버터 제어기\n\n자세한 사양은 제품소개 페이지에서 확인하실 수 있습니다.' },
  { keywords: ['컨트롤러', 'MC', 'MCU', '메인'],
    answer: '메인 컨트롤러(MC 시리즈)는 태승전자의 핵심 제품입니다.\n\n• 프로세서: 32/16/8-bit MCU\n• 전원: 5V~24V DC\n• 통신: UART, SPI, I2C\n• 온도 범위: -20°C ~ +70°C\n• 인증: ISO 9001, CE\n• 보증: 3년\n\n자세한 사양은 제품소개 > 메인 컨트롤러 페이지를 참조해 주세요.' },
  { keywords: ['디스플레이', 'LCD', 'LED', 'OLED', 'TFT', '패널'],
    answer: '태승전자는 다양한 디스플레이 솔루션을 제공합니다:\n\n• LCD 7-Segment — 온도 표시, 디지털 계기판\n• LCD 16x2 Character — 텍스트 표시 모듈\n• LCD 128x64 Graphic — 그래픽 디스플레이\n• LED Driver IC — LED 조명 제어\n• TFT LCD Controller — 컬러 터치 디스플레이\n• OLED Controller — 저전력 OLED 제어' },
  { keywords: ['냉장고', '가전', '식기건조', '환기'],
    answer: '태승전자는 가전제품용 제어기판을 전문 제조합니다:\n\n🔹 냉장고 제어기판 — 인버터 압축기 제어 및 온도 관리\n🔹 식기건조기 제어기 — 건조 온도·습도 자동 제어\n🔹 환기시스템 제어기 — 팬 속도 제어 및 필터 상태 감지\n\n주요 가전 브랜드에 납품하고 있습니다.' },
  { keywords: ['의료', '메디컬', '의료기기'],
    answer: '태승전자의 의료기기 MCU 보드는 ARM Cortex-M4 기반 고정밀 제품입니다.\n\n• IEC 60601 규격 준수\n• 이중 안전회로 설계\n• 정밀 센서 인터페이스\n\n의료기기 관련 기술 상담은 032-329-7600으로 문의해 주세요.' },
  { keywords: ['태양광', '인버터', '솔라', '에너지'],
    answer: '태승전자의 태양광 인버터 제어기 특징:\n\n• MPPT 99%+ 효율\n• 계통연계/독립형 전환 지원\n• 원격 모니터링\n• 제어 범위: -20°C ~ +200°C\n\n태양광 시스템 관련 문의는 대표번호로 연락 부탁드립니다.' },
  // 맞춤 개발
  { keywords: ['맞춤', '커스텀', '주문', '의뢰', '개발'],
    answer: '네, 맞춤형 제어 시스템 개발이 가능합니다! 태승전자는 30년 이상의 설계 노하우를 바탕으로 고객사 요구사항에 맞는 턴키 솔루션을 개발해 드립니다.\n\n문의: 032-329-7600 (영업팀)\n또는 홈페이지 문의 양식을 이용해 주세요.' },
  // 인증
  { keywords: ['인증', 'ISO', 'CE', 'KC', '품질'],
    answer: '태승전자가 보유한 인증 현황:\n\n✅ ISO 9001:2015 — 품질경영시스템 (2001년~)\n✅ ISO 14001:2015 — 환경경영시스템 (2006년~)\n✅ CE Marking — 유럽연합 안전 인증\n✅ KC Certification — 한국 안전 인증\n✅ KOITA 인증 — 기업부설연구소 (2000년~)\n✅ RoHS Compliance — 유해물질 제한 준수' },
  // 시설
  { keywords: ['공장', '시설', '규모', '생산능력', '스마트팩토리'],
    answer: '태승전자 인천 로봇랜드 스마트팩토리:\n\n📐 총 시설 면적: 6,500m²\n🏭 SMT 생산라인: 3개\n📦 월 생산량: 50만+ pcs\n⚙️ 가동률: 96%+\n\n최신 스마트팩토리 시스템을 도입하여 생산 효율과 품질을 극대화하고 있습니다.' },
  // 조직
  { keywords: ['조직', '부서', '팀', '구성'],
    answer: '태승전자 조직 구성:\n\n👤 대표이사: 유태호\n📋 영업팀 — 제품개발·수주, 납품, 견적·고객관리\n🔬 연구소 — MCU 설계, 펌웨어 개발, R&D\n🏭 생산기술팀 — 제품검토, 양산, 공정개선\n📦 구매팀 — 자재조달, 원가관리\n⚙️ 생산팀 — 생산계획, 수입/출하검사\n✅ 품질경영팀 — 품질개선, 규격관리\n💼 경영지원팀 — 총무, 인사, 자금관리' },
  // 견적
  { keywords: ['견적', '가격', '비용', '얼마'],
    answer: '제품 견적은 수량, 사양, 커스터마이징 여부에 따라 달라집니다.\n\n견적 요청은 아래 방법으로 부탁드립니다:\n📞 전화: 032-329-7600 (영업팀)\n📝 홈페이지 문의 양식 이용\n\n담당자가 확인 후 빠르게 견적서를 보내드리겠습니다.' },
  // A/S
  { keywords: ['AS', 'A/S', '수리', '불량', '교환', '보증', '반품'],
    answer: 'A/S 및 기술 지원 안내:\n\n📞 대표번호: 032-329-7600\n전문 엔지니어가 신속하게 원인 분석 및 해결책을 제공해 드립니다.\n\n메인 컨트롤러 제품 보증기간은 3년입니다.' },
  // 납기
  { keywords: ['납기', '배송', '기간', '리드타임'],
    answer: '태승전자의 납기준수율은 98%입니다. 구체적인 납기 일정은 제품 종류와 수량에 따라 달라지므로, 영업팀(032-329-7600)으로 문의해 주시면 정확한 일정을 안내드리겠습니다.' },
  // 채용
  { keywords: ['채용', '입사', '취업', '구인', '지원'],
    answer: '채용 관련 문의는 경영지원팀으로 연락 부탁드립니다.\n📞 032-329-7600\n\n현재 채용 공고는 별도 안내가 필요하시면 전화로 문의해 주세요.' },
  // 카탈로그/자료
  { keywords: ['카탈로그', '자료', '다운로드', '데이터시트', '매뉴얼'],
    answer: '제품 카탈로그, 데이터시트, 매뉴얼 등은 홈페이지 고객센터 > 자료실에서 다운로드하실 수 있습니다.\n\n추가 기술 자료가 필요하시면 032-329-7600으로 요청해 주세요.' },
  // 공정
  { keywords: ['공정', '제조', '과정', 'SMT'],
    answer: '태승전자의 제조 공정 (11단계):\n\n1. 자재입고 (IQC 검사)\n2. 크림납 인쇄\n3. SMT 공정 (고속/저속기 실장)\n4. 수삽입/검사\n5. 자동 납땜\n6. 목시검사\n7. 조립\n8. I.C.T 테스트\n9. 프로그램 Writing\n10. 기능검사\n11. 포장/출하\n\n불량률 50PPM 이하, 검사커버리지 100%를 유지하고 있습니다.' },
];

function getTime() {
  return new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
}

function findAnswer(input: string): string {
  const q = input.toLowerCase().replace(/[?.,!]/g, '');
  let best = { score: 0, answer: '' };
  for (const item of KB) {
    let score = 0;
    for (const kw of item.keywords) {
      if (q.includes(kw.toLowerCase())) score += 1;
    }
    if (score > best.score) {
      best = { score, answer: item.answer };
    }
  }
  if (best.score > 0) return best.answer;

  // 인사 처리
  if (/안녕|반갑|하이|hello|hi/i.test(q)) {
    return '안녕하세요! 태승전자 고객지원 챗봇입니다 😊\n무엇을 도와드릴까요?\n\n예시 질문:\n• 태승전자는 어떤 회사인가요?\n• 주요 제품이 뭔가요?\n• 연락처 알려주세요\n• 맞춤 개발 가능한가요?';
  }
  if (/감사|고마|ㄱㅅ|thx|thanks/i.test(q)) {
    return '도움이 되셨다면 기쁩니다! 추가 문의사항이 있으시면 언제든 말씀해 주세요 😊';
  }

  return '죄송합니다, 해당 내용은 제가 정확히 답변드리기 어렵습니다.\n\n아래 방법으로 직접 문의해 주시면 더 자세히 안내드리겠습니다:\n📞 032-329-7600~7603\n📝 홈페이지 문의하기\n\n평일 09:00~18:00 상담 가능합니다.';
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: '안녕하세요! 태승전자 고객지원 챗봇입니다.\n제품, 견적, 기술 상담 등 무엇이든 물어보세요!', time: getTime() },
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  function handleSend() {
    const q = input.trim();
    if (!q) return;
    const userMsg: Message = { role: 'user', text: q, time: getTime() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    setTimeout(() => {
      const answer = findAnswer(q);
      setMessages(prev => [...prev, { role: 'bot', text: answer, time: getTime() }]);
    }, 400 + Math.random() * 400);
  }

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 text-white shadow-lg shadow-sky-500/25 flex items-center justify-center hover:scale-110 transition-transform"
          >
            <MessageCircle size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] h-[540px] max-h-[calc(100vh-120px)] rounded-2xl bg-[#0a0a0a] border border-white/10 shadow-2xl shadow-black/50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/5 bg-gradient-to-r from-sky-500/10 to-indigo-500/10">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center">
                  <Bot size={18} className="text-white" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">태승전자 고객지원</div>
                  <div className="text-[10px] text-green-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                    온라인
                  </div>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="w-8 h-8 rounded-lg hover:bg-white/5 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  {msg.role === 'bot' ? (
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center shrink-0 mt-0.5">
                      <Bot size={14} className="text-white" />
                    </div>
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                      <User size={14} className="text-gray-400" />
                    </div>
                  )}
                  <div className={`max-w-[75%] ${msg.role === 'user' ? 'text-right' : ''}`}>
                    <div className={`inline-block text-left px-3.5 py-2.5 rounded-2xl text-[13px] leading-relaxed whitespace-pre-wrap ${
                      msg.role === 'user'
                        ? 'bg-sky-500/20 text-sky-100 rounded-tr-sm'
                        : 'bg-white/5 text-gray-300 rounded-tl-sm'
                    }`}>
                      {msg.text}
                    </div>
                    <div className={`text-[9px] text-gray-600 mt-1 ${msg.role === 'user' ? 'text-right' : ''}`}>{msg.time}</div>
                  </div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Quick Actions */}
            {messages.length <= 1 && (
              <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                {['제품 소개', '연락처', '견적 문의', '회사 소개'].map(q => (
                  <button
                    key={q}
                    onClick={() => { setInput(q); }}
                    className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="p-3 border-t border-white/5">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSend()}
                  placeholder="메시지를 입력하세요..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-white/20 transition-colors"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="w-10 h-10 rounded-xl bg-sky-500 hover:bg-sky-400 disabled:opacity-30 disabled:hover:bg-sky-500 flex items-center justify-center text-white transition-colors shrink-0"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
