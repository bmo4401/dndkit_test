"use client";
import Empty from "@/components/Empty";
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
  /*   design: any;
  form: any; */
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
  id: string;
};

const validField: Record<string, boolean> = {
  Title: true,
  Text: true,
  TextArea: true,
  Checkbox: true,
  Select: true,
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
        let validData = JSON.parse(item.content) as AttributeType[];
        validData = validData.filter((item) => validField[item.type]);
        const newData: { [id: string]: ValidDataType[] } = {};
        for (let i = 0, j = 0; i < validData.length || j < validData.length; ) {
          if (validData[i].type === "Title") {
            console.log(
              "❄️ ~ file: FormTable.tsx:69 ~ validData[i].type:",
              validData[i].type,
            );
            while (validData[j].type === "Title") {
              const {
                id,
                attribute: { design, form },
              } = validData[j];
              console.log(
                "❄️ ~ file: FormTable.tsx:78 ~ validData[j]:",
                validData[j],
              );
              if (!newData[validData[i].id]) newData[validData[i].id] = [];
              newData[validData[i].id].push({ design, form, id });
              j++;
            }
          } else {
            j++;
          }
          i = j;
        }
        console.log(newData);
        /*       setInfo(newData.map((item) => item.attribute));
        const ob = Object.fromEntries(
          newData.map((item, index) => [
            item.attribute.design.input,
            item.attribute.form.input,
          ]),
        );  */

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
          id: item.design.input,
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
        return;
        <span>Submitted At</span>;
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
    <div id="table" className="scroll-bar h-fit w-[50%] max-w-[50%] ">
      {data.length !== 0 && (
        <table className="max-w-[50%] rounded-md  border border-slate-500">
          {/* Header */}
          <thead className="border-b border-slate-500">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      className="w-fit max-w-[12rem] break-words border-l border-slate-500 bg-subPrimary px-10 text-base"
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
