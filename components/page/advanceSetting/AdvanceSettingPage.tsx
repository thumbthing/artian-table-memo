"use client";

import AdvanceSettingContainer from "@/components/container/AdvanceSetting/AdvanceSettingContainer";
import AdvanceSettingBar from "@/components/container/menuBar/advanceSettingBar/AdvanceSettingBar";
import style from "./AdvanceSettingPage.module.css"
import NavigationBar from "@/components/container/menuBar/navigationBar/NavigationBar";

export default function AdvanceSettingPage() {
  return (
    <div className={style.page}>
      <NavigationBar />
      <div>
        <AdvanceSettingBar />
        <AdvanceSettingContainer />
      </div>
    </div>
  )
}