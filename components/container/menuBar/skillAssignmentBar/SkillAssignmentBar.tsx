"use client";

import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { decreaseCount, increaseCount, setCount, setIsRecordListOnView } from "@/feature/store/slices/table/tableSlice";
import style from "./SkillAssignmentBar.module.css"
import NavigateTableCheckButton from "@/components/button/navigate/NavigateTableCheckButton";

export default function SkillAssignmentBar() {
  const dispatch = useAppDispatch();
  const recordList = useAppSelector(state => state.table.tableRecordList);
  const maxInput = recordList.at(-1)?.order;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const inputCount = Number(e.currentTarget.count.value);

    dispatch(setCount(inputCount))
  }

  return (
    <div className={style.menuBar}>
      <NavigateTableCheckButton />
      <div className={style.tableListButton} onClick={() => dispatch(setIsRecordListOnView(true))}>전체 테이블 기록 확인</div>

      <div className={style.tableCountContainer}>
        <div>
          <form className={style.tableMoveInputForm} onSubmit={(e) => handleSubmit(e)}>
            <p className={style.tableMoveInputText}>
              테이블 이동 :
              <input type="number" min="0" max={maxInput} className={style.tableMoveInput} name="count"/>
            </p>
            <button type="submit" className={style.tableMoveSubmitButton}>이동</button>
          </form>
        </div>
        <div className={style.countButtonBox}>
          <button className={style.countButton} onClick={() => dispatch(decreaseCount())}>이전 테이블</button>
          <button className={style.countButton} onClick={() => dispatch(increaseCount())}>다음 테이블</button>
        </div>
      </div>
    </div>
  )
}