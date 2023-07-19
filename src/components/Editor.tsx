"use client";

import { useCallback } from "react";
import EditableBlock from "./EditableBlock";
import { useAppSelector } from "@/app/hooks";

export default function Editor() {
  const blocks = useAppSelector((state) => state.editor.blocks);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>, index: number) => {
      let idx: number | undefined;
      if (event.key === "Enter" || event.key === "ArrowDown") {
        event.preventDefault();
        // idx = Math.min(index + 1, itemRefs.current.length - 1);
      }
      if (event.key === "ArrowUp") idx = Math.max(index - 1, 0);
      if (idx !== undefined) {
        // setTakeInput(false);
        // setFilterOpts("");
        // itemRefs.current[idx]?.focus();
      }
    },
    []
  );

  return (
    <div className="mt-10 flex flex-col items-center justify-center pt-10">
      <div className="w-full max-w-5xl">
        {blocks.map((block, key) => (
          <div className="w-full max-w-5xl flex mt-2 items-center" key={key}>
            <EditableBlock
              // @ts-expect-error: I haven't fixed the typing yet
              type={block.type}
              attributes={block.attributes}
              onKeyDown={(e) => handleKeyDown(e, key)}
              currentIndex={key}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
