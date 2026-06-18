interface Props {
  className?: string;
}

/** 태승전자 TS 로고 (빨강 T + 파랑 S). CMS logo-img 미설정 시 기본 로고로 사용. */
export default function BrandLogo({ className = 'h-10 w-auto' }: Props) {
  return (
    <svg
      className={className}
      viewBox="0 0 140 84"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="TSELEC"
    >
      {/* T (red) */}
      <path d="M6 12 H84 V31 H55 V72 H35 V31 H6 Z" fill="#E2231A" />
      {/* S (blue) */}
      <path
        d="M126 31 C126 17 113 10 97 10 C79 10 68 19 68 32 C68 45 83 49 97 52 C108 54.5 122 57 122 69 C122 82 106 76 96 71"
        stroke="#1E50A2"
        strokeWidth="17"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
