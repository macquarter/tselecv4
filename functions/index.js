/**
 * TSELEC Cloud Functions
 * enhanceAnswer — 챗봇 답변 초안(중학생 수준)을 태승전자(주) 전문 상담 톤으로 자동 고도화
 *
 * 보안: 관리자(tsadmin@tselec.co.kr) 로그인 상태에서만 호출 가능
 * AI:   Google Gemini (generativelanguage API). 키는 Secret Manager의 GEMINI_KEY로 주입.
 *
 * 배포 전 준비:
 *   1) Firebase 프로젝트 Blaze(종량제) 요금제 전환
 *   2) Gemini API 키 발급 → firebase functions:secrets:set GEMINI_KEY
 *   3) firebase deploy --only functions
 */

const { onCall, HttpsError } = require('firebase-functions/v2/https');
const { defineSecret } = require('firebase-functions/params');
const logger = require('firebase-functions/logger');

const GEMINI_KEY = defineSecret('GEMINI_KEY');

const ADMIN_EMAIL = 'tsadmin@tselec.co.kr';
const GEMINI_MODEL = 'gemini-2.0-flash';

const SYSTEM_PROMPT = `너는 태승전자(주)의 고객 상담 챗봇 답변을 다듬는 전문 에디터다.
태승전자(주)는 가전·산업용·의료기기·신재생에너지·임베디드 분야의 PCB 회로 설계 및 제어보드
개발/양산 전문 기업이다. (대표 연락처 032-329-7600)

[목표]
운영자가 입력한 거친 답변 '초안'을, 마치 숙련된 영업·기술 상담원이 작성한 것처럼
전문적이고 신뢰감 있게 재작성한다.

[규칙]
1. 초안에 담긴 사실/수치/조건은 절대 바꾸거나 새로 지어내지 않는다. 표현만 전문적으로 다듬는다.
   - 초안에 없는 구체 수치(가격, 기간, MOQ 등)를 임의로 추가하지 말 것.
2. 정중한 '~합니다/~됩니다' 체의 한국어 비즈니스 문체를 사용한다.
3. 핵심을 먼저 제시하고, 필요한 경우 2~4개의 짧은 항목으로 구조화한다.
4. 과장·홍보성 미사여구는 피하고, 담백하고 명확하게 쓴다.
5. 길이는 초안 대비 과도하게 늘리지 않는다(보통 2~5문장 또는 짧은 목록).
6. 추가 안내가 자연스러우면 마지막에 영업팀 문의(032-329-7600)를 1회만 덧붙일 수 있다.
7. 출력은 '다듬어진 답변 본문'만 낸다. 머리말·설명·따옴표·마크다운 코드블록 없이.`;

exports.enhanceAnswer = onCall(
  { region: 'asia-northeast3', secrets: [GEMINI_KEY], cors: true, maxInstances: 5 },
  async (request) => {
    // 1) 관리자 인증 확인
    const email = (request.auth && request.auth.token && request.auth.token.email) || '';
    if (email.toLowerCase() !== ADMIN_EMAIL) {
      throw new HttpsError('permission-denied', '관리자만 사용할 수 있습니다.');
    }

    // 2) 입력 검증
    const keywords = (request.data && request.data.keywords ? String(request.data.keywords) : '').trim();
    const draft = (request.data && request.data.draft ? String(request.data.draft) : '').trim();
    if (!draft) {
      throw new HttpsError('invalid-argument', '고도화할 답변 초안(draft)이 필요합니다.');
    }

    const userPrompt =
      `[질문 키워드] ${keywords || '(미지정)'}\n` +
      `[답변 초안]\n${draft}\n\n` +
      `위 초안을 규칙에 따라 전문 상담 톤으로 재작성한 답변 본문만 출력해줘.`;

    // 3) Gemini 호출
    const url =
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent` +
      `?key=${GEMINI_KEY.value()}`;

    let resp;
    try {
      resp = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents: [{ role: 'user', parts: [{ text: userPrompt }] }],
          generationConfig: { temperature: 0.4, topP: 0.9, maxOutputTokens: 1024 },
        }),
      });
    } catch (e) {
      logger.error('Gemini fetch 실패', e);
      throw new HttpsError('unavailable', 'AI 서버에 연결하지 못했습니다.');
    }

    if (!resp.ok) {
      const body = await resp.text().catch(() => '');
      logger.error('Gemini 응답 오류', resp.status, body);
      throw new HttpsError('internal', `AI 응답 오류 (${resp.status}).`);
    }

    const json = await resp.json().catch(() => null);
    const answer =
      json &&
      json.candidates &&
      json.candidates[0] &&
      json.candidates[0].content &&
      json.candidates[0].content.parts &&
      json.candidates[0].content.parts[0] &&
      json.candidates[0].content.parts[0].text;

    if (!answer || !answer.trim()) {
      logger.error('Gemini 빈 응답', JSON.stringify(json));
      throw new HttpsError('internal', 'AI가 빈 응답을 반환했습니다.');
    }

    return { answer: answer.trim() };
  }
);
