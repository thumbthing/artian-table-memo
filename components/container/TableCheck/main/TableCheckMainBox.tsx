import TableRecordList from "@/components/tableRecordList/TableRecordList";
import WeaponTableRecordBox from "@/components/tableCheck/WeaponTableRecordBox";
import style from "./TableCheckMainBox.module.css"

export default function TableCheckMainBox() {
  return (
    <div className={style.box}>
      <WeaponTableRecordBox/>
      <TableRecordList />
    </div>
  )
}