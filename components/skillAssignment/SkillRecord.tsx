import { TableRecordType } from "@/global/type/extendedType";
import style from "./SkillRecord.module.css"

interface SkillRecordPropsType {
  record: TableRecordType
}

export default function SkillRecord({record}: SkillRecordPropsType) {
  return (
    <div className={style.box}>
      <div className={style.weaponTag}>
        <div>
          <p>무기 :</p>
          <p>속성 :</p>
        </div>
        <div>
          <p>{record.weaponName}</p>
          <p>{record.elementName}속성</p>
        </div>
      </div>
      <div className={style.skillTag}>
        <div>
          <p>스킬</p>
        </div>
        <div className={style.skillRecord}>
          <p>{record.seriesSkill}</p>
          <p>{record.groupSkill}</p>
        </div>
      </div>
    </div>
  )
}