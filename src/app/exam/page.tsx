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
    const newScore = Math.floor(Math.random() * 100); // demo điểm
    setScore(newScore);

    try {
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
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center text-blue-800">
        Làm đề TOEIC
      </h1>
      <p className="text-gray-700 text-center">
        Demo: nhấn nút Nộp để lưu điểm
      </p>

      <div className="flex justify-center">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="px-10 py-3 bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-green-700 disabled:bg-green-300"
        >
          {loading ? "Đang nộp..." : "Nộp bài"}
        </button>
      </div>

      {score !== null && (
        <p className="text-lg font-medium text-center">
          Điểm của bạn: {score}
        </p>
      )}

      <div className="text-center">
        <Link
          href="/results"
          className="text-blue-700 underline mr-4"
        >
          Xem kết quả
        </Link>
        <Link
          href="/"
          className="text-gray-700 underline"
        >
          ← Về trang chủ
        </Link>
      </div>
    </div>
  );
}
