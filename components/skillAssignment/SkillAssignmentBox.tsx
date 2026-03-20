"use client";

import { useAppSelector } from "@/app/hooks";
import { TableRecordType } from "@/global/type/extendedType";
import { useEffect, useState } from "react";
import SkillRecord from "./SkillRecord";
import style from "./SkillAssignmentBox.module.css"
import NoMoreRecord from "./NoMoreRecord";

export default function SkillAssignmentBox() {
  // 스킬 리스트 보여주기
  const count = useAppSelector(state => state.table.count);
  const tableRecordList = useAppSelector(state => state.table.tableRecordList);
  
  const recordOrderKeys = new Set([...tableRecordList].map(record => record.order))
  const [lastOrder, setLastOrder] = useState<number>(0);
  const [isLastOrder, setIsLastOrder] = useState<boolean>(false);
  const [recordList, setRecordList] = useState<TableRecordType[]>([]);

  useEffect(() => {
    const lastOrderKey = [...recordOrderKeys.values()].at(-1);

    if (lastOrderKey !== undefined) {
      setLastOrder(lastOrderKey);
    }
  }, []);

  useEffect(() => {
    const nextRecordOrder = count + 1;

    const isNextOrder = recordOrderKeys.has(nextRecordOrder);

    if (isNextOrder) {
      setRecordList([...tableRecordList].filter(record => record.order === nextRecordOrder));
      return;
    }

    if (isNextOrder === false && recordList.length > 0) {
      setRecordList([]);
      return;
    }

  }, [count]);

  useEffect(() => {
    const isCountBiggerThenLastOrder = count > lastOrder;

    if (isCountBiggerThenLastOrder === false && isLastOrder === false) {
      return;
    }

    if (isCountBiggerThenLastOrder === false && isLastOrder === true) {
      setIsLastOrder(false);
      return;
    }

    if (isCountBiggerThenLastOrder === true && isLastOrder === false) {
      setIsLastOrder(true);
      return;
    }

  }, [count, isLastOrder]);

  return (
    <div className={style.box}>
      <div className={style.countNotice}>
        <p>현제 테이블 순서 : {count}</p>
        <p>다음 테이블 까지 : {}</p>
      </div>
      <div className={style.skillList}>
      {isLastOrder ? 
        <NoMoreRecord />
        :
        recordList.map((record, index) => 
          <div key={`${index}-${record.weaponName}-${record.elementName}-${record.order}`}>
          <SkillRecord record={record} />
        </div>
        )
      }
      </div>
    </div>
  )
}