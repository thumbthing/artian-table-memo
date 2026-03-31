'use client';

import { ElementType, WeaponType } from "@/global/type/appType"
import style from "./TableRecordPortal.module.css"
import { createPortal } from "react-dom";
import TableRecordForm from "../../input/deviceInput/form/TableRecordForm";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { resetRecordState } from "@/feature/store/slices/table/tableSlice";
// import { useEffect } from "react";

interface TableRecordInputProps {
  weaponName: WeaponType,
  elementName: ElementType,
}

export default function TableRecordPortal({weaponName, elementName}: TableRecordInputProps) {
  // const isOnRecord = useAppSelector(state => state.table.isOnRecord);
  const dispatch = useAppDispatch();

  const closePortal = () => {
    dispatch(resetRecordState())
    close
  }

  // useEffect(() => {
  //   const handler = (e: KeyboardEvent) => {
  //     if (e.key === "Escape") close();
  //   }

  //   window.addEventListener("keydown", handler)

  //   return () => {
  //     window.removeEventListener("keydown", handler);
  //   }
  // }, [])

  return createPortal(
    <div className={style.overlay} onClick={() => {closePortal()}}>
      <div className={style.recordBox} onClick={(e) => e.stopPropagation()}>
        <div className={style.weaponInfo}>
          <h3>무기 : {weaponName}</h3>
          <h3>속성 : {elementName}속성</h3>
        </div>
        <TableRecordForm weaponName={weaponName} elementName={elementName}/>
      </div>
    </div>
  , document.body)
}