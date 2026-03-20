import thumbthingLog from "@/feature/customFeature/log/customLog";
import UrlParamError from "@/feature/error/customError/UrlParamError";
import UrlParamNullError from "@/feature/error/customError/UrlParamNullError";
import { URL_CODE } from "@/global/data/appData";
import { error } from "console";

type ParamType = string | null;

type UrlParamType = {
  weapon: ParamType,
  advance: ParamType
}

type checkResultType = {
  error: boolean,
  param: string
}

type ValidateParamType = {
  weapon: string,
  advance: string
}

type ParamKey = "weapon" | "advance";

const RANGE = {
  weapon: {
    min: 0,
    max: 16383
  },
  advance: {
    min: 0,
    max: 1073741823
  }
}
// param 자체의 문자열 체크
function checkPrimitiveParamString() {
  const paramString = window.location.search;

  const ALL_EMPTY_PARAM_REGEX = /^\?weapon=(?:0)?&advance=$/g;

  const isError = ALL_EMPTY_PARAM_REGEX.test(paramString);

  if (isError) {
    const weapon = {
      error: true,
      param: ""
    };
    const advance = {
      error: true,
      param: ""
    };

    throw new UrlParamError('URL : all empty param', weapon, advance)
  }
  
  return paramString;
}

function getArtianParam(paramString: string) {
  // const location = window.location.search;
  const searchParam = new URLSearchParams(paramString);

  const weaponParam = searchParam.get("weapon");
  const advanceParam = searchParam.get("advance");

  if (weaponParam === null || advanceParam === null) {
    throw new UrlParamNullError(weaponParam, advanceParam);
  }

  const urlParam: UrlParamType = {
    weapon: weaponParam,
    advance: advanceParam
  };

  return urlParam;
}


function checkEmptyParam(urlParam: ParamType) {
  let error = urlParam === null ? true : false;
  let param = urlParam === null ? "" : urlParam;
  // let param = urlParam === null || urlParam === "" ? DEFAULT_SETTING : urlParam;

  const checkResult: checkResultType = {
    error,
    param
  }

  return checkResult;
}

function validateEmptyParam(urlParam: UrlParamType) {
  const weapon = checkEmptyParam(urlParam.weapon);
  const advance = checkEmptyParam(urlParam.advance);

  if (weapon.error || advance.error) {
    throw new UrlParamError(`[ URL/weapon: ${weapon.error}, URL/advance: ${advance.error} ] : param is empty`, weapon, advance)
  }

  return {
    weapon: weapon.param,
    advance: advance.param
  }
}

// 정규식 생성
function getParamRegExp(paramKey: ParamKey) {
  if (paramKey === "weapon") {
    const WEAPON_PARAM_REGEX = /^\d{1,5}$/;
    return WEAPON_PARAM_REGEX
  }

  if (paramKey === "advance") {
    const weaponCode = Object.values(URL_CODE).join("|");
    const REGEX_UNIT = `(${weaponCode})-\\d{1,10}`
    const ADVANCE_PARAM_REGEX = new RegExp(`^${REGEX_UNIT}(?:\\\|${REGEX_UNIT}){0,13}$`)
    return ADVANCE_PARAM_REGEX;
  }

  throw new Error(" URL : param key is invalid")
}

function checkParamPattern(paramKey: ParamKey ,urlParam: string) {
  const PARAM_REGEX = getParamRegExp(paramKey);
  const isValid = PARAM_REGEX.test(urlParam);
  const param = urlParam;
  // const param = isValid ? urlParam : DEFAULT_SETTING

  const checkResult = {
    error: !isValid,
    param
  }

  return checkResult;
}

function validateParamPattern(urlParam: ValidateParamType) {
  const weapon = checkParamPattern("weapon", urlParam.weapon);
  const advance = checkParamPattern("advance", urlParam.advance);

  if (weapon.error || advance.error) {
    thumbthingLog('weaponError : ', weapon.error)
    thumbthingLog('advanceError : ', advance.error)
    throw new UrlParamError("[ URL ] : param pattern error", weapon, advance);
  }

  return {
    weapon: weapon.param,
    advance: advance.param
  }
}

function checkAdvanceParamUnique(urlParam: ValidateParamType) {
  const advanceList = urlParam.advance.split("|")
                                      .map((param) => {
                                        const [code, setting] = param.split("-");
                                        return code
                                      });

  const uniqueAdvanceList = new Set(advanceList)

  if (advanceList.length !== uniqueAdvanceList.size) {
    const weapon = {
      error: false,
      param: urlParam.weapon,
    }

    const advance = {
      error: true,
      param: urlParam.advance,
    }
    throw new UrlParamError("[ URL ] : advance param not unique", weapon, advance);
  }
}

function checkParamRange(paramKey: ParamKey, urlParam: string) {
  const param = Number(urlParam);
  let error = false;

  if (param < RANGE[paramKey]["min"] || param > RANGE[paramKey]["max"]) {
    error = true;
  }

  const checkResult = {
    error,
    param: urlParam
  }

  return checkResult
}

function checkAdvanceParamRange(paramKey: ParamKey, urlParam: string) {
  let error = false;
  const advanceParam = urlParam
                          .split("|")
                          .map((unit) => {
                            const [code, setting] = unit.split("-");
                            const num = Number(setting);

                            if (num < RANGE[paramKey]["min"] || num > RANGE[paramKey]["max"]) {
                              if (error === false) {
                                error = true;
                              }
                              return `${code}-${0}`;
                            }
                            return unit
                          })
                          .join("|");
  
  const checkResult = {
    error,
    param: advanceParam
  }

  return checkResult
}

function validateParamRange(urlParam: ValidateParamType) {
  const weapon = checkParamRange("weapon", urlParam.weapon);
  const advance = checkAdvanceParamRange("advance", urlParam.advance);

  if (weapon.error || advance.error) {
    throw new UrlParamError("[ URL ] : param out of range", weapon, advance);
  }

  return {
    weapon: weapon.param,
    advance: advance.param
  }
}

// 모든 무기 선택, 화속성
// ?weapon=16383&advance=gs-536870912|ls-536870912|ss-536870912|db-536870912|hm-536870912|hh-536870912|lc-536870912|gl-536870912|sa-536870912|cb-536870912|ig-536870912|lb-536870912|hb-536870912|bw-536870912
// 11_111_111_111_111
// 유효한 범위 : 1 ~ 16383
// param => binary => 10진수
// advance 0 ~ 1073741823

export default function checkUrlParam() {
  const paramString = checkPrimitiveParamString()
  const urlParam = getArtianParam(paramString);
  const emptyValidUrlParam = validateEmptyParam(urlParam);
  const patternValidUrlParam = validateParamPattern(emptyValidUrlParam);
  checkAdvanceParamUnique(patternValidUrlParam);
  const rangeValidUrlParam = validateParamRange(patternValidUrlParam);
  return rangeValidUrlParam
}