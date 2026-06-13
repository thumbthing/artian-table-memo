"use client";

import { useAppDispatch, useAppSelector } from "@/app/hooks";
import style from "./TableRecordList.module.css"
import { removeTableRecord, setIsRecordListOnView } from "@/feature/store/slices/table/tableSlice";
import { Fragment } from "react/jsx-runtime";
import { TableRecordType } from "@/global/type/extendedType";
import RecordListPortal from "../portal/recordList/RecordListPortal";
import useTableRecordString from "@/feature/hook/useTableRecordString";

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
  
  const recordString = useTableRecordString();
  
  const dispatch = useAppDispatch();

  const copyRecordListToClipBoard = async () => {
    await navigator.clipboard.writeText(recordString);
    return alert("테이블 기록이 클립보드에 저장되었습니다.")
  }

  
  return (
    <Fragment>
      <div className={style.box}>
        <div className={style.recordListHeader}>
          <h3>확인된 테이블</h3>
          <div className={style.recordButtonBox}>
            <div onClick={() => dispatch(setIsRecordListOnView(true))}>전체 기록 확인</div>
            <div onClick={() => copyRecordListToClipBoard()}>클립 보드에 저장</div>
          </div>
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