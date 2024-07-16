"use client";

import gStyle from "@/styles/GlobalStyles";
import { Global } from "@emotion/react";

function GlobalStyleProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Global styles={gStyle} />
      {children}
    </>
  );
}

export default GlobalStyleProvider;
