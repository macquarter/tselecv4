// Firestore 초기 뉴스 데이터 시드 스크립트 (Client SDK - 임시 공개 쓰기 규칙 활용)
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, Timestamp } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDmgOBu3kPUGzff_CyR647kIbN4F91seJE",
  authDomain: "gen-lang-client-0276589179.firebaseapp.com",
  projectId: "gen-lang-client-0276589179",
  storageBucket: "gen-lang-client-0276589179.firebasestorage.app",
  messagingSenderId: "746025368201",
  appId: "1:746025368201:web:0a89d91b9bf2aa60a36458"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app, 'ai-studio-e97c649f-c50c-4cd5-8952-6640d34f2444');

const newsItems = [
  {
    category: '공지사항',
    title: '2026년 상반기 신제품 라인업 출시 안내',
    content: '태승전자는 2026년 상반기에 새로운 메인 컨트롤러 및 디스플레이 제품 라인업을 출시할 예정입니다. 신제품은 기존 제품 대비 성능이 30% 향상되었으며, 에너지 효율도 크게 개선되었습니다. 자세한 사항은 영업팀으로 문의해 주시기 바랍니다.',
    author: '관리자',
    views: 156,
    isNew: true,
    createdAt: Timestamp.fromDate(new Date('2026-03-15'))
  },
  {
    category: '보도자료',
    title: '태승전자, 스마트팩토리 고도화 프로젝트 성공적 완료',
    content: '태승전자가 2년간 진행해온 스마트팩토리 고도화 프로젝트를 성공적으로 완료했습니다. 이번 프로젝트를 통해 생산 효율성이 40% 향상되었으며, 불량률은 기존 대비 60% 감소했습니다. AI 기반 품질 검사 시스템과 IoT 센서 네트워크를 통합하여 실시간 생산 모니터링이 가능해졌습니다.',
    author: '홍보팀',
    views: 89,
    isNew: false,
    createdAt: Timestamp.fromDate(new Date('2026-02-28'))
  },
  {
    category: '공지사항',
    title: 'ISO 14001 환경경영시스템 인증 갱신',
    content: '태승전자는 ISO 14001:2015 환경경영시스템 인증을 성공적으로 갱신하였습니다. 이번 심사에서는 환경 관리 체계의 우수성을 인정받아 무결점으로 통과했습니다. 앞으로도 환경 보호와 지속 가능한 경영에 최선을 다하겠습니다.',
    author: '관리자',
    views: 67,
    isNew: false,
    createdAt: Timestamp.fromDate(new Date('2026-01-10'))
  },
  {
    category: '보도자료',
    title: '태승전자, CES 2026 참가 - 차세대 디스플레이 솔루션 공개',
    content: '태승전자가 CES 2026에 참가하여 차세대 산업용 디스플레이 솔루션을 공개했습니다. 이번에 선보인 제품은 초고해상도 산업용 터치 디스플레이로, 극한 환경에서도 안정적으로 작동하는 것이 특징입니다.',
    author: '홍보팀',
    views: 203,
    isNew: false,
    createdAt: Timestamp.fromDate(new Date('2025-12-20'))
  },
  {
    category: '이벤트',
    title: '2025년 하반기 협력사 기술 세미나 개최',
    content: '태승전자는 협력사를 대상으로 최신 기술 동향 및 제품 활용 세미나를 개최합니다. 메인 컨트롤러의 새로운 기능과 디스플레이 솔루션의 활용 사례를 공유할 예정입니다. 많은 참여 부탁드립니다.',
    author: '관리자',
    views: 45,
    isNew: false,
    createdAt: Timestamp.fromDate(new Date('2025-11-15'))
  },
  {
    category: '공지사항',
    title: '본사 이전 안내 (2025년 10월)',
    content: '태승전자 본사가 경기도 안양시 동안구 엘에스로 91번길 16-39로 이전하였습니다. 방문 시 참고 부탁드리며, 전화번호 및 팩스번호는 변경 없이 기존과 동일합니다.',
    author: '관리자',
    views: 312,
    isNew: false,
    createdAt: Timestamp.fromDate(new Date('2025-10-01'))
  }
];

async function seedNews() {
  console.log('🔥 Firestore 뉴스 데이터 시드 시작...');
  const newsCol = collection(db, 'news');
  
  for (const item of newsItems) {
    try {
      const docRef = await addDoc(newsCol, item);
      console.log(`✅ "${item.title}" → ${docRef.id}`);
    } catch (error) {
      console.error(`❌ "${item.title}" 실패:`, error.message);
    }
  }
  
  console.log('\n🎉 시드 완료!');
  process.exit(0);
}

seedNews();
