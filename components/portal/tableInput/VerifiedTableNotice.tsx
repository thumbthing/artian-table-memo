import { ELEMENT_LIST, WEAPON_LIST } from "@/global/data/appData"
import style from "./VerifiedTableNotice.module.css"

export default function VerifiedTableNotice() {
  return (
    <div className={style.container}>
      <h2>작성 방법</h2>
      <div className={style.format}>
        <p>번호</p>
        <p>무기</p>
        <p>속성</p>
        <p>시리즈/그룹</p>
      </div>
      
      <h4>예시</h4>
      <div className={style.exampleBox}>
        <p>99 슬래시액스 얼음 흉조룡의 힘</p>
        <p>1 대검 불 거극/주인의 혼</p>
        <p>200 활 마비</p>
        <p>2 헤비보우건 수면 암흑기사의 증표/주혼</p>
      </div>

      <div className={style.weaponElementBox}>
        <div className={style.weaponBox}>
          <h4>무기이름</h4>
          {WEAPON_LIST.map(weapon => 
            <p key={`table-notice-weapon-list-${weapon}`}>{weapon}</p>
          )}
        </div>
        <div>
          <h4>속성명</h4>
          {ELEMENT_LIST.map(element => 
            <p key={`table-notice-element-list-${element}`}>{element}</p>
          )}
        </div>
      </div>
    </div>
  )
}