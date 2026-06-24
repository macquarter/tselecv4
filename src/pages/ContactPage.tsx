import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Contact from '../components/Contact';

/**
 * 문의하기 전용 페이지 (/contact)
 * 기존엔 /#contact 로 홈 최하단까지 길게 스크롤되던 문제를 해결.
 * 메뉴의 '문의하기'는 이 페이지로 바로 이동하며, 상단부터 표시된다.
 */
export default function ContactPage() {
  return (
    <div className="bg-black min-h-screen text-white selection:bg-white/30 selection:text-white">
      <Navbar />
      <main className="pt-16">
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
