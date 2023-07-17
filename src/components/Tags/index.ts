import Heading from "./Heading";
import React, { ComponentPropsWithRef, ComponentPropsWithoutRef } from "react";

export type MappingKey = keyof JSX.IntrinsicElements | "heading" | "paragraph";

// Default mapping for the editor (along with default attributes)
const Mapping: Record<string, MappingType> = {
  image: {
    component: "img",
    attributes: {},
  },
  paragraph: {
    component: "p",
    attributes: {},
  },
  heading: {
    component: Heading,
    attributes: {},
  },
  video: {
    component: "video",
    attributes: {},
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
      // Do support unknown tags but no type hints for them
      attributes?: ComponentPropsWithRef<React.ElementType>;
    }
);

export default Mapping;
