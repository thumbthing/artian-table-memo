"use client";

import { useAppDispatch } from "@/app/hooks";
import { resetAllGroupSkillState, setGroupSkill } from "@/feature/store/slices/table/tableSlice";
import { ORDERED_GROUP_SKILL } from "@/global/data/skillData";
import { createPortal } from "react-dom";
import style from "./SeriesGroupSkillList.module.css"

export default function GroupSkillList() {
  const dispatch = useAppDispatch()

  const closePortal = () => {
    dispatch(resetAllGroupSkillState());
    close
  }

  return createPortal(
    <div className={style.overlay} onClick={() => closePortal()}>
      <div className={style.portalContainer} onClick={(e) => e.stopPropagation()}>
        <p className={style.skillListHeader}>그룹 스킬 목록</p>
        <div className={style.skillListBox}>
        {ORDERED_GROUP_SKILL.map(skill => 
          <label key={skill}>
            <div  className={style.singleSkill} onClick={() => {
              dispatch(setGroupSkill(skill))
            }}>
              {skill}
            </div>
          </label>
        )}
        </div>
      </div>
    </div>
  , document.body)
}