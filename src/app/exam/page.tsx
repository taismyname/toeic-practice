import Link from "next/link";

export default function ExamPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Làm đề TOEIC</h1>
      <p className="text-slate-600">Trang làm đề sẽ được hoàn thiện ở các bước sau.</p>
      <Link href="/" className="inline-block rounded-xl border px-3 py-2 hover:bg-white">← Về trang chủ</Link>
    </div>
  );
}
