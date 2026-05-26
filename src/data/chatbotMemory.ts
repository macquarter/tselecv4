/**
 * ============================================================================
 *  태승전자(주) Chatbot Memory — Comprehensive Knowledge Base
 *  Last Updated: 2026-05-27
 *
 *  This module is the single source of truth for the CS chatbot's domain
 *  knowledge.  It powers:
 *    • src/components/ChatBot.tsx  — keyword matching + Gemini fallback context
 *    • src/pages/admin/AdminDashboard.tsx  — "챗봇 메모리" tab for review/audit
 *
 *  Editing guidance:
 *    1) Each entry is treated as a snippet of long-term memory.  Update
 *       `answer` to keep the chatbot's responses fresh and accurate.
 *    2) `keywords` are case-insensitive prefix/substring matches; add new
 *       synonyms here as you discover real user phrasings.
 *    3) `category` groups entries in the admin dashboard.
 *    4) `lang` defaults to 'ko' — multi-language KB to come in a later patch.
 * ============================================================================
 */

export type MemoryCategory =
  | '회사소개'
  | '연락처'
  | '제품'
  | '서비스'
  | '인증'
  | '시설'
  | '조직'
  | '신규개발'
  | '기타';

export interface MemoryEntry {
  id: string;
  category: MemoryCategory;
  keywords: string[];
  /** Primary chatbot answer (ko). Markdown-light formatting allowed. */
  answer: string;
  /** Optional follow-up nudge — usually offers a phone number or contact form. */
  followUp?: string;
  /** Updated date — useful for audit. ISO yyyy-mm-dd. */
  updatedAt: string;
}

/* ──────────────────────────────────────────────────────────────────────────
 *  COMPANY PROFILE  (회사소개)
 *  Source of truth for 챗봇 — '회사 소개', '연혁', '대표이사', '위치' 등
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
      '제품, 인증, 시설, 채용 등 무엇이든 물어봐 주세요! 자세히 안내드릴 수 있습니다.',
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
      '• 2000s — 가전 제어기판 제품군 확장 · 기업부설연구소 설립 · 양산 체계 고도화\n' +
      '• 2003년 — ISO 9001 인증 취득\n' +
      '• 2006년 — ISO 14001 환경경영 시스템 인증\n' +
      '• 2010s — 태양광 분야 진출 · 의료기기 MCU 보드 개발 · KOITA 인증\n' +
      '• 2020년 — 인천광역시 서구 로봇랜드 신공장 이전 · 스마트팩토리(MES·SMT 3라인) 도입\n' +
      '• 2022년 — 의료기기 MCU 보드 IEC 60601 인증 · ISO 14001 갱신\n' +
      '• 2024년 — 신재생에너지(태양광·수소·연료전지) 제어보드 라인업 출시 · 해외 수출 확대\n' +
      '• 2026년 — AI 기반 품질검사 도입 · 4개 사업영역 풀라인업 확립',
    followUp:
      '36년간 축적된 마이크로컨트롤러 기술 노하우가 우리의 가장 큰 자산입니다.',
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
  {
    id: 'concept',
    category: '회사소개',
    keywords: ['컨셉', '비전', '미션', '슬로건', '문구', '브랜드'],
    answer:
      '태승전자(주) 핵심 가치 — 4가지 약속:\n\n' +
      '① 정밀한 품질 — 100PPM 이하 불량률, 100% 검사 커버리지\n' +
      '② 고객만족 — 99% 납기 준수, 36년 누적 거래 관계\n' +
      '③ 기술혁신 — 회로 설계부터 펌웨어·양산까지 인하우스 R&D\n' +
      '④ 지속성장 — 4개 사업영역 풀라인업, 해외 수출 확대',
    updatedAt: '2026-05-27',
  },
];

/* ──────────────────────────────────────────────────────────────────────────
 *  CONTACT  (연락처)
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
    answer:
      '영업시간: 평일 09:00 ~ 18:00 (주말·공휴일 휴무)',
    followUp:
      '영업시간 외에도 이 챗봇은 24시간 기본 안내가 가능합니다.',
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
 *  PRODUCTS  (제품)  — 가전 / 산업용 / 의료기기 / 신재생에너지
 * ────────────────────────────────────────────────────────────────────────── */
