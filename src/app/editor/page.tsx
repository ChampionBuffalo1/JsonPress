"use client";

import Editor from "@/components/Editor";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditorPage() {
  const [render, setRender] = useState<boolean>(false);
  const navigator = useRouter();
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigator.push("/login");
    } else {
      setRender(true);
    }
  }, [setRender, navigator]);

  return render ? <Editor /> : <></>;
}
