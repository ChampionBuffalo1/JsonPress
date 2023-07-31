"use client";

import { apiHost } from "@/lib/Constants";
import { useAppSelector } from "@/app/hooks";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, FormEvent, useCallback, useState } from "react";

const categoryOptions = ["Opts1", "Opts2"];

export default function MetadataForm() {
  const navigator = useRouter();
  const slug = useSearchParams().get("slug");
  const user = useAppSelector((state) => state.user);
  const [error, setError] = useState<Record<string, string>>();
  const blocks = useAppSelector((state) => state.editor.blocks);

  const [formData, setFormData] = useState<Record<AllowedKeys, string>>({
    slug: slug || "",
    title: blocks[0].attributes?.content || "",
    category: "",
    coverImage: "",
    description: "",
  });

  const createPost = useCallback(async () => {
    if (!user.token) {
      navigator.push("/login");
      return;
    }
    console.log("createPost", formData, blocks, user.token);
    const response = await fetch(apiHost + "/blog/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + user.token,
      },
      body: JSON.stringify({
        ...formData,
        content: blocks,
      }),
    });
    const data = await response.json();
    if (response.ok) {
      navigator.push("/blog/" + data.blog.slug);
    } else {
      setError(data.message);
    }
  }, [user, blocks, setError, navigator]);

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

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event?.preventDefault();
      window.dispatchEvent(new Event("dispatch"));
      setTimeout(createPost, 500);
    },
    [createPost]
  );

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-md shadow-md">
      <form onSubmit={handleSubmit}>
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
            {categoryOptions.map((option) => (
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
