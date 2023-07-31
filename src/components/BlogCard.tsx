import Link from "next/link";
import { ReactNode } from "react";
import { Blocks } from "@/types/block";
import { Check, MoveRight, X } from "lucide-react";
import { apiHost } from "@/lib/Constants";
import { UserState } from "@/app/reducer/users";

export default function BlogCard({
  data,
  user,
}: {
  data: Blocks;
  user: UserState;
}) {
  const href = `/blog/${data.slug}`;
  const pub =
    data.isPublished || user.role !== "normal" || data.author._id === user.id;
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
          {/* <p className="text-lg text-black">Posted By: {data.author.name}</p> */}
          <p className="text-gray-700 left-24 dark:text-gray-300">
            {data.views} views
          </p>
        </div>
        {!data.isPublished && user.role !== "normal" && (
          <div className="flex flex-row-reverse">
            <button
              className="text-red-500 mx-1"
              onClick={() => {
                fetch(apiHost + `/blog/delete?slug=${data.slug}`, {
                  method: "DELETE",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + user.token,
                  },
                });
              }}
            >
              <X />
            </button>
            <button
              className="text-green-400 mx-1"
              onClick={() => {
                fetch(apiHost + "/blog/publish/" + data.slug, {
                  method: "POST",
                  body: "{}",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + user.token,
                  },
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
