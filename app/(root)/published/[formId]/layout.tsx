import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function PublishedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <body className="scroll-bar h-screen w-screen overflow-x-hidden  bg-black  text-white">
      {children}
    </body>
  );
}
