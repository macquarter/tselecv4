/**
 * ============================================================================
 *  태승전자(주) Chatbot Memory — Comprehensive Knowledge Base
 *  Last Updated: 2026-05-27 (xlsx 챗봇 업데이트 반영)
 *
 *  This module is the single source of truth for the CS chatbot's domain
 *  knowledge.  It powers:
 *    • src/components/ChatBot.tsx  — keyword matching + Gemini fallback context
 *    • src/pages/admin/AdminDashboard.tsx  — "챗봇 메모리" 탭 (실제 챗봇 시뮬레이션 UI)
 * ============================================================================
 */

export type MemoryCategory =
  | '회사소개'
  | '연락처'
  | '제품'
  | '서비스'
  | '신규개발'
  | '양산이관'
  | '인증'
  | '시설'
  | '조직'
  | '기타';

export interface MemoryEntry {
  id: string;
  category: MemoryCategory;
  keywords: string[];
  answer: string;
  followUp?: string;
  updatedAt: string;
}

/* ──────────────────────────────────────────────────────────────────────────
 *  COMPANY PROFILE
 * ────────────────────────────────────────────────────────────────────────── */
const COMPANY_PROFILE: MemoryEntry[] = [
  {
    id: 'company',
    category: '회사소개',
    keywords: ['회사', '태승', '소개', '뭐하는', '어떤', '알려', '태승전자'],
    answer:
      '태승전자(주)는 1989년 설립된 마이크로컨트롤러 설계·제조 전문 기업입니다.\n\n' +
      '가전·산업용·의료기기·신재생에너지 4개 영역의 제어기판과 디스플레이 솔루션을 자체 설계하여 양산합니다. ' +
      '인천 로봇랜드 6,500m² 스마트팩토리에서 SMT 3라인 체제로 월 30만개 이상을 생산하고 있습니다.',
    followUp:
      '제품, 인증, 시설, 채용 등 무엇이든 물어봐 주세요!',
    updatedAt: '2026-05-27',
  },
  {
    id: 'history',
    category: '회사소개',
    keywords: ['설립', '창립', '역사', '연혁', '언제', '몇년', '발자취'],
    answer:
      '태승전자(주) 36년 발자취:\n\n' +
      '• 1989년 — 태승전자(주) 창립 (인천 기반 전자부품 제조업 시작)\n' +
      '• 1990s — 마이크로컨트롤러 자체 설계 역량 확보 · 주요 가전 브랜드 납품 시작\n' +
      '• 2000s — 가전 제어기판 제품군 확장 · 기업부설연구소 설립\n' +
      '• 2003년 — ISO 9001 인증 취득\n' +
      '• 2006년 — ISO 14001 환경경영 시스템 인증\n' +
      '• 2010s — 태양광 분야 진출 · 의료기기 MCU 보드 개발 · KOITA 인증\n' +
      '• 2020년 — 인천 로봇랜드 신공장 이전 · 스마트팩토리(MES·SMT 3라인) 도입\n' +
      '• 2022년 — 의료기기 MCU 보드 IEC 60601 인증 · ISO 14001 갱신\n' +
      '• 2024년 — 신재생에너지 제어보드 라인업 출시 · 해외 수출 확대\n' +
      '• 2026년 — AI 기반 품질검사 도입 · 4개 사업영역 풀라인업 확립',
    updatedAt: '2026-05-27',
  },
  {
    id: 'ceo',
    category: '회사소개',
    keywords: ['대표', 'ceo', '사장', '대표이사', '오너', '회장'],
    answer:
      '태승전자(주)의 대표이사는 유태호 사장님입니다. 1989년 창업 이후 36년간 회사를 이끌어 오고 계십니다.',
    updatedAt: '2026-05-27',
  },
  {
    id: 'location',
    category: '회사소개',
    keywords: ['위치', '주소', '어디', '오시는', '찾아', '길', '본사', '공장위치'],
    answer:
      '본사 주소: 인천광역시 서구 로봇랜드로 249번길 62-8 (로봇랜드 단지 내)\n\n' +
      '🚗 자동차: 경인고속도로 인천 IC → 로봇랜드 방향 약 5분\n' +
      '🚌 버스: 인천역 앞 123번 버스 → 로봇랜드 하차\n' +
      '🚇 지하철: 인천 1호선 토성역 5번 출구 → 택시 약 10분',
    followUp:
      '방문 일정이 있으시면 사전에 032-329-7600으로 연락 주시면 안내해 드리겠습니다.',
    updatedAt: '2026-05-27',
  },
];

