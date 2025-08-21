"use client";
import { useEffect, useState } from "react";
import { useExam } from "./ExamContext";
import { useRouter } from "next/navigation";

function format(ms: number) {
  const total = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${pad(h)}:${pad(m)}:${pad(s)}`;
}

export default function TimerBar() {
  const { endsAt } = useExam();
  const router = useRouter();
  const [left, setLeft] = useState(endsAt - Date.now());

  useEffect(() => {
    const id = setInterval(() => setLeft(endsAt - Date.now()), 1000);
    return () => clearInterval(id);
  }, [endsAt]);

  useEffect(() => {
    if (left <= 0) {
      router.push("/exam/submit");
    }
  }, [left, router]);

  return (
    <div className="w-full bg-blue-600 text-white px-4 py-2 flex items-center justify-between shadow">
      <div className="font-semibold">TOEIC Practice</div>
      <div className="font-mono text-lg">⏱ {format(left)}</div>
    </div>
  );
}
