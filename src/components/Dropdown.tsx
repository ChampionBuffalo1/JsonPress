import { cn } from "@/lib/util";

interface BlockDropdownProps {
  className: string;
  filterKey: string;
}

export default function BlockDropdown({
  className,
  filterKey,
}: BlockDropdownProps) {
  const filteredOpts = blockOptions.filter(([key]) =>
    key.toLowerCase().startsWith(filterKey)
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
            {filteredOpts.length > 0 &&
              filteredOpts.map((data, key) => (
                <BlockOption key={key} data={data} />
              ))}
          </>
        )}
      </div>
    </div>
  );
}

function BlockOption({ data }: { data: string[] }) {
  const [name, desc, url] = data;
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
        <p className="text-base hover:bg-blend-darken">{name}</p>
        <p className="text-sm text-gray-600">{desc}</p>
      </div>
    </div>
  );
}
// Metadata
const blockOptions: Array<[string, string, string]> = [
  ["Text", "Plain Text", "https://www.notion.so/images/blocks/text/en-US.png"],
  [
    "Heading 1",
    "Large Heading",
    "https://www.notion.so/images/blocks/header.57a7576a.png",
  ],
  [
    "Heading 2",
    "Medium Heading",
    "https://www.notion.so/images/blocks/subheader.9aab4769.png",
  ],
  [
    "Heading 3",
    "Small Heading",
    "https://www.notion.so/images/blocks/subsubheader.d0ed0bb3.png  ",
  ],
  [
    "Table",
    "For tabular data",
    "https://www.notion.so/images/blocks/simple-table.e31a23bb.png",
  ],
  [
    "List",
    "Creates a simple bullet list",
    "https://www.notion.so/images/blocks/bulleted-list.0e87e917.png",
  ],
  ["Image", "Image", ""],
  ["Video", "Video", ""],
];
