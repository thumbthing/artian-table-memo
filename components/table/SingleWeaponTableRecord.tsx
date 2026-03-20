"use client";

import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { ElementType, WeaponType } from "@/global/type/appType"
import { AdvanceSettingType } from "@/global/type/extendedType";
import { useEffect, useState } from "react";
import { getTypedObjectKeys } from "@/feature/customFeature/object/objectParse";
import style from "./SingleWeaponTableRecord.module.css"
import { ELEMENT_CODE } from "@/global/data/appData";
import { getDefaultRecordState } from "@/feature/store/slices/table/tableSlice";
import { getTableRecordTotalAmount } from "@/feature/calculate/tarredDevice/getTableCheckAmount";

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

// function getTableCheckAmount(deviceAmount: number, advanceSetting: boolean) {
//   const divideNumber = advanceSetting ? 3 : 6;
//   return Math.floor(deviceAmount / divideNumber);
// }

function ElementTableRecord({weaponName, elementName, advanceSetting}: ElementTableRecodrProps) {
  const device = useAppSelector(state => state.tarred.input)
  const dispatch = useAppDispatch();

  const [tableRecordAmount, setTableRecordAmount] = useState<number>(0);

  useEffect(() => {
    const tableRecordAmount = getTableRecordTotalAmount(device, advanceSetting);

    setTableRecordAmount(tableRecordAmount)
  }, [device]);

  const handleOnClick = () => {
    const recordState = {
      isOnRecord: true,
      weaponName: weaponName,
      elementName: elementName
    };

    dispatch(getDefaultRecordState(recordState))
  }

  if (tableRecordAmount > 0) {
    return (
      <label>
        <div className={`${style.singleElement} ${style[ELEMENT_CODE[elementName]]}`} onClick={() => handleOnClick()}>
          <p>{elementName}</p>
          <p>{tableRecordAmount}</p>
        </div>
      </label>
    )
  }
}

export default function SingleWeaponTableRecord({weaponName, elementSetting}: SingleWeaponTableRecordProps) {
  const [elementList] = useState(getTypedObjectKeys(elementSetting))

  return (
    <div className={style.box}>
      <div className={style.weaponNameBox}>
        {weaponName}
      </div>
      <div className={style.elementBox}>
        {
          elementList.map(element => {
            if (elementSetting[element]) {
              return (
                <div key={`${weaponName}-${element}`}>
                  <ElementTableRecord weaponName={weaponName} elementName={element} advanceSetting={elementSetting[element]}/>
                </div>
              )
            }
          })
        }
      </div>
    </div>)
}