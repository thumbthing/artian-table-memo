'use client';

import { ElementType, WeaponType } from "@/global/type/appType"
import style from "./TableRecordPortal.module.css"
import { createPortal } from "react-dom";
import TableRecordForm from "../../input/deviceInput/form/TableRecordForm";
import { useAppDispatch } from "@/app/hooks";
import { resetRecordState } from "@/feature/store/slices/table/tableSlice";

interface TableRecordInputProps {
  weaponName: WeaponType,
  elementName: ElementType,
}

export default function TableRecordPortal({weaponName, elementName}: TableRecordInputProps) {
  const dispatch = useAppDispatch();

  const closePortal = () => {
    dispatch(resetRecordState())
    close
  }

  return createPortal(
    <div className={style.overlay} onClick={() => {closePortal()}}>
      <div className={style.recordBox} onClick={(e) => e.stopPropagation()}>
        <div className={style.weaponInfoBox}>
          <h2>테이블 기록</h2>
          <h3>{weaponName} {elementName}</h3>
        </div>
        <TableRecordForm weaponName={weaponName} elementName={elementName}/>
      </div>
    </div>
  , document.body)
}