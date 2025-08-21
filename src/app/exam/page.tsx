"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
export default function ExamIndex(){
  const router = useRouter();
  useEffect(()=>{ router.replace("/exam/part-1"); },[router]);
  return null;
}
