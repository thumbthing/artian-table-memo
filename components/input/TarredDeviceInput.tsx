"use client"

import { useAppDispatch, useAppSelector } from "@/app/hooks"
import debounce from "@/feature/debounce/useDebounce"
import { setInputAffinityDevice, setInputAllDevice, setInputAttackDevice, setInputElementDevice } from "@/feature/store/slices/tarred/tarredSlice"
import { pickValidateUrlParam } from "@/feature/url/urlParam/checkUrlParam"
import { AdvanceType, TarredDeviceType } from "@/global/type/appType"
import { usePathname, useSearchParams } from "next/navigation"
import { ChangeEvent, useEffect, useState } from "react"

type StateType = number | undefined;

export function TarredDeviceInput () {
  const tarredState: TarredDeviceType = useAppSelector(state => state.tarred.input);

  const [attack, setAttack] = useState<StateType>();
  const [affinity, setAffintiy] = useState<StateType>();
  const [element, setElement] = useState<StateType>();

  const [isSetting, setIsSetting] = useState<boolean>(true);
  const [isRoot, setIsRoot] = useState<boolean|undefined>(undefined);

  const dispatch = useAppDispatch();
  const path = usePathname();
  const searchParam = useSearchParams();

  // TODO: what is this???
  useEffect(() => {
    if (isRoot === undefined) {
      path === "/" ? setIsRoot(true) : setIsRoot(false);
    } 
    
    const validateParam = pickValidateUrlParam(searchParam)

    dispatch(setInputAllDevice({
      attack: 300,
      affinity: 89,
      element: 3
    }))

  }, [isRoot, path])

  const normalizeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const valueString = e.target.value;
    const zeroStartRemovedString = valueString.replace(/^0+/, '');
    const normalizedString = zeroStartRemovedString.replaceAll(/\D/g, '')

    if (normalizedString === '') return 0;

    const isSafeNumber = Number.isSafeInteger(Number(normalizedString));

    if (!isSafeNumber) {
      return 0;
    }

    return Number(normalizedString);
  }

  const setTarredDeviceState = (tarredDevice: AdvanceType ,e: ChangeEvent<HTMLInputElement>) => {
    const input = normalizeInput(e);
    let setDeviceState;

    switch(tarredDevice) {
      case "attack": {
        setDeviceState = setAttack;
        break
      }
      case "affinity": {
        setDeviceState = setAffintiy;
        break;
      }
      case "element" : {
        setDeviceState = setElement;
        break;
      }
    }
    setDeviceState(input);
  }

  const setTarredDeviceValue = (attack: StateType, affinity: StateType, element: StateType) => {
    const newDeviceValue: TarredDeviceType = {
      attack: attack === undefined ? 0 : attack,
      affinity: affinity === undefined ? 0 : affinity,
      element: element === undefined ? 0 : element
    }

    dispatch(setInputAllDevice(newDeviceValue))
    setIsSetting(false);
  }

  const dispatchTarredDevice = (tarredDevice: AdvanceType, e: ChangeEvent<HTMLInputElement>) => {
    const input = normalizeInput(e);

    let reducer;
    switch(tarredDevice) {
      case "attack": {
        reducer = setInputAttackDevice;
        break;
      }
      case "affinity": {
        reducer = setInputAffinityDevice;
        break;
      }
      case "element": {
        reducer = setInputElementDevice;
        break;
      }
    }

    return dispatch(reducer(input))
  }

  const debounceTarredDevice = debounce(dispatchTarredDevice, 500);

  const handleChangeEvent = (isRoot: boolean | undefined, tarredDevice: AdvanceType, e: ChangeEvent<HTMLInputElement>) => {
    isRoot ? debounceTarredDevice(tarredDevice, e) : setTarredDeviceState(tarredDevice, e)
  }

  return (
    <div>
        <div>
          <label htmlFor="attack">
            {isSetting ? 
            <div>
              <p>
                공격 : 
                <input 
                  id="attack" 
                  type="text" 
                  pattern="/[1-9]/g"
                  placeholder={tarredState.attack.toString()}
                  onChange={(e) => handleChangeEvent(isRoot, "attack", e)}
                /> 
              </p>
            </div>
              : 
            <p>공격 : {tarredState.attack}</p>
            }
            
          </label>
        </div>
        <div>      
          <label htmlFor="affinity">
            <p>
              회심 : {tarredState.affinity}
            </p>
            <input 
              id="affinity" 
              type="number" 
              onChange={(e) => handleChangeEvent(isRoot, "affinity", e)}
            />
          </label>
        </div>
        <div>
          <label htmlFor="element">
            속성 : {tarredState.element}
            <input 
              id="element" 
              type="number"
              onChange={(e) => handleChangeEvent(isRoot, "element", e)}
            />
          </label>
        </div>
      { isSetting ? 
        <input type="button" value={"설정 완료"} onClick={() => setTarredDeviceValue(attack, affinity, element)}/> :
        <input type="button" value={"재 설정"} onClick={() => setIsSetting(true)} />
      }
    </div>
  )
}
