import { TableRecordType } from "@/global/type/extendedType"
import { Fragment } from "react/jsx-runtime"
import style from "./OrderRecord.module.css"

interface OrderRecordProps {
  recordList: TableRecordType[],
  orderList: number[],
  viewRule: "table" | "weapon"
}

export default function OrderRecord({recordList, orderList, viewRule}: OrderRecordProps) {
  return (
    <div className={`${style.container} ${viewRule !== "table" ? style.hide : ""}`}>
      {orderList.map((order, index) => 
        <div className={style.box} key={`order-record-${order}-${index}`}>
          <div className={style.orderNumber}>{order}</div>
          <OrderRecordDeck recordList={recordList} order={order}/>
        </div>
      )}
    </div>
  )
}

interface OrderRecordDeckProps {
  recordList: TableRecordType[],
  order: number
}

function OrderRecordDeck({recordList, order}: OrderRecordDeckProps) {
  const orderRecordList = recordList.filter(record => record.order === order);

  return (
    <div className={style.deck}>
      {orderRecordList.map((record, index) => 
        <Fragment key={`order-list-${index}-${record.weaponName}-${record.elementName}-${record.order}`}>
          <OrderRecordCard record={record}/>
        </Fragment>
      )}
    </div>
  )
}

interface RecordCardProps {
  record: TableRecordType
}

function OrderRecordCard({record}: RecordCardProps) {
  return (
    <div className={style.card}>
      <div className={style.weaponInfoTag}>
        <p>{record.weaponName}</p>
        <p>{record.elementName}</p>
      </div>
      <div className={style.skillInfoTag}>
        <p>{record.seriesSkill}</p>
        <p>{record.groupSkill}</p>
      </div>
    </div>
  )
}