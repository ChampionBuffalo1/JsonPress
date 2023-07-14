"use client";

import Block from "./editorUI/Block";
import { useCallback, useRef } from "react";

const blocks = Array(3).fill(0);

export default function Editor() {
  const ipRefs = useRef<(HTMLInputElement | null)[]>(Array(blocks.length));

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>, index: number) => {
      let idx: number | undefined;
      if (event.key === "Enter" || event.key === "ArrowDown")
        idx = Math.min(index + 1, ipRefs.current.length - 1);
      if (event.key === "ArrowUp") idx = Math.max(index - 1, 0);
      if (idx !== undefined) ipRefs.current[idx]?.focus();
    },
    []
  );

  return (
    <div className="mt-10 flex flex-col items-center justify-center pt-10">
      <div className="w-full max-w-5xl">
        {blocks.map((_, key) => (
          <div key={key} className="mt-2">
            <Block
              className="border border-dashed border-black"
              variant={key === 0 ? "h1" : "paragraph"}
              itemkey={key}
              onKeyDown={(e) => handleKeyDown(e, key)}
              ref={(el) => (ipRefs.current[key] = el)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
