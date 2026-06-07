import { ElementType, WeaponType } from "@/global/type/appType";
import { TableRecordType } from "@/global/type/extendedType"
import { Fragment } from "react/jsx-runtime";
import style from "./WeaponRecord.module.css"
import { ELEMENT_LIST } from "@/global/data/appData";

interface WeaponRecordProps {
  recordList: TableRecordType[],
  weaponList: WeaponType[],
  viewRule: "table" | "weapon"
}

export default function WeaponRecord({recordList, weaponList, viewRule}: WeaponRecordProps) {

  return(
    <div className={`${style.container} ${viewRule !== "weapon" ? style.hide : ""}`}>
      {weaponList.map((weapon, index) => 
        <div className={style.weaponBox} key={`weapon-order-record-box-${weapon}-${index}`}>
          <div className={style.weaponName}>{weapon}</div>
          <WeaponRecordList weapon={weapon} recordList={recordList}/>
        </div>
      )}
    </div>
  )
}

interface WeaponRecordListProps {
  weapon: WeaponType
  recordList: TableRecordType[],
}

function WeaponRecordList({weapon, recordList}: WeaponRecordListProps) {
  const selectedWeaponList = recordList.filter(record => record.weaponName === weapon);

  return (
    <div className={style.singleWeaponRecordBox}> 
      {ELEMENT_LIST.map((element, index) => 
        <div className={style.elementBox} key={`record-element-box-${element}-${index}`}>
          <div className={style.elementName}>{element}</div>
          <ElementRecordList element={element} recordList={selectedWeaponList} />
        </div>
      )}
    </div>
  )
}

interface ElementRecordListProps {
  element: ElementType;
  recordList: TableRecordType[];
}

function ElementRecordList({element, recordList}: ElementRecordListProps) {
  const selectedRecordList = recordList.filter(record => record.elementName === element);

  return (
    <>
      {selectedRecordList.map((record, index) => 
        <Fragment key={`element-box-${record.weaponName}-${element}-${index}`}>
          <WeaponRecordCard record={record}/>
        </Fragment>
      )}
    </>
  )
}

interface WeaponRecordCardProps {
  record: TableRecordType
}

function WeaponRecordCard({record}: WeaponRecordCardProps) {
  return (
    <div className={style.card}>
      <p className={style.orderText}>{record.order}</p>
      <p className={style.seriesSkillText}>{record.seriesSkill}</p>
      <p className={style.groupSkillText}>{record.groupSkill}</p>
    </div>
  )
}