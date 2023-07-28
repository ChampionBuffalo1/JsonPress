import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { MappingKey, MappingType } from "@/components/Tags";

export type jsonType =
  | "list"
  | "image"
  | "video"
  | "table"
  | "heading"
  | "paragraph"
  | MappingKey;

type updateType = {
  id: string;
} & (
  | {
      type: "list";
      value: string[];
    }
  | {
      type: "table";
      value: string[][];
    }
  | {
      type: jsonType;
      value: string;
    }
);

export type Blocks = {
  id: string;
  type: jsonType;
  position: number;
} & Omit<MappingType, "type">;

export interface EditorState {
  blocks: Blocks[];
}

const initialState: EditorState = {
  blocks: [
    {
      id: "73f6e5b0",
      type: "heading",
      position: 0,
      attributes: {
        variant: "h1",
        placeholder: "Untitled",
      },
    },
    {
      id: "e3868454",
      position: 1,
      type: "heading",
      attributes: {
        variant: "paragraph",
        placeholder: "Click here to add text",
      },
    },
    {
      id: "0e5450f7",
      position: 2,
      type: "paragraph",
      attributes: {
        placeholder: "Click here to add text",
      },
    },
  ],
};

export const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    setBlocks(state, action: PayloadAction<Blocks[]>) {
      state.blocks = action.payload;
    },
    addNode(
      state,
      action: PayloadAction<
        {
          position?: number;
        } & Omit<Blocks, "position">
      >
    ) {
      state.blocks.push({
        id: action.payload.id,
        type: action.payload.type,
        attributes: action.payload.attributes,
        position: action.payload.position ?? state.blocks.length,
      });
      if (action.payload.position)
        state.blocks.sort((x, y) => x.position - y.position);
    },
    addHeading(
      state,
      action: PayloadAction<{
        id: string;
        value?: string;
        position?: number;
        variant: "h1" | "h2" | "h3";
        placeholder: string;
      }>
    ) {
      addNode({
        type: "heading",
        id: action.payload.id,
        attributes: {
          variant: action.payload.variant,
          placeholder: action.payload.placeholder,
          defaultValue: action.payload.value,
        },
        position: action.payload.position,
      });
    },
    addList(
      state,
      action: PayloadAction<{
        id: string;
        type: "ol" | "ul";
        items: string[];
        position?: number;
      }>
    ) {
      state.blocks.push({
        id: action.payload.id,
        type: action.payload.type,
        position: action.payload.position ?? state.blocks.length,
        attributes: {
          children: action.payload.items.map((item) => ({
            type: "li",
            attributes: {
              children: [item],
            },
          })),
        },
      });
    },
    addParagraph(
      state,
      action: PayloadAction<{
        id: string;
        value?: string;
        position?: number;
        placeholder?: string;
      }>
    ) {
      state.blocks.push({
        type: "paragraph",
        id: action.payload.id,
        position: action.payload.position ?? state.blocks.length,
        attributes: {
          placeholder: action.payload.placeholder || "",
          defaultValue: action.payload.value || "",
        },
      });
      if (action.payload.position)
        state.blocks.sort((x, y) => x.position - y.position);
    },
    addTable(
      state,
      action: PayloadAction<{
        id: string;
        position?: number;
        rowCount: number;
        columnCount: number;
      }>
    ) {
      state.blocks.push({
        type: "table",
        id: action.payload.id,
        position: action.payload.position ?? state.blocks.length,
        attributes: {},
      });
      if (action.payload.position)
        state.blocks.sort((x, y) => x.position - y.position);
    },

    updateContent(state, action: PayloadAction<updateType>) {
      const index = state.blocks.findIndex(
        (block) => block.id === action.payload.id
      );
      if (index === -1) {
        addNode(action.payload);
        return;
      }
      if (action.payload.type === "list") {
        state.blocks[index].attributes.items = action.payload.value;
      } else if (action.payload.type === "table") {
        state.blocks[index].attributes.children = action.payload.value;
      } else if (action.payload.type === "image") {
        state.blocks[index].attributes.src = action.payload.value;
      } else {
        state.blocks[index].attributes.value = action.payload.value;
      }
    },
  },
});

export const {
  addNode,
  addTable,
  setBlocks,
  addHeading,
  addParagraph,
  updateContent,
} = editorSlice.actions;

export default editorSlice.reducer;
