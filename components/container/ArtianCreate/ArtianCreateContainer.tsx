'use client';

import ArtianWeaponInput from "@/components/input/artianWeapon/ArtianWeaponInput";
import { Fragment } from "react/jsx-runtime";
import style from "./ArtianCreateContainer.module.css"

export default function ArtianCreateContainer() {
  const screenMaxValue = 14;
  const screenArray = new Array(screenMaxValue).fill(undefined);

  return (
    <div className={style.container}>
      <div>
    {screenArray.map((value, index) =>
      <Fragment key={`artina-${index}`}>
        <ArtianWeaponInput index={index} />
      </Fragment>
      ) 
    }
      </div>
    </div>
  )
}