/* ──────────────────────────────────────────────────────────────────────────
 *  CONTACT
 * ────────────────────────────────────────────────────────────────────────── */
const CONTACT: MemoryEntry[] = [
  {
    id: 'contact',
    category: '연락처',
    keywords: ['전화', '연락처', '번호', '콜', '전화번호', '대표번호'],
    answer:
      '태승전자(주) 대표번호: 032-329-7600 ~ 7603 (4회선)\n팩스: 032-329-7604\n영업시간: 평일 09:00~18:00 (주말·공휴일 휴무)',
    followUp:
      '연락처나 제품명을 남겨주시면 담당자가 빠르게 연결해드립니다!',
    updatedAt: '2026-05-27',
  },
  {
    id: 'fax',
    category: '연락처',
    keywords: ['팩스', 'fax'],
    answer: '팩스번호는 032-329-7604 입니다.',
    updatedAt: '2026-05-27',
  },
  {
    id: 'hours',
    category: '연락처',
    keywords: ['영업시간', '업무시간', '근무시간', '몇시', '상담시간'],
    answer: '영업시간: 평일 09:00 ~ 18:00 (주말·공휴일 휴무)',
    updatedAt: '2026-05-27',
  },
  {
    id: 'email',
    category: '연락처',
    keywords: ['이메일', 'email', '메일'],
    answer:
      '이메일 문의는 홈페이지 하단의 "문의하기" 양식을 이용해 주시면, 담당자가 확인 후 빠르게 답변드립니다.',
    followUp:
      '급한 문의는 032-329-7600 (영업팀)으로 전화 부탁드립니다.',
    updatedAt: '2026-05-27',
  },
];

/* ──────────────────────────────────────────────────────────────────────────
 *  PRODUCTS — 4 business areas
 * ────────────────────────────────────────────────────────────────────────── */
