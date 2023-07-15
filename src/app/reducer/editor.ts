import { AttributeType, MappingKey } from "@/components/Tags";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type nodeType = {
  id: string;
  position: number;
} & (
  | { type: contentKey; content: string; autofocus?: boolean }
  | {
      type: multiContent;
      value: string[];
    }
);
export type typeUnion = nodeType["type"];

export type BlockType = {
  position: number;
  type: MappingKey;
  attribute: AttributeType<MappingKey>;
};
export interface EditorState {
  // blocks: nodeType[];
  blocks: BlockType[];
}

const initialState: EditorState = {
  blocks: [
    {
      type: "heading",
      position: 0,
      attribute: {
        variant: "h1",
        disableEditable: true,
        content: "Untitled",
      },
    },
    {
      position: 1,
      type: "heading",
      attribute: {
        variant: "paragraph",
        disableEditable: true,
        content: "Click here to add text",
      },
    },
    {
      position: 2,
      type: "paragraph",
      attribute: {
        children: ["This is my first paragraph"],
      },
    },
  ],
};

type contentKey = "h1" | "h2" | "h3" | "paragraph" | "image" | "video";
type multiContent = "list" | "table" | "bullet_list";

export const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    addNode(state, action: PayloadAction<BlockType>) {
      state.blocks.push(action.payload);
      state.blocks.sort((x, y) => x.position - y.position);
    },
    addKey(state, action: PayloadAction<nodeType>) {},
  },
});

export const { addKey, addNode } = editorSlice.actions;

export default editorSlice.reducer;
