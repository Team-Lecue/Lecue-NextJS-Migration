"use client";

import GlobalStyleProvider from "@/components/GlobalStyleProvider";
import theme from "@/styles/theme";
import { ThemeProvider } from "@emotion/react";
import { Inter } from "next/font/google";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

const metadata = {
    title: "레큐 lecue",
   description: "레큐노트에 우리의 마음을 담아 전달해요",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>
      <body className={inter.className}>
        <ThemeProvider theme={theme}>
          <GlobalStyleProvider>{children}</GlobalStyleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
