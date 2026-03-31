"use client";

import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { sortTableRecord } from "@/feature/store/slices/table/tableSlice";
import { setSkillAssignmentDevice } from "@/feature/store/slices/tarred/tarredSlice";
import { ROUTE } from "@/global/data/routeData";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import style from "./NaviagateButton.module.css"

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
      <input type="button" className={style.button} value={"스킬 부여로 이동"} onClick={() => navigateToTableRecord()}/>
    </>
  )
}