"use client";
import { Plus } from "lucide-react";
import { ComponentPropsWithoutRef, useMemo, useState } from "react";

interface TableProps extends ComponentPropsWithoutRef<"table"> {
  numRow?: number;
  numCol?: number;
  children: Array<string[]>;
}

export default function Table({
  numRow,
  numCol,
  children,
  ...props
}: TableProps) {
  const [rowCount, setRowCount] = useState(numRow || children.length);
  const [colCount, setColCount] = useState(numCol || children[0].length);
  const rows = useMemo(
    () => Array.from({ length: rowCount }, () => Array(colCount).fill("")),
    [rowCount, colCount]
  );

  return (
    <div className="flex items-center m-2">
      <table {...props}>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="border border-solid border-gray-950 min-w-fit rounded-md"
            >
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="border border-gray-600 px-3 py-1 outline-none w-24"
                  contentEditable
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      if (rowIndex === rowCount - 1) setRowCount(rowCount + 1);
                    }
                  }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <Plus
        size={24}
        className="m-2 cursor-pointer border bg-gray-300 rounded-md"
        onClick={() => setColCount(colCount + 1)}
      />
    </div>
  );
}
