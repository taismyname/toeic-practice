"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { auth, provider } from "@/firebaseConfig";
import { signInWithPopup, signOut } from "firebase/auth";

export default function HomePage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => setUser(u));
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-8 px-4">
      <h1 className="text-5xl font-bold text-blue-800 text-center">
        Trang luyện đề TOEIC
      </h1>

      {user ? (
        <div className="space-y-4 text-center">
          <p className="text-lg">Xin chào, {user.displayName}</p>
          <div className="space-x-4">
            <Link
              href="/exam"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
            >
              Bắt đầu làm đề
            </Link>
            <button
              onClick={handleLogout}
              className="px-6 py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600"
            >
              Đăng xuất
            </button>
          </div>
          <Link
            href="/results"
            className="inline-block mt-2 text-blue-700 underline"
          >
            Xem kết quả
          </Link>
        </div>
      ) : (
        <button
          onClick={handleLogin}
          className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
        >
          Đăng nhập bằng Google
        </button>
      )}
    </div>
  );
}
