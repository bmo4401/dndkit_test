"use client";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push("/")}
      className="text-linear bg-clip-text text-4xl hover:cursor-pointer"
    >
      Form Builder
    </div>
  );
};
export default Logo;
