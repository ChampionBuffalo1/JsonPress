"use client";
import { Plus } from "lucide-react";
import { useAppDispatch } from "@/app/hooks";
import { updateContent } from "@/app/reducer/editor";
import {
  useRef,
  useMemo,
  useState,
  useEffect,
  ComponentPropsWithoutRef,
} from "react";

interface TableProps extends ComponentPropsWithoutRef<"table"> {
  id: string;
  numRow?: number;
  numCol?: number;
  children: string[][];
}

export default function Table({
  id,
  numRow,
  numCol,
  children,
  ...props
}: TableProps) {
  const dispatch = useAppDispatch();
  const gridRef = useRef<string[][]>([]);
  const rowCount = useMemo(() => numRow || children.length, [numRow, children]);
  const [colCount, setColCount] = useState(numCol || children[0].length);
  const [grid, setGrid] = useState<string[][]>(
    children.length > 0
      ? children
      : Array.from({ length: rowCount }, () => Array(colCount).fill(""))
  );

  useEffect(() => {
    gridRef.current = grid;
  }, [grid]);

  useEffect(() => {
    const handleDispatch = () => {
      dispatch(
        updateContent({
          id,
          type: "table",
          value: gridRef.current,
        })
      );
    };
    window.addEventListener("dispatch", handleDispatch);
    return () => window.removeEventListener("dispatch", handleDispatch);
  }, [id, gridRef, dispatch]);

  return (
    <div className="flex items-center m-2">
      <table {...props}>
        <tbody>
          {grid.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="border border-solid border-gray-950 min-w-fit rounded-md"
            >
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="border border-gray-600 px-3 py-1 outline-none min-w-fit w-24 break-words "
                  contentEditable
                  onInput={(e) => {
                    const value = e.currentTarget.textContent || "";
                    gridRef.current = gridRef.current.map((row, i) =>
                      i === rowIndex
                        ? row.map((cell, j) => (j === cellIndex ? value : cell))
                        : row
                    );
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      if (rowIndex === rowCount - 1) {
                        gridRef.current = [
                          ...gridRef.current,
                          Array(colCount).fill(""),
                        ];
                        setGrid((grid) => [...grid, Array(colCount).fill("")]);
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
          setGrid((grid) => grid.map((row) => [...row, ""]));
          gridRef.current = gridRef.current?.map((row) => [...row, ""]);
        }}
      />
    </div>
  );
}
