"use client";

import Link from "next/link";
import Loading from "../loading";
import type { Blog } from "@/blog";
import { apiInstance } from "@/lib/util";
import { useAppSelector } from "../hooks";
import { useRouter } from "next/navigation";
import BlogCard from "@/components/BlogCard";
import { useEffect, useState } from "react";

export default function Unpublished() {
  const router = useRouter();
  const [isLoading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const id = useAppSelector((state) => state.user.id);
  const role = useAppSelector((state) => state.user.role);
  useEffect(() => {
    apiInstance
      .get("/blog/getUnpublished")
      .then((res) => {
        setLoading(false);
        setBlogs(res.data.blogs);
      })
      .catch((err) => {
        if (err.response.data === "Unauthorized") router.push("/login");
      });
  }, [router]);

  return (
    <div className="container mx-auto mt-10">
      <div className="flex flex-row-reverse ml-4 p-2">
        <Link href="/editor" prefetch={false}>
          <button className="border bg-green-600 rounded-md min-w-fit min-h-fit w-20 h-10 text-gray-100 text-lg border-slate-800">
            Create
          </button>
        </Link>
      </div>
      {isLoading && <Loading />}

      {blogs.length > 0 && (
        <div className="grid grid-cols-4 gap-4 lg:grid-cols-4 sm:grid-cols-2">
          {blogs.map((blog: Blog) => (
            <BlogCard key={blog._id} data={blog} id={id} role={role} />
          ))}
        </div>
      )}
      {blogs.length === 0 && !isLoading && (
        <div className="flex justify-center items-center pt-2 text-2xl text-slate-900">
          <h1>No blogs found</h1>
        </div>
      )}
    </div>
  );
}
