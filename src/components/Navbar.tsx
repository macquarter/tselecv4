import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useText, useImage } from '../contexts/SiteContentContext';
import tsLogo from '../assets/tsLogo';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navbar() {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const location = useLocation();

  const logo1 = useText('logo-1', 'TSE');
  const logo2 = useText('logo-2', 'LEC');
  const cmsLogo = useImage('logo-img', '');
  // 실제 업로드(Storage http URL)일 때만 CMS 값 사용, 그 외엔 번들된 투명 로고(흰 배경 제거본)
  const logoSrc = /^(https?:\/\/|data:image\/)/.test(cmsLogo) ? cmsLogo : tsLogo;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const navLinks = [
    {
      name: t('nav.company'),
      href: '/greeting',
      dropdown: [
        { name: t('nav.greeting'), href: '/greeting' },
        { name: t('nav.organization'), href: '/organization' },
        { name: t('nav.history'), href: '/history' },
        { name: t('nav.certifications'), href: '/certifications' },
        { name: t('nav.directions'), href: '/directions' },
      ]
    },
    {
      name: t('nav.business'),
      href: '/business',
      dropdown: [
        { name: t('nav.homeAppliance'), href: '/business/home-appliance' },
        { name: t('nav.industrial'), href: '/business/industrial' },
        { name: t('nav.medical'), href: '/business/medical' },
        { name: t('nav.renewable'), href: '/business/renewable' },
      ]
    },
    {
      name: t('nav.products'),
      href: '/products',
      dropdown: [
        { name: t('nav.embedded'), href: '/main-controller' },
        { name: t('nav.hmi'), href: '/display' },
        { name: t('nav.custom'), href: '/others' },
        { name: t('nav.process'), href: '/process' },
      ]
    },
    {
      name: t('nav.support'),
      href: '/news',
      dropdown: [
        { name: t('nav.news'), href: '/news' },
        { name: t('nav.downloads'), href: '/downloads' },
        { name: t('nav.contact'), href: '/contact' },
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
          <Link to="/" className="flex items-center gap-2" data-cms-img-key="logo-img">
            <img src={logoSrc} alt={logo1+logo2} className="h-[1.8rem] w-auto object-contain" />
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

                {link.dropdown && (
                  <AnimatePresence>
                    {activeDropdown === link.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-16 left-1/2 -translate-x-1/2 min-w-[150px] bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/10 rounded-xl p-1.5 shadow-2xl"
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
                              className="block px-3 py-2 text-[0.84rem] whitespace-nowrap rounded-lg transition-all text-gray-400 hover:bg-white/5 hover:text-white hover:pl-5"
                            >
                              {dropLink.name}
                            </Link>
                          ) : (
                            <Link
                              key={dropLink.name}
                              to={dropLink.href}
                              className={`block px-3 py-2 text-[0.84rem] whitespace-nowrap rounded-lg transition-all ${
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

          <div className="hidden md:flex items-center gap-3">
            <LanguageSwitcher />
            <Link
              to="/contact"
              className="px-5 py-2.5 bg-white hover:bg-gray-200 text-black text-sm font-medium rounded-lg transition-all"
            >
              {t('nav.contact')}
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
            className="fixed inset-0 z-[60] bg-[#0a0a0a]/98 backdrop-blur-xl flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 h-16 shrink-0">
              <Link to="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2" data-cms-img-key="logo-img">
                <img src={logoSrc} alt={logo1+logo2} className="h-[1.8rem] w-auto object-contain" />
              </Link>
              <div className="flex items-center gap-2">
                <LanguageSwitcher />
                <button
                  className="text-gray-400 hover:text-white p-1"
                  onClick={() => { setMobileMenuOpen(false); setMobileExpanded(null); }}
                >
                  <X size={28} />
                </button>
              </div>
            </div>

            {/* Menu Items */}
            <div className="flex-1 overflow-y-auto px-6 pt-6 pb-8">
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <div key={link.name} className="w-full">
                    {/* Category Header - Toggle Accordion */}
                    <button
                      onClick={() => setMobileExpanded(prev => prev === link.name ? null : link.name)}
                      className="w-full flex items-center justify-between py-4 border-b border-white/5"
                    >
                      <span className="text-xl font-bold text-white tracking-tight">{link.name}</span>
                      <motion.div
                        animate={{ rotate: mobileExpanded === link.name ? 180 : 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <ChevronDown size={20} className="text-gray-500" />
                      </motion.div>
                    </button>

                    {/* Dropdown Items - Animated Accordion */}
                    <AnimatePresence>
                      {link.dropdown && mobileExpanded === link.name && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div className="py-2 pl-4">
                            {link.dropdown.map((dropLink) => (
                              <Link
                                key={dropLink.name}
                                to={dropLink.href}
                                onClick={(e) => {
                                  setMobileMenuOpen(false);
                                  setMobileExpanded(null);
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
                                className={`block py-3 text-base transition-colors ${
                                  location.pathname === dropLink.href
                                    ? 'text-white font-semibold'
                                    : 'text-gray-400 active:text-white'
                                }`}
                              >
                                {dropLink.name}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>

              {/* Contact Button */}
              <div className="mt-8">
                <Link
                  to="/contact"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setMobileExpanded(null);
                  }}
                  className="block w-full text-center bg-white text-black font-semibold py-4 rounded-xl text-base"
                >
                  {t('nav.contact')}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
