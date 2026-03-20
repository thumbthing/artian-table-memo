'use client';

import { useAppSelector } from "@/app/hooks";
import SingleWeaponTableRecord from "./SingleWeaponTableRecord";
import { getAdvanceWeaponObject } from "@/feature/parse/object/getAdvanceWeapon";

export default function WeaponTableRecordBox() {
  const weaponList = useAppSelector(state => state.weapon.weaponList)
  const weaponSetting = useAppSelector(state => state.weapon.weaponSetting)

  const weaponAdvanceSetting = getAdvanceWeaponObject(weaponList, weaponSetting);
  
  return (
    <div>
      {
        weaponList.map((weapon) => {
          if (weaponAdvanceSetting[weapon]) {
            return (
              <div key={weapon}>
                <SingleWeaponTableRecord weaponName={weapon} elementSetting={weaponAdvanceSetting[weapon]} />
              </div>
            )
          }
        })
      }
    </div>
  )
}