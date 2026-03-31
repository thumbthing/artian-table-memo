"use client";

import { WEAPON_LIST } from "@/global/data/appData";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { addWeapon } from "@/feature/store/slices/weapon/weaponSlice";
import style from "./WeaponSelectBox.module.css";
import { WeaponType } from "@/global/type/appType";

// TODO: 배열 형태 push, pop으로는 리렌더가 일어나지 않는 이유 정리
export default function WeaponSelectBox() {
  const weaponList = useAppSelector(state => state.weapon.weaponList);
  const dispatch = useAppDispatch();

  const addUniqueWeaponList = (weapon: WeaponType) => {
    if (weaponList.includes(weapon)) {
      return;
    } else {
      dispatch(addWeapon(weapon))
    }
  };

  return (
    <div className={style.container}>
      <div className={style.selectHeader}>
        <p className={style.headerText}>격화 효율 설정</p>
      </div>
      <div className={style.selectListBox}>
        {WEAPON_LIST.map(weapon => 
          <div key={weapon} className={style.weaponName} onClick={() => addUniqueWeaponList(weapon)}>
            {weapon}
          </div>
        )}
      </div>
    </div>
  )
}