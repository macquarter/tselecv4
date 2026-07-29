import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import ko from '../locales/ko.json';
import en from '../locales/en.json';
import zh from '../locales/zh.json';
import ja from '../locales/ja.json';
import vi from '../locales/vi.json';
import extra from '../locales/extra';

// 깊은 병합: 기존 로케일 + 최근 추가 번역(extra)
function deepMerge(base: any, add: any): any {
  const out: any = { ...base };
  for (const k of Object.keys(add || {})) {
    if (add[k] && typeof add[k] === 'object' && !Array.isArray(add[k]) && base?.[k] && typeof base[k] === 'object' && !Array.isArray(base[k])) {
      out[k] = deepMerge(base[k], add[k]);
    } else {
      out[k] = add[k];
    }
  }
  return out;
}

// ko 번역 구성: 기존 로케일 + extra 병합 후, expertise 제목만 최신(5대)으로 강제.
// Firestore가 런타임에 다시 덮어쓰기 전에도 첫 페인트부터 5대로 보이므로 4대→5대 깜빡임이 사라진다.
const koRes = deepMerge(ko, (extra as any).ko);
if (koRes && koRes.expertise) {
  koRes.expertise.t1 = '가전·산업·의료·신재생·스마트IoT';
  koRes.expertise.t2 = '5대 핵심 산업을 위한 맞춤형 솔루션';
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      ko: { translation: koRes },
      en: { translation: deepMerge(en, (extra as any).en) },
      zh: { translation: deepMerge(zh, (extra as any).zh) },
      ja: { translation: deepMerge(ja, (extra as any).ja) },
      vi: { translation: deepMerge(vi, (extra as any).vi) },
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
