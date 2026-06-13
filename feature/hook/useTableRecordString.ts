import { useAppSelector } from "@/app/hooks";
import { useMemo } from "react";

export default function useTableRecordString() {
  const tableRecord = useAppSelector(state => state.table.tableRecordList);

  return useMemo(() => {
    const recordString = tableRecord.map<string>((record) => {
      return `${record.order} ${record.weaponName} ${record.elementName} ${record.seriesSkill}/${record.groupSkill}`
    }).join("\n");

    return recordString;

  }, [tableRecord]);
}