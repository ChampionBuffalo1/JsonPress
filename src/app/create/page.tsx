"use client";

import { apiInstance } from "@/lib/util";
import { useForm } from "react-hook-form";
import { useAppSelector } from "../hooks";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface ICreateForm {
  name: string;
  email: string;
  password: string;
}

export default function CreateUser() {
  const router = useRouter();
  const user = useAppSelector((state) => state.user);
  const [submitting, setSubmitting] = useState(true);
  const [success, setSuccess] = useState<boolean>(false);
  const { register, handleSubmit } = useForm<ICreateForm>();
  const [error, setError] = useState<Record<string, string>>();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const role = JSON.parse(user).role;
      if (role === "normal" || role === "") router.push("/");
    }
    setSubmitting(false);
  }, [router, setSubmitting]);

  const onSubmit = async (data: ICreateForm) => {
    if (!user?.token) router.push("/login");
    setSubmitting(true);
    apiInstance
      .post("/user/create", JSON.stringify(data))
      .then(() => {
        // We can only get here if the server responded with 2xx status code
        setSuccess(true);
        setSubmitting(false);
      })
      .catch((err) => {
        setSubmitting(false);
        setError(err.response.data.message);
      });
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="min-w-fit w-1/3 p-8 border border-gray-300 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4">Create Account</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="name" className="block font-medium mb-1">
              Name
            </label>
            <input
              required
              minLength={3}
              maxLength={100}
              id="name"
              type="text"
              {...register("name", { required: true })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            />
            {error?.name && (
              <p className="text-red-600 text-sm mt-1">{error.name}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block font-medium mb-1">
              Email
            </label>
            <input
              required
              id="email"
              type="email"
              {...register("email", { required: true })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            />
            {error?.email && (
              <p className="text-red-600 text-sm mt-1">{error.email}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block font-medium mb-1">
              Password
            </label>
            <input
              required
              id="password"
              type="password"
              minLength={8}
              maxLength={100}
              {...register("password", { required: true })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            />
            {error?.password && (
              <span className="text-red-600">{error.password}</span>
            )}
          </div>
          {success && <span className="text-green-600">Account created!</span>}
          <button
            type="submit"
            disabled={submitting}
            onClick={() => setError({})}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 disabled:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
}
