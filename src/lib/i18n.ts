import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import ko from '../locales/ko.json';
import en from '../locales/en.json';
import zh from '../locales/zh.json';
import ja from '../locales/ja.json';
import vi from '../locales/vi.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      ko: { translation: ko },
      en: { translation: en },
      zh: { translation: zh },
      ja: { translation: ja },
      vi: { translation: vi },
    },
    // 디폴트 언어: 한국어 강제
    lng: 'ko',
    fallbackLng: 'ko',
    supportedLngs: ['ko', 'en', 'zh', 'ja', 'vi'],
    nonExplicitSupportedLngs: true, // en-US → en 자동 매핑
    load: 'languageOnly', // ko-KR → ko로 단순화
    interpolation: {
      escapeValue: false,
    },
    detection: {
      // localStorage에 저장된 사용자 선택값만 존중, 브라우저 언어는 무시 (한국어 디폴트 유지)
      order: ['localStorage'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },
  });

export default i18n;
