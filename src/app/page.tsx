"use client";

import useSWR from "swr";
import Link from "next/link";
import { useEffect } from "react";
import { useAppDispatch } from "./hooks";
import { apiHost } from "@/lib/Constants";
import { setUser } from "./reducer/users";
import BlogCard from "@/components/BlogCard";

export default function Home() {
  const dispatch = useAppDispatch();
  const { data, error, isLoading } = useSWR(apiHost + "/blog/getAll");
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) dispatch(setUser(JSON.parse(user)));
  }, [dispatch]);

  return (
    <div className="container mx-auto mt-10">
      <div className="flex flex-row-reverse ml-4 p-2">
        <Link href="/editor" prefetch={false}>
          <button className="border bg-green-800 rounded-md min-w-fit min-h-fit w-20 h-10 text-gray-300 text-lg">
            Create
          </button>
        </Link>
      </div>
      {isLoading && (
        <div className="flex justify-center items-center pt-2 text-2xl text-slate-900">
          <h1>Loading...</h1>
        </div>
      )}
      {error && (
        <div className="flex justify-center items-center pt-2 text-2xl text-slate-900">
          <h1>Error: {error}</h1>
        </div>
      )}
      {data && (
        <div className="grid grid-cols-4 gap-4 lg:grid-cols-4 sm:grid-cols-2">
          {data.blogs.map((blog: any) => (
            <BlogCard key={blog._id} data={blog} />
          ))}
        </div>
      )}
    </div>
  );
}
