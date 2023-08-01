import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type FlattenObject<T extends Record<string, unknown>> = {
  [K in keyof T]: T[K] extends Record<string, unknown>
    ? { [P in keyof T[K]]: T[K][P] }
    : T[K];
};

type Role = "normal" | "admin" | "manager";

export interface UserState extends FlattenObject<Payload["user"]> {
  token: string;
}
type Payload = {
  token: string;
  user: {
    id: string;
    name: string;
    role: Role;
    socialMedia?: {
      website?: string;
      twitter?: string;
      facebook?: string;
      instagram?: string;
    };
  };
};

const initialState: UserState = {
  id: "",
  name: "",
  token: "",
  role: "normal",
  socialMedia: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<Payload>) {
      state.id = action.payload.user.id;
      state.token = action.payload.token;
      state.name = action.payload.user.name;
      state.role = action.payload.user.role;
      state.socialMedia = action.payload.user.socialMedia ?? {};
    },
    resetUser(state) {
      Object.assign(state, initialState);
    },
  },
});

export const { setUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
