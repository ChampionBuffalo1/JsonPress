"use client";

import { AppDispatch } from "@/app/store";
import EditableBlock from "./EditableBlock";
import { useAppDispatch } from "@/app/hooks";
import { useAppSelector } from "@/app/hooks";
import { Blocks, addHeading, addNode } from "@/app/reducer/editor";
import { useCallback, useRef, useState } from "react";
import { GripVertical, Plus, Wrench } from "lucide-react";
import BlockDropdown from "./Dropdown";

export default function Editor() {
  const dispatch = useAppDispatch();
  const [show, setShow] = useState<boolean>(false);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  const [filterOpts, setFilterOpts] = useState<string>("");
  const [takeInput, setTakeInput] = useState<boolean>(false);
  const blocks = useAppSelector((state) => state.editor.blocks);

  const handleChange = (event: React.FormEvent<HTMLDivElement>) => {
    // @ts-ignore
    const value = event.target.textContent || event.target.value;
    if (!value) return;
    console.log(value, filterOpts, takeInput);
    const last = value.slice(-1);

    if (last === "/") setTakeInput(true);
    if (last === " ") {
      setTakeInput(false);
      setFilterOpts("");
      return;
    }
    if (takeInput) {
      const index = value.lastIndexOf("/");
      const filterKey = value.substring(index + 1);
      setFilterOpts(filterKey);
    }
  };

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>, index: number) => {
      let idx: number | undefined;
      if (event.key === "Enter" || event.key === "ArrowDown") {
        event.preventDefault();
        idx = Math.min(index + 1, itemRefs.current.length - 1);
      }
      if (event.key === "ArrowUp") idx = Math.max(index - 1, 0);
      if (idx !== undefined) {
        setTakeInput(false);
        setFilterOpts("");
        itemRefs.current[idx]?.focus();
      }
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
              className="w-full mt-2 items-center border border-black rounded-lg p-2"
              ref={(el) => itemRefs.current.push(el)}
              type={block.type!}
              attributes={{
                ...block.attributes,
                style: {
                  outline: "2px solid transparent",
                  outlineOffset: "2px",
                },
              }}
              onInput={handleChange}
              onKeyDown={(e) => handleKeyDown(e, key)}
            />
            <ShowIconsRight show={show && key !== 0} />
          </div>
        ))}
        {filterOpts && (
          <BlockDropdown
            // mx-14 border border-gray-600 rounded-md mt-1 shadow-black
            className="z-10 absolute mt-2 py-2 shadow-lg rounded-md"
            filterKey={filterOpts}
            onSelect={(type) => {
              // TODO: Finish this
              // let obj = {} as Blocks;
              setFilterOpts("");
            }}
          />
        )}
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
            addHeading({
              variant: "h2",
              placeholder: "placeholder text",
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
