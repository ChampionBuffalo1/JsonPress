// https://nextjs.org/docs/getting-started/react-essentials#context
"use client";

import { store } from "./store";
import { SWRConfig } from "swr";
import { Provider } from "react-redux";

const swrOptions = {
  fetcher: (resource: string, init: RequestInit) =>
    fetch(resource, init).then((res) => res.json()),
};

export default function GlobalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <SWRConfig value={swrOptions}>{children}</SWRConfig>
    </Provider>
  );
}
