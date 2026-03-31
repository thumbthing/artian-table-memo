"use client";

import { useAppDispatch, useAppSelector } from "@/app/hooks";
import debounce from "@/feature/debounce/useDebounce";
import { normalizeTarredDeviceInput, normalizeFormData} from "@/feature/parse/userInput/normalizeTarredDeviceInput";
import { setInputAllDevice } from "@/feature/store/slices/tarred/tarredSlice";
import { ADVANCE_CODE } from "@/global/data/appData";
import { AdvanceType, TarredDeviceType } from "@/global/type/appType";
import { ChangeEvent, useRef, useState } from "react";
import style from "./DeviceInput.module.css"

interface TarredDeviceInputProps {
  deviceKey: AdvanceType,
  isSetting: boolean,
  tarred: TarredDeviceType
}

function TarredDeviceInput({deviceKey, isSetting, tarred}: TarredDeviceInputProps) {
  const input = useRef<number>(0);

  const handleInput = (e :ChangeEvent<HTMLInputElement>) => {
    const normailizedInput = normalizeTarredDeviceInput(e.target.value);
    input.current = normailizedInput;
  }

  const debounceInputChange = debounce(handleInput, 500);

  return (
    <div className={style.inputContainer}>
      <label className={style.inputLabel} htmlFor={deviceKey}>
        <div className={style.inputBox}>
          <p className={style.inputArea}>
            {ADVANCE_CODE[deviceKey]} : 
            <input 
              className={style.input}
              id={deviceKey}
              type="number"
              name={deviceKey}
              placeholder={`기존 : ${tarred[deviceKey]}`}
              onChange={(e) => debounceInputChange(e)}
              autoComplete="false"
              disabled={!isSetting}
            />
          </p>
        </div>
      </label>
    </div>
  )
}

export default function DeviceInputBox() {
  const tarredDevice = useAppSelector(state => state.tarred.input);
  const [isSetting, setIsSetting] = useState<boolean>(true);

  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const deviceForm = normalizeFormData(formData)

    setIsSetting(false)
    dispatch(setInputAllDevice(deviceForm))
  }

  return (
    <div className={style.box}>
      <h1 className={style.boxHeaderText}>테이블 확인</h1>
      <form className={style.form} onSubmit={(e) => handleSubmit(e)}>
        <h2 className={style.deviceFormHeaderText}>부식된 장치</h2>
        <TarredDeviceInput deviceKey={"attack"} isSetting={isSetting} tarred={tarredDevice}/>
        <TarredDeviceInput deviceKey={"affinity"} isSetting={isSetting} tarred={tarredDevice}/>
        <TarredDeviceInput deviceKey={"element"} isSetting={isSetting} tarred={tarredDevice}/>
        <div className={style.submitBox}>
          <input className={style.submitButton} type="submit" value={"설정"} disabled={!isSetting}/>
          <p className={style.submitLock}>
            잠금
            <input type="checkbox" checked={!isSetting} onChange={() => setIsSetting(!isSetting)}/>
          </p>
        </div>
      </form>
    </div>
  )
}
