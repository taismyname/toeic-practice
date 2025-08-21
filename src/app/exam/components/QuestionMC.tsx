"use client";
import React from "react";
import { useExam } from "../ExamContext";

type Choice = "A" | "B" | "C" | "D";

export interface Question {
  id: string;
  order: number;
  text: string;
  options: { A: string; B: string; C?: string; D?: string };
  imageUrl?: string;
  paragraph?: string;
}

export default function QuestionMC({ part, q }: { part: number; q: Question }) {
  const { answers, setAnswer } = useExam();
  const selected = answers[part]?.[q.id];

  const choices = (["A", "B", "C", "D"] as Choice[]).filter((ch) => (q.options as any)[ch]);

  return (
    <div className="rounded-xl border bg-white p-4 shadow-sm">
      <div className="mb-2 text-sm text-gray-500">Câu {q.order}</div>
      {q.paragraph && <div className="mb-3 whitespace-pre-line text-gray-700">{q.paragraph}</div>}
      {q.imageUrl && (
        <div className="mb-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={q.imageUrl} alt="" className="rounded-lg max-h-64 object-contain" />
        </div>
      )}
      <div className="font-medium mb-3">{q.text}</div>
      <div className="grid gap-2">
        {choices.map((ch) => (
          <label key={ch} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer ${selected === ch ? "border-blue-600 bg-blue-50" : "hover:bg-gray-50"}`}>
            <input
              type="radio"
              name={`q-${part}-${q.id}`}
              className="h-4 w-4"
              checked={selected === ch}
              onChange={() => setAnswer(part, q.id, ch)}
            />
            <div className="font-semibold w-6">{ch}.</div>
            <div>{(q.options as any)[ch]}</div>
          </label>
        ))}
      </div>
    </div>
  );
}
