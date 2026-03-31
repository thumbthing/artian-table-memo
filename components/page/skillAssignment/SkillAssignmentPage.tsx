import { useAppSelector } from "@/app/hooks";
import NavigationBar from "@/components/container/menuBar/navigationBar/NavigationBar";
import SkillAssignmentBar from "@/components/container/menuBar/skillAssignmentBar/SkillAssignmentBar";
import SkillAssignmentContainer from "@/components/container/skillAssignment/SkillAssignmentContainer";
import RecordListPortal from "@/components/portal/recordList/RecordListPortal";
import style from "./SkillAssignmentPage.module.css"

export default function SkillAssignmentPage() {
  const isRecordListOnView = useAppSelector(state => state.table.isRecordListOnView);

  return (
    <div className={style.page}>
      <NavigationBar />
      <SkillAssignmentBar />
      <SkillAssignmentContainer />

      {isRecordListOnView && <RecordListPortal/>}
    </div>
  )
}