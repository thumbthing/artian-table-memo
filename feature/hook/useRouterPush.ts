'use client';

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

// useRouter 는 상대 경로로 이동하는게 맞다
// next js는 변경된 페이지에 필요한 js 번들만 가져와서 교체를 하기 때문
// 도메인을 제외한 절대 경로부터 작성하는게 옳은 방식

export default function useRouterPush() {
  const router = useRouter();

  const routerPushTo = useCallback((path: string) => {
    router.push(path);
  }, [])

  return routerPushTo
}