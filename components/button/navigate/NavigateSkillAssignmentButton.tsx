"use client";

import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { sortTableRecord } from "@/feature/store/slices/table/tableSlice";
import { setSkillAssignmentDevice } from "@/feature/store/slices/tarred/tarredSlice";
import { ROUTE } from "@/global/data/routeData";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export default function NavigateSkillAssignmentButton() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const navigateToTableRecord = useCallback(() => {
    dispatch(setSkillAssignmentDevice());
    dispatch(sortTableRecord());
    const tableRecordUrl = `${window.location.origin}${ROUTE.skillAssignment}`;
    router.push(tableRecordUrl);
  },[])


  return (
    <>
      <button onClick={() => navigateToTableRecord()}>스킬 부여 페이지로 이동</button>
    </>
  )
}