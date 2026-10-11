import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface BookmarkStore {
  bookmarkedMovieIds: number[];
  toggleBookmark: (movieId: number) => void;
}

function validIds(value: unknown): number[] {
  if (!Array.isArray(value)) return [];
  return [...new Set(value.filter((id): id is number =>
    typeof id === "number" && Number.isInteger(id) && id > 0,
  ))];
}

export const useBookmarkStore = create<BookmarkStore>()(
  persist(
    (set) => ({
      bookmarkedMovieIds: [],
      toggleBookmark: (movieId) => {
        if (!Number.isInteger(movieId) || movieId <= 0) return;
        set((state) => ({
          bookmarkedMovieIds: state.bookmarkedMovieIds.includes(movieId)
            ? state.bookmarkedMovieIds.filter((id) => id !== movieId)
            : [...state.bookmarkedMovieIds, movieId],
        }));
      },
    }),
    {
      name: "umcine-bookmark-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ bookmarkedMovieIds: state.bookmarkedMovieIds }),
      // 브라우저에 저장된 값은 실행 시에도 타입을 확인해요.
      merge: (persisted, current) => {
        const value = persisted && typeof persisted === "object"
          && "bookmarkedMovieIds" in persisted
          ? persisted.bookmarkedMovieIds : [];
        return { ...current, bookmarkedMovieIds: validIds(value) };
      },
    },
  ),
);
