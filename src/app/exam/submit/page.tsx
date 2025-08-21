"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useExam } from "../ExamContext";
import { auth, db } from "@/firebaseConfig";
import { Timestamp, addDoc, collection, doc, getDoc } from "firebase/firestore";

// TẠM: key đúng cho mocK (để tính điểm).
const CORRECT: Record<number, Record<string, "A"|"B"|"C"|"D">> = {
  1: { p1q1:"A", p1q2:"B", p1q3:"C", p1q4:"D", p1q5:"A", p1q6:"B" },
  2: {}, 3: {}, 4: {}, 5: {}, 6: {}, 7: {}
};

export default function SubmitPage() {
  const { answers, resetExam } = useExam();
  const [saving, setSaving] = useState(false);
  const [doneId, setDoneId] = useState<string | null>(null);

  const { total, correctCount } = useMemo(() => {
    let totalQ = 0, correct = 0;
    for (let p = 1; p <= 7; p++) {
      const a = answers[p] || {};
      const c = CORRECT[p] || {};
      for (const qid of Object.keys(a)) {
        totalQ++;
        if (c[qid] && c[qid] === a[qid]) correct++;
      }
    }
    return { total: totalQ, correctCount: correct };
  }, [answers]);

  const saveResult = async () => {
    if (!auth.currentUser) {
      alert("Vui lòng đăng nhập trước khi nộp bài.");
      return;
    }
    setSaving(true);
    try {
      // Lưu submissions (chi tiết)
      const subRef = await addDoc(collection(db, "submissions"), {
        uid: auth.currentUser.uid,
        name: auth.currentUser.displayName || null,
        examId: "toeic-demo",
        answers,
        correctCount,
        total,
        createdAt: Timestamp.now(),
      });
      setDoneId(subRef.id);

      // Lưu results (tổng quan) – giữ tương thích trang /results cũ
      await addDoc(collection(db, "results"), {
        uid: auth.currentUser.uid,
        name: auth.currentUser.displayName || null,
        score: correctCount,
        timestamp: Timestamp.now(),
      });
    } catch (e) {
      console.error(e);
      alert("Lỗi khi lưu kết quả. Kiểm tra Firestore rules.");
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    // auto-save khi vào trang
    saveResult();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-center text-blue-800">Nộp bài</h1>
      <div className="rounded-xl border bg-white p-4 shadow-sm">
        <div className="text-lg">Tổng số câu làm: <b>{total}</b></div>
        <div className="text-lg">Số câu đúng (theo đáp án demo): <b className="text-green-700">{correctCount}</b></div>
      </div>

      <div className="flex gap-3">
        <Link href="/results" className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
          Về trang kết quả
        </Link>
        {doneId && (
          <Link href={`/results/${doneId}`} className="px-4 py-2 rounded-lg border hover:bg-gray-50">
            Xem chi tiết từng câu
          </Link>
        )}
        <button onClick={resetExam} className="px-4 py-2 rounded-lg border hover:bg-gray-50">
          Làm lại từ đầu
        </button>
      </div>

      {saving && <p>Đang lưu kết quả...</p>}
    </div>
  );
}
