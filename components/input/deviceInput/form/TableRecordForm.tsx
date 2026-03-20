"use client";

import { AdvanceType, ElementType, WeaponType } from "@/global/type/appType";
import SkillSelect from "./skill/SkillSelect";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import debounce from "@/feature/debounce/useDebounce";
import thumbthingLog from "@/feature/customFeature/log/customLog";
import { normalizeSkill } from "@/feature/parse/userInput/normalizeSkill";
import { addTableRecord } from "@/feature/store/slices/table/tableSlice";
import { getTableRecordTotalAmount } from "@/feature/calculate/tarredDevice/getTableCheckAmount";

interface TableRecordFormProps {
  weaponName: WeaponType,
  elementName: ElementType
}

export default function TableRecordForm({weaponName, elementName}: TableRecordFormProps) {
  const tarredDevice = useAppSelector(state => state.tarred.input);
  const advanceSetting = useAppSelector(state => state.weapon.weaponSetting[weaponName][elementName])
  const dispatch = useAppDispatch();

  const [inValidAttack, setInValidAttack] = useState<boolean>(true);
  const [inValidAffinity, setInValidAffinity] = useState<boolean>(true);
  const [inValidElement, setInValidElement] = useState<boolean>(true);

  const [inValid, setInValid] = useState<boolean>(true);


  const [attackInput, setAttackInput] = useState<number | undefined>(undefined);
  const [affinityInput, setAffinityInput] = useState<number | undefined>(undefined);
  const [elementInput, setElementInput] = useState<number | undefined>(undefined);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(e.currentTarget.seriesSkill.value)

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

    dispatch(addTableRecord(record))
  }

  const handleValidateResult = (setValidateState: Dispatch<SetStateAction<boolean>>, validateState: boolean, validateResult: boolean) => {
    if (validateResult === true) {
      if (validateState === true) {
        setValidateState(false);
        return;
      }
    }

    if (validateResult === false) {
      if (validateState === false) {
        setValidateState(true);
        return;
      }
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, setInputState: Dispatch<SetStateAction<number | undefined>>, setValideState: Dispatch<SetStateAction<boolean>>, validateState: boolean, tarredDeviceKey: AdvanceType) => {
    const isSafeInput = Number.isSafeInteger(Number(e.target.value));
    if (!isSafeInput) {
      handleValidateResult(setValideState, validateState, isSafeInput);
      return;
    };
    
    const inputAmount = Number(e.target.value);
    
    const isInteger = Number.isInteger(inputAmount);
    if (!isInteger) {
      handleValidateResult(setValideState, validateState, isInteger);
      return;
    };
    
    const isPositiveInteger = inputAmount >= 0;
    if (!isPositiveInteger) {
      handleValidateResult(setValideState, validateState, isPositiveInteger);
      return;
    };
    
    const deviceAmount = tarredDevice[tarredDeviceKey];
    const isInRange = (deviceAmount - inputAmount) >= 0;
    if (!isInRange) {
      handleValidateResult(setValideState, validateState,isInRange);
      return;
    };
    
    const decreasedAmount = deviceAmount - inputAmount;
    const devideValue = advanceSetting[tarredDeviceKey] ? 3 : 6;
    
    const isNoRemain = decreasedAmount % devideValue === 0;
    if (!isNoRemain) {
      handleValidateResult(setValideState, validateState, isNoRemain);
      return;
    };

    setValideState(false);
    setInputState(inputAmount)
  }

  const debounceChange = debounce(handleChange, 100);

  useEffect(() => {
    const isInputInValid = (inValidAttack || inValidAffinity || inValidElement)
    if (isInputInValid === inValid) return ;
    setInValid(isInputInValid)

  }, [inValidAttack, inValidAffinity, inValidElement])

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div>
        <p>현재 부식된 장치</p>
        <div>
          <label>
            <p>
              공격 :<input 
                      name="attack" 
                      type="number"
                      onChange={(e) => debounceChange(e, setAttackInput, setInValidAttack, inValidAttack,"attack")}
                      />
            </p>
          </label>
          <label>
            <p>
              회심 :<input 
                      name="affinity"
                      type="number"
                      onChange={(e) => debounceChange(e, setAffinityInput, setInValidAffinity, inValidAffinity,"affinity")}
                      />
            </p>
          </label>
          <label>
            <p>
              격화 :<input 
                      name="element"
                      type="number"
                      onChange={(e) => debounceChange(e, setElementInput, setInValidElement, inValidElement, "element")}
                    />
            </p>
          </label>
        </div>
      </div>
      <SkillSelect/>
      <button type="submit" disabled={(inValidAttack || inValidAffinity || inValidElement)}>
        테이블 기록
      </button>
    </form>
  )
}