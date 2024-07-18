"use client";

import GlobalStyleProvider from "@/GlobalStyleProvider";
import theme from "@/styles/theme";
import { ThemeProvider } from "@emotion/react";
import { Inter } from "next/font/google";
import Head from "next/head";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

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
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            suspense: true,
            useErrorBoundary: true,
            retry: 0,
          },
        },
      })
  );

  return (
    <html lang="ko">
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>
      <body className={inter.className}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <GlobalStyleProvider>{children}</GlobalStyleProvider>
          </ThemeProvider>
        </QueryClientProvider>
        <div id="lecuenote-modal"></div>
        <div id="historyselect-modal"></div>
      </body>
    </html>
  );
}
