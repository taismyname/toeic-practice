"use client";
import Link from "next/link";
import { useState } from "react";
import { auth, db } from "@/firebaseConfig";
import { doc, setDoc, getDoc, Timestamp } from "firebase/firestore";

export default function ExamPage() {
  const [score, setScore] = useState<number | null>(null);

  const handleSubmit = async () => {
    // Fake score để test, sau này tính thật
    const newScore = Math.floor(Math.random() * 100);
    setScore(newScore);

    if (auth.currentUser) {
      const userDoc = doc(db, "results", auth.currentUser.uid);
      await setDoc(userDoc, {
        name: auth.currentUser.displayName,
        score: newScore,
        timestamp: Timestamp.now(),
      });
      alert("Kết quả đã lưu vào Firestore!");
    } else {
      alert("Vui lòng đăng nhập để lưu kết quả.");
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Làm đề TOEIC</h1>
      <p className="text-slate-600">Trang làm đề demo: nhấn submit để lưu điểm test.</p>
      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:opacity-90"
      >
        Nộp bài
      </button>
      {score !== null && <p className="text-lg">Điểm của bạn: {score}</p>}
      <Link href="/" className="inline-block rounded-xl border px-3 py-2 hover:bg-white">
        ← Về trang chủ
      </Link>
    </div>
  );
}
