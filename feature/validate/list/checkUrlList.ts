import thumbthingLog from "@/feature/customFeature/log/customLog";
import UrlParamError from "@/feature/error/customError/UrlParamError";
import { createWeaponParamByAdvanceList } from "@/feature/parse/urlParam/encodeUrlParam";
import { WEAPON_CODE, WEAPON_LIST } from "@/global/data/appData";
import { WeaponCodeType, WeaponType } from "@/global/type/appType";
import { BinaryStringListType } from "@/global/type/extendedType";

type UrlAdvanceListType = [WeaponCodeType, BinaryStringListType[]][]

// FIXME: weapon param, advance param mismatch 

export default function checkUrlList(urlWeaponList: string[], urlAdvanceList: UrlAdvanceListType, advanceParam: string) {
  const weaponList = urlWeaponList.map((binary, index) => {
                                    if (binary === "1") {
                                      return WEAPON_LIST[index];
                                    }
                                    return binary })
                                  .filter(weapon => weapon !== "0");
  
  const advanceWeaponList = urlAdvanceList.map(([weaponCode, binaryList]) => {
    const weaponListIndex = WEAPON_CODE.indexOf(weaponCode);
    return WEAPON_LIST[weaponListIndex];
  });

  const weaponListLength = weaponList.length;
  const advanceWeaponListLength = advanceWeaponList.length;

  if (weaponListLength !== advanceWeaponListLength) {
    const weapon = {
      error: true,
      param: createWeaponParamByAdvanceList(advanceWeaponList)
    }

    const advance = {
      error: false,
      param: advanceParam
    }

    throw new UrlParamError("URL : param miss match", weapon, advance);
  }
  
  const isMatched = weaponList.every((weapon, index) => weapon === advanceWeaponList[index])
  
  if (!isMatched) {
    const weapon = {
      error: true,
      param: createWeaponParamByAdvanceList(advanceWeaponList)
    }

    const advance = {
      error: false,
      param: advanceParam
    }
    
    throw new UrlParamError("URL: param miss match", weapon, advance);
  }
}

