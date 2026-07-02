import { useState, useRef, useEffect, useCallback } from 'react';
import { MessageCircle, X, Send, Bot, User, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { collection, addDoc, serverTimestamp, doc, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface Message {
  role: 'bot' | 'user';
  text: string;
  time: string;
}

/* ─────────────────────────────────────────────
   태승전자 CS 챗봇 v3 — 문맥 인식 · 상담 태도 · 구조화 문의
   ───────────────────────────────────────────── */

// ── 지식 베이스 (카테고리별) ──
interface KBEntry {
  id: string;
  keywords: string[];
  answer: string;
  followUp?: string;
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
    answer: '태승전자의 주요 제품군입니다:\n\n🔹 메인 컨트롤러 (MC 시리즈) — 32/16/8-bit MCU 기반\n🔹 디스플레이 패널 — LCD, LED, OLED, TFT\n🔹 냉장고 제어기판\n🔹 업소용 식기세척기\n🔹 스마트 IOT\n🔹 의료기기 MCU 보드\n🔹 태양광 인버터 제어기',
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
    answer: '가전제품용 제어기판 전문 제조:\n\n🔹 냉장고 제어기판 — 인버터 압축기 제어 및 온도 관리\n🔹 업소용 식기세척기 — 고온 세척·헹굼 온도 정밀 제어\n🔹 스마트 IOT — IoT 기반 스마트홈 통합 제어\n\n주요 가전 브랜드에 납품 실적이 있습니다.' },
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
  // ── 신규개발 ──
  { id: 'dev-full', category: '신규개발',
    keywords: ['회로설계', '회로 설계', 'PCB 아트웍', '아트웍', '설계부터', '전부 진행', '턴키'],
    answer: '네, 가능합니다! 기능 사양서(스펙 문서)를 제공해 주시면 회로 설계부터 PCB 아트웍까지 전 과정을 진행해 드립니다.\n\n태승전자는 설계→PCB제작→펌웨어개발→양산까지 턴키 솔루션을 제공합니다.' },
  { id: 'dev-reference', category: '신규개발',
    keywords: ['레퍼런스', '경험', '실적', '해본', '설계 경험', '납품 실적'],
    answer: '가전용 MCU 제어, 산업용 모터 드라이버, 고전압/대전류 신재생 인버터 보드 등 다양한 분야의 설계 레퍼런스를 보유하고 있습니다.\n\n36년간 축적된 설계 노하우로 다양한 산업 분야의 제어보드를 개발해 왔습니다.',
    followUp: '관심 분야를 말씀해 주시면 관련 레퍼런스를 안내드리겠습니다.' },
  { id: 'dev-firmware', category: '신규개발',
    keywords: ['펌웨어', 'firmware', 'SW 개발', '소프트웨어', '구동 소프트', '임베디드'],
    answer: '네, HW 설계 외에 펌웨어(Firmware) 및 구동 소프트웨어 개발도 함께 진행 가능합니다.\n\n하드웨어와 소프트웨어를 동시에 개발하여 최적화된 솔루션을 제공합니다.' },
  { id: 'dev-nre', category: '신규개발',
    keywords: ['NRE', '착수금', '설계비', '아트웍 비용', '개발비', '개발 비용'],
    answer: '개발 착수금(NRE 비용), 회로 설계비, 아트웍 비용은 프로젝트 규모와 복잡도에 따라 달라집니다.\n\n구체적인 요구사항을 말씀해 주시면 견적을 안내드리겠습니다.',
    followUp: '연락처를 남겨주시면 영업팀에서 상세 견적을 안내드리겠습니다!' },
  { id: 'dev-timeline', category: '신규개발',
    keywords: ['개발 기간', '얼마나 걸', '소요 기간', '일정', '기간', '샘플 기간', '목업'],
    answer: '개발 시작부터 첫 동작 샘플(Working Mock-up)까지의 기간은 프로젝트 복잡도에 따라 달라집니다.\n\n구체적인 일정은 요구사양 검토 후 연구소에서 안내드립니다.',
    followUp: '프로젝트 개요를 알려주시면 예상 일정을 확인해 드리겠습니다.' },
  { id: 'dev-revision', category: '신규개발',
    keywords: ['수정', '리웍', '재설계', '수정 비용', '리비전'],
    answer: '첫 샘플 테스트에서 수정 사항 발생 시 회로 수정(리웍) 및 재설계 비용은 수정 범위에 따라 달라집니다.\n\n구체적인 비용은 연구소 검토 후 안내드립니다.' },
  { id: 'dev-ip', category: '신규개발',
    keywords: ['소유권', 'IP', '지적재산', '소스코드', '거버파일', '이관', '양도'],
    answer: '개발한 회로도(Schematic), 거버 파일, 소스 코드의 IP 소유권은 태승전자에 귀속됩니다.\n\n단, 양산 계약 조건에 따라 별도 협의가 가능합니다.',
    followUp: '자세한 계약 조건은 영업팀과 상담해 주세요.' },
  { id: 'dev-cert', category: '신규개발',
    keywords: ['인증 대행', 'KC 인증', 'UL 인증', 'CE 인증', 'EMC', '인증 지원'],
    answer: '국가 인증(KC, UL, CE 등) 대행은 불가하나, EMC 디버깅 등 기술 지원은 가능합니다.\n\n인증 시험 과정에서 발생하는 기술적 이슈에 대해 적극 지원해 드립니다.',
    followUp: '인증 관련 기술 지원이 필요하시면 연락처를 남겨주세요.' },
  { id: 'dev-cost-offset', category: '신규개발',
    keywords: ['개발비 보전', '개발비 차감', '단가 차감', '양산 단가', '비용 보전'],
    answer: '개발 완료 후 양산 진행 시 개발 비용 보전(할인) 또는 양산 단가에서 차감하는 조건은 협의 가능합니다.\n\n구체적인 조건은 양산 수량과 계약 기간에 따라 달라집니다.',
    followUp: '자세한 조건은 영업팀과 협의해 주세요.' },
  // ── 이원화/양산이관 ──
  { id: 'transfer-capa', category: '양산이관',
    keywords: ['생산능력', 'capa', '생산 능력', '최대 생산', '생산량'],
    answer: '월간 최대 생산 능력은 50만대 이상입니다.\n\n3개 SMT 라인과 스마트팩토리 시스템으로 안정적인 대량 생산이 가능합니다.' },
  { id: 'transfer-leadtime', category: '양산이관',
    keywords: ['거버', 'gerber', 'BOM', '접수', '리드타임', '양산 리드타임', 'proto'],
    answer: '거버 파일(Gerber)과 BOM 접수 후 첫 샘플(Proto) 제작 및 양산까지의 리드타임은 제품 복잡도에 따라 달라집니다.\n\n구체적인 일정은 자료 검토 후 안내드립니다.',
    followUp: '거버 파일과 BOM을 보내주시면 정확한 일정을 확인해 드리겠습니다.' },
  { id: 'transfer-moq', category: '양산이관',
    keywords: ['MOQ', '최소주문', '최소 주문', '최소수량'],
    answer: 'MOQ(최소주문수량)는 제품 종류와 사양에 따라 협의 가능합니다.\n\n양산 이관 제품의 경우 기존 생산 이력을 참고하여 유연하게 대응해 드립니다.',
    followUp: '제품 정보와 함께 연락처를 남겨주시면 영업팀에서 안내드리겠습니다.' },
  { id: 'transfer-payment', category: '양산이관',
    keywords: ['결제 조건', '결제조건', '지불 조건', '결제', '대금'],
    answer: '결제 조건은 거래 규모와 계약 형태에 따라 협의 가능합니다.\n\n일반적인 조건은 영업팀에서 상세히 안내드립니다.',
    followUp: '연락처를 남겨주시면 영업팀에서 결제 조건을 안내드리겠습니다.' },
  { id: 'transfer-quote', category: '양산이관',
    keywords: ['단가표', '견적서', '단가 표', '견적', '프라이스리스트'],
    answer: '단가표 및 견적서는 제품 사양과 수량에 따라 개별 견적으로 제공됩니다.\n\n제품 정보와 예상 수량을 알려주시면 빠르게 견적을 준비해 드리겠습니다.',
    followUp: '연락처와 함께 제품 정보를 남겨주시면 견적서를 보내드리겠습니다.' },
  { id: 'transfer-no-gerber', category: '양산이관',
    keywords: ['거버 없이', '샘플만', '샘플 PCB만', 'BOM 없이', '파일 없이'],
    answer: '거버 파일과 BOM 없이 샘플 PCB만으로는 동일 제작이 불가합니다.\n\n다만, 동작 사양서가 있으시면 신규 개발로 진행이 가능합니다.',
    followUp: '보유하고 계신 자료를 알려주시면 최적의 진행 방법을 안내드리겠습니다.' },
];

// ── 구조화 문의 폼 ──
type InquiryCategory = '제품개발의뢰' | '제조양산견적' | '기존거래처기술지원' | '기타비즈니스제휴' | '';
type InquiryStep = 'idle' | 'selectCategory' | 'purpose' | 'features' | 'quantity' | 'targetPrice' | 'deadline' | 'hasGerber' | 'description' | 'contact' | 'name' | 'done';

interface InquiryFormData {
  category: InquiryCategory;
  purpose: string;
  features: string;
  quantity: string;
  targetPrice: string;
  deadline: string;
  hasGerber: boolean;
  description: string;
  contact: string;
  name: string;
}

const defaultInquiry: InquiryFormData = {
  category: '', purpose: '', features: '', quantity: '',
  targetPrice: '', deadline: '', hasGerber: false,
  description: '', contact: '', name: '',
};

const INQUIRY_CATEGORIES = [
  { key: '제품개발의뢰' as InquiryCategory, label: '① 제품 개발 의뢰' },
  { key: '제조양산견적' as InquiryCategory, label: '② 제조 및 양산 견적' },
  { key: '기존거래처기술지원' as InquiryCategory, label: '③ 기존 거래처 기술 지원' },
  { key: '기타비즈니스제휴' as InquiryCategory, label: '④ 기타 비즈니스 제휴' },
];

function getNextInquiryStep(cat: InquiryCategory, current: InquiryStep): { next: InquiryStep; prompt: string } {
  const isDetailed = cat === '제품개발의뢰' || cat === '제조양산견적';
  if (isDetailed) {
    switch (current) {
      case 'selectCategory': return { next: 'purpose', prompt: '제품의 용도를 알려주세요.\n(예: 태양광 인버터 제어보드, 공기청정기 메인PCB 등)' };
      case 'purpose': return { next: 'features', prompt: '핵심 요구 기능을 알려주세요.\n(예: 와이파이 통신 필요, 모터 2대 제어 등)' };
      case 'features': return { next: 'quantity', prompt: '목표 양산 수량은 어느 정도인가요?\n(예: 연간 10,000대)' };
      case 'quantity': return { next: 'targetPrice', prompt: '목표 양산 단가가 있으시면 알려주세요.\n(예: 대당 15,000원 이하 / 미정이면 "미정"이라고 입력해 주세요)' };
      case 'targetPrice': return { next: 'deadline', prompt: '희망 개발 완료 일정을 알려주세요.\n(예: 2026년 3월까지 / 가능한 빠르게)' };
      case 'deadline':
        if (cat === '제조양산견적') return { next: 'hasGerber', prompt: '거버(Gerber) 파일과 BOM 첨부가 가능하신가요?\n("네" 또는 "아니오"로 답변해 주세요)' };
        return { next: 'contact', prompt: '연락 가능한 전화번호나 이메일을 알려주세요.\n(예: 010-1234-5678 또는 example@email.com)' };
      case 'hasGerber': return { next: 'contact', prompt: '연락 가능한 전화번호나 이메일을 알려주세요.\n(예: 010-1234-5678 또는 example@email.com)' };
      case 'contact': return { next: 'name', prompt: '마지막으로, 성함 또는 회사명을 알려주세요.' };
      default: return { next: 'done', prompt: '' };
    }
  } else {
    switch (current) {
      case 'selectCategory': return { next: 'description', prompt: cat === '기존거래처기술지원' ? '어떤 기술 지원이 필요하신지 간단히 설명해 주세요.\n(제품명, 증상 등)' : '어떤 내용으로 제휴를 원하시는지 간단히 설명해 주세요.' };
      case 'description': return { next: 'contact', prompt: '연락 가능한 전화번호나 이메일을 알려주세요.\n(예: 010-1234-5678 또는 example@email.com)' };
      case 'contact': return { next: 'name', prompt: '마지막으로, 성함 또는 회사명을 알려주세요.' };
      default: return { next: 'done', prompt: '' };
    }
  }
}

// ── Firestore 문의 저장 ──
async function saveInquiryToFirestore(data: {
  contact: string;
  contactType: 'phone' | 'email';
  topic: string;
  category: string;
  conversation: { role: string; text: string }[];
  userName: string;
  formData?: InquiryFormData;
}) {
  try {
    await addDoc(collection(db, 'chatInquiries'), {
      ...data,
      status: 'new',
      createdAt: serverTimestamp(),
    });
    console.log('챗봇 문의 Firestore 저장 완료');
  } catch (e) {
    console.warn('챗봇 문의 저장 실패:', e);
  }
}

// ── 상담 문맥 ──
interface ConversationContext {
  lastTopic: string;
  lastCategory: string;
  awaitingContact: boolean;
  inquiryTopic: string;
  userName: string;
  contactGiven: boolean;
  lastBotResponse: string;
  turnCount: number;
}

const defaultCtx: ConversationContext = {
  lastTopic: '', lastCategory: '', awaitingContact: false,
  inquiryTopic: '', userName: '', contactGiven: false,
  lastBotResponse: '', turnCount: 0,
};

// ── 관리자 학습 지식 (Firestore siteContent/chatbot.raw) ──
let DYNAMIC_KB: KBEntry[] = [];

function parseChatbotKnowledge(raw: string): KBEntry[] {
  if (!raw || !raw.trim()) return [];
  const blocks = raw.split(/\n\s*---\s*\n/);
  const out: KBEntry[] = [];
  blocks.forEach((b, i) => {
    const lines = b.split('\n').map(l => l.trim()).filter(Boolean);
    if (lines.length < 2) return;
    const keywords = lines[0].split(/[,，]/).map(k => k.trim()).filter(Boolean);
    const answer = lines.slice(1).join('\n');
    if (keywords.length && answer) out.push({ id: 'admin-' + i, category: '관리자학습', keywords, answer });
  });
  return out;
}

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
    if (/^[네예응요]$/i.test(q.trim())) {
      if (ctx.awaitingContact) {
        return { text: '네! 연락 가능한 전화번호나 이메일을 남겨주시면 담당자가 연락드리겠습니다.', newCtx };
      }
      if (ctx.lastTopic) {
        return { text: '네, 더 궁금한 점이 있으시면 편하게 질문해 주세요!', newCtx };
      }
      return { text: '네! 무엇을 도와드릴까요? 제품, 견적, 기술 상담 등 편하게 말씀해 주세요.', newCtx };
    }
    return {
      text: '죄송합니다, 조금 더 구체적으로 말씀해 주시겠어요?\n\n예를 들어:\n• "컨트롤러 제품 문의"\n• "견적 받고 싶어요"\n• "MOQ가 어떻게 되나요?"',
      newCtx
    };
  }

  // 5) 문의하기 / 상담 요청 감지
  if (/문의|상담|알고\s?싶|궁금|질문/.test(qLower) && !/전화|번호/.test(qLower)) {
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

  // 6) "연락주세요", "연락 부탁", "콜백" 등
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

  // 10) 지식 베이스 매칭
  let bestScore = 0;
  let bestEntry: KBEntry | null = null;

  for (const entry of DYNAMIC_KB.concat(KB)) {
    let score = 0;
    for (const kw of entry.keywords) {
      if (qLower.includes(kw.toLowerCase())) {
        score += 1 + (kw.length > 3 ? 1 : 0);
      }
    }
    if (score > 0 && entry.category === ctx.lastCategory) {
      score += 0.5;
    }
    if (score > 0 && entry.category === '관리자학습') {
      score += 1.5;
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
    if (text === ctx.lastBotResponse && bestEntry.followUp) {
      text = bestEntry.followUp;
    } else if (bestEntry.followUp) {
      text += '\n\n' + bestEntry.followUp;
    }

    newCtx.lastBotResponse = bestEntry.answer;
    return { text, newCtx };
  }

  // 11) 연락처 대기 중인데 매칭 안 된 경우
  if (ctx.awaitingContact) {
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

  // 12) 최종 폴백
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

// ── 문의 요약 빌드 ──
function buildInquirySummary(data: InquiryFormData): string {
  const lines: string[] = [];
  if (data.purpose) lines.push(`• 제품 용도: ${data.purpose}`);
  if (data.features) lines.push(`• 핵심 요구기능: ${data.features}`);
  if (data.quantity) lines.push(`• 목표 양산 수량: ${data.quantity}`);
  if (data.targetPrice) lines.push(`• 목표 양산 단가: ${data.targetPrice}`);
  if (data.deadline) lines.push(`• 희망 완료 일정: ${data.deadline}`);
  if (data.category === '제조양산견적') lines.push(`• 거버/BOM 첨부: ${data.hasGerber ? '가능' : '불가'}`);
  if (data.description) lines.push(`• 설명: ${data.description}`);
  lines.push(`• 연락처: ${data.contact}`);
  return lines.join('\n');
}

// ── 컴포넌트 ──
export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: '안녕하세요! 태승전자 고객지원 챗봇입니다 😊\n\n제품 문의, 견적 요청, 기술 상담 등 편하게 말씀해 주세요!\n연락처를 남겨주시면 담당자가 직접 연락드리겠습니다.', time: getTime() },
  ]);
  const [input, setInput] = useState('');
  const [ctx, setCtx] = useState<ConversationContext>({ ...defaultCtx });
  const [inquiryStep, setInquiryStep] = useState<InquiryStep>('idle');
  const [inquiryData, setInquiryData] = useState<InquiryFormData>({ ...defaultInquiry });
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    // 실시간 구독: 관리자가 학습 내용을 저장하면 자동 반영
    const unsub = onSnapshot(
      doc(db, 'siteContent', 'chatbot'),
      (snap) => { DYNAMIC_KB = snap.exists() ? parseChatbotKnowledge((snap.data() as any).raw || '') : []; },
      () => { /* noop */ }
    );
    return () => unsub();
  }, []);

  const addBotMessage = useCallback((text: string) => {
    setMessages(prev => [...prev, { role: 'bot', text, time: getTime() }]);
  }, []);

  const addUserMessage = useCallback((text: string) => {
    setMessages(prev => [...prev, { role: 'user', text, time: getTime() }]);
  }, []);

  // 구조화 문의 카테고리 선택
  const handleInquiryCategorySelect = useCallback((cat: InquiryCategory) => {
    const label = INQUIRY_CATEGORIES.find(c => c.key === cat)?.label || cat;
    addUserMessage(label);
    const updated = { ...defaultInquiry, category: cat };
    setInquiryData(updated);

    setTimeout(() => {
      const { next, prompt } = getNextInquiryStep(cat, 'selectCategory');
      setInquiryStep(next);
      addBotMessage(prompt);
    }, 300 + Math.random() * 300);
  }, [addUserMessage, addBotMessage]);

  // 문의하기 시작
  const startInquiry = useCallback(() => {
    setInquiryStep('selectCategory');
    setInquiryData({ ...defaultInquiry });
    addUserMessage('문의하기');
    setTimeout(() => {
      addBotMessage('어떤 종류의 문의인가요? 아래에서 선택해 주세요!');
    }, 300);
  }, [addUserMessage, addBotMessage]);

  // 구조화 문의 응답 처리
  const handleInquiryInput = useCallback((userInput: string) => {
    const q = userInput.trim();
    if (!q) return;

    addUserMessage(q);
    setInput('');

    const updated = { ...inquiryData };

    switch (inquiryStep) {
      case 'purpose': updated.purpose = q; break;
      case 'features': updated.features = q; break;
      case 'quantity': updated.quantity = q; break;
      case 'targetPrice': updated.targetPrice = q; break;
      case 'deadline': updated.deadline = q; break;
      case 'hasGerber':
        updated.hasGerber = /네|예|응|가능|있/.test(q);
        break;
      case 'description': updated.description = q; break;
      case 'contact': updated.contact = q; break;
      case 'name': updated.name = q; break;
      default: break;
    }
    setInquiryData(updated);

    setTimeout(() => {
      const { next, prompt } = getNextInquiryStep(updated.category, inquiryStep);

      if (next === 'done') {
        setInquiryStep('done');
        const catLabel = INQUIRY_CATEGORIES.find(c => c.key === updated.category)?.label || updated.category;
        const summary = buildInquirySummary(updated);
        addBotMessage(`감사합니다, ${updated.name}님! 문의가 접수되었습니다.\n\n📋 문의 유형: ${catLabel}\n${summary}\n\n담당자가 영업시간(평일 09:00~18:00) 내에 연락드리겠습니다.\n\n다른 궁금하신 점이 있으시면 편하게 말씀해 주세요!`);

        // Firestore 저장
        const contactType = EMAIL_REGEX.test(updated.contact) ? 'email' as const : 'phone' as const;
        const convo = messages.map(m => ({ role: m.role, text: m.text }));
        saveInquiryToFirestore({
          contact: updated.contact,
          contactType,
          topic: updated.category,
          category: updated.category,
          conversation: convo,
          userName: updated.name,
          formData: updated,
        });

        // 상태 리셋
        setTimeout(() => {
          setInquiryStep('idle');
          setInquiryData({ ...defaultInquiry });
        }, 500);
      } else {
        setInquiryStep(next);
        addBotMessage(prompt);
      }
    }, 300 + Math.random() * 300);
  }, [inquiryStep, inquiryData, addUserMessage, addBotMessage, messages]);

  const handleSend = useCallback(() => {
    const q = input.trim();
    if (!q) return;

    // 구조화 문의 진행 중이면 해당 핸들러로
    if (inquiryStep !== 'idle' && inquiryStep !== 'selectCategory' && inquiryStep !== 'done') {
      handleInquiryInput(q);
      return;
    }

    const userMsg: Message = { role: 'user', text: q, time: getTime() };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput('');

    setTimeout(() => {
      const { text, newCtx, saveInquiry } = generateResponse(q, ctx);
      setCtx(newCtx);
      setMessages(prev => [...prev, { role: 'bot', text, time: getTime() }]);

      if (saveInquiry) {
        const convo = updatedMessages.map(m => ({ role: m.role, text: m.text }));
        saveInquiryToFirestore({
          ...saveInquiry,
          conversation: convo,
          userName: newCtx.userName || '',
        });
      }
    }, 300 + Math.random() * 500);
  }, [input, ctx, messages, inquiryStep, handleInquiryInput]);

  const isInquiryActive = inquiryStep !== 'idle' && inquiryStep !== 'done';

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

            {/* Quick Actions — 초기 + 문의 카테고리 선택 */}
            {inquiryStep === 'selectCategory' ? (
              <div className="px-4 pb-2 flex flex-col gap-1.5">
                {INQUIRY_CATEGORIES.map(cat => (
                  <button
                    key={cat.key}
                    onClick={() => handleInquiryCategorySelect(cat.key)}
                    className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-[12px] text-gray-300 hover:text-white hover:bg-sky-500/15 hover:border-sky-500/30 transition-colors text-left"
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            ) : messages.length <= 2 && !isInquiryActive ? (
              <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                {['제품 문의', '견적 요청', 'MOQ 확인', '문의하기'].map(q => (
                  <button
                    key={q}
                    onClick={() => { q === '문의하기' ? startInquiry() : setInput(q); }}
                    className={`px-3 py-1.5 rounded-full border text-[11px] transition-colors ${
                      q === '문의하기'
                        ? 'bg-sky-500/15 border-sky-500/30 text-sky-300 hover:text-white hover:bg-sky-500/25'
                        : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {q}
                  </button>
                ))}
              </div>
            ) : null}

            {/* 연락처 대기 중 안내 바 */}
            {ctx.awaitingContact && !ctx.contactGiven && !isInquiryActive && messages.length > 2 && (
              <div className="px-4 pb-2">
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-sky-500/10 border border-sky-500/20">
                  <Phone size={12} className="text-sky-400 shrink-0" />
                  <span className="text-[11px] text-sky-300">전화번호나 이메일을 입력하시면 문의 접수가 완료됩니다</span>
                </div>
              </div>
            )}

            {/* 구조화 문의 진행 안내 바 */}
            {isInquiryActive && inquiryStep !== 'selectCategory' && (
              <div className="px-4 pb-2">
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
                  <span className="text-[11px] text-indigo-300">📋 문의 작성 중... 위 질문에 답변해 주세요</span>
                </div>
              </div>
            )}

            {/* 하단: 문의하기 버튼 (대화 진행 중, 비문의 상태일 때) */}
            {!isInquiryActive && messages.length > 2 && !ctx.awaitingContact && (
              <div className="px-4 pb-2 flex justify-end">
                <button
                  onClick={startInquiry}
                  className="px-3 py-1.5 rounded-full bg-sky-500/15 border border-sky-500/30 text-[11px] text-sky-300 hover:text-white hover:bg-sky-500/25 transition-colors"
                >
                  📋 문의하기
                </button>
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
                  placeholder={
                    inquiryStep === 'selectCategory' ? '위에서 문의 유형을 선택해 주세요...'
                    : isInquiryActive ? '답변을 입력하세요...'
                    : ctx.awaitingContact ? '전화번호 또는 이메일을 입력하세요...'
                    : '메시지를 입력하세요...'
                  }
                  disabled={inquiryStep === 'selectCategory'}
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-white/20 transition-colors disabled:opacity-40"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || inquiryStep === 'selectCategory'}
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
