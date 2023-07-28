"use client";

import { useForm } from "react-hook-form";
import { apiHost } from "@/lib/Constants";
import { useAppDispatch } from "../hooks";
import { setUser } from "../reducer/users";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ILogin {
  email: string;
  password: string;
}
const key = "user";
export default function LoginCard() {
  const navigate = useRouter();
  const dispatch = useAppDispatch();
  const [error, setError] = useState<Record<string, string>>();
  const { register, handleSubmit } = useForm<ILogin>();
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem(key);
    if (token) navigate.push("/");
  }, [navigate]);

  const onSubmit = async (formData: ILogin) => {
    setLoading(true);
    const res = await fetch(apiHost + "/user/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    setLoading(false);
    const data = await res.json();
    if (!res.ok) {
      setError(
        typeof data.message === "string"
          ? { email: data.message }
          : data.message
      );
      return;
    }
    dispatch(setUser(data));
    localStorage.setItem(key, JSON.stringify(data));
    navigate.push("/");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block mb-2 font-semibold" htmlFor="email">
              Email
            </label>
            <input
              required
              type="email"
              className="w-full p-2 border border-gray-300 rounded-md outline-none"
              {...register("email", { required: true })}
            />
            {error?.email && (
              <p className="text-red-600 text-sm mt-1">{error.email}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-semibold" htmlFor="password">
              Password
            </label>
            <input
              required
              minLength={8}
              maxLength={32}
              type="password"
              {...register("password", { required: true })}
              className="w-full p-2 border border-gray-300 rounded-md outline-none"
            />
            {error?.password && (
              <p className="text-red-600 text-sm mt-1">{error.password}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
