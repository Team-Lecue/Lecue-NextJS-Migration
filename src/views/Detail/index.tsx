"use client";

import { Suspense, useEffect, useState } from "react";
import LoginDetailPage from "../LoginDetailPage";
import UnLoginDetailPage from "../UnLoginDetailPage";

function Detail() {
  const [isLogin, setIsLogin] = useState<string | null>();

  useEffect(() => {
    const storeIsLogin = sessionStorage.getItem("token");
    setIsLogin(storeIsLogin);
  }, []);
  return (
    <Suspense fallback={<div>Loading page...</div>}>
      {isLogin ? <LoginDetailPage /> : <UnLoginDetailPage />}
    </Suspense>
  );
}

export default Detail;
