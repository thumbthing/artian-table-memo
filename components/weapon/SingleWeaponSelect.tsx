"use client";

import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { removeWeapon, setWeaponSetting } from "@/feature/store/slices/weapon/weaponSlice";
import { Fragment, useState } from "react";
import { WeaponType, ElementType, AdvanceType } from "@/global/type/appType";
import { ADVANCE_CODE, ELEMENT_LIST, TARRED_DEVICE_ADVANCE_LIST } from "@/global/data/appData";
import style from "./SingleWeaponSelect.module.css"
import { getTypedObjectValues } from "@/feature/customFeature/object/objectParse";

interface WeaponProps {
  weaponName: WeaponType;
}

interface ElementFocusProps {
  weaponName: WeaponType;
  element: ElementType;
}

interface AdvanceCheckedButtonProps {
  advanceCode: AdvanceType;
  isChecked: boolean;
  updateAdvance: (advanceName: AdvanceType) => void
}

function AdvanceCheckedButton({advanceCode, isChecked, updateAdvance}: AdvanceCheckedButtonProps) {
  const buttonStyle = isChecked ? style[`${advanceCode}SettingLabel`] : style[`advanceUnChecked`];
  const advanceName = ADVANCE_CODE[advanceCode];

  return (
    <div className={buttonStyle} onClick={() => updateAdvance(advanceCode)}>
      <p>{advanceName}</p>
    </div>
  )
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

  const setAllAdvance = () => {
    const newCheck = {
      attack: true,
      affinity: true,
      element: true
    };

    const isAllChecked = [...getTypedObjectValues(check)].every(check => check === true);

    if (isAllChecked) {
      newCheck.attack = false;
      newCheck.affinity = false;
      newCheck.element = false;
    }

    const advanceSetting = {
      weapon: weaponName,
      element: element,
      advance: newCheck
    }

    setCheck(newCheck);
    dispatch(setWeaponSetting(advanceSetting))
  }

  return (
    <div className={style.singleElementAdvanceBox}>
      <div className={style.singleElementHeaderBox} onClick={() => {setAllAdvance()}}>
          <p className={style.singleElementHeaderText}>{element}</p>
      </div>
      <div className={style.singleElementSettingBox}>
    {
      TARRED_DEVICE_ADVANCE_LIST.map((advance, index) => {
        return (
        <Fragment key={`advance-checked-${advance}-${index}`}>
          <AdvanceCheckedButton advanceCode={advance} isChecked={check[advance]} updateAdvance={updateAdvance} />
        </Fragment>
        )
      })
    }
      </div>
    </div>
  )
}

function ElementList({weaponName}: WeaponProps) {
  const dispatch = useAppDispatch();
  return (
    <div className={style.weaponBox}>
      <div className={style.weaponHeader}>
        <p className={style.weaponHeaderText}>{weaponName}</p>
        <input className={style.weaponDeleteButton} type="button" value={"삭제"} onClick={() => dispatch(removeWeapon(weaponName))} />
      </div>
      <div className={style.weaponElementBox}>
        {ELEMENT_LIST.map((element) => 
          <Fragment key={`${weaponName}-${element}`}>
            <SingleElementAdvanceSetting weaponName={weaponName} element={element} />
          </Fragment>
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
      <Fragment key={`weapon-${singleWeapon}`}>
        <ElementList weaponName={singleWeapon} />
      </Fragment>
    )}
    </div>
  )
}