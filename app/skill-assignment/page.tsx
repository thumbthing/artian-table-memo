"use client";

import { Provider } from "react-redux";
import { store } from "../../feature/store/store";
import SkillAssignmentPage from "@/components/page/skillAssignment/SkillAssignmentPage";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <Provider store={store}>
        <SkillAssignmentPage />
      </Provider> 
    </Suspense>
  )
}