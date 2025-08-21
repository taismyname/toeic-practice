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
      // Lấy tất cả doc có field "uid" = auth.currentUser.uid, sắp xếp mới nhất
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
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Lịch sử kết quả</h1>
      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : auth.currentUser ? (
        results.length > 0 ? (
          <table className="table-auto border-collapse border border-slate-300 w-full">
            <thead>
              <tr className="bg-slate-200">
                <th className="border border-slate-300 px-4 py-2">Ngày</th>
                <th className="border border-slate-300 px-4 py-2">Điểm</th>
              </tr>
            </thead>
            <tbody>
              {results.map((r, idx) => (
                <tr key={idx} className="hover:bg-slate-100">
                  <td className="border border-slate-300 px-4 py-2">
                    {r.timestamp?.toDate().toLocaleString()}
                  </td>
                  <td className="border border-slate-300 px-4 py-2">{r.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Chưa có kết quả nào.</p>
        )
      ) : (
        <p>Vui lòng đăng nhập để xem kết quả.</p>
      )}

      <Link href="/" className="inline-block rounded-xl border px-3 py-2 hover:bg-white">
        ← Về trang chủ
      </Link>
    </div>
  );
}
