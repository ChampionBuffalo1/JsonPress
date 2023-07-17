"use client";

import BlockMapping, { MappingKey } from "./Tags";
import { ComponentPropsWithRef, ForwardedRef, forwardRef } from "react";

type EditableBlockProps = {
  type: MappingKey;
  attributes: Record<string, unknown>;
} & ComponentPropsWithRef<"div">;

function EditableBlock(
  { type, attributes, ...props }: EditableBlockProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  const Component = BlockMapping[type]?.component || type;
  if (!Component) return null;

  if (attributes?.children) {
    return (
      <>
        <div {...props} ref={ref}>
          {/* @ts-expect-error: Need to figure out a way to get rid of heading and paragraph without breaking types */}
          <Component {...attributes}>
            {/* @ts-expect-error */}
            {attributes.children.map((block, key) => {
              if (typeof block === "string") return block;

              return (
                <EditableBlock
                  type={block.type}
                  attributes={block.attributes}
                  key={key}
                  //
                />
              );
            })}
            {attributes.content && attributes.content}
          </Component>
        </div>
      </>
    );
  }
  return (
    <>
      <div {...props} ref={ref}>
        {/* @ts-expect-error: Need to figure out a way to get rid of heading and paragraph without breaking types */}
        <Component {...attributes} />
        {attributes.content && attributes.content}
      </div>
    </>
  );
}

export default forwardRef<HTMLDivElement, EditableBlockProps>(EditableBlock);
