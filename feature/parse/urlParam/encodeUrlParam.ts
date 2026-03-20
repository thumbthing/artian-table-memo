import { WeaponCodeType, WeaponType } from "@/global/type/appType";
import { decodeAdvanceParam, decodeParam } from "../decode/decodeUrlParam";
import { WEAPON_CODE, WEAPON_LIST } from "@/global/data/appData";
import { BinaryStringListType, BinaryStringType } from "@/global/type/extendedType";

export function createWeaponBinaryList(weaponParam: string) {
  const weaponParamList = decodeParam(weaponParam, 2);
  const emptyList = Array(14 - weaponParamList.length).fill("0");
  const weaponList = emptyList.concat(weaponParamList);
  return weaponList
}

// TODO : Tuple 타입 정리
export function createAdvanceSettingBinaryList(advanceParam: string) {
  const advanceList = advanceParam
                        .split("|")
                        .map<[WeaponCodeType, BinaryStringListType[]]>((advanceWeapon) => {
                          const [weaponRaw, advance] = advanceWeapon.split("-")
                          const weapon = weaponRaw as WeaponCodeType;

                          const advanceSetting = decodeAdvanceParam(advance);
                          const emptyList = Array(10 - advanceSetting.length).fill("0");
                          const settingList = emptyList.concat(advanceSetting);
                          return [weapon, settingList];
                        });
  return advanceList
}

export function createWeaponParamByAdvanceList(advanceWeaponList: WeaponType[]) {
  const weaponParamBinary = WEAPON_LIST.map((weapon) => {
                                          if (advanceWeaponList.includes(weapon)) {
                                            return "1"
                                          }
                                          return "0"
                                        })
                                        .join("");
                                        
  return Number.parseInt(weaponParamBinary, 2).toString();
}

type WeaponBinaryType = "1" | "0"

export function createAdvanceParamByWeaponList(weaponBinaryList: WeaponBinaryType[]) {
  const advanceParam = weaponBinaryList
                        .map((weaponBinary, index) => {
                          if (weaponBinary === "1") {
                            return `${WEAPON_CODE[index]}-0`
                          }
                        })
                        .filter((advance) => advance)
                        .join("|");
  return advanceParam;
}
    // setAdvanceSettingByUrlParam(state, action: PayloadAction<AdvanceParamTupleActionType>) {
    //   const weaponState: BinaryWeaponTableType = {};

    //   action.payload.forEach((advanceSetting) => {
    //     const [weapon, setting] = [...advanceSetting];
    //     const weaponKey = WEAPON_LIST[WEAPON_CODE.indexOf(weapon)];
    //     const weaponSetting: ElementAdvanceType = {}
        
    //     setting.forEach((binaryList, index) => {
    //       const uniqueList = new Set(binaryList);
    //       const isNotSetting = uniqueList.size === 1 && uniqueList.has("0");

    //       if (!isNotSetting) {
    //         const elementKey = ELEMENT_LIST[index];
    //         const advanceSetting = {
    //           attack: binaryList[0] === "1" ? true : false,
    //           affinity: binaryList[1] === "1" ? true : false,
    //           element: binaryList[2] === "1" ? true : false,
    //         };
    //         weaponSetting[elementKey] = advanceSetting;
    //       }
    //     });

    //     weaponState[weaponKey] = weaponSetting;
    //   });

    // }