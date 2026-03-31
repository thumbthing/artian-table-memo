"use client";

import { useAppDispatch } from "@/app/hooks";
import { resetAllSeriesSkillState, setSeriesSkill } from "@/feature/store/slices/table/tableSlice";
import { ORDERED_SERIES_SKILL } from "@/global/data/skillData";
import { createPortal } from "react-dom";
import style from "./SeriesGroupSkillList.module.css"

export default function SeriesSkillList() {
  const dispatch = useAppDispatch()

  const closeProtal = () => {
    dispatch(resetAllSeriesSkillState());
    close
  }

  return createPortal(
    <div className={style.overlay} onClick={() => closeProtal()}>
      <div className={style.portalContainer} onClick={(e) => e.stopPropagation()}>
        <p className={style.skillListHeader}>시리즈 스킬 목록</p>
        <div className={style.skillListBox}>
        {ORDERED_SERIES_SKILL.map(skill => 
          <label key={skill}>
            <div className={style.singleSkill} onClick={() => {
              dispatch(setSeriesSkill(skill))
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