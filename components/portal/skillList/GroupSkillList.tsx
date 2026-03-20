"use client";

import { useAppDispatch } from "@/app/hooks";
import { resetAllGroupSkillState, setGroupSkill } from "@/feature/store/slices/table/tableSlice";
import { ORDERED_GROUP_SKILL } from "@/global/data/skillData";
import { createPortal } from "react-dom";
import style from "./GroupSkillList.module.css"

export default function GroupSkillList() {
  const dispatch = useAppDispatch()

  const closeProtal = () => {
    dispatch(resetAllGroupSkillState());
    close
  }

  return createPortal(
    <div className={style.overlay} onClick={() => closeProtal()}>
      <div 
        className={style.skillListBox}
        onClick={(e) => e.stopPropagation()}
        >
      {ORDERED_GROUP_SKILL.map(skill => 
        <label key={skill}>
          <p onClick={() => {
            dispatch(setGroupSkill(skill))
          }}>
            {skill}
          </p>
        </label>
      )}
      </div>
    </div>
  , document.body)
}