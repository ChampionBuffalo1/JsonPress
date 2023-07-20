"use client";
import { cn } from "@/lib/util";
import { useAppDispatch } from "@/app/hooks";
import { updateContent } from "@/app/reducer/editor";
import {
  useRef,
  useState,
  useEffect,
  RefObject,
  createRef,
  FormEvent,
  useCallback,
  KeyboardEvent,
} from "react";

interface ListProps {
  id: string;
  items: string[];
  type: "ol" | "ul";
  className?: string;
}

export default function List({ id, type, className, ...props }: ListProps) {
  const dispatch = useAppDispatch();
  const liRefs = useRef<RefObject<HTMLLIElement>[]>([]);
  const [items, setItem] = useState<string[]>(props.items || []);

  useEffect(() => {
    const handleDispatch = () => {
      if (!id) return;
      dispatch(
        updateContent({
          id,
          type: "list",
          value: items,
        })
      );
    };
    window.addEventListener("dispatch", handleDispatch);
    return () => window.removeEventListener("dispatch", handleDispatch);
  }, [id, items, dispatch]);

  const handleListChange = useCallback(
    (event: KeyboardEvent<HTMLLIElement>, currentIndex: number) => {
      if (event.key === "Enter") {
        event.preventDefault();
        if (currentIndex === items.length - 1) {
          setItem((prevItem) => [...prevItem, ""]);
          liRefs.current[currentIndex + 1]?.current?.focus();
          return;
        }
        return liRefs.current[currentIndex + 1]?.current?.focus();
      }

      if (
        (event.key === "ArrowDown" && currentIndex !== items.length - 1) ||
        (event.key === "ArrowUp" && currentIndex !== 0)
      ) {
        event.stopPropagation();
        const idx = currentIndex + (event.key === "ArrowDown" ? 1 : -1);
        return liRefs.current[idx]?.current?.focus();
      }

      if (
        currentIndex !== 0 &&
        event.key === "Backspace" &&
        !event.currentTarget.textContent
      ) {
        setItem((prevItems) => prevItems.filter((_, i) => i !== currentIndex));
        return liRefs.current[currentIndex - 1]?.current?.focus();
      }
      // BUG: Doesn't save the last entered char.
      // Using onInput breaks because li is contentEditable so the pointer is always re-focused
      const newItems = items.map((item, i) =>
        i === currentIndex ? event.currentTarget.textContent || "" : item
      );
      setItem(newItems);
    },
    [liRefs, items]
  );

  const ListComponent = type;

  return (
    <ListComponent
      className={cn(className, "w-full mx-8")}
      {...props}
      onInput={(e) => e.stopPropagation()}
    >
      {items.map((item: string, key: number) => {
        const ref = createRef<HTMLLIElement>();
        liRefs.current[key] = ref;
        return (
          <li
            ref={ref}
            key={key}
            contentEditable
            onKeyDownCapture={(e) => handleListChange(e, key)}
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
