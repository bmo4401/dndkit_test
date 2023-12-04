import Image from "next/image";
import empty from "@/public/empty.png";
const Empty = () => {
  return (
    <div className="justify-start10 flex h-full w-full flex-col items-center gap-2 ">
      <Image
        src={empty}
        alt="empty"
        width={0}
        height={0}
        className="rounded-lg  object-contain"
      />
      <h2 className="text-2xl  text-slate-500">(Empty)</h2>
    </div>
  );
};
export default Empty;
