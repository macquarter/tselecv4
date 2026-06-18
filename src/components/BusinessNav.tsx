import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';

export default function BusinessNav() {
  const location = useLocation();
  const { t } = useTranslation();

  const links = [
    { key: 'businessAll', path: '/business' },
    { key: 'homeAppliance', path: '/business/home-appliance' },
    { key: 'industrial', path: '/business/industrial' },
    { key: 'medical', path: '/business/medical' },
    { key: 'renewable', path: '/business/renewable' },
    { key: 'smartiot', path: '/business/smart-iot' },
  ];

  return (
    <div className="flex justify-center mb-16">
      <div className="inline-flex bg-[#111] border border-white/10 rounded-full p-1.5 relative overflow-x-auto max-w-full scrollbar-hide">
        {links.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`relative px-6 py-2.5 text-sm font-medium rounded-full whitespace-nowrap transition-colors duration-300 ${
                isActive ? 'text-black' : 'text-gray-400 hover:text-white'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="active-business-nav"
                  className="absolute inset-0 bg-white rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">{t(`nav.${link.key}`)}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
