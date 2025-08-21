"use client";
import { useMemo } from "react";
import QuestionMC, { Question } from "./components/QuestionMC";
import { useExam } from "./ExamContext";
import Link from "next/link";

const MOCKS: Record<number, { audioUrl?: string; questions: Question[] }> = {
  1: {
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    questions: [
      { id: "p1q1", order: 1, text: "Chọn mô tả đúng với bức tranh.", options: { A: "A", B: "B", C: "C", D: "D" } },
      { id: "p1q2", order: 2, text: "Chọn đáp án đúng.", options: { A: "A", B: "B", C: "C", D: "D" } },
      { id: "p1q3", order: 3, text: "Demo câu 3.", options: { A: "A", B: "B", C: "C", D: "D" } },
      { id: "p1q4", order: 4, text: "Demo câu 4.", options: { A: "A", B: "B", C: "C", D: "D" } },
      { id: "p1q5", order: 5, text: "Demo câu 5.", options: { A: "A", B: "B", C: "C", D: "D" } },
      { id: "p1q6", order: 6, text: "Demo câu 6.", options: { A: "A", B: "B", C: "C", D: "D" } },
    ],
  },
  2: { audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", questions: Array.from({ length: 25 }, (_, i) => ({ id: `p2q${i+1}`, order: i+1, text: `Câu ${i+1}`, options: { A: "A", B: "B", C: "C", D: "D" } })) },
  3: { audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", questions: Array.from({ length: 39 }, (_, i) => ({ id: `p3q${i+1}`, order: i+1, text: `Câu ${i+1}`, options: { A: "A", B: "B", C: "C", D: "D" } })) },
  4: { audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", questions: Array.from({ length: 30 }, (_, i) => ({ id: `p4q${i+1}`, order: i+1, text: `Câu ${i+1}`, options: { A: "A", B: "B", C: "C", D: "D" } })) },
  5: { questions: Array.from({ length: 30 }, (_, i) => ({ id: `p5q${i+1}`, order: i+1, text: `Câu ${i+1}`, options: { A: "A", B: "B", C: "C", D: "D" } })) },
  6: { questions: Array.from({ length: 16 }, (_, i) => ({ id: `p6q${i+1}`, order: i+1, text: `Câu ${i+1}`, options: { A: "A", B: "B", C: "C", D: "D" } })) },
  7: { questions: Array.from({ length: 54 }, (_, i) => ({ id: `p7q${i+1}`, order: i+1, text: `Câu ${i+1}`, options: { A: "A", B: "B", C: "C", D: "D" } })) },
};

export default function PartPage({ part }: { part: number }) {
  const { goToPart } = useExam();
  const data = useMemo(() => MOCKS[part], [part]);
  const showAudio = part >= 1 && part <= 4 && data?.audioUrl;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-blue-800">Part {part}</h1>
        <div className="flex gap-2">
          {part > 1 && (
            <button onClick={() => goToPart(part - 1)} className="px-4 py-2 rounded-lg border hover:bg-gray-50">← Previous</button>
          )}
          {part < 7 ? (
            <button onClick={() => goToPart(part + 1)} className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">Next →</button>
          ) : (
            <Link href="/exam/submit" className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700">Nộp bài</Link>
          )}
        </div>
      </div>

      {showAudio && (
        <div className="rounded-xl border bg-white p-4 shadow-sm">
          <div className="font-medium mb-2">Audio Part {part}</div>
          <audio controls src={data!.audioUrl} className="w-full" />
        </div>
      )}

      <div className="grid gap-4">
        {data?.questions.map((q) => (
          <QuestionMC key={q.id} part={part} q={q} />
        ))}
      </div>
    </div>
  );
}
