import { Dispatch, RefObject, SetStateAction } from "react"
import style from "./PadButton.module.css"
import { AdvanceType } from "@/global/type/appType";

interface VirtualButtonProps {
  // padKey: string,
  // addCount: number,
  // callback: (padKey: string, addCount: number) => void,
  getInputRef: (activeInput: AdvanceType | null) => 
    RefObject<HTMLInputElement | null> | null
  handleInputState: (
    keyPress: string, 
    // addCount: number, 
    inputRef: RefObject<HTMLInputElement | null>, 
    deviceKey: AdvanceType,
    eventCursor: number | null
  ) => void,

  // addCount: number,
  activeInput: AdvanceType | null,
  padKey: string,
  deviceInputCursor: Record<AdvanceType, number>
}

interface PadButtonProps {
  padButtonClickHandler: () => void
}

interface NumberButtonProps extends PadButtonProps {
  padKey: string;
}

// TODO: svg
// path d= 

// 대문자 => 절대 경로
// M 커서를 이동 (x y)
// L 직선 (x y)
// H 가로직선 (x)
// V 새로 직선 (y)
// C 곡선 (시작x 시작y, 중간x 중간y, 끝x 끝y)
// A 호(반원 같은거) (rx ry x-axis-rotation large-arc-flag sweep-flag x y)

// 소문자 => 현재 위치 기반
// m
// l
// v
// c
// a

// export default function PadButton({padKey, addCount, callback}: PadButtonProps) {
export default function VirtualButton({
  getInputRef, 
  handleInputState,
  activeInput, 
  padKey, 
  // addCount, 
  deviceInputCursor
}: VirtualButtonProps) {
  // const button = /[0-9]/.test(padKey) ? NumberButton : padKey;
  // const button = padKey;

  
  const padButtonClickHandler = () => {
    const inputRef = getInputRef(activeInput);
    if (activeInput === null || inputRef === null) return;

    const inputCursor = deviceInputCursor[activeInput];
    // handleInputState(padKey, addCount, inputRef, activeInput, inputCursor)
    handleInputState(padKey, inputRef, activeInput, inputCursor)
  }

  switch(padKey) {
    case "Backspace": {
      return <BackSpaceButton 
              padButtonClickHandler={padButtonClickHandler}
              />
      }
    case "reset": {
      return <ResetButton
              padButtonClickHandler={padButtonClickHandler}
              />
      }
    default: {
      return <NumberButton
              padButtonClickHandler={padButtonClickHandler}
              padKey={padKey}
              />
      }
    }

  // if (button === padKey) {
  //   switch(padKey) {
  //     case "Backspace": {
  //       return (
  //         <BackSpaceButton padKey={padKey} addCount={addCount} callback={callback}/>
  //       )
  //     }
  //     case "reset" : {
  //       return (
  //         <ResetButton padKey={padKey} addCount={addCount} callback={callback}/>
  //       )
  //     }
  //   }
  // } 

  // return (
  //   <NumberButton padKey={padKey} addCount={addCount} callback={callback} />
  // )
}

// function NumberButton({padKey, addCount, callback}: PadButtonProps) {
function NumberButton({padButtonClickHandler, padKey}: NumberButtonProps) {
  return (
    <svg 
      className={style.button} 
      viewBox="0 0 100 100" 
      // onClick={() => callback(padKey, addCount)}
      onMouseDown={(e) => e.preventDefault()}
      onClick={() => padButtonClickHandler()}
    >
      <text className={style.buttonText} x="50%" y="60%">{padKey}</text>
    </svg>
  )
}

// function BackSpaceButton({padKey, addCount, callback}: PadButtonProps) {
function BackSpaceButton({padButtonClickHandler}: PadButtonProps) {
  return (
    <svg
      className={style.backspaceButton}
      // onClick={() => callback(padKey, addCount)}
      onMouseDown={(e) => e.preventDefault()}
      onClick={() => padButtonClickHandler()}
      viewBox="0 0 90 90"
      fill="none"
    >
      <path 
        strokeWidth="7"
        strokeLinejoin="round"
        d="M 7.5 45 l 20 -30 55 0 0 60 -55 0 -20 -30 Z"
      />
      <path
        strokeWidth="7"
        d="M 40 60 l 22.5 -30 m -22.5 0 l 22.5 30"
      />
    </svg>
  )
}

// function ResetButton({padKey, addCount, callback}: PadButtonProps) {
function ResetButton({padButtonClickHandler}: PadButtonProps) {
  return (
    <svg
      className={style.resetButton}
      // onClick={() => callback(padKey, addCount)}
      onMouseDown={(e) => e.preventDefault()}
      onClick={() => padButtonClickHandler()}
      viewBox="0 0 90 90"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path 
        d="M 15 41 A 30 30 0 1 1 27 68"
      />
      <polygon
        points="25,60 46,50 46,75"
        transform="rotate(45 30 50)"
      />
    </svg>
  )
}