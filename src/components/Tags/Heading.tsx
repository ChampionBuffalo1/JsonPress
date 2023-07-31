"use client";

import { cn } from "@/lib/util";
import { useAppDispatch } from "@/app/hooks";
import { useRef, useEffect, useState } from "react";
import { cva, VariantProps } from "class-variance-authority";
import { jsonType, updateContent } from "@/app/reducer/editor";

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
    VariantProps<typeof blockVariants> {
  value?: string;
  type: jsonType;
}

export default function Block({
  id,
  type,
  value,
  variant,
  className,
  placeholder,
  ...props
}: BlockProps) {
  const valueRef = useRef<string>();
  const dispatch = useAppDispatch();
  const [display, setDisplay] = useState<boolean>(true);

  useEffect(() => {
    valueRef.current = value;
  }, [value]);

  useEffect(() => {
    const handleDispatch = () => {
      if (!id || !valueRef) return;
      dispatch(
        updateContent({
          id,
          type,
          value: valueRef.current || "",
        })
      );
    };
    window.addEventListener("dispatch", handleDispatch);
    return () => window.removeEventListener("dispatch", handleDispatch);
  }, [id, type, dispatch]);

  return (
    <div
      spellCheck
      contentEditable
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
      {...props}
      onInput={(e) => {
        valueRef.current = e.currentTarget.textContent || "";
      }}
    >
      {display ? <p className="text-gray-400">{placeholder}</p> : value}
    </div>
  );
}
