'use client';

import NavigateAdvanceSettingButton from "@/components/button/navigate/NavigateAdvanceSettingButton";
import { store } from "@/feature/store/store";
import { Provider } from "react-redux";
import style from "./page.module.css";
import NavigateArtianCreateButton from "@/components/button/navigate/NavigateArtianCreateButton";
import NavigationBar from "@/components/container/menuBar/navigationBar/NavigationBar";

export default function Home() {
  return (
    <Provider store={store}>
      <NavigationBar />
      <div className={style.container}>
        <div className={style.header}>아티어 제작 메모</div>
        <div className={style.navigateBox}>
          <div className={style.atianNavigateButton}>
            <p>아티어 무기 제작</p>
            <NavigateArtianCreateButton />
          </div>
          <div className={style.gogmaziosArtianNavigateButton}>
            <p>거극 아티어 스킬</p>
            <NavigateAdvanceSettingButton />
          </div>
        </div>
      </div>
    </Provider>
  )
}
