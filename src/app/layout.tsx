import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "TOEIC Practice",
  description: "Luyện đề TOEIC online: làm đề, tính điểm, lưu kết quả.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className="min-h-dvh bg-gradient-to-b from-slate-50 to-slate-100 text-slate-900 antialiased">
        <header className="sticky top-0 z-40 border-b bg-white/60 backdrop-blur">
          <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
            <Link href="/" className="font-semibold text-lg">TOEIC Practice</Link>
            <nav className="text-sm">
              <Link href="/" className="px-3 py-1 rounded-lg hover:bg-slate-100">Trang chủ</Link>
              <Link href="/exam" className="px-3 py-1 rounded-lg hover:bg-slate-100">Làm đề</Link>
              <Link href="/results" className="px-3 py-1 rounded-lg hover:bg-slate-100">Kết quả</Link>
            </nav>
          </div>
        </header>

        <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>

        <footer className="mx-auto max-w-5xl px-4 py-10 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} tnghnex company copyright 
        </footer>
      </body>
    </html>
  );
}
