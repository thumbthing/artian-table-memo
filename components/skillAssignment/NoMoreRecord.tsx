'use client';

import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { resetAllTarredTableState } from "@/feature/store/thunks/resetAllTarredTableState";
import { ROUTE } from "@/global/data/routeData";
import { useRouter } from "next/navigation";

export default function NoMoreRecord() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const advanceParam = useAppSelector(state => state.urlParam.advanceSettingParam);

  const handleOnClick = () => {
    dispatch(resetAllTarredTableState());
    const tableCheckLocation = `${window.location.origin}${ROUTE.tableCheck}${advanceParam}`
    router.push(tableCheckLocation);
  }

  return (
    <div>
      <div>
        <p>이후의 테이블에 유효한 스킬이 존재하지 않습니다.</p>
      </div>
      <div>
        <button onClick={() => handleOnClick()}>테이블 기록으로 이동</button>
      </div>
    </div>
  )
}