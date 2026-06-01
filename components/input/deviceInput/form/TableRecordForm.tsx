"use client";

import { AdvanceType, ElementType, WeaponType } from "@/global/type/appType";
import SkillSelect from "./skill/SkillSelect";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { KeyboardEvent, MouseEvent, RefObject, useEffect, useLayoutEffect, useRef, useState } from "react";
import { normalizeSkill } from "@/feature/parse/userInput/normalizeSkill";
import { addTableRecord } from "@/feature/store/slices/table/tableSlice";
import { getTableRecordTotalAmount } from "@/feature/calculate/tarredDevice/getTableCheckAmount";
import style from "./TableRecordForm.module.css"
import NumberPad from "@/components/numberPad/NumberPad";
import { ADVANCE_CODE, TARRED_DEVICE_ADVANCE_LIST } from "@/global/data/appData";
import { KEY_PRESS } from "@/global/data/keyData";
import { getTypedObjectValues } from "@/feature/customFeature/object/objectParse";

interface TableRecordInputProps {
  inputRef: RefObject<HTMLInputElement | null>,
  handleKeyPressValue: (
    e: KeyboardEvent<HTMLInputElement>, 
    activeInput: AdvanceType | null, 
    deviceKey: AdvanceType
  ) => void,
  handleFocusOnClick: (
    e: MouseEvent<HTMLInputElement, globalThis.MouseEvent>, 
    deviceKey: AdvanceType) => void,
  recordInput: Record<AdvanceType, string>,
  activeInput: AdvanceType | null,
  deviceKey: AdvanceType
}

interface TableRecordFormProps {
  weaponName: WeaponType,
  elementName: ElementType
}

function TableRecordInput({
  inputRef, 
  handleKeyPressValue, 
  handleFocusOnClick,
  recordInput,
  activeInput,
  deviceKey}: TableRecordInputProps) {
  return (
    <div className={style.inputBox}>
      <p className={style.inputArea}>
        {ADVANCE_CODE[deviceKey]}
        <input
          ref={inputRef}
          className={style.input}
          id={deviceKey}
          type="text"
          inputMode="numeric"
          name={deviceKey}
          defaultValue={recordInput[deviceKey]}
          onKeyDown={(e) => handleKeyPressValue(e, activeInput, deviceKey)}
          onClick={(e) => handleFocusOnClick(e, deviceKey)}
          autoComplete="off"
        />
      </p>
    </div>
  )
}