const PRODUCTS: MemoryEntry[] = [
  {
    id: 'products-overview',
    category: '제품',
    keywords: ['제품', '상품', '뭐 만', '생산', '판매', '취급', '라인업', '카탈로그'],
    answer:
      '태승전자(주)의 4개 사업영역 주요 제품군:\n\n' +
      '🏠 가전 — 냉장고 Display PCB, 얼음정수기 제어보드, 레인지후드\n' +
      '🏭 산업용 — 식기세척기, 온도제어기, 펌프, 회의부스(1인/회의룸)\n' +
      '🏥 의료기기 — 원심분리기, 치과 스케일러\n' +
      '☀️ 신재생에너지 — 태양광 패널, 수소 시스템, 리튬이온 BMS',
    updatedAt: '2026-05-27',
  },
  {
    id: 'mainctrl',
    category: '제품',
    keywords: ['컨트롤러', 'mc', 'mcu', '메인컨트롤러', '임베디드'],
    answer:
      '임베디드 컨트롤러 (MC 시리즈):\n• ARM Cortex-M (32/16/8-bit MCU)\n• 전원: 5V ~ 24V DC\n• 통신: UART, SPI, I2C, CAN, RS-485\n• 동작 온도: -20°C ~ +70°C\n• 인증: ISO 9001, CE, KC, RoHS\n• 보증: 3년',
    updatedAt: '2026-05-27',
  },
  {
    id: 'display',
    category: '제품',
    keywords: ['디스플레이', 'lcd', 'led', 'oled', 'tft', '패널', '화면', 'hmi'],
    answer:
      'HMI 솔루션 라인업:\n• LCD 7-Segment / 16x2 Character / 128x64 Graphic\n• LED Driver IC\n• TFT LCD Controller (컬러 터치)\n• OLED Controller (저전력)',
    updatedAt: '2026-05-27',
  },
  {
    id: 'medical',
    category: '제품',
    keywords: ['의료', '메디컬', '의료기기', '병원', '원심분리', '치과'],
    answer:
      '의료기기 영역:\n• 원심분리기 제어보드 — 최대 15,000RPM, ±10 RPM 정밀도\n• 치과 스케일러 제어보드 — 25~36kHz 피에조 구동\n\n의료기기 보드는 IEC 60601 규격 대응 가능합니다.',
    followUp:
      '의료기기 인증 상담은 담당 엔지니어 연결을 권해드립니다.',
    updatedAt: '2026-05-27',
  },
  {
    id: 'renewable',
    category: '제품',
    keywords: ['태양광', '인버터', '솔라', '에너지', '신재생', '수소', '리튬이온', 'bms'],
    answer:
      '신재생에너지 라인업:\n• 태양광 패널 제어 — MPPT 효율 99.5%+\n• 수소 시스템 제어 — 누출/압력/온도 다중 감지\n• 리튬이온 BMS — 최대 16S 셀 모니터링',
    updatedAt: '2026-05-27',
  },
];

/* ──────────────────────────────────────────────────────────────────────────
 *  신규 개발 (NEW DEVELOPMENT) — xlsx 챗봇 업데이트 반영
 * ────────────────────────────────────────────────────────────────────────── */
