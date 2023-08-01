"use client";

import Link from "next/link";
import EditableBlock from "./EditableBlock";
import { useAppSelector } from "@/app/hooks";

export default function Editor({ slug }: { slug?: string }) {
  const blocks = useAppSelector((state) => state.editor.blocks);

  return (
    <div className="mt-10 flex flex-col items-center justify-center pt-10">
      <div className="w-full max-w-5xl">
        {blocks.map((block, key) => (
          <div className="w-full max-w-5xl flex mt-2 items-center" key={key}>
            <EditableBlock
              id={block.id}
              // @ts-expect-error: I haven't fixed the typing yet
              type={block.type}
              currentIndex={key}
              attributes={block.attributes}
            />
          </div>
        ))}

        <Link
          href={slug ? `/saveBlog?slug=${slug}` : "/saveBlog"}
          prefetch={false}
          className="flex flex-row-reverse mt-2 mx-2"
        >
          <button className="w-14 text-xl p-2 rounded-md border border-neutral-500 bg-green-400 min-w-fit text-neutral-800">
            Save
          </button>
        </Link>
      </div>
    </div>
  );
}
