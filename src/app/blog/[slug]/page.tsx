"use client";

import useSWR from "swr";
import Loading from "@/app/loading";
import Editor from "@/components/Editor";
import { apiHost } from "@/lib/Constants";
import { useAppDispatch } from "@/app/hooks";
import { setBlocks } from "@/app/reducer/editor";
import { useSearchParams } from "next/navigation";

export default function BlogPage({ params }: { params: { slug: string } }) {
  const dispatch = useAppDispatch();
  const publishQuery = useSearchParams().get("q");
  const query =
    "&status=" + (publishQuery === "unpublished" ? "unpublished" : "published");

  const { data, error, isLoading } = useSWR(
    apiHost + "/blog/slug?query=" + params.slug + query,
    {
      onSuccess: (data) => {
        if (data?.blog.content) dispatch(setBlocks(data.blog.content));
      },
      revalidateOnFocus: false,
    }
  );

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
