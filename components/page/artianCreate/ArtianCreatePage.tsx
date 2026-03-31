import ArtianCreateContainer from "@/components/container/ArtianCreate/ArtianCreateContainer";
import style from "./ArtianCreatePage.module.css"
import ArtianCreateNotice from "@/components/notice/ArtianCreateNotice";
import NavigationBar from "@/components/container/menuBar/navigationBar/NavigationBar";

export default function ArtianCreatePage() {
  return (
    <div className={style.page}>
      <NavigationBar />
      <ArtianCreateNotice />
      <ArtianCreateContainer />
    </div>
  )
}