const PRODUCTS: MemoryEntry[] = [
  {
    id: 'products-overview',
    category: '제품',
    keywords: ['제품', '상품', '뭐 만', '생산', '판매', '취급', '라인업', '카탈로그'],
    answer:
      '태승전자(주)의 4개 사업영역 주요 제품군:\n\n' +
      '🏠 가전 — 냉장고 Display PCB, 얼음정수기 제어보드, 레인지후드 제어보드, 공기청정기 제어보드\n' +
      '🏭 산업용 — 산업용 식기세척기, 온도제어기, 펌프 제어보드, 회의부스(1인/회의룸)\n' +
      '🏥 의료기기 — 원심분리기 제어보드, 진단기 제어보드, 치과 스케일러 제어보드\n' +
      '☀️ 신재생에너지 — 태양광 패널 제어, 수소 시스템 제어, 리튬이온 충전기 제어, 연료전지 제어\n\n' +
      '+ 임베디드 컨트롤러(MC 시리즈), HMI 솔루션(LCD/LED/OLED/TFT), 커스텀 ODM/OEM',
    followUp:
      '관심 있는 제품군이 있으시면 알려주세요. 사양서와 데이터시트를 안내드립니다.',
    updatedAt: '2026-05-27',
  },
  {
    id: 'mainctrl',
    category: '제품',
    keywords: ['컨트롤러', 'mc', 'mcu', '메인컨트롤러', '임베디드', '메인보드'],
    answer:
      '임베디드 컨트롤러 (MC 시리즈):\n\n' +
      '• 프로세서: ARM Cortex-M (32/16/8-bit MCU)\n' +
      '• 전원: 5V ~ 24V DC\n' +
      '• 통신: UART, SPI, I2C, CAN, RS-485\n' +
      '• 동작 온도: -20°C ~ +70°C\n' +
      '• 인증: ISO 9001, CE, KC, RoHS\n' +
      '• 보증: 3년',
    followUp:
      '자세한 데이터시트는 자료실에서 다운로드하시거나 연락처를 남겨주세요.',
    updatedAt: '2026-05-27',
  },
  {
    id: 'display',
    category: '제품',
    keywords: ['디스플레이', 'lcd', 'led', 'oled', 'tft', '패널', '화면', 'hmi'],
    answer:
      'HMI 솔루션 — 다양한 디스플레이 라인업:\n\n' +
      '• LCD 7-Segment — 온도·수치 표시용\n' +
      '• LCD 16x2 Character — 텍스트 모듈\n' +
      '• LCD 128x64 Graphic — 그래픽 표시\n' +
      '• LED Driver IC — LED 조명 제어\n' +
      '• TFT LCD Controller — 컬러 터치\n' +
      '• OLED Controller — 저전력 디스플레이',
    followUp:
      '사용처를 알려주시면 최적의 디스플레이를 추천드립니다.',
    updatedAt: '2026-05-27',
  },
  {
    id: 'appliance',
    category: '제품',
    keywords: ['냉장고', '가전', '식기건조', '환기', '에어컨', '정수기', '레인지후드', '공기청정기'],
    answer:
      '가전 영역 제어보드 라인업:\n\n' +
      '🔹 냉장고 Display PCB — 32-bit ARM Cortex-M / ±0.3°C 정밀도 / 4존 독립 제어\n' +
      '🔹 얼음정수기 제어보드 — 인버터 컴프레서 구동, UV 살균, 누수 감지\n' +
      '🔹 레인지후드 제어보드 — BLDC 3단 풍량, 가스·연기 자동 감지\n' +
      '🔹 공기청정기 제어보드 — PM2.5/PM10/VOC/CO2 센서, Wi-Fi/BLE 연결',
    updatedAt: '2026-05-27',
  },
  {
    id: 'industrial',
    category: '제품',
    keywords: ['산업용', '식기세척기', '펌프', '온도제어', '부스', '회의부스'],
    answer:
      '산업용 제어 라인업:\n\n' +
      '🔹 산업용 식기세척기 — 최대 90°C 정밀 제어, 8가지 세척 프로그램\n' +
      '🔹 산업용 온도제어기 — ±0.1°C 정밀도, K/J/T TC + Pt100 RTD 직접 입력\n' +
      '🔹 펌프 제어보드 — 인버터 0.4~15kW, Modbus RTU 통신, 다중 펌프 교대 운전\n' +
      '🔹 회의부스 1인부스 — LED 조명, PIR 재실 센서, USB-C PD 전원\n' +
      '🔹 회의부스 회의룸 — CO2 센서 연동 환기, AV 자동 전원 관리',
    updatedAt: '2026-05-27',
  },
  {
    id: 'medical',
    category: '제품',
    keywords: ['의료', '메디컬', '의료기기', '병원', '원심분리', '치과', '진단'],
    answer:
      '의료기기 영역 제어보드:\n\n' +
      '🔹 원심분리기 제어보드 — 최대 15,000RPM, ±10 RPM 정밀도, 불균형 자동 정지\n' +
      '🔹 진단기 제어보드 — ±0.1°C 반응 챔버, 340~800nm 흡광 광학측정\n' +
      '🔹 치과 스케일러 제어보드 — 25~36kHz 피에조 구동, 공진 주파수 자동 추적\n\n' +
      '의료기기 보드는 IEC 60601 규격 대응 및 이중 안전회로 설계가 가능합니다.',
    followUp:
      '의료기기는 인증 및 규격 요건이 까다로워 전문 상담을 권해드립니다. 연락처를 남겨주시면 담당 엔지니어가 연락드립니다.',
    updatedAt: '2026-05-27',
  },
  {
    id: 'renewable',
    category: '제품',
    keywords: ['태양광', '인버터', '솔라', '에너지', '신재생', '수소', '연료전지', '리튬이온', 'bms'],
    answer:
      '신재생에너지 제어 라인업:\n\n' +
      '🔹 태양광 패널 제어 — MPPT 효율 98.5%, 최대 4채널 트래커, IEEE 1547 적합\n' +
      '🔹 수소 시스템 제어 — 수소 누출/압력/온도 다중 감지, 셀 전압 개별 측정\n' +
      '🔹 리튬이온 충전기 제어 (BMS) — 최대 16S 셀 모니터링, SOC 정확도 ±2%\n' +
      '🔹 연료전지 제어 (PEMFC/SOFC) — 출력 1~100kW, BoP 통합 관리, <500ms 응답',
    followUp:
      '시스템 구성이나 사양 상담이 필요하시면 연락처를 남겨주세요!',
    updatedAt: '2026-05-27',
  },
];

