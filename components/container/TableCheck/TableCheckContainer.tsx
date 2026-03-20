"use client";

import { useAppDispatch, useAppSelector } from "@/app/hooks";
import thumbthingLog from "@/feature/customFeature/log/customLog";
import UrlParamError from "@/feature/error/customError/UrlParamError";
import { createAdvanceSettingBinaryList, createWeaponBinaryList } from "@/feature/parse/urlParam/encodeUrlParam";
import { createAdvanceState } from "@/feature/parse/weapon/UrlWeaponSetting";
import { setHydrate } from "@/feature/store/slices/weapon/weaponSlice";
import checkUrlList from "@/feature/validate/list/checkUrlList";
import checkUrlParam from "@/feature/validate/url/checkUrlParam";
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react";
import WeaponTableRecordBox from "@/components/table/WeaponTableRecordBox";
import TableRecordList from "@/components/table/TableRecordList";
import style from "./TableCheckContainer.module.css"
import { initFromUrlParam } from "@/feature/store/thunks/initFromUrlParam";
import { WEAPON_LIST } from "@/global/data/appData";

export default function TableCheckContainer() {
  const router = useRouter();
  const searchParam = useSearchParams();
  
  const weaponHydrateState = useAppSelector(state => state.weapon.hydrated);
  const weaponState = useAppSelector(state => state.weapon);
  
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    try {
      if (weaponHydrateState === true) {
        thumbthingLog('setting', 'update 안함')
        return;
      }
      
      const validParam = checkUrlParam();

      const urlWeaponList = createWeaponBinaryList(validParam.weapon);
      const urlAdvanceList = createAdvanceSettingBinaryList(validParam.advance);
      checkUrlList(urlWeaponList, urlAdvanceList, validParam.advance);
      
      thumbthingLog('setting', '초기화 중');

      const advanceSetting = createAdvanceState(urlAdvanceList);
      const weaponList = urlWeaponList.map((binary, index) => binary === "1" ? WEAPON_LIST[index] : binary)
                                      .filter(weapon => weapon !== "0")
      const param = `weapon=${validParam.weapon}&advance=${validParam.advance}`

      const payload = {
        urlWeaponList: weaponList,
        advanceSetting,
        param,
        hydrate: true
      };
      
      dispatch(initFromUrlParam(payload));

      if (param.replaceAll("|", "%7C") !== searchParam.toString()) {
        thumbthingLog('router', "redirect")
        router.replace(`${window.location.pathname}?${param}`)
      }
    } catch (error) {
      dispatch(setHydrate(false))

      if (error instanceof UrlParamError) {
        console.log(error.message);
        const replaceUrl = error.getReplaceUrl();
        const currentUrl = window.location.href

        if (replaceUrl !== currentUrl) {
          router.replace(replaceUrl);
        } else {
          const rootUrl = window.location.origin;
          router.replace(rootUrl);
        }
      }
    }
  },[searchParam]);

  return (
    <div className={style.recordContainer}>
      <WeaponTableRecordBox />
      <TableRecordList />
    </div>
  )
}