import thumbthingLog from "@/feature/customFeature/log/customLog";
import { resetTableState } from "../slices/table/tableSlice";
import { resetTarredState } from "../slices/tarred/tarredSlice";
import { AppDispatch } from "../store";

export const resetAllTarredTableState = () => 
  (dispatch: AppDispatch) => {
    thumbthingLog('record reset', 'asdf')
    dispatch(resetTableState());
    
    thumbthingLog('tarred reset', 'asdf')
    dispatch(resetTarredState())
};