/* ──────────────────────────────────────────────────────────────────────────
 *  SERVICES  (서비스)
 * ────────────────────────────────────────────────────────────────────────── */
const SERVICES: MemoryEntry[] = [
  {
    id: 'custom',
    category: '서비스',
    keywords: ['맞춤', '커스텀', '주문제작', '의뢰', '개발', 'odm', 'oem', '턴키'],
    answer:
      '네, 맞춤형 제어 시스템 개발이 가능합니다!\n\n' +
      '36년간의 설계 노하우를 바탕으로 고객사 요구에 맞춘 턴키 솔루션을 제공합니다.\n' +
      '개발 범위: 회로 설계 → PCB 제작 → 펌웨어 개발 → 시제품 평가 → 양산',
    followUp:
      '구체적인 요구사항이 있으시면 알려주세요. 연락처를 남겨주시면 영업팀에서 상세 상담 도와드립니다!',
    updatedAt: '2026-05-27',
  },
  {
    id: 'moq',
    category: '서비스',
    keywords: ['moq', '최소주문', '최소수량', '최소 주문', '몇개부터', '소량', '수량'],
    answer:
      'MOQ(최소주문수량)는 제품 종류와 사양에 따라 다릅니다.\n\n' +
      '일반 양산 제품: 100~500pcs 이상\n맞춤 개발 제품: 협의 가능',
    followUp:
      '정확한 MOQ는 제품명과 함께 연락처를 남겨주시면 안내드립니다.',
    updatedAt: '2026-05-27',
  },
  {
    id: 'quote',
    category: '서비스',
    keywords: ['견적', '가격', '비용', '얼마', '단가', '프라이스', 'price'],
    answer:
      '제품 가격은 수량·사양·커스터마이징 여부에 따라 달라집니다.',
    followUp:
      '견적 확인을 위해 ① 관심 제품명 ② 예상 수량 ③ 연락처(전화 또는 이메일)를 알려주시거나, ' +
      '032-329-7600 영업팀으로 직접 문의해 주세요.',
    updatedAt: '2026-05-27',
  },
  {
    id: 'as',
    category: '서비스',
    keywords: ['as', 'a/s', '수리', '불량', '교환', '보증', '반품', '고장', '하자'],
    answer:
      'A/S 문의는 대표번호 032-329-7600으로 연락 주시면 전문 엔지니어가 신속 대응합니다.\n\n' +
      '• 메인 컨트롤러 보증기간: 3년\n• 불량 분석 및 교환 처리 가능',
    followUp:
      '제품 모델명이나 증상을 알려주시면 더 정확한 안내가 가능합니다.',
    updatedAt: '2026-05-27',
  },
  {
    id: 'delivery',
    category: '서비스',
    keywords: ['납기', '배송', '기간', '리드타임', '언제', '며칠'],
    answer:
      '태승전자의 납기준수율은 99%입니다. 구체적인 납기는 제품과 수량에 따라 다릅니다.',
    followUp:
      '정확한 납기는 제품명과 수량을 말씀해 주세요. 영업팀에서 확인 후 안내드립니다.',
    updatedAt: '2026-05-27',
  },
  {
    id: 'sample',
    category: '서비스',
    keywords: ['샘플', '시제품', '테스트', '시험', '평가'],
    answer:
      '샘플 요청이 가능합니다. 제품에 따라 유·무상 샘플 제공이 다를 수 있습니다.',
    followUp:
      '필요하신 제품과 수량을 알려주시면 가능 여부를 확인해 드립니다. 연락처도 함께 남겨주세요.',
    updatedAt: '2026-05-27',
  },
  {
    id: 'partner',
    category: '서비스',
    keywords: ['협력', '파트너', '거래', '납품', '공급', '제휴'],
    answer:
      '태승전자(주)는 신규 거래처와의 협력을 환영합니다!\n\n' +
      '36년 제조 노하우와 안정적인 스마트팩토리 생산 체계를 갖추고 있습니다.',
    followUp:
      '거래 상담을 원하시면 연락처를 남겨주시거나 032-329-7600 영업팀으로 문의해 주세요.',
    updatedAt: '2026-05-27',
  },
  {
    id: 'dev-full',
    category: '신규개발',
    keywords: ['회로설계', 'PCB 아트웍', '아트웍', '설계부터', '전부 진행', '인하우스'],
    answer:
      '회로 설계부터 양산까지 전 과정을 인하우스로 진행 가능합니다!\n\n' +
      '① 회로도(Schematic) 설계 ② PCB 아트워크 (4~8층) ③ 펌웨어 개발 (ARM Cortex-M) ' +
      '④ 시제품 평가·신뢰성 검사 ⑤ 양산 (월 50만대+ 생산능력)',
    followUp:
      '기능 사양서가 있으시면 검토 후 일정과 견적을 안내드립니다.',
    updatedAt: '2026-05-27',
  },
];

