import { useAppDispatch } from "@/app/hooks";
import { ElementType, WeaponType } from "@/global/type/appType";
import { ElementSettingType } from "@/global/type/extendedType";
import { Dispatch, Fragment, SetStateAction } from "react";
import style from "./TableCheckWeaponCard.module.css"
import { getTypedObjectKeys } from "@/feature/customFeature/object/objectParse";
import { getDefaultRecordState } from "@/feature/store/slices/table/tableSlice";
import { ELEMENT_CODE, ELEMENT_LIST } from "@/global/data/appData";

interface TableCheckPortalProps {
  weaponAdvanceSetting: {
    weapon: WeaponType,
    advanceSetting: Partial<ElementSettingType>
  }
  dispatchSetState: Dispatch<SetStateAction<{
    weapon: WeaponType;
    advanceSetting: Partial<ElementSettingType>;
  } | undefined>>
}

export default function TableCheckCard({
  weaponAdvanceSetting,
  dispatchSetState
}: TableCheckPortalProps) {
  const elementList = getTypedObjectKeys(weaponAdvanceSetting.advanceSetting)

  return (
    <div className={style.box}>
      <h3 className={style.weaponName}>{weaponAdvanceSetting.weapon}</h3>
      <svg className={style.deActivateButton} viewBox="0 0 100 100" onClick={() => dispatchSetState(undefined)}>
        <path d="M 10 10 l 80 80 m -80 0 l 80 -80"/>
      </svg>
      <div className={style.elementBox}>
        {ELEMENT_LIST.map((element, index) => 
          <Fragment key={`table-record-selected-${weaponAdvanceSetting.weapon}-${element}-${index}`}>
            <ElementTableRecordButton weaponName={weaponAdvanceSetting.weapon} elementName={element} isAdvanceSet={elementList.includes(element)}/>
          </Fragment>
        )}
      </div>
    </div>
  )
}

interface ElementTableRecordProps {
  weaponName: WeaponType,
  elementName: ElementType
  isAdvanceSet: boolean
}

function ElementTableRecordButton({weaponName,elementName, isAdvanceSet}: ElementTableRecordProps) {
  const dispatch = useAppDispatch();

  const handleOnClick = () => {
    const recordState = {
      isOnRecord: true,
      weaponName: weaponName,
      elementName: elementName
    };

    dispatch(getDefaultRecordState(recordState));
  }

  return (
    <>
    {isAdvanceSet ? 
      <div className={`${style.singleElement} ${style[ELEMENT_CODE[elementName]]}`} onClick={() => handleOnClick()}>
        <p>{elementName}</p>
      </div>
      :
      <div className={`${style.singleElement} ${style.unSet}`}/>
    }
    </>
  )
}