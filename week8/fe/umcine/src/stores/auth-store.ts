import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthStore {
  accessToken: string | null;
  memberId: number | null;
  memberIds: Record<string, number>;
  rememberMember: (email: string, memberId: number) => void;
  login: (accessToken: string, email: string) => void;
  setAccessToken: (accessToken: string | null) => void;
}

export const useAuthStore = create<AuthStore>()(persist((set, get) => ({
  accessToken: null,
  memberId: null,
  memberIds: {},
  rememberMember: (email, memberId) => set((state) => ({
    memberIds: { ...state.memberIds, [email.trim().toLowerCase()]: memberId },
  })),
  login: (accessToken, email) => {
    // 회원 ID는 회원가입 응답에서 보관하며, 회원 정보 자체는 Query 캐시에서 관리해요.
    let memberId = get().memberIds[email.trim().toLowerCase()] ?? null;
    if (!memberId) {
      try {
        const payload = JSON.parse(atob(accessToken.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")));
        const id = Number(payload.memberId ?? payload.sub);
        if (Number.isSafeInteger(id) && id > 0) memberId = id;
      } catch { /* ID가 없는 토큰은 회원가입 때 받은 ID가 필요해요. */ }
    }
    set({ accessToken, memberId });
  },
  setAccessToken: (accessToken) => set({ accessToken, ...(accessToken ? {} : { memberId: null }) }),
}), {
  name: "umcine-auth-store",
  storage: createJSONStorage(() => localStorage),
}));
