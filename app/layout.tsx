import React from 'react'
import type { Metadata } from "next";
import "./globals.css";
import { Nunito, Open_Sans } from 'next/font/google';
import { AuthProvider } from './context/AuthContext';

const nunito = Nunito({ subsets: ["latin"] });
const opensans = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Plus+",
  description: "Find your +1 today!",
};

export default function RootLayout({ children, }: Readonly <{ children: React.ReactNode; }>) {

  return (
    <html lang="en">
      <AuthProvider>
        <body
        className={'w-full max-w-[1800px] mx-auto text-sm sm:text-base min-h-screen flex flex-col text-slate-800 ' + opensans.className} >
          {children}
        </body>
      </AuthProvider>
    </html>
  );
}
