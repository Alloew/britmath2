import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Nav from "./nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Brit Maths",
  description: "Light Speed",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className + " min-h-screen flex flex-col"}>
        <Nav></Nav>
        <div
          className="grid place-items-center"
          style={{ minHeight: "calc(100vh - 2rem)" }}
        >
          {children}
        </div>
      </body>
    </html>
  );
}
