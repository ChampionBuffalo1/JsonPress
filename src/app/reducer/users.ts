import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type Role = "normal" | "admin" | "manager";

export interface UserState {
  id: string;
  role: Role;
  name: string;
  token: string;
  socialMedia?: {
    website?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
  };
}

const initialState: UserState = {
  id: "",
  name: "",
  role: "normal",
  token: "",
  socialMedia: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.role = action.payload.role;
      state.token = action.payload.token;
      state.socialMedia = action.payload.socialMedia ?? {};
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
