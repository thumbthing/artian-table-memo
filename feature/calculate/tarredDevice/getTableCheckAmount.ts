import { TARRED_DEVICE_ADVANCE_LIST } from "@/global/data/appData";
import { AdvanceType } from "@/global/type/appType";

export function getTableCheckAmount(singleDeviceAmount: number, singleAdvanceSetting: boolean) {
  const divideNumber = singleAdvanceSetting ? 3 : 6;
  return Math.floor(singleDeviceAmount / divideNumber);
}

type DeviceAmountType = Record<AdvanceType, number>;

type AdvanceSettingType = Record<AdvanceType, boolean>;

export function getTableRecordTotalAmount(deviceAmount: DeviceAmountType, advanceSetting: AdvanceSettingType) {
  const totalAmount = TARRED_DEVICE_ADVANCE_LIST
                        .map((tarredDevice) => getTableCheckAmount(deviceAmount[tarredDevice], advanceSetting[tarredDevice]))
                        .reduce((prev, curr) => prev + curr);
  return totalAmount
}