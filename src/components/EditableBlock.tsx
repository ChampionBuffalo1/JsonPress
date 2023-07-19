"use client";

import { cn } from "@/lib/util";
import BlockDropdown from "./Dropdown";
import { ComponentPropsWithRef, useState } from "react";
import { ShowIconsLeft, ShowIconsRight } from "./Tags/Icons";
import BlockMapping, { MappingKey, MappingType } from "./Tags";
import { useAppDispatch } from "@/app/hooks";
import { addNode } from "@/app/reducer/editor";

type EditableBlockProps = {
  type: MappingKey;
  attributes: Record<string, MappingType>;
  currentIndex: number;
} & ComponentPropsWithRef<"div">;

function EditableBlock({
  type,
  attributes,
  className,
  currentIndex,
  ...props
}: EditableBlockProps) {
  const dispatch = useAppDispatch();
  const [showIcons, setShowIcons] = useState<boolean>(false);
  const [filterOpts, setFilterOpts] = useState<string>("");
  const [takeInput, setTakeInput] = useState<boolean>(false);

  const handleChange = (event: React.FormEvent<HTMLDivElement>) => {
    // @ts-ignore
    const value = event.target.textContent || event.target.value;
    if (!value) return;
    // console.log(value, filterOpts, takeInput);
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

  const Component = BlockMapping[type]?.component || type;
  if (!Component) return null;
  return (
    <div className="flex w-full flex-col max-w-5xl mt-1 ">
      <div
        {...props}
        className={cn("flex", className)}
        onInput={handleChange}
        onMouseOver={() => setShowIcons(true)}
        onMouseOut={() => setShowIcons(false)}
      >
        <ShowIconsLeft show={showIcons && currentIndex !== 0} />

        <div className="w-full border border-gray-500 rounded-lg">
          <Component
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

export default EditableBlock;
// export default forwardRef<HTMLDivElement, EditableBlockProps>(EditableBlock);
