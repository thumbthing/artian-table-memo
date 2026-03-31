"use client";

import { ROUTE } from "@/global/data/routeData";
import Link from "next/link";
import style from "./NavigationBar.module.css"

export default function NavigationBar() {

  return (
    <article className={style.menuBar}>
      <nav className={style.nav}>
        <Link href={ROUTE.home} className={style.link}>
          메인
        </Link>
      </nav>
      <nav className={style.nav}>
        <Link href={ROUTE.artianCreate} className={style.link}>
          아티어
        </Link>
      </nav>
      <nav className={style.nav}>
        <Link href={ROUTE.advanceSetting} className={style.link}>
          격화 세팅
        </Link>
      </nav>
      <nav className={style.nav}>
        <Link href={ROUTE.tableCheck} className={style.link}>
          테이블 확인
        </Link>
      </nav>
      <nav className={style.nav}>
        <Link href={ROUTE.skillAssignment} className={style.link}>
          스킬 재부여
        </Link>
      </nav>
    </article>
  )
}