"use client";
import { cn } from "@/lib/util";
import React, {
  useRef,
  useState,
  RefObject,
  createRef,
  useCallback,
} from "react";

interface ListProps {
  items: string[];
  type: "ol" | "ul";
  className?: string;
}

export default function List({ type, className, items, ...props }: ListProps) {
  const liRefs = useRef<RefObject<HTMLLIElement>[]>([]);
  const [children, setChildren] = useState<string[]>(items || []);

  const handleListChange = useCallback(
    (event: React.KeyboardEvent<HTMLLIElement>, currentIndex: number) => {
      if (event.key === "Enter") {
        event.preventDefault();
        if (currentIndex === children.length - 1) {
          setChildren((prevChild) => [...prevChild, ""]);
          liRefs.current[currentIndex + 1]?.current?.focus();
          return;
        }
        liRefs.current[currentIndex + 1]?.current?.focus();
      }

      if (
        (event.key === "ArrowDown" && currentIndex !== children.length - 1) ||
        (event.key === "ArrowUp" && currentIndex !== 0)
      ) {
        event.stopPropagation();
        const idx = currentIndex + (event.key === "ArrowDown" ? 1 : -1);
        liRefs.current[idx]?.current?.focus();
      }

      if (
        currentIndex !== 0 &&
        event.key === "Backspace" &&
        !event.currentTarget.textContent
      ) {
        setChildren((prevChilds) =>
          prevChilds.filter((_, i) => i !== currentIndex)
        );
        liRefs.current[currentIndex - 1]?.current?.focus();
      }
    },
    [liRefs, children]
  );

  const ListComponent = type;

  return (
    <ListComponent className={cn(className, "w-full mx-8")} {...props}>
      {children.map((item: string, key: number) => {
        const ref = createRef<HTMLLIElement>();
        liRefs.current[key] = ref;
        return (
          <li
            ref={ref}
            key={key}
            contentEditable
            onKeyDown={(e) => handleListChange(e, key)}
            className={cn(
              "outline-none list-decimal",
              type === "ul" && "list-disc"
            )}
          >
            {item}
          </li>
        );
      })}
    </ListComponent>
  );
}
