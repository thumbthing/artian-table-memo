"use client";

import { Provider } from "react-redux";
import { store } from "../../feature/store/store";
import TableCheckPage from "@/components/page/tableCheck/TableCheckPage";
import NavigationBar from "@/components/container/menuBar/navigationBar/NavigationBar";

export default function tableCheck() {
  
  return (
    <>
      <Provider store={store}>
        <TableCheckPage />
      </Provider>
    </>
  )
}