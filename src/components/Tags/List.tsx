"use client";
import { cn } from "@/lib/util";
import React, { RefObject, createRef, useCallback, useState } from "react";

interface ListProps {
  type: "ol" | "ul";
  children: string[];
  className?: string;
}

export default function List({
  type,
  className,
  children,
  ...props
}: ListProps) {
  const liRefs: RefObject<HTMLLIElement>[] = [];
  const [currentIndex, setIndex] = useState(0);
  const handleListChange = useCallback(
    (event: React.KeyboardEvent<HTMLOListElement>) => {
      if (
        (currentIndex !== liRefs.length - 1 && event.key === "ArrowDown") ||
        (currentIndex !== 0 && event.key === "ArrowUp")
      ) {
        event.stopPropagation();
        const idx = currentIndex + (event.key === "ArrowDown" ? 1 : -1);
        if (liRefs[idx]?.current?.focus) setIndex(idx);
        liRefs[idx]?.current?.focus();
      }
    },
    [currentIndex, liRefs]
  );

  const ListComponent = type;

  return (
    <ListComponent
      contentEditable
      onKeyDown={handleListChange}
      className={cn(className, "w-full mx-8")}
      {...props}
    >
      {children.map((item: string, key: number) => {
        const ref = createRef<HTMLLIElement>();
        liRefs.push(ref);
        return (
          <li
            onClick={() => setIndex(key)}
            key={key}
            className={type === "ul" ? "list-disc" : "list-decimal"}
            ref={ref}
          >
            {item}
          </li>
        );
      })}
    </ListComponent>
  );
}
