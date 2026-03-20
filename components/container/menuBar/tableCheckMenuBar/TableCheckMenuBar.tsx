import DeviceInputBox from "@/components/input/deviceInput/DeviceInput";
import style from "./TableCheckMenuBar.module.css"
import NavigateSkillAssignmentButton from "@/components/button/navigate/NavigateSkillAssignmentButton";
import NavigateAdvanceSettingButton from "@/components/button/navigate/NavigateAdvanceSettingButton";

export default function TableCheckMenuBar() {
  return (
    <div className={style.menuBar}>
      <NavigateAdvanceSettingButton />
      <DeviceInputBox />
      <NavigateSkillAssignmentButton />
    </div>
  )
}