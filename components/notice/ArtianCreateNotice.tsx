import style from "./ArtianCreateNotice.module.css"

export default function ArtianCreateNotice() {
  return (
    <div className={style.box}>
      <h2>입력 키</h2>
      <div className={style.keyPressNoticeBox}>
        <div className={style.convertKeyBox}>
          <div className={style.convertedKey}>예</div>
          <div className={style.convertedKey}>기</div>
          <div className={style.convertedKey}>회</div>
          <div className={style.convertedKey}>속</div>
        </div>
        <div className={style.arrowBox}>
          <div className={style.arrow}>={'>'}</div>
          <div className={style.arrow}>={'>'}</div>
          <div className={style.arrow}>={'>'}</div>
          <div className={style.arrow}>={'>'}</div>
        </div>
        <div className={style.numberKeyBox}>
          <div className={style.numberKey}>1</div>
          <div className={style.numberKey}>2</div>
          <div className={style.numberKey}>3</div>
          <div className={style.numberKey}>4</div>
        </div>
      </div>
    </div>
  )
}