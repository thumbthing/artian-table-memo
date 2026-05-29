import { URL_CODE } from "@/global/data/appData";
import { AdvanceCodeType, WeaponType } from "@/global/type/appType";

export default function createAdvanceSettingParamList(weaponList: WeaponType[], advanceCode: AdvanceCodeType) {
  const advanceParamList = weaponList.map(weapon => {
    return `${URL_CODE[weapon]}-${advanceCode[weapon]}`
  })
  return advanceParamList;
}