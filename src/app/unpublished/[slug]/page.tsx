"use client";

import Loading from "@/app/loading";
import { apiInstance } from "@/lib/util";
import Editor from "@/components/Editor";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/app/hooks";
import { setBlocks } from "@/app/reducer/editor";

export default function UnpublishedBlogs({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    apiInstance
      .get("/blog/unpublished/slug?query=" + params.slug)
      .then((res) => {
        if (res.data.blogs.length === 0) router.push("/");
        dispatch(setBlocks(res.data.blogs.content));
        setLoading(false);
      })
      .catch((err) => {
        if (err.response.data === "Unauthorized") {
          router.push("/login");
        } else {
          setError(err.response.data);
        }
        console.log(err);
      });
  }, [dispatch, params.slug, router]);

  return (
    <div>
      {isLoading && <Loading />}
      {error && (
        <div>
          <h1>Error</h1>
          <p>{error}</p>
        </div>
      )}
      {!isLoading && <Editor slug={params.slug} />}
    </div>
  );
}
