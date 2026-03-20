import { configureStore } from "@reduxjs/toolkit";
import tarredReducer from "./slices/tarred/tarredSlice"
import weaponReducr from "./slices/weapon/weaponSlice";
import urlParamReducer from "./slices/urlParam/urlParamSlice"
import tableReducer from "./slices/table/tableSlice"
import { combineSlices } from "@reduxjs/toolkit";

const reducers = combineSlices({
  tarred: tarredReducer,
  weapon: weaponReducr,
  urlParam: urlParamReducer,
  table: tableReducer
});

export const store = configureStore({
  reducer: reducers,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;