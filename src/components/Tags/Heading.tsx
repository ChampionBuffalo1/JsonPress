"use client";

import { cn } from "@/lib/util";
import { useAppDispatch } from "@/app/hooks";
import { createRef, useEffect, useState } from "react";
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
  value: defaultValue,
  variant,
  className,
  placeholder,
  ...props
}: BlockProps) {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState<string>(defaultValue || "");
  const [display, setDisplay] = useState<boolean>(!defaultValue);

  useEffect(() => {
    setValue(defaultValue || "");
  }, [defaultValue]);

  useEffect(() => {
    const handleDispatch = () => {
      if (!id || !value || display) return;
      dispatch(
        updateContent({
          id,
          type,
          value,
        })
      );
    };
    window.addEventListener("dispatch", handleDispatch);
    return () => window.removeEventListener("dispatch", handleDispatch);
  }, [id, value, type, display, dispatch]);

  return (
    <div
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
      spellCheck
      {...props}
      onInput={(e) => {
        setValue(e.currentTarget.textContent || "");
      }}
    >
      {display && <p className="text-gray-400">{placeholder}</p>}
      {defaultValue ? defaultValue : ""}
    </div>
  );
}
