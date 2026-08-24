// 목록 문자열의 줄 나눔 제어.
// 한 줄에 들어가지 않는 목록은 구분자 뒤에서만 접혀야 한다:
//  - 항목 안 공백을 NBSP 로 묶지 않으면 'paired bootstrap' 이 두 줄로 갈라진다.
//  - 구분점(·) 앞 공백을 묶지 않으면 다음 줄이 '· OOF 스태킹' 처럼 구분점으로 시작한다.
// 쉼표는 앞 항목에 붙어 있어 이런 처리가 필요 없다 (`.join(', ')` 그대로 쓴다).

const NBSP = ' ';

export const noBreakInside = (item: string) => item.replaceAll(' ', NBSP);

export const joinWithDot = (items: string[]) => items.map(noBreakInside).join(`${NBSP}· `);
