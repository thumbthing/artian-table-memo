"use client";

import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { removeWeapon, setWeaponSetting } from "@/feature/store/slices/weapon/weaponSlice";
import { useState } from "react";
import { WeaponType, ElementType, AdvanceType } from "@/global/type/appType";
import { ELEMENT_LIST } from "@/global/data/appData";
import style from "./SingleWeaponSelect.module.css"

interface WeaponProps {
  weaponName: WeaponType;
}

interface ElementFocusProps {
  weaponName: WeaponType;
  element: ElementType;
}

type CheckType = Record<AdvanceType, boolean>;

function SingleElementAdvanceSetting({weaponName, element}: ElementFocusProps) {
  const dispatch = useAppDispatch()

  const weaponElementAdvanceSetting = useAppSelector(state => state.weapon.weaponSetting[weaponName][element])
  
  const [check, setCheck] = useState<CheckType>({
    attack: !weaponElementAdvanceSetting ? false : weaponElementAdvanceSetting.attack,
    affinity: !weaponElementAdvanceSetting ? false : weaponElementAdvanceSetting.affinity,
    element: !weaponElementAdvanceSetting ? false : weaponElementAdvanceSetting.element
  });


// TODO: Object 형태의 state 최신화 방법 정리
  const updateAdvance = (focus: AdvanceType) => {
    const newCheck = {...check};
    newCheck[focus] = !check[focus];
    setCheck(newCheck);

    const advanceSetting = {
      weapon: weaponName,
      element: element,
      advance: newCheck
    }

    dispatch(setWeaponSetting(advanceSetting))
  }

  return (
    <div className={style.singleElementAdvance}>
        {/* <p onClick={() => setAdvance(!advance)}>{element}</p> */}
      <div className={style.singleElementHeader}>{element}</div>
      {/* {advance &&  */}
      <div className={style.singleElementSettingBox}>
        <label>
          공격
          <input 
            type="checkbox" 
            id={`${element}-attack`} 
            value="attack" 
            onChange={() => updateAdvance("attack")}
            checked={check.attack}
            />
        </label>
        <label>
          회심
          <input 
            type="checkbox" 
            id={`${element}-affinity`} 
            value="affinity" 
            onChange={() => updateAdvance("affinity")}
            checked={check.affinity}
            />
        </label>
        <label>
          속성
          <input 
            type="checkbox" 
            id={`${element}-element`} 
            value="element" 
            onChange={() => updateAdvance("element")}
            checked={check.element}
            />
        </label>
      </div>
      {/* } */}
    </div>
  )
}

function ElementList({weaponName}: WeaponProps) {
  const dispatch = useAppDispatch();
  return (
    <div key={weaponName}>
      <div className={style.elementHeader}>
        <p>{weaponName}</p>
        <input type="button" value={"삭제"} onClick={() => dispatch(removeWeapon(weaponName))} />
      </div>
      <div className={style.weaponElementBox}>
        {ELEMENT_LIST.map((element) => 
          <div key={`${weaponName}-${element}`}>
            <SingleElementAdvanceSetting weaponName={weaponName} element={element} />
          </div>
        )}
      </div>
    </div>
  )
}

export default function WeaponAdvanceSettingList() {
  const weaponList = useAppSelector(state => state.weapon.weaponList);

  return (
    <div className={style.container}>
      {weaponList.map((singleWeapon: WeaponType) => 
      <div className={style.weaponBox} key={`weapon-${singleWeapon}`}>
        <ElementList weaponName={singleWeapon} />
      </div>)}
    </div>
  )
}