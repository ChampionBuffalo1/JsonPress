"use client";

import { cn } from "@/lib/util";
import { forwardRef, useState } from "react";
import { cva, VariantProps } from "class-variance-authority";
import { GripVertical, Plus, Wrench } from "lucide-react";

const blockVariants = cva(
  "w-full h-fit rounded-lg mt-1 p-2 outline-none break-words whitespace-pre-wrap",
  {
    variants: {
      variant: {
        h1: "text-5xl",
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
  extends Omit<React.ComponentProps<"div">, "children">,
    VariantProps<typeof blockVariants> {
  itemKey: number;
}

export default function Block(props: BlockProps) {
  const { className, variant, itemKey } = props;
  const [show, setShow] = useState<boolean>(false);

  return (
    <div className="w-full max-w-5xl flex mt-2 items-center">
      <ShowIconsLeft itemKey={itemKey} show={show} />
      <div
        contentEditable
        className={cn(
          blockVariants({
            variant,
            className,
          })
        )}
        spellCheck
        {...props}
        onFocus={() => setShow(true)}
        onBlur={() => setShow(false)}
      />
      <ShowIconsRight itemKey={itemKey} show={show} />
    </div>
  );
}

type SettingsProps = {
  show: boolean;
  itemKey: number;
};

function ShowIconsLeft({ itemKey, show }: SettingsProps) {
  if (itemKey === 0 || !show) return <p className="mx-7" />;
  return (
    <div className="flex items-center">
      <Plus size={20} className="mr-2" />
      <GripVertical size={20} className="mr-2" />
    </div>
  );
}

function ShowIconsRight({ itemKey, show }: SettingsProps) {
  if (itemKey === 0 || !show) return <span className="mx-4" />;
  return <Wrench className="ml-[0.6rem]" />;
}
