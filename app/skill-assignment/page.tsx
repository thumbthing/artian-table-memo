"use client";

import { Provider } from "react-redux";
import { store } from "../../feature/store/store";
import SkillAssignmentPage from "@/components/page/skillAssignment/SkillAssignmentPage";
import NavigationBar from "@/components/container/menuBar/navigationBar/NavigationBar";

export default function Page() {
  return (
    <Provider store={store}>
      <SkillAssignmentPage />
    </Provider> 
  )
}