const NEW_DEVELOPMENT: MemoryEntry[] = [
  {
    id: 'dev-turnkey',
    category: '신규개발',
    keywords: ['기능 사양서', '스펙 문서', '회로 설계부터', 'PCB 아트웍', '전부 진행', '턴키'],
    answer:
      '네, 가능합니다.\n\n원하시는 기능 사양서(스펙 문서)만 주시면 회로 설계 → PCB 아트웍 → 펌웨어 → 시제품까지 인하우스로 전부 진행해 드립니다. 36년간 축적된 설계 노하우로 안정성과 양산성을 모두 잡습니다.',
    followUp:
      '구체적인 요구사항이 있으시면 알려주세요. 영업팀(032-329-7600)에서 상세 상담 도와드립니다!',
    updatedAt: '2026-05-27',
  },
  {
    id: 'dev-reference',
    category: '신규개발',
    keywords: ['MCU 제어', '모터 드라이버', '고전압', '대전류', '인버터 보드', '레퍼런스', '경험'],
    answer:
      '있습니다.\n\n• 가전용 MCU 제어보드 — 30년 이상의 양산 실적\n• 산업용 모터 드라이버 — BLDC·인버터 제어 다수 레퍼런스\n• 고전압/대전류 신재생 인버터 보드 — 태양광·수소 라인업 보유',
    updatedAt: '2026-05-27',
  },
  {
    id: 'dev-firmware',
    category: '신규개발',
    keywords: ['펌웨어', 'firmware', '구동 SW', 'SW 개발', '소프트웨어'],
    answer:
      '가능합니다.\n\nHW 설계 외에 펌웨어(Firmware) 및 구동 SW 개발까지 인하우스에서 모두 처리합니다. ARM Cortex-M 기반 임베디드 SW를 표준으로 진행하며, 고객사 OS·통신 규격 요구에 따라 RTOS 적용도 가능합니다.',
    updatedAt: '2026-05-27',
  },
  {
    id: 'dev-nre',
    category: '신규개발',
    keywords: ['NRE', '착수금', '회로 설계비', '아트웍 비용', '개발비', '개발 비용'],
    answer:
      'NRE 비용(개발 착수금)과 회로 설계비·아트웍 비용은 프로젝트 사양에 따라 협의 진행합니다.\n\n일반적으로 회로 복잡도, 층수, 인증 필요 여부, 양산 수량에 따라 산정됩니다.',
    followUp:
      '대략적인 견적이 필요하시면 사양과 예상 수량을 알려주시면 영업팀에서 안내드립니다.',
    updatedAt: '2026-05-27',
  },
  {
    id: 'dev-leadtime',
    category: '신규개발',
    keywords: ['샘플', 'Working Mock-up', '동작 샘플', '기간', '리드타임', '얼마나'],
    answer:
      '개발 시작부터 첫 동작 샘플(Working Mock-up)까지의 기간은 연구소에서 사양 분석 후 확정 답변드립니다.\n\n일반적으로 회로 복잡도와 신규 설계 비중에 따라 4~12주 범위에서 산정됩니다.',
    followUp:
      '정확한 일정은 사양서 검토 후 영업팀에서 회신드리겠습니다.',
    updatedAt: '2026-05-27',
  },
  {
    id: 'dev-rework',
    category: '신규개발',
    keywords: ['수정 사항', '리웍', '재설계', '회로 수정', '수정 비용'],
    answer:
      '첫 샘플 테스트에서 수정 사항이 발생할 경우, 회로 수정(리웍) 및 재설계 비용은 사안에 따라 연구소가 답변드립니다.\n\n경미한 패치는 무상으로, 사양 변경 수준의 재설계는 별도 협의가 일반적입니다.',
    updatedAt: '2026-05-27',
  },
  {
    id: 'dev-ip',
    category: '신규개발',
    keywords: ['소유권', 'IP', '회로도', 'Schematic', '거버 파일', '소스 코드', '이관'],
    answer:
      '죄송하지만 개발한 회로도(Schematic) · 거버 파일 · 소스 코드의 소유권(IP) 이관은 불가합니다.\n\n태승전자의 영업비밀 및 30년 축적 자산이므로, 양산은 태승전자에서 진행하는 형태로 협력 가능합니다.',
    updatedAt: '2026-05-27',
  },
  {
    id: 'dev-cert',
    category: '신규개발',
    keywords: ['KC', 'UL', 'CE', 'EMC', '디버깅', '인증', '대행', '기술 지원'],
    answer:
      '인증 대행은 불가하지만 기술 지원은 가능합니다.\n\n• 가전 KC·UL — 인증기관 연계 EMC 디버깅 지원\n• 산업용 CE — 적합성 검토 및 회로 보완\n• 에너지 장비 — IEEE 1547 등 규격 준수 설계 지원',
    updatedAt: '2026-05-27',
  },
  {
    id: 'dev-prodcredit',
    category: '신규개발',
    keywords: ['양산 단가', '개발 비용 보전', '할인', '차감', '양산 진행'],
    answer:
      '개발 완료 후 양산 진행 시 개발 비용 일부를 양산 단가에서 차감하거나 보전하는 조건은 협의 진행합니다.\n\n양산 수량과 기간에 따라 NRE 일부 또는 전액을 회수하는 형태로 진행한 사례가 있습니다.',
    updatedAt: '2026-05-27',
  },
];

/* ──────────────────────────────────────────────────────────────────────────
 *  이원화 및 양산이관 (DUAL-SOURCING / TRANSFER) — xlsx 챗봇 업데이트 반영
 * ────────────────────────────────────────────────────────────────────────── */
