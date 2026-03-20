import { getTypedObjectKeys, getTypedObjectValues } from "@/feature/customFeature/object/objectParse";
import { WeaponType } from "@/global/type/appType";
import { ElementSettingType, SelectedWeaponAdvanceSettingType, WeaponAdvanceSettingType } from "@/global/type/extendedType";

export function getAdvanceWeaponObject(weaponList: WeaponType[], weaponSetting: WeaponAdvanceSettingType) {
  const advanceSetting: SelectedWeaponAdvanceSettingType = {};

  weaponList.forEach((weapon) => {
    const elementAdvanceSetting: Partial<ElementSettingType> = {};
    const elementList = getTypedObjectKeys(weaponSetting[weapon]);

    elementList.forEach((element) => {
      const advanceList = getTypedObjectValues(weaponSetting[weapon][element])
      if (advanceList.some(advance => advance === true)) {
        Object.assign(elementAdvanceSetting, {[element]: weaponSetting[weapon][element]})
      }
    });

    Object.assign(advanceSetting, {[weapon]: elementAdvanceSetting})
  });

  return advanceSetting;
}