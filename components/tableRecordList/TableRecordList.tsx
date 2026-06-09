"use client";

import { useAppDispatch, useAppSelector } from "@/app/hooks";
import style from "./TableRecordList.module.css"
import { removeTableRecord, setIsRecordListOnView } from "@/feature/store/slices/table/tableSlice";
import { Fragment } from "react/jsx-runtime";
import { TableRecordType } from "@/global/type/extendedType";
import RecordListPortal from "../portal/recordList/RecordListPortal";

interface TableRecordProps {
  tableRecord: TableRecordType,
  index: number
}

function TableRecord({tableRecord, index}: TableRecordProps) {
  const dispatch = useAppDispatch();

  return (
    <label className={style.recordLabel} onClick={() => dispatch(removeTableRecord(index))}>
      <div className={style.orderBox}>
        <p className={""}>{tableRecord.order}</p>
      </div>
      <div className={style.weaponBox}>
        <p className={""}>{tableRecord.weaponName}</p>
        <p className={""}>{tableRecord.elementName}</p>
      </div>
      <div className={style.skillBox}>
        <p>{tableRecord.seriesSkill}</p>
        <p>{tableRecord.groupSkill}</p>
      </div>
    </label>
  )
}

export default function TableRecordList() {
  const recordList = useAppSelector(state => state.table.tableRecordList);
  const isRecordListOnView = useAppSelector(state => state.table.isRecordListOnView);

  const dispatch = useAppDispatch();

  return (
    <Fragment>
      <div className={style.box}>
        <div className={style.recordListHeader}>
          <h3>확인된 테이블</h3>
          <div onClick={() => dispatch(setIsRecordListOnView(true))}>전체 목록 확인</div>
          <p>삭제할 기록은 클릭으로 삭제</p>
        </div>
        <div className={style.recordBox}>
          {recordList.map((record, index) => {
            return (
              <Fragment key={`record-${record.weaponName}-${record.elementName}-${record.order}-${index}`}>
                <TableRecord tableRecord={record} index={index} />
              </Fragment>
            )
          })}
        </div>
      </div>
      {isRecordListOnView && <RecordListPortal/>}
    </Fragment>
  )
}