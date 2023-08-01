"use client";

import useSWR from "swr";
import Link from "next/link";
import Loading from "./loading";
import { useEffect } from "react";
import { Blog } from "@/blog";
import { apiHost } from "@/lib/Constants";
import { setUser } from "./reducer/users";
import BlogCard from "@/components/BlogCard";
import { resetBlock } from "./reducer/editor";
import { useAppDispatch, useAppSelector } from "./hooks";

export default function Home() {
  const dispatch = useAppDispatch();
  const id = useAppSelector((state) => state.user.id);
  const role = useAppSelector((state) => state.user.role);
  const { data, error, isLoading } = useSWR(apiHost + "/blog/getAll");

  useEffect(() => {
    const storageUser = localStorage.getItem("user");
    if (storageUser) dispatch(setUser(JSON.parse(storageUser)));
  }, [dispatch]);

  return (
    <div className="container mx-auto mt-10">
      <div className="flex flex-row-reverse ml-4 p-2">
        <Link href="/editor" prefetch={false}>
          <button
            disabled={!id}
            className="border bg-green-500 rounded-md min-w-fit min-h-fit w-20 h-10 text-gray-100 text-lg border-neutral-300
            hover:bg-green-600 hover:border-green-600 hover:text-gray disabled:bg-neutral-700 disabled:cursor-not-allowed"
            onClick={() => dispatch(resetBlock())}
          >
            Create
          </button>
        </Link>
      </div>
      {isLoading && <Loading />}
      {error && (
        <div className="flex justify-center items-center pt-2 text-2xl text-slate-900">
          <h1>Error: {error}</h1>
        </div>
      )}
      {data?.blogs.length > 0 && (
        <div className="grid grid-cols-4 gap-4 lg:grid-cols-4 sm:grid-cols-2">
          {data.blogs.map((blog: Blog) => (
            <BlogCard key={blog._id} data={blog} role={role} id={id} />
          ))}
        </div>
      )}
      {data?.blogs.length === 0 && (
        <div className="flex justify-center items-center pt-2 text-2xl text-slate-900">
          <h1>No blogs found</h1>
        </div>
      )}
    </div>
  );
}
