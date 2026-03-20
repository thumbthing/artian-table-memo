import { useAppSelector } from "@/app/hooks";
import TableCheckMenuBar from "@/components/container/menuBar/tableCheckMenuBar/TableCheckMenuBar";
import TableCheckContainer from "@/components/container/TableCheck/TableCheckContainer";
import style from "./TableCheckPage.module.css"
import { shallowEqual } from "react-redux";
import TableRecordContainer from "@/components/portal/record/TableRecordPortal";
import NavigationBar from "@/components/container/menuBar/navigationBar/NavigationBar";
import SeriesSkillList from "@/components/portal/skillList/SeriesSkillList";
import GroupSkillList from "@/components/portal/skillList/GroupSkillList";

export default function TableCheckPage() {
  const {isOnRecord, isSeriesSkillSelecting, isGroupSkillSelecting, weaponName, elementName} = useAppSelector(state => ({
    isOnRecord: state.table.isOnRecord,
    isSeriesSkillSelecting: state.table.isSeriesSkillSelecting,
    isGroupSkillSelecting: state.table.isGroupSkillSelecting,
    weaponName: state.table.weaponName,
    elementName: state.table.elementName
  }), shallowEqual);

  return (
    <>
      <div className={style.page}>
        <TableCheckMenuBar />
        <TableCheckContainer />
      </div>
      {(isOnRecord && (weaponName && elementName)) && 
        <TableRecordContainer weaponName={weaponName} elementName={elementName}/>
      }
      {isSeriesSkillSelecting && 
        <SeriesSkillList />
      }
      {isGroupSkillSelecting &&
        <GroupSkillList />
      }
    </>
  )
}