const TRANSFER: MemoryEntry[] = [
  {
    id: 'transfer-capa',
    category: '양산이관',
    keywords: ['생산 능력', 'Capa', '월간', '연간', '최대 생산', '캐파'],
    answer:
      '월 50만+ 대 생산이 가능합니다.\n\n• SMT 라인 3개 (24시간 풀가동 기준)\n• 가동률 96%+\n• 불량률 100PPM 이하\n• 납기준수율 99%\n\n신규 고객사 양산이관 시에도 충분한 여유 캐파를 보유하고 있습니다.',
    updatedAt: '2026-05-27',
  },
  {
    id: 'transfer-leadtime',
    category: '양산이관',
    keywords: ['거버', 'Gerber', 'BOM', '첫 샘플', 'Proto', '양산', '리드타임'],
    answer:
      '거버 파일(Gerber)과 BOM 접수 후 첫 샘플(Proto) 제작 및 양산까지의 리드타임은 협의 진행합니다.\n\n일반적으로 자재 입고 완료 후 Proto 2~3주, 양산 안정화 4~6주를 기준으로 안내드립니다.',
    updatedAt: '2026-05-27',
  },
  {
    id: 'transfer-moq',
    category: '양산이관',
    keywords: ['MOQ', '최소 주문', '최소 수량', '몇개부터'],
    answer:
      '최소 주문 수량(MOQ)은 협의 진행입니다.\n\n일반 양산 제품은 100~500pcs 이상, 맞춤 개발 제품은 사양 검토 후 별도 협의가 일반적입니다.',
    updatedAt: '2026-05-27',
  },
  {
    id: 'transfer-payment',
    category: '양산이관',
    keywords: ['결제', '결제 조건', '대금', '지급'],
    answer:
      '결제 조건은 거래 규모와 기간에 따라 협의 진행합니다.\n\n신규 거래는 일반적으로 선급금 30%·잔금 70% 또는 월별 정산 조건으로 시작하며, 장기 거래 시 협의 조정 가능합니다.',
    updatedAt: '2026-05-27',
  },
  {
    id: 'transfer-quote',
    category: '양산이관',
    keywords: ['단가표', '견적서', '가격표', '대량 견적'],
    answer:
      '단가표·견적서는 사양과 수량 확정 후 협의 진행합니다.\n\n사양서·거버·BOM·예상 수량을 알려주시면 영업팀에서 정식 견적을 발행해 드립니다.',
    updatedAt: '2026-05-27',
  },
  {
    id: 'transfer-noref',
    category: '양산이관',
    keywords: ['거버 파일 없이', 'BOM 없이', '샘플 PCB만', '리버스 엔지니어링'],
    answer:
      '거버 파일과 BOM 없이 샘플 PCB만 있는 경우 동일 제작은 불가합니다.\n\n다만 동작 사양서(기능 명세서)가 있으시면 신규 개발 형태로 진행 가능합니다.',
    followUp:
      '리버스 엔지니어링이 필요한 경우는 별도 사전 협의 후 진행 여부를 결정합니다.',
    updatedAt: '2026-05-27',
  },
];

/* ──────────────────────────────────────────────────────────────────────────
 *  SERVICES
 * ────────────────────────────────────────────────────────────────────────── */
const SERVICES: MemoryEntry[] = [
  {
    id: 'as',
    category: '서비스',
    keywords: ['as', 'a/s', '수리', '불량', '교환', '보증', '반품', '고장'],
    answer:
      'A/S 문의는 대표번호 032-329-7600으로 연락 주시면 전문 엔지니어가 신속 대응합니다.\n\n• 메인 컨트롤러 보증기간: 3년\n• 불량 분석 및 교환 처리 가능',
    updatedAt: '2026-05-27',
  },
  {
    id: 'delivery',
    category: '서비스',
    keywords: ['납기', '배송', '리드타임', '언제', '며칠'],
    answer:
      '태승전자의 납기준수율은 99%입니다. 구체적인 납기는 제품과 수량에 따라 다릅니다.',
    updatedAt: '2026-05-27',
  },
  {
    id: 'sample',
    category: '서비스',
    keywords: ['샘플 요청', '시제품 제공', '테스트 샘플'],
    answer:
      '샘플 요청이 가능합니다. 제품에 따라 유·무상 샘플 제공이 다를 수 있으니 제품명과 수량을 알려주세요.',
    updatedAt: '2026-05-27',
  },
];

