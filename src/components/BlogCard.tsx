import { MoveRight } from "lucide-react";

type BlogCardProps = {
  data: {
    _id: string;
    slug: string;
    title: string;
    views: number;
    category: string;
    description: string;
    lastEditedAt: Date;
    coverImage: string;
    author: {
      _id: string;
      name: string;
      role: "normal" | "admin" | "manager";
      socialMedia?: {
        website?: string;
        twitter?: string;
        facebook?: string;
        instagram?: string;
      };
    };
  };
};

export default function BlogCard({ data }: BlogCardProps) {
  const href = `/blog/${data.slug}`;
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      {data.coverImage && (
        <a href={href}>
          <img
            loading="lazy"
            decoding="async"
            src={data.coverImage}
            className="rounded-t-lg"
            alt="Cover image for the blog"
          />
        </a>
      )}
      <div className="p-5">
        <a href={href}>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {data.title}
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 pb-2">
          {data.description || "No description"}
        </p>
        <div className="flex justify-between">
          <a
            href={href}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Read more
            <MoveRight size={20} className="mx-1" />
          </a>
          <p className="text-gray-700 left-24 dark:text-gray-300">
            {data.views} views
          </p>
        </div>
      </div>
    </div>
  );
}
