"use client";

import { cn } from "@/lib/util";
import BlockDropdown from "../Dropdown";
import { useCallback, useState } from "react";
import { cva, VariantProps } from "class-variance-authority";
import { GripVertical, Plus, Wrench } from "lucide-react";

const blockVariants = cva(
  "w-full h-fit rounded-lg mt-1 p-2 outline-none break-words whitespace-pre-wrap",
  {
    variants: {
      variant: {
        h1: "text-4xl",
        h2: "text-3xl",
        h3: "text-2xl",
        paragraph: "text-base",
      },
    },
    defaultVariants: {
      variant: "paragraph",
    },
  }
);

export interface BlockProps
  extends Omit<React.ComponentProps<"input">, "children">,
    VariantProps<typeof blockVariants> {
  itemkey: number;
}

export default function Block({
  className,
  variant,
  itemkey,
  ...props
}: BlockProps) {
  const [show, setShow] = useState<boolean>(false);
  const [filterOpts, setFilterOpts] = useState<string>("");
  const [takeInput, setTakeInput] = useState<boolean>(false);

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
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
    },
    [setFilterOpts, setTakeInput, takeInput]
  );

  return (
    <>
      <div className="w-full max-w-5xl flex mt-2 items-center">
        <ShowIconsLeft itemkey={itemkey} show={show} />
        <input
          placeholder="Click here to add text"
          className={cn(
            blockVariants({
              variant,
              className,
            })
          )}
          onChange={handleInputChange}
          spellCheck
          {...props}
          onFocus={() => setShow(true)}
          onBlur={() => setShow(false)}
        ></input>
        <ShowIconsRight itemkey={itemkey} show={show} />
      </div>
      {filterOpts && (
        <BlockDropdown
          className="mx-14 border border-gray-600 rounded-md mt-1 shadow-black"
          filterKey={filterOpts}
        />
      )}
    </>
  );
}

type SettingsProps = {
  show: boolean;
  itemkey: number;
};

function ShowIconsLeft({ itemkey, show }: SettingsProps) {
  if (itemkey === 0 || !show) return <p className="mx-7" />;
  return (
    <div className="flex items-center">
      <Plus size={20} className="mr-2" />
      <GripVertical size={20} className="mr-2" />
    </div>
  );
}

function ShowIconsRight({ itemkey, show }: SettingsProps) {
  if (itemkey === 0 || !show) return <span className="mx-4" />;
  return <Wrench className="ml-[0.6rem]" />;
}
