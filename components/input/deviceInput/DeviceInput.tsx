"use client";

import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { normalizeFormData} from "@/feature/parse/userInput/normalizeTarredDeviceInput";
import { setInputAllDevice, setIsSetting } from "@/feature/store/slices/tarred/tarredSlice";
import { ADVANCE_CODE, TARRED_DEVICE_ADVANCE_LIST } from "@/global/data/appData";
import { AdvanceType, TarredDeviceType } from "@/global/type/appType";
import { KeyboardEvent, MouseEvent, RefObject, useLayoutEffect, useRef, useState } from "react";
import style from "./DeviceInput.module.css"
import NumberPad from "@/components/numberPad/NumberPad";
import { KEY_PRESS } from "@/global/data/keyData";


interface TarredDeviceInputProps {
  inputRef: RefObject<HTMLInputElement | null>,
  handleKeyPressValue: (
      e: KeyboardEvent<HTMLInputElement>, 
      activeInput: AdvanceType | null, 
      deviceKey: AdvanceType
    ) => void
  handleFocusOnClick: (e: MouseEvent<HTMLInputElement> ,deviceKey: AdvanceType) => void,
  deviceInput: Record<AdvanceType ,string>
  activeInput: AdvanceType | null,
  deviceKey: AdvanceType,
  isSetting: boolean,
  tarred: TarredDeviceType,
}

function TarredDeviceInput({
  inputRef, 
  handleKeyPressValue, 
  handleFocusOnClick, 
  deviceInput,
  activeInput,
  deviceKey, 
  isSetting, 
  tarred,
}: TarredDeviceInputProps) {

  return (
    <div className={style.inputContainer} >
      <label htmlFor={deviceKey}>
        <div className={style.inputBox}>
          <p className={style.inputDeviceKey}>{ADVANCE_CODE[deviceKey]}</p>
          {isSetting ? 
          <input 
            ref={inputRef}
            className={style.input}
            id={deviceKey}
            type="text"
            inputMode="numeric"
            name={deviceKey}
            placeholder={`${tarred[deviceKey]}`}
            value={deviceInput[deviceKey]}
            onChange={() => {}}
            onKeyDown={(e) => handleKeyPressValue(e, activeInput, deviceKey)}
            onClick={(e) => handleFocusOnClick(e, deviceKey)}
            autoComplete="off"
          />
          :
          <input 
            className={style.input}
            value={tarred[deviceKey]} 
            disabled={true}/>
          }
        </div>
      </label>
    </div>
  )
}

/** 
 * 동작의 흐름
 * 
 * 사용자가 입력할 입력란을 클릭한다
 * 클릭했을 경우 어떤 입력란인지 확인한다
 * 입력란의 커서를 확인한다
 * 확인된 입력란, 커서를 저장한다
 * 
 * 사용자가 지정한 입력란에 이벤트가 발생한다
 * 이벤트의 종류 (키보드입력, 마우스 입력)
 * 
 * 키보드 입력일 경우
 * 텐키리스일 경우를 생각해서 [q,w,e,a,s,d,z,x,c] 입력을 
 *                        [4,5,6,7,8,9,reset,0,delete]
 * 이벤트로 정의한다
 * 
 * 정의된 이벤트를 확인한다
 * 
 * 숫자일 경우 
 * 클릭하여 지정된 커서의 위치를 확인한다
 * 확인된 커서 위치에 숫자를 삽입한다
 * "123456"
 *     ^
 * 
 * "1234756"
 *      ^
 * 
 * 이렇게 되었을 경우 커서는 3 => 4로 변경이된다
 * 변경된 커서를 저장한다
 * 삽입한 문자열을 저장한다
 * 
 * reset일 경우
 * 문자열을 ""로 초기화한다
 * 커서를 0으로 초기화한다
 * 문자열과 커서 위치를 저장한다
 * 
 * Backspace일 경우
 * 현재 커서 위치를 확인한다
 * 기존 문자열에서 현재 커서 위치의 char를 하나 삭제한다
 * 삭제된 문자열을 저장한다
 * 1234
 *   ^
 * 커서 위치 3
 * 
 * 124
 *  ^
 * 커서 위치 2
 * 커서와 문자열을 저장한다
 * 
 * 큰 흐름
 * 입력값 확인
 * 확인된 입력값 변환
 * 커서위치 확인
 * 확인된 입력값으로 문자열 변환
 * 변환된 문자열 저장
 * 입력값에 따른 커서위치 조정
 * 
 * 
 * */ 


