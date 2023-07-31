"use client";

import useSWR from "swr";
import { useEffect } from "react";
import Loading from "@/app/loading";
import Editor from "@/components/Editor";
import { apiHost } from "@/lib/Constants";
import { useAppDispatch } from "@/app/hooks";
import { setBlocks } from "@/app/reducer/editor";

export default function BlogPage({ params }: { params: { slug: string } }) {
  const dispatch = useAppDispatch();

  const { data, error, isLoading } = useSWR(
    apiHost + "/blog/slug?query=" + params.slug,
    {
      revalidateOnMount: false,
      revalidateOnFocus: false,
    }
  );
  useEffect(() => {
    if (data?.content) dispatch(setBlocks(data.content));
  }, [dispatch, data]);

  return (
    <div>
      {isLoading && <Loading />}
      {error && (
        <div>
          <h1>Error</h1>
          <p>{error}</p>
        </div>
      )}
      {data && <Editor slug={params.slug} />}
    </div>
  );
}
