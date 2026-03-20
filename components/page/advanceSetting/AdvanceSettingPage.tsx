"use client";

import AdvanceSettingContainer from "@/components/container/AdvanceSetting/AdvanceSettingContainer";
import AdvanceSettingBar from "@/components/container/menuBar/advanceSettingBar/AdvanceSettingBar";
import NavigationBar from "@/components/container/menuBar/navigationBar/NavigationBar";

export default function AdvanceSettingPage() {
  return (
    <>
      <AdvanceSettingBar />
      <AdvanceSettingContainer />
    </>
  )
}