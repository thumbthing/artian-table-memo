"use client";

import WeaponSelectBox from "@/components/weapon/WeaponSelectBox";
import style from "./AdvanceSettingBar.module.css"
import NavigateTableCheckButton from "@/components/button/navigate/NavigateTableCheckButton";
import NavigateHomeButton from "@/components/button/navigate/NavigateHomeButton";

export default function AdvanceSettingBar() {
  return (
    <div className={style.menubar}>
      <NavigateHomeButton />
      <WeaponSelectBox />
      <NavigateTableCheckButton />
    </div>
  )
}