import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MainMenu from "@/app/components/MainMenu";
import { LoadingProvider } from "./context/LoadingContext";
import Loading from "@/app/components/Loading";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="bg-white">
        <LoadingProvider>
          <Loading />
          <MainMenu />
          <main className="container mx-auto p-4">
            {children}
          </main>
        </LoadingProvider>
      </body>
    </html>
  );
}
