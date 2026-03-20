"use client";

import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { setGroupSkill, setGroupSkillSelecting, setSeriesSkillSelecting } from "@/feature/store/slices/table/tableSlice";

export default function SkillSelect() {
  const dispatch = useAppDispatch();

  const seriesSkill = useAppSelector(state => state.table.seriesSkill);
  const groupSkill = useAppSelector(state => state.table.groupSkill);

  return (
    <div>
      <div>
        <p>스킬</p>
      </div>
      <div>
        <div>
          <p>시리즈 스킬 :</p>
          <input 
            type="text" 
            name="seriesSkill"
            defaultValue={seriesSkill}
            hidden={true}
          />
        {seriesSkill === "" ? 
          <div onClick={() => dispatch(setSeriesSkillSelecting(true))}>스킬목록 에서 선택</div>
          :
          <div onClick={() => {dispatch(setSeriesSkillSelecting(true))}}>{seriesSkill}</div>
        }
        </div>
        <div>
          <div>
            <p>그룹 스킬 :</p>
            <input type="text" name="groupSkill" defaultValue={groupSkill} hidden={true} autoComplete="false"/>
          {groupSkill === "" ? 
            <>
              <button onClick={() => dispatch(setGroupSkillSelecting(true))}>스킬 목록</button>
              <button onClick={() => dispatch(setGroupSkill("주인의 혼"))}>주인의 혼</button>
            </>
            :
            <>
              <p onClick={() => dispatch(setGroupSkillSelecting(true))}>{groupSkill}</p>
            </>
          }
          </div>
        </div>
      </div>
    </div>
  )
}