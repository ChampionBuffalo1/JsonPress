"use client";

import { cn } from "@/lib/util";
import { jsonType } from "@/app/reducer/editor";

interface BlockDropdownProps {
  className: string;
  filterKey: string;
  onSelect: (type: jsonType, attr?: Record<string, unknown>) => void;
}

export default function BlockDropdown({
  className,
  filterKey,
  onSelect,
}: BlockDropdownProps) {
  const filteredOpts = blockOptions.filter(({ label }) =>
    label.toLowerCase().startsWith(filterKey)
  );
  return (
    <div
      className={cn(
        "w-full max-w-sm overflow-auto max-h-44 sm:max-h-64",
        className
      )}
    >
      <div className="mx-2">
        {filteredOpts.length === 0 ? (
          <div>No results</div>
        ) : (
          <>
            <div className="w-full text-sm ">Basic blocks</div>
            {filteredOpts.map((data, key) => (
              <div key={key} onClick={() => onSelect(data.type, data.defAttr)}>
                <BlockOption data={data} />
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

type Opts = {
  url: string;
  label: string;
  type: jsonType;
  defAttr?: Record<string, unknown>;
  description: string;
};

function BlockOption({ data }: { data: Opts }) {
  const { label, url, description } = data;
  return (
    <div className="flex items-center justify-center mt-2 cursor-pointer">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={url}
        alt="Logo"
        width={52}
        height={56}
        className="border border-gray-300 rounded-md"
        decoding="async"
        fetchPriority="low"
        loading="lazy"
      />
      <div className="mx-4 w-full h-16 flex flex-col items-start pt-2">
        <p className="text-base hover:bg-blend-darken">{label}</p>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
}
// Metadata
const blockOptions: Opts[] = [
  {
    type: "paragraph",
    label: "Text",
    description: "Plain Text",
    url: "https://www.notion.so/images/blocks/text/en-US.png",
    defAttr: {
      placeholder: "Paragraph",
    },
  },
  {
    type: "heading",
    label: "Heading 1",
    description: "Large Heading",
    url: "https://www.notion.so/images/blocks/header.57a7576a.png",
    defAttr: {
      placeholder: "Heading 1",
      variant: "h1",
    },
  },
  {
    type: "heading",
    label: "Heading 2",
    description: "Medium Heading",
    url: "https://www.notion.so/images/blocks/subheader.9aab4769.png",
    defAttr: {
      placeholder: "Heading 2",
      variant: "h2",
    },
  },
  {
    type: "heading",
    label: "Heading 3",
    description: "Small Heading",
    url: "https://www.notion.so/images/blocks/subsubheader.d0ed0bb3.png",
    defAttr: {
      placeholder: "Heading 3",
      variant: "h3",
    },
  },
  {
    type: "list",
    label: "List",
    description: "Bullet List",
    url: "https://www.notion.so/images/blocks/bulleted-list.0e87e917.png",
    defAttr: {},
  },
  {
    type: "table",
    label: "Table",
    description: "For tabular data",
    url: "https://www.notion.so/images/blocks/simple-table.e31a23bb.png",
    defAttr: {},
  },
  {
    type: "image",
    label: "Image",
    description: "Image",
    url: "https://www.notion.so/images/blocks/image.0e0b2e3a.png",
    defAttr: {
      src: "https://www.notion.so/images/blocks/image.0e0b2e3a.png",
      alt: "Image Logo",
    },
  },
  {
    type: "video",
    label: "Video",
    description: "Video",
    url: "https://www.notion.so/images/blocks/video.0e0b2e3a.png",
  },
];
