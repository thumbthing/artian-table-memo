'use client';

import NavigateAdvanceSettingButton from "@/components/button/navigate/NavigateAdvanceSettingButton";
import { store } from "@/feature/store/store";
import { Provider } from "react-redux";

export default function Home() {
  return (
    <Provider store={store}>
      <div>
        <div>
          <p>거극 아티어 격화 세팅</p>
          <NavigateAdvanceSettingButton />
        </div>
      </div>
    </Provider>
  )
}
