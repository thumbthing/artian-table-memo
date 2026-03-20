import { createAdvanceParamByWeaponList, createAdvanceSettingBinaryList, createWeaponBinaryList, createWeaponParamByAdvanceList } from "@/feature/parse/urlParam/encodeUrlParam";
import { WEAPON_CODE, WEAPON_LIST } from "@/global/data/appData";
import { ROUTE } from "@/global/data/routeData";

type ValidateResultType = {
  error: boolean,
  param: string,
}



export default class UrlParamError {
  public message: string;
  public weapon: ValidateResultType;
  public advance: ValidateResultType;

  constructor(message: string, weaponValidateResult: ValidateResultType, advanceValidateResult: ValidateResultType) {
    this.message = message;
    this.weapon = weaponValidateResult;
    this.advance = advanceValidateResult;
  }

  getReplaceUrl() {
    const location = window.location.origin;
    const advanceSettingPath = `${location}${ROUTE.advanceSetting}`

    if ((this.weapon.error == true && this.advance.error === true) || (this.weapon.param === "0" && this.advance.error === true)) {
      return location;
    }

    if (this.weapon.error && !this.advance.error) {
      // advance 문자열로 weapon code 생성
      const advanceParamList = createAdvanceSettingBinaryList(this.advance.param);
      const advanceWeaponList = advanceParamList.map(([weaponCode, binaryList]) => {
        const index = WEAPON_CODE.indexOf(weaponCode);
        return WEAPON_LIST[index]
        }
      )
      const weaponParam = createWeaponParamByAdvanceList(advanceWeaponList);

      return `${advanceSettingPath}?weapon=${weaponParam}&advance=${this.advance.param}`;
    }

    if (!this.weapon.error && this.advance.error) {
      const weaponBinaryList = createWeaponBinaryList(this.weapon.param);
      const advanceParam = createAdvanceParamByWeaponList(weaponBinaryList);
      
      return `${advanceSettingPath}?weapon=${this.weapon.param}&advance=${advanceParam}`
    }

    return `${advanceSettingPath}?weapon=${this.weapon.param}&advance=${this.advance.param}`
  }
}