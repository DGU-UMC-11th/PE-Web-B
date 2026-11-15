import { create } from "zustand";

export interface Profile {
  email: string;
  nickname: string;
}

interface ProfileState {
  profile: Profile;
  updateNickname: (nickname: string) => void;
}

// 내 정보 API(8주차)를 연결하기 전까지 쓰는 화면 확인용 임시 데이터
const MOCK_PROFILE: Profile = {
  email: "movie@umc.com",
  nickname: "무비러버",
};

export const useProfileStore = create<ProfileState>()((set) => ({
  profile: MOCK_PROFILE,
  updateNickname: (nickname) =>
    set((state) => ({ profile: { ...state.profile, nickname } })),
}));
