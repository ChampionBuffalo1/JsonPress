import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { MappingKey, MappingType } from "@/components/Tags";

export type jsonType =
  | "heading"
  | "paragraph"
  | "image"
  | "video"
  | "list"
  | MappingKey;

export type Blocks = {
  position: number;
  type: jsonType;
} & Omit<MappingType, "type">;

export interface EditorState {
  blocks: Blocks[];
}

const initialState: EditorState = {
  blocks: [
    {
      type: "heading",
      position: 0,
      attributes: {
        variant: "h1",
        placeholder: "Untitled",
        children: "Okay then",
        contentEditable: true,
      },
    },
    {
      position: 1,
      type: "heading",
      attributes: {
        defaultValue: "string1",
        variant: "paragraph",
        placeholder: "Click here to add text",
        contentEditable: true,
        children: "Okay then",
      },
    },
    {
      position: 2,
      type: "paragraph",
      attributes: {
        // children: "Okay paaji",
        // contentEditable: true,
        placeholder: "Click here to add text",
      },
    },
    {
      position: 3,
      type: "list",
      attributes: {
        type: "ol",
        contentEditable: true,
        children: ["string1", "string2"],
      },
    },
  ],
};

export const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    addNode(state, action: PayloadAction<Blocks>) {
      state.blocks.push(action.payload);
      state.blocks.sort((x, y) => x.position - y.position);
    },
    addHeading(
      state,
      action: PayloadAction<{
        value?: string;
        position?: number;
        variant: "h1" | "h2" | "h3";
        placeholder: string;
      }>
    ) {
      state.blocks.push({
        type: "heading",
        position: action.payload.position ?? state.blocks.length,
        attributes: {
          variant: action.payload.variant,
          placeholder: action.payload.placeholder,
          defaultValue: action.payload.value,
        },
      });
      state.blocks.sort((x, y) => x.position - y.position);
    },
    addList(
      state,
      action: PayloadAction<{
        type: "ol" | "ul";
        items: string[];
        position?: number;
      }>
    ) {
      state.blocks.push({
        type: action.payload.type,
        position: action.payload.position ?? state.blocks.length,
        attributes: {
          contentEditable: true,
          children: action.payload.items.map((item) => ({
            type: "li",
            attributes: {
              children: [item],
            },
          })),
        },
      });
      state.blocks.sort((x, y) => x.position - y.position);
    },
    addParagraph(
      state,
      action: PayloadAction<{
        position?: number;
        placeholder: string;
        value?: string;
      }>
    ) {},
    addMultiMedia(state, action: PayloadAction<unknown>) {},
    addTable(state, action: PayloadAction<unknown>) {},
  },
});

export const { addNode, addHeading, addParagraph, addMultiMedia, addTable } =
  editorSlice.actions;

export default editorSlice.reducer;
