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
  const changeRefs = useRef<string[]>(props.items || []);
  const liRefs = useRef<RefObject<HTMLLIElement>[]>([]);
  const [items, setItems] = useState<string[]>(props.items || []);

  useEffect(() => {
    const handleDispatch = () => {
      if (!id) return;
      dispatch(
        updateContent({
          id,
          type: "list",
          value: changeRefs.current,
        })
      );
    };
    window.addEventListener("dispatch", handleDispatch);
    return () => window.removeEventListener("dispatch", handleDispatch);
  }, [id, dispatch, changeRefs]);

  const handleListChange = useCallback(
    (event: KeyboardEvent<HTMLLIElement>, currentIndex: number) => {
      if (event.key === "Enter") {
        event.preventDefault();
        if (currentIndex === items.length - 1) {
          setItems((prevItem) => [...prevItem, ""]);
          changeRefs.current = [...changeRefs.current, ""];
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
        setItems((prevItems) => prevItems.filter((_, i) => i !== currentIndex));
        changeRefs.current = changeRefs.current.filter(
          (_, i) => i !== currentIndex
        );
        return liRefs.current[currentIndex - 1]?.current?.focus();
      }
    },
    [liRefs, items]
  );

  const ListComponent = type;

  return (
    <ListComponent className={cn(className, "w-full mx-8")} {...props}>
      {items.map((item: string, key: number) => {
        const ref = createRef<HTMLLIElement>();
        liRefs.current[key] = ref;
        return (
          <li
            ref={ref}
            key={key}
            contentEditable
            onInput={(e) => {
              console.log(e.currentTarget.textContent);
              changeRefs.current = changeRefs.current.map((item, i) =>
                i === key ? e.currentTarget.textContent || "" : item
              );
              console.log(changeRefs.current);
            }}
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
