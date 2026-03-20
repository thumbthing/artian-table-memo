export type WeaponType = "대검" | "태도" | 
                  "한손검" | "쌍검" | 
                  "해머" | "수렵피리" | 
                  "랜스" | "건랜스" | 
                  "슬래시액스" | "차지액스" | 
                  "조충곤" | "라이트보우건" | 
                  "해비보우건" | "활";

export type ElementType = "화" | "수" | "뇌" | "빙" | "용" | "독" | "마비" | "수면" | "폭파" | "무";
export type ElementEnType = "fire" |"water" | "electric" | "ice" | "dragon" | "poison" | "paralyze" | "sleep" | "explosion" | "none";

export type AdvanceKrType = "공격" | "회심" | "속성";
export type AdvanceType = "attack" | "affinity" | "element";

export type WeaponCodeType = "gs" | "ls" |
                            "ss" | "db" | 
                            "hm" | "hh" | 
                            "lc" | "gl" | 
                            "sa" | "cb" | 
                            "ig" | "lb" | 
                            "hb" | "bw";

export type TarredDeviceType = {
  attack: number,
  affinity: number,
  element: number
}

// TODO: Partial 타입 개념 정리
export type AdvanceCodeType = Partial<Record<WeaponType, number>>;

export type UrlStateType = {
  weaponCode: number,
  advanceCode: AdvanceCodeType[],
  tarredDeviceParam: string,
  weaponListParam: string,
  advanceSettingParam: string
}
