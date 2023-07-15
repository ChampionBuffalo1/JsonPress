"use client";

import { ComponentPropsWithRef, forwardRef } from "react";
import BlockMapping, { AttributeType, MappingKey, MappingType } from "./Tags";

interface EditableBlockProps extends ComponentPropsWithRef<"div"> {
  type: MappingKey;
  attribute: AttributeType<MappingKey>;
}

export default forwardRef<HTMLDivElement, EditableBlockProps>(
  function EditableBlock({ type, attribute, ...props }, ref) {
    const Component = BlockMapping[
      type
    ] as MappingType[typeof type]["component"];
    if (!Component) return null;
    return (
      <div
        ref={ref}
        contentEditable={!attribute.disableEditable || true}
        {...props}
      >
        {/* @ts-ignore - I cannot be bothered to fix the typing */}
        <Component {...attribute}>
          {attribute.children ? attribute.children : null}
        </Component>
      </div>
    );
  }
);
