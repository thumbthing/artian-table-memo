"use client";

import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { ElementType, WeaponType } from "@/global/type/appType"
import { AdvanceSettingType, TableRecordType } from "@/global/type/extendedType";
import { Fragment, useEffect, useState } from "react";
import { getTypedObjectKeys } from "@/feature/customFeature/object/objectParse";
import style from "./SingleWeaponTableRecord.module.css"
import { ELEMENT_CODE } from "@/global/data/appData";
import { getDefaultRecordState } from "@/feature/store/slices/table/tableSlice";

interface SingleWeaponTableRecordProps {
  weaponName: WeaponType;
  elementSetting: Partial<Record<ElementType, AdvanceSettingType>>;
}

interface ElementTableRecodrProps {
  weaponName: WeaponType;
  elementName: ElementType;
  advanceSetting: {
    attack: boolean,
    affinity: boolean,
    element: boolean
  }
}

function ElementTableRecord({weaponName, elementName, advanceSetting}: ElementTableRecodrProps) {
  const tableRecord = useAppSelector(state => state.table.tableRecordList);
  const dispatch = useAppDispatch();

  const [elementTableRecord, setElementTableRecord] = useState<TableRecordType[]>([]);

  
  
  useEffect(() => {
    const filterdTableRecord = tableRecord.filter(table => table.weaponName === weaponName && table.elementName === elementName)

    if (filterdTableRecord.length === elementTableRecord.length) return;

    setElementTableRecord(filterdTableRecord)

  }, [tableRecord]);

  const handleOnClick = () => {
    const recordState = {
      isOnRecord: true,
      weaponName: weaponName,
      elementName: elementName
    };

    dispatch(getDefaultRecordState(recordState))
  }

  return (
    <label>
      <div className={`${style.singleElement} ${style[ELEMENT_CODE[elementName]]}`} onClick={() => handleOnClick()}>
        <p>{elementName}</p>
        <p>{elementTableRecord.length}</p>
      </div>
    </label>
  )
}

export default function SingleWeaponTableRecord({weaponName, elementSetting}: SingleWeaponTableRecordProps) {
  const [elementList] = useState(getTypedObjectKeys(elementSetting))

  return (
    <div className={style.box}>
      <h3 className={style.weaponNameBox}>
        {weaponName}
      </h3>
      <div className={style.elementBox}>
        {
          elementList.map(element => {
            if (elementSetting[element]) {
              return (
                <Fragment key={`${weaponName}-${element}`}>
                  <ElementTableRecord weaponName={weaponName} elementName={element} advanceSetting={elementSetting[element]}/>
                </Fragment>
              )
            }
          })
        }
      </div>
    </div>)
}