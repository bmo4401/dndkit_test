import Logo from "@/components/Logo";
const Navbar = () => {
  return (
    <div className="relative flex h-20 items-center justify-between bg-black  px-10 text-white">
      <div
        className="absolute bottom-0 mx-[-2.5rem] h-[1px] w-full 
      border-b border-slate-500
      "
      />
      <Logo />
    </div>
  );
};
export default Navbar;
