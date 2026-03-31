"use client";

import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { createBinaryCode, createWeaponAdvanceCode } from "@/feature/parse/encode/encodeState";
import { WEAPON_LIST } from "@/global/data/appData";
import { UrlStateType, WeaponType } from "@/global/type/appType";
import { createAdvanceSettingParamString } from "@/feature/url/urlString/createUrlParam";
import { useRouter } from "next/navigation";
import { setHydrate } from "@/feature/store/slices/weapon/weaponSlice";
import { ROUTE } from "@/global/data/routeData";
import { setAdvanceSettingParam } from "@/feature/store/slices/urlParam/urlParamSlice";
import style from "./NaviagateButton.module.css"

export default function NavigateTableCheckButton() {
  // TODO: shallow equl 정리
  const weaponSetting = useAppSelector(state => state.weapon.weaponSetting);
  const advanceSettingParam = useAppSelector(state => state.urlParam.advanceSettingParam);

  const router = useRouter();
  const dispatch = useAppDispatch();

  const buttonText = "테이블 확인으로 이동";

  const getAdvanceCodeList = () => {
    const advanceCodeList: Partial<Record<WeaponType, number>>[] = WEAPON_LIST.map((singleWeapon: WeaponType) => {
      const weaponData = weaponSetting[singleWeapon]
      const advanceCode = createWeaponAdvanceCode(weaponData)
      return { [singleWeapon]: advanceCode }
    });

    return advanceCodeList;
  }
// TODO: Omit 타입 정리
  const navigateToTableCheck = () => {
    const urlData: Pick<UrlStateType, "weaponCode" | "advanceCode"> = {
      weaponCode: createBinaryCode(weaponSetting),
      advanceCode: getAdvanceCodeList()
    }
    
    const urlParam = createAdvanceSettingParamString(urlData);

    if (urlParam !== advanceSettingParam) {
      dispatch(setAdvanceSettingParam(urlParam));
    }

    dispatch(setHydrate(true));
    const urlTableCheck = `${window.location.origin}${ROUTE.tableCheck}`

    router.push(`${urlTableCheck}?${urlParam}`)
  }

  return (
    <>
      <input type="button" className={style.button} value={buttonText} onClick={() => navigateToTableCheck()}/>
    </>
  )
}