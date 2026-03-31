import { createPortal } from "react-dom";
import style from "./RecordListPortal.module.css"
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { setIsRecordListOnView } from "@/feature/store/slices/table/tableSlice";
import { TableRecordType } from "@/global/type/extendedType";
import { Fragment } from "react/jsx-runtime";

interface RecordCardProps {
  tableRecord: TableRecordType,
}

function RecordCard({tableRecord}: RecordCardProps) {
  return (
    <div className={style.recordCard}>
      <div className={style.recordCardHeader}>
        <p>{tableRecord.weaponName}</p>
        <p>{tableRecord.elementName}</p>
      </div>
      <div className={style.recordCardSkill}>
        <p>{tableRecord.seriesSkill}</p>
        <p>{tableRecord.groupSkill}</p>
      </div>
    </div>
  )
}

interface OrderRecordDeckProps {
  recordList: TableRecordType[],
  order: number
}

function OrderRecordDeck({recordList, order}: OrderRecordDeckProps) {
  const sameOrderRecordList = recordList.filter(record => record.order === order);

  return (
    <div className={style.orderRecordDeckBox}>
      <div className={style.orderRecordDeckHeader}>{order}</div>
      {sameOrderRecordList.map((record, index) => 
      <Fragment key={`${index}-${record.weaponName}-${record.elementName}-${record.order}`}>
        <RecordCard tableRecord={record}/>
      </Fragment>)}
    </div>
  )
}

export default function RecordListPortal() {
  const recordList = useAppSelector(state => state.table.tableRecordList);
  const orderList = [...new Set(recordList.map(record => record.order))];
  const isEmptyList = recordList.length === 0;

  const dispatch = useAppDispatch();

  const closePortal = () => {
    dispatch(setIsRecordListOnView(false))
    close;
  }

  return createPortal(
  <div className={style.overlay} onClick={() => closePortal()}>
    <div className={style.recordListContainer}>
      <div className={style.recordListHeader}>테이블 기록 목록</div>
      <div className={style.recordListBox}>
      {isEmptyList ?
        <div className={style.noRecordNoticeText}>테이블 기록이 존재하지 않습니다.</div>
        :
        orderList.map((order, index) => 
        <Fragment key={`record-list-${order}-${index}`}>
          <OrderRecordDeck recordList={recordList} order={order}/>
        </Fragment>
        )
      }
      </div>
    </div>
  </div>, 
  document.body)
}