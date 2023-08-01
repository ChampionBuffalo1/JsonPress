"use client";
import useSWR from "swr";
import { apiHost } from "@/lib/Constants";
import { apiInstance } from "@/lib/util";
import { useAppSelector } from "@/app/hooks";
import { useRouter, useSearchParams } from "next/navigation";
import {
  useState,
  useEffect,
  FormEvent,
  useCallback,
  ChangeEvent,
} from "react";

export default function MetadataForm() {
  const navigator = useRouter();
  const slug = useSearchParams().get("slug");
  const { data: categoryOptions } = useSWR(apiHost + "/blog/getAllCategory", {
    revalidateOnReconnect: false,
  });
  const user = useAppSelector((state) => state.user);
  const [error, setError] = useState<Record<string, string>>();
  const blocks = useAppSelector((state) => state.editor.blocks);

  useEffect(() => {
    window.dispatchEvent(new Event("dispatch"));
  }, []);

  const [formData, setFormData] = useState<Record<AllowedKeys, string>>({
    slug: slug || "",
    title: blocks[0].attributes?.content || "",
    category: "",
    coverImage: "",
    description: "",
  });

  const createPost = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!user.token) {
        navigator.push("/login");
        return;
      }
      apiInstance
        .post(
          "/blog/create",
          JSON.stringify({
            ...formData,
            content: blocks,
          })
        )
        .then(({ data }) => {
          navigator.push("/blog/" + data.blog.slug + "?q=unpublished");
        })
        .catch((err) => {
          setError(err.response.data.message);
        });
    },
    [formData, user, blocks, setError, navigator]
  );

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.addEventListener("loadend", (e) => {
        if (e.target?.result) {
          setFormData((prevFormData) => ({
            ...prevFormData,
            coverImage: e.target?.result?.toString() || "",
          }));
        }
      });
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "title") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        title: value,
        slug: value.toLowerCase().replace(/ /g, "-"),
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]:
          name === "slug" ? value.toLowerCase().replace(/ /g, "-") : value,
      }));
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-md shadow-md">
      <form onSubmit={createPost}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-medium">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            placeholder="Enter title"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="slug" className="block text-gray-700 font-medium">
            Slug
          </label>
          <input
            type="text"
            id="slug"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            placeholder="Enter slug"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block text-gray-700 font-medium">
            Category
          </label>
          <input
            autoComplete="off"
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            list="categoryOptions"
            required
          />
          <datalist id="categoryOptions">
            {categoryOptions?.categories.map((option: string) => (
              <option key={option} value={option} />
            ))}
          </datalist>
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 font-medium"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            placeholder="Enter description"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 font-medium"
          >
            Cover Image
          </label>
          <input type="file" name="coverImage" onChange={handleFileSelect} />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Confirm
        </button>
      </form>
    </div>
  );
}

type AllowedKeys = "slug" | "title" | "category" | "coverImage" | "description";