export default function DeviceInputBox() {
  const dispatch = useAppDispatch();
  const tarredDevice = useAppSelector(state => state.tarred.input);
  const isSetting = useAppSelector(state => state.tarred.isSetting);

  const [deviceInputCursor, setDeviceInputCursor] = useState<Record<AdvanceType, number>>({
    attack: 0,
    affinity: 0,
    element: 0
  })
  const [activeInput, setActiveInput] = useState<AdvanceType | null>(null);
  const [deviceInput, setDeviceInput] = useState({
    attack: "",
    affinity: "",
    element: ""
  })

  const attackInputRef = useRef<HTMLInputElement>(null);
  const affinityInputRef = useRef<HTMLInputElement>(null);
  const elementInputRef = useRef<HTMLInputElement>(null);

  // useEffect(() => {
  //   if (activeInput === null) return;
  //   const ref = getInputRef(activeInput)
  //   ref?.current?.setSelectionRange(inputCursor, inputCursor)
  //   console.log(ref?.current?.selectionStart);
    
  // }, [deviceInput])

  useLayoutEffect(() => {
    if (activeInput === null) return;
    const ref = getInputRef(activeInput);
    const cursor = deviceInputCursor[activeInput];
    ref?.current?.focus();
    ref?.current?.setSelectionRange(cursor, cursor);
  }, [deviceInput, activeInput])

  // refactoring => getActiveDeviceInput
  const getInputRef = (deviceKey: AdvanceType | null) => {
    const deviceInputRef: Record<AdvanceType, RefObject<HTMLInputElement | null>> = {
      attack: attackInputRef,
      affinity: affinityInputRef,
      element: elementInputRef
    }

    if (deviceKey === null) return null;

    const inputRef = deviceInputRef[deviceKey];
    return inputRef
  }

  const dispatchInputState = (cursor: number, input: string, deviceKey: AdvanceType) => {
    // setInputCursor(cursor);
    setDeviceInput(prev => ({
      ...prev,
      [deviceKey]: input
    }))
    setDeviceInputCursor(prev => ({
      ...prev,
      [deviceKey]: cursor
    }))
  }

  // state 최신화
  // cursor, focus, input, ref
  const handleInputState = (
    keyPress: string, 
    // addCount: number, 
    inputRef: RefObject<HTMLInputElement | null>, 
    deviceKey: AdvanceType,
    eventCursor: number | null
  ) => {
    // const refCursor = inputRef?.current?.selectionStart as number;
    // const prevString = deviceInput[deviceKey];
    const inputCursor = eventCursor === null ? deviceInputCursor[deviceKey] : eventCursor;
    const prevInput = deviceInput[deviceKey];

    switch(keyPress) {
      case "Backspace": {
        if (inputCursor === 0) break;
        // 4 => 3 
        // 1234567890 
        // 5를 지우고 싶으면
        // 
        const backSpaceActionCursor = inputCursor - 1;
        
        const backSpaceExecInput = prevInput.slice(0, backSpaceActionCursor).concat(prevInput.slice(inputCursor));
        // inputRef.current?.setSelectionRange(backSpaceCursor, backSpaceCursor);
        // inputRef.current?.setSelectionRange(inputCursor, inputCursor);
        dispatchInputState(backSpaceActionCursor, backSpaceExecInput, deviceKey);
        break;

        // const newString = prevString.slice(0, refCursor - 1).concat(prevString.slice(refCursor + 1, prevString.length));
        // const newCursor = refCursor - 1
        // inputRef?.current?.setSelectionRange(newCursor, newCursor);

        // dispatchInputState(newCursor, newString, deviceKey)
        // break;
      }
      case "Delete": {
        if (inputCursor >= prevInput.length) break;
        const deleteActionCursor = inputCursor + 1;
        const deleteExecInput = prevInput.slice(0, inputCursor).concat(prevInput.slice(deleteActionCursor));

        dispatchInputState(inputCursor, deleteExecInput, deviceKey)
        break;
      }
      case "reset": {
        inputRef.current?.setSelectionRange(0,0);
        dispatchInputState(0, "", deviceKey)
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

        inputRef.current?.setSelectionRange(charAddExecCursor, charAddExecCursor);
        dispatchInputState(charAddExecCursor, charAddInput, deviceKey)
      }
    }
  }

  const getActiveInputPosition = (activeInput: AdvanceType | null) => {
    if (activeInput === null) return 0;
    const position = TARRED_DEVICE_ADVANCE_LIST.indexOf(activeInput);
    return position;
  }



  // 키보드 입력값 변환하여 state 최신화 함수 호출
  const handleKeyPressValue = (e :KeyboardEvent<HTMLInputElement>, activeInput: AdvanceType | null, deviceKey: AdvanceType) => {
    e.preventDefault();

    const keyPress = KEY_PRESS[e.key];
    const inputRef = getInputRef(deviceKey);
    const eventCursor = e.currentTarget.selectionStart;

    if (keyPress === undefined) return;
    if (activeInput === null) return;
    if (inputRef === null) return;
    if (deviceKey !== activeInput) return;
    // if (eventCursor === null) return;


    switch(keyPress) {
      case "Tab": {
        if (e.shiftKey === true) {
          setActiveInput(prev => {
            const activeInputPosition = getActiveInputPosition(prev);
            if (activeInputPosition > 0) {
              return TARRED_DEVICE_ADVANCE_LIST[activeInputPosition - 1];
            }
            // const inputRef = getInputRef(activeInput);
            // inputRef?.current?.focus();
            return prev;
          });
        } else {
          setActiveInput(prev => {
            const activeInputPosition = getActiveInputPosition(prev);
            if (activeInputPosition < TARRED_DEVICE_ADVANCE_LIST.length - 1) {
              return TARRED_DEVICE_ADVANCE_LIST[activeInputPosition + 1];
            }
            return prev
          });
          // const inputRef = getInputRef(activeInput);
          // inputRef?.current?.focus();
        }
        break;
      }
      case "Backspace": {
        // handleInputState(keyPress, ADD_COUNT.keyPress, inputRef, deviceKey, eventCursor);
        handleInputState(keyPress, inputRef, deviceKey, eventCursor);
        break;
      }
      case "Delete": {
        // handleInputState(keyPress, ADD_COUNT.keyPress, inputRef, deviceKey, eventCursor);
        handleInputState(keyPress, inputRef, deviceKey, eventCursor);
        break;
      }
      case "ArrowLeft": {
        const moveLeftCursor = deviceInputCursor[deviceKey] - 1;
        if (moveLeftCursor < 0) break;
        inputRef.current?.setSelectionRange(moveLeftCursor, moveLeftCursor);
        setDeviceInputCursor(prev => ({
          ...prev,
          [deviceKey]: moveLeftCursor
        }))
        // setInputCursor(moveLeftCursor);
        
        break;
      }
      case "ArrowRight": {
        const moveRightCursor = deviceInputCursor[deviceKey] + 1;
        if (moveRightCursor > deviceInput[deviceKey].length) break;
        inputRef.current?.setSelectionRange(moveRightCursor, moveRightCursor);
        setDeviceInputCursor(prev => ({
          ...prev,
          [deviceKey]: moveRightCursor
        }));
        // inputRef.current?.setSelectionRange(moveRightCursor, moveRightCursor);
        // setInputCursor(moveRightCursor);
        
        break;
      }
      default: {
        // e.preventDefault();
        // const nextCursor = inputCursor + 1
        // setInputCursor(nextCursor);

        // handleInputState(keyPress, ADD_COUNT.keyPress, inputRef, deviceKey, eventCursor);
        handleInputState(keyPress, inputRef, deviceKey, eventCursor);
      }
    }
  }

// mousedown 시점
// click 시점
// focus 시점


// 브라우저 동작 순서상:

// mousedown
// ↓
// focus
// ↓
// selection 변경
// ↓
// mouseup
// ↓
// click

// 순으로 진행된다.

// 마다 caret 반영 타이밍이 다르다.

  // 마우스로 클릭시 입력창, 커서 위치 값 설정
  // const handleFocusOnClick = (e: FocusEvent<HTMLInputElement>, deviceKey: AdvanceType) => {
  const handleFocusOnClick = (e: MouseEvent<HTMLInputElement>, deviceKey: AdvanceType) => {
    // const inputRef = getInputRef(activeInput);
    // const inputRef = getActivateDeviceInputRef(deviceKey);
    const cursor = e.currentTarget.selectionStart;

    if (cursor === null) return;

    setActiveInput(prev => {
      if (prev === deviceKey) return prev;
      return deviceKey
    });
    setDeviceInputCursor(prev => ({
      ...prev,
      [deviceKey]: cursor
    }))
  }

  const handleIsSetting = (e: MouseEvent<HTMLInputElement> ,isSetting: boolean) => {
    e.preventDefault();

    dispatch(setIsSetting(isSetting));
    if (isSetting === true) {
      setDeviceInputCursor({
        "attack": deviceInput.attack.length,
        "affinity": deviceInput.affinity.length,
        "element": deviceInput.element.length
      });
      setDeviceInput({
        attack: tarredDevice.attack.toString(),
        affinity: tarredDevice.affinity.toString(),
        element: tarredDevice.element.toString()
      })
    }
  }



  // redux state update 기능
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const deviceForm = normalizeFormData(formData)

    setIsSetting(false);
    setActiveInput(null);
    setDeviceInput({
      attack: deviceForm.attack.toString(),
      affinity: deviceForm.affinity.toString(),
      element: deviceForm.element.toString()
    })
    dispatch(setInputAllDevice(deviceForm))
    dispatch(setIsSetting(false))
  }

  return (
    <div className={style.box}>
      <h1 className={style.boxHeaderText}>테이블 확인</h1>
      <form className={style.form} onSubmit={(e) => handleSubmit(e)}>
        <div className={style.formInputBox}>
          <h2 className={style.deviceFormHeaderText}>부식된 장치</h2>
          <TarredDeviceInput 
            inputRef={attackInputRef} 
            handleKeyPressValue={handleKeyPressValue}
            handleFocusOnClick={handleFocusOnClick}
            deviceInput={deviceInput}
            activeInput={activeInput}
            deviceKey={"attack"} 
            isSetting={isSetting} 
            tarred={tarredDevice}
          />
          <TarredDeviceInput 
            inputRef={affinityInputRef} 
            handleKeyPressValue={handleKeyPressValue}
            handleFocusOnClick={handleFocusOnClick}
            deviceInput={deviceInput}
            activeInput={activeInput}
            deviceKey={"affinity"} 
            isSetting={isSetting} 
            tarred={tarredDevice}
          />
          <TarredDeviceInput 
            inputRef={elementInputRef} 
            handleKeyPressValue={handleKeyPressValue}
            handleFocusOnClick={handleFocusOnClick}
            deviceInput={deviceInput}
            activeInput={activeInput}
            deviceKey={"element"} 
            isSetting={isSetting} 
            tarred={tarredDevice}
          />
          <div className={style.submitBox}>
            {isSetting ? 
              <input className={style.submitButton} type="submit" value={"저장"}/>
              :
              <input className={style.submitButton} type="button" value={"잠금 해제"} onClick={(e) => handleIsSetting(e, true)}/>
            }
          </div>
        </div>
        <NumberPad 
          getInputRef={getInputRef}
          handleInputState={handleInputState}
          setActiveInput={setActiveInput}
          activeInput={activeInput}
          deviceInputCursor={deviceInputCursor}
        />
      </form>
    </div>
  )
}
