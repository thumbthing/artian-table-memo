import { RootState } from "@/feature/store/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TarredDeviceType } from "@/global/type/appType";
import { DUMI_TARRED_DEVICE } from "@/global/data/dumiData";

interface tarredDeviceStateType {
  input: TarredDeviceType,
  skillAssignment: TarredDeviceType
}

const initialState: tarredDeviceStateType = {
  input: {
    attack: 3,
    affinity: 3,
    element: 3
  },
  skillAssignment:{
    attack: 0,
    affinity: 0,
    element: 0
  },
}

export const tarredSlice = createSlice({
  name: 'tarred',
  initialState,
  // initialState: {
  //   input: DUMI_TARRED_DEVICE,
  //   skillAssignment: initialState.skillAssignment
  // },
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
      state.input.attack = action.payload;
    },
    setInputElementDevice: (state, action: PayloadAction<number>) => {
      state.input.attack = action.payload;
    },
    setSkillAssignmentDevice: (state) => {
      state.skillAssignment = {...state.input}
    },
    resetTarredState: () => {
      return {...initialState}
    }
    // allDevice: (state, action: PayloadAction<TarredDeviceType>) => {
    //   state = action.payload
    //   return state;
    // },
    // attackDevice: (state, action: PayloadAction<number>) => {
    //   state.attack = action.payload;
    // },
    // affinityDevice: (state, action: PayloadAction<number>) => {
    //   state.affinity = action.payload;
    // },
    // elementDevice: (state, action: PayloadAction<number>) => {
    //   state.element = action.payload;
    // }
  },
  // extraReducers: (builder) => {
  //   builder.addCase(resetAll, () => initialState)
  // }
});

export const { 
  setInputAllDevice, 
  setInputAttackDevice, 
  setInputAffinityDevice, 
  setInputElementDevice, 
  setSkillAssignmentDevice, 
  resetTarredState 
} = tarredSlice.actions

export const selectTarred = (state: RootState) => state.tarred;

export default tarredSlice.reducer;