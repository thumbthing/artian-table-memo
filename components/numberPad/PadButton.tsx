import { Dispatch, RefObject, SetStateAction } from "react"
import style from "./PadButton.module.css"
import { AdvanceType } from "@/global/type/appType";
import { ALLOWED_KEY } from "@/global/data/keyData";

interface VirtualButtonProps {
  getInputRef: (activeInput: AdvanceType | null) => 
    RefObject<HTMLInputElement | null> | null
  handleInputState: (
    keyPress: string, 
    inputRef: RefObject<HTMLInputElement | null>, 
    deviceKey: AdvanceType,
    eventCursor: number | null
  ) => void,

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

const MAPPED_KEY_TEXT_POSITION: Record<string, string> = {
  "x": "80%",
  "y": "93%"
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
}

function NumberButton({padButtonClickHandler, padKey}: NumberButtonProps) {
  return (
    <svg 
      className={style.button} 
      viewBox="0 0 100 100" 
      onMouseDown={(e) => e.preventDefault()}
      onClick={() => padButtonClickHandler()}
    >
      <text className={style.buttonText} x="50%" y="60%">{padKey}</text>
      {ALLOWED_KEY[padKey] !== undefined &&
        <text className={style.mappedButtonText} x={MAPPED_KEY_TEXT_POSITION.x} y={MAPPED_KEY_TEXT_POSITION.y}>{ALLOWED_KEY[padKey]}</text>
      }
    </svg>
  )
}

function BackSpaceButton({padButtonClickHandler}: PadButtonProps) {
  return (
    <svg
      className={style.backspaceButton}
      onMouseDown={(e) => e.preventDefault()}
      onClick={() => padButtonClickHandler()}
      viewBox="0 0 90 90"
      fill="none"
    >
      <path 
        strokeWidth="7"
        strokeLinejoin="round"
        d="M 10 45 l 20 -20 45 0 0 40 -45 0 -20 -20 Z"
      />
      <path
        strokeWidth="7"
        d="M 42 53 l 18 -18 m -18 0 l 18 18"
      />
      <text className={style.mappedButtonText} x={MAPPED_KEY_TEXT_POSITION.x} y={MAPPED_KEY_TEXT_POSITION.y}>{ALLOWED_KEY.Backspace}</text>
    </svg>
  )
}

function ResetButton({padButtonClickHandler}: PadButtonProps) {
  return (
    <svg
      className={style.resetButton}
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
      <text className={style.mappedButtonText} x={MAPPED_KEY_TEXT_POSITION.x} y={MAPPED_KEY_TEXT_POSITION.y}>{ALLOWED_KEY.reset}</text>
    </svg>
  )
}