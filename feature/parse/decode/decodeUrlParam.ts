
// TODO : return 타입이 다양한 건 좋지 않다

import { BinaryStringListType } from "@/global/type/extendedType";

// 3️⃣ 제네릭 기반 변환 함수 설계

// 목표:

// radix 확장 가능

// 반환 타입 조건부 매핑

// type RadixMap<T extends number> =
//   T extends 8 ? string[][] : string[];

// export function decodeUrlParam<T extends 2 | 8>(
//   urlParam: string,
//   radix: T
// ): RadixMap<T> {
//   const parsed = Number(urlParam);

//   if (!Number.isInteger(parsed)) {
//     throw new Error("Invalid numeric input");
//   }

//   if (radix === 8) {
//     const octalDigits = parsed.toString(8).split("");
//     return octalDigits.map(d =>
//       Number(d).toString(2).padStart(3, "0").split("")
//     ) as RadixMap<T>;
//   }

//   return parsed.toString(radix).split("") as RadixMap<T>;
// }

// 특징

// radix에 따라 반환 타입 자동 결정

// 오버로드 없이 제네릭으로 해결

// 확장성 높음

// export function decodeUrlParam(urlParam: string, radix: 2 | 8) : string[] | string[][] {
//   const code = Number(urlParam);
//   const codeString = code.toString(radix);
//   const codeList = codeString.split("");

//   if (radix === 8) {
    
//     const octalList = codeList.map((digit) => decodeUrlParam(digit, 2));
    
//     console.log(octalList);
//     return octalList;
//   }
//   return codeList
// }

export function decodeParam(urlParam: string, radix: 2 | 8) {
  const code = Number(urlParam);
  const codeString = code.toString(radix);
  const codeList = codeString.split("");
  return codeList
}

export function decodeAdvanceParam(advanceParam: string) {
  const codeList = decodeParam(advanceParam, 8);
  const octalCodeList = codeList.map<BinaryStringListType>((octal) => {
                                  const binaryList = decodeParam(octal, 2);
                                  const emptyList = Array(3 - binaryList.length).fill("0");
                                  return emptyList.concat(binaryList);
                                });
  return octalCodeList
}