/* ──────────────────────────────────────────────────────────────────────────
 *  CERTIFICATIONS · FACILITY · ORGANIZATION
 * ────────────────────────────────────────────────────────────────────────── */
const CERTIFICATIONS: MemoryEntry[] = [
  {
    id: 'cert',
    category: '인증',
    keywords: ['인증', 'iso', 'ce', 'kc', '품질', 'rohs', 'koita', '특허'],
    answer:
      '태승전자 보유 인증 및 특허:\n\n✅ ISO 9001 — 품질경영시스템\n✅ ISO 14001 — 환경경영시스템\n✅ CE Marking — 유럽연합 안전인증\n✅ KC Certification — 한국 안전인증\n✅ KOITA — 기업부설연구소 인증\n✅ RoHS — 유해물질 제한 준수\n\n특허 보유 3건: 10-0891352 · 10-0892297 · 10-0892298',
    updatedAt: '2026-05-27',
  },
];

const FACILITY_AND_PROCESS: MemoryEntry[] = [
  {
    id: 'facility',
    category: '시설',
    keywords: ['공장', '시설', '규모', '생산능력', '스마트팩토리', '면적'],
    answer:
      '인천 로봇랜드 스마트팩토리:\n📐 총 면적: 6,500m²\n🏭 SMT 라인: 3개\n📦 월 생산: 30만개+\n⚙️ 가동률: 96%+\n📊 불량률: 100PPM 이하\n📈 납기준수율: 99%',
    updatedAt: '2026-05-27',
  },
  {
    id: 'process',
    category: '시설',
    keywords: ['공정', '제조', 'smt', '생산과정', '제조공정', '10단계'],
    answer:
      '10단계 제조 공정:\n① 회로·PCB설계 → ② 자재입고 IQC → ③ SMT 실장 → ④ 자삽 → ⑤ 메인 조립 → ⑥ 펌웨어 다운로드 → ⑦ 기능검사 ICT → ⑧ 최종 QC → ⑨ 포장 → ⑩ 출하',
    updatedAt: '2026-05-27',
  },
];

const ORGANIZATION: MemoryEntry[] = [
  {
    id: 'org',
    category: '조직',
    keywords: ['조직', '부서', '팀', '구성', '인원'],
    answer:
      '태승전자(주) 조직 (직원 약 50명):\n👤 대표이사 — 유태호\n📋 영업팀 · 🔬 기업부설연구소 · 🏭 생산기술팀\n📦 구매팀 · ⚙️ 생산팀 · ✅ 품질경영팀 · 💼 경영지원팀',
    updatedAt: '2026-05-27',
  },
];

const ETC: MemoryEntry[] = [
  {
    id: 'recruit',
    category: '기타',
    keywords: ['채용', '입사', '취업', '구인'],
    answer: '채용 관련 문의는 경영지원팀 (032-329-7600)으로 연락 부탁드립니다.',
    updatedAt: '2026-05-27',
  },
  {
    id: 'download',
    category: '기타',
    keywords: ['카탈로그', '자료', '다운로드', '데이터시트', '매뉴얼'],
    answer:
      '제품 카탈로그·데이터시트·매뉴얼은 홈페이지 > 고객센터 > 자료실에서 다운로드 가능합니다.',
    updatedAt: '2026-05-27',
  },
  {
    id: 'inquiry-types',
    category: '기타',
    keywords: ['문의하기', '문의 양식', '문의 종류', '제휴', '파트너십', '비즈니스'],
    answer:
      '홈페이지 문의하기 4가지 유형:\n\n① 제품 개발 의뢰 — 용도·기능·수량·단가·일정 5개 필드\n② 제조 및 양산 견적 — 거버·BOM 첨부 가능\n③ 기존 거래처 기술 지원 — 담당자 직접 연결\n④ 기타 비즈니스 제휴 — 파트너십 협력 문의',
    updatedAt: '2026-05-27',
  },
];

