import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useText, useImage } from '../contexts/SiteContentContext';

interface FooterProps {
  /** 페이지 고유 메타 라벨 (예: "Manufacturing Process · v6.0 · ISO 9001 인증 라인"). */
  pageBadge?: string;
}

export default function Footer({ pageBadge }: FooterProps) {
  const { t } = useTranslation();
  const logo1 = useText('logo-1', 'TSE');
  const logo2 = useText('logo-2', 'LEC');
  const logoImg = useImage('logo-img', '');
  const ftB1 = useText('ft-b1', 'ISO 9001');
  const ftB2 = useText('ft-b2', 'CE');
  const ftB3 = useText('ft-b3', 'KC');

  return (
    <footer className="bg-black border-t border-white/10 pt-12 md:pt-20 pb-10 font-sans">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8 mb-12 md:mb-16">
          <div className="col-span-2">
            <Link to="/" className="inline-block mb-6" data-cms-img-key="logo-img">
              {logoImg ? (
                <img src={logoImg} alt={logo1+logo2} className="h-8 w-auto object-contain" />
              ) : (
                <div className="flex flex-col leading-[0.85] font-black text-[20px] tracking-[-0.12em] uppercase text-white">
                  <span>{logo1}</span>
                  <span>{logo2}</span>
                </div>
              )}
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed">
              {t('footer.description')}
            </p>
          </div>

          <div>
            <h4 className="text-sm font-bold tracking-widest uppercase text-white mb-6">{t('footer.company')}</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><Link to="/greeting" className="hover:text-white transition-colors">{t('nav.greeting')}</Link></li>
              <li><Link to="/history" className="hover:text-white transition-colors">{t('nav.history')}</Link></li>
              <li><Link to="/certifications" className="hover:text-white transition-colors">{t('nav.certifications')}</Link></li>
              <li><Link to="/directions" className="hover:text-white transition-colors">{t('nav.directions')}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold tracking-widest uppercase text-white mb-6">{t('footer.business')}</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><Link to="/business/home-appliance" className="hover:text-white transition-colors">{t('nav.homeAppliance')}</Link></li>
              <li><Link to="/business/industrial" className="hover:text-white transition-colors">{t('nav.industrial')}</Link></li>
              <li><Link to="/business/medical" className="hover:text-white transition-colors">{t('nav.medical')}</Link></li>
              <li><Link to="/business/renewable" className="hover:text-white transition-colors">{t('nav.renewable')}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold tracking-widest uppercase text-white mb-6">{t('footer.products')}</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><Link to="/main-controller" className="hover:text-white transition-colors">{t('nav.embedded')}</Link></li>
              <li><Link to="/display" className="hover:text-white transition-colors">{t('nav.hmi')}</Link></li>
              <li><Link to="/others" className="hover:text-white transition-colors">{t('nav.custom')}</Link></li>
              <li><Link to="/process" className="hover:text-white transition-colors">{t('nav.process')}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold tracking-widest uppercase text-white mb-6">{t('footer.support')}</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><Link to="/news" className="hover:text-white transition-colors">{t('nav.news')}</Link></li>
              <li><Link to="/downloads" className="hover:text-white transition-colors">{t('nav.downloads')}</Link></li>
              <li><Link to="/#contact" className="hover:text-white transition-colors">{t('nav.contact')}</Link></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10 text-xs text-gray-600 gap-4">
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3">
            <span>{t('footer.copyright')}</span>
            {pageBadge && (
              <>
                <span className="hidden md:inline text-gray-700">·</span>
                <span className="text-gray-500 font-sans tracking-wide">{pageBadge}</span>
              </>
            )}
          </div>
          <div className="flex gap-4">
            <span className="px-3 py-1 rounded-full border border-white/10 text-gray-400">{ftB1}</span>
            <span className="px-3 py-1 rounded-full border border-white/10 text-gray-400">{ftB2}</span>
            <span className="px-3 py-1 rounded-full border border-white/10 text-gray-400">{ftB3}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
