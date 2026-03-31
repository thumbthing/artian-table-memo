"use client";

import { useRouter } from "next/navigation";
import style from "./NaviagateButton.module.css"

// TODO : window.location이 hook 또는 함수 내부에 있어야하는 이유에 대해서 정리
// Next.js 의 기본적인 ssr 동작에 의한 것으로 판단됨
export default function NavigateHomeButton () {
  const buttonText = "홈으로"
  
  const router = useRouter();
  
  const moveToHome = () => {
    const location = window.location.origin;
    router.push(location)
  }

  return (
    <>
      <input type="button" className={style.button} value={buttonText} onClick={() => moveToHome()}/>
    </>
  )
}