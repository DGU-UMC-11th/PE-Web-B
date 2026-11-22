import { create } from "zustand";

// 내 정보 조회, 수정 API는 8주차에 연결해요.
// 그전까지는 화면 퍼블리싱 확인용 임시 데이터를 메모리에 보관해요.
interface ProfileStore {
    nickname: string;
    email: string;
    updateNickname: (nickname: string) => void;
}

export const useProfileStore = create<ProfileStore>()((set) => ({
    nickname: "UMC 챌린저",
    email: "challenger@umc.com",
    updateNickname: (nickname) => set({ nickname }),
}));
