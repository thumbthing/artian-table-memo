"use client";

import { useAppSelector } from "@/app/hooks";
import { ADVANCE_CODE } from "@/global/data/appData";
import { shallowEqual } from "react-redux";

export default function TarredDeviceMatchBox() {
  const tarredDevice = useAppSelector(state => state.tarred.skillAssignment);

  return (
    <div>
      <div>
        <div>
          <p>부식된 장치</p>
        </div>
        <div>
          <p>{ADVANCE_CODE.attack}</p>
          <p>{tarredDevice.attack}</p>
        </div>
        <div>
          <p>{ADVANCE_CODE.affinity}</p>
          <p>{tarredDevice.affinity}</p>
        </div>
        <div>
          <p>{ADVANCE_CODE.element}</p>
          <p>{tarredDevice.element}</p>
        </div>
      </div>

    </div>
  )
}