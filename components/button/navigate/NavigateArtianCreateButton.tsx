'use client'

import { ROUTE } from "@/global/data/routeData";
import { useRouter } from "next/navigation"
import style from "./NaviagateButton.module.css"

export default function NavigateArtianCreateButton() {
  const router = useRouter();

  const navigateToArtianCreate = () => {
    const artianCreatePath = `${window.location.origin}${ROUTE.artianCreate}`

    router.push(artianCreatePath);
  }

  return (
    <input type="button" className={style.button} value={`무기 제작`} onClick={() => navigateToArtianCreate()}/>
    
  )
}