import "./globals.css";
import Navbar from "@/components/Navbar";
import CreateFormModal from "@/components/modals/CreateFormModal";
import { cn } from "@/libs/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          inter.className,
          "scroll-bar  h-screen w-screen  bg-black  text-white",
        )}
      >
        {/* modal */}
        <CreateFormModal />

        <Navbar />
        {children}
      </body>
    </html>
  );
}
