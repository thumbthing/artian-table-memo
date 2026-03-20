import { WeaponAdvanceSettingType } from "@/global/type/extendedType"
import { AppDispatch, RootState } from "../store"
import { setByUrlParam } from "../slices/weapon/weaponSlice"
import { setAdvanceSettingParam } from "../slices/urlParam/urlParamSlice"
import { WeaponType } from "@/global/type/appType"
import thumbthingLog from "@/feature/customFeature/log/customLog"

type InitUrlPayLoadType = {
  urlWeaponList: WeaponType[],
  advanceSetting: WeaponAdvanceSettingType,
  param: string,
  hydrate: boolean
}

export const initFromUrlParam = (payload: InitUrlPayLoadType) => 
  (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(
      setByUrlParam({
        weaponList: payload.urlWeaponList,
        advanceSetting: payload.advanceSetting,
        hydrate: payload.hydrate
      }),
    );
    dispatch(
      setAdvanceSettingParam(payload.param)
    );
  }