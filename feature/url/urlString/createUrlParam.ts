import { URL_CODE } from "@/global/data/appData";
import { UrlStateType } from "@/global/type/appType"

// TODO: url param 개념 정리
export function createAdvanceSettingParamString(urlData: Pick<UrlStateType, "weaponCode" | "advanceCode">) {
  const { weaponCode, advanceCode } = urlData;

  // TODO: url param의 대용량 데이터 구분 용 구분자로 자주 사용되는 특수 문자
  // 1순위 : |
  // 2순위 : : 이것은 key, value 형태의 값처럼 사용할 수 있다
  // 3순위 : ~
  // 장기적으로 가장 안전한 방법 
  // item=something1&item=something2&item=something3& 로 구성
  // getAll("item")으로 사용하는 것이 파싱 신뢰도에서는 제일 정확
  // 단점: url이 길어짐
  // 
  // 지양해야하는 특수 문자
  // & query의 구분자임
  // = key value의 구분자임
  // ? param의 시작점임
  // # fragment의 시작점임 => url에 하나만 존재할 수 있고 표현 방식은 자유 (spa의 상태저장에 적합, 서버에 전달되지 않는다) 파서를 만들면 사용가능하다
  // / path를 의미함
  // + space를 의미함
  // 공백 파싱이 반드시 필요
  // , 일부 파서에서는 불안정함
  const weaponParam = `weapon=${weaponCode}`;

  const filteredAdvanceCode = advanceCode.filter((advanceData) => {
    const [code] = Object.values(advanceData);
    return code > 0;
  });

  const advanceList = filteredAdvanceCode.map((filteredData) => {
    const [[weapon, code]] = Object.entries(filteredData);
    const weaponAdvanceString = `${URL_CODE[weapon]}-${code}`;
    return weaponAdvanceString;
  });

  const advanceParam = `advance=${advanceList.join("|")}`;

  // return `?${weaponParam}&${advanceParam}`;
  return `${weaponParam}&${advanceParam}`;
}

export function createTarredDeviceParamString() {
  const tarredParam = `tarred=`;
}