import { ROUTE } from "@/global/data/routeData";
import { URL_PARAM_ERROR_STATUS } from "@/global/data/errorData";

export default class AdvanceSettingParamError {
  public status: string;
  public message: string;

  constructor(errorStatus: string) {
    this.status = errorStatus;
    this.message = URL_PARAM_ERROR_STATUS[errorStatus] ? "유효하지 않은 url입니다." : "예상치 못한 에러가 발생 했습니다."
  }

  getReplaceUrl() {
    if (URL_PARAM_ERROR_STATUS[this.status]) {
      return `${ROUTE.advanceSetting}`
    }

    return ROUTE.home;
  }
}