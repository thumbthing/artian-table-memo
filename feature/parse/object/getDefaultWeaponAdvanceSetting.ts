import { ELEMENT_LIST, TARRED_DEVICE_ADVANCE_LIST, WEAPON_LIST } from "@/global/data/appData";
import { AdvanceType, ElementType, WeaponType } from "@/global/type/appType";
import { AdvanceSettingType, ElementSettingType } from "@/global/type/extendedType";
import { ValueOf } from "next/dist/shared/lib/constants";

type ObjectKeyType = WeaponType | ElementType | AdvanceType;
type ObjectValueType = ElementSettingType | AdvanceSettingType | boolean

// bool
// {atack: bool}
// 
// 화 : {attack: bool}

type ObjectKeyListType = WeaponType[] | ElementType[] | AdvanceType[];

function getCustomObject<
  K extends ObjectKeyType,
  V extends any,
  >(keyList: K[], value: V): Record<K, V> {
  const obj: Partial<Record<K, V>> = {};

  keyList.forEach((key) => {
    obj[key] = typeof value === "object" ? JSON.parse(JSON.stringify(value)) : value
  });

  return obj as Record<K, V>;
}

function getDeepCustomObject(keyList: ObjectKeyListType[] , objValue: any) {
  const remainKeyList = keyList;
  const currentKeyList = remainKeyList.pop();

  if (currentKeyList) {
    const obj = getCustomObject(currentKeyList, objValue)
    return getDeepCustomObject(remainKeyList, obj);
  }

  return objValue;
}

export function getDefaultWeaponAdvanceSetting() {
  const keyList = [WEAPON_LIST, ELEMENT_LIST, TARRED_DEVICE_ADVANCE_LIST];
  const weaponAdvanceSetting = getDeepCustomObject(keyList, false);
  return weaponAdvanceSetting;
}

