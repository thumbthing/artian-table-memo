"use client";

import { useAppSelector } from "@/app/hooks";
import style from "./TableRecordList.module.css"

export default function TableRecordList() {
  const recordList = useAppSelector(state => state.table.tableRecordList);
  return (
    <div className={style.box}>
      <div>
        <p>테이블 기록</p>
      </div>
      <div>
        {recordList.map((record, index) => {
          return (
            <div className={style.record} key={`record-${record.weaponName}-${record.elementName}-${record.order}-${index}`}>
              <div className={style.weaponTag}>
                <p>
                  {record.weaponName}
                </p>
                <p>
                  {record.elementName}속성
              </p>
              </div>
              <div>
                <p>제작 횟수 : {record.order}</p>
              </div>
              <div className={style.skillTag}>
                <p>{record.seriesSkill}</p>
                <p>{record.groupSkill}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}