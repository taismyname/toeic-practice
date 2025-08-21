"use client";
import { auth, provider } from "@/firebaseConfig";
import { signInWithPopup, signOut } from "firebase/auth";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Page() {
  const [user, setUser] = useState<any>(null);

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    signOut(auth);
    setUser(null);
  };

  return (
    <div className="space-y-6">
      {user ? (
        <div className="space-y-3">
          <p>Xin chào, {user.displayName}</p>
          <button
            onClick={handleLogout}
            className="px-4 py-2 border rounded-lg hover:bg-slate-100"
          >
            Đăng xuất
          </button>
          <div>
            <Link href="/exam" className="px-4 py-2 bg-black text-white rounded-lg hover:opacity-90">
              Bắt đầu làm đề
            </Link>
          </div>
        </div>
      ) : (
        <button
          onClick={handleLogin}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:opacity-90"
        >
          Đăng nhập Google
        </button>
      )}
    </div>
  );
}
