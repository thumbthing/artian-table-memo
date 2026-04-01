'use client';

import { ChangeEvent, useState } from "react";
import style from "./ArtianWeaponInput.module.css"


interface ArtianWeaponInputType {
  index: number
}

export default function ArtianWeaponInput ({index}: ArtianWeaponInputType) {
  const [input, setInput] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let addString = "";
    const lastInput = e.target.value.at(-1);

    if (lastInput === undefined) return;

    switch(lastInput) {
      case "1" : {
        addString = "예";
        break;
      }
      case "2" : {
        addString = "기";
        break;
      }
      case "3" : {
        addString = "회";
        break;
      }
      case "4" : {
        addString = "속"
        break
      }
    }

    if (addString === "") return;

    setInput(`${input}${addString}`)
  }

  const handleClick = () => {
    setInput("");
  }

  return (
    <div className={style.inputBox}>
      <div className={style.order}>{index + 1}</div>
      <input type="text" className={style.inputArea} onChange={(e) => handleChange(e)} onClick={() => handleClick()} maxLength={5} value={input}/>
    </div>
  )
}