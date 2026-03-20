"use client";

import { Provider } from "react-redux";
import { store } from "../../feature/store/store";
import AdvanceSettingPage from "@/components/page/advanceSetting/AdvanceSettingPage";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <Provider store={store}>
        <AdvanceSettingPage />
      </Provider>
    </Suspense>
  )
}