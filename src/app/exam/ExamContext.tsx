"use client";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

type Choice = "A" | "B" | "C" | "D";
type AnswerMap = Record<number, Record<string, Choice>>; // {part: {questionId: "A"}}

interface ExamState {
  startedAt: number;   // ms
  endsAt: number;      // ms
  currentPart: number; // 1..7
  answers: AnswerMap;
}

interface ExamContextValue extends ExamState {
  setAnswer: (part: number, qid: string, ans: Choice) => void;
  goToPart: (part: number) => void;
  resetExam: () => void;
}

const DURATION_MS = 150 * 60 * 1000; // 150 phút
const LS_KEY = "toeic_exam_state_v1";

const ExamContext = createContext<ExamContextValue | null>(null);
export const useExam = () => {
  const ctx = useContext(ExamContext);
  if (!ctx) throw new Error("useExam must be used inside ExamProvider");
  return ctx;
};

export function ExamProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [state, setState] = useState<ExamState>(() => {
    if (typeof window !== "undefined") {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) {
        try { return JSON.parse(raw) as ExamState; } catch {}
      }
    }
    const now = Date.now();
    return {
      startedAt: now,
      endsAt: now + DURATION_MS,
      currentPart: 1,
      answers: {},
    };
  });

  // lưu LocalStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(LS_KEY, JSON.stringify(state));
    }
  }, [state]);

  // sync currentPart theo URL /exam/part-x
  useEffect(() => {
    const m = pathname?.match(/\/exam\/part-(\d+)/);
    if (m) {
      const p = Number(m[1]);
      if (p >= 1 && p <= 7 && p !== state.currentPart) {
        setState((s) => ({ ...s, currentPart: p }));
      }
    }
  }, [pathname, state.currentPart]);

  const setAnswer = (part: number, qid: string, ans: Choice) => {
    setState((s) => ({
      ...s,
      answers: {
        ...s.answers,
        [part]: { ...(s.answers[part] || {}), [qid]: ans },
      },
    }));
  };

  const goToPart = (part: number) => {
    const p = Math.min(7, Math.max(1, part));
    setState((s) => ({ ...s, currentPart: p }));
    router.push(`/exam/part-${p}`);
  };

  const resetExam = () => {
    const now = Date.now();
    const fresh: ExamState = {
      startedAt: now,
      endsAt: now + DURATION_MS,
      currentPart: 1,
      answers: {},
    };
    setState(fresh);
    router.push("/exam/part-1");
  };

  const value = useMemo<ExamContextValue>(() => ({
    ...state,
    setAnswer,
    goToPart,
    resetExam,
  }), [state]);

  return <ExamContext.Provider value={value}>{children}</ExamContext.Provider>;
}
