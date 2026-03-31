"use client";

import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { setGroupSkill, setGroupSkillSelecting, setSeriesSkillSelecting } from "@/feature/store/slices/table/tableSlice";
import style from "./SkillSelect.module.css"

export default function SkillSelect() {
  const dispatch = useAppDispatch();

  const seriesSkill = useAppSelector(state => state.table.seriesSkill);
  const groupSkill = useAppSelector(state => state.table.groupSkill);

  return (
    <div className={style.box}>
      <div className={style.seriesSkillBox}>
        <p className={style.skillSelectHeader}>
          시리즈 스킬 : 
        </p>
        <input 
          type="text" 
          name="seriesSkill"
          defaultValue={seriesSkill}
          hidden={true}
        />
        <div className={style.seriesSkillSelectButton} onClick={() => dispatch(setSeriesSkillSelecting(true))}>{seriesSkill === "" ? "스킬 목록" : seriesSkill}</div>
      </div>
      <div className={style.groupSkillBox}>
        <p className={style.skillSelectHeader}>그룹 스킬 :</p>
        <input 
          type="text" 
          name="groupSkill" 
          defaultValue={groupSkill} 
          hidden={true} 
          autoComplete="false"
        />
        <div className={style.groupSkillSelectBox}>
          <div className={style.groupSkillSelectButton} onClick={() => dispatch(setGroupSkillSelecting(true))}>{groupSkill === "" ? "스킬 목록" : groupSkill}</div>
        {groupSkill === "" &&
          <div className={style.groupSkillSelectButton} onClick={() => dispatch(setGroupSkill("주인의 혼"))}>주인의 혼</div>
        }
        </div>
      </div>
    </div>
  )
}