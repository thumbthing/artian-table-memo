// 'use client'

import { ROUTE } from "@/global/data/routeData";
import style from "./NaviagateButton.module.css"
import useRouterPush from "@/feature/hook/useRouterPush";

export default function NavigateArtianCreateButton() {
  const routerPush = useRouterPush();

  return (
    <input type="button" className={style.button} value={`무기 제작`} onClick={() => routerPush(ROUTE.artianCreate)}/>
  )
}