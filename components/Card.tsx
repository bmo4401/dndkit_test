import { Button } from "@/components/ui/Button";
import { cn } from "@/libs/utils";
import { Badge, CheckSquare, Eye, MoveRight, Pencil } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { formatDistance } from "date-fns";
import { Form } from "@prisma/client";
export default function Card({ form }: { form: Form }) {
  return (
    <div className="flex h-full max-w-[70%] items-start justify-between rounded-md border border-slate-500 px-5 py-3">
      <div className="flex h-full max-w-[70%] flex-row items-start gap-3 px-3 ">
        <div className=" relative aspect-square w-20 self-start p-0">
          <Image
            src={"/form.png"}
            alt=""
            fill
            className="rounded-md object-cover "
          />
        </div>
        <div className="flex h-full w-[calc(100%-5rem)] flex-col justify-between gap-2 p-0">
          <div>{form.name}</div>
          <p className="line-clamp-2 text-sm text-slate-400">
            {form.description}
          </p>
          <p>
            {formatDistance(form.createdAt, new Date(), { addSuffix: true })}
          </p>
        </div>
      </div>

      <div className=" flex h-full flex-col justify-between gap-3 p-0">
        <div className="flex flex-col gap-3">
          <div className="self-end">
            {form.published && (
              <h2 className="rounded-md bg-green-500 px-3 text-white">
                Published
              </h2>
            )}
            {!form.published && (
              <h2 className="rounded-md bg-red-500 px-3">Draft</h2>
            )}
          </div>
          <div className="self-end">
            <span className="flex items-center gap-3">
              <Eye
                className={cn(
                  form.published ? "text-green-500 " : "text-slate-600",
                )}
              />
              {/*     <span className={cn(form.published ? '' : 'text-slate-600')}>
                  {form.visits.toLocaleString()}
                </span> */}
              <CheckSquare
                className={cn(
                  "h-5 w-5",
                  form.published ? "text-rose-500 " : "text-slate-600",
                )}
              />
              <span className={cn(form.published ? "" : "text-slate-600")}>
                {form.submissions.toLocaleString()}
              </span>
            </span>
          </div>
        </div>
        <div>
          {form.published && (
            <Button className=" mt-2 w-full  gap-4 ">
              <Link
                className="flex items-center gap-3 text-base"
                href={`/published/${form.id}/view`}
              >
                {" "}
                View
                <MoveRight />
              </Link>
            </Button>
          )}
          {!form.published && (
            <Button className=" mt-2 w-fit gap-4 text-sm   ">
              <Link
                className="flex items-center gap-3 text-base"
                href={`/builder/${form.id}`}
              >
                {" "}
                Edit form
                <Pencil size={20} />
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
