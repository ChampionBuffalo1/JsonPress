"use client";

import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { setUser } from "@/app/reducer/users";

export default function NavUser() {
  const state = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  return (
    <div>
      {state.username ? (
        <p>{state.username}</p>
      ) : (
        <button
          onClick={() =>
            dispatch(
              setUser({
                id: "1",
                username: "test",
              })
            )
          }
        >
          Login
        </button>
      )}
    </div>
  );
}
