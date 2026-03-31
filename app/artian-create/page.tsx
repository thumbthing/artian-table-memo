"use client";

import ArtianCreatePage from "@/components/page/artianCreate/ArtianCreatePage";
import { store } from "@/feature/store/store";
import { Suspense } from "react";
import { Provider } from "react-redux";

export default function Page() {
  return (
    <Suspense fallback={<div>loadin...</div>}>
      <Provider store={store}>
        <ArtianCreatePage />
      </Provider>
    </Suspense>
  )
}