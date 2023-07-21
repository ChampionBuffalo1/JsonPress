"use client";

import { useAppDispatch } from "@/app/hooks";
import { updateContent } from "@/app/reducer/editor";
import { useEffect, useState } from "react";

type MultiMediaProps = {
  id: string;
} & (
  | {
      type: "image";
      src?: string;
      alt?: string;
    }
  | {
      type: "video";
      src?: string;
      controls?: boolean;
      loop?: boolean;
    }
  | {
      type: "audio";
      src?: string;
    }
);

export default function MultiMedia({
  id,
  src,
  type,
}: // ...props
MultiMediaProps) {
  const dispatch = useAppDispatch();
  const [imageSrc, setImageSrc] = useState<string>(src || "");
  useEffect(() => {
    const handleDispatch = () => {
      dispatch(
        updateContent({
          id,
          type: "image",
          value: imageSrc,
        })
      );
    };
    window.addEventListener("dispatch", handleDispatch);
    return () => window.removeEventListener("dispatch", handleDispatch);
  }, [id, imageSrc, dispatch]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.addEventListener("loadend", (e) => {
        if (e.target?.result) {
          setImageSrc(e.target.result.toString());
        }
      });
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      {!imageSrc && (
        <input
          type="file"
          name={type}
          id={id}
          onChange={handleFileSelect}
          className="m-2"
        />
      )}
      {imageSrc && (
        <img
          src={imageSrc}
          alt="Uploaded"
          className="p-1 w-fit h-fit object-contain"
        />
      )}
    </div>
  );
}
