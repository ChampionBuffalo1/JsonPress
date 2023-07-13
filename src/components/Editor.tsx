import Block from "./editorUI/Block";
// import { useRef } from "react";
const blocks = Array(3).fill(0);

export default function Editor() {
  // const divRefs = useRef<HTMLDivElement[]>([]);

  // const handleKeyDown = useCallback(
  //   (event: React.KeyboardEvent<HTMLDivElement>, index: number) => {
  //     // event.preventDefault();
  //     if (event.key === "Enter") {
  //     }
  //   },
  //   []
  // );

  return (
    <div className="mt-10 flex flex-col items-center justify-center pt-10">
      <div className="w-full max-w-5xl">
        {blocks.map((_, key) => (
          <div key={key} className="mt-2">
            <Block
              className="border border-dashed border-black"
              variant={key === 0 ? "h1" : "paragraph"}
              itemkey={key}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
