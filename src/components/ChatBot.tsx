import { useState, useRef, useEffect, useCallback } from 'react';
import { MessageCircle, X, Send, Bot, User, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface Message {
  role: 'bot' | 'user';
  text: string;
  time: string;
}

/* ─────────────────────────────────────────────
   태승전자 CS 챗봇 v2 — 문맥 인식 · 상담 태도
   ───────────────────────────────────────────── */

// ── 지식 베이스 (카테고리별) ──
interface KBEntry {
  id: string;
  keywords: string[];
  answer: string;
  followUp?: string;        // 답변 후 이어갈 멘트
  category: string;
}

const KB: KBEntry[] = [
  // 회사 소개
  { id: 'company', category: '회사소개',
    keywords: ['회사', '태승', '소개', '뭐하는', '어떤', '알려'],
    answer: '태승전자(주)는 1989년 설립된 마이크로컨트롤러 설계·제조 전문 기업입니다.\n\n가전, 의료기기, 태양광 분야의 제어기판과 디스플레이 솔루션을 제공하고 있으며, 인천 로봇랜드에 최첨단 스마트팩토리를 운영하고 있습니다.',
    followUp: '더 궁금하신 부분이 있으시면 말씀해 주세요! 제품, 인증, 시설 등 자세히 안내드릴 수 있습니다.' },
  { id: 'history', category: '회사소개',
    keywords: ['설립', '창립', '역사', '연혁', '언제'],
    answer: '태승전자의 주요 연혁입니다:\n\n• 1989년 — 태승전자 설립\n• 2000년 — 기업부설연구소 설립\n• 2003년 — ISO 9001 인증 취득\n• 2006년 — ISO 14001 인증 취득\n• 2016년 — 인천 청라지구 스마트팩토리 이전',
    followUp: '30년 이상의 기술 노하우를 보유하고 있습니다. 더 궁금한 점 있으시면 편하게 질문해 주세요!' },
  { id: 'ceo', category: '회사소개',
    keywords: ['대표', 'ceo', '사장', '대표이사'],
    answer: '태승전자(주)의 대표이사는 유태호 사장님입니다.' },
  { id: 'location', category: '회사소개',
    keywords: ['위치', '주소', '어디', '오시는', '찾아', '길'],
    answer: '인천광역시 서구 로봇랜드로 249번길 62-8에 위치해 있습니다.\n\n🚗 자동차: 경부고속도로 인천 I.C → 로봇랜드 방향 약 5분\n🚌 버스: 인천역 앞 123번 버스 → 로봇랜드 하차\n🚇 지하철: 인천 1호선 토성역 5번 출구 → 택시 약 10분',
    followUp: '방문 일정이 있으시면 사전에 연락 주시면 안내해 드리겠습니다!' },
  // 연락처
  { id: 'contact', category: '연락처',
    keywords: ['전화', '연락처', '번호', '콜', '전화번호'],
    answer: '태승전자 대표번호: 032-329-7600~7603\n팩스: 032-329-7604\n영업시간: 평일 09:00~18:00 (주말·공휴일 휴무)',
    followUp: '제가 바로 상담 연결은 어렵지만, 연락처나 제품명을 남겨주시면 담당자 연결을 도와드릴게요!' },
  { id: 'fax', category: '연락처',
    keywords: ['팩스', 'fax'],
    answer: '태승전자 팩스번호는 032-329-7604 입니다.' },
  { id: 'hours', category: '연락처',
    keywords: ['영업시간', '업무시간', '근무시간', '몇시', '상담시간'],
    answer: '영업시간은 평일 09:00~18:00이며, 주말·공휴일은 휴무입니다.',
    followUp: '영업시간 외에도 이 챗봇은 24시간 기본 안내가 가능합니다. 상세 상담이 필요하시면 연락처를 남겨주세요!' },
  { id: 'email', category: '연락처',
    keywords: ['이메일', 'email', '메일'],
    answer: '이메일 문의는 홈페이지 하단의 문의하기 양식을 이용해 주시면, 담당자가 확인 후 빠르게 답변드리겠습니다.',
    followUp: '부서별 이메일은 추후 안내 예정입니다. 급한 문의는 032-329-7600으로 전화 부탁드립니다!' },
  // 제품
  { id: 'products', category: '제품',
    keywords: ['제품', '상품', '뭐 만', '생산', '판매', '취급'],
    answer: '태승전자의 주요 제품군입니다:\n\n🔹 메인 컨트롤러 (MC 시리즈) — 32/16/8-bit MCU 기반\n🔹 디스플레이 패널 — LCD, LED, OLED, TFT\n🔹 냉장고 제어기판\n🔹 식기건조기 제어기\n🔹 환기시스템 제어기\n🔹 의료기기 MCU 보드\n🔹 태양광 인버터 제어기',
    followUp: '관심 있는 제품군이 있으시면 말씀해 주세요! 상세 사양을 안내드리겠습니다.' },
  { id: 'controller', category: '제품',
    keywords: ['컨트롤러', 'mc', 'mcu', '메인컨트롤러'],
    answer: '메인 컨트롤러(MC 시리즈)는 태승전자의 핵심 제품입니다.\n\n• 프로세서: 32/16/8-bit MCU\n• 전원: 5V~24V DC\n• 통신: UART, SPI, I2C\n• 온도 범위: -20°C ~ +70°C\n• 인증: ISO 9001, CE\n• 보증: 3년',
    followUp: '자세한 데이터시트가 필요하시면 자료실에서 다운로드하시거나, 연락처를 남겨주시면 보내드리겠습니다.' },
  { id: 'display', category: '제품',
    keywords: ['디스플레이', 'lcd', 'led', 'oled', 'tft', '패널', '화면'],
    answer: '다양한 디스플레이 솔루션을 제공하고 있습니다:\n\n• LCD 7-Segment — 온도·수치 표시\n• LCD 16x2 Character — 텍스트 모듈\n• LCD 128x64 Graphic — 그래픽 표시\n• LED Driver IC — LED 조명 제어\n• TFT LCD Controller — 컬러 터치\n• OLED Controller — 저전력 디스플레이',
    followUp: '어떤 용도로 사용하실 건지 알려주시면 최적의 디스플레이를 추천드리겠습니다!' },
  { id: 'appliance', category: '제품',
    keywords: ['냉장고', '가전', '식기건조', '환기', '에어컨'],
    answer: '가전제품용 제어기판 전문 제조:\n\n🔹 냉장고 제어기판 — 인버터 압축기 제어 및 온도 관리\n🔹 식기건조기 제어기 — 건조 온도·습도 자동 제어\n🔹 환기시스템 제어기 — 팬 속도 제어 및 필터 상태 감지\n\n주요 가전 브랜드에 납품 실적이 있습니다.' },
  { id: 'medical', category: '제품',
    keywords: ['의료', '메디컬', '의료기기', '병원'],
    answer: '의료기기 MCU 보드 — ARM Cortex-M4 기반 고정밀 제품\n\n• IEC 60601 규격 준수\n• 이중 안전회로 설계\n• 정밀 센서 인터페이스',
    followUp: '의료기기는 인증 및 규격 요건이 까다로운 만큼, 전문 상담을 권해드립니다. 연락처를 남겨주시면 담당 엔지니어가 연락드리겠습니다.' },
  { id: 'solar', category: '제품',
    keywords: ['태양광', '인버터', '솔라', '에너지', '신재생'],
    answer: '태양광 인버터 제어기:\n\n• MPPT 효율 99%+\n• 계통연계/독립형 전환 지원\n• 원격 모니터링 기능\n• 동작 온도: -20°C ~ +200°C',
    followUp: '태양광 시스템 구성이나 사양 관련 상담이 필요하시면 연락처를 남겨주세요!' },
  // 맞춤 개발
  { id: 'custom', category: '서비스',
    keywords: ['맞춤', '커스텀', '주문제작', '의뢰', '개발', 'odm', 'oem'],
    answer: '네, 맞춤형 제어 시스템 개발이 가능합니다! 30년 이상의 설계 노하우를 바탕으로 고객사 요구사항에 맞는 턴키 솔루션을 제공해 드립니다.\n\n개발 범위: 회로 설계 → PCB 제작 → 펌웨어 개발 → 양산',
    followUp: '구체적인 요구사항이 있으시면 말씀해 주세요. 연락처를 남겨주시면 영업팀에서 상세 상담 도와드리겠습니다!' },
  // MOQ
  { id: 'moq', category: '서비스',
    keywords: ['moq', '최소주문', '최소수량', '최소 주문', '몇개부터', '소량', '수량'],
    answer: 'MOQ(최소주문수량)는 제품 종류와 사양에 따라 다릅니다.\n\n일반적으로 양산 제품은 100~500pcs 이상이며, 맞춤 개발 제품은 협의 가능합니다.',
    followUp: '정확한 MOQ 확인을 위해 제품명과 함께 연락처를 남겨주시면 영업팀에서 안내드리겠습니다!' },
  // 인증
  { id: 'cert', category: '인증',
    keywords: ['인증', 'iso', 'ce', 'kc', '품질', 'rohs', 'koita'],
    answer: '태승전자 보유 인증:\n\n✅ ISO 9001:2015 — 품질경영시스템\n✅ ISO 14001:2015 — 환경경영시스템\n✅ CE Marking — 유럽연합 안전인증\n✅ KC Certification — 한국 안전인증\n✅ KOITA — 기업부설연구소 인증\n✅ RoHS Compliance — 유해물질 제한 준수' },
  // 시설
  { id: 'facility', category: '시설',
    keywords: ['공장', '시설', '규모', '생산능력', '스마트팩토리', '면적'],
    answer: '인천 로봇랜드 스마트팩토리:\n\n📐 총 면적: 6,500m²\n🏭 SMT 라인: 3개\n📦 월 생산: 30만개~\n⚙️ 가동률: 96%+',
    followUp: '공장 견학을 원하시면 사전 예약 후 방문 가능합니다! 일정을 말씀해 주세요.' },
  // 조직
  { id: 'org', category: '조직',
    keywords: ['조직', '부서', '팀', '구성', '인원'],
    answer: '태승전자 조직:\n\n👤 대표이사 — 유태호\n📋 영업팀 — 수주, 납품, 견적, 고객관리\n🔬 연구소 — MCU 설계, 펌웨어 R&D\n🏭 생산기술팀 — 양산, 공정개선\n📦 구매팀 — 자재조달, 원가관리\n⚙️ 생산팀 — 생산계획, 검사\n✅ 품질경영팀 — 품질개선, 규격관리\n💼 경영지원팀 — 총무, 인사, 자금관리' },
  // 견적
  { id: 'quote', category: '서비스',
    keywords: ['견적', '가격', '비용', '얼마', '단가', '프라이스', 'price'],
    answer: '제품 가격은 수량, 사양, 커스터마이징 여부에 따라 달라집니다.',
    followUp: '견적 확인을 위해 아래 정보를 알려주시면 빠르게 안내드리겠습니다:\n\n1. 관심 제품명\n2. 예상 수량\n3. 연락처 (전화 또는 이메일)\n\n또는 032-329-7600 영업팀으로 직접 문의도 가능합니다!' },
  // A/S
  { id: 'as', category: '서비스',
    keywords: ['as', 'a/s', '수리', '불량', '교환', '보증', '반품', '고장', '하자'],
    answer: 'A/S 문의는 대표번호 032-329-7600으로 연락 주시면 전문 엔지니어가 신속하게 대응해 드립니다.\n\n• 메인 컨트롤러 보증기간: 3년\n• 불량 분석 및 교환 처리 가능',
    followUp: '제품 모델명이나 증상을 알려주시면 더 정확한 안내가 가능합니다!' },
  // 납기
  { id: 'delivery', category: '서비스',
    keywords: ['납기', '배송', '기간', '리드타임', '언제', '며칠'],
    answer: '태승전자의 납기준수율은 99%입니다. 구체적인 납기는 제품과 수량에 따라 다릅니다.',
    followUp: '정확한 납기 확인이 필요하시면 제품명과 수량을 말씀해 주세요! 영업팀에서 확인 후 안내드리겠습니다.' },
  // 채용
  { id: 'recruit', category: '기타',
    keywords: ['채용', '입사', '취업', '구인', '지원', '일자리'],
    answer: '채용 관련 문의는 경영지원팀(032-329-7600)으로 연락 부탁드립니다.',
    followUp: '관심 가져주셔서 감사합니다! 채용 공고가 있을 경우 홈페이지에 게시됩니다.' },
  // 자료
  { id: 'download', category: '기타',
    keywords: ['카탈로그', '자료', '다운로드', '데이터시트', '매뉴얼', '문서'],
    answer: '제품 카탈로그, 데이터시트, 매뉴얼 등은 홈페이지 고객센터 > 자료실에서 다운로드하실 수 있습니다.',
    followUp: '특정 제품의 자료가 필요하시면 제품명을 말씀해 주세요!' },
  // 공정
  { id: 'process', category: '시설',
    keywords: ['공정', '제조', '과정', 'smt', '생산과정', '제조공정'],
    answer: '11단계 제조 공정:\n\n자재입고(IQC) → 크림납 인쇄 → SMT 실장 → 수삽입 → 자동납땜 → 목시검사 → 조립 → ICT 테스트 → 프로그램 Writing → 기능검사 → 포장/출하\n\n불량률 100PPM 이하, 검사커버리지 100%를 유지합니다.' },
  // 샘플
  { id: 'sample', category: '서비스',
    keywords: ['샘플', '시제품', '테스트', '시험', '평가'],
    answer: '샘플 요청이 가능합니다! 제품에 따라 유/무상 샘플 제공이 다를 수 있습니다.',
    followUp: '필요하신 제품과 수량을 알려주시면 샘플 가능 여부를 확인해 드리겠습니다. 연락처도 함께 남겨주세요!' },
  // 파트너십/협력
  { id: 'partner', category: '서비스',
    keywords: ['협력', '파트너', '거래', '납품', '공급', '제휴'],
    answer: '태승전자는 신규 거래처와의 협력을 환영합니다!\n\n30년 이상의 제조 노하우와 안정적인 스마트팩토리 생산 체계를 갖추고 있습니다.',
    followUp: '거래 관련 상담을 원하시면 연락처를 남겨주시거나 032-329-7600 영업팀으로 문의해 주세요!' },
];

// ── Firestore 문의 저장 ──
async function saveInquiryToFirestore(data: {
  contact: string;
  contactType: 'phone' | 'email';
  topic: string;
  category: string;
  conversation: { role: string; text: string }[];
  userName: string;
}) {
  try {
    await addDoc(collection(db, 'chatInquiries'), {
      ...data,
      status: 'new',
      createdAt: serverTimestamp(),
    });
    console.log('✅ 챗봇 문의 Firestore 저장 완료');
  } catch (e) {
    console.warn('챗봇 문의 저장 실패:', e);
  }
}

// ── 상담 문맥 ──
interface ConversationContext {
  lastTopic: string;          // 마지막 대화 주제 (KB entry id)
  lastCategory: string;       // 마지막 카테고리
  awaitingContact: boolean;   // 연락처 대기 중
  inquiryTopic: string;       // 문의 주제
  userName: string;            // 이름 (파악 시)
  contactGiven: boolean;       // 연락처 제공 완료
  lastBotResponse: string;     // 마지막 봇 응답 (중복 방지)
  turnCount: number;           // 대화 횟수
}

const defaultCtx: ConversationContext = {
  lastTopic: '', lastCategory: '', awaitingContact: false,
  inquiryTopic: '', userName: '', contactGiven: false,
  lastBotResponse: '', turnCount: 0,
};

// ── 패턴 감지 ──
const PHONE_REGEX = /(?:0\d{1,2}[-.\s]?\d{3,4}[-.\s]?\d{4}|01[016789][-.\s]?\d{3,4}[-.\s]?\d{4})/;
const EMAIL_REGEX = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
const NAME_PATTERNS = /(?:저는|제\s?이름은?|이름이?)\s*([가-힣]{2,4})/;
const SHORT_INPUT_THRESHOLD = 2;

// ── 응답 생성 엔진 ──
interface ResponseResult {
  text: string;
  newCtx: ConversationContext;
  saveInquiry?: { contact: string; contactType: 'phone' | 'email'; topic: string; category: string };
}

function generateResponse(input: string, ctx: ConversationContext): ResponseResult {
  const q = input.trim();
  const qLower = q.toLowerCase().replace(/[?.,!~\s]+/g, ' ').trim();
  const newCtx = { ...ctx, turnCount: ctx.turnCount + 1 };

  // 1) 연락처 감지 (전화번호)
  const phoneMatch = q.match(PHONE_REGEX);
  if (phoneMatch) {
    newCtx.contactGiven = true;
    newCtx.awaitingContact = false;
    const topic = ctx.inquiryTopic || ctx.lastCategory || '제품';
    const text = `감사합니다! 연락처(${phoneMatch[0]})를 확인했습니다.\n\n${topic} 관련 문의로 접수하겠습니다. 담당자가 영업시간(평일 09:00~18:00) 내에 연락드리겠습니다.\n\n다른 궁금하신 점이 있으시면 편하게 말씀해 주세요!`;
    return { text, newCtx, saveInquiry: { contact: phoneMatch[0], contactType: 'phone', topic, category: ctx.lastCategory || '일반' } };
  }

  // 2) 이메일 감지
  const emailMatch = q.match(EMAIL_REGEX);
  if (emailMatch) {
    newCtx.contactGiven = true;
    newCtx.awaitingContact = false;
    const topic = ctx.inquiryTopic || ctx.lastCategory || '제품';
    const text = `감사합니다! 이메일(${emailMatch[0]})로 접수하겠습니다.\n\n${topic} 관련 문의 내용을 담당자에게 전달드리겠습니다. 빠른 시일 내에 회신드리겠습니다.\n\n추가 문의사항이 있으시면 말씀해 주세요!`;
    return { text, newCtx, saveInquiry: { contact: emailMatch[0], contactType: 'email', topic, category: ctx.lastCategory || '일반' } };
  }

  // 3) 이름 감지
  const nameMatch = q.match(NAME_PATTERNS);
  if (nameMatch) {
    newCtx.userName = nameMatch[1];
    if (ctx.awaitingContact) {
      return { text: `${nameMatch[1]}님, 반갑습니다! 연락 가능한 전화번호나 이메일도 함께 알려주시면 담당자 연결을 도와드리겠습니다.`, newCtx };
    }
  }

  // 4) 너무 짧은 입력 처리 (1~2자)
  if (q.replace(/\s/g, '').length <= SHORT_INPUT_THRESHOLD) {
    // 한 글자 "요", "네", "의" 등
    if (/^[네예응요]$/i.test(q.trim())) {
      if (ctx.awaitingContact) {
        return { text: '네! 연락 가능한 전화번호나 이메일을 남겨주시면 담당자가 연락드리겠습니다.', newCtx };
      }
      if (ctx.lastTopic) {
        return { text: '네, 더 궁금한 점이 있으시면 편하게 질문해 주세요!', newCtx };
      }
      return { text: '네! 무엇을 도와드릴까요? 제품, 견적, 기술 상담 등 편하게 말씀해 주세요.', newCtx };
    }
    // 의미 불분명한 짧은 입력
    return {
      text: '죄송합니다, 조금 더 구체적으로 말씀해 주시겠어요?\n\n예를 들어:\n• "컨트롤러 제품 문의"\n• "견적 받고 싶어요"\n• "MOQ가 어떻게 되나요?"',
      newCtx
    };
  }

  // 5) 문의하기 / 상담 요청 감지
  if (/문의|상담|알고\s?싶|궁금|질문/.test(qLower) && !/전화|번호/.test(qLower)) {
    // 어떤 종류의 문의인지 파악 시도
    let topic = '';
    for (const entry of KB) {
      for (const kw of entry.keywords) {
        if (qLower.includes(kw.toLowerCase())) {
          topic = entry.category;
          newCtx.lastTopic = entry.id;
          newCtx.lastCategory = entry.category;
          break;
        }
      }
      if (topic) break;
    }

    newCtx.awaitingContact = true;
    newCtx.inquiryTopic = topic || '일반';

    if (topic) {
      return {
        text: `${topic} 관련 문의시군요! 담당자 연결을 도와드리겠습니다.\n\n연락 가능한 전화번호나 이메일을 남겨주시면 빠르게 회신드리겠습니다.`,
        newCtx
      };
    }
    return {
      text: '네, 어떤 부분이 궁금하신가요? 아래 중에서 선택해 주시거나, 자유롭게 말씀해 주세요!\n\n• 제품 사양 및 종류\n• 견적/가격 문의\n• 맞춤 개발 상담\n• MOQ/납기 확인\n• A/S 및 기술 지원\n• 기타',
      newCtx
    };
  }

  // 6) "연락주세요", "연락 부탁", "콜백" 등 → 연락처 요청
  if (/연락\s?주|콜백|전화\s?주|전화\s?해|연결\s?해|상담\s?원|사람/.test(qLower)) {
    newCtx.awaitingContact = true;
    newCtx.inquiryTopic = ctx.lastCategory || '일반';
    return {
      text: '네, 담당자 연결을 도와드리겠습니다!\n\n연락 가능한 전화번호를 남겨주시면 영업시간(평일 09:00~18:00) 내에 연락드리겠습니다.',
      newCtx
    };
  }

  // 7) 인사
  if (/^(안녕|반갑|하이|hello|hi|헬로|처음)/.test(qLower)) {
    const name = ctx.userName ? `${ctx.userName}님, ` : '';
    return {
      text: `${name}안녕하세요! 태승전자 고객지원 챗봇입니다 😊\n\n제품 문의, 견적 요청, 기술 상담 등 무엇이든 편하게 말씀해 주세요!`,
      newCtx
    };
  }

  // 8) 감사 / 마무리
  if (/감사|고마|ㄱㅅ|thx|thanks|수고/.test(qLower)) {
    const name = ctx.userName ? `${ctx.userName}님, ` : '';
    return {
      text: `${name}도움이 되셨다면 기쁩니다! 😊\n추가로 궁금하신 점이 있으시면 언제든 말씀해 주세요.`,
      newCtx
    };
  }

  // 9) 부정적 / 불만
  if (/별로|실망|아쉽|불편|화나|짜증|답답/.test(qLower)) {
    return {
      text: '불편을 드려 죄송합니다. 더 나은 서비스를 위해 노력하겠습니다.\n\n구체적인 내용을 말씀해 주시거나, 032-329-7600으로 직접 연락 주시면 빠르게 도와드리겠습니다.',
      newCtx
    };
  }

  // 10) 지식 베이스 매칭 (가중치 + 유사도)
  let bestScore = 0;
  let bestEntry: KBEntry | null = null;

  for (const entry of KB) {
    let score = 0;
    for (const kw of entry.keywords) {
      if (qLower.includes(kw.toLowerCase())) {
        // 긴 키워드일수록 높은 점수
        score += 1 + (kw.length > 3 ? 1 : 0);
      }
    }
    // 이전 주제와 같은 카테고리면 보너스
    if (score > 0 && entry.category === ctx.lastCategory) {
      score += 0.5;
    }
    if (score > bestScore) {
      bestScore = score;
      bestEntry = entry;
    }
  }

  if (bestEntry && bestScore >= 1) {
    newCtx.lastTopic = bestEntry.id;
    newCtx.lastCategory = bestEntry.category;

    let text = bestEntry.answer;
    // 중복 응답 방지 — 같은 답변이면 약간 다르게
    if (text === ctx.lastBotResponse && bestEntry.followUp) {
      text = bestEntry.followUp;
    } else if (bestEntry.followUp) {
      text += '\n\n' + bestEntry.followUp;
    }

    newCtx.lastBotResponse = bestEntry.answer;
    return { text, newCtx };
  }

  // 11) 연락처 대기 중인데 매칭 안 된 경우 → 연락처인지 재확인
  if (ctx.awaitingContact) {
    // 숫자가 포함되어 있으면 연락처 시도로 간주
    if (/\d{4,}/.test(q.replace(/[-.\s]/g, ''))) {
      newCtx.contactGiven = true;
      newCtx.awaitingContact = false;
      const topic = ctx.inquiryTopic || '제품';
      return {
        text: `감사합니다! 연락처를 확인했습니다.\n\n${topic} 관련 문의로 접수하겠습니다. 담당자가 영업시간 내에 연락드리겠습니다.\n\n다른 궁금하신 점이 있으시면 말씀해 주세요!`,
        newCtx,
        saveInquiry: { contact: q, contactType: 'phone', topic, category: ctx.lastCategory || '일반' }
      };
    }
    return {
      text: '문의 접수를 위해 연락 가능한 전화번호나 이메일을 알려주시겠어요?\n\n예: 010-1234-5678 또는 example@email.com',
      newCtx
    };
  }

  // 12) 최종 폴백 — 상냥하게, 구체적으로 안내
  const name = ctx.userName ? `${ctx.userName}님, ` : '';
  newCtx.awaitingContact = true;
  newCtx.inquiryTopic = '일반';
  return {
    text: `${name}죄송합니다, 해당 내용에 대해 제가 바로 답변드리기 어려운 부분이 있네요.\n\n더 정확한 안내를 위해 담당자 연결을 도와드릴까요? 연락처를 남겨주시면 확인 후 연락드리겠습니다!\n\n또는 대표번호 032-329-7600으로 직접 문의도 가능합니다.`,
    newCtx
  };
}

// ── 시간 포맷 ──
function getTime() {
  return new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
}

// ── 컴포넌트 ──
export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: '안녕하세요! 태승전자 고객지원 챗봇입니다 😊\n\n제품 문의, 견적 요청, 기술 상담 등 편하게 말씀해 주세요!\n연락처를 남겨주시면 담당자가 직접 연락드리겠습니다.', time: getTime() },
  ]);
  const [input, setInput] = useState('');
  const [ctx, setCtx] = useState<ConversationContext>({ ...defaultCtx });
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = useCallback(() => {
    const q = input.trim();
    if (!q) return;

    const userMsg: Message = { role: 'user', text: q, time: getTime() };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput('');

    setTimeout(() => {
      const { text, newCtx, saveInquiry } = generateResponse(q, ctx);
      setCtx(newCtx);
      setMessages(prev => [...prev, { role: 'bot', text, time: getTime() }]);

      // Firestore에 문의 저장
      if (saveInquiry) {
        const convo = updatedMessages.map(m => ({ role: m.role, text: m.text }));
        saveInquiryToFirestore({
          ...saveInquiry,
          conversation: convo,
          userName: newCtx.userName || '',
        });
      }
    }, 300 + Math.random() * 500);
  }, [input, ctx, messages]);

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

            {/* Quick Actions — 처음에만 + 연락처 대기 중일 때도 표시 */}
            {messages.length <= 2 && (
              <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                {['제품 문의', '견적 요청', 'MOQ 확인', '맞춤 개발 상담'].map(q => (
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

            {/* 연락처 대기 중 안내 바 */}
            {ctx.awaitingContact && !ctx.contactGiven && messages.length > 2 && (
              <div className="px-4 pb-2">
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-sky-500/10 border border-sky-500/20">
                  <Phone size={12} className="text-sky-400 shrink-0" />
                  <span className="text-[11px] text-sky-300">전화번호나 이메일을 입력하시면 문의 접수가 완료됩니다</span>
                </div>
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
                  placeholder={ctx.awaitingContact ? "전화번호 또는 이메일을 입력하세요..." : "메시지를 입력하세요..."}
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
