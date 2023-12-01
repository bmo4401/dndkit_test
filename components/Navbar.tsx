"use client";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/Button";
import useModal from "@/hooks/useModal";
import { usePathname } from "next/navigation";
const Navbar = () => {
  const { show, setShow } = useModal();
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  return (
    <div className="flex items-center justify-between px-10 py-5">
      <Logo />

      <Button onClick={() => setShow(!show)}>Create New</Button>
    </div>
  );
};
export default Navbar;
