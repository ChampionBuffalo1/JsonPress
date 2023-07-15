"use client";

import { AppDispatch } from "@/app/store";
import EditableBlock from "./EditableBlock";
import { useAppDispatch } from "@/app/hooks";
import { useAppSelector } from "@/app/hooks";
import { addNode } from "@/app/reducer/editor";
import { useCallback, useRef, useState } from "react";
import { GripVertical, Plus, Wrench } from "lucide-react";

export default function Editor() {
  const [show, setShow] = useState<boolean>(false);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  const blocks = useAppSelector((state) => state.editor.blocks);
  const dispatch = useAppDispatch();

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>, index: number) => {
      let idx: number | undefined;
      if (event.key === "Enter" || event.key === "ArrowDown") {
        event.preventDefault();
        idx = Math.min(index + 1, itemRefs.current.length - 1);
      }
      if (event.key === "ArrowUp") idx = Math.max(index - 1, 0);
      if (idx !== undefined) itemRefs.current[idx]?.focus();
    },
    []
  );

  return (
    <div className="mt-10 flex flex-col items-center justify-center pt-10">
      <div className="w-full max-w-5xl">
        {blocks.map((block, key) => (
          <div
            className="w-full max-w-5xl flex mt-2 items-center"
            key={key}
            // Shared state (BUG)
            onMouseOver={() => setShow(true)}
            onMouseOut={() => setShow(false)}
          >
            <ShowIconsLeft show={show && key !== 0} dispatch={dispatch} />
            <EditableBlock
              className="w-full max-w-5xl flex mt-2 items-center"
              ref={(el) => (itemRefs.current[key] = el)}
              type={block.type}
              attribute={block.attribute}
              onKeyDown={(e) => handleKeyDown(e, key)}
            />
            <ShowIconsRight show={show && key !== 0} />
          </div>
        ))}
      </div>
    </div>
  );
}

type SettingsProps = {
  show: boolean;
  dispatch: AppDispatch;
};

function ShowIconsLeft({ show, dispatch }: SettingsProps) {
  if (!show) return <p className="mx-7" />;
  return (
    <div className="flex items-center">
      <Plus
        size={20}
        className="mr-2 cursor-pointer"
        onClick={() => {
          dispatch(
            addNode({
              type: "heading",
              position: 4,
              attribute: {
                variant: "h2",
                content: "Placehp;der",
              },
            })
          );
        }}
      />
      <GripVertical size={20} className="mr-2" />
    </div>
  );
}

function ShowIconsRight({ show }: Omit<SettingsProps, "dispatch">) {
  if (!show) return <span className="mx-4" />;
  return <Wrench className="ml-[0.6rem]" />;
}
