// https://nextjs.org/docs/getting-started/react-essentials#context
"use client";

import { Provider } from "react-redux";
import { store } from "./store";

export default function GlobalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider store={store}>{children}</Provider>;
}
