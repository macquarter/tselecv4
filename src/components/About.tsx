import { motion } from 'motion/react';
import { useVideo } from '../contexts/SiteContentContext';
import { useTranslation } from 'react-i18next';

/**
 * 홈페이지 About 섹션 — "기술로 신뢰를 쌓아온 36년의 역사."
 * useText(Firebase override)를 제거하고 i18n의 t()를 단일 출처로 사용.
 * 언어 전환 시 본문이 즉시 변경됩니다.
 */
export default function About() {
  const _aboutVid = useVideo('about.video', '/about-video.mp4');
  // Cache-buster: the reframed hero video ships at the same static path
  // (/about-video.mp4), so append a version query to force clients + Vercel CDN
  // to fetch the newly-cropped file instead of a stale cached copy.
  const aboutVidSrc = _aboutVid.includes('?') ? _aboutVid : `${_aboutVid}?v=drone20260724`;
  const { t } = useTranslation();

  const stats = [
    { label: t('about.stat0l'), value: t('about.stat0v') },
    { label: t('about.stat1l'), value: t('about.stat1v') },
    { label: t('about.stat2l'), value: t('about.stat2v') },
    { label: t('about.stat3l'), value: t('about.stat3v') },
  ];

  return (
    <section id="about" className="py-16 md:py-32 bg-black relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          <div className="order-2 lg:order-1">
            <motion.h2
              className="text-4xl md:text-6xl font-bold tracking-tighter mb-8 leading-tight text-white break-keep"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {t('about.kicker')} <br />
              <span className="text-gray-500">{t('about.title')}</span>
            </motion.h2>

            <motion.p
              className="text-base md:text-xl text-gray-400 leading-relaxed font-light mb-8 md:mb-12"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              {t('about.desc')}
            </motion.p>

            <div className="grid grid-cols-2 gap-8">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }}
                >
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-500 font-medium tracking-wide">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            className="order-1 lg:order-2 relative h-[250px] md:h-[600px] rounded-2xl md:rounded-3xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <video
              src={aboutVidSrc}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
            <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10">
              <div className="text-gray-400 text-sm font-semibold tracking-widest uppercase mb-2">
                {t('about.smartLabel')}
              </div>
              <div className="text-2xl font-bold text-white">{t('about.smartTitle')}</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
