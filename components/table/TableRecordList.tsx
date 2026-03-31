"use client";

import { useAppDispatch, useAppSelector } from "@/app/hooks";
import style from "./TableRecordList.module.css"
import { removeTableRecord } from "@/feature/store/slices/table/tableSlice";
import { Fragment } from "react/jsx-runtime";

export default function TableRecordList() {
  const recordList = useAppSelector(state => state.table.tableRecordList);
  const dispatch = useAppDispatch();

  return (
    <div className={style.box}>
      <div className={style.recordListHeader}>
        <h3>테이블 기록</h3>
        <p>삭제할 기록은 클릭으로 삭제</p>
      </div>
      <div className={style.recordBox}>
        {recordList.map((record, index) => {
          return (
            <Fragment key={`record-${record.weaponName}-${record.elementName}-${record.order}-${index}`}>
              <label onClick={() => dispatch(removeTableRecord(index))}>
                <div className={style.record}>
                  <div className={style.recordInfoBox}>
                    <div className={style.weaponTag}>
                      <p>{record.weaponName}</p>
                      <p>{record.elementName}속성</p>
                    </div>
                    <div className={style.orderTag}>
                      <p>테이블</p>
                      <p>{record.order}</p>
                    </div>
                  </div>
                  <div className={style.skillTag}>
                    <div className={style.skillRecord}>
                      <p>{record.seriesSkill}</p>
                      <p>{record.groupSkill}</p>
                    </div>
                  </div>
                </div>
              </label>
            </Fragment>
          )
        })}
      </div>
    </div>
  )
}