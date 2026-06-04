"use client";

import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { getUrlParamPayload } from "@/feature/parse/urlParam/encodeUrlParam";
import { setHydrate } from "@/feature/store/slices/weapon/weaponSlice";
import { useSearchParams } from "next/navigation"
import { useEffect } from "react";
import WeaponTableRecordBox from "@/components/table/WeaponTableRecordBox";
import TableRecordList from "@/components/table/TableRecordList";
import style from "./TableCheckContainer.module.css"
import { initFromUrlParam } from "@/feature/store/thunks/initFromUrlParam";
import AdvanceSettingParamError from "@/feature/error/customError/AdvanceSettingParamError";
import useRouterPush from "@/feature/hook/useRouterPush";
import { ROUTE } from "@/global/data/routeData";
import checkAdvanceSettingParam from "@/feature/validate/url/checkAdvanceSettingParam";
import { getTypedObjectValues } from "@/feature/customFeature/object/objectParse";
import TarredDeviceNotice from "@/components/notice/tableCheck/TarredDeviceNotice";

export default function TableCheckContainer() {
  const searchParam = useSearchParams();
  const routerPush = useRouterPush();
  
  const weaponHydrateState = useAppSelector(state => state.weapon.hydrated);
  const advanceParam = useAppSelector(state => state.urlParam.advanceSettingParam);
  const tarredDevice = useAppSelector(state => state.tarred.input);
  
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    try {
      if (weaponHydrateState === true) {
        return;
      }
      
      const location = window.location;
      const currentPath = location.href;
      const advanceSettingPathRegexString = `^${location.origin}${ROUTE.tableCheck}$`;
      const locationRegex = new RegExp(advanceSettingPathRegexString);

      if (locationRegex.test(currentPath) && advanceParam !== "") {
        return;
      }

      checkAdvanceSettingParam(searchParam.get("advance"));

      const validAdvanceParam = searchParam.get("advance") as string;

      const urlPayload = getUrlParamPayload(validAdvanceParam, true);

      dispatch(initFromUrlParam(urlPayload));

      if (validAdvanceParam.replaceAll("|", "%7C") !== searchParam.toString()) {
        routerPush(`${ROUTE.tableCheck}?advance=${validAdvanceParam}`)
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
    <main className={style.recordContainer}>
      {getTypedObjectValues(tarredDevice).every(deviceAmount => deviceAmount === 0) ?
        <TarredDeviceNotice />
        :
        <>
          <WeaponTableRecordBox />
          <TableRecordList />
        </>
      }
    </main>
  )
}