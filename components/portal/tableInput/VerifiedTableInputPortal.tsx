'use client';

import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { createPortal } from "react-dom";
import style from "./VerifiedTableInputPortal.module.css"
import { ELEMENT_LIST, WEAPON_LIST } from "@/global/data/appData";
import { TableRecordType } from "@/global/type/extendedType";
import VerifiedTableNotice from "./VerifiedTableNotice";
import { useAppDispatch } from "@/app/hooks";
import { addTableRecordList } from "@/feature/store/slices/table/tableSlice";

interface VerifiedTableInputPortalProps {
  dispatchFn: Dispatch<SetStateAction<boolean>>
}

export default function VerifiedTableInputPortal({dispatchFn}: VerifiedTableInputPortalProps) {
  const dispatch = useAppDispatch();
  
  const [text, setText] = useState<string>("");

  const parseLineTextToTableRecord = (lineText: string): TableRecordType => {
    const tableRecord = {
      weaponName: "",
      elementName: "",
      order: 0,
      seriesSkill: "",
      groupSkill: ""
    };
    const token = lineText.split(" ");
    const skillString = token.slice(3).join(" ");
    const skillToken = skillString.split("/");

    tableRecord.weaponName = token[1];
    tableRecord.elementName = token[2];
    tableRecord.order = Number(token[0]);
    tableRecord.seriesSkill = skillToken[0];

    if (skillToken.length === 2) tableRecord.groupSkill = skillToken[1];

    return tableRecord as TableRecordType;
  }

  const tryParseUserInput = useCallback((textAreaInput: string) => {
    // 한줄의 정규식
    const weaponPattern = WEAPON_LIST.join("|");
    const elementPattern = ELEMENT_LIST.join("|");

    const orderWeaponElementCheckRegex = new RegExp(`^\\d+\\s(${weaponPattern})\\s(${elementPattern})`)

    let lineStart: number = 0;
    const tableRecord: TableRecordType[] = [];
    const invalidLineList: string[] = [];
    const textLength = textAreaInput.length;

    for(let i = 0; i <= textLength; i++) {
      if (i === textLength || textAreaInput[i] === '\n') {
        const line = textAreaInput.trim().slice(lineStart, i);
        console.log(line.length)

        if (line.length === 0) {
          lineStart = i + 1;
          continue;
        }

        if (orderWeaponElementCheckRegex.test(line) === false) {
          invalidLineList.push(line);
          lineStart = i + 1;
          continue;
        }

        // parse to redux state
        tableRecord.push(parseLineTextToTableRecord(line));

        lineStart = i + 1;
      }
    }

    return {tableRecord, invalidLineList};
  }, []) 

  const closePortal = () => {
    dispatchFn(false);
    close
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const recordText = new FormData(e.currentTarget);

    const text = recordText.get("textArea");
    if (text instanceof File) return;
    if (text === null) return;

    const {tableRecord, invalidLineList} = tryParseUserInput(text);
    
    if (tableRecord.length > 0) {
      dispatch(addTableRecordList(tableRecord));
    }

    if (invalidLineList.length > 0) {
      setText(invalidLineList.join("\n"))
      return;
    }

    closePortal();
  }

  return createPortal(
    <div className={style.overlay} onClick={() => closePortal()}>
      <div className={style.container} onClick={(e) => e.stopPropagation()}>
        <div className={style.headerBox}>
          <h3 className={style.headerText}>테이블 기록 입력</h3>
          <svg
            className={style.cancelButton}
            onClick={() => closePortal()}
            viewBox="0 0 90 90"
          >
            <path
              d="M 10 10 l 70 70 m -70 0 l 70 -70"
            />
          </svg>
        </div>
        <div className={style.contentBox}>
          <VerifiedTableNotice />
          <form className={style.form}
            onSubmit={(e) => handleSubmit(e)}
            >
            <textarea className={style.textArea}
              spellCheck="false"
              name="textArea"
              value={text}
              onChange={(e) => setText(e.target.value)}
              />
            <button className={style.submitButton}
              type="submit"
            >저장</button>
          </form>
        </div>
      </div>
    </div>
  , document.body)
}

// 1 대검 불 거극/혼
// 10 태도 물 흑식/혼
// 100 한손검 번개 흉조/혼
// 2 쌍검 얼음 거극
// 20 랜스 용 흑식
// 200 건랜 독 흉조
// 3 슬액 마비 /혼
// 30 차액 수면 /혼
// 300 조충곤 폭파 /혼
// 4 라보 무 거극
// 40 해보 화 흑식
// 400 활 물 흉조