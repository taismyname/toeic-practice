"use client";
import { useEffect, useState } from "react";
import { auth, db } from "@/firebaseConfig";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import Link from "next/link";

interface Result {
  score: number;
  timestamp: any;
}

export default function ResultsPage() {
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      if (!auth.currentUser) {
        setResults([]);
        setLoading(false);
        return;
      }

      const resultsRef = collection(db, "results");
      const q = query(
        resultsRef,
        where("uid", "==", auth.currentUser.uid),
        orderBy("timestamp", "desc")
      );

      const snapshot = await getDocs(q);
      const data: Result[] = [];
      snapshot.forEach((doc) => {
        data.push(doc.data() as Result);
      });

      setResults(data);
      setLoading(false);
    };

    fetchResults();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center text-blue-800">
        Lịch sử kết quả
      </h1>

      {loading ? (
        <p className="text-center">Đang tải dữ liệu...</p>
      ) : auth.currentUser ? (
        results.length > 0 ? (
          <table className="table-auto w-full border-collapse border border-gray-300 shadow-sm">
            <thead className="bg-blue-100">
              <tr>
                <th className="border px-4 py-2">Ngày</th>
                <th className="border px-4 py-2">Điểm</th>
              </tr>
            </thead>
            <tbody>
              {results.map((r, idx) => (
                <tr key={idx} className="hover:bg-blue-50">
                  <td className="border px-4 py-2">
                    {r.timestamp?.toDate().toLocaleString()}
                  </td>
                  <td className="border px-4 py-2">{r.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center">Chưa có kết quả nào.</p>
        )
      ) : (
        <p className="text-center">Vui lòng đăng nhập để xem kết quả.</p>
      )}

      <div className="text-center">
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
