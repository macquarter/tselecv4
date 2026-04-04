import { Link } from 'react-router-dom';
import { useText } from '../contexts/SiteContentContext';

export default function Footer() {
  const logo1 = useText('logo-1', 'TSE');
  const logo2 = useText('logo-2', 'LEC');
  const ftD = useText('ft-d', '1989년 설립 이래 마이크로컨트롤러 설계·제조 전문 기업으로 가전, 의료, 태양광 분야의 신뢰할 수 있는 전자부품 파트너입니다.');
  const ftC1 = useText('ft-c1', '회사소개');
  const ftC2 = useText('ft-c2', '제품소개');
  const ftC3 = useText('ft-c3', '고객지원');
  const ftCp = useText('ft-cp', '© 2026 태승전자(주) TSELEC Co., Ltd. All rights reserved.');
  const ftB1 = useText('ft-b1', 'ISO 9001');
  const ftB2 = useText('ft-b2', 'CE');
  const ftB3 = useText('ft-b3', 'KC');

  return (
    <footer className="bg-black border-t border-white/10 pt-12 md:pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 mb-12 md:mb-16">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="inline-block mb-6">
              <div className="flex flex-col leading-[0.85] font-black text-[20px] tracking-[-0.12em] uppercase text-white">
                <span>{logo1}</span>
                <span>{logo2}</span>
              </div>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed">
              {ftD}
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-bold tracking-widest uppercase text-white mb-6">{ftC1}</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><Link to="/greeting" className="hover:text-white transition-colors">인사말</Link></li>
              <li><Link to="/history" className="hover:text-white transition-colors">회사연혁</Link></li>
              <li><Link to="/certifications" className="hover:text-white transition-colors">인증현황</Link></li>
              <li><Link to="/directions" className="hover:text-white transition-colors">오시는 길</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold tracking-widest uppercase text-white mb-6">{ftC2}</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><Link to="/main-controller" className="hover:text-white transition-colors">메인 컨트롤러</Link></li>
              <li><Link to="/display" className="hover:text-white transition-colors">디스플레이</Link></li>
              <li><Link to="/others" className="hover:text-white transition-colors">기타</Link></li>
              <li><Link to="/process" className="hover:text-white transition-colors">공정도</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold tracking-widest uppercase text-white mb-6">{ftC3}</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><Link to="/news" className="hover:text-white transition-colors">뉴스 & 공지사항</Link></li>
              <li><Link to="/downloads" className="hover:text-white transition-colors">자료실</Link></li>
              <li><Link to="/#contact" className="hover:text-white transition-colors">문의하기</Link></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10 text-xs text-gray-600">
          <div>{ftCp}</div>
          <div className="flex gap-4 mt-4 md:mt-0">
            <span className="px-3 py-1 rounded-full border border-white/10 text-gray-400">{ftB1}</span>
            <span className="px-3 py-1 rounded-full border border-white/10 text-gray-400">{ftB2}</span>
            <span className="px-3 py-1 rounded-full border border-white/10 text-gray-400">{ftB3}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
