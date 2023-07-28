"use client";

import { useForm } from "react-hook-form";
import { apiHost } from "@/lib/Constants";
import { useAppSelector } from "../hooks";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ICreateForm {
  name: string;
  email: string;
  password: string;
}

export default function CreateUser() {
  const navigate = useRouter();
  const user = useAppSelector((state) => state.user);
  const [submitting, setSubmitting] = useState(true);
  const { register, handleSubmit } = useForm<ICreateForm>();
  const [error, setError] = useState<Record<string, string>>();
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const role = JSON.parse(user).role;
      if (role === "normal" || role === "") navigate.push("/");
    }
    setSubmitting(false);
  }, [navigate, setSubmitting]);

  const onSubmit = async (data: ICreateForm) => {
    if (!user?.token) navigate.push("/login");
    setSubmitting(true);
    const res = await fetch(apiHost + "/user/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    setSubmitting(false);
    if (!res.ok) {
      setError(json.message);
      return;
    }
    if (json.user) setSuccess(true);
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
