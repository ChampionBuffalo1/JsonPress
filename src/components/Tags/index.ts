import List from "./List";
import Heading from "./Heading";
import { ComponentPropsWithRef } from "react";

export type MappingKey = keyof MappingType;

export type AttributeType<T extends MappingKey> =
  MappingType[T]["attributes"] & {
    children?: string[];
    variant?: string;
    disableEditable?: boolean;
  };

const Mapping = {
  list: List,
  image: "img",
  heading: Heading,
  paragraph: "p",
  video: "video",
};

type OptionalAttributes<T extends React.ElementType> =
  ComponentPropsWithRef<T> extends Record<string, unknown>
    ? { attributes: ComponentPropsWithRef<T> }
    : {};

export interface MappingType {
  list: {
    component: typeof List;
    attributes?: {};
  } & OptionalAttributes<typeof List>;

  heading: {
    component: typeof Heading;
    attributes: ComponentPropsWithRef<typeof Heading>;
  };

  paragraph: {
    component: "p";
    attributes: { children: React.ElementType[] } & OptionalAttributes<"p">;
  };

  image: {
    component: "img";
  } & OptionalAttributes<"img">;
  video: {
    component: "video";
  } & OptionalAttributes<"video">;

  // dropdown: {
  //   component: typeof BlockDropdown;
  // } & OptionalAttributes<typeof BlockDropdown>;
}

export default Mapping;
