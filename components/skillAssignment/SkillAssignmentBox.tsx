"use client";

import { useAppSelector } from "@/app/hooks";
import { TableRecordType } from "@/global/type/extendedType";
import { Fragment, useEffect, useState } from "react";
import SkillRecord from "./SkillRecord";
import style from "./SkillAssignmentBox.module.css"
import NoMoreRecord from "./NoMoreRecord";

export default function SkillAssignmentBox() {
  // 스킬 리스트 보여주기
  const count = useAppSelector(state => state.table.count);
  const tableRecordList = useAppSelector(state => state.table.tableRecordList);
  
  const recordOrderList = [...new Set([...tableRecordList].map(record => record.order))]
  const [isCountOrder, setIsCountOrder] = useState<boolean>(false);
  const [nextOrderIndex, setNextOrderIndex] = useState<number>(0);

  const [lastOrder, setLastOrder] = useState<number>(0);
  const [isLastOrder, setIsLastOrder] = useState<boolean>(false);
  const [recordList, setRecordList] = useState<TableRecordType[]>([]);

  useEffect(() => {
    const lastOrder = recordOrderList.at(-1);

    if (lastOrder !== undefined) {
      setLastOrder(lastOrder);
    } else {
      setLastOrder(0);
    }

  }, []);

  useEffect(() => {
    const nextRecordOrder = count + 1;

    const isNextOrder = recordOrderList.includes(nextRecordOrder);

    setNextOrderIndex(recordOrderList.findIndex(order => order > nextRecordOrder));
    
    if (isNextOrder) {
      isCountOrder === false && setIsCountOrder(true)
      
      setRecordList([...tableRecordList].filter(record => record.order === nextRecordOrder));
      return;
    }

    if (isNextOrder === false && isCountOrder === true) {
      setIsCountOrder(false)
    }

    if (isNextOrder === false && recordList.length > 0) {
      setRecordList([]);
      return;
    }

  }, [count]);

  useEffect(() => {
    const isCountBiggerThenLastOrder = count >= lastOrder;

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
      <div className={style.noticeBox}>
        <div className={style.countBox}>
          <div className={style.boxHeaderText}>재부여 횟수</div>
          <div className={style.countText}>{count}</div>
        </div>
      {isCountOrder ? 
        <div className={style.countOrderNoticeAssignMentBox}>
          <div>테이블 : {count + 1}</div>
          <div>유효 옵션 : {recordList.length}개</div>
        </div>
          :
        <div className={style.defaultNoticeAssignMentBox}>
          <div>테이블 : {count + 1}</div>
          <div>유효 옵션 : 0개</div>
        </div>
      }
        <div className={style.countBox}>
          <div className={style.boxHeaderText}>다음 유효 테이블</div>
          <div className={style.countText}>{nextOrderIndex !== -1 ? recordOrderList[nextOrderIndex] : "X"}</div>
        </div>
      </div>
      <div className={style.skillList}>
      {isLastOrder ? 
        <NoMoreRecord />
        :
        recordList.length !== 0 &&
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