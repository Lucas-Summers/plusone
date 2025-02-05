import React, { ReactElement } from 'react'
import type { Metadata } from "next";
import { Nunito, Open_Sans } from 'next/font/google';
import "../globals.css";
import Dashboard from "../components/Dashboard";

const nunito = Nunito({ subsets: ["latin"] });
const opensans = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Plus+ ⋅ Dashboard",
};

export default function DashboardLayout({ children, }: Readonly <{ children: React.ReactNode; }>) {

  return (
      <Dashboard>
        {children}
      </Dashboard>
  );
}




