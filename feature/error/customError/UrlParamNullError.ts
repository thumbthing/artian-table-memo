export default class UrlParamNullError {
  public message: string = "URL : param is Null"
  public replaceUrl: string;

  constructor(weaponParam: string | null, advanceParam: string | null) {
    const nullCheckedWeaponParam = weaponParam === null ? "0" : weaponParam;
    const nullCheckedAdvanceParam = advanceParam === null ? "" : advanceParam;

    this.replaceUrl = this.createReplaceUrl(nullCheckedWeaponParam, nullCheckedAdvanceParam);
  }

  createReplaceUrl(nullCheckedWeaponParam: string, nullCheckedAdvanceParam: string) {
    if (nullCheckedWeaponParam === "0" && nullCheckedAdvanceParam === "") {
      const advanceSettingUrl = `${window.location.origin}/advance-setting`
      return advanceSettingUrl
    }

    return `${window.location.origin}/advance-setting?weapon=${nullCheckedWeaponParam}&advance=${nullCheckedAdvanceParam}`
  }
}