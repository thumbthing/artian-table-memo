import { AdvanceKrType, AdvanceType, ElementEnType, ElementType, WeaponCodeType, WeaponType } from "../type/appType";

export const ADVANCE_CODE: Record<AdvanceType, AdvanceKrType> = {
  "attack": "공격",
  "affinity": "회심",
  "element": "속성"
}

export const WEAPON_LIST: WeaponType[] = [
                                            "대검", "태도",
                                            "한손검", "쌍검",
                                            "해머", "수렵피리",
                                            "랜스", "건랜스",
                                            "슬래시액스", "차지액스",
                                            "조충곤", "라이트보우건",
                                            "해비보우건", "활"
                                          ];

export const WEAPON_CODE: WeaponCodeType[] = [
                                              "gs", "ls",
                                              "ss", "db",
                                              "hm", "hh",
                                              "lc", "gl",
                                              "sa", "cb",
                                              "ig", "lb",
                                              "hb", "bw"
]

export const ELEMENT_LIST: ElementType[] = ["화", "수", "뇌", "빙", "용", "독", "마비", "수면", "폭파", "무"];

export const ELEMENT_CODE: Record<ElementType, ElementEnType> = {
  "화": "fire",
  "수": "water",
  "뇌": "electric",
  "빙": "ice",
  "용": "dragon",
  "독": "poison",
  "마비": "paralyze",
  "수면": "sleep",
  "폭파": "explosion",
  "무": "none"
} 



export const URL_CODE: Record<WeaponType | string, string> = {
  "대검": "gs", 
  "태도": "ls",
  "한손검": "ss", 
  "쌍검": "db",
  "해머": "hm", 
  "수렵피리": "hh",
  "랜스": "lc", 
  "건랜스": "gl",
  "슬래시액스": "sa", 
  "차지액스": "cb",
  "조충곤": "ig", 
  "라이트보우건": "lb",
  "해비보우건": "hb", 
  "활": "bw"
};

export const URL_PARAM_LIST: string[] = [
  "tarred-device",
  "weapon",
  "advance"
];

export const TARRED_DEVICE_ADVANCE_LIST: AdvanceType[] = [
  "attack",
  "affinity",
  "element"
]