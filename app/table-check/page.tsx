"use client";

import { Provider } from "react-redux";
import { store } from "../../feature/store/store";
import TableCheckPage from "@/components/page/tableCheck/TableCheckPage";
import NavigationBar from "@/components/container/menuBar/navigationBar/NavigationBar";
import { Suspense } from "react";

export default function tableCheck() {
  
  return (
    <Suspense fallback={<div>loading...</div>}>
      <Provider store={store}>
        <TableCheckPage />
      </Provider>
    </Suspense>
  )
}