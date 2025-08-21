"use client";
import Link from "next/link";
import { useState } from "react";
import { auth, db } from "@/firebaseConfig";
import { collection, doc, setDoc, Timestamp } from "firebase/firestore";

export default function ExamPage() {
  const [score, setScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!auth.currentUser) {
      alert("Vui lòng đăng nhập để lưu kết quả.");
      return;
    }

    setLoading(true);

    // Tạo score ngẫu nhiên demo
    const newScore = Math.floor(Math.random() * 100);
    setScore(newScore);

    try {
      // Tạo document mới tự động ID
      const userDoc = doc(collection(db, "results"));
      await setDoc(userDoc, {
        uid: auth.currentUser.uid,
        name: auth.currentUser.displayName,
        score: newScore,
        timestamp: Timestamp.now(),
      });
      alert("Kết quả đã lưu vào Firestore!");
    } catch (err) {
      console.error(err);
      alert("Có lỗi khi lưu kết quả.");
    }

    setLoading(false);
  };

  return (
    <div className="space-y-6 p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold">Làm đề TOEIC</h1>
      <p className="text-slate-600">Trang demo: nhấn Submit để lưu điểm test.</p>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="px-6 py-3 bg-green-600 text-white rounded-lg hover:opacity-90 disabled:bg-green-300"
      >
        {loading ? "Đang nộp..." : "Nộp bài"}
      </button>

      {score !== null && (
        <p className="text-lg font-medium">Điểm của bạn: {score}</p>
      )}

      <Link
        href="/"
        className="inline-block mt-4 rounded-xl border px-4 py-2 hover:bg-slate-100"
      >
        ← Về trang chủ
      </Link>
    </div>
  );
}
