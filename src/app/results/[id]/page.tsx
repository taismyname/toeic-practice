"use client";
import { useEffect, useState } from "react";
import { db } from "@/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import Link from "next/link";

type Choice = "A"|"B"|"C"|"D";
type AnswerMap = Record<number, Record<string, Choice>>;

interface SubmissionDoc {
  uid: string;
  name?: string | null;
  examId: string;
  answers: AnswerMap;
  correctCount: number;
  total: number;
  createdAt?: any;
}

export default function SubmissionDetail({ params }: { params: { id: string } }) {
  const [data, setData] = useState<SubmissionDoc | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async() => {
      const snap = await getDoc(doc(db, "submissions", params.id));
      if (snap.exists()) setData(snap.data() as SubmissionDoc);
      setLoading(false);
    })();
  }, [params.id]);

  if (loading) return <div className="p-6">Đang tải...</div>;
  if (!data) return <div className="p-6">Không tìm thấy bài nộp.</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-blue-800">Chi tiết bài nộp</h1>
      <div className="rounded-xl border bg-white p-4 shadow-sm">
        <div><b>Họ tên:</b> {data.name || "-"}</div>
        <div><b>Exam:</b> {data.examId}</div>
        <div><b>Điểm:</b> {data.correctCount} / {data.total}</div>
      </div>

      <div className="space-y-4">
        {Array.from({ length: 7 }, (_, i) => i + 1).map((p) => {
          const partAns = data.answers?.[p] || {};
          const ids = Object.keys(partAns);
          if (ids.length === 0) return null;
          return (
            <div key={p} className="rounded-xl border bg-white p-4 shadow-sm">
              <div className="font-semibold mb-2">Part {p}</div>
              <div className="grid gap-1">
                {ids.map((qid) => (
                  <div key={qid} className="text-sm">
                    Câu {qid}: bạn chọn <b>{partAns[qid]}</b>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <Link href="/results" className="underline">← Về danh sách điểm</Link>
    </div>
  );
}
