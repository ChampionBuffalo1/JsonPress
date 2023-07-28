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

export default function LoginCard() {
  const navigate = useRouter();
  const dispatch = useAppDispatch();
  const [error, setError] = useState<Record<string, string>>();
  const { handleSubmit, register } = useForm<ILogin>();
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
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
    localStorage.setItem("user", JSON.stringify(data));
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
              className="w-full p-2 border border-gray-300 rounded-md outline-none"
              type="password"
              {...register("password", { required: true })}
            />
            {error?.password && (
              <p className="text-red-600 text-sm mt-1">{error.password}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <a className="text-blue-500 hover:underline" href="/forgot-password">
            Forgot Password?
          </a>
        </div>
      </div>
    </div>
  );
}
