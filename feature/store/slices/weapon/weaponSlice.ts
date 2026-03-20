import { RootState } from "@/feature/store/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WeaponType, ElementType, WeaponCodeType } from "@/global/type/appType";
import { ELEMENT_LIST, WEAPON_CODE, WEAPON_LIST } from "@/global/data/appData";
import { WeaponAdvanceSettingType, AdvanceSettingType, ElementSettingType, SelectedWeaponAdvanceSettingType } from "@/global/type/extendedType";
import { getTypedObjectKeys } from "@/feature/customFeature/object/objectParse";
import thumbthingLog from "@/feature/customFeature/log/customLog";

type WeaponSettingActionType = {
  weapon: WeaponType,
  element: ElementType,
  advance: AdvanceSettingType
}

// state는 undefined를 허용하지 않는다
// action.payload를 Partial로 사용해서는안된다
type AdvanceSettingActionType = SelectedWeaponAdvanceSettingType;

// TODO : Tuple 타입 정리
export const weaponSetting: WeaponAdvanceSettingType = {
  "대검": {
    "화": { attack: false, affinity: false, element: false },
    "수": { attack: false, affinity: false, element: false },
    "뇌": { attack: false, affinity: false, element: false },
    "빙": { attack: false, affinity: false, element: false },
    "용": { attack: false, affinity: false, element: false },
    "독": { attack: false, affinity: false, element: false },
    "마비": { attack: false, affinity: false, element: false },
    "수면": { attack: false, affinity: false, element: false },
    "폭파": { attack: false, affinity: false, element: false },
    "무": { attack: false, affinity: false, element: false },
  },
  "태도": {
    "화": { attack: false, affinity: false, element: false },
    "수": { attack: false, affinity: false, element: false },
    "뇌": { attack: false, affinity: false, element: false },
    "빙": { attack: false, affinity: false, element: false },
    "용": { attack: false, affinity: false, element: false },
    "독": { attack: false, affinity: false, element: false },
    "마비": { attack: false, affinity: false, element: false },
    "수면": { attack: false, affinity: false, element: false },
    "폭파": { attack: false, affinity: false, element: false },
    "무": { attack: false, affinity: false, element: false },
  },
  "한손검": {
    "화": { attack: false, affinity: false, element: false },
    "수": { attack: false, affinity: false, element: false },
    "뇌": { attack: false, affinity: false, element: false },
    "빙": { attack: false, affinity: false, element: false },
    "용": { attack: false, affinity: false, element: false },
    "독": { attack: false, affinity: false, element: false },
    "마비": { attack: false, affinity: false, element: false },
    "수면": { attack: false, affinity: false, element: false },
    "폭파": { attack: false, affinity: false, element: false },
    "무": { attack: false, affinity: false, element: false },
  },
  "쌍검": {
    "화": { attack: false, affinity: false, element: false },
    "수": { attack: false, affinity: false, element: false },
    "뇌": { attack: false, affinity: false, element: false },
    "빙": { attack: false, affinity: false, element: false },
    "용": { attack: false, affinity: false, element: false },
    "독": { attack: false, affinity: false, element: false },
    "마비": { attack: false, affinity: false, element: false },
    "수면": { attack: false, affinity: false, element: false },
    "폭파": { attack: false, affinity: false, element: false },
    "무": { attack: false, affinity: false, element: false },
  },
  "해머": {
    "화": { attack: false, affinity: false, element: false },
    "수": { attack: false, affinity: false, element: false },
    "뇌": { attack: false, affinity: false, element: false },
    "빙": { attack: false, affinity: false, element: false },
    "용": { attack: false, affinity: false, element: false },
    "독": { attack: false, affinity: false, element: false },
    "마비": { attack: false, affinity: false, element: false },
    "수면": { attack: false, affinity: false, element: false },
    "폭파": { attack: false, affinity: false, element: false },
    "무": { attack: false, affinity: false, element: false },
  },
  "수렵피리": {
    "화": { attack: false, affinity: false, element: false },
    "수": { attack: false, affinity: false, element: false },
    "뇌": { attack: false, affinity: false, element: false },
    "빙": { attack: false, affinity: false, element: false },
    "용": { attack: false, affinity: false, element: false },
    "독": { attack: false, affinity: false, element: false },
    "마비": { attack: false, affinity: false, element: false },
    "수면": { attack: false, affinity: false, element: false },
    "폭파": { attack: false, affinity: false, element: false },
    "무": { attack: false, affinity: false, element: false },
  },
  "랜스": {
    "화": { attack: false, affinity: false, element: false },
    "수": { attack: false, affinity: false, element: false },
    "뇌": { attack: false, affinity: false, element: false },
    "빙": { attack: false, affinity: false, element: false },
    "용": { attack: false, affinity: false, element: false },
    "독": { attack: false, affinity: false, element: false },
    "마비": { attack: false, affinity: false, element: false },
    "수면": { attack: false, affinity: false, element: false },
    "폭파": { attack: false, affinity: false, element: false },
    "무": { attack: false, affinity: false, element: false },
  },
  "건랜스": {
    "화": { attack: false, affinity: false, element: false },
    "수": { attack: false, affinity: false, element: false },
    "뇌": { attack: false, affinity: false, element: false },
    "빙": { attack: false, affinity: false, element: false },
    "용": { attack: false, affinity: false, element: false },
    "독": { attack: false, affinity: false, element: false },
    "마비": { attack: false, affinity: false, element: false },
    "수면": { attack: false, affinity: false, element: false },
    "폭파": { attack: false, affinity: false, element: false },
    "무": { attack: false, affinity: false, element: false },
  },
  "슬래시액스": {
    "화": { attack: false, affinity: false, element: false },
    "수": { attack: false, affinity: false, element: false },
    "뇌": { attack: false, affinity: false, element: false },
    "빙": { attack: false, affinity: false, element: false },
    "용": { attack: false, affinity: false, element: false },
    "독": { attack: false, affinity: false, element: false },
    "마비": { attack: false, affinity: false, element: false },
    "수면": { attack: false, affinity: false, element: false },
    "폭파": { attack: false, affinity: false, element: false },
    "무": { attack: false, affinity: false, element: false },
  },
  "차지액스": {
    "화": { attack: false, affinity: false, element: false },
    "수": { attack: false, affinity: false, element: false },
    "뇌": { attack: false, affinity: false, element: false },
    "빙": { attack: false, affinity: false, element: false },
    "용": { attack: false, affinity: false, element: false },
    "독": { attack: false, affinity: false, element: false },
    "마비": { attack: false, affinity: false, element: false },
    "수면": { attack: false, affinity: false, element: false },
    "폭파": { attack: false, affinity: false, element: false },
    "무": { attack: false, affinity: false, element: false },
  },
  "조충곤": {
    "화": { attack: false, affinity: false, element: false },
    "수": { attack: false, affinity: false, element: false },
    "뇌": { attack: false, affinity: false, element: false },
    "빙": { attack: false, affinity: false, element: false },
    "용": { attack: false, affinity: false, element: false },
    "독": { attack: false, affinity: false, element: false },
    "마비": { attack: false, affinity: false, element: false },
    "수면": { attack: false, affinity: false, element: false },
    "폭파": { attack: false, affinity: false, element: false },
    "무": { attack: false, affinity: false, element: false },
  },
  "라이트보우건": {
    "화": { attack: false, affinity: false, element: false },
    "수": { attack: false, affinity: false, element: false },
    "뇌": { attack: false, affinity: false, element: false },
    "빙": { attack: false, affinity: false, element: false },
    "용": { attack: false, affinity: false, element: false },
    "독": { attack: false, affinity: false, element: false },
    "마비": { attack: false, affinity: false, element: false },
    "수면": { attack: false, affinity: false, element: false },
    "폭파": { attack: false, affinity: false, element: false },
    "무": { attack: false, affinity: false, element: false },
  },
  "해비보우건": {
    "화": { attack: false, affinity: false, element: false },
    "수": { attack: false, affinity: false, element: false },
    "뇌": { attack: false, affinity: false, element: false },
    "빙": { attack: false, affinity: false, element: false },
    "용": { attack: false, affinity: false, element: false },
    "독": { attack: false, affinity: false, element: false },
    "마비": { attack: false, affinity: false, element: false },
    "수면": { attack: false, affinity: false, element: false },
    "폭파": { attack: false, affinity: false, element: false },
    "무": { attack: false, affinity: false, element: false },
  },
  "활": {
    "화": { attack: false, affinity: false, element: false },
    "수": { attack: false, affinity: false, element: false },
    "뇌": { attack: false, affinity: false, element: false },
    "빙": { attack: false, affinity: false, element: false },
    "용": { attack: false, affinity: false, element: false },
    "독": { attack: false, affinity: false, element: false },
    "마비": { attack: false, affinity: false, element: false },
    "수면": { attack: false, affinity: false, element: false },
    "폭파": { attack: false, affinity: false, element: false },
    "무": { attack: false, affinity: false, element: false },
  }
}

