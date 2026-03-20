"use client";

import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { decreaseCount, increaseCount, setCount } from "@/feature/store/slices/table/tableSlice";
import style from "./SkillAssignmentBar.module.css"
import TarredDeviceMatchBox from "./TarredDeviceMatchBox";
import { useRouter } from "next/navigation";

type RouteKeyType = "advance-setting" | "table-check";

export default function SkillAssignmentBar() {
  const dispatch = useAppDispatch();
  const router = useRouter()

  const advanceParam = useAppSelector(state => state.urlParam.advanceSettingParam);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const inputCount = Number(e.currentTarget.count.value);

    dispatch(setCount(inputCount))
  }

  const navigateToAdvanceSetting = (routeKey: RouteKeyType) => {
    const location = `${window.location.origin}/${routeKey}?${advanceParam}`
    router.push(location);
  }

  return (
    <div className={style.menuBar}>
      <div className={style.navigateBox}>
        <button onClick={() => navigateToAdvanceSetting("advance-setting")}>격화 세팅 변경</button>
        <button onClick={() => navigateToAdvanceSetting("table-check")} disabled={advanceParam === ""}>테이블 기록</button>
      </div>
      <div className="tarredDeviceBox">
        <TarredDeviceMatchBox />
      </div>
      <div>
      </div>
      <div className={style.tableCountContainer}>
        <form onSubmit={(e) => handleSubmit(e)}>
          <p>
            테이블 이동 :
            <input type="number" name="count"/>
          </p>
          <button type="submit">enter</button>
        </form>
        <button className={style.button} onClick={() => dispatch(decreaseCount())}>이전 테이블</button>
        <button className={style.button} onClick={() => dispatch(increaseCount())}>다음 테이블</button>
      </div>
    </div>
  )
}