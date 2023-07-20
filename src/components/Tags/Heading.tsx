"use client";

import { cn } from "@/lib/util";
import { forwardRef, useState } from "react";
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
  extends React.ComponentProps<"div">,
    VariantProps<typeof blockVariants> {}

export default forwardRef<HTMLDivElement, BlockProps>(function Block(
  { className, variant, ...props },
  ref
) {
  const [display, setDisplay] = useState<boolean>(true);
  return (
    <div
      contentEditable
      ref={ref}
      className={cn(
        blockVariants({
          variant,
          className,
        })
      )}
      onFocus={() => {
        if (display) setDisplay(false);
      }}
      onBlur={(event) => setDisplay(event.target.textContent === "")}
      spellCheck
      {...props}
    >
      {display && <p className="text-gray-400">{props.placeholder}</p>}
    </div>
  );
});
