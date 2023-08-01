import Link from "next/link";
import { Blog } from "@/blog";
import { ReactNode } from "react";
import { apiInstance } from "@/lib/util";
import { Check, MoveRight, X } from "lucide-react";

export default function BlogCard({
  data,
  role,
  id,
}: {
  data: Blog;
  role: string;
  id: string;
}) {
  const href = data.isPublished
    ? `/blog/${data.slug}`
    : `/unpublished/${data.slug}`;
  const pub = data.isPublished || role !== "normal" || data.author._id === id;
  return (
    <div className="min-w-sm w-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      {data.coverImage && (
        <PublishedLink pub={pub} href={href}>
          <img
            loading="lazy"
            decoding="async"
            src={data.coverImage}
            className="rounded-t-lg"
            alt="Cover image for the blog"
          />
        </PublishedLink>
      )}
      {!data.isPublished && (
        <p className="text-red-500 text-xl flex flex-row-reverse mx-2 mt-2">
          NOT PUBLISHED
        </p>
      )}
      <div className="p-5">
        <PublishedLink pub={pub} href={href}>
          <h4 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {data.title}
          </h4>
        </PublishedLink>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 pb-2">
          {data.description || "No description"}
        </p>
        <div className="flex justify-between">
          {data.isPublished && (
            <Link
              href={href}
              prefetch={false}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Read more
              <MoveRight size={20} className="mx-1" />
            </Link>
          )}

          <p className="text-gray-700 left-24 dark:text-gray-300">
            {data.views} views
          </p>
        </div>
        <p className="text-lg mt-2 text-neutral-400">
          Posted By: {data.author.name}
        </p>
        {!data.isPublished && role !== "normal" && (
          <div className="flex flex-row-reverse">
            <button
              className="text-red-500 mx-1"
              onClick={() => {
                apiInstance
                  .delete(`/blog/delete?slug=${data.slug}`)
                  .catch((e) => {
                    console.error(e);
                  });
              }}
            >
              <X />
            </button>
            <button
              className="text-green-400 mx-1"
              onClick={() => {
                apiInstance.post("/blog/publish/" + data.slug).catch((e) => {
                  console.error(e);
                });
              }}
            >
              <Check />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function PublishedLink({
  pub,
  href,
  children,
}: {
  pub: boolean;
  href: string;
  children: ReactNode;
}) {
  return (
    <>
      {pub ? (
        <Link href={href} prefetch={false}>
          {children}
        </Link>
      ) : (
        <>{children}</>
      )}
    </>
  );
}
