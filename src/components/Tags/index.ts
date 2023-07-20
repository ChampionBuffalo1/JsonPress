import List from "./List";
import Table from "./Table";
import Heading from "./Heading";
import React, { ComponentPropsWithRef, ComponentPropsWithoutRef } from "react";

export type MappingKey = keyof JSX.IntrinsicElements;

// Default mapping for the editor (along with default attributes)
const Mapping: Record<string, MappingType> = {
  list: {
    component: List,
  },
  table: {
    component: Table,
  },
  image: {
    component: "img",
  },
  paragraph: {
    component: Heading,
  },
  heading: {
    component: Heading,
  },
  video: {
    component: "video",
  },
};

export type MappingType = {
  type?: MappingKey;
  component?: React.ElementType;
  attributes?: Record<string, unknown>;
} & (
  | {
      type: "li";
      attributes: {
        value: string;
      } & ComponentPropsWithRef<"li">;
    }
  | {
      type: "ol" | "ul";
      attributes: {
        children: string[];
      } & ComponentPropsWithRef<"ol" | "ul">;
    }
  | {
      type: "image";
      attributes: ComponentPropsWithoutRef<"img">;
    }
  | {
      type: "video";
      attributes: ComponentPropsWithoutRef<"video">;
    }
  | {
      type: "heading" | "paragraph";
      attributes: {
        children: string[];
      } & ComponentPropsWithRef<typeof Heading>;
    }
  | {
      type: "list";
      attributes: ComponentPropsWithRef<typeof List>;
    }
  | {
      type: "table";
      attributes: ComponentPropsWithRef<typeof Table>;
    }
  | {
      // Do support unknown tags but no type hints for them
      attributes?: ComponentPropsWithRef<React.ElementType>;
    }
);

export default Mapping;
