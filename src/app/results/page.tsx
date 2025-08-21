import Link from "next/link";

export default function ResultsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Kết quả của tôi</h1>
      <p className="text-slate-600">Sẽ hiện lịch sử điểm sau khi tích hợp Firebase.</p>
      <Link href="/" className="inline-block rounded-xl border px-3 py-2 hover:bg-white">← Về trang chủ</Link>
    </div>
  );
}
