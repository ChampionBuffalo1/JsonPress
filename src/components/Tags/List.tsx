"use client";
import { cn } from "@/lib/util";
import React from "react";

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
  const liRefs = [];

  const handleListChange = (event: React.KeyboardEvent<HTMLOListElement>) => {
    event.stopPropagation();
  };

  const ListComponent = type;
  return (
    <ListComponent
      onKeyDown={handleListChange}
      {...props}
      className={cn(className, "w-full mx-2")}
    >
      {children.map((item: string, key: number) => (
        <li key={key} className={type === "ul" ? "list-disc" : "list-decimal"}>
          {item}
        </li>
      ))}
    </ListComponent>
  );
}
