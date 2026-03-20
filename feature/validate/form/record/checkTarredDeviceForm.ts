import { AdvanceType, TarredDeviceType } from "@/global/type/appType";

function checkEmptyForm(formData: FormData) {
  const formKeys = formData.keys();
  const isEmpty = formKeys.some(key => formData.get(key) === null || formData.get(key) === undefined);

  return isEmpty;
}



export function checkTarredDeviceForm(formData: FormData, tarredDevice: TarredDeviceType) {

  
}