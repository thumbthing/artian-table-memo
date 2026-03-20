"use client";

import { ROUTE } from "@/global/data/routeData";
import { useRouter } from "next/router";
import { useRef, useState } from "react";

export default function NavigationBar() {
  const router = useRouter();

  const locationRef = useRef<string>(window.location.origin);

  const [appRoute, setAppRoute] = useState(
  {
    home: `${locationRef.current}${ROUTE.home}`,
    advanceSetting: `${locationRef.current}${ROUTE.advanceSetting}`,
    tableCheck: `${locationRef.current}${ROUTE.tableCheck}`,
    skillAssignment: `${locationRef.current}${ROUTE.skillAssignment}`
  });

  return (
    <div>
      <div onClick={() => {router.push(appRoute.home)}}>홈</div>
      <div onClick={() => {router.push(appRoute.advanceSetting)}}>격화 세팅</div>
      <div onClick={() => {router.push(appRoute.tableCheck)}}>테이블 확인</div>
      <div onClick={() => {router.push(appRoute.skillAssignment)}}>스킬 부여</div>
    </div>
  )
}