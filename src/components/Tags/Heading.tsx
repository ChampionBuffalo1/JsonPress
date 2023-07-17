"use client";

import { cn } from "@/lib/util";
import { forwardRef } from "react";
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
  extends React.ComponentProps<"input">,
    VariantProps<typeof blockVariants> {}

export default forwardRef<HTMLInputElement, BlockProps>(function Block(
  { className, variant, ...props },
  ref
) {
  return (
    <>
      {/* Using input instead of div here because when doing ctrl + c it copies the children of the div */}
      <input
        ref={ref}
        className={cn(
          blockVariants({
            variant,
            className,
          })
        )}
        spellCheck
        {...props}
      />
    </>
  );
});
