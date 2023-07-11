import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  id: string;
  username: string;
}

const initialState: UserState = { id: "", username: "" };

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
      state.id = action.payload.id;
      state.username = action.payload.username;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
