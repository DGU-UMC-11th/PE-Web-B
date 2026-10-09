//page-bar-store.ts

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { initialPage } from "../contexts/page-bar-context";

interface PageBarStore {
  currentPage: number;
  setPage: (page: number) => void;
}

export const usePageBarStore = create<PageBarStore>()(
  persist(
    (set) => ({
      currentPage: initialPage, //기본값
      setPage: (page) =>
        set((_) => ({
          currentPage: page,
        })),
    }),
    {
      name: "umcine-page-bar-store", //저장 key
      storage: createJSONStorage(() => localStorage), //저장 위치
      partialize: (state) => ({
        currentPage: state.currentPage, //저장할꺼
      }),
    },
  ),
);