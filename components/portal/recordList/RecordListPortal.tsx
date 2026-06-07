import { createPortal } from "react-dom";
import style from "./RecordListPortal.module.css"
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { setIsRecordListOnView } from "@/feature/store/slices/table/tableSlice";
import { TableRecordType } from "@/global/type/extendedType";
import { Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { WeaponType } from "@/global/type/appType";
import WeaponRecord from "./WeaponRecord";
import OrderRecord from "./OrderRecord";

interface RecordDeckProps {
  recordList: TableRecordType[],
  recordOrderList: number[],
  recordWeaponList: WeaponType[],
  viewRule: ViewRuleType,
}

function RecordDeck({recordList, recordOrderList, recordWeaponList, viewRule}: RecordDeckProps) {

  return (
    <Fragment>
      <OrderRecord recordList={recordList} orderList={recordOrderList} viewRule={viewRule}/>
      <WeaponRecord recordList={recordList} weaponList={recordWeaponList} viewRule={viewRule}/>
    </Fragment>
  )
}

type ViewRuleType = "table" | "weapon"

export default function RecordListPortal() {
  const recordList = useAppSelector(state => state.table.tableRecordList);
  const recordOrderList = [...new Set(recordList.map(record => record.order))];
  const isEmptyRecordList = recordList.length === 0;

  const recordWeaponList = [...new Set(recordList.map(record => record.weaponName))];

  const dispatch = useAppDispatch();

  const [viewRule, setViewRule] = useState<ViewRuleType>("table");

  const closePortal = () => {
    dispatch(setIsRecordListOnView(false))
    close;
  }

  return createPortal(
  <div className={style.overlay} onClick={() => closePortal()}>
    <svg
      className={style.exitButton}
      onClick={() => closePortal()}
      viewBox="0 0 90 90"
    >
      <path
        d="M 10 10 l 70 70 m -70 0 l 70 -70"
      />
    </svg>
    <div className={style.recordListContainer} onClick={e => e.stopPropagation()}>
      <div className={style.recordListHeader}>
        <div className={`${style.orderRule} ${viewRule === "table" ? style.selectedOrderRule : ""}`} onClick={() => setViewRule("table")}>테이블 순서로 보기</div>
        <div className={`${style.orderRule} ${viewRule === "weapon" ? style.selectedOrderRule : ""}`}onClick={() => setViewRule("weapon")}>무기별로 보기</div>
      </div>
      <div className={style.recordBox}>
      {isEmptyRecordList ?
        <div className={style.noRecordNoticeText}>테이블 기록이 존재하지 않습니다.</div>
        :
        // recordOrderList.map((order, index) => 
        // <div key={`record-list-${order}-${index}`} style={{display: viewRule === "table" ? "block" : "none"}}>
        //   <TableOrderRecordDeck recordList={recordList} order={order}/>
        // </div>)
        <RecordDeck 
          recordList={recordList} 
          recordOrderList={recordOrderList} 
          recordWeaponList={recordWeaponList} 
          viewRule={viewRule}
        />
      }
      </div>
    </div>
  </div>, 
  document.body)
}