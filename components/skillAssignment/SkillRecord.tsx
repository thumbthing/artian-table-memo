import { TableRecordType } from "@/global/type/extendedType";
import style from "./SkillRecord.module.css"

interface SkillRecordPropsType {
  record: TableRecordType
}

export default function SkillRecord({record}: SkillRecordPropsType) {
  return (
    <div className={style.box}>
      <div className={style.weaponTag}>
        <div>{record.weaponName}</div>
        <div>{record.elementName} 속성</div>
      </div>
      <div className={style.skillTag}>
        <div>{record.seriesSkill}</div>
        <div>{record.groupSkill}</div>
      </div>
    </div>
  )
}