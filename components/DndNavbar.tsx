"use client";
import { Button } from "@/components/ui/Button";
import useDesigner from "@/hooks/useDesign";

const DndNavbar = () => {
  const { clearElement } = useDesigner();
  return (
    <nav className="flex items-center gap-3 p-3">
      <Button onClick={() => clearElement()}>Clear</Button>
      <Button className="">Save</Button>
      <Button className="">Preview</Button>
      <Button className="border-none bg-gradient-to-br from-green-800 to-emerald-300">
        Publish
      </Button>
    </nav>
  );
};
export default DndNavbar;
