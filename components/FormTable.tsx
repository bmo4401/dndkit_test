"use client";
import Empty from "@/components/Empty";
import { SubmissionType } from "@/components/View";
import { cn } from "@/libs/utils";
import {
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
  design: any;
  form: any;
};

type AttributeType = {
  type: string;
  icon: {};
  attribute: {
    design: any;
    form: any;
  };
  id: string;
};

type ValidDataType = {
  design: {
    input: string;
  };
  form: { input: string };
};

const validField: Record<string, boolean> = {
  Text: true,
  TextArea: true,
  Select: true,
  Checkbox: true,
};

const FormTable = ({
  submittedForms,
}: {
  submittedForms: SubmissionType[];
}) => {
  const [info, setInfo] = useState<ValidDataType[]>([]);
  const [data, setData] = useState<SubmittedFormType[]>([]);

  useEffect(() => {
    setData(
      submittedForms.map((item) => {
        let rawData = JSON.parse(item.content) as AttributeType[];
        rawData = rawData.filter((item) => validField[item.type]);

        const validData = rawData.map((item) => {
          return { ...item.attribute };
        });

        setInfo(validData.map((item) => item));
        const ob = Object.fromEntries(
          validData.map((item, index) => [
            item.design?.input,
            item.form?.input,
          ]),
        );

        return {
          id: item.id,
          submittedAt: formatDistance(item.createdAt, new Date(), {
            addSuffix: true,
          }),
          ...ob,
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
      header: ({ header }) => {
        return <span>ID</span>;
      },
    }),
    ...(info?.map((item) => {
      return columnHelper.accessor(
        (rows) => {
          /* @ts-ignore */
          return rows[item.design.input] as string;
        },
        {
          id: item.design?.input,
          cell: (info) => {
            return info.getValue();
          },
          header: ({ header }) => {
            return <span>{header.id}</span>;
          },
        },
      );
    }) as []),

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
    <div
      id="table"
      className={cn(
        "scroll-bar h-fit max-w-[70%] ",
        data.length !== 0 && "border border-slate-500",
      )}
    >
      {data.length !== 0 && (
        <table className="max-w-[50%] rounded-md  border border-slate-500">
          {/* Header */}
          <thead className="border-b border-slate-500">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      className="min-w-[6rem] max-w-[12rem] break-words border-l border-slate-500 bg-subPrimary px-2 align-top text-sm"
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
                      className=" w-fit max-w-[12rem] break-words border-b border-l border-slate-500 border-b-slate-600/80 py-2 text-center align-top text-sm"
                      key={cell.id}
                    >
                      {isView ? (
                        <Link
                          target="_blank"
                          href={url}
                          className="flex justify-center opacity-80 hover:scale-110 hover:opacity-100"
                        >
                          <ArrowUpRight
                            size={30}
                            className="text-emerald-500"
                          />
                        </Link>
                      ) : (
                        flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )
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
      )}
      {data.length === 0 && <Empty />}
    </div>
  );
};
export default FormTable;
