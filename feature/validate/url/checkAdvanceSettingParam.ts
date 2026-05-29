import thumbthingLog from "@/feature/customFeature/log/customLog";
import { getTypedObjectValues } from "@/feature/customFeature/object/objectParse";
import AdvanceSettingParamError from "@/feature/error/customError/AdvanceSettingParamError";
import { getParamAdvanceSetting } from "@/feature/parse/decode/decodeUrlParam";
import { URL_CODE } from "@/global/data/appData";

export default function checkAdvanceSettingParam(advanceParamString: string | null) {
  const defindedAdvanceParam = checkIsParamNull(advanceParamString);
  const filledAdvanceParam = checkIsParamEmpty(defindedAdvanceParam);
  checkIsParamValueDigit(filledAdvanceParam);

  const {weaponCodeList, settingDigitList} = getParamAdvanceSetting(filledAdvanceParam);
  checkAdvanceParamUnique(weaponCodeList);
  checkWeaponCodeValid(weaponCodeList);
  checkIsParamInRange(settingDigitList);
}

// 설정이 되지 않은 param 처리

// weapon, advance param 존재 유무
function checkIsParamNull(param: string | null) {
  if (param === null) {
    throw new AdvanceSettingParamError("UPE-PN")
  }

  return param as string;
}

// weapon, advance param 내의 값이 존재하는지
function checkIsParamEmpty(param: string) {
  if (param === "") {
    throw new AdvanceSettingParamError("UPE-PE")
  }

  return param;
}

// param의 값이 숫자 형태인지
function checkIsParamValueDigit(param: string) {
  const weaponCodeString = getTypedObjectValues(URL_CODE).join("|");
  const REGEX_UNIT = `(${weaponCodeString})-\\d{1,10}`;
  const ADVANCE_PARAM_REGEX = new RegExp(`^${REGEX_UNIT}(?:\\\|${REGEX_UNIT}){0,13}$`);
  const isValid = ADVANCE_PARAM_REGEX.test(param);
  
  if (isValid === false) {
    throw new AdvanceSettingParamError("UPE-PD")
  }
}

// advanceParam의 값에 중복된 값이 존재하는지
function checkAdvanceParamUnique(weaponCodeList: string[]) {
  const uniqueAdvanceSettingList = new Set(weaponCodeList);

  if (weaponCodeList.length !== uniqueAdvanceSettingList.size) {
    throw new AdvanceSettingParamError("UPE-WCU")
  }
}

// advanceParam에 지정하지 않은 세팅 정보가 존재하는 경우
function checkWeaponCodeValid(weaponCodeList: string[]) {
  const urlCodeList = getTypedObjectValues(URL_CODE);
  const urlCodeListLength = urlCodeList.length;

  const uniqueWeaponCode = new Set(urlCodeList.concat(weaponCodeList));

  if (uniqueWeaponCode.size !== urlCodeListLength) {
    throw new AdvanceSettingParamError("UPE-WC")
  }
}

// param의 값이 범위 내인지
function isParamInRange(paramValue: number, min: number, max: number) {
  if (paramValue >= min && paramValue <= max) return true;
  return false;
}

function checkIsParamInRange(param: string | string[]) {
  const paramValueRange = {
    min: 1,
    max: 1073741823
  }

  const min = paramValueRange.min;
  const max = paramValueRange.max;

  const advanceParam = param as string[];
  const isValidRange = advanceParam.map((paramValue) => Number(paramValue))
                                  .every((paramValue) => isParamInRange(paramValue, min, max))

  if (isValidRange === false) throw new AdvanceSettingParamError("UPE-PR")
}



