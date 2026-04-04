import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const navLinks = [
    {
      name: '회사소개',
      href: '/greeting',
      dropdown: [
        { name: '인사말', href: '/greeting' },
        { name: '회사연혁', href: '/history' },
        { name: '회사전경', href: '/facility' },
        { name: '인증현황', href: '/certifications' },
        { name: '조직도', href: '/organization' },
        { name: '오시는 길', href: '/directions' },
      ]
    },
    {
      name: '제품소개',
      href: '/products',
      dropdown: [
        { name: '제품영역', href: '/products' },
        { name: '메인 컨트롤러', href: '/main-controller' },
        { name: '디스플레이', href: '/display' },
        { name: '기타', href: '/others' },
        { name: '공정도', href: '/process' },
      ]
    },
    {
      name: '고객센터',
      href: '/downloads',
      dropdown: [
        { name: '자료실', href: '/downloads' },
        { name: '문의하기', href: '/#contact' },
      ]
    },
  ];

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          isScrolled ? 'bg-black/80 backdrop-blur-md border-b border-white/10' : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex flex-col leading-[0.85] font-black text-[22px] tracking-[-0.12em] uppercase text-white">
              <span>TSE</span>
              <span>LEC</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300 tracking-wide">
            {navLinks.map((link) => (
              <div 
                key={link.name} 
                className="relative group h-16 flex items-center"
                onMouseEnter={() => setActiveDropdown(link.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link 
                  to={link.href} 
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  {link.name}
                  {link.dropdown && <ChevronDown size={14} className="opacity-50" />}
                </Link>

                {/* Dropdown */}
                {link.dropdown && (
                  <AnimatePresence>
                    {activeDropdown === link.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-16 left-1/2 -translate-x-1/2 min-w-[180px] bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/10 rounded-xl p-2 shadow-2xl"
                      >
                        {link.dropdown.map((dropLink) => (
                          dropLink.href.includes('#') ? (
                            <Link
                              key={dropLink.name}
                              to={dropLink.href}
                              onClick={(e) => {
                                const hash = dropLink.href.split('#')[1];
                                if (location.pathname === '/') {
                                  e.preventDefault();
                                  document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
                                }
                              }}
                              className={`block px-4 py-2.5 text-sm rounded-lg transition-all text-gray-400 hover:bg-white/5 hover:text-white hover:pl-5`}
                            >
                              {dropLink.name}
                            </Link>
                          ) : (
                            <Link
                              key={dropLink.name}
                              to={dropLink.href}
                              className={`block px-4 py-2.5 text-sm rounded-lg transition-all ${
                                location.pathname === dropLink.href 
                                  ? 'bg-white/10 text-white font-semibold' 
                                  : 'text-gray-400 hover:bg-white/5 hover:text-white hover:pl-5'
                              }`}
                            >
                              {dropLink.name}
                            </Link>
                          )
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </div>

          <div className="hidden md:flex">
            <Link 
              to="/#contact" 
              className="px-5 py-2.5 bg-white hover:bg-gray-200 text-black text-sm font-medium rounded-lg transition-all"
              onClick={(e) => {
                if (location.pathname === '/') {
                  e.preventDefault();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              문의하기
            </Link>
          </div>

          <button className="md:hidden text-gray-300" onClick={() => setMobileMenuOpen(true)}>
            <Menu size={24} />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-[60] bg-[#0a0a0a]/95 backdrop-blur-xl flex flex-col items-center justify-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <button
              className="absolute top-5 right-6 text-gray-400 hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X size={32} />
            </button>
            <div className="flex flex-col items-center gap-8 text-2xl font-semibold tracking-tight w-full px-8">
              {navLinks.map((link) => (
                <div key={link.name} className="flex flex-col items-center w-full">
                  <Link
                    to={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-white hover:text-gray-300 transition-colors mb-4"
                  >
                    {link.name}
                  </Link>
                  
                  {link.dropdown && (
                    <div className="flex flex-col items-center gap-4 w-full bg-white/5 rounded-2xl py-6">
                      {link.dropdown.map((dropLink) => (
                        <Link
                          key={dropLink.name}
                          to={dropLink.href}
                          onClick={(e) => {
                            setMobileMenuOpen(false);
                            if (dropLink.href.includes('#')) {
                              const hash = dropLink.href.split('#')[1];
                              if (location.pathname === '/') {
                                e.preventDefault();
                                setTimeout(() => {
                                  document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
                                }, 100);
                              }
                            }
                          }}
                          className={`text-lg transition-colors ${
                            location.pathname === dropLink.href ? 'text-white font-bold' : 'text-gray-400 hover:text-white'
                          }`}
                        >
                          {dropLink.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
