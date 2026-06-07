import { RootState } from "@/feature/store/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TarredDeviceType } from "@/global/type/appType";

interface tarredDeviceStateType {
  input: TarredDeviceType,
  isSetting: boolean
}

const initialState: tarredDeviceStateType = {
  input: {
    attack: 0,
    affinity: 0,
    element: 0
  },
  isSetting: true,

}

export const tarredSlice = createSlice({
  name: 'tarred',
  initialState,
  reducers: {
    // TODO: return이 필요한 이유 정리
    // immer 에 대해서 알아야함
    setInputAllDevice: (state, action: PayloadAction<TarredDeviceType>) => {
      state.input.attack = action.payload.attack;
      state.input.affinity = action.payload.affinity;
      state.input.element = action.payload.element;
    },
    setInputAttackDevice: (state, action: PayloadAction<number>) => {
      state.input.attack = action.payload;
    },
    setInputAffinityDevice: (state, action: PayloadAction<number>) => {
      state.input.affinity = action.payload;
    },
    setInputElementDevice: (state, action: PayloadAction<number>) => {
      state.input.element = action.payload;
    },
    resetTarredState: () => {
      return {...initialState}
    },
    setIsSetting: (state, action: PayloadAction<boolean>) => {
      state.isSetting = action.payload;
    }
  },
});

export const { 
  setInputAllDevice, 
  setInputAttackDevice, 
  setInputAffinityDevice, 
  setInputElementDevice, 
  resetTarredState,
  setIsSetting
} = tarredSlice.actions

export const selectTarred = (state: RootState) => state.tarred;

export default tarredSlice.reducer;