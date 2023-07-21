"use client";

import { cn, uuid } from "@/lib/util";
import BlockDropdown from "./Dropdown";
import { useAppDispatch } from "@/app/hooks";
import { addNode } from "@/app/reducer/editor";
import { ShowIconsLeft, ShowIconsRight } from "./Tags/Icons";
import BlockMapping, { MappingKey, MappingType } from "./Tags";
import { ComponentPropsWithRef, useCallback, useState } from "react";

type EditableBlockProps = {
  id: string;
  type: MappingKey;
  attributes: Record<string, MappingType>;
  currentIndex: number;
} & ComponentPropsWithRef<"div">;

export default function EditableBlock({
  id,
  type,
  attributes,
  className,
  currentIndex,
  ...props
}: EditableBlockProps) {
  const dispatch = useAppDispatch();

  const [filterOpts, setFilterOpts] = useState<string>("");
  const [showIcons, setShowIcons] = useState<boolean>(false);
  const [takeInput, setTakeInput] = useState<boolean>(false);

  const handleChange = useCallback(
    (event: React.FormEvent<HTMLDivElement>) => {
      const value: string =
        // @ts-ignore: textContent is null for input tags
        event?.currentTarget?.textContent || event?.target?.value;
      if (!value) return;
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
    [takeInput]
  );

  const Component = BlockMapping[type]?.component || type;
  if (!Component) return null;
  return (
    <div className="flex w-full flex-col max-w-5xl mt-1 ">
      <div
        onInput={handleChange}
        className={cn("flex", className)}
        onMouseOver={() => setShowIcons(true)}
        onMouseOut={() => setShowIcons(false)}
      >
        <ShowIconsLeft show={showIcons && currentIndex !== 0} />
        <div className="w-full border border-gray-500 rounded-lg" {...props}>
          <Component
            id={id}
            type={type}
            {...attributes}
            className={cn(attributes.className, "outline-none")}
          />
        </div>
        <ShowIconsRight show={showIcons && currentIndex !== 0} />
      </div>
      {filterOpts && (
        <BlockDropdown
          className="relative z-1 mt-2 py-2 shadow-lg rounded-md"
          filterKey={filterOpts}
          onSelect={(type, attributes) => {
            dispatch(
              addNode({
                type,
                id: uuid(),
                attributes,
              })
            );
            setFilterOpts("");
          }}
        />
      )}
    </div>
  );
}
