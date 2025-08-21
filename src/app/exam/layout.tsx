"use client";
import Link from "next/link";
import { ExamProvider, useExam } from "./ExamContext";
import TimerBar from "./Timer";

function PartNav() {
  const { currentPart, goToPart, resetExam } = useExam();
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white border-b">
      <div className="flex gap-2 flex-wrap">
        {Array.from({ length: 7 }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            onClick={() => goToPart(p)}
            className={`px-3 py-1 rounded-lg border ${p === currentPart ? "bg-blue-600 text-white border-blue-600" : "hover:bg-blue-50"}`}
          >
            Part {p}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <Link href="/" className="underline">Trang chủ</Link>
        <button onClick={resetExam} className="px-3 py-1 rounded-lg border hover:bg-gray-50">
          Làm lại từ đầu
        </button>
      </div>
    </div>
  );
}

export default function ExamLayout({ children }: { children: React.ReactNode }) {
  return (
    <ExamProvider>
      <div className="min-h-screen flex flex-col">
        <TimerBar />
        <PartNav />
        <div className="max-w-5xl mx-auto w-full p-4">{children}</div>
      </div>
    </ExamProvider>
  );
}
