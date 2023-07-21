"use client";

import { useState } from "react";
import EditableBlock from "./EditableBlock";
import { useAppSelector } from "@/app/hooks";

export default function Editor() {
  const [showJson, setShowJson] = useState<boolean>(false);
  const blocks = useAppSelector((state) => state.editor.blocks);

  return (
    <div className="mt-10 flex flex-col items-center justify-center pt-10">
      <div className="w-full max-w-5xl">
        {blocks.map((block, key) => (
          <div className="w-full max-w-5xl flex mt-2 items-center" key={key}>
            <EditableBlock
              id={block.id}
              // @ts-expect-error: I haven't fixed the typing yet
              type={block.type}
              currentIndex={key}
              attributes={block.attributes}
            />
          </div>
        ))}
        <button
          className="w-14 text-xl p-2 rounded-md border border-gray-700 bg-slate-400 min-w-fit"
          onClick={() => {
            setShowJson(!showJson);
            window.dispatchEvent(new Event("dispatch"));
          }}
        >
          Save
        </button>
        {showJson && <pre>{JSON.stringify(blocks, null, 2)}</pre>}
      </div>
    </div>
  );
}
