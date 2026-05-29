import { WeaponType } from "@/global/type/appType";
import { Dispatch, Fragment, SetStateAction } from "react";
import { createPortal } from "react-dom";
import style from "./AdvanceSettingErrorPortal.module.css"

type AdvanceSettingNoticeTextType = {
  header: string,
  unsetWeapon: string,
  default: string
}

interface AdvanceSettingErrorPortalProps {
  noticeText: AdvanceSettingNoticeTextType,
  unSetWeaponList: WeaponType[]
  dispatchValidFn: Dispatch<SetStateAction<boolean | undefined>>,
}

export default function AdvanceSettingErrorPortal({
  noticeText, 
  unSetWeaponList,
  dispatchValidFn, 
}: AdvanceSettingErrorPortalProps) {
  const closePortal = () => {
    dispatchValidFn(undefined)
    close
  }

  return createPortal(
    <div className={style.overlay} onClick={() => closePortal()}>
      <div className={style.box}>
        <h1 className={style.header}>{noticeText.header}</h1>
        { unSetWeaponList.length > 0 ?
          <>
            <h2 className={style.unsetSetting}>{noticeText.unsetWeapon}</h2>
            <div className={style.unsetWeaponList}>
              {unSetWeaponList.map(weapon => 
                <Fragment key={`miss-match-weapon-${weapon}`}>
                  <p className={style.unsetWeapon}>{weapon}</p>
                </Fragment>
              )}
            </div>
          </>
          :
          <h2 className={style.unsetSetting}>{noticeText.default}</h2>
        }
      </div>
    </div>
  , document.body)
}