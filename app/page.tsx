'use client';

import { store } from "@/feature/store/store";
import { Provider } from "react-redux";
import style from "./page.module.css";
import NavigationBar from "@/components/container/menuBar/navigationBar/NavigationBar";
import useRouterPush from "@/feature/hook/useRouterPush";
import { ROUTE } from "@/global/data/routeData";

export default function Home() {
  const routerPush = useRouterPush();

  return (
    <Provider store={store}>
      <NavigationBar />
      <div className={style.container}>
        <div className={style.header}>아티어 제작 메모</div>
        <div className={style.navigateBox}>
          <div className={style.atianNavigateButton} onClick={(() => {routerPush(ROUTE.artianCreate)})}>
            <p>아티어 무기 제작</p>
          </div>
          <div className={style.gogmaziosArtianNavigateButton} onClick={() => routerPush(ROUTE.advanceSetting)}>
            <p>거극 아티어 스킬</p>
          </div>
        </div>
      </div>
    </Provider>
  )
}
