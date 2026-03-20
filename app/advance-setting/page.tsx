"use client";

import { Provider } from "react-redux";
import { store } from "../../feature/store/store";
import AdvanceSettingPage from "@/components/page/advanceSetting/AdvanceSettingPage";
import NavigationBar from "@/components/container/menuBar/navigationBar/NavigationBar";


export default function Page() {
  return (
    <Provider store={store}>
      <AdvanceSettingPage />
    </Provider>
  )
}