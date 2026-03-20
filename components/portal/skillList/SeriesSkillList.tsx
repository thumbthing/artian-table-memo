"use client";

import { useAppDispatch } from "@/app/hooks";
import { resetAllSeriesSkillState, setSeriesSkill } from "@/feature/store/slices/table/tableSlice";
import { ORDERED_SERIES_SKILL } from "@/global/data/skillData";
import { createPortal } from "react-dom";
import style from "./SeriesSkillList.module.css"

export default function SeriesSkillList() {
  const dispatch = useAppDispatch()

  const closeProtal = () => {
    dispatch(resetAllSeriesSkillState());
    close
  }

  return createPortal(
    <div className={style.overlay} onClick={() => closeProtal()}>
      <div 
        className={style.skillListBox}
        onClick={(e) => e.stopPropagation()}
        >
      {ORDERED_SERIES_SKILL.map(skill => 
        <label key={skill}>
          <p onClick={() => {
            dispatch(setSeriesSkill(skill))
          }}>
            {skill}
          </p>
        </label>
      )}
      </div>
    </div>
  , document.body)
}