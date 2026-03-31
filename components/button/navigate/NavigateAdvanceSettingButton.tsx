"use client";

import { useAppSelector } from "@/app/hooks";
import { ROUTE } from "@/global/data/routeData";
import { useRouter } from "next/navigation";
import style from "./NaviagateButton.module.css"

export default function NavigateAdvanceSettingButton() {
  const buttonText = "무기 격화 세팅"

  const advanceSettingParam = useAppSelector(state => state.urlParam.advanceSettingParam);
  const router = useRouter();

  const navigateToAdvanceSetting = () => {
    const advanceSettingPath = `${window.location.origin}${ROUTE.advanceSetting}`;

    if (advanceSettingParam === "") {
      router.push(advanceSettingPath);
      return;
    }

    router.push(`${advanceSettingPath}?${advanceSettingParam}`);
    return;
  }

  return (
    <>
      <input type="button"  className={style.button} value={buttonText} onClick={() => {navigateToAdvanceSetting()}}/>
    </>
  )
}