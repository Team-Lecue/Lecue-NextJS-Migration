"use client";

import LoadingPage from "@/common/LoadingPage";
import { Suspense } from "react";
import SelectView from "../SelectView";

function LandingView() {
  return (
    <Suspense fallback={<LoadingPage />}>
      <SelectView />
    </Suspense>
  );
}

export default LandingView;
