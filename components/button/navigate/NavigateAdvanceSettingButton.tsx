"use client";

import { useAppSelector } from "@/app/hooks";
import { ROUTE } from "@/global/data/routeData";
import style from "./NaviagateButton.module.css"
import useRouterPush from "@/feature/hook/useRouterPush";

export default function NavigateAdvanceSettingButton() {
  const buttonText = "무기 격화 세팅"

  const advanceSettingParam = useAppSelector(state => state.urlParam.advanceSettingParam);
  const routerPush = useRouterPush();

  const getAdvanceSettingUrl = () => {
    if (advanceSettingParam === "") {
      return `${ROUTE.advanceSetting}`
    }
    return `${ROUTE.advanceSetting}?advance=${advanceSettingParam}`
  }

  const navigateToAdvanceSettingPage = () => {
    const advanceSettingUrl = getAdvanceSettingUrl();
    routerPush(advanceSettingUrl);
  }

  return (
    <input type="button"  className={style.button} value={buttonText} onClick={() => {navigateToAdvanceSettingPage()}}/>
  )
}