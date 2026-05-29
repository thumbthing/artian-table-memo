"use client";

import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { createWeaponAdvanceCode } from "@/feature/parse/encode/encodeState";
import { WEAPON_CODE, WEAPON_LIST } from "@/global/data/appData";
import { WeaponCodeType, WeaponType } from "@/global/type/appType";
import { ROUTE } from "@/global/data/routeData";
import style from "./NaviagateButton.module.css"
import useRouterPush from "@/feature/hook/useRouterPush";
import { useState } from "react";
import AdvanceSettingErrorPortal from "@/components/portal/notice/AdvanceSettingErrorPortal";
import { WeaponAdvanceSettingType } from "@/global/type/extendedType";
import { getDefaultAdvanceCodeSetting } from "@/feature/parse/object/getDefaultWeaponAdvanceSetting";
import createAdvanceSettingParamList from "@/feature/url/urlString/createAdvanceSettingParam";
import { setAdvanceSettingParam } from "@/feature/store/slices/urlParam/urlParamSlice";

const ADVANCE_SETTING_NOTICE_TEXT = {
  header: "격화 효율이 설정되지 않았습니다.",
  unsetWeapon: "아래의 무기들의 설정을 완료하고 다시 시도해주세요",
  default: "무기 격화 효율을 설정하시고 다시 시도해주세요"
}

export default function NavigateTableCheckButton() {
  // TODO: shallow equl 정리
  const weaponList = useAppSelector(state => state.weapon.weaponList);
  const weaponSetting = useAppSelector(state => state.weapon.weaponSetting);

  const dispatch = useAppDispatch();
  const routerPush = useRouterPush();

  const [ isParamInValid, setIsParamInValid ] = useState<boolean | undefined>(undefined);
  const [ unSetWeaponList, setUnsetWeaponList ] = useState<WeaponType[]>([]);
  const buttonText = "설정 저장 후 \n\n테이블 확인으로 이동"

  // 
  const getAdvanceSettingCode = (weaponList: WeaponType[],weaponSetting: WeaponAdvanceSettingType) => {
    const advanceCode = getDefaultAdvanceCodeSetting();

    weaponList.forEach(weapon => advanceCode[weapon] = createWeaponAdvanceCode(weaponSetting[weapon]))

    return advanceCode;
  }

  const getTableCheckUrl = () => {
    const advanceSettingCode = getAdvanceSettingCode(weaponList, weaponSetting);
    const advanceSettingParamList = createAdvanceSettingParamList(weaponList, advanceSettingCode);
    const unSetWeaponParamList = advanceSettingParamList.filter(paramCode => /^\w{2}-0$/.test(paramCode));

    if (unSetWeaponParamList.length > 0) {
      const unSetParamWeaponList = unSetWeaponParamList.map(code => WEAPON_LIST[WEAPON_CODE.indexOf(code.slice(0,2) as WeaponCodeType)]);
      setUnsetWeaponList(unSetParamWeaponList);
      return;
    }

    if (unSetWeaponList.length > 0) {
      setUnsetWeaponList([]);
    }

    return `${advanceSettingParamList.join("|")}`
  }

// TODO: Omit 타입 정리
  const handleOnClick = () => {
    const tableCheckUrl = getTableCheckUrl();

    if (tableCheckUrl === undefined || tableCheckUrl === "") {
      setIsParamInValid(true);
      return;
    }

    if (isParamInValid) {
      setIsParamInValid(false);
    }

    setUnsetWeaponList([]);
    dispatch(setAdvanceSettingParam(tableCheckUrl))
    
    routerPush(`${ROUTE.tableCheck}?advance=${tableCheckUrl}`);
  }

  return (
    <>
      <input 
        type="button" 
        className={style.button} 
        value={buttonText} 
        onClick={() => handleOnClick()}
      />
      {isParamInValid && 
        <AdvanceSettingErrorPortal
          noticeText={ADVANCE_SETTING_NOTICE_TEXT}
          unSetWeaponList={unSetWeaponList}
          dispatchValidFn={setIsParamInValid}
        />
      }
    </>
  )
}