/* ──────────────────────────────────────────────────────────────────────────
 *  CERTIFICATIONS  (인증)
 * ────────────────────────────────────────────────────────────────────────── */
const CERTIFICATIONS: MemoryEntry[] = [
  {
    id: 'cert',
    category: '인증',
    keywords: ['인증', 'iso', 'ce', 'kc', '품질', 'rohs', 'koita', '특허'],
    answer:
      '태승전자(주) 보유 인증 및 특허:\n\n' +
      '✅ ISO 9001 — 품질경영시스템\n' +
      '✅ ISO 14001 — 환경경영시스템\n' +
      '✅ CE Marking — 유럽연합 안전인증\n' +
      '✅ KC Certification — 한국 안전인증\n' +
      '✅ KOITA — 기업부설연구소 인증\n' +
      '✅ RoHS — 유해물질 제한 준수\n\n' +
      '특허 보유 3건: 10-0891352 · 10-0892297 · 10-0892298',
    updatedAt: '2026-05-27',
  },
];

/* ──────────────────────────────────────────────────────────────────────────
 *  FACILITY  (시설)  & PROCESS (공정)
 * ────────────────────────────────────────────────────────────────────────── */
const FACILITY_AND_PROCESS: MemoryEntry[] = [
  {
    id: 'facility',
    category: '시설',
    keywords: ['공장', '시설', '규모', '생산능력', '스마트팩토리', '면적', '평수'],
    answer:
      '인천 로봇랜드 스마트팩토리:\n\n' +
      '📐 총 면적: 6,500m²\n🏭 SMT 라인: 3개\n📦 월 생산: 30만개+ (최대 50만대)\n⚙️ 가동률: 96%+\n📊 불량률: 100PPM 이하\n📈 납기준수율: 99%',
    followUp:
      '공장 견학을 원하시면 사전 예약 후 방문 가능합니다.',
    updatedAt: '2026-05-27',
  },
  {
    id: 'process',
    category: '시설',
    keywords: ['공정', '제조', '과정', 'smt', '생산과정', '제조공정', '단계'],
    answer:
      '10단계 제조 공정:\n\n' +
      '① 회로·PCB설계 (OrCAD/Altium, 4~8층 PCB)\n' +
      '② 자재입고·IQC (BOM 매칭, LCR 측정) — QC ①\n' +
      '③ SMT 실장 (SPI → 칩마운터 → 리플로우 → AOI)\n' +
      '④ 자삽 (액시얼·래디얼 자동삽입, 웨이브 솔더링)\n' +
      '⑤ 메인 조립 (수삽, 하니스, 하우징)\n' +
      '⑥ 펌웨어 다운로드 (ISP/JTAG, 시리얼 부여)\n' +
      '⑦ 기능검사·ICT — QC ②\n' +
      '⑧ 최종 QC (외관·라벨·AQL 샘플링) — QC ③\n' +
      '⑨ 포장 (ESD 정전기방지)\n' +
      '⑩ 출하 (MES 연동, 99% 납기 준수)',
    updatedAt: '2026-05-27',
  },
];

