"use client";

import { useEffect, useState } from "react";
import LoginDetailPage from "../LoginDetailPage";
import UnLoginDetailPage from "../UnLoginDetailPage";

function Detail() {
  const [isLogin, setIsLogin] = useState<string | null>();

  useEffect(() => {
    const storeIsLogin = sessionStorage.getItem("token");
    setIsLogin(storeIsLogin);
  }, []);
  return isLogin ? <LoginDetailPage /> : <UnLoginDetailPage />;
}

export default Detail;
