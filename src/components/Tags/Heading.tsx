"use client";

import { cn, uuid } from "@/lib/util";
import BlockDropdown from "../Dropdown";
import { useAppDispatch } from "@/app/hooks";
import { addNode, nodeType } from "@/app/reducer/editor";
import { forwardRef, useCallback, useState } from "react";
import { cva, VariantProps } from "class-variance-authority";

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
  content?: string;
  itemkey: number;
}

export default forwardRef<HTMLInputElement, BlockProps>(function Block(
  { className, variant, itemkey, content, ...props },
  ref
) {
  const [filterOpts, setFilterOpts] = useState<string>("");
  const [takeInput, setTakeInput] = useState<boolean>(false);
  // const dispatch = useAppDispatch();

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
    [takeInput, setTakeInput, setFilterOpts]
  );

  return (
    <>
      <div>
        {/* Using input instead of div here because when doing ctrl + c it copies the children of the div */}
        <input
          ref={ref}
          placeholder={content}
          className={cn(
            blockVariants({
              variant,
              className,
            })
          )}
          onChange={itemkey !== 0 ? handleInputChange : undefined}
          spellCheck
          {...props}
        />
      </div>
      {filterOpts && (
        <BlockDropdown
          className="mx-14 border border-gray-600 rounded-md mt-1 shadow-black"
          filterKey={filterOpts}
          onPicked={(type) => {
            let obj = {} as nodeType;
            // if (type === "paragraph") {
            //   obj = {
            //     type,
            //     id: uuid(),
            //     position: 4,
            //     content: "",
            //   };
            // } else if (type === "list") {
            //   dispatch(
            //     addNode({
            //     })
            //   );
            // }
            // dispatch(addNode(obj));
            setFilterOpts("");
          }}
        />
      )}
    </>
  );
});
