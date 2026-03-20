export default function thumbthingLog(text: string, value: any) {
  const noticeText = `${text}\n${value}`;

  if (typeof value === "object") {
    console.log(text);
    console.table(value);
  } else {
    console.log(noticeText)
  }
}