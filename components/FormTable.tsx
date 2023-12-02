"use client";
import { SubmissionType } from "@/components/View";
import {
  Table,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { formatDistance } from "date-fns";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
type SubmittedFormType = {
  id: number;
  submittedAt: string;
  view: string;
};

const FormTable = ({
  submittedForms,
}: {
  submittedForms: SubmissionType[];
}) => {
  const [data, setData] = useState<SubmittedFormType[]>([]);
  useEffect(() => {
    setData(
      submittedForms.map((item) => {
        return {
          id: item.id,
          submittedAt: formatDistance(item.createdAt, new Date(), {
            addSuffix: true,
          }),
          view: `/published/${item.formId}/view/${item.id}`,
        };
      }),
    );
  }, []);
  const columnHelper = createColumnHelper<SubmittedFormType>();
  /* define columns */
  const columns = [
    columnHelper.accessor("id", {
      cell: (info) => info.getValue(),
      /*       footer: (info) => info.column.id, */
      header: ({ header }) => {
        return <span>ID</span>;
      },
    }),
    columnHelper.accessor("submittedAt", {
      cell: (info) => {
        return info.getValue();
      },
      header: ({ header }) => {
        return <span>Submitted At</span>;
      },
    }),
    columnHelper.accessor("view", {
      id: "View",
      cell: (info) => info.getValue(),
      header: ({ header }) => {
        return <span>View</span>;
      },
    }),
  ];
  /* create table */
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div className="w-fit">
      <table className=" border border-slate-500">
        {/* Header */}
        <thead className="border-b border-slate-500">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    className="w-fit border-l border-slate-500 bg-subPrimary px-16 text-base"
                    key={header.id}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        {/* Content */}
        <tbody className="">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => {
                const url = cell.row.original.view;
                const isView = cell.column.id === "View";

                return (
                  <td
                    className=" border-b border-l border-slate-500 border-b-slate-600/80 py-2 text-center text-sm"
                    key={cell.id}
                  >
                    {isView ? (
                      <Link
                        target="_blank"
                        href={url}
                        className="flex justify-center"
                      >
                        <ArrowUpRight size={30} className="text-emerald-500" />
                      </Link>
                    ) : (
                      flexRender(cell.column.columnDef.cell, cell.getContext())
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
        {/* Footer */}
        {/* <tfoot className="">
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot> */}
      </table>
    </div>
  );
};
export default FormTable;