/* ──────────────────────────────────────────────────────────────────────────
 *  EXPORT — Combined Knowledge Base
 * ────────────────────────────────────────────────────────────────────────── */
export const CHATBOT_MEMORY: MemoryEntry[] = [
  ...COMPANY_PROFILE,
  ...CONTACT,
  ...PRODUCTS,
  ...NEW_DEVELOPMENT,
  ...TRANSFER,
  ...SERVICES,
  ...CERTIFICATIONS,
  ...FACILITY_AND_PROCESS,
  ...ORGANIZATION,
  ...ETC,
];

export const MEMORY_STATS = {
  total: CHATBOT_MEMORY.length,
  byCategory: CHATBOT_MEMORY.reduce<Record<string, number>>((acc, m) => {
    acc[m.category] = (acc[m.category] || 0) + 1;
    return acc;
  }, {}),
  lastUpdated: '2026-05-27',
  version: 'v7.0',
};

export function getFlatKB() {
  return CHATBOT_MEMORY.map((m) => ({
    id: m.id,
    category: m.category,
    keywords: [...m.keywords],
    answer: m.answer,
    followUp: m.followUp,
  }));
}

/**
 * 키워드 매칭: 사용자 입력에서 가장 잘 맞는 메모리 엔트리를 찾아 반환.
 * AdminDashboard의 챗봇 시뮬레이션 UI에서 사용됩니다.
 */
export function findBestMatch(query: string): MemoryEntry | null {
  const q = query.toLowerCase().trim();
  if (!q) return null;

  let bestEntry: MemoryEntry | null = null;
  let bestScore = 0;

  for (const entry of CHATBOT_MEMORY) {
    let score = 0;
    for (const kw of entry.keywords) {
      const k = kw.toLowerCase();
      if (q.includes(k)) {
        score += k.length;
      }
    }
    if (q.includes(entry.id.toLowerCase())) score += 5;
    if (q.includes(entry.category.toLowerCase())) score += 3;
    if (score > bestScore) {
      bestScore = score;
      bestEntry = entry;
    }
  }
  return bestScore > 0 ? bestEntry : null;
}

export function getSystemContext(): string {
  return [
    '당신은 태승전자(주) TSELEC Co., Ltd.의 공식 CS 챗봇입니다.',
    '',
    '회사 핵심 정보:',
    '- 1989년 설립, 마이크로컨트롤러 설계·제조 전문기업',
    '- 대표이사: 유태호',
    '- 주소: 인천광역시 서구 로봇랜드로 249번길 62-8',
    '- 전화: 032-329-7600 ~ 7603 · 팩스: 032-329-7604',
    '- 직원 약 50명 · 인천 로봇랜드 스마트팩토리 6,500m² · SMT 3라인',
    '- 월 생산능력: 30만개+ · 불량률 100PPM 이하 · 납기준수율 99% · 검사커버리지 100%',
    '',
    '4개 사업영역:',
    '1. 가전 (냉장고·정수기·레인지후드 제어보드)',
    '2. 산업용 (식기세척기·온도제어기·펌프·회의부스)',
    '3. 의료기기 (원심분리기·치과 스케일러)',
    '4. 신재생에너지 (태양광·수소·리튬이온 BMS)',
    '',
    '인증: ISO 9001, ISO 14001, CE, KC, KOITA, RoHS · 특허 3건',
    '',
    '답변 원칙:',
    '- 친근하고 전문적인 어조 · 가능하면 구체적인 수치 인용',
    '- 정확하지 않은 정보는 추측하지 말고 "담당자에게 문의 부탁드립니다"라고 안내',
    '- 견적/구체 사양은 영업팀(032-329-7600) 연결로 유도',
    '- IP 이관, 거버 단독 복제, 인증 대행은 불가',
    '- 신규 개발 및 양산이관은 전부 가능 (단, IP는 이관 불가)',
  ].join('\n');
}
