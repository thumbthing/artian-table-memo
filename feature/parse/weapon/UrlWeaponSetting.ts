import thumbthingLog from "@/feature/customFeature/log/customLog";
import { ELEMENT_LIST, WEAPON_CODE, WEAPON_LIST } from "@/global/data/appData";
import { WeaponType } from "@/global/type/appType";
import { ElementSettingType, BinaryStringType, WeaponAdvanceSettingType, AdvanceBinaryTupleList } from "@/global/type/extendedType";
import { getDefaultWeaponAdvanceSetting } from "../object/getDefaultWeaponAdvanceSetting";

type UrlElementSettingType = Partial<ElementSettingType>
type UrlWeaponSettingType = Partial<Record<WeaponType, UrlElementSettingType>>;

function isAdvanceSetting(bianaryList: BinaryStringType[]) {
  const uniqueList = new Set(bianaryList);
  const isSetting = !(uniqueList.size === 1 && uniqueList.has("0"));
  return isSetting
}

export function createAdvanceState(urlAdvanceList: AdvanceBinaryTupleList) {
  const initialWeaponSetting = getDefaultWeaponAdvanceSetting();

  urlAdvanceList.forEach((advanceSetting) => {
    const [weapon, setting] = [...advanceSetting];
    const weaponKey = WEAPON_LIST[WEAPON_CODE.indexOf(weapon)];

    setting.forEach((bianaryList, index) => {
      const isSetting = isAdvanceSetting(bianaryList);

      if (isSetting) {
        const elementKey = ELEMENT_LIST[index];
        const advanceSetting = {
          attack: bianaryList[0] === "1" ? true : false,
          affinity: bianaryList[1] === "1" ? true : false,
          element: bianaryList[2] === "1" ? true : false
        }

        initialWeaponSetting[weaponKey][elementKey].attack = advanceSetting.attack;
        initialWeaponSetting[weaponKey][elementKey].affinity = advanceSetting.affinity;
        initialWeaponSetting[weaponKey][elementKey].element = advanceSetting.element;
      }
    });
  });

  return initialWeaponSetting;
}