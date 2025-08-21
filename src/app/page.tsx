import Link from "next/link";

export default function Page() {
  return (
    <section className="grid gap-8 md:grid-cols-2 items-center">
      <div className="space-y-6">
        <h1 className="text-4xl font-bold leading-tight">
          Luyện đề TOEIC hiện đại, <span className="underline decoration-emerald-400">tính điểm tức thì</span>
        </h1>
        <p className="text-slate-600">
          Làm đề trực tiếp trên web, giao diện nhanh & mượt. Kết quả sẽ được lưu vào tài khoản để xem lại.
          Bước sau sẽ thêm đăng nhập Google + Firebase để đồng bộ dữ liệu.
        </p>
        <div className="flex gap-3">
          <Link href="/exam" className="px-4 py-2 rounded-xl bg-black text-white hover:opacity-90">Bắt đầu làm đề</Link>
          <Link href="/results" className="px-4 py-2 rounded-xl border hover:bg-white">Xem kết quả</Link>
        </div>
        <div className="text-xs text-slate-500">
          *Bản nền tảng — sẽ gắn đăng nhập Google và Firestore ở bước tiếp theo.
        </div>
      </div>

      <div className="rounded-2xl shadow-lg p-6 bg-white">
        <h2 className="font-semibold mb-4 text-lg">Tính năng dự kiến</h2>
        <ul className="grid gap-3 text-sm">
          <li>✔ Giao diện Part 1–7, nộp bài tính điểm</li>
          <li>✔ Đăng nhập Google (Firebase Auth)</li>
          <li>✔ Lưu điểm theo user (Firestore)</li>
          <li>✔ Lịch sử kết quả & bảng điểm</li>
          <li>✔ Deploy Netlify (free, zero-config)</li>
        </ul>
      </div>
    </section>
  );
}
