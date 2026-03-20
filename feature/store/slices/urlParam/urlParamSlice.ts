import { RootState } from "@/feature/store/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UrlParamStateType {
  advanceSettingParam: string,
  tarredDeviceParam: string,
  skillAssignmentParam: string
}

const initialState: UrlParamStateType = {
  advanceSettingParam: "",
  tarredDeviceParam: "",
  skillAssignmentParam: ""
}

export const urlParamSlice = createSlice({
  name: "urlParam",
  initialState,
  reducers: {
    setAdvanceSettingParam: (state, action: PayloadAction<string>) => {
      state.advanceSettingParam = action.payload;
    },
    setTarredDeviceParam: (state, action: PayloadAction<string>) => {
      state.tarredDeviceParam = action.payload;
    },
    setSkillAssignmentParam: (state, action: PayloadAction<string>) => {
      state.skillAssignmentParam = action.payload;
    },
  }
});

export const { setAdvanceSettingParam, setTarredDeviceParam, setSkillAssignmentParam } = urlParamSlice.actions;

export const selectUrlParam = (state: RootState) => state.urlParam;

export default urlParamSlice.reducer;
