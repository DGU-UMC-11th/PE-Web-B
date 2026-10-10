//bookmark-store.ts

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { movies } from "../data/movies";

interface BookmarkStore {
    bookmarkedMovieIds: number[];
    toggleBookmark: (movieId: number) => void;
}

export const useBookmarkStore = create<BookmarkStore>()(
    persist(
        (set) => ({
            bookmarkedMovieIds: [],
            toggleBookmark: (movieId) =>
                set((state) => ({
                bookmarkedMovieIds: state.bookmarkedMovieIds.includes(movieId)
                    ? state.bookmarkedMovieIds.filter((id) => id !== movieId)
                    : [...state.bookmarkedMovieIds, movieId],
                })),
        }),
        {
            name: "umcine-bookmark-store", //저장 key
            storage: createJSONStorage(() => localStorage), //저장 위치
            partialize: (state) => ({
                bookmarkedMovieIds: state.bookmarkedMovieIds, //저장할꺼
            }),
            merge: (persistedState, currentState) => {
                //persistedState : 스토리지에서 불러온거
                //currentState : 현재 스토어에 정의된 기본 상태
                
                //Partial은 ?랑 같음
                //bookmarkedMovieIds?, toggleBookmark? 가 됨
                const ids = (persistedState as Partial<BookmarkStore> | undefined)
                            ?.bookmarkedMovieIds; //id 목록 가져오기
                
                const idData = Array.isArray(ids) //덮어씌우기
                                ? ids.filter(
                                    (id): id is number =>
                                        typeof id === "number"
                                        && Number.isInteger(id)
                                        && (1 <= id && id <= movies.length),
                                ) //리턴값 number[]
                                : [];
                const newArray = Array.from(new Set(idData));

                return {
                    ...currentState, //기본값 일단 쓰고
                    bookmarkedMovieIds: newArray,
                };
            },
        },
    ),
);