import { ElementType, TarredDeviceType, WeaponCodeType, WeaponType } from "./appType";

// use: weaponSlice, WeaponSetting

export type ExtendedAdvanceType<
  T extends Record<PropertyKey, any>,
  B
> = {
  [K in keyof T] : B
};

// 하나의 속성의 격화 효율 타입 
export type AdvanceSettingType = ExtendedAdvanceType<TarredDeviceType, boolean>;

// 하니의 무기의 속성 별 격화 효율 타입
// export type ElementSettingType = Partial<Record<ElementType, AdvanceSettingType>>;
export type ElementSettingType = Record<ElementType, AdvanceSettingType>;

// 전체 무기 목록의 효율 세팅 타입
export type WeaponAdvanceSettingType = Record<WeaponType, ElementSettingType>;

// 설정한 무기 효율 세팅 타입
export type SelectedWeaponAdvanceSettingType = Partial<Record<WeaponType, Partial<ElementSettingType>>>;

// urlParam parse 타입
export type BinaryStringType = "0" | "1";

export type BinaryStringListType = BinaryStringType[];

export type AdvanceBinaryTuple = [
  weapon: WeaponCodeType,
  setting: BinaryStringListType[]
]

export type AdvanceBinaryTupleList = AdvanceBinaryTuple[];

// tableSlice Type

export interface TableRecordType {
  weaponName: WeaponType,
  elementName: ElementType
  order: number,
  seriesSkill: string
  groupSkill: string,
}

export type TableStateType = {
  isOnRecord: boolean,
  weaponName: WeaponType | undefined,
  elementName: ElementType | undefined,
  tableRecordList: TableRecordType[],
  count: number,
}