type WeaponSettingType = {
  weaponList: WeaponType[],
  weaponSetting: WeaponAdvanceSettingType
  hydrated: boolean
}

const initialState: WeaponSettingType = {
  weaponList: [],
  weaponSetting,
  hydrated: false
}


export const weaponSlice = createSlice({
  name: "weapon",
  initialState,
  reducers: {
    setWeaponSetting: (state, action: PayloadAction<WeaponSettingActionType>) => {
      const {weapon, element, advance} = action.payload;
      
      state.weaponSetting[weapon][element] = advance
    },

    addWeapon: (state, action: PayloadAction<WeaponType>) => {
      state.weaponList = state.weaponList.concat(action.payload);
    },

    removeWeapon: (state, action: PayloadAction<WeaponType>) => {
      const removeIndex = state.weaponList.indexOf(action.payload);
      state.weaponList = state.weaponList.toSpliced(removeIndex, 1);
      state.weaponSetting[action.payload] = initialState.weaponSetting[action.payload];
    },

    setByUrlParam: (state, action: PayloadAction<{
      weaponList: WeaponType[],
      advanceSetting: WeaponAdvanceSettingType,
      hydrate: boolean
    }>) => {

      return {
        weaponList: state.weaponList.concat(action.payload.weaponList),
        weaponSetting: action.payload.advanceSetting,
        hydrated: action.payload.hydrate
      }
    },

    setWeaponByUrlParam(state, action: PayloadAction<string[]>) {
      const weaponList: WeaponType[] = [];
      action.payload.forEach((binary, index) => {
        if (binary === "1") {
          weaponList.push(WEAPON_LIST[index]);
        }
      })
      state.weaponList = weaponList;
    },
    
    setAdvanceSettingByUrlParam(state, action: PayloadAction<AdvanceSettingActionType>) {
      const urlWeaponList = getTypedObjectKeys(action.payload);

      urlWeaponList.forEach(weapon => {
        const elementSetting = action.payload[weapon];
        if (!elementSetting) return 

        const urlElementList = getTypedObjectKeys(elementSetting);

        urlElementList.forEach((element) => {
          const advanceSetting = elementSetting[element];
          if (!advanceSetting) return

          state.weaponSetting[weapon][element] = advanceSetting
        })
      })
    },

    setHydrate(state, action: PayloadAction<boolean>) {
      if (state.hydrated !== action.payload) {
        state.hydrated = action.payload;
      }
    }
  }
});

export const { setWeaponSetting, addWeapon,removeWeapon, setWeaponByUrlParam, setAdvanceSettingByUrlParam, setHydrate, setByUrlParam } = weaponSlice.actions;

export const selectWeapon = (state: RootState) => state.weapon;

export default weaponSlice.reducer;