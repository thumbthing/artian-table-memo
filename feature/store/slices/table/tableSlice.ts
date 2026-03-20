import { RootState } from "@/feature/store/store";
import { SORTED_DUMI_DATA } from "@/global/data/dumiData";
import { ElementType, WeaponType } from "@/global/type/appType";
import { TableRecordType, TableStateType } from "@/global/type/extendedType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SetWeaponElementActionType = {
  weaponName: WeaponType,
  elementName: ElementType
}

interface GetDefaultStateActionType extends SetWeaponElementActionType {
  isOnRecord: boolean
}

interface ExtendedTableStateType extends TableStateType {
  isSeriesSkillSelecting: boolean,
  isGroupSkillSelecting: boolean,
  seriesSkill: string,
  groupSkill: string,
}

const initialState: ExtendedTableStateType = {
  isOnRecord: false,
  isSeriesSkillSelecting: false,
  isGroupSkillSelecting: false,
  seriesSkill: "",
  groupSkill: "",
  weaponName: undefined,
  elementName: undefined,
  tableRecordList: [],
  // tableRecordList: SORTED_DUMI_DATA,
  count: 0
}

export const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    setOnRecord: (state, action: PayloadAction<boolean>) => {
      if (state.isOnRecord === action.payload) return;
      state.isOnRecord = !state.isOnRecord;
    },
    setSeriesSkillSelecting: (state, action: PayloadAction<boolean>) => {
      if (state.isSeriesSkillSelecting === action.payload) return;
      state.isSeriesSkillSelecting = !state.isGroupSkillSelecting;
    },
    setGroupSkillSelecting: (state, action: PayloadAction<boolean>) => {
      if (state.isGroupSkillSelecting === action.payload) return;
      state.isGroupSkillSelecting = !state.isGroupSkillSelecting;
    },
    setWeaponElement: (state, action: PayloadAction<SetWeaponElementActionType>) => {
      state.weaponName = action.payload.weaponName;
      state.elementName = action.payload.elementName;
    },
    setSeriesSkill: (state, action: PayloadAction<string>) => {
      state.seriesSkill = action.payload;
      state.isSeriesSkillSelecting = false;
    },
    setGroupSkill: (state, action: PayloadAction<string>) => {
      state.groupSkill = action.payload;
      state.isGroupSkillSelecting = false;
    },
    resetRecordState: (state) => {
      state.isOnRecord = false;
      state.weaponName = undefined;
      state.elementName = undefined;
    },
    resetAllSeriesSkillState: (state) => {
      state.isSeriesSkillSelecting = false;
      state.seriesSkill = "";
    },
    resetAllGroupSkillState: (state) => {
      state.isGroupSkillSelecting = false;
      state.groupSkill = "";
    },
    getDefaultRecordState: (state, action: PayloadAction<GetDefaultStateActionType>) => {
      state.isOnRecord = action.payload.isOnRecord;
      state.weaponName = action.payload.weaponName;
      state.elementName = action.payload.elementName;
    },
    addTableRecord: (state, action: PayloadAction<TableRecordType>) => {
      state.isOnRecord = false;
      state.weaponName = undefined;
      state.elementName = undefined;
      state.tableRecordList = state.tableRecordList.concat(action.payload);
    },
    sortTableRecord: (state) => {
      state.tableRecordList = [...state.tableRecordList].sort((a, b) => a.order - b.order);
    },
    increaseCount: (state) => {
      state.count = state.count + 1;
    },
    decreaseCount: (state) => {
      if (state.count > 0) {
        state.count = state.count - 1;
      }
    },
    setCount: (state, action: PayloadAction<number>) => {
      state.count = action.payload;
    },
    resetTableState: (state) => {
      return {
        isOnRecord: false,
        isSeriesSkillSelecting: false,
        isGroupSkillSelecting: false,
        seriesSkill: "",
        groupSkill: "",
        elementName: undefined,
        weaponName: undefined,
        tableRecordList: [],
        count: 0
      }
    }
  }
});

export const { 
  setOnRecord, 
  setSeriesSkillSelecting,
  setGroupSkillSelecting,
  setWeaponElement, 
  setSeriesSkill,
  setGroupSkill,
  resetRecordState, 
  resetAllSeriesSkillState,
  resetAllGroupSkillState,
  getDefaultRecordState, 
  addTableRecord, 
  sortTableRecord, 
  increaseCount, 
  decreaseCount, 
  setCount, 
  resetTableState 
} = tableSlice.actions;

export const selectTableRecord = (state: RootState) => state.table;

export default tableSlice.reducer;
