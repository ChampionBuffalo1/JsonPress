"use client";
import { Plus } from "lucide-react";
import { useAppDispatch } from "@/app/hooks";
import { updateContent } from "@/app/reducer/editor";
import { ComponentPropsWithoutRef, useEffect, useState } from "react";

interface TableProps extends ComponentPropsWithoutRef<"table"> {
  id: string;
  numRow?: number;
  numCol?: number;
  children: Array<string[]>;
}

export default function Table({
  id,
  numRow,
  numCol,
  children,
  ...props
}: TableProps) {
  const dispatch = useAppDispatch();
  const [rowCount, setRowCount] = useState(numRow || children.length);
  const [colCount, setColCount] = useState(numCol || children[0].length);
  const [rows, setRows] = useState(
    children.length > 0
      ? children
      : Array.from({ length: rowCount }, () => Array(colCount).fill(""))
  );

  useEffect(() => {
    const handleDispatch = () => {
      console.log("dispatching", rows);
      dispatch(
        updateContent({
          id,
          type: "table",
          value: rows,
        })
      );
    };
    window.addEventListener("dispatch", handleDispatch);
    return () => window.removeEventListener("dispatch", handleDispatch);
  }, [id, rows, dispatch]);

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
                  onInput={(e) => {
                    const value = e.currentTarget.textContent || "";
                    setRows((prevRows) =>
                      prevRows.map((row, i) =>
                        i === rowIndex
                          ? row.map((cell, j) =>
                              j === cellIndex ? value : cell
                            )
                          : row
                      )
                    );
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      if (rowIndex === rowCount - 1) {
                        setRowCount(rowCount + 1);
                        setRows((prevRows) => [
                          ...prevRows,
                          Array(colCount).fill(""),
                        ]);
                      }
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
        onClick={() => {
          setColCount(colCount + 1);
          setRows((prevRows) => prevRows.map((row) => [...row, ""]));
        }}
      />
    </div>
  );
}
