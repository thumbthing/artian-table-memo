import { URL_PARAM_LIST } from '@/global/data/appData';
import { ReadonlyURLSearchParams } from 'next/navigation';

const TARRED_DEVICE_PARAM_REGEX = /^attack:\d+\|affinity:\d+\|element:\d+$/g

const WEAPON_SETTING_MAX_RANGE = 16_383;
const WEAPON_SETTING_MIN_RANGE = 1;

const WEAPON_ELEMENT_ADVANCE_MAX_RANGE = 0;
const WEAPON_ELEMENT_ADVANCE_MIN_RANGE = 1;

// tarred-device=attack:1|affinity:2|element:3
// &weapon=8208
// &advance=gs-786432|cb-1536

export function pickValidateUrlParam(searchParam: ReadonlyURLSearchParams) {
  const validateParam = URL_PARAM_LIST.map((paramKey) => {
    return {
      [paramKey]: searchParam.get(paramKey)
    }
  });

  return validateParam;
}

// TODO: 정규식 flag 정리
// https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Regular_expressions#%ED%94%8C%EB%9E%98%EA%B7%B8%EB%A5%BC_%ED%99%9C%EC%9A%A9%ED%95%9C_%EA%B3%A0%EA%B8%89_%ED%83%90%EC%83%89
// /d : 부분 문자열 일체에 대해 인덱스 생성
// /g : 전역 탐색
// /i : 대소문자를 구분하지 않음
// /m : 여러 줄에 걸쳐 탐색
// /s : 개행 문자가 '.' 과 일치함
// /u : 'unicode' 패턴을 유니코드 코드 포인트의 시퀀스로 간주
// /y : '접착' 탐색, 대상 문자열의 현재 위치에서 탐색을 시작함