export default function TableRecordForm({weaponName, elementName}: TableRecordFormProps) {
  const tarredDevice = useAppSelector(state => state.tarred.input);
  const advanceSetting = useAppSelector(state => state.weapon.weaponSetting[weaponName][elementName])
  const dispatch = useAppDispatch();

  const recordAttackInputRef = useRef<HTMLInputElement | null>(null);
  const recordAffinityInputRef = useRef<HTMLInputElement | null>(null);
  const recordElementInputRef = useRef<HTMLInputElement | null>(null);

  const [activeInput, setActiveInput] = useState<AdvanceType | null>(null);
  const [recordInput, setRecordInput] = useState<Record<AdvanceType, string>>({
    attack: "",
    affinity: "",
    element: ""
  });
  const [validRecordInput, setValidRecordInput] = useState<Record<AdvanceType, boolean>>({
    attack: false,
    affinity: false,
    element: false,
  });

  const [recordInputCursor, setRecordInputCursor] = useState<Record<AdvanceType, number>>({
    attack: 0,
    affinity: 0,
    element: 0
  })

  const resetRecordFormState = () => {
    setActiveInput(null);
    setRecordInput({
      attack: "",
      affinity: "",
      element: ""
    });
    setValidRecordInput({
      attack: false,
      affinity: false,
      element: false
    });
    setRecordInputCursor({
      attack: 0,
      affinity: 0,
      element: 0
    })
  }

  useLayoutEffect(() => {
    if (activeInput === null) return;
    const ref = getRecordInputRef(activeInput);
    const cursor = recordInputCursor[activeInput];

    ref?.current?.setSelectionRange(cursor, cursor);
    ref?.current?.focus();
  }, [recordInput, activeInput]);

  useEffect(() => {
    if (activeInput === null) return;

    const updatedRecordInput = recordInput[activeInput];

    const isNotEmpty = updatedRecordInput !== "";
    const isInRange = Number(updatedRecordInput) <= tarredDevice[activeInput];

    const divideDigit = advanceSetting[activeInput] ? 3 : 6;
    const isNoRemain = (tarredDevice[activeInput] - Number(updatedRecordInput)) % divideDigit === 0;


    const checkedValid = (isNotEmpty && isInRange && isNoRemain);

    setValidRecordInput(prev => {
      if (prev[activeInput] === checkedValid) return prev;

      return {
        ...prev,
        [activeInput]: checkedValid
      }
    });

  }, [recordInput])
  
  // 테이블 기록 input ref declare
  const getRecordInputRef = (deviceKey: AdvanceType | null) => {
    if (deviceKey === null) return null;

    const inputRef = {
      attack: recordAttackInputRef,
      affinity: recordAffinityInputRef,
      element: recordElementInputRef
    }

    const selectedInputRef = inputRef[deviceKey];
    return selectedInputRef;
  }

  // input, cursor state 최신화
  const dispatchInputState = (cursor: number, input: string, deviceKey: AdvanceType) => {
    setRecordInput(prev => ({
      ...prev,
      [deviceKey]: input
    }));
    setRecordInputCursor(prev => ({
      ...prev,
      [deviceKey]: cursor
    }))
  }

  const handleInputState = (
    keyPress: string,
    inputRef: RefObject<HTMLInputElement | null>,
    deviceKey: AdvanceType,
    eventCursor: number | null
  ) => {
    const inputCursor = eventCursor === null ? recordInputCursor[deviceKey]: eventCursor;
    const prevInput = recordInput[deviceKey];

    switch(keyPress) {
      case "Backspace": {
        if (inputCursor === 0) break;

        const backSpaceActiionCursor = inputCursor - 1;

        const backSpaceExecInput = prevInput.slice(0, backSpaceActiionCursor)
                                            .concat(prevInput.slice(inputCursor));
        dispatchInputState(backSpaceActiionCursor, backSpaceExecInput, deviceKey);
        break;
      }
      case "Delete": {
        if (inputCursor >= prevInput.length) break;

        const deleteActionCursor = inputCursor + 1;
        const deleteExecInput = prevInput.slice(0, inputCursor)
                                          .concat(prevInput.slice(deleteActionCursor));
        
        dispatchInputState(inputCursor, deleteExecInput, deviceKey);
        break
      }
      case "reset": {
        dispatchInputState(0, "", deviceKey);
        break;
      }
      case "0": {
        if (inputCursor === 0) {
          if (prevInput.length > 0) break;
        }

        if (prevInput === "0") break;
      }
      default: {
        if (prevInput === "0" && inputCursor >= 1) break;
        const charAddInput = prevInput.slice(0, inputCursor)
                                      .concat(keyPress, prevInput.slice(inputCursor));
        const charAddExecCursor = inputCursor + 1;

        dispatchInputState(charAddExecCursor, charAddInput, deviceKey);
      }
    }
  }

  const getActiveInputPosition = (activeInput: AdvanceType | null) => {
    if (activeInput === null) return 0;
    const position = TARRED_DEVICE_ADVANCE_LIST.indexOf(activeInput);
    return position;
  }

  const handleKeyPressValue = (
    e: KeyboardEvent<HTMLInputElement>, 
    activeInput: AdvanceType | null, 
    deviceKey: AdvanceType
  ) => {
    e.preventDefault();

    const keyPress = KEY_PRESS[e.key];
    const inputRef = getRecordInputRef(deviceKey);
    const eventCursor = e.currentTarget.selectionStart;

    if (keyPress === undefined) return;
    if (activeInput === null) return;
    if (inputRef === null) return;
    if (deviceKey !== activeInput) return;

    switch(keyPress) {
      case "Tab": {
        if (e.shiftKey === true) {
          setActiveInput(prev => {
            const activeInputPosition = getActiveInputPosition(prev);
            if (activeInputPosition > 0) {
              return TARRED_DEVICE_ADVANCE_LIST[activeInputPosition - 1];
            }
            return prev;
          });
        } else {
          setActiveInput(prev => {
            const activeInputPosition = getActiveInputPosition(prev);
            if (activeInputPosition < TARRED_DEVICE_ADVANCE_LIST.length - 1) {
              return TARRED_DEVICE_ADVANCE_LIST[activeInputPosition + 1];
            }
            return prev;
          });
        }
        break;
      }
      case "BackSpace":
      case "Delete": {
        handleInputState(keyPress, inputRef, deviceKey, eventCursor);
        break;
      }
      case "ArrowLeft": {
        const moveLeftCursor = recordInputCursor[deviceKey] - 1;
        if (moveLeftCursor < 0) break;

        inputRef.current?.setSelectionRange(moveLeftCursor, moveLeftCursor);
        setRecordInputCursor(prev => ({
          ...prev,
          [deviceKey]: moveLeftCursor
        }));
        break;
      }
      case "ArrowRight": {
        const moveRightCursor = recordInputCursor[deviceKey] + 1;
        if (moveRightCursor > recordInput[deviceKey].length) break;

        inputRef.current?.setSelectionRange(moveRightCursor, moveRightCursor);
        setRecordInputCursor(prev => ({
          ...prev,
          [deviceKey]: moveRightCursor
        }));
        break;
      }
      default: {
        handleInputState(keyPress, inputRef, deviceKey, eventCursor);
      }
    }
  }

  const handleFocusOnClick = (e: MouseEvent<HTMLInputElement>, deviceKey: AdvanceType) => {
    const cursor = e.currentTarget.selectionStart;

    if (cursor === null) return;

    setActiveInput(prev => {
      if (prev === deviceKey) return prev;
      return deviceKey;
    });

    setRecordInputCursor(prev => ({
      ...prev,
      [deviceKey]: cursor
    }));
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const attack = e.currentTarget.attack.value;
    const affinity = e.currentTarget.affinity.value;
    const element = e.currentTarget.element.value;

    const deviceAmount = {
      attack: tarredDevice.attack - Number(attack),
      affinity: tarredDevice.affinity - Number(affinity),
      element: tarredDevice.element - Number(element)
    }

    const seriesSkill = e.currentTarget.seriesSkill.value;
    const groupSkill = e.currentTarget.groupSkill.value;

    const record = {
      weaponName: weaponName,
      elementName: elementName,
      order: getTableRecordTotalAmount(deviceAmount, advanceSetting),
      seriesSkill: normalizeSkill(seriesSkill, "series"),
      groupSkill: normalizeSkill(groupSkill, "group")
    }

    resetRecordFormState();
    dispatch(addTableRecord(record))
  }

  return (
    <form className={style.form} onSubmit={(e) => handleSubmit(e)}>
      <div className={style.deviceInputContainer}>
        <h3 className={style.deviceInputHeader}>현재 부식된 장치</h3>
        <div className={style.tarredDeviceInputBox}>
          <div className={style.tarredDeviceInputAreaBox}>
            <TableRecordInput 
              inputRef={recordAttackInputRef} 
              handleKeyPressValue={handleKeyPressValue}
              handleFocusOnClick={handleFocusOnClick}
              recordInput={recordInput}
              activeInput={activeInput}
              deviceKey={TARRED_DEVICE_ADVANCE_LIST[0]}
              />
            <TableRecordInput 
              inputRef={recordAffinityInputRef} 
              handleKeyPressValue={handleKeyPressValue}
              handleFocusOnClick={handleFocusOnClick}
              recordInput={recordInput}
              activeInput={activeInput}
              deviceKey={TARRED_DEVICE_ADVANCE_LIST[1]}
              />
            <TableRecordInput 
              inputRef={recordElementInputRef} 
              handleKeyPressValue={handleKeyPressValue}
              handleFocusOnClick={handleFocusOnClick}
              recordInput={recordInput}
              activeInput={activeInput}
              deviceKey={TARRED_DEVICE_ADVANCE_LIST[2]}
            />
          </div>
          <NumberPad
            getInputRef={getRecordInputRef}
            handleInputState={handleInputState}
            setActiveInput={setActiveInput}
            activeInput={activeInput}
            deviceInputCursor={recordInputCursor}
          />
        </div>
      </div>
      <div className={style.skillSelectSubmitBox}>
        <SkillSelect/>
        <button 
          className={style.submitButton} 
          type="submit" 
          disabled={getTypedObjectValues(validRecordInput).some(valid => valid === false)}
          >
          테이블 기록
        </button>
      </div>
    </form>
  )
}