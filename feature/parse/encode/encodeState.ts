import { ElementType, TarredDeviceType, WeaponType } from "@/global/type/appType";
import { WEAPON_LIST, ELEMENT_LIST } from "@/global/data/appData";
import thumbthingLog from "@/feature/customFeature/log/customLog";
import { getTypedObjectKeys, getTypedObjectValues } from "@/feature/customFeature/object/objectParse";
import { WeaponAdvanceSettingType } from "@/global/type/extendedType";

type ExtendType<
  T extends Record<PropertyKey, any>,
  V
> = {
  [K in keyof T]: V
}

type AdvanceSettingType = ExtendType<TarredDeviceType, boolean>

type ElementAdvanceType = Partial<Record<ElementType, AdvanceSettingType>>;

export function createBinaryCode(weaponSetting: WeaponAdvanceSettingType): number {
  const binaryList = WEAPON_LIST.map((weapon) => {
    const weaponAdvanceSetting = weaponSetting[weapon];
    const elementList = getTypedObjectKeys(weaponAdvanceSetting);
    const advanceSetting = elementList.map(element => [...new Set(getTypedObjectValues(weaponAdvanceSetting[element]))]).flat();
    const isAdvanceSetting = advanceSetting.includes(true);

    if (isAdvanceSetting) {
      return "1"
    } else {
      return "0"
    }
  })

  const binaryString = binaryList.join("");
  return Number.parseInt(binaryString, 2);
}

function createElementOctalCode(advanceSetting: AdvanceSettingType | undefined) {
  const binaryData: Number[] = [];

  if (advanceSetting === undefined) {
    binaryData.push(0,0,0);
  } else {
    advanceSetting.attack ? binaryData.push(1) : binaryData.push(0);
    advanceSetting.affinity ? binaryData.push(1) : binaryData.push(0);
    advanceSetting.element ? binaryData.push(1) : binaryData.push(0);
  }

  const binaryString = binaryData.join("");
  
  const octalDigit = Number.parseInt(binaryString, 2);
  return octalDigit
}

export function createWeaponAdvanceCode(singleWeapon:  ElementAdvanceType) {
  const octalData: Number[] = [];

  ELEMENT_LIST.forEach((element) => {
    const elementAdvanceData = singleWeapon[element];
    const octalDigit = createElementOctalCode(elementAdvanceData)
    octalData.push(octalDigit);
  });

  const octalString = octalData.join("");
  
  const octalDigit = Number.parseInt(octalString, 8);
  return octalDigit;
}
