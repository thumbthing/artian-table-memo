"use client";

import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { setGroupSkill, setGroupSkillSelecting, setSeriesSkillSelecting } from "@/feature/store/slices/table/tableSlice";
import style from "./SkillSelect.module.css"

export default function SkillSelect() {
  const dispatch = useAppDispatch();

  const seriesSkill = useAppSelector(state => state.table.seriesSkill);
  const groupSkill = useAppSelector(state => state.table.groupSkill);

  return (
    <div className={style.container}>
      <h3 className={style.skillSelectHeader}>스킬 선택</h3>
      <div className={style.skillSelectButtonBox}>
        <div className={style.seriesSkillButtonBox}>
          <input 
            type="text" 
            name="seriesSkill"
            defaultValue={seriesSkill}
            hidden={true}
            autoComplete="off"
          />
          <div onClick={() => dispatch(setSeriesSkillSelecting(true))}>
            {seriesSkill === "" ? "시리즈 스킬" : seriesSkill}
          </div>
        </div>
        <div className={style.groupSkillButtonBox}>
          <input 
            type="text" 
            name="groupSkill" 
            defaultValue={groupSkill} 
            hidden={true} 
            autoComplete="off"
          />
          <div onClick={() => dispatch(setGroupSkillSelecting(true))}>
            {groupSkill === "" ?"그룹 스킬" : groupSkill}
          </div>
          {groupSkill === "" &&
            <div className={""} onClick={() => dispatch(setGroupSkill("주인의 혼"))}>주인의 혼</div>
          }
        </div>
      </div>
    </div>
  )
}