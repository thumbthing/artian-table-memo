"use client";

import style from "./AdvanceSettingContainer.module.css";
import WeaponAdvanceSettingList from "@/components/weapon/SingleWeaponSelect";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { getUrlParamPayload } from "@/feature/parse/urlParam/encodeUrlParam";
import { setHydrate } from "@/feature/store/slices/weapon/weaponSlice";
import { initFromUrlParam } from "@/feature/store/thunks/initFromUrlParam";
import checkAdvanceSettingParam from "@/feature/validate/url/checkAdvanceSettingParam";
import AdvanceSettingParamError from "@/feature/error/customError/AdvanceSettingParamError";
import useRouterPush from "@/feature/hook/useRouterPush";
import { ROUTE } from "@/global/data/routeData";
import thumbthingLog from "@/feature/customFeature/log/customLog";

export default function AdvanceSettingContainer() {
  const searchParam = useSearchParams();
  const routerPush = useRouterPush();

  const weaponHydrateState = useAppSelector(state => state.weapon.hydrated);
  const advanceParam =  useAppSelector(state => state.urlParam.advanceSettingParam);
  
  const dispatch = useAppDispatch();

  useEffect(() => {
    try {
      if (weaponHydrateState === true) {
        return;
      }

      const location = window.location;
      const currentPath = location.href;
      const advanceSettinPathRegexString = `^${location.origin}${ROUTE.advanceSetting}$`
      const locationRegex = new RegExp(advanceSettinPathRegexString);
      
      if(locationRegex.test(currentPath) && advanceParam === "") {
        return;
      }

      checkAdvanceSettingParam(searchParam.get("advance"));
      
      const validAdvanceParam = searchParam.get("advance") as string;

      const urlPayload = getUrlParamPayload(validAdvanceParam, true);
      
      dispatch(initFromUrlParam(urlPayload));
      
      if (validAdvanceParam.replaceAll("|", "%7C") !== searchParam.toString()) {
        routerPush(`${ROUTE.advanceSetting}?advance=${validAdvanceParam}`)
      }
        
      } catch (error) {
        if (weaponHydrateState) {
          dispatch(setHydrate(false));
        }
        
        if (error instanceof AdvanceSettingParamError) {
        const replaceUrl = error.getReplaceUrl();
        routerPush(replaceUrl);
      }
    }
  }, [searchParam])

  return (
    <main className={style.container}>
      <WeaponAdvanceSettingList />
    </main>
  )
}