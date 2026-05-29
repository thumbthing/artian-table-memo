"use client";

import { ChangeEvent, Dispatch, Fragment, KeyboardEvent, RefObject, SetStateAction, useCallback, useEffect, useRef, useState } from "react";
import style from "./NumberPad.module.css"
import VirtualButton from "./PadButton";
import { KEY_PRESS, KEY_PAD } from "@/global/data/keyData";
import { AdvanceType } from "@/global/type/appType";
import { ADVANCE_CODE, TARRED_DEVICE_ADVANCE_LIST } from "@/global/data/appData";

// dispatchEvent는 보안상의 이유로 스크립트가 사용자 대신 타이핑하는 것을 막아두었다

const ADD_COUNT = {
  default: 0,
  click: 1
}

interface NumberPadProps {
  getInputRef: (activeInput: AdvanceType | null)=> RefObject<HTMLInputElement | null> | null
  handleInputState: (
    keyPress: string, 
    // addCount: number, 
    inputRef: RefObject<HTMLInputElement | null>, 
    deviceKey: AdvanceType,
    eventCursor: number | null
  ) => void,
  setActiveInput: Dispatch<SetStateAction<AdvanceType | null>>,
    
  // addCount: number,
  activeInput: AdvanceType | null,
  deviceInputCursor: Record<AdvanceType, number>
}

export default function NumberPad({
  getInputRef, 
  handleInputState, 
  setActiveInput,

  // addCount,
  activeInput, 
  deviceInputCursor
}: NumberPadProps) {
  // const [input, setInput] = useState<string>("");
  // const [cursor, setCursor] = useState<number>(0);

  // const inputRef = getInputRef(activeInput);
  
  // useEffect(() => {
  //   if (inputRef === null) return;
  //   inputRef.current?.focus();
  //   inputRef.current?.setSelectionRange(cursor, cursor);
  // },[input])

  // const handleState = (userEvent: string, addCount: number) => {
  //   switch(userEvent) {
  //     case "Backspace" : {
  //       const refCursor = inputRef?.current?.selectionStart as number;
  //       if (refCursor === 0) break;

  //       const newString = input.slice(0, refCursor - 1).concat(input.slice(refCursor));
  //       const newCursor = refCursor - 1  
  //       inputRef?.current?.setSelectionRange(newCursor, newCursor);

  //       setCursor(inputRef?.current?.selectionStart as number);
  //       setInput(newString);
  //       break;
  //     }
  //     case "Delete": {
  //       const refCursor = inputRef?.current?.selectionStart as number;
  //       if (refCursor === input.length) break;

  //       const newString = input.slice(0, refCursor).concat(input.slice(refCursor + 1));
  //       setCursor(refCursor);
  //       setInput(newString);
  //       break;
  //     }
  //     case "reset" : {
  //       setCursor(0);
  //       setInput("");
  //       break;
  //     }
  //     default: {
  //       const refCursor = inputRef?.current?.selectionStart as number;
  //       const sliceIndex = refCursor - 1 + addCount
  //       const newString = input.slice(0, sliceIndex).concat(userEvent, input.slice(sliceIndex));

  //       const newCursor = refCursor + addCount;

  //       setCursor(newCursor);
  //       setInput(newString);
  //     }
  //   }
  // }

  // const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
  //   const currentInput = e.target.value;

  //   if (currentInput.length < input.length) {
  //     setInput(currentInput);
  //     return;
  //   }

  //   const cursorPosition = e.target.selectionStart as number;
  //   const lastInput = e.target.value[cursorPosition - 1];

  //   if (lastInput === undefined) return;

  //   const convertedKeyPress = KEY_PRESS[lastInput];

  //   if (convertedKeyPress === undefined) return;

  //   handleState(convertedKeyPress, ADD_COUNT.default);
  // }


  // const handleInputCursor = () => {
  //   const refCursor = inputRef?.current?.selectionStart;

  //   if (refCursor === null || refCursor === undefined) return;

  //   inputRef?.current?.setSelectionRange(refCursor, refCursor);
  //   setCursor(inputRef?.current?.selectionStart as number);
  // }

  // const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
  //   const userEvent = KEY_PRESS[e.key];

  //   if (userEvent === undefined) return;

  //   switch(userEvent) {
  //     case "Backspace": {
  //       e.preventDefault();
  //       handleState("Backspace", ADD_COUNT.default);
  //       break;
  //     }
  //     case "Delete": {
  //       e.preventDefault();
  //       handleState("Delete", ADD_COUNT.default);
  //       break;
  //     }
  //   }
  // }


  return (
    <div className={style.box}>
      <div className={style.activeInputBox}>
        {TARRED_DEVICE_ADVANCE_LIST.map((advance) => 
          <Fragment key={`number-pad-active-input-${advance}`}>
            <p 
              className={`${style.activeInput} ${activeInput === advance && style.isActive}`}
              onClick={() => setActiveInput(advance)}
            >{ADVANCE_CODE[advance]}</p>
          </Fragment>
        )}
      </div>
      
      {/* <input type="text" ref={inputRef} 
        onKeyDown={(e) => handleKeyPress(e)} 
        onClick={() => handleInputCursor()} 
        onChange={(e) => inputHandler(e)} 
        value={input}
      /> */}
      <div className={style.pad}>
      {KEY_PAD.map((keyButton) => 
        <Fragment key={`number-pad-key-${keyButton}`}>
          <VirtualButton 
            getInputRef={getInputRef}
            handleInputState={handleInputState}
            activeInput={activeInput} 
            padKey={keyButton} 
            // addCount={addCount} 
            deviceInputCursor={deviceInputCursor}
          />
        </Fragment>
      )}
      </div>
    </div>
  )
}