/* ──────────────────────────────────────────────────────────────────────────
 *  ORGANIZATION  (조직)
 * ────────────────────────────────────────────────────────────────────────── */
const ORGANIZATION: MemoryEntry[] = [
  {
    id: 'org',
    category: '조직',
    keywords: ['조직', '부서', '팀', '구성', '인원', '직원수'],
    answer:
      '태승전자(주) 조직 (직원 약 50명):\n\n' +
      '👤 대표이사 — 유태호\n' +
      '📋 영업팀 — 수주, 납품, 견적, 고객관리\n' +
      '🔬 기업부설연구소 — MCU 설계, 펌웨어 R&D\n' +
      '🏭 생산기술팀 — 양산, 공정 개선\n' +
      '📦 구매팀 — 자재 조달, 원가 관리\n' +
      '⚙️ 생산팀 — 생산 계획, 검사\n' +
      '✅ 품질경영팀 — 품질 개선, 규격 관리\n' +
      '💼 경영지원팀 — 총무, 인사, 자금 관리',
    updatedAt: '2026-05-27',
  },
];

/* ──────────────────────────────────────────────────────────────────────────
 *  ETC  (채용 / 자료실 등)
 * ────────────────────────────────────────────────────────────────────────── */
const ETC: MemoryEntry[] = [
  {
    id: 'recruit',
    category: '기타',
    keywords: ['채용', '입사', '취업', '구인', '지원', '일자리'],
    answer:
      '채용 관련 문의는 경영지원팀 (032-329-7600)으로 연락 부탁드립니다.',
    followUp:
      '채용 공고가 있는 경우 홈페이지 공지사항에 게시됩니다.',
    updatedAt: '2026-05-27',
  },
  {
    id: 'download',
    category: '기타',
    keywords: ['카탈로그', '자료', '다운로드', '데이터시트', '매뉴얼', '문서'],
    answer:
      '제품 카탈로그·데이터시트·매뉴얼은 홈페이지 > 고객센터 > 자료실에서 다운로드 가능합니다.',
    followUp:
      '특정 제품의 자료가 필요하시면 제품명을 말씀해 주세요!',
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
  ...SERVICES,
  ...CERTIFICATIONS,
  ...FACILITY_AND_PROCESS,
  ...ORGANIZATION,
  ...ETC,
];

/** Stats — used by AdminDashboard for the memory tab. */
export const MEMORY_STATS = {
  total: CHATBOT_MEMORY.length,
  byCategory: CHATBOT_MEMORY.reduce<Record<string, number>>((acc, m) => {
    acc[m.category] = (acc[m.category] || 0) + 1;
    return acc;
  }, {}),
  lastUpdated: '2026-05-27',
  version: 'v6.0',
};

/**
 * Helper for ChatBot.tsx — flat list of (id, keywords, answer) used for
 * keyword matching.  Returns a stable copy so the chatbot can sort/filter.
 */
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
 * Helper for ChatBot.tsx — system prompt context for Gemini AI fallback.
 * Returns a compact summary of all company facts.
 */
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
    '- 월 생산능력: 30만개+ · 불량률 100PPM 이하 · 납기준수율 99%',
    '',
    '4개 사업영역:',
    '1. 가전 (냉장고·정수기·레인지후드·공기청정기 제어보드)',
    '2. 산업용 (식기세척기·온도제어기·펌프·회의부스)',
    '3. 의료기기 (원심분리기·진단기·치과 스케일러)',
    '4. 신재생에너지 (태양광·수소·리튬이온·연료전지 제어)',
    '',
    '인증: ISO 9001, ISO 14001, CE, KC, KOITA, RoHS · 특허 3건',
    '',
    '답변 원칙:',
    '- 친근하고 전문적인 어조 · 가능하면 구체적인 수치 인용',
    '- 정확하지 않은 정보는 추측하지 말고 "담당자에게 문의 부탁드립니다"라고 안내',
    '- 견적/구체 사양은 영업팀(032-329-7600) 연결로 유도',
  ].join('\n');
}
