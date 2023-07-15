import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducer/users";
import editorReducer from "./reducer/editor";

export const store = configureStore({
  reducer: {
    user: userReducer,
    editor: editorReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
