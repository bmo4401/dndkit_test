import "./globals.css";
import Navbar from "@/components/Navbar";
import CreateFormModal from "@/components/modals/CreateFormModal";
import { cn } from "@/libs/utils";
import ToastifyProvider from "@/providers/ToastProivder";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Form Builder",
  description: "Web tool for easily and quickly building your own form",
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
        <ToastifyProvider />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
