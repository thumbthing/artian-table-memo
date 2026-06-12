'use client';

import { useAppSelector } from "@/app/hooks";
import { getAdvanceWeaponObject } from "@/feature/parse/object/getAdvanceWeapon";
import { WEAPON_LIST } from "@/global/data/appData";
import style from "./WeaponTableRecord.module.css"
import { useState } from "react";
import TableCheckCard from "./TableCheckWeaponCard";
import { WeaponType } from "@/global/type/appType";
import { ElementSettingType } from "@/global/type/extendedType";
import VerifiedTableInputPortal from "../portal/tableInput/VerifiedTableInputPortal";

export default function WeaponTableRecordBox() {
  const weaponList = useAppSelector(state => state.weapon.weaponList)
  const weaponSetting = useAppSelector(state => state.weapon.weaponSetting)
  const [isTableInputVisible, setIsTableInputVisible] = useState<boolean>(false);

  const [selectedWeaponAdvanceSetting, setSelectedWeaponAdvanceSetting] = 
    useState<{
      weapon: WeaponType,
      advanceSetting: Partial<ElementSettingType>
    } | undefined>(undefined);

  const weaponAdvanceSetting = getAdvanceWeaponObject(weaponList, weaponSetting);
  
  return (
    <>
      <div className={style.box}>
        <div className={style.selectedWeaponBox}>
          {selectedWeaponAdvanceSetting !== undefined && 
            <TableCheckCard 
            weaponAdvanceSetting={selectedWeaponAdvanceSetting}
            dispatchSetState={setSelectedWeaponAdvanceSetting}
            />
          }
        </div>
        <div className={style.tableRecordInputSelectBox}>
          <div className={style.weaponListbox}>
            {WEAPON_LIST.map((weapon, index) => 
              <div 
                className={`${style.weaponButton} ${weaponList.includes(weapon) ? style.advanceSet : style.advanceUnSet} ${selectedWeaponAdvanceSetting?.weapon === weapon && style.selectedWeapon}`} 
                key={`record-select-button-${weapon}-${index}`}
                onClick={() => setSelectedWeaponAdvanceSetting(prev => {
                  if (weaponAdvanceSetting[weapon] === undefined) return prev;
                  if (prev?.weapon === weapon) return undefined;
                  return {
                    weapon : weapon,
                    advanceSetting: weaponAdvanceSetting[weapon]
                  }
                })}
              >
                {weapon}
              </div>
            )}
          </div>
          <div className={style.tableInputPortalButton} onClick={() => setIsTableInputVisible(true)}>
            직접 입력
          </div>
        </div>
      </div>
      {isTableInputVisible && <VerifiedTableInputPortal dispatchFn={setIsTableInputVisible}/>}
    </>
  )
}