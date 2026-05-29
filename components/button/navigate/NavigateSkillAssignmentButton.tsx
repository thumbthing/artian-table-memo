"use client";

import { useAppDispatch } from "@/app/hooks";
import { sortTableRecord } from "@/feature/store/slices/table/tableSlice";
import { ROUTE } from "@/global/data/routeData";
import style from "./NaviagateButton.module.css"
import useRouterPush from "@/feature/hook/useRouterPush";

export default function NavigateSkillAssignmentButton() {
  const dispatch = useAppDispatch();
  const routerPush = useRouterPush();

  const navigateToTableRecordPage = () => {
    dispatch(sortTableRecord());
    routerPush(ROUTE.skillAssignment)
  }

  return (
    <input type="button" className={style.button} value={"스킬 부여로 이동"} onClick={() => navigateToTableRecordPage